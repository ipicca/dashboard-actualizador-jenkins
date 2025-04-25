import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, XCircle } from "lucide-react";

interface Client {
  name: string;
  status: "Success" | "Failure";
  duration: string;
  message: string;
  comment: string;
}

interface ClientsTableProps {
  clients: Client[];
}

export function ClientsTable({ clients }: ClientsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead className="hidden md:table-cell">Update Log</TableHead>
            <TableHead>Comment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell>
                {client.status === "Success" ? (
                  <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Success
                  </Badge>
                ) : (
                  <Badge
                    variant="destructive"
                    className="bg-red-100 text-red-800 hover:bg-red-100"
                  >
                    <XCircle className="mr-1 h-3 w-3" />
                    Failure
                  </Badge>
                )}
              </TableCell>
              <TableCell>{client.duration}</TableCell>
              <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                {client.message}
              </TableCell>
              <TableCell>{client.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
