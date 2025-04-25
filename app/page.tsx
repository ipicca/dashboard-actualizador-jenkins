import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { StatusCards } from "@/components/status-cards";
import { ClientsTable } from "@/components/clients-table";
import { getData } from "@/lib/data";

export default async function DashboardPage() {
  const data = await getData();

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 flex justify-center">
        <DashboardShell>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Resumen del estado y detalles de la implementación del actualizador
            Jenkins.
          </p>

          <StatusCards metrics={data.metrics} />

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">
              Actualizaciones ejecutadas
            </h2>
            <ClientsTable clients={data.clients} />
          </div>
        </DashboardShell>
      </div>
    </div>
  );
}
