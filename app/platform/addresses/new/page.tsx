"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { addressSchema, type AddressFormData } from "@/lib/schemas";
import { createAddress } from "@/app/actions/addresses";

export default function NewAddressPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      country: "Somalia",
      latitude: 0,
      longitude: 0,
    },
  });

  const onSubmit = async (data: AddressFormData) => {
    setIsSubmitting(true);
    try {
      const result = await createAddress(data);
      if (result.success) {
        router.push("/platform/addresses");
      }
    } catch (error) {
      console.error("Error creating address:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 container-custom max-w-3xl">
      <div className="mb-8">
        <Link href="/platform/addresses">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Addresses
          </Button>
        </Link>
        <h1 className="text-4xl font-heading font-bold text-text mb-2">
          Add New Address
        </h1>
        <p className="text-gray-600">Enter address details with PlusCode verification</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-8 rounded-xl space-y-6">
        <div className="space-y-2">
          <Label htmlFor="plus_code">Plus Code *</Label>
          <Input
            id="plus_code"
            placeholder="e.g., 7M9W+8F Mogadishu"
            {...register("plus_code")}
          />
          {errors.plus_code && (
            <p className="text-sm text-accent">{errors.plus_code.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="latitude">Latitude *</Label>
            <Input
              id="latitude"
              type="number"
              step="any"
              placeholder="2.0469"
              {...register("latitude", { valueAsNumber: true })}
            />
            {errors.latitude && (
              <p className="text-sm text-accent">{errors.latitude.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="longitude">Longitude *</Label>
            <Input
              id="longitude"
              type="number"
              step="any"
              placeholder="45.3182"
              {...register("longitude", { valueAsNumber: true })}
            />
            {errors.longitude && (
              <p className="text-sm text-accent">{errors.longitude.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="street_address">Street Address</Label>
          <Input
            id="street_address"
            placeholder="e.g., Maka Al-Mukarrama Road"
            {...register("street_address")}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input id="city" placeholder="e.g., Mogadishu" {...register("city")} />
            {errors.city && (
              <p className="text-sm text-accent">{errors.city.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="region">Region *</Label>
            <Input id="region" placeholder="e.g., Banadir" {...register("region")} />
            {errors.region && (
              <p className="text-sm text-accent">{errors.region.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="nira_id">NIRA ID (Optional)</Label>
          <Input id="nira_id" placeholder="e.g., NIRA-123456" {...register("nira_id")} />
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" size="lg" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? "Creating..." : "Create Address"}
          </Button>
          <Link href="/platform/addresses" className="flex-1">
            <Button type="button" variant="outline" size="lg" className="w-full">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
