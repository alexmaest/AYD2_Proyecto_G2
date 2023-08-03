import './globals.css'
import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import { Providers } from './providers'

const nunitoSans = Nunito_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify',
  description: 'A platform for music lovers'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es'>
      <body className={`${nunitoSans.className} dark bg-retro-black text-white`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
