"use client";

import { WorkflowBuilder } from "@/components/workflow/workflow-builder";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewWorkflowPage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200/50 flex items-center justify-between bg-white">
        <div className="flex items-center gap-4">
          <Link href="/platform/workflows">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-heading font-bold">Create Workflow</h1>
            <p className="text-sm text-gray-600">Build your automation pipeline</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/platform/workflows">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button>Save Workflow</Button>
        </div>
      </div>

      <div className="flex-1 p-6">
        <WorkflowBuilder />
      </div>
    </div>
  );
}
