import Providers from './provider'
import './globals.css'
import { Toaster } from "react-hot-toast"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" rel="stylesheet" />
         <link rel="icon" href="/todolist.png" />
        <title>TodoX</title>
      </head>
      <body style={{ fontFamily: 'Poppins, sans-serif' }}>
        <Providers>{children}</Providers>
        <Toaster position="top-right" reverseOrder={false} /> 
      </body>
    </html>
  )
}