import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  it('renders without crashing', () => {
    // Simple smoke test - just make sure App component doesn't throw
    render(<App />)
    
    // Should render the main content area
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})