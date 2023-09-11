import { create } from 'zustand'
import { MusicState, SongWithCover } from '@/types/interfaces'

const useMusicStore = create<MusicState>()((set) => ({
  songs: [],
  album: null,
  artist: null,
  currentSong: null,
  isPlaying: false,
  play: (song: SongWithCover) => {
    set((state) => ({
      ...state,
      currentSong: song,
      isPlaying: true
    }))
  },
  setSongs: (songs: SongWithCover[]) => {
    set((state) => ({
      ...state,
      songs
    }))
  }
}))

export default useMusicStore
