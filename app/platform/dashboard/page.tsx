import { AnimatedCard } from "@/components/ui/animated-card";
import { MapPin, CheckCircle, Clock, XCircle } from "lucide-react";
import Link from "next/link";
import { getAddresses } from "@/app/actions/addresses";

export default async function DashboardPage() {
  const result = await getAddresses();
  const addresses = result.data || [];

  const stats = {
    total: addresses.length,
    verified: addresses.filter((a: any) => a.verification_status === "verified").length,
    pending: addresses.filter((a: any) => a.verification_status === "pending").length,
    rejected: addresses.filter((a: any) => a.verification_status === "rejected").length,
  };

  const recentAddresses = addresses.slice(0, 3);

  return (
    <div className="p-8 container-custom">
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold text-text mb-2">Dashboard</h1>
        <p className="text-gray-600">Monitor address verification and workflow automation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnimatedCard index={0}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Addresses</p>
              <p className="text-3xl font-bold text-text mt-1">{stats.total}</p>
            </div>
            <MapPin className="w-8 h-8 text-primary" />
          </div>
        </AnimatedCard>

        <AnimatedCard index={1}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Verified</p>
              <p className="text-3xl font-bold text-success mt-1">{stats.verified}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
        </AnimatedCard>

        <AnimatedCard index={2}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending</p>
              <p className="text-3xl font-bold text-primary mt-1">{stats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-primary" />
          </div>
        </AnimatedCard>

        <AnimatedCard index={3}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Rejected</p>
              <p className="text-3xl font-bold text-accent mt-1">{stats.rejected}</p>
            </div>
            <XCircle className="w-8 h-8 text-accent" />
          </div>
        </AnimatedCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatedCard index={4}>
          <h2 className="text-xl font-heading font-semibold mb-4">Recent Addresses</h2>
          <div className="space-y-3">
            {recentAddresses.map((address: any) => (
              <Link
                key={address.id}
                href={`/platform/addresses/${address.id}`}
                className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{address.plus_code}</p>
                    <p className="text-sm text-gray-500">{address.city}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      address.verification_status === "verified"
                        ? "bg-success/10 text-success"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {address.verification_status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard index={5}>
          <h2 className="text-xl font-heading font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/platform/addresses/new"
              className="block p-4 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
            >
              <p className="font-medium text-primary">Add New Address</p>
              <p className="text-sm text-gray-600">Register a new digital address</p>
            </Link>
            <Link
              href="/platform/workflows/new"
              className="block p-4 bg-success/10 hover:bg-success/20 rounded-lg transition-colors"
            >
              <p className="font-medium text-success">Create Workflow</p>
              <p className="text-sm text-gray-600">Automate verification processes</p>
            </Link>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
}
