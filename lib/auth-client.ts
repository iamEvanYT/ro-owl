import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({})

const { useSession: rawUseSession } = authClient
export function useSession() {
  const res = rawUseSession()

  if (res.error?.status == 401) {
    // Just meant they are logged out, silly
    res.error = null;
  }
  
  return res
}

export async function logout() {
    return await authClient.signOut()
}