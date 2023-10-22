export const baseUrl = 'http://18.222.142.200:5000'

export const apiUrls = {
  auth: {
    login: '/login',
    register: '/artistRegister',
    recoverPassword: '/login/passwordChange',
    updatePassword: '/login/passwordChange/update',
    userRegister: '/userRegister/free'
  },
  artist: {
    uploadBanner: '/artist/banner',
    banner: '/artist/banner',
    uploadSong: '/artist/uploadSong',
    profileConfig: '/artist/ProfileConfig',
    profile: '/artist/Profile',
    getSongs: '/artist/songs',
    deleteSong: '/artist/deleteSong',
    createAlbum: '/artist/createAlbum',
    getAlbums: '/artist/albums',
    deleteAlbum: '/artist/deleteAlbum',
    getAvailableSongs: '/artist/availableSongs'
  },
  admin: {
    artists: '/admin/artists',
    artistsManagment: '/admin/artistsManagment',
    topSongs: '/admin/TopSongs',
    topAlbums: '/admin/TopAlbums',
    topArtists: '/admin/TopArtists',
    topAlbumsFiltro: '/admin/TopAlbumsFiltro',
    topArtistsFiltro: '/admin/TopArtistsFiltro',
    topSongsFiltro: '/admin/TopSongsFiltro',
    topGlobalSongs: '/admin/TopSongsAlltime',
    allSongsGenres: '/admin/allSongsGenres',
    allSongsDates: '/admin/allSongsDates'
  },
  user: {
    songs: '/user/songs',
    albums: '/user/albums',
    songsForAlbumId: '/user/albums/songs',
    artists: '/user/artists',
    artistSongs: '/user/artists/songs',
    artistAlbums: '/user/artists/albums',
    profile: '/user/Profile',
    profileConfig: '/user/ProfileConfig',
    recomendations: '/user/recomendations',
    musicCounter: '/user/MusicCounter',
    userLimit: '/user/userLimit',
    historial: '/user/historial',
    listenedTime: '/user/listenedTime',
    listenedSongs: '/user/listenedSongs'
  }
}
