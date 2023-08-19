export const baseUrl = 'http://localhost:5000'

export const apiUrls = {
  auth: {
    login: '/login',
    register: '/artistRegister',
    recoverPassword: '/login/passwordChange',
    updatePassword: '/login/passwordChange/update'
  },
  artist: {
    uploadBanner: '/artist/banner',
    banner: '/artist/banner',
    uploadSong: '/artist//uploadSong',
    profileConfig: '/artist/ProfileConfig',
    profile: '/artist/Profile',
    getSongs: '/artist/songs',
    deleteSong: '/artist/deleteSong',
    createAlbum: '/artist/createAlbum',
    getAlbums: '/artist/albums',
    deleteAlbum: '/artist/deleteAlbum'
  },
  admin: {
    artists: '/admin/artists',
    artistsManagment: '/admin/artistsManagment'
  }
}
