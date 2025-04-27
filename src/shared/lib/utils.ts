import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTodayDate = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const newDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`

  return newDate
}
