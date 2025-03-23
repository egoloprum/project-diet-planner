"use client";

import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { Label } from "@/src/shared/ui/label";
import { Separator } from "@/src/shared/ui/separator";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { FC, useRef, useState } from "react";

interface ProfileSettingsFormProps {
  user: User;
}

export const ProfileSettingsForm: FC<ProfileSettingsFormProps> = ({ user }) => {
  const [isEditable, setIsEditable] = useState<boolean>(true);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsEditable(true);
  };

  const onClick = () => {
    if (isEditable) {
      setIsEditable(false);
    } else {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    }
  };

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div>
      <h1 className="bold text-2xl">Profile Settings</h1>
      <Separator className="my-4" />

      <div className="flex flex-1 flex-wrap justify-between items-center gap-4">
        <h2 className="text-xl">Profile</h2>
        <div className="flex items-center gap-4">
          <div className="relative h-10 w-10">
            <Image
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-full"
              src={"/pics/1.png"}
              alt="profile pic"
            />
          </div>
          <p>Username</p>
        </div>
        <Button
          variant={isEditable ? "secondary" : "default"}
          type="submit"
          onClick={onClick}
          className="max-w-[150px] w-full"
        >
          {isEditable ? "Edit profile" : "Save profile"}
        </Button>
      </div>

      <Separator className="my-4" />

      <form className="flex flex-wrap gap-4" onSubmit={onSubmit} ref={formRef}>
        <fieldset className="flex gap-4 justify-between sm:justify-normal items-center max-w-[300px] w-full">
          <Label className="text-nowrap">Email address</Label>
          <Input
            className="max-w-[200px] w-full"
            type="email"
            disabled={isEditable}
            placeholder="Email"
            defaultValue={user.email}
          />
        </fieldset>
        <fieldset className="flex gap-4 justify-between sm:justify-normal items-center max-w-[300px] w-full">
          <Label className="">Username</Label>
          <Input
            className="max-w-[200px] w-full"
            type="text"
            placeholder="Username"
            disabled={isEditable}
          />
        </fieldset>
        <fieldset className="flex gap-4 justify-between sm:justify-normal items-center max-w-[300px] w-full">
          <Label className="">Password</Label>
          <Input
            className="max-w-[200px] w-full"
            type="password"
            placeholder="Password"
            disabled={isEditable}
          />
        </fieldset>
      </form>
    </div>
  );
};
