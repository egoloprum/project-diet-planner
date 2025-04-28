import type { NextRequest } from 'next/server'
// import { getProfile } from './shared/db'
// import { createClient } from './shared/db/supabase'

export async function middleware(request: NextRequest) {}

// export async function middleware(request: NextRequest) {
//   const supabase = await createClient()
//   const { data } = await supabase.auth.getUser()

//   if (!data.user || !request.nextUrl.pathname.startsWith('/login')) {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }

//   const user_id = data?.user?.id
//   const profile = await getProfile(user_id || '')

//   if (profile && profile.is_setup) {
//     if (request.nextUrl.pathname.startsWith('/setup')) {
//       return NextResponse.redirect(new URL('/planner', request.url))
//     }
//   } else {
//     if (!request.nextUrl.pathname.startsWith('/setup')) {
//       return NextResponse.redirect(new URL('/setup', request.url))
//     }
//   }
// }

// // export const config = {
// //   matcher: ['/docs/:path*']
// // }
