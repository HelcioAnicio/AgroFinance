import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error("Supabase environment variables are missing!");
// }

export const supabase = createClient(supabaseUrl, supabaseKey);

// export async function signInWithEmail(email: string, password: string) {
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error) {
//     console.error("Login error:", error.message);
//     return null;
//   }

//   return data.user;
// }

// export async function signOut() {
//   const { error } = await supabase.auth.signOut();
//   if (error) {
//     console.error("Logout error:", error.message);
//   }
// }
