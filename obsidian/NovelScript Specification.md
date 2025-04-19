# Variables
- #### **Audio:** Guarda una dirección de audio
- #### **Image:** Guarda una dirección de imagen
- #### **Char:** Guarda datos de un personaje como nombre, sprites y color de texto
- #### **Var:** Guarda una variable accesible desde el contexto global del juego (acepta cadenas de texto, números y colecciones)
- #### **context:** variable solo accesible para datos sobre el motor (no modificable)
# Pre-Directivas
- #### **await:** El juego esperara a que termine la ejecución de una instrucción (solo valido dentro de contextos de escenas)
- #### **show/hide:** Permite ocultar o mostrar algo en pantalla
- #### **function:** Definirá la escritura de una función JavaScript
# Pre-Directivas Dinámicas
- #### **personajes:** Usa una variable de tipo Personaje para que un personaje diga un texto asignado
# Directivas
- #### **"fade":** Crea un efecto de transición a la vista del juego hacia el fondo o escena especificada
- #### **"black":** Crea un efecto de fundido a un fondo negro a la vista del juego hacia el fondo o escena especificada
# Funciones
- #### **Scene:** Define un punto de entrada en la historia, acepta los siguientes parámetros: *(nombre: string)*
 ```js
  Scene("") {
	// History Instructions  
  }
  ```
- #### **Jump:** Define a que escena se quiere saltar (se debe especificar el nombre de la escena correspondiente)
```js
Scene("Example") {
	Jump("Example_2")
}
Scene("Exmaple_2") {
	// History Instructions
}
```
- #### **Interface:** Ejecuta una interfaz y la muestra en pantalla a partir de su nombre asignado (la lógica de la misma es diferente a la lógica de la historia) y para removerla debe tener como parámetro el boleano True (en caso de enviar False la ventana no se removerá a menos que el usuario lo haga con el botón "X" que siempre se asignara a las interfaces que se abren de esta forma) siempre es asíncrona
 ```js
Scene("Example") {
	await Interface("Inventory")
}
```
- #### **Background:** Permite cambiar el fondo de la escena asignando la variable que contenga el tipo Image (acepta directivas de transición)
 ```js
 Image Park = "Park.png"
 Image Lake = "Lake.png"
 
 Scene ("Exmaple") {
	 Background(Park):fade
	 Background(Lake)
 }
```
- #### **Translate:** Permite usar la tabla de idiomas asignada en la configuración (se puede usar en las pre-directivas de personaje) por idioma e identificación del texto (si no hay una tabla de traducción/idiomas o los parámetros no se encuentran esto terminara en un error y detendrá el juego)
 ```js
 Char Pedro = Character("Pedro", ["pedro.png"], "#fff000")
 
 Scene("Hola") {
	 Pedro Translate("Spanish", "present001")
 }
```
- #### **Character:** Define los datos de un personaje, como nombre, sprites y color de texto (también funciona el uso directo dentro de escenas)
 ```js
 Char Pedro = Character("Pedro", ["pedro.png"], "#fff000")
 
 Scene("Hola") {
	 Pedro "Hola Julia"
	 Character("Julia", ["julia.png"], "#000fff") "Hola Pedro, nos vemos!"
 }
```
- #### **MediaAudio:** Define los datos de un archivo de audio para reproducirlo (requiere ubicación y canal de reproducción)
 ```js
 Audio BgMusic = MediaAudio("./BgMusic.mp3", "bg")
```
- #### **Play:** Reproduce el valor del audio que se le pase (acepta de parámetro la variable  de audio asignada)
 ```js
 Scene("Final") {
	 Play(BgMusic)
 }
```
- #### **Stop:** Pausa el audio que actualmeten se eeste reproducionedo (requiere el nombre del canal de audio que desea pausar)
 ```js
 Scene("Final") {
	 Stop("bg")
 }
```