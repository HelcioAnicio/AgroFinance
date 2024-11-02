import { getServerSession } from "next-auth/next";
import { GET as handlerGet } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(handlerGet);
  console.log("No arquivo principal", session);

  return <div>ola</div>;
}
