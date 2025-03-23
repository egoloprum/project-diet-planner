import { createClient } from "@/src/shared/db/supabase";
import { GoalTracker } from "@/src/widgets/(profile)/goalTracker";
import { NutritionTracker } from "@/src/widgets/(profile)/nutritionTracker";
import { SocialTracker } from "@/src/widgets/(profile)/socialTracker";
import { StatsTracker } from "@/src/widgets/(profile)/statsTracker";
import { WeightChart } from "@/src/widgets/(profile)/weightChart";
import { WeightTracker } from "@/src/widgets/(profile)/weightTracker";

const page = async ({}) => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data.user?.email) {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap gap-4">
          <WeightTracker user={data.user} />
          <WeightChart />
          <SocialTracker />
        </div>

        <div className="flex flex-wrap gap-4">
          <GoalTracker />
          <NutritionTracker />
          <StatsTracker />
        </div>
      </div>
    );
  }

  return <p>This page can not be accessed by unverified user.</p>;
};

export default page;
