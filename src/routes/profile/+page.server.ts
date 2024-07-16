import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from '../$types'

export const load: PageServerLoad = async ({ url, locals: { supabase, getSession } }) => {
  const session = await getSession()

  if (session) {
    const { data: profile } = await supabase
      .from('profiles')
      .select(`username`)
      .eq('id', session.user.id)
      .single()

    const { data: profiles } = await supabase
      .from('profiles')
      .select(`username`)

    return { url: url.origin, session, profile, profiles }  
  }


  return { url: url.origin, session}  

}

export const actions = {
  signout: async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()
    if (session) {
      await supabase.auth.signOut()
      throw redirect(303, '/profile')
    }
  },
}
