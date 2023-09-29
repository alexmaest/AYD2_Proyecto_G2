import { Slot } from 'expo-router'
import Header from '../src/components/Header'

export default function HomeLayout () {
  return (
    <>
      <Header />
      <Slot />
    </>
  )
}
