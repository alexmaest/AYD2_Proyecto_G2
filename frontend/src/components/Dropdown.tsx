'use client'

import { useToggle } from '@/hooks/useToggle'
import { createContext, useContext, useEffect, useRef } from 'react'
import { TbChevronDown } from 'react-icons/tb'

const DropdownContext = createContext({ expand: false, toggleExpand: () => {} })
const { Provider } = DropdownContext

export default function Dropdown ({ children }: { children: React.ReactNode }) {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { status: expand, toggleStatus: toggleExpand, setFalse: closeDropdown } = useToggle()

  const value = { expand, toggleExpand }

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
  const { expand, toggleExpand } = useContext(DropdownContext)
  return (
    <button
      type='button'
      className={`${expand ? 'bg-retro-black' : 'bg-[#1D1D1D] '} text-retro-white flex items-center justify-center hover:brightness-110 gap-4 rounded w-24 py-1 transition-all duration-300 ease-in-out font-bold text-[16px] focus:ring-2 focus:ring-retro-white-200`}
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
  const { expand } = useContext(DropdownContext)
  return (
    expand &&
      <ul
        className='dropdown__list absolute -translate-x-1/2 mt-2 list-none overflow-hidden rounded w-48'
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
