'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ValidateIdea() {
  const [problem, setProblem] = useState('')
  const [marketSize, setMarketSize] = useState('')
  const [solution, setSolution] = useState('')
  const [validation, setValidation] = useState('')
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/validate-idea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ problem, marketSize, solution }),
      })

      if (response.ok) {
        const data = await response.json()
        setValidation(data.validation)
      } else {
        throw new Error('Failed to validate idea')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to validate idea. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-semibold">Validate Your Idea</h1>
          <Link href="/dashboard">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Idea Validation Form</CardTitle>
            <CardDescription>Answer these questions to get AI-powered feedback on your startup idea.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="problem">What problem does your idea solve?</Label>
                  <Textarea
                    id="problem"
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    placeholder="Describe the problem your startup aims to solve..."
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="marketSize">What is the current market size?</Label>
                  <Input
                    id="marketSize"
                    value={marketSize}
                    onChange={(e) => setMarketSize(e.target.value)}
                    placeholder="Estimate the market size for your solution..."
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="solution">What is your proposed solution?</Label>
                  <Textarea
                    id="solution"
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    placeholder="Describe your solution in detail..."
                  />
                </div>
              </div>
              <Button type="submit" className="mt-4">Validate Idea</Button>
            </form>
          </CardContent>
          {validation && (
            <CardFooter>
              <div className="w-full">
                <h3 className="text-lg font-semibold mb-2">Idea Validation:</h3>
                <p className="text-sm text-gray-600">{validation}</p>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  )
}

