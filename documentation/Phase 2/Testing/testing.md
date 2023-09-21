![Net Image](banner.jpg "Banner | RetroMusic")

## Pruebas funcionales <img src="https://media.tenor.com/dHk-LfzHrtwAAAAi/linux-computer.gif" alt="drawing" width="30"/>


* ### Pruebas del registro de un cliente

![Net Image](P1.PNG "Prueba#1 | RetroMusic")
![Net Image](P2.PNG "Prueba#2 | RetroMusic")
![Net Image](P3.PNG "Prueba#3 | RetroMusic")

```
test( "Register success", async () => {
    const data = {
        "email": "correoTester@gmail.com",
        "password": "password",
        "username": "alexmaest2",
        "birthday": "2002-01-01",
        "gender": "Male"
    }
    const result = await api.post("/userRegister/free")
    .send( data )
    .expect(200)
    expect(result.body.auth).toEqual( true )
});
```


* ### Sección de Descubrir artistas

![Net Image](P4.PNG "Prueba#4 | RetroMusic")
![Net Image](P5.PNG "Prueba#5 | RetroMusic")
![Net Image](P6.PNG "Prueba#6 | RetroMusic")

```
test('Get recommended artists', async () => {
    const result = await api.get("/user/recomendations")
        .expect( 200 );

    expect(result.body.correct).toEqual( true )
})
```

* ### Visualización y deshabilitación de creadores de contenido

![Net Image](P7.PNG "Prueba#7 | RetroMusic")
![Net Image](P8.PNG "Prueba#8 | RetroMusic")
![Net Image](P9.PNG "Prueba#9 | RetroMusic")

```
test( "Disable artist", async () => {
    const data = {
        "userId": 38
    }
    const result = await api.post("/admin/artistManagment")
    .send( data )
    .expect(200)
    expect(result.body.auth).toEqual( true )
});
```

* ### Mostrar publicidad para un cliente gratuito

![Net Image](P10.PNG "Prueba#10 | RetroMusic")
![Net Image](P11.PNG "Prueba#11 | RetroMusic")
![Net Image](P12.PNG "Prueba#12 | RetroMusic")

Al tratarse de una función que se ejecuta por parte del cliente, no se le realizó una prueba unitaria con super test.

* ### Visualización de un álbum

![Net Image](P13.PNG "Prueba#13 | RetroMusic")
![Net Image](P14.PNG "Prueba#14 | RetroMusic")
![Net Image](P15.PNG "Prueba#15 | RetroMusic")

```
test('Get albums', async () => {
    const result = await api.get("/user/artist/songs/2")
        .expect( 200 );

    expect(result.body.correct).toEqual( true )
})
```

* ### Subir una canción como creador de contenido

![Net Image](P16.PNG "Prueba#16 | RetroMusic")
![Net Image](P17.PNG "Prueba#17 | RetroMusic")

```
test( "Upload a song", async () => {
    const data = {
        "userId": 12,
        "name": "TV on the Radio",
        "genre": "Rock"
    }
    const result = await api.post("artist/uploadSong")
    .send( data )
    .expect(200)
    expect(result.body.auth).toEqual( true )
});
```

* ### Reproducir canciones como cliente

![Net Image](P18.PNG "Prueba#18 | RetroMusic")
![Net Image](P19.PNG "Prueba#19 | RetroMusic")
![Net Image](P20.PNG "Prueba#20 | RetroMusic")

```
test( "Play a song", async () => {
    const result = await api.get("/artist/song/2")
    .expect(200)
    expect(result.body.auth).toEqual( true )
});
```

* ### Eliminación de canciones de un creador de contenido

![Net Image](P21.PNG "Prueba#21 | RetroMusic")
![Net Image](P22.PNG "Prueba#22 | RetroMusic")
![Net Image](P23.PNG "Prueba#23 | RetroMusic")

```
test( "Play a song", async () => {
    const result = await api.delete("/artist/deleteSong/2")
    .expect(200)
    expect(result.body.auth).toEqual( true )
});
```

* ### Eliminación de álbumes de un creador de contenido

![Net Image](P24.PNG "Prueba#24 | RetroMusic")
![Net Image](P25.PNG "Prueba#25 | RetroMusic")
![Net Image](P26.PNG "Prueba#26 | RetroMusic")

