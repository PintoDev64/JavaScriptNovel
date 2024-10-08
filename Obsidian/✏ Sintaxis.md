Esta es toda la sintaxis del lenguaje **".njs"**
## ⚙API
Definiciones que el lenguaje posee para un uso y acceso mas avanzado a las herramientas de JavaScript:
- ### Comentarios
	- [x] **`//`:** Comentario de Linea.
- ### Variables
	- [x] **`var <nombre> = <valor>`:** Define variables globales estáticas.
- ### Tipos
	- [x] **`Audio <nombre> = <ubicacion>`:** Define una fuente de audio.
	- [x] **`Image <nombre> = <ubicacion>`:** Define un fuente de imagen.
	- [x] **`Video <nombre> = <ubicacion>`:** Define una fuente de video.
	- [x] **`Character <nombre> = Character(<nombre>, <color>, <outline>)`:** Define una variable "Character" para identificar quien habla en la escena.
## 📒 Sintaxis
- ### Escenas
	- [x] **`scene(<nombre>) {...}`:** Definir una escena/parte del juego.
		- [ ] **`:fadeIn :fadeOut`:** efectos de transiciones
	- [ ] **`background "<Image/Video Type>"`:** Define la imagen o video de fondo que se usara.
	- [x] **`jump(<nombre de la escena>)`:** Define el salto a una escena especifica.
- ### Funciones
	- [x] **`choice() { "<opcion>" {...} }`:** Define un menu para la toma de decisiones.
	- [ ] **`call <nombre de funcion>()`:** Permite acceder/usar una función creada/provista por el usuario/biblioteca.
- ### Medios
	- [x] **`play(<canal>, <Audio Type>, <efecto>)`:** Reproduce un audio dependiendo el canal y ubicación del audio establecidos con los siguientes formatos establecidos:
		- [Web audio codec guide - Web media technologies | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs)
	- [x] **`stop(<canal>, <Audio Type>, <efecto>)`:** Detiene el audio que se este reproduciendo actualmente en el canal especificado
		- [Web audio codec guide - Web media technologies | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs)
- ### Textos
	- [x] **`Character(<nombre>) "<texto>"`:** Define que personaje y texto se mostrara en pantalla durante el gameplay. Acepta variables usando las llaves `{}`.