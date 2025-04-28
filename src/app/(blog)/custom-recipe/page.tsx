import { redirect } from 'next/navigation'

import { CreateCustomRecipeForm } from '@/src/features/(collection)/create-custom-recipe-form'
import { getProfile } from '@/src/shared/db'
import { recipeGetByUser } from '@/src/shared/db/recipe/recipeHelpers'
import { createClient } from '@/src/shared/db/supabase'
import { RecipeList } from '@/src/widgets/(discover)/recipeList'

const page = async ({}) => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    return redirect('/login')
  }

  const user = data.user
  const profile = await getProfile(user.id)

  if (!profile?.is_setup) {
    redirect('/setup')
  }

  const recipes = await recipeGetByUser(user.id)

  return (
    <div className="min-h-[calc(100vh-200px)]">
      <CreateCustomRecipeForm userId={user.id} />
      <RecipeList recipeData={recipes} />
    </div>
  )
}

export default page
