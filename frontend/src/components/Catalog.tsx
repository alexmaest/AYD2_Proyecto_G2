'use server'

import Link from 'next/link'

const styles = {
  horizontal: 'w-full flex flex-row items-start gap-8 flex-wrap px-16 justify-center',
  vertical: 'w-full flex flex-col items-start gap-8 px-16 justify-center'
}

export default async function Catalog ({ children }: { children: React.ReactNode }) {
  return (
    <section className='w-full flex flex-col items-start gap-8'>
      {children}
    </section>
  )
}

function Header ({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className=' w-full flex justify-between items-center'>
      <h3 data-testid="cypress-header" className='font-bold text-3xl text-white'>{title}</h3>
      <div className='flex gap-4'>
        {children}
      </div>
    </div>
  )
}

function Content ({ layout, children }: { layout: 'vertical' | 'horizontal', children: React.ReactNode }) {
  return (
    <div className={`${styles[layout]}`}>
      {children}
    </div>
  )
}

function EmptyContent ({ text, to, linkText }: { text: string, to: string, linkText: string }) {
  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <h3 className='text-white text-2xl font-bold'>{text}</h3>
      <Link
        href={to}
        className='text-white text-xl font-bold hover:underline cursor-pointer'
      >
        {linkText}
      </Link>
    </div>
  )
}

Catalog.Header = Header
Catalog.Content = Content
Catalog.EmptyContent = EmptyContent