```
test( "Play a song", async () => {
    const result = await api.delete("/artist/deleteAlbum/2")
    .expect(200)
    expect(result.body.auth).toEqual( true )
});
```

* ### Recorrer álbum de canciones

![Net Image](P27.PNG "Prueba#27 | RetroMusic")
![Net Image](P28.PNG "Prueba#28 | RetroMusic")
![Net Image](P29.PNG "Prueba#29 | RetroMusic")

Esta funcionalidad se maneja en la parte del cliente, por lo que no se puede realizar pruebas con super test.

## Bitacora

|Número prueba |Nombre prueba | Quien realizó la prueba |Tiempo | Resultado  | 
| ----- | ----- | ----- | ----- | ----- |
| 1 | Registro de un usuario en plan gratuito | Fernando Gómez | 2 minutos | Satisfactorio | 
| 2 | Registro de un nuevo cliente ingresando sus datos desde el frontend | Fernando Gómez | No aplica | No aplica | 
| 3 | Registro de un nuevo cliente ingresando sus datos desde el frontend y conexión a la base de datos. | Fernando Gómez | 3 minutos | Satisfactorio | 
| 4 | Sección para descubrir artistas | Fernando Gómez | 2 minutos | Satisfactorio | 
| 5 | Cambios en la sección para descubrir artistas | Fernando Gómez | 2 minutos | Satisfactorio | 
| 6 | Sección para descubrir artistas obteniendo la información de la base de datos | Fernando Gómez | 4 minutos | Satisfactorio | 
| 7 | Visualización de usuarios de creadores de contenido y su deshabilitación | Fernando Gómez | 5 minutos | Satisfactorio | 
| 8 | Visualización de usuarios de creadores de contenido y su deshabilitación | Fernando Gómez | No aplica | No aplica | 
| 9 | Comprobación de los usuarios deshabilitado | Fernando Gómez | 4 minutos | Satisfactorio | 
| 10 | Mostrar publicidad para el cliente de plan gratuito | Fernando Gómez | 3 minutos | Satisfactorio | 
| 11 | Mostrar publicidad para el cliente de plan gratuito | Fernando Gómez | No aplica | No aplica | 
| 12 | Mostrar publicidad exclusivamente para el cliente de plan gratuito | Fernando Gómez | 4 minutos | Satisfactorio | 
| 13 | Ver un álbum de un artista | Fernando Gómez | 4 minutos | Satisfactorio | 
| 14 | Cambios en la visualización de álbumes de artistas | Fernando Gómez | No aplica | No aplica | 
| 15 | Ver albumes de artistas obteniendo la información de la base de datos | Fernando Gómez | 1 minutos | Satisfactorio | 
| 16 |  Subir canción como creador de contenido | Fernando Gómez | 3 minutos | Satisfactorio | 
| 17 |  Cambios en la subida de canciones por parte de un creador de contenido | Fernando Gómez | No aplica | No aplica | 
| 18 | Reproducir canciones como cliente | Fernando Gómez | 2 minutos | Satisfactorio | 
| 19 | Cambios en la reproducción de canciones como cliente | Fernando Gómez | No aplica | No aplica | 
| 20 | Reproducir canciones como cliente desde un álbum | Fernando Gómez | 2 minutos | Satisfactorio | 
| 21 | Como creador de contenido, eliminar una canción de autoría propia | Fernando Gómez | 3 minutos | Satisfactorio | 
| 22 | Cambios en la eliminación de una canción | Fernando Gómez | No aplica | No aplica | 
| 23 | Como creador de contenido, eliminar una canción de autoría propia desde el frontend y comprobación en la base de datos | Fernando Gómez | 4 minutos | Satisfactorio | 
| 24 | Como creador de contenido, eliminar un álbum de autoría propia | Fernando Gómez | 3 minutos | Satisfactorio | 
| 25 | Cambios en la eliminación de un álbum de un creador de contenido | Fernando Gómez | 3 minutos | Satisfactorio | 
| 26 | Eliminación de relaciones entre álbumes y canciones | Fernando Gómez | 3 minutos | Satisfactorio | 
| 27 | Recorrer la lista de canciones de un álbum | Fernando Gómez | 3 minutos | Satisfactorio | 
| 28 | Cambios en el recorrido de la lista de canciones de un álbum | Fernando Gómez | No aplica | No aplica | 
| 29 | Recorrer la lista de canciones de un álbum | Fernando Gómez | 4 minutos | Satisfactorio | 