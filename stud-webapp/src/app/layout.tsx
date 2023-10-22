import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Stud',
  description: 'We make studying easy, fun, and trackable.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
      </Head>
      <body className={`${inter.className} bg-gradient-to-r from-sky-200 `}>
        <div className='flex flex-col min-h-screen'>
          {children}
        </div>
      </body>
    </html>
  )
}
