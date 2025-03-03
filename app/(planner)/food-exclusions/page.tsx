import { getExclusion } from "@/src/app/db/exclusion/exclusionHelper"
import { createClient } from "@/src/app/db/supabase"
import { DefaultExclusionList } from "@/src/widgets/(exclusion)/defaultList"
import { SelectedExclusionList } from "@/src/widgets/(exclusion)/selectedList"

import { redirect } from "next/navigation"

const page = async ({}) => {
  const supabase = await createClient()
  const {data} = await supabase.auth.getUser()

  if (!data.user) {
    return redirect('/login')
  }

  const user_id = data.user.id
  const selectedExclusions = await getExclusion(user_id)

  return (
    <div className="flex flex-col gap-6">
      <menu>
        <h1 className="font-bold text-lg sm:text-xl md:text-2xl">Food Exclusion</h1>
        <p className="text-sm sm:text-base">
          Add exclusions to filter out recipes from the generator suggestions. Any recipes 
          that match their title or ingredients will not be included in your plans.
        </p>
      </menu>

      <SelectedExclusionList selectedExclusions={selectedExclusions} />

      <DefaultExclusionList 
        selectedExclusions={selectedExclusions?.list ?? []} 
        user_id={user_id} 
      />
    </div>
  )
}

export default page
