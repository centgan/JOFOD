import {getServerSession, Session} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import AddingComponent from "@/app/dashboard/adding";
import EmployerDashboard from "@/app/dashboard/employer-dashboard";

export default async function DashboardPage() {
  const session:Session | null = await getServerSession(authOptions);
  return (
    <div>
      {!!session?.user.first_time && <AddingComponent session={session} />}
      {!session?.user.first_time && <EmployerDashboard />} {/*for now only worrying about employer dashboard*/}
    </div>
  )
}
