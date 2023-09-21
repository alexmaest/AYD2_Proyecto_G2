'use client'

import { useToggle } from '@/hooks/useToggle'
import { createContext, useContext, useEffect, useRef } from 'react'
import { TbChevronDown } from 'react-icons/tb'

const DropdownContext = createContext({ expand: false, toggleExpand: () => {}, size: 'sm' })
const { Provider } = DropdownContext

export default function Dropdown ({ size, children }: { size: string, children: React.ReactNode }) {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { status: expand, toggleStatus: toggleExpand, setFalse: closeDropdown } = useToggle()

  const value = { expand, size, toggleExpand }

  useEffect(() => {
    if (!expand) return
    const handleOutsideClick = (event: MouseEvent) => {
      if ((dropdownRef.current != null) && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown()
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [closeDropdown, expand])

  return (
    <Provider value={value}>
      <div ref={dropdownRef} className='relative'>
        {children}
      </div>
    </Provider>
  )
}

function Trigger ({ children }: { children: React.ReactNode }) {
  const { expand, size, toggleExpand } = useContext(DropdownContext)
  const width = size === 'sm' ? 'w-24' : 'w-48'
  return (
    <button
      type='button'
      className={`${expand ? 'bg-retro-black' : 'bg-[#1D1D1D] '} ${width} text-retro-white flex items-center justify-center hover:brightness-110 gap-2 py-1 rounded-full transition-all duration-300 ease-in-out font-bold text-[16px] focus:ring-2 focus:ring-retro-white-200`}
      onClick={toggleExpand}
    >
      {children}
      {expand
        ? (
          <TbChevronDown className='w-6 h-6 rotate-180 transform' />
          )
        : <TbChevronDown className='w-6 h-6' />}
    </button>
  )
}

function Menu ({ children }: { children: React.ReactNode }) {
  const { expand, size } = useContext(DropdownContext)
  const transform = size === 'sm' ? '-translate-x-1/2' : ''
  return (
    expand &&
      <ul
        className={`dropdown__list absolute ${transform} mt-2 list-none overflow-hidden rounded w-48`}
      >
        {children}
      </ul>
  )
}

function Item ({ children }: { children: React.ReactNode }) {
  return (
    <li
      className='text-sm font-bold bg-retro-white text-retro-black hover:bg-retro-white-200'
    >
      {children}
    </li>
  )
}

Dropdown.Trigger = Trigger
Dropdown.Menu = Menu
Dropdown.Item = Item
