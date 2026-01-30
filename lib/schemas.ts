import { z } from "zod";

export const addressSchema = z.object({
  plus_code: z.string().min(1, "Plus Code is required"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  street_address: z.string().optional(),
  city: z.string().min(1, "City is required"),
  region: z.string().min(1, "Region is required"),
  country: z.string().default("Somalia"),
  nira_id: z.string().optional(),
});

export const workflowSchema = z.object({
  name: z.string().min(1, "Workflow name is required"),
  description: z.string().optional(),
  trigger_type: z.enum(["manual", "webhook", "scheduled"]),
  workflow_data: z.record(z.any()),
});

export type AddressFormData = z.infer<typeof addressSchema>;
export type WorkflowFormData = z.infer<typeof workflowSchema>;
