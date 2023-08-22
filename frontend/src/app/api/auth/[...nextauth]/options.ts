import { apiUrls, baseUrl } from '@/constants/urls'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email:', type: 'email', placeholder: 'Enter your email.' },
        pwd: { label: 'Password', type: 'password', placeholder: 'Enter your password.' }
      },
      async authorize (credentials) {
        const res = await fetch(baseUrl + apiUrls.auth.login, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        })

        const user = await res.json()
        if (res.ok && (user !== null || user !== undefined)) {
          return user
        } else return null
      }
    })
  ],
  callbacks: {
    async jwt ({ token, user }) {
      return ({ ...token, ...user })
    },
    async session ({ session, token, user }: any) {
      session.user = token
      return session
    },
    async redirect ({ url, baseUrl }) {
      return baseUrl
    }
  },

  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  }
}
