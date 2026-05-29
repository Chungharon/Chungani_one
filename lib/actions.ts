'use server'

import 'server-only'
import { z } from 'zod'
import { Resend } from 'resend'
import { ContactFormSchema, NewsletterFormSchema } from '@/lib/schemas'
import ContactFormEmail from '@/emails/contact-form-email'

type ContactFormInputs = z.infer<typeof ContactFormSchema>
type NewsletterFormInputs = z.infer<typeof NewsletterFormSchema>

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('Email service is not configured.')
  return new Resend(apiKey)
}

const OWNER_EMAIL = 'ngairaharon@gmail.com'
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'

export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data)

  if (!result.success) {
    return { error: 'Invalid form data.' }
  }

  try {
    const { name, email, message } = result.data
    const resend = getResendClient()

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [OWNER_EMAIL],
      replyTo: email,
      subject: `New message from ${name}`,
      react: await ContactFormEmail({ name, email, message })
    })

    if (error) throw new Error('Failed to send email.')

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
    const { email } = result.data
    const resend = getResendClient()

    const audienceId = process.env.RESEND_AUDIENCE_ID
    if (!audienceId) throw new Error('Newsletter service is not configured.')

    const { error } = await resend.contacts.create({
      email,
      audienceId
    })

    if (error) throw new Error('Failed to subscribe.')

    return { success: true }
  } catch {
    return { error: 'Something went wrong. Please try again later.' }
  }
}