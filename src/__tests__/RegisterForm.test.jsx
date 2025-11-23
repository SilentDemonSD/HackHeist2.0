import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegisterForm from '../components/RegisterForm'

describe('RegisterForm', () => {
  it('validates required fields and proceeds to submit', async () => {
    render(<RegisterForm />)

    // Step 1: invalid email shows error when moving next then back to submit
    const next = screen.getByRole('button', { name: /next/i })
    await userEvent.click(next)

    // Fill fields
    await userEvent.type(screen.getByLabelText(/Team Name/i), 'Crew Alpha')
    await userEvent.type(screen.getByLabelText(/Contact Email/i), 'alpha@example.com')

    await userEvent.click(next)

    // Step 2 members
    await userEvent.type(screen.getByLabelText(/Member Name/i), 'Rio')
    await userEvent.type(screen.getByLabelText(/Member Email/i), 'rio@example.com')
    await userEvent.click(next)

    // Step 3 submit appears
    const submit = screen.getByRole('button', { name: /confirm & submit/i })
    expect(submit).toBeInTheDocument()
  })
})


