"use client";

import type React from "react";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, XCircle, ArrowUpDown, Eye, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Client {
  name: string;
  status: "Success" | "Failure" | "Pending";
  duration: string;
  message: string;
  comment: string;
}

interface ClientsTableProps {
  clients: Client[];
}

type SortField = "name" | "status" | "duration";
type SortDirection = "asc" | "desc";

export function ClientsTable({ clients }: ClientsTableProps) {
  // Estado para filtros
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [nameFilter, setNameFilter] = useState<string>("");

  // Estado para ordenamiento
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // Estado para cliente seleccionado (vista detallada)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Función para cambiar el ordenamiento
  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filtrar y ordenar clientes
  const filteredAndSortedClients = useMemo(() => {
    return clients
      .filter((client) => {
        // Filtrar por status
        if (statusFilter !== "all" && client.status !== statusFilter) {
          return false;
        }

        // Filtrar por nombre
        if (
          nameFilter &&
          !client.name.toLowerCase().includes(nameFilter.toLowerCase())
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Ordenar por campo seleccionado
        let comparison = 0;

        if (sortField === "name") {
          comparison = a.name.localeCompare(b.name);
        } else if (sortField === "status") {
          comparison = a.status.localeCompare(b.status);
        } else if (sortField === "duration") {
          // Convertir duración a segundos para comparar
          const getDurationInSeconds = (duration: string) => {
            const parts = duration.split(" ");
            let seconds = 0;
            for (let i = 0; i < parts.length; i += 2) {
              const value = Number.parseInt(parts[i]);
              const unit = parts[i + 1];
              if (unit.startsWith("m")) seconds += value * 60;
              else if (unit.startsWith("s")) seconds += value;
            }
            return seconds;
          };

          const aDuration = getDurationInSeconds(a.duration);
          const bDuration = getDurationInSeconds(b.duration);
          comparison = aDuration - bDuration;
        }

        // Aplicar dirección de ordenamiento
        return sortDirection === "asc" ? comparison : -comparison;
      });
  }, [clients, statusFilter, nameFilter, sortField, sortDirection]);

  // Renderizar el badge según el status
  const renderStatusBadge = (status: "Success" | "Failure" | "Pending") => {
    if (status === "Success") {
      return (
        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-700 dark:text-emerald-100 dark:hover:bg-emerald-700">
          <CheckCircle className="mr-1 h-3 w-3" />
          Success
        </Badge>
      );
    } else if (status === "Failure") {
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-700 dark:text-red-100 dark:hover:bg-red-700">
          <XCircle className="mr-1 h-3 w-3" />
          Failure
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-700 dark:text-amber-100 dark:hover:bg-amber-700">
          <Clock className="mr-1 h-3 w-3" />
          Pending
        </Badge>
      );
    }
  };

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar por nombre de cliente..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full sm:w-48">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Success">Exitosos</SelectItem>
              <SelectItem value="Failure">Fallidos</SelectItem>
              <SelectItem value="Pending">Pendientes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabla */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("name")}
                  className="flex items-center gap-1 p-0 h-auto font-semibold"
                >
                  Cliente
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("status")}
                  className="flex items-center gap-1 p-0 h-auto font-semibold"
                >
                  Status
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("duration")}
                  className="flex items-center gap-1 p-0 h-auto font-semibold"
                >
                  Duración
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="hidden md:table-cell">Update Log</TableHead>
              <TableHead>Comentario</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedClients.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No se encontraron clientes con los filtros aplicados
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedClients.map((client, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{renderStatusBadge(client.status)}</TableCell>
                  <TableCell>{client.duration}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                    {client.message}
                  </TableCell>
                  <TableCell>{client.comment}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedClient(client)}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Ver detalles</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Detalles del Cliente</DialogTitle>
                        </DialogHeader>
                        {selectedClient && (
                          <ClientDetail
                            client={selectedClient}
                            renderStatusBadge={renderStatusBadge}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Contador de resultados */}
      <div className="text-sm text-muted-foreground">
        Mostrando {filteredAndSortedClients.length} de {clients.length} clientes
      </div>
    </div>
  );
}

function ClientDetail({
  client,
  renderStatusBadge,
}: {
  client: Client;
  renderStatusBadge: (
    status: "Success" | "Failure" | "Pending"
  ) => React.ReactNode;
}) {
  return (
    <div className="space-y-6 py-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1 font-semibold">Nombre:</div>
        <div className="col-span-3">{client.name}</div>

        <div className="col-span-1 font-semibold">Estado:</div>
        <div className="col-span-3">{renderStatusBadge(client.status)}</div>

        <div className="col-span-1 font-semibold">Duración:</div>
        <div className="col-span-3">{client.duration}</div>

        <div className="col-span-1 font-semibold">Mensaje:</div>
        <div className="col-span-3">{client.message}</div>

        <div className="col-span-1 font-semibold">Comentario:</div>
        <div className="col-span-3">{client.comment}</div>
      </div>
    </div>
  );
}
