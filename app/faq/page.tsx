import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQ() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-center text-4xl font-bold">Frequently Asked Questions</h1>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is StartupMatch?</AccordionTrigger>
              <AccordionContent>
                StartupMatch is a platform that connects innovative startups with talented individuals. 
                Whether you're building the next big thing or looking to be part of one, we provide 
                the platform to make those connections happen.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How does it work?</AccordionTrigger>
              <AccordionContent>
                Create a profile, browse opportunities, and connect with startups that match your 
                interests. Startups can post opportunities and browse through talented individuals 
                who might be a perfect fit for their team.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it free to use?</AccordionTrigger>
              <AccordionContent>
                Yes, basic features are free for all users. We also offer premium features for 
                subscribed members who want access to advanced tools and priority support.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How do I get started?</AccordionTrigger>
              <AccordionContent>
                Getting started is easy! Simply sign up for an account, complete your profile, 
                and start exploring opportunities or posting your startup's needs.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="mt-8 text-center">
            <p className="mb-4">Ready to get started?</p>
            <div className="flex justify-center gap-4">
              <Link href="/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

