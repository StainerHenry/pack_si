#SIPacker
![Estado de Netlify](https://api.netlify.com/api/v1/badges/fb6c0bf2-2808-4dfe-a4c8-0b8efce9e769/deploy-status)
![Tamaño del código de GitHub en bytes](https://img.shields.io/github/languages/code-size/VityaSchel/SIPacker)
![Estrellas de GitHub Repo](https://img.shields.io/github/stars/VityaSchel/SIPacker)
![Localización](https://img.shields.io/badge/English%20(US)-0%25-red)

Editor de paquetes en línea para Your Game (SiGame de Vladimir Khil)

<p align="centro">
 <img src="https://user-images.githubusercontent.com/59040542/137257961-73f0aceb-19c9-4e1f-a3fe-80204f145f2d.png" />
</p>

Un pequeño recordatorio amistoso:

<img width="582" alt="image" src="https://github.com/VityaSchel/SIPacker/assets/59040542/ad92dc58-ff28-41f7-88cd-e51e1281916d">

No tengo ni una pizca de más información sobre el código escrito que usted, porque fue escrito en 2021 como un proyecto para una conferencia escolar. Lamentablemente, no podré ayudarte con tu problema relacionado con este proyecto, incluso si me escribes personalmente por Telegram o VKontakte. Hace tiempo que cambié la metodología para desarrollar proyectos usando React, el marco básico y muchas otras tecnologías, no sé qué hacer. No espere que yo o cualquier otro colaborador incluido en el repositorio solucionemos el problema, este proyecto no tiene mantenedores y es poco probable que tenga alguno. ¡Siéntete libre de bifurcar este repositorio y mejorar el código tú mismo!

## Versión ampliada

[https://sipacker.ru/](https://sipacker.ru/)

Todas las actualizaciones de la rama maestra se descargan automáticamente a la versión implementada en 5 minutos.

*(Movido de Github Pages debido a la falta de capacidad para redirigir todo el tráfico a la raíz del sitio)*

## Comparación de SIPacker con otros editores

<!-- ✅ ❌ ⏳ -->

[SIQuester](https://vladimirkhil.com/si/siquester) - editor oficial de paquetes para Your Game

&nbsp;|SIPacker|SIQuester
---|---|---
Lanzar en macOS, Linux, Android<sup>1</sup>|✅|❌
Importar packs por URL|✅|❌
Compresión instantánea de imágenes|✅|❌
Integración con sigame.ru|⏳|❌
Funciona sin conexión | ✅| ✅
Importación y exportación de paquetes de archivos siq| ✅| ✅
Soporte para todo tipo de dudas| ✅| ✅
Admite archivos de texto, audio y video|✅|✅
Soporte a recursos externos| ✅| ✅
Exportar a HTML, xml, docx, rtf, xps, texto|❌|✅
Exportar un archivo para enviarlo a la versión de TV del juego, SNS|❌|✅
Combinando packs|❌|✅
Límite por archivo multimedia|de 500 MB a 2 GB<sup>2</sup>|Foto: 25 kb, música: 500 kb
Límite de medios en toda la aplicación|250 MB (o hasta 1 GB<sup>3</sup>|Ilimitado


<sup>1</sup> - El .NET necesario para compilar el código fuente de SIQuester se puede descargar en Mac y Linux, compilar el código usted mismo y ejecutarlo en estos sistemas, pero no se incluyen instrucciones sobre cómo compilar correctamente el proyecto, y Es posible que la interfaz de usuario no funcione debido a diferentes sistemas operativos.

<sup>2</sup> - Firefox: 800 MB, Google Chrome: 2 GB, Google Chrome (Android): RAM/5, Opera: 500 MB. Se recomienda no cargar archivos de más de 1 MB y el tamaño del paquete no debe exceder los 100 MB.

<sup>3</sup> - El usuario puede configurar el límite de tamaño de IndexedDB por dominio en la configuración del navegador

## Ejecutar localmente

Si por alguna razón la versión implementada no le conviene, puede implementar la aplicación usted mismo:

1. Seleccione una rama: master (estable) o dev (desarrollo). Las ramas restantes son temporales y están destinadas a cambios grandes, que luego pueden revertirse o agregarse a la rama de desarrollo. Vaya a la página de GitHub de la sucursal seleccionada

2. Descargue el repositorio como zip o clónelo

3. Ingrese un comando que enviará el resultado a la carpeta de compilación.
```
$ npm ejecutar compilación
```
\
Si necesita crear una compilación con un prefijo en la URL, configúrelo en la variable PUBLIC_URL con una barra al principio, pero sin ella al final.
```
$ PUBLIC_URL=/SIPacker npm ejecutar compilación
```

## Lanzar con un dominio falso

Si está interesado en cómo ejecutar SIPacker con un dominio falso y un certificado autofirmado (por ejemplo https://sipacker.test sin cargarlo en la web), lea las instrucciones [/keys/Instructions.txt](/keys /Instrucciones.txt)

## Soporte del navegador

![Soporte del navegador](./.github/README/compatibility-table.svg)

Si todavía estás usando Safari, deja de hacerlo. Aquí hay una lista parcial de lo que no funcionará en SIPacker abierto en Safari:

- El tamaño de todos los archivos multimedia y del paquete en sí está limitado a sólo 30 MB (esto también se aplica a recursos externos y paquetes importados)
- Caché de recursos externos para que puedas trabajar con él sin conexión
- Probablemente reproducción correcta de archivos de audio y video.
- Fuentes y muchos aspectos de diseño, maquetación.
- Posibles errores con la compresión de archivos.

## Contribuyendo

No hay necesidad

## Patrocinio

Por favor, haga una donación por favor [https://donate.qiwi.com/payin/vityaschel](https://donate.qiwi.com/payin/vityaschel) por favor.
