import { Suspense } from "react";
import { DashboardClient } from "./DashboardClient";

async function getStartups() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/startups`, { 
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Failed to fetch startups:', error);
    return []; // Return an empty array if there's an error
  }
}

export default async function Dashboard() {
  const startupOpportunities = await getStartups();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardClient initialStartups={startupOpportunities} />
    </Suspense>
  );
}

