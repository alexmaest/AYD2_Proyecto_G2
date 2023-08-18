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
  songUtk: string
  duration: number
  genre: string
}
