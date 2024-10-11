import { redirect } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

async function getUserSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("Error fetching session:", error.message);
    return null;
  }

  return session;
}

export default async function Dashboard() {
  const session = await getUserSession();

  if (!session) {
    redirect("/login"); // Redireciona para a página de login se não houver sessão
  }

  return <div>Protected Dashboard</div>;
}
