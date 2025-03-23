import { createClient } from "@/src/shared/db/supabase";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    return redirect("/planner");
  }

  return <div>qweqw</div>;
}
