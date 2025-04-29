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

export const calculateBMR = (
  gender: string,
  weight: number,
  height: number,
  age: number
) => {
  if (gender === 'male') {
    const BMR = 10 * weight + 6.25 * height - 5 * age + 5
    return BMR
  } else {
    const BMR = 10 * weight + 6.25 * height - 5 * age - 161
    return BMR
  }
}

export const calculateTDEE = (BMR: number, activityLevel: number) => {
  const activity = [1.2, 1.375, 1.55, 1.725, 1.9]

  return BMR * activity[activityLevel - 1]
}

export const calculateCalories = (TDEE: number, goal: string) => {
  const goalStats: { [key: string]: number } = {
    'Lose fat': 0.8,
    'Maintain weight': 1,
    'Build muscle': 1.15
  }

  return (TDEE * goalStats[goal]) | 0
}

export const calculateCarbs = (calories: number, goal: string) => {
  const goalStats: { [key: string]: number } = {
    'Lose fat': 0.45,
    'Maintain weight': 0.55,
    'Build muscle': 0.55
  }

  return ((calories * goalStats[goal]) / 4) | 0
}

export const calculateFats = (calories: number, goal: string) => {
  const goalStats: { [key: string]: number } = {
    'Lose fat': 0.25,
    'Maintain weight': 0.3,
    'Build muscle': 0.15
  }

  return ((calories * goalStats[goal]) / 9) | 0
}

export const calculateProtein = (calories: number, goal: string) => {
  const goalStats: { [key: string]: number } = {
    'Lose fat': 0.3,
    'Maintain weight': 0.2,
    'Build muscle': 0.3
  }

  return ((calories * goalStats[goal]) / 4) | 0
}

export const calculator = (
  gender: string,
  weight: number,
  height: number,
  age: number,
  activityLevel: number,
  goal: string
) => {
  const BMR = calculateBMR(gender, weight, height, age)
  const TDEE = calculateTDEE(BMR, activityLevel)
  const calories = calculateCalories(TDEE, goal)

  const nutritions = {
    carbs: calculateCarbs(calories, goal),
    fats: calculateFats(calories, goal),
    protein: calculateProtein(calories, goal)
  }

  return { calories, nutritions }
}
