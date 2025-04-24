'use client'

import axios from 'axios'
import { FC, Fragment } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useToast } from '@/src/shared/hooks'
import { Collection } from '@/src/shared/model'
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
  Button,
  Separator,
  ToggleGroup,
  ToggleGroupItem
} from '@/src/shared/ui'

interface RecipeCollectionModalProps {
  recipeCollections: number[]
  recipeId: number
  collections: Collection[]
}

type RecipeCollectionData = {
  collections: string[]
}

export const RecipeCollectionModal: FC<RecipeCollectionModalProps> = ({
  recipeCollections,
  recipeId,
  collections
}) => {
  const { handleSubmit, control, reset } = useForm<RecipeCollectionData>({
    defaultValues: {
      collections: recipeCollections.map(String)
    }
  })

  const { toast } = useToast()

  const onSubmit: SubmitHandler<RecipeCollectionData> = async data => {
    try {
      axios.patch('/api/recipe/add-collection', {
        recipe_id: recipeId,
        collections: data.collections
      })

      collections.map((collection: Collection) => {
        const isSelected = data.collections.includes(String(collection.id))
        const recipeExists = collection.recipes.includes(recipeId)

        if (isSelected) {
          if (!recipeExists) {
            axios.patch('/api/collection/add-recipe', {
              collection_id: collection.id,
              recipes: [...collection.recipes, recipeId]
            })

            toast({
              variant: 'default',
              title: 'Recipe is successfuly added to collection!'
            })
          }
        } else {
          axios.patch('/api/collection/add-recipe', {
            collection_id: collection.id,
            recipes: collection.recipes.filter(id => id !== recipeId)
          })

          toast({
            variant: 'default',
            title: 'Recipe is successfuly removed from collection!'
          })
        }
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: error.response?.data?.error || 'Adding to collection failed!'
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'An unexpected error occurred!'
        })
      }
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Add to Collection</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-[80%] overflow-y-auto">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <AlertDialogHeader>
            <AlertDialogTitle>Add to Collection</AlertDialogTitle>
            <AlertDialogDescription>
              User can add this recipe to their collection.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Separator />

          <Controller
            control={control}
            name="collections"
            render={({ field }) => (
              <ToggleGroup
                variant="outline"
                type="multiple"
                className="flex flex-col gap-4 items-start"
                value={field.value}
                onValueChange={field.onChange}>
                {collections.map((collection: Collection) => (
                  <Fragment key={collection.id}>
                    <div className="flex gap-4 items-center">
                      <ToggleGroupItem
                        value={`${collection.id}`}
                        variant="outline"
                        aria-label="Toggle collection"
                        type="submit">
                        Add to
                      </ToggleGroupItem>
                      <p>{collection.name}</p>
                    </div>
                    <Separator />
                  </Fragment>
                ))}
              </ToggleGroup>
            )}
          />

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => reset()}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction type="submit">Save</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
