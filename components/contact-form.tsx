'use client'

import { z } from 'zod'
import Link from 'next/link'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ContactFormSchema } from '@/lib/schemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { sendEmail } from '@/lib/actions'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'

type Inputs = z.infer<typeof ContactFormSchema>

export default function ContactForm() {
  const form = useForm<Inputs>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  })

  const { isSubmitting } = form.formState

  async function onSubmit(data: Inputs) {
    const result = await sendEmail(data)

    if (result?.error) {
      toast.error('An error occurred! Please try again.')
      return
    }

    toast.success('Message sent successfully!')
    form.reset()
  }

  return (
    <section className='relative isolate'>
      {/* Background pattern */}
      <svg
        className='absolute inset-0 -z-10 h-full w-full stroke-zinc-200 opacity-75 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] dark:stroke-zinc-700'
        aria-hidden='true'
      >
        <defs>
          <pattern
            id='83fd4e5a-9d52-42fc-97b6-718e5d7ee527'
            width={200}
            height={200}
            x='50%'
            y={-64}
            patternUnits='userSpaceOnUse'
          >
            <path d='M100 200V.5M.5 .5H200' fill='none' />
          </pattern>
        </defs>
        <svg
          x='50%'
          y={-64}
          className='overflow-visible fill-zinc-50 dark:fill-zinc-900/75'
        >
          <path
            d='M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z'
            strokeWidth={0}
          />
        </svg>
        <rect
          width='100%'
          height='100%'
          strokeWidth={0}
          fill='url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)'
        />
      </svg>

      {/* Form */}
      <div className='relative'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='mt-16 lg:flex-auto'
            noValidate
          >
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
              {/* Name */}
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='Name'
                        autoComplete='given-name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='ml-1 text-xs' />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='Email'
                        autoComplete='email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='ml-1 text-xs' />
                  </FormItem>
                )}
              />

              {/* Message */}
              <FormField
                control={form.control}
                name='message'
                render={({ field }) => (
                  <FormItem className='sm:col-span-2'>
                    <FormControl>
                      <Textarea rows={4} placeholder='Message' {...field} />
                    </FormControl>
                    <FormMessage className='ml-1 text-xs' />
                  </FormItem>
                )}
              />
            </div>
            <div className='mt-6'>
              <Button
                type='submit'
                disabled={isSubmitting}
                className='w-full disabled:opacity-50'
              >
                {isSubmitting ? 'Submitting...' : 'Contact Me'}
              </Button>
            </div>
            <p className='mt-4 text-xs text-muted-foreground'>
              By submitting this form, I agree to the{' '}
              <Link href='/privacy' className='font-bold'>
                privacy&nbsp;policy.
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </section>
  )
}