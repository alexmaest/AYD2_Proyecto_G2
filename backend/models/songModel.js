const songRepository = require('../repositories/songRepository');

class songModel {
  constructor() {
    this.repository = new songRepository();
  }

  async saveSong(song) {
    try {
      const id = await this.repository.save(song);
      return id;
    } catch (err) {
      console.error(err);
      throw new Error('Error while saving content song');
    }
  }

  async updateSongAlbumId(albumId, songId) {
    try {
      const updated = await this.repository.updateAlbumId(albumId, songId);
      return updated;
    } catch (err) {
      console.error(err);
      throw new Error('Error while updating song');
    }
  }

  async deleteSong(id) {
    try {
      const deleted = await this.repository.delete(id);
      return deleted;
    } catch (err) {
      console.error(err);
      throw new Error('Error while deleting content song');
    }
  }

  async deleteAlbum(id) {
    try{
      const deleted = await this.repository.deleteAlbum(id);
      return deleted;
    }catch (err) {
      console.error(err);
      throw new Error('Error while deleting id album from song');      
    }
  }

  async getSongById(id) {
    try {
      const song = await this.repository.findById(id);
      return song;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching content song by ID');
    }
  }

  async getAllArtistSongs(artistId) {
    try {
      const songs = await this.repository.findAllArtistSongs(artistId);
      return songs;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching all artist songs');
    }
  }

  async getAllRecomendations() {
    try {
      const songs = await this.repository.findAllRecomendations();
      return songs;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching all recomendations');
    }
  }

  async getAllArtistAvailableSongs(songId) {
    try {
      const songs = await this.repository.findAllArtistAvailableSongs(songId);
      return songs;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching all artist available songs');
    }
  }

  async getAllAlbumSongs(albumId) {
    try {
      //console.log("pppppppppppppppppppppppppppp")
      //console.log(albumId)
      const songs = await this.repository.findAllAlbumSongs(albumId);
      return songs;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching all album songs');
    }
  }


  //JA- fase2
  async getAllArtistSongs2() {
    try {
      //console.log("2")
      const songs = await this.repository.findAllArtistSongs2();
      return songs;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching all artist songs');
    }
  }


  //sprint 2 fase2
  async updateMusic(songId,userId) {//modulo admin, actualizacion del contador de la cancion escuchada
    try {
      const songCounter = await this.repository.updateSongCounter(songId,userId);
      return songCounter;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching songCounter update');
    }
  }


  async top5Songs() {//modulo admin, top 5 de la canciones escuchadas
    try {
      const songCounter = await this.repository.topSongs();
      return songCounter;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching songCounter update');
    }
  }


  async top5Albums() {//modulo admin, top 5 de la canciones escuchadas
    try {
      const songCounter = await this.repository.topAlbums();
      return songCounter;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching songCounter update');
    }
  }

  async top5Artists() {//modulo admin, top 5 de la canciones escuchadas
    try {
      const songCounter = await this.repository.topArtists();
      return songCounter;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching songCounter update');
    }
  }


  //fase3
  async getAllGenres() {
    try {
      const songs = await this.repository.getAllSongsGenres();
      return songs;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching all artist songs');
    }
  }


  async top5SongsFiltro(genero) {//modulo admin, top 5 de la canciones escuchadas
    try {
      const songCounter = await this.repository.topSongsFiltro(genero);
      return songCounter;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching songCounter update');
    }
  }


  async top5AlbumsFiltro(inf,sup) {//modulo admin, top 5 de la canciones escuchadas
    try {
      const songCounter = await this.repository.topAlbumsFiltro(inf,sup);
      return songCounter;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching songCounter update');
    }
  }

  async top5ArtistsFiltro(inf,sup) {//modulo admin, top 5 de la canciones escuchadas
    try {
      const songCounter = await this.repository.top5ArtistsFiltro(inf,sup);
      return songCounter;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching songCounter update');
    }
  }


  async top5SongsATFiltro(dateI,dateF) {//modulo admin, top global de la canciones escuchadas
    try {
      const songCounter = await this.repository.topSongsATFiltro(dateI,dateF);
      return songCounter;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching songCounter update');
    }
  }

  async getAllDates() {
    try {
      const songs = await this.repository.getAllSongsDates();
      return songs;
    } catch (err) {
      console.error(err);
      throw new Error('Error while fetching all artist songs');
    }
  }


}

module.exports = new songModel();
