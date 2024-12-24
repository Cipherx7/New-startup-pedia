import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Edit, LogOut, Settings } from 'lucide-react'

interface ProfileCardProps {
  name: string
  email: string
  isProfileComplete: boolean
}

export function ProfileCard({ name, email, isProfileComplete }: ProfileCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const maskedEmail = email.replace(/(.{2})(.*)(?=@)/, (_, start, rest) => start + '*'.repeat(rest.length))

  const handleSignOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('firstName')
    localStorage.removeItem('lastName')
    localStorage.removeItem('email')
    router.push('/')
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <span className="text-xl font-semibold text-primary-foreground">{name[0]}</span>
          </div>
          <div className="flex flex-col">
            <p className="font-medium">{name}</p>
            <p className="text-sm text-muted-foreground">{maskedEmail}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        {!isProfileComplete && (
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex w-full cursor-pointer items-center text-blue-600">
              <Edit className="mr-2 h-4 w-4" />
              Complete Your Profile
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex w-full cursor-pointer items-center">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:bg-red-100 focus:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

