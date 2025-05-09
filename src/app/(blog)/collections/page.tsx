import { redirect } from 'next/navigation'

import { collectionGetByUser } from '@/src/entities/collection'
import { getProfile } from '@/src/entities/profile'
import { CollectionCreateModal } from '@/src/features/collection'
import { createClient } from '@/src/shared/db/supabase'
import { CollectionList } from '@/src/widgets/collection'

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

  const collections = await collectionGetByUser(user.id)

  return (
    <div className="min-h-[calc(100vh-200px)]">
      <CollectionCreateModal userId={user.id} />
      <CollectionList collectionData={collections} />
    </div>
  )
}

export default page
