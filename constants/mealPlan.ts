import { DayKey } from "./diasSemana";
import { FoodItem } from "./foodItem";

export interface MealPlan {
  id: string;
  mealName: string;
  mealTime: string;
  foods: FoodItem[];
  days: DayKey[];
  notify: boolean;
}