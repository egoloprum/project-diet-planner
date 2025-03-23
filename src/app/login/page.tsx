import { createClient } from "@/src/shared/db/supabase";
import { LoginForm } from "@/src/features/loginForm";
import { redirect } from "next/navigation";

const page = async ({}) => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    return redirect("/planner");
  }

  return (
    <div className="h-[calc(100vh-84px)] flex justify-center items-center">
      <LoginForm />
    </div>
  );
};

export default page;
