import { FC } from "react";
import { DataTable } from "./data-table";
import { columns, Payment } from "./columns";

interface SocialTrackerProps {}

export const SocialTracker: FC<SocialTrackerProps> = ({}) => {
  const data: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ];

  return (
    <div className="min-w-[300px] flex flex-1 flex-col items-center gap-4">
      <h2 className="text-2xl bold">Social Tracker</h2>

      <DataTable columns={columns} data={data} />
    </div>
  );
};
