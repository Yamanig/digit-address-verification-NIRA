import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-white to-primary/5">
      <div className="container-custom text-center space-y-8">
        <h1 className="text-6xl font-bold text-text mb-4">
          Digital Address Verification
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Production-ready platform connecting PlusCodes with NIRA Somalia identity system
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link
            href="/platform/dashboard"
            className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            Go to Platform
          </Link>
        </div>
      </div>
    </div>
  );
}
