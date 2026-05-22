'use client'

import { z } from 'zod'
import Link from 'next/link'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewsletterFormSchema } from '@/lib/schemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { subscribe } from '@/lib/actions'
import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'

type Inputs = z.infer<typeof NewsletterFormSchema>

export default function NewsletterForm() {
  const form = useForm<Inputs>({
    resolver: zodResolver(NewsletterFormSchema),
    defaultValues: {
      email: ''
    }
  })

  const { isSubmitting } = form.formState

  async function onSubmit(data: Inputs) {
    const result = await subscribe(data)

    if (result?.error) {
      toast.error('An error occurred! Please try again.')
      return
    }

    toast.success('Subscribed successfully!')
    form.reset()
  }

  return (
    <section>
      <Card className='rounded-lg border-0 dark:border'>
        <CardContent className='flex flex-col gap-8 pt-6 md:flex-row md:justify-between md:pt-8'>
          <div>
            <h2 className='text-2xl font-bold'>Subscribe to my newsletter</h2>
            <p className='text-muted-foreground'>
              Get updates on my work and projects.
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col items-start gap-3'
            >
              <div className='w-full'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormControl>
                        <Input
                          type='email'
                          placeholder='Email'
                          autoComplete='email'
                          className='w-full'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='ml-1 text-xs' />
                    </FormItem>
                  )}
                />
              </div>

              <div className='w-full'>
                <Button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full disabled:opacity-50'
                >
                  {isSubmitting ? 'Submitting...' : 'Subscribe'}
                </Button>
              </div>

              <div>
                <p className='text-xs text-muted-foreground'>
                  We care about your data. Read our{' '}
                  <Link href='/privacy' className='font-bold'>
                    privacy&nbsp;policy.
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  )
}