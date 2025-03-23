import { redirect } from 'next/navigation'

import { CreateCustomRecipeForm } from '@/src/features/(blog)/create-custom-recipe-form'
import { createClient } from '@/src/shared/db/supabase'

const page = async ({}) => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    return redirect('/login')
  }

  return (
    <div>
      blah2
      <CreateCustomRecipeForm userId={data.user?.id} />
    </div>
  )
}

export default page
