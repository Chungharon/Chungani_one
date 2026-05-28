import { Separator } from '@/components/ui/separator'

export default function Footer() {
  return (
    <footer className='py-12'>
      <div className='container max-w-4xl mx-auto'>
        <Separator className='mb-12' />
        <div className='flex items-center justify-center'>
          <p className='text-center text-xs leading-5 text-muted-foreground'>
            &copy; {new Date().getFullYear()} Haron Ngaira. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}