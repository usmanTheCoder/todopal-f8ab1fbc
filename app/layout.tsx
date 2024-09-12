'use client'

import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from '@/hooks/useAuth'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <title>TodoPal</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <SessionProvider>
          <Provider store={store}>
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
              <Toaster
                position="bottom-right"
                toastOptions={{
                  style: {
                    backgroundColor: '#1f2937',
                    color: '#fff',
                  },
                }}
              />
            </div>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  )
}