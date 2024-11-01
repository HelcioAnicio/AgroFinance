import { getServerSession } from "next-auth/next";
import { GET as handler } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(handler);
  console.log("No arquivo principal", session);

  return <div>ola</div>;
}
