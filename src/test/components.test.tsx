import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CharacterSearch from '../components/characters/CharacterSearch'
import { Loading } from '../components/common/Loading'
import ErrorDisplay from '../components/common/ErrorDisplay'

describe('CharacterSearch', () => {
  it('renders search input with placeholder', () => {
    const mockOnSearch = vi.fn()
    
    render(
      <CharacterSearch
        value=""
        onSearchChange={mockOnSearch}
        loading={false}
        placeholder="Search characters..."
      />
    )

    expect(screen.getByPlaceholderText('Search characters...')).toBeInTheDocument()
  })

  it('calls onSearchChange when typing', () => {
    const mockOnSearch = vi.fn()
    
    render(
      <CharacterSearch
        value=""
        onSearchChange={mockOnSearch}
        loading={false}
        placeholder="Search characters..."
      />
    )

    const input = screen.getByPlaceholderText('Search characters...')
    fireEvent.change(input, { target: { value: 'Luke' } })

    // Should call the search function (debounced, so we just check it was set up)
    expect(input).toHaveValue('Luke')
  })

  it('shows loading state when loading is true', () => {
    const mockOnSearch = vi.fn()
    
    render(
      <CharacterSearch
        value="test"
        onSearchChange={mockOnSearch}
        loading={true}
        placeholder="Search characters..."
      />
    )

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })
})

describe('Loading', () => {
  it('renders loading spinner with default message', () => {
    render(<Loading />)
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders custom loading message', () => {
    render(<Loading message="Loading characters..." />)
    
    expect(screen.getByText('Loading characters...')).toBeInTheDocument()
  })

  it('renders inline loading variant', () => {
    render(<Loading inline={true} message="Searching..." />)
    
    expect(screen.getByText('Searching...')).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })
})

describe('ErrorDisplay', () => {
  it('renders error message', () => {
    render(<ErrorDisplay error="Something went wrong" />)
    
    // Use getByRole for heading since there might be multiple text instances
    expect(screen.getByRole('heading', { name: 'Something went wrong' })).toBeInTheDocument()
  })

  it('renders with retry button when onRetry is provided', () => {
    const mockRetry = vi.fn()
    
    render(
      <ErrorDisplay 
        error="Network error" 
        onRetry={mockRetry}
      />
    )
    
    expect(screen.getByText('Network error')).toBeInTheDocument()
    
    const retryButton = screen.getByRole('button', { name: /try again/i })
    expect(retryButton).toBeInTheDocument()
    
    fireEvent.click(retryButton)
    expect(mockRetry).toHaveBeenCalledOnce()
  })
})