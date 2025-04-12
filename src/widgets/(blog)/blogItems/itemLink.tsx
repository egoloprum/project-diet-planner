'use client'

import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

import { Recipe } from '@/src/shared/model'

const recipeCache = new Map<number, Recipe>()

export const RecipeLink: FC<{ recipe_id: number }> = ({ recipe_id }) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchRecipe = async () => {
      if (recipeCache.has(recipe_id)) {
        if (isMounted) {
          setRecipe(recipeCache.get(recipe_id)!)
          setLoading(false)
        }
        return
      }

      try {
        setLoading(true)
        const response = await axios.get<Recipe>('/api/recipe/get', {
          params: { id: recipe_id }
        })
        if (isMounted) {
          const data = response.data

          recipeCache.set(recipe_id, data)
          setRecipe(data)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchRecipe()

    return () => {
      isMounted = false
    }
  }, [recipe_id])

  if (loading) {
    return (
      <div className="py-4 flex gap-2 animate-pulse">
        <div className="w-[100px] h-[100px] bg-gray-200 rounded"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="py-4 text-red-500">Error loading recipe</div>
  }

  if (!recipe) return null

  return (
    <Link
      href={`/discover/${recipe_id}`}
      className="py-4 flex gap-2 hover:bg-gray-50 active:bg-gray-100 cursor-pointer">
      <Image
        src={recipe.images?.thumbnail || '/default_thumbnail_recipe.jpg'}
        className="object-cover"
        width={100}
        height={100}
        loading="lazy"
        alt={recipe.food_name}
      />
      <div className="flex flex-col gap-2">
        <p className="font-medium">{recipe.food_name}</p>
        <p className="flex flex-row flex-wrap gap-1 md:gap-4 text-gray-500 text-sm">
          <span>cal: {recipe.nutritions.calories}</span>
          <span>carbs: {recipe.nutritions.carbs}g</span>
          <span>fats: {recipe.nutritions.fats}g</span>
          <span>protein: {recipe.nutritions.protein}g</span>
        </p>
      </div>
    </Link>
  )
}
