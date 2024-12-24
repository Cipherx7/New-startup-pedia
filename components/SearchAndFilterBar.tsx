import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'

interface SearchAndFilterBarProps {
  onSearch: (query: string) => void
  onFilterChange: (filters: FilterOptions) => void
}

export interface FilterOptions {
  industry: string
  collaboration: string
  phase: string
}

export function SearchAndFilterBar({ onSearch, onFilterChange }: SearchAndFilterBarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<FilterOptions>({
    industry: 'all',
    collaboration: 'all',
    phase: 'all'
  })

  const handleSearch = () => {
    onSearch(searchQuery)
  }

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <Input
            placeholder="Search startups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <div className="flex flex-wrap gap-4">
        <Select onValueChange={(value) => handleFilterChange('industry', value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            <SelectItem value="Tech">Tech</SelectItem>
            <SelectItem value="HealthTech">HealthTech</SelectItem>
            <SelectItem value="EdTech">EdTech</SelectItem>
            <SelectItem value="Logistics">Logistics</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange('collaboration', value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Collaboration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Paid">Paid</SelectItem>
            <SelectItem value="Unpaid">Unpaid</SelectItem>
            <SelectItem value="Equity">Equity</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange('phase', value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Startup Phase" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Phases</SelectItem>
            <SelectItem value="Idea">Idea</SelectItem>
            <SelectItem value="MVP">MVP</SelectItem>
            <SelectItem value="Growth">Growth</SelectItem>
            <SelectItem value="Scale">Scale</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

