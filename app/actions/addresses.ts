"use server";

import { supabase } from "@/lib/supabase";
import { addressSchema, type AddressFormData } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function createAddress(data: AddressFormData) {
  try {
    const validated = addressSchema.parse(data);

    const { data: address, error } = await supabase
      .from("addresses")
      .insert({
        ...validated,
        verification_status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .maybeSingle();

    if (error) throw error;

    revalidatePath("/platform/addresses");
    revalidatePath("/platform/dashboard");

    return { success: true, data: address };
  } catch (error) {
    console.error("Error creating address:", error);
    return { success: false, error: "Failed to create address" };
  }
}

export async function getAddresses() {
  try {
    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return { success: false, data: [] };
  }
}

export async function getAddress(id: string) {
  try {
    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching address:", error);
    return { success: false, data: null };
  }
}
