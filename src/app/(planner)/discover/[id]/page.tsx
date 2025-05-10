import Image from 'next/image'
import { redirect } from 'next/navigation'

import { collectionGetByUser } from '@/src/entities/collection'
import { getProfile } from '@/src/entities/profile'
import { recipeGetById } from '@/src/entities/recipe'
import {
  RecipeCollectionModal,
  RecipeDeleteModal,
  RecipeEditModal
} from '@/src/features/recipe'
import { NotFound } from '@/src/shared/components/notFound'
import { createClient } from '@/src/shared/db/supabase'
import {
  FoodDetail,
  FoodDirection,
  FoodIngredient,
  FoodNutrition
} from '@/src/widgets/recipe'

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
    return <NotFound href="/" />
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
