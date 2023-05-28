# Cake Time.

Pagina web sobre una pastelería, una estructura bastante basica, funcional y responsive.
para el backend he usado NodeJs y express, BBDD con MongoDB y para el frontend React.

La estructura del backend la forman basicamente Users y Productos.

## Apartado de Users.

La aplicación solo tiene 2 roles: administracion y usuarios. Cuando se crea otro nuevo usuario, se agrega con el role user.
El role de usuario solo puede modificar su perfil y ver productos, pero el administrador
tiene permisos de: Crear producto, modificar producto, Eliminar producto y ver productos.

- Ejemplo de usuario "admin", con sus debidos permisos.
{
  "_id": {
    "$oid": "6467a5f081562b16aa03f2fb"
  },
  "nombre": "admin",
  "apellidos": "admin admin",
  "username": "administrador",
  "email": "admin@admin.com",
  "password": "$2b$10$zZVXdNAAVNYfhHB99lhaWeK/qtISPIDW6UbJJDZ/lelkngCqUVkAK",
  "role": "admin",
  "__v": 0,
  "file": "tkj8fucon9m.png"
}

-Ejemplo de usuario "user", sin permisos ningunos.

{
  "_id": {
    "$oid": "64728f1158400b7f8d0f65d4"
  },
  "nombre": "Usuario",
  "apellidos": "Prueba 1",
  "username": "UsuarioPrueba",
  "email": "UsuarioPrueba@prueba.com",
  "password": "$2b$10$oUg105sxD/3IzCATfZlwk.4ecJbMyfQ2Tp9zbDDoaA93ZDZdxwwgO",
  "role": "user",
  "file": "default.png",
  "__v": 0
}

## Apartado de Productos.

-Ejemplo de un producto.

{
  "_id": {
    "$oid": "6471441bbbe761a6aa556bef"
  },
  "nombrePastel": "Bandeja mini palmeras ( 12 uds )",
  "precio": "11",
  "file": "qslf3a4om9.jpg",
  "active": true,
  "__v": 0
}

## Endpoints.
Para este proyecto hemos usado diferentes endpoints los cuales son:

Para USUARIOS:
http://localhost:9000/auth/login          Metodo: POST     admin/user  ( Iniciar sesion ).
http://localhost:9000/auth/user/:id       Metodo: GET      admin/user ( Mostrar usuario seleccionado ).
http://localhost:9000/auth/user/:id       Metodo: PATCH    admin/user ( Modificar usuarios ).
http://localhost:9000/auth/logout         Metodo: POST     admin/user ( Cerrar sesion ).

Para PRODUCTOS:
http://localhost:9000/productos           Metodo GET       admin/user ( Mostrar todos los productos )
http://localhost:9000/productos/:id       Metodo GET       admin/user ( Mostrar producto seleccionado )
http://localhost:9000/auth/productos      Metodo POST      admin ( Añadir productos )
http://localhost:9000/auth/productos/:id  Metodo PATCH     admin ( Modificar producto seleccionado )
http://localhost:9000/auth/productos/:id  Metodo DELETE    admin ( Eliminar producto seleccionado )

## Instalacion.
 - Para utilizar la base de datos primero hay que abrir el terminal y acceder a la carpeta la cual estan los archivos de BBDD de mongo ( En nuestro caso seria "/Proyecto/BBDD/dump).
Una vez dentro ejecutamos el siguiente comando para copiar la base de datos. " mongorestore --db pasteleria dump/pasteleria ".

 - Para usar este Backend, debemos de en la terminal acceder a la carpeta Backend( En este caso seria Proyecto/Backend/ ), y ejecutar el comando " npm install " para instalar las dependencias que hay en el proyecto. Una vez que termine de instalar, procedemos a ejecutarlo con el comando " npm start " y tendremos nuestro backend operativo.

 - Para el Frontent, abrimos una nueva terminal , accedemos a la carpeta Frontend ( Proyecto/Frontend/ ), ejecutamos el comando " npm install " y cuando termine como en el ejemplo anterior utilizamos el " npm start ".

 * es importante de que se realicen estos pasos en 2 terminales distintas para que puedan ejecutarse las dos partes a la vez.

## testeo.

Para el testeo de las funciones de administrador y user, he dejado creadas 2 cuentas.

"email": "admin@admin.com"
"password": "admin"

"email": "UsuarioPrueba@prueba.com",
"password": "prueba"



## Autor.

Pablo Salazar Bosque 

## Copyright y licencia.

- Código y documentación copyright 2023. Código publicado bajo la licencia MIT.

## Agradecimientos.

- Dar las gracias especialmente a Francisco Marquez por mentorizarme y a todo el contenido que hay en internet.