# Objetivos
Entregar una primera versión funcional que permita cargar un archivo `.njs` y ejecutar una narrativa básica con imágenes, audio y eventos.
- **Propósito**: Crear un motor para desarrollar novelas visuales utilizando un lenguaje de scripting propio (.njs) con soporte para escenas, audio, eventos y traducción.
- **Características iniciales mínimas** (versión 1.0):
    - Parser para interpretar archivos `.njs` (lenguaje básico).
    - Soporte para cargar imágenes, audio y texto.
    - Sistema de eventos básicos (reacciones a acciones del usuario o cambios de estado).
    - API mínima para interacciones personalizables desde JavaScript.
# Modules
- **Parser**: Analiza los scripts `.njs` y los convierte en estructuras de datos manipulables por el motor.
- **Gestión de recursos**: Carga y gestiona imágenes, audio, y otros elementos multimedia.
- **Ejecución de escenas**: Controla cómo se presentan las escenas (texto, imágenes, audio, transiciones).
- **Sistema de eventos**: Permite reaccionar a cambios en el estado o a las acciones del usuario.
- **Estado del juego**: Almacena variables y decisiones del jugador (para cosas como rollback).
# Fases
- **Primera iteración (MVP)**:
    - Implementa el parser básico para leer scripts `.njs`.
    - Añade la funcionalidad mínima para mostrar texto y cargar imágenes.
    - Prueba con un script simple (una línea de texto, un cambio de fondo).
- **Segunda iteración**:
    - Introduce el sistema de eventos (por ejemplo, al pulsar una tecla, cambia la escena).
    - Añade soporte para audio y variables simples.
- **Tercera iteración**:
    - Introduce rollback (rebobinar) y manejo de estados.
    - Optimiza el manejo de recursos multimedia.
# Pruebas
- **Escribir pruebas unitarias** para cada módulo (por ejemplo, probar que el parser reconoce comandos válidos).
- **Pruebas manuales**: Crear pequeños scripts `.njs` y verificar que el motor los ejecuta correctamente.
# Documentación
- **Guía básica de uso**: Explica cómo escribir scripts `.njs` y ejecutarlos en NovelJs.
- **Ejemplos**: Incluye un proyecto de muestra para que otros lo prueben fácilmente.
- **Explicación técnica**: Describe cómo funciona internamente el motor (opcional, pero muy útil para mostrar tus habilidades).