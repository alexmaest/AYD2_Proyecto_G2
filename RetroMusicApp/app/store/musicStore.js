import { create } from 'zustand'

const useMusicStore = create((set) => ({
  song: null,
  setSong: (song) => set({ song })
}))

export default useMusicStore
