import Image from 'next/image'
import { redirect } from 'next/navigation'

import { RecipeCollectionModal } from '@/src/features/(discover)/recipe-collection-modal'
import { RecipeDeleteModal } from '@/src/features/(discover)/recipe-delete-modal'
import { RecipeEditModal } from '@/src/features/(discover)/recipe-edit-modal'
import { NotFound } from '@/src/shared/components/notFound'
import { collectionGetByUser, getProfile, recipeGetById } from '@/src/shared/db'
import { createClient } from '@/src/shared/db/supabase'
import { FoodDetail } from '@/src/widgets/(food)/foodDetail'
import { FoodDirection } from '@/src/widgets/(food)/foodDirection'
import { FoodIngredient } from '@/src/widgets/(food)/foodIngredient'
import { FoodNutrition } from '@/src/widgets/(food)/foodNutrition'

interface pageProps {
  params: {
    id: string
  }
}

const page = async ({ params }: { params: Promise<pageProps['params']> }) => {
  const resolvedParams = await params
  const { id } = resolvedParams

  const recipe = await recipeGetById(id)

  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  const user = data.user

  if (!recipe || !user) {
    return <NotFound href="/custom-recipe" />
  }

  const profile = await getProfile(user.id)

  if (!profile?.is_setup) {
    redirect('/setup')
  }

  const collections = await collectionGetByUser(user.id)

  return (
    <article className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 min-h-[calc(100vh-200px)]">
      <section className="flex flex-col gap-4 md:col-start-1 md:col-end-2">
        <FoodDetail recipe={recipe} />

        {collections && (
          <RecipeCollectionModal
            recipeCollections={recipe.collections}
            recipeId={recipe.id}
            collections={collections}
          />
        )}

        {user.id === recipe.user_id && (
          <div className="flex gap-4">
            <RecipeEditModal userId={user.id} recipe={recipe} />
            <RecipeDeleteModal recipeId={recipe.id} />
          </div>
        )}
      </section>
      <section className=" flex flex-col gap-4 md:col-start-2 md:col-end-3">
        <FoodNutrition recipe={recipe} />
        {recipe.ingredients.length ? <FoodIngredient recipe={recipe} /> : null}
      </section>
      {recipe.directions.length ? (
        <FoodDirection recipe={recipe} />
      ) : (
        <Image
          src="/image_null_directions.png"
          height={200}
          width={200}
          alt="null directions"
        />
      )}
    </article>
  )
}

export default page
