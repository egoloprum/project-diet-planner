import { recipeGetById } from '@/src/shared/db/recipe/recipeHelpers'
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

  if (!recipe) {
    return null
  }

  return (
    <article className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      <section className="flex flex-col gap-4 md:col-start-1 md:col-end-2">
        <FoodDetail recipe={recipe} />
        <>buttons</>
      </section>
      <section className=" flex flex-col gap-4 md:col-start-2 md:col-end-3">
        <FoodNutrition recipe={recipe} />
        <FoodIngredient recipe={recipe} />
      </section>
      <FoodDirection recipe={recipe} />
    </article>
  )
}

export default page
