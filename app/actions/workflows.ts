"use server";

import { supabase } from "@/lib/supabase";
import { workflowSchema, type WorkflowFormData } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function createWorkflow(data: WorkflowFormData) {
  try {
    const validated = workflowSchema.parse(data);

    const { data: workflow, error } = await supabase
      .from("workflows")
      .insert({
        ...validated,
        status: "draft",
        is_active: false,
        execution_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .maybeSingle();

    if (error) throw error;

    revalidatePath("/platform/workflows");

    return { success: true, data: workflow };
  } catch (error) {
    console.error("Error creating workflow:", error);
    return { success: false, error: "Failed to create workflow" };
  }
}

export async function getWorkflows() {
  try {
    const { data, error } = await supabase
      .from("workflows")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching workflows:", error);
    return { success: false, data: [] };
  }
}
