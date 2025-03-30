import { ProfileSettingsForm } from '@/src/features/profile-settings-form'
import { createClient } from '@/src/shared/db/supabase'

const page = async ({}) => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  const user = data.user

  if (!user || !user.email) {
    return <p>This page can not be accessed by unverified user.</p>
  }

  const { data: profileData } = await supabase
    .from('profile')
    .select('*')
    .eq('user_id', user.id)

  console.log(profileData)

  return <ProfileSettingsForm user={data.user} profile={profileData} />
}

export default page
