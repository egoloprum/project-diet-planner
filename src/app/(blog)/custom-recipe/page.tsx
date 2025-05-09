import { redirect } from 'next/navigation'

import { getProfile } from '@/src/entities/profile'
import { recipeGetByUser } from '@/src/entities/recipe'
import { CreateCustomRecipeForm } from '@/src/features/collection'
import { createClient } from '@/src/shared/db/supabase'
import { RecipeList } from '@/src/widgets/recipe'

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
