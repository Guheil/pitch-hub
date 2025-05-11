"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TrendingPitchesPage() {
  const router = useRouter();
  
  // Redirect to the explore page with the "Most Viewed" filter
  useEffect(() => {
    router.replace("/pitches?sort=views");
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse">Redirecting to trending pitches...</div>
    </div>
  );
}
