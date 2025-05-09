export interface Profile {
  id: number
  email: string
  user_name: string
  avatar_url: string
  password: string
  user_id: string

  is_setup: boolean
  gender: 'male' | 'female'
  age: number
  height: number
  activity_level: number

  goal: 'Lose fat' | 'Maintain weight' | 'Build muscle'

  calories: number
  fats: number
  carbs: number
  protein: number
}
