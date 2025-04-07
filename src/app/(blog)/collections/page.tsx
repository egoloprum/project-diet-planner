import { redirect } from 'next/navigation'

import { CreateCollectionForm } from '@/src/features/(blog)/create-collection-form'
import { collectionGetByUser } from '@/src/shared/db'
import { createClient } from '@/src/shared/db/supabase'
import { CollectionList } from '@/src/widgets/(collection)'

const page = async ({}) => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    return redirect('/login')
  }

  const user = data.user
  const collections = await collectionGetByUser(user.id)

  return (
    <div>
      <CreateCollectionForm userId={user.id} />
      <CollectionList collectionData={collections} />
    </div>
  )
}

export default page
