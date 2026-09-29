import { db } from "@/db";
import GrievanceDashboard from "@/components/grievance-dashboard";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await db.execute(sql`select 1`);

  return <GrievanceDashboard />;
}
