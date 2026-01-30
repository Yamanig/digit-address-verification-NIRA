import { AnimatedCard } from "@/components/ui/animated-card";
import { Button } from "@/components/ui/button";
import { Plus, MapPin, CheckCircle, Clock, XCircle } from "lucide-react";
import Link from "next/link";
import { getAddresses } from "@/app/actions/addresses";

export default async function AddressesPage() {
  const result = await getAddresses();
  const addresses = result.data || [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "pending":
        return <Clock className="w-5 h-5 text-primary" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-accent" />;
      default:
        return <MapPin className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-success/10 text-success";
      case "pending":
        return "bg-primary/10 text-primary";
      case "rejected":
        return "bg-accent/10 text-accent";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-8 container-custom">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-heading font-bold text-text mb-2">Addresses</h1>
          <p className="text-gray-600">Manage and verify digital addresses with PlusCodes</p>
        </div>
        <Link href="/platform/addresses/new">
          <Button size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Add Address
          </Button>
        </Link>
      </div>

      {addresses.length === 0 ? (
        <AnimatedCard index={0}>
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No addresses yet</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first address</p>
            <Link href="/platform/addresses/new">
              <Button>
                <Plus className="w-5 h-5 mr-2" />
                Add Address
              </Button>
            </Link>
          </div>
        </AnimatedCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addresses.map((address: any, index: number) => (
            <AnimatedCard key={address.id} index={index}>
              <div className="flex items-start justify-between mb-4">
                {getStatusIcon(address.verification_status)}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    address.verification_status
                  )}`}
                >
                  {address.verification_status}
                </span>
              </div>

              <h3 className="font-heading font-semibold text-lg mb-2">
                {address.plus_code}
              </h3>

              <div className="space-y-1 text-sm text-gray-600 mb-4">
                {address.street_address && <p>{address.street_address}</p>}
                <p>
                  {address.city}, {address.region}
                </p>
                <p>{address.country}</p>
              </div>

              {address.nira_id && (
                <p className="text-xs text-gray-500 mb-4">NIRA ID: {address.nira_id}</p>
              )}

              <Link href={`/platform/addresses/${address.id}`}>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Link>
            </AnimatedCard>
          ))}
        </div>
      )}
    </div>
  );
}
