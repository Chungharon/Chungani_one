'use server'

import 'server-only'
import { z } from 'zod'
import { ContactFormSchema, NewsletterFormSchema } from '@/lib/schemas'

type ContactFormInputs = z.infer<typeof ContactFormSchema>
type NewsletterFormInputs = z.infer<typeof NewsletterFormSchema>

const API_URL = process.env.BACKEND_API_URL ?? 'http://localhost:8000'

async function postJson(path: string, body: unknown) {
  return fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store'
  })
}

export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data)

  if (!result.success) {
    return { error: 'Invalid form data.' }
  }

  try {
    const res = await postJson('/api/contact', result.data)
    if (!res.ok) throw new Error('Request failed.')

    return { success: true }
  } catch {
    return { error: 'Something went wrong. Please try again later.' }
  }
}

export async function subscribe(data: NewsletterFormInputs) {
  const result = NewsletterFormSchema.safeParse(data)

  if (!result.success) {
    return { error: 'Invalid email address.' }
  }

  try {
    const res = await postJson('/api/newsletter', result.data)
    if (!res.ok) throw new Error('Request failed.')

    return { success: true }
  } catch {
    return { error: 'Something went wrong. Please try again later.' }
  }
}
