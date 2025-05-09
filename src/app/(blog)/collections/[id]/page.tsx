import { redirect } from 'next/navigation'

import { collectionGetById } from '@/src/entities/collection'
import { getProfile } from '@/src/entities/profile'
import { recipeGetByCollection } from '@/src/entities/recipe'
import {
  CollectionDeleteModal,
  CollectionEditModal
} from '@/src/features/collection'
import { NotFound } from '@/src/shared/components/notFound'
import { createClient } from '@/src/shared/db/supabase'
import { CollectionDetail, CollectionRecipe } from '@/src/widgets/collection'

interface pageProps {
  params: {
    id: string
  }
}

const page = async ({ params }: { params: Promise<pageProps['params']> }) => {
  const resolvedParams = await params
  const { id } = resolvedParams

  const collection = await collectionGetById(Number(id))

  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  const user = data.user

  if (!collection || !user) {
    return <NotFound href="/collections" />
  }

  const profile = await getProfile(user.id)

  if (!profile?.is_setup) {
    redirect('/setup')
  }

  const recipes = await recipeGetByCollection(collection.id)

  return (
    <article className="flex gap-8 flex-col md:flex-row min-h-[calc(100vh-200px)]">
      <section className="w-fit flex flex-col gap-4">
        <CollectionDetail
          collection={collection}
          userId={user.id}
          recipeCount={recipes?.length || 0}
        />

        {user.id === collection.user_id && (
          <div className="flex gap-4 flex-wrap sm:flex-nowrap">
            <CollectionEditModal userId={user.id} collection={collection} />
            <CollectionDeleteModal collectionId={collection.id} />
          </div>
        )}
      </section>
      <section className="w-full">
        <CollectionRecipe recipes={recipes} />
      </section>
    </article>
  )
}

export default page
