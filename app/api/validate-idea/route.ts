import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { problem, marketSize, solution } = await req.json()

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert startup advisor. Analyze the given startup idea and provide constructive feedback."
        },
        {
          role: "user",
          content: `Problem: ${problem}\nMarket Size: ${marketSize}\nSolution: ${solution}\n\nPlease provide a brief analysis of this startup idea, highlighting its strengths and potential challenges.`
        }
      ],
    })

    const validation = completion.choices[0].message.content

    return NextResponse.json({ validation })
  } catch (error) {
    console.error('Error validating idea:', error)
    return NextResponse.json({ error: 'Failed to validate idea' }, { status: 500 })
  }
}

