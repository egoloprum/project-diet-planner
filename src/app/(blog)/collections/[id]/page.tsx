import { CollectionDeleteModal } from '@/src/features/(collection)/collection-delete-modal'
import { CollectionEditModal } from '@/src/features/(collection)/collection-edit-modal'
import { NotFound } from '@/src/shared/components/notFound'
import { collectionGetById, recipeGetByCollection } from '@/src/shared/db'
import { createClient } from '@/src/shared/db/supabase'
import { CollectionDetail } from '@/src/widgets/(collection)/collectionDetail'
import { CollectionRecipe } from '@/src/widgets/(collection)/collectionRecipe'

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

  const recipes = await recipeGetByCollection(collection.id)

  return (
    <article className="flex gap-8 flex-col md:flex-row">
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
