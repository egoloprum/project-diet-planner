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

export const extractDate = (date: string) => {
  const newDate = new Date(date)
  const year = newDate.getFullYear()
  const month = newDate.getMonth() + 1
  const day = newDate.getDate()

  return `${year}-${month}-${day}`
}

// fix 2025-4-31
export const isValidDate = (
  date: string,
  userDate: string,
  today: string
): boolean => {
  const regex = /^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/

  if (!regex.test(date)) {
    return false
  }

  const dateObj = new Date(date)
  const userDateObj = new Date(userDate)
  const todayObj = new Date(today)

  return dateObj >= userDateObj && dateObj <= todayObj
}

export function humanizeDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long'
  }

  const { weekday, month: monthName } = new Intl.DateTimeFormat(
    'en-US',
    options
  )
    .formatToParts(date)
    .reduce(
      (acc, part) => {
        acc[part.type as keyof typeof acc] = part.value
        return acc
      },
      { weekday: '', month: '' }
    )

  const dayOfMonth = date.getDate()

  return `${weekday}, ${monthName} ${dayOfMonth}`
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

type calculateMealCaloriesPercentagesData = {
  breakfast?: boolean
  lunch?: boolean
  dinner?: boolean
  snack?: boolean
  dessert?: boolean
}

export const calculateMealCaloriesPercentages = (
  data: calculateMealCaloriesPercentagesData
) => {
  const mealPercentages = {
    breakfast: 25,
    lunch: 25,
    dinner: 35,
    snack: 10,
    dessert: 5
  }

  const selectedMeals = []

  if (data.breakfast)
    selectedMeals.push({
      name: 'breakfast',
      percentage: mealPercentages.breakfast
    })
  if (data.lunch)
    selectedMeals.push({ name: 'lunch', percentage: mealPercentages.lunch })
  if (data.dinner)
    selectedMeals.push({ name: 'dinner', percentage: mealPercentages.dinner })
  if (data.snack)
    selectedMeals.push({ name: 'snack', percentage: mealPercentages.snack })
  if (data.dessert)
    selectedMeals.push({ name: 'dessert', percentage: mealPercentages.dessert })

  const totalSelectedPercentage = selectedMeals.reduce(
    (total, meal) => total + meal.percentage,
    0
  )

  const adjustedPercentages = selectedMeals.map(meal => ({
    name: meal.name,
    percentage: Math.floor((meal.percentage / totalSelectedPercentage) * 100)
  }))

  return adjustedPercentages
}
