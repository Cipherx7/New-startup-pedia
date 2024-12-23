import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Users, LineChart } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="container mx-auto flex flex-wrap items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2 text-primary">
          <Rocket className="h-6 w-6" />
          <span className="text-xl font-semibold">StartupMatch</span>
        </Link>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/faq" className="text-primary hover:underline">
            FAQ
          </Link>
          <Link href="/signup">
            <Button variant="outline" className="text-blue-500 border-blue-500 hover:bg-blue-50">
              Sign Up
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto grid items-center gap-8 px-4 py-12 sm:grid-cols-1 md:grid-cols-2 md:py-24">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-[#1e3a8a] sm:text-5xl md:text-6xl">
            Connect with Amazing Startups
          </h1>
          <p className="text-lg text-muted-foreground">
            Join a platform where innovative startups meet talented individuals. Whether you're building the next big thing or looking to be part of one, StartupMatch is your gateway to exciting opportunities.
          </p>
        </div>
        <div className="relative mt-8 md:mt-0">
          <div className="relative h-[400px] overflow-hidden rounded-xl">
            <Image
              src="/placeholder.svg"
              alt="Startup team collaborating"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-4 right-4 rounded-lg bg-white p-4 shadow-lg">
            <p className="font-semibold text-primary">Join 1000+ startups</p>
            <p className="text-sm text-muted-foreground">Finding their perfect match</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="flex flex-col items-start gap-4 p-6">
              <div className="rounded-lg bg-primary/10 p-3">
                <Rocket className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Post Your Startup</h3>
              <p className="text-muted-foreground">
                Share your vision and requirements with our community of talented individuals.
              </p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="flex flex-col items-start gap-4 p-6">
              <div className="rounded-lg bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Find Talent</h3>
              <p className="text-muted-foreground">
                Connect with skilled professionals who are passionate about your mission.
              </p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="flex flex-col items-start gap-4 p-6">
              <div className="rounded-lg bg-primary/10 p-3">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Grow Together</h3>
              <p className="text-muted-foreground">
                Build lasting partnerships and turn your startup dreams into reality.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-12 space-y-8 md:grid md:grid-cols-3 md:space-y-0">
          <div>
            <div className="flex items-center gap-2">
              <Rocket className="h-6 w-6" />
              <span className="text-xl font-semibold">StartupMatch</span>
            </div>
            <p className="mt-2 text-primary-foreground/80">
              Connecting innovative startups with talented individuals.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="text-primary-foreground/80 hover:text-primary-foreground">
                About Us
              </Link>
              <Link href="/how-it-works" className="text-primary-foreground/80 hover:text-primary-foreground">
                How it Works
              </Link>
              <Link href="/success-stories" className="text-primary-foreground/80 hover:text-primary-foreground">
                Success Stories
              </Link>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Connect With Us</h4>
            <div className="flex gap-4">
              <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-primary-foreground/10 pt-8 text-center text-sm text-primary-foreground/60">
          © 2024 StartupMatch. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
