import { FC } from "react";
import { Component } from "./charts";

interface WeightChartProps {}

export const WeightChart: FC<WeightChartProps> = ({}) => {
  return (
    <div className="min-w-[300px] flex flex-1 flex-col items-center gap-4">
      <h2 className="text-2xl bold">Weight Chart</h2>

      <div>
        <Component />
      </div>
    </div>
  );
};
