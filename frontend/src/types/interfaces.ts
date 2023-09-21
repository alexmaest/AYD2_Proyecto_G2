export interface User {
  id: number
  username: string
  role: number
  email: string
  photo: string
  token: string
}

export interface UserProfile {
  email: string
  nombre: string
  dateBirth: string
  year: number
  month: number
  day: number
  gender: number
  photo: string
}

export interface Song {
  id: number
  name: string
  songUrl: string
  duration: string
  genre: string
  artist: string
}

export interface SongWithCover extends Song {
  cover: string
}

export interface Album {
  id: number
  name: string
  albumUrl: string
  releaseDate: string
  type: string
  songs: Song[]
}

export interface ForYouAlbum {
  id: number
  title: string
  artist: string
  cover: string
  type: string
}

export interface Artist {
  id: number
  nombre: string
  tipoUsuario: number
  email: string
  linkPhoto: string
  genero: string
  dateBirth: string
  estado: number
}

export interface MusicState {
  songs: SongWithCover[] | null
  album: Album | null
  artist: Artist | null
  currentSong: SongWithCover | null
  isPlaying: boolean
  canPlay: boolean
  setCanPlay: (canPlay: boolean) => void
  play: (song: SongWithCover) => void
  setSongs: (songs: SongWithCover[]) => void
  forward: () => void
  backward: () => void
}

export interface GenresRecommendation {
  'Dance-Pop': SongWithCover[]
  'Disco/Funk': SongWithCover[]
  'Electronica': SongWithCover[]
  'Hard Rock': SongWithCover[]
  'Hip-Hop': SongWithCover[]
  'Pop': SongWithCover[]
  'R&B': SongWithCover[]
  'Rock/Pop': SongWithCover[]
  'Soul': SongWithCover[]
  'Synth-Pop': SongWithCover[]
}

export interface CanPlaySong {
  result: boolean
}
