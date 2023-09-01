#DOCUMENTATION

El proyecto está desarrollado como las instrucciones, adentro de una carpeta llamada HectorMarianoCardenas Sierra ) mi nombre) y después adentro de otra carpeta llamada DesignAndImplementation.
Adentro de esas carpetas encontrarán el proyecto realizado con NodeJs (ExpressJs). En el correo encontrarán: 
1) La documentación de Postman con todas las rutas.
2) El archivo .Env

El proyecto se encuentra organizado en un total de 6 carpetas dentro de src:
controller, errors, middlewares, models, routes, service.

##CARPETA ERRORS
En la carpeta Erros se encuentra un manejo de Errores personalizados, que cree para este proyecto, solo para darle un plus y mejor organización al manejo de errores del proyecto.

##CARPETA MIDDLEWARES
En la Carpeta de middlewares se encuentran ciertos middlewares de las rutas, uno de ellos (validate-user) es el que se encarga de validar que las rutas vengan con el token de JWT, de no ser así la api devolvera un error.

###CARPETA SERVICE
En la carpeta Service se encuentra solo un archivo llamado password.ts, este se encarga de encriptar la contraseña del usuario y también tiene otro método para comparar la contraseña


####EJECUCION
Para ejecutar el proyecto lo que se tiene que hacer, es desde la terminal acceder a la carpeta /HectorMarianoCardenasSierra luego acceder a la carpeta /DesignAndImplementation , adentro de esta carpeta se debe de insertar el archivo .env y ejecutar un npm install, a continuación se deberá ejecutar un npm start, y el proyecto empezara a correr