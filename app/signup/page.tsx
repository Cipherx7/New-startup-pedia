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

export default function SignUp() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirm-password') as string

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
      })

      if (response.ok) {
        router.push('/signin')
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to create account')
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
            <CardTitle className="text-2xl font-bold text-blue-900">Create an account</CardTitle>
          </div>
          <CardDescription className="text-center text-gray-600">
            Enter your details to create your account
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
              <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
              <Input id="firstName" name="firstName" required className="border-blue-200 focus:border-blue-400 focus:ring-blue-400" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
              <Input id="lastName" name="lastName" required className="border-blue-200 focus:border-blue-400 focus:ring-blue-400" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required className="border-blue-200 focus:border-blue-400 focus:ring-blue-400" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <Input id="password" name="password" type="password" required className="border-blue-200 focus:border-blue-400 focus:ring-blue-400" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-gray-700">Confirm Password</Label>
              <Input id="confirm-password" name="confirm-password" type="password" required className="border-blue-200 focus:border-blue-400 focus:ring-blue-400" />
            </div>
            <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/signin" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

