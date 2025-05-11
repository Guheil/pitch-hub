"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LatestPitchesPage() {
  const router = useRouter();
  
  // Redirect to the explore page with the "Most Recent" filter
  useEffect(() => {
    router.replace("/pitches?sort=date");
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse">Redirecting to latest pitches...</div>
    </div>
  );
}
