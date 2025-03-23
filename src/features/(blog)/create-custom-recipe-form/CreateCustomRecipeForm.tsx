"use client";

import { Button } from "@/src/shared/ui/button";
import { FC } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/shared/ui/alert-dialog";
import { Input } from "@/src/shared/ui/input";
import { Label } from "@/src/shared/ui/label";
import { Checkbox } from "@/src/shared/ui/checkbox";
import { Separator } from "@/src/shared/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/src/shared/ui/toggle-group";
import { Textarea } from "@/src/shared/ui/textarea";

interface CreateCustomRecipeFormProps {}

export const CreateCustomRecipeForm: FC<CreateCustomRecipeFormProps> = ({}) => {
  const OnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("clicked create custom recipe");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Create custom recipe</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-[80%] overflow-y-auto">
        <form className="flex flex-col gap-6" onSubmit={OnSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle>Create Custom Recipe</AlertDialogTitle>
            <AlertDialogDescription>
              User can create any recipe they want.
            </AlertDialogDescription>
            <div className="flex flex-col gap-4">
              <div>
                <Label htmlFor="food-name">Food Name</Label>
                <Input type="text" id="food-name" />
              </div>
              <Separator />

              <fieldset className="flex gap-4 justify-between">
                <div className="w-full basis-1/2">
                  <Label htmlFor="prep-time">Preperation Time</Label>
                  <Input type="text" id="prep-time" />
                </div>

                <div className="w-full basis-1/2">
                  <Label htmlFor="cook-time">Cook Time</Label>
                  <Input type="text" id="cook-time" />
                </div>
              </fieldset>
              <Separator />

              <fieldset>
                <Label>Type of Dish</Label>
                <Separator className="my-2" />
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Checkbox id="main-dish" />
                    <Label htmlFor="main-dish">Main Dish</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="breakfast" />
                    <Label htmlFor="breakfast">Breakfast</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="lunch" />
                    <Label htmlFor="lunch">Lunch</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="dinner" />
                    <Label htmlFor="dinner">Dinner</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="dessert" />
                    <Label htmlFor="dessert">Dessert</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="snack" />
                    <Label htmlFor="snack">Snack</Label>
                  </div>
                </div>
              </fieldset>
              <Separator />

              <fieldset>
                <Label>Tags</Label>
                <Separator className="my-2" />
                <ToggleGroup type="multiple" className="flex-wrap">
                  <ToggleGroupItem value="Healthy">Healthy</ToggleGroupItem>
                  <ToggleGroupItem value="Romantic">Romantic</ToggleGroupItem>
                  <ToggleGroupItem value="Mexican">Mexican</ToggleGroupItem>
                  <ToggleGroupItem value="American">American</ToggleGroupItem>
                  <ToggleGroupItem value="Dinner">Dinner</ToggleGroupItem>
                  <ToggleGroupItem value="Lunch">Lunch</ToggleGroupItem>
                  <ToggleGroupItem value="Breakfast">Breakfast</ToggleGroupItem>
                  <ToggleGroupItem value="Low Carb">Low Carb</ToggleGroupItem>
                  <ToggleGroupItem value="Vegetarian">
                    Vegetarian
                  </ToggleGroupItem>
                </ToggleGroup>
              </fieldset>
              <Separator />

              <fieldset>
                <Label>Nutritions</Label>
                <Separator className="my-2" />
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="fats">Fats</Label>
                    <Input
                      id="fats"
                      type="number"
                      className="max-w-[4rem]"
                      max={100}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor="carbs">Carbs</Label>
                    <Input
                      id="carbs"
                      type="number"
                      className="max-w-[4rem]"
                      max={200}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor="fiber">Fiber</Label>
                    <Input
                      id="fiber"
                      type="number"
                      className="max-w-[4rem]"
                      max={100}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor="sugar">Sugar</Label>
                    <Input
                      id="sugar"
                      type="number"
                      className="max-w-[4rem]"
                      max={100}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor="protein">Protein</Label>
                    <Input
                      id="protein"
                      type="number"
                      className="max-w-[4rem]"
                      max={100}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor="calories">Calories</Label>
                    <Input
                      id="calories"
                      type="number"
                      className="max-w-[4rem]"
                      max={1000}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor="cholesterol">Cholesterol</Label>
                    <Input
                      id="cholesterol"
                      type="number"
                      className="max-w-[4rem]"
                      max={300}
                    />
                  </div>
                </div>
              </fieldset>
              <Separator />

              <fieldset>
                <Label htmlFor="direction">Direction</Label>
                <Textarea id="direction" />
              </fieldset>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">
              Create Custom Recipe
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
