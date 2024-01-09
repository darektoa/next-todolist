import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import Header from './_partials/Header'
import Footer from './_partials/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Todo-list App',
    description: 'My nextjs app',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <Header />
                    {children}
                    <Footer />
                </Providers>
            </body>
        </html>
    )
}
