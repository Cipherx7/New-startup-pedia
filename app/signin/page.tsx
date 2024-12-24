'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket } from 'lucide-react'

export default function SignIn() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('token', data.token)
        localStorage.setItem('firstName', data.firstName)
        localStorage.setItem('lastName', data.lastName)
        localStorage.setItem('email', email)
        localStorage.setItem('profileComplete', 'true') // This is a placeholder, replace with actual logic
        router.push('/dashboard')
      } else {
        const data = await response.json()
        setError(data.message || 'Invalid email or password')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50 p-6">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <Rocket className="h-6 w-6 text-blue-600" />
            <CardTitle className="text-2xl font-bold text-blue-900">Sign in to StartupMatch</CardTitle>
          </div>
          <CardDescription className="text-center text-gray-600">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required className="border-blue-200 focus:border-blue-400 focus:ring-blue-400" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <Input id="password" name="password" type="password" required className="border-blue-200 focus:border-blue-400 focus:ring-blue-400" />
            </div>
            <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

