import { AnimatedCard } from "@/components/ui/animated-card";
import { Button } from "@/components/ui/button";
import { Plus, Workflow, Play, Pause } from "lucide-react";
import Link from "next/link";
import { getWorkflows } from "@/app/actions/workflows";

export default async function WorkflowsPage() {
  const result = await getWorkflows();
  const workflows = result.data || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success/10 text-success";
      case "draft":
        return "bg-gray-100 text-gray-600";
      case "paused":
        return "bg-primary/10 text-primary";
      case "archived":
        return "bg-accent/10 text-accent";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-8 container-custom">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-heading font-bold text-text mb-2">Workflows</h1>
          <p className="text-gray-600">Build and automate address verification pipelines</p>
        </div>
        <Link href="/platform/workflows/new">
          <Button size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Create Workflow
          </Button>
        </Link>
      </div>

      {workflows.length === 0 ? (
        <AnimatedCard index={0}>
          <div className="text-center py-12">
            <Workflow className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No workflows yet</h3>
            <p className="text-gray-600 mb-6">Create your first automation workflow</p>
            <Link href="/platform/workflows/new">
              <Button>
                <Plus className="w-5 h-5 mr-2" />
                Create Workflow
              </Button>
            </Link>
          </div>
        </AnimatedCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflows.map((workflow: any, index: number) => (
            <AnimatedCard key={workflow.id} index={index}>
              <div className="flex items-start justify-between mb-4">
                <Workflow className="w-5 h-5 text-primary" />
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    workflow.status
                  )}`}
                >
                  {workflow.status}
                </span>
              </div>

              <h3 className="font-heading font-semibold text-lg mb-2">{workflow.name}</h3>

              {workflow.description && (
                <p className="text-sm text-gray-600 mb-4">{workflow.description}</p>
              )}

              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Play className="w-3 h-3" />
                  <span>{workflow.execution_count} executions</span>
                </div>
                <div className="flex items-center gap-1">
                  {workflow.is_active ? (
                    <>
                      <Play className="w-3 h-3 text-success" />
                      <span className="text-success">Active</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-3 h-3" />
                      <span>Inactive</span>
                    </>
                  )}
                </div>
              </div>

              <Link href={`/platform/workflows/${workflow.id}`}>
                <Button variant="outline" className="w-full">
                  Edit Workflow
                </Button>
              </Link>
            </AnimatedCard>
          ))}
        </div>
      )}
    </div>
  );
}
