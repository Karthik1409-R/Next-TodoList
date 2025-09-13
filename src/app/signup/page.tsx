'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function SignUpPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSignUp = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error('All fields are required!', {
        style: {
          background: '#ef4444',
          color: '#fff',
          fontWeight: 'bold',
        },
      })
      return
    }
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    })

    setLoading(false)

    if (error) {
      toast.error(error.message, {
        style: {
          background: '#ef4444',
          color: '#fff',
          fontWeight: 'bold',
        },
      })
    } else {
      toast.success('Account created successfully! Check your email.', {
        style: {
          background: '#16a34a',
          color: '#fff',
          fontWeight: 'bold',
        },
      })
      router.push('/signin')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-blue-100 to-purple-200">
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl border border-gray-200 shadow-2xl rounded-2xl bg-white/80 backdrop-blur-md">
        <CardHeader className="text-center space-y-2 pb-6">
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
            Create Account
          </CardTitle>
          <CardDescription className="text-gray-600 text-sm sm:text-base">
            Join us today! Fill in your details to get started.
          </CardDescription>
        </CardHeader>
        

        <CardContent className="space-y-5">
          <div className="space-y-4">
            <Input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 sm:h-12 rounded-lg border border-gray-300 bg-white px-3 sm:px-4 text-sm sm:text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 sm:h-12 rounded-lg border border-gray-300 bg-white px-3 sm:px-4 text-sm sm:text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 sm:h-12 rounded-lg border border-gray-300 bg-white px-3 sm:px-4 text-sm sm:text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 pr-10"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  // Eye open SVG
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  // Eye closed SVG
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.442-4.362M6.634 6.634A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.362 5.568M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                  </svg>
                )}
              </span>
            </div>  
          </div>

          <Button
            onClick={handleSignUp}
            onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}
            disabled={loading}
            className="w-full h-11 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg cursor-pointer"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <p className="text-sm text-gray-600">Already have an account?</p>
            <Link
              href="/signin"
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
  