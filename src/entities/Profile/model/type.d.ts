interface WeightTracker {
  weight: number;
  created_at: Date;
}

interface NutritionTracker {
  calories: number;
  carbs: number;
  fats: number;
  protein: number;
}

interface PhysicalStatsTracker {
  age: number;
  height: number;
  body_fat: number;
  activity_level:
    | ""
    | "very light"
    | "light"
    | "moderate"
    | "active"
    | "very active";
}

interface ProfileSettings {
  username: string;
  email: string;
  password: string;
}

interface Profile {
  goal: "" | "lose" | "maintain" | " gain";
  weightTracker: WeightTracker;
  nutritionTracker: NutritionTracker;
  physicalStatsTracker: PhysicalStatsTracker;
  profileSettings: ProfileSettings;

  created_at: string;
}
