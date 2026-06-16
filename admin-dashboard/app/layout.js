import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google'
import StoreProvider from './StoreProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-body' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display' })

export const metadata = {
  title: { default: 'TopTrainer', template: '%s | TopTrainer' },
    description: 'Manage your workshops, articles, and analytics',
    }

    export default function RootLayout({ children }) {
      return (
          <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable}`}>
                <body>
                        <StoreProvider>
                                  {children}
                                          </StoreProvider>
                                                </body>
                                                    </html>
                                                      )
                                                      }