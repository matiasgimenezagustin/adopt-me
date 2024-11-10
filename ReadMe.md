# Proyecto Adopt Me

Este es el proyecto *Adopt Me*, una aplicación para gestionar las adopciones de mascotas.

## Endpoints


## Adopciones
### Obtener todas las adopciones

```http
GET /adoptions
```

### Obtener una adopcion

```http
GET /adoptions/:aid
```

### Crear una adopcion

```http
POST /adoptions/:uid/:pid
```

## Usuarios
### Obtener todos los usuarios

```http
GET /users
```

### Obtener un usuario

```http
GET /users/:uid
```

### Actualizar un usuario

```http
PUT /users/:uid
```

### Eliminar un usuario

```http
DELETE /users/:uid
```

## Mascotas
### Obtener todas las mascotas

```http
GET /pets
```

### Obtener una mascota

```http
GET /pets/:pid
```

### Actualizar una mascota

```http
PUT /pets/:pid
```

### Eliminar una mascota

```http
DELETE /pets/:pid
```

## Imagen de Docker

https://hub.docker.com/layers/testdev34/adopt-me/v1/images/sha256-7b5d02b864e169b43344c3daaee4b4e98f29b50cbd64471d1439d082cbbcd83b?context=repo


## Docker

Puedes ejecutar este proyecto usando Docker.

### Construir la imagen de Docker

1. Asegúrate de tener Docker instalado en tu máquina.
2. Clona este repositorio y navega a la carpeta del proyecto.
3. Construye la imagen con el siguiente comando:

```bash
docker build -t testdev30/adopt-me:v1 .

```



