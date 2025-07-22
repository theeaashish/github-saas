import { requireUser } from "@/data/user/require-user"

export default async function Dashboard() {
    const session = await requireUser();
  return (
    <div>
      {session.name}
      
    </div>
  )
}
