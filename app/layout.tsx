import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'

import { cn } from '@/lib/utils'

import './globals.css'
import Providers from '@/components/providers'
import Header from '@/components/header'
import Footer from '@/components/footer'

const dmSans = DM_Sans({ 
  subsets: ['latin'], 
})


export const metadata: Metadata = {
  title: {
    default: 'Haron Ngaira — Fullstack Developer',
    template: '%s | Haron Ngaira',
  },
  description:
    'Fullstack Developer based in Kiambu, Kenya. Passionate about automation, deployment, monitoring, and security for cloud-based applications.',
  openGraph: {
    title: 'Haron Ngaira — Fullstack Developer',
    description:
      'Fullstack Developer based in Kiambu, Kenya. Passionate about automation, deployment, monitoring, and security for cloud-based applications.',
    type: 'website',
  },
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-screen flex-col font-sans antialiased',
          dmSans.className,
        )}
      >
        <Providers>
          <Header />
          <main className='grow pt-24'>
            <div className='max-w-4xl mx-auto px-4'>
              {children}
            </div>
            </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}