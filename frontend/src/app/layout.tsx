import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IP Lookup Tool',
  description: 'Ferramenta para buscar IPs, servidores e informações de rede',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <h1 className="text-2xl font-bold text-gray-900">
                      🌐 IP Lookup Tool
                    </h1>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Ferramenta de consulta de rede
                </div>
              </div>
            </div>
          </header>
          
          <main className="flex-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </main>
          
          <footer className="bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="text-center text-sm">
                <p>&copy; 2024 IP Lookup Tool. Desenvolvido com Next.js e Go.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}