Esta es toda la sintaxis del lenguaje **".njs"**
## ⚙API
---
Definiciones que el lenguaje posee para un uso y acceso mas avanzado a las herramientas de JavaScript:
- ### Comentarios
	- [ ] **`//`:** Comentario de linea.
	- [ ] **`/* ..... */`:** Comentario de bloque.
- ### Variables
	- [ ] **`const <nombre> = <valor>`:** Define variables globales estáticas.
	- [ ] **`let <nombre> = <valor>`:** Define variables globales mutables.
- ### Compatibilidad de JavaScript
	- [ ] **`if (<condition>) {...}`:** Define un bloque condicional.
	- [ ] **`function <nombre>() {...}`:** Define una función que se usa en el contexto global.
	- [ ] **`for (<condition>) {...}`:** Define un bucle condicional que se romperá al no cumplir la condición.
- ### Tipos
	- [ ] **`Audio <nombre> = <ubicacion>`:** Define una fuente de audio.
	- [ ] **`Image <nombre> = <ubicacion>`:** Define un fuente de imagen.
	- [ ] **`Video <nombre> = <ubicacion>`:** Define una fuente de video.
## 📒 Sintaxis
---
- ### Escenas
	- [ ] **`scene(<nombre>) {...}`:** Definir una escena/parte del juego.
	- [ ] **`background "<Image/Video Type>"`:** Define la imagen o video de fondo que se usara.
	- [ ] **`jump(<nombre de la escena>)`:** Define el salto a una escena especifica.
- ### Funciones
	- [ ] **`choice { "<opcion>" {...} }`:** Define un menu para la toma de decisiones.
- ### Medios
	- [ ] **`play(<canal>, <Audio Type>, <efecto>)`:** Reproduce un audio dependiendo el canal y ubicación del audio establecidos con los siguientes formatos establecidos:
		- [Web audio codec guide - Web media technologies | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs)
	- [ ] **`stop(<canal>, <Audio Type>, <efecto>)`:** Detiene el audio que se este reproduciendo actualmente en el canal especificado
		- [Web audio codec guide - Web media technologies | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs)
	- [ ] **`import <File>`:** Importa archivos **".njs"** permitiendo acceder a variables, funciones, etc.