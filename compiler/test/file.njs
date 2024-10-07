// Otro comentario

var hola = "sd12345";
Audio BGM = "./src/example.mp3"
Image Background = "./xddd.jpg"
Character Ookami = character("Ookami", red, black)

hola("parametro","example","parametro","example")

scene("primera escena") {
    play(BGM)
    Ookami "Hola"
    choice() {
        "Ir a la escuela": {
            jump("Escena Escuela")
        }
        "No ir a la escuela": {
            jump("Escena Casa")
        }
    }
}

funcionamiento