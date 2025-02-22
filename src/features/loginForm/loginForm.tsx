"use client"

import { Button } from "@/src/shared/ui/button"
import { Input } from "@/src/shared/ui/input"
import { SubmitHandler, useForm } from "react-hook-form"

type LoginInput = {
  email: string
  password: string
}

export const LoginForm = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>()

  const onSubmit: SubmitHandler<LoginInput> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border-2 rounded-lg p-4 max-w-96 w-full flex flex-col gap-4 mt-4">
      <fieldset>
        <label htmlFor="">Email</label>
        <Input type="email" placeholder="Email" {...register("email")} />
      </fieldset>
      <fieldset>
        <label htmlFor="">Password</label>
        <Input type="password" placeholder="Password" {...register("password")} />
      </fieldset>
      <Button className="w-full" type="submit">Log in</Button>
      <fieldset className="flex gap-2 items-center">
        <span className="border w-full h-0"></span>
        <span className="">Or</span>
        <span className="border w-full h-0"></span>
      </fieldset>
      <Button type="button">Log in with google</Button>
    </form>
  )
}
