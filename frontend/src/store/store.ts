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
  },
  forward: () => {
    set((state) => {
      const currentSong = state.currentSong
      const currentSongPosition = state.songs?.findIndex((song) => song.id === currentSong?.id)
      const nextSong = state.songs?.[currentSongPosition === state.songs?.length - 1 ? 0 : (currentSongPosition ?? 0) + 1]
      return {
        ...state,
        currentSong: nextSong,
        isPlaying: true
      }
    })
  },
  backward: () => {
    set((state) => {
      const currentSong = state.currentSong
      const currentSongPosition = state.songs?.findIndex((song) => song.id === currentSong?.id)
      const previousSong = state.songs?.[currentSongPosition === 0 ? state.songs?.length - 1 : (currentSongPosition ?? 0) - 1]
      return {
        ...state,
        currentSong: previousSong,
        isPlaying: true
      }
    })
  }
}))

export default useMusicStore
