export interface User {
  id: number
  username: string
  role: number
  email: string
  photo: string
  token: string
}

export interface Song {
  id: number
  name: string
  songUrl: string
  duration: string
  genre: string
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
