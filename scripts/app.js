inicializar(); // Llama a la función inicializar al cargar el script para configurar el estado inicial de la página.
var selectorColor = 0; // Variable global para rastrear el estado actual de los colores.

function inicializar() {
    // Inicializa los elementos de la interfaz de usuario al estado predeterminado.
    document.getElementById("div-salida-textarea").style.display = "none"; // Oculta el área de texto de salida.
    document.getElementById("div-alerta").hidden = true; // Oculta el div de mensajes de alerta
    document.getElementById("textarea-salida").setAttribute("readonly", "true"); // Establece el área de texto de salida como solo lectura.
    document.getElementById("textarea-salida").value = ""; // Limpia el contenido del área de texto de salida.
    document.getElementById("textarea-entrada").setAttribute("placeholder", "Ingrese el texto aquí..."); // Establece el marcador de posición para el área de texto de entrada.
    document.getElementById("div-salida-mensaje").style.display = "flex"; // Muestra el mensaje de salida predeterminado.
}

function cambiarColores() {
    // Cambia los colores primario y secundario del tema en base al valor de selectorColor.
    let audio = document.getElementById("audio-colores"); // Establece el audio que sonara al dar clic al boton
    audio.play(); // Reproduce el audio
    switch (selectorColor) {
        case 0:
            document.documentElement.style.setProperty('--color-primario', '#AC0000');
            document.documentElement.style.setProperty('--color-secundario', '#FFD3D3');
            selectorColor++; // Incrementa el selectorColor para cambiar al siguiente conjunto de colores.
            break;
        case 1:
            document.documentElement.style.setProperty('--color-primario', '#337600');
            document.documentElement.style.setProperty('--color-secundario', '#E6FFD3');
            selectorColor++; // Incrementa el selectorColor para cambiar al siguiente conjunto de colores.
            break;
        case 2:
            document.documentElement.style.setProperty('--color-primario', '#0A3871');
            document.documentElement.style.setProperty('--color-secundario', '#D8DFE8');
            selectorColor = 0; // Reinicia el selectorColor para volver al primer conjunto de colores.
            break;
    }
}

function borrar() {
    // Borra el contenido del área de texto de entrada y reinicia el estado inicial de la interfaz.
    let audio = document.getElementById("audio-borrar"); // Establece el audio que sonara al dar clic al boton
    audio.play(); // Reproduce el audio
    document.getElementById("textarea-entrada").value = ""; // Limpia el contenido del área de texto de entrada.
    inicializar(); // Llama a la función inicializar para reiniciar el estado inicial de la interfaz.
}

function encriptar() {
    // Encripta el texto de entrada y lo muestra en el área de texto de salida.
    if (evaluarTexto()) { // Verifica si el texto de entrada es válido.
        let texto = document.getElementById("textarea-entrada").value; // Obtiene el texto de entrada.
        let textoEncriptado = ""; // Variable para almacenar el texto encriptado.
        for (let i = 0; i < texto.length; i++) {
            let caracter = texto[i]; // Obtiene el carácter actual.
            switch (caracter) {
                case "a": textoEncriptado += "ai"; break; // Encripta "a" como "ai".
                case "e": textoEncriptado += "enter"; break; // Encripta "e" como "enter".
                case "i": textoEncriptado += "imes"; break; // Encripta "i" como "imes".
                case "o": textoEncriptado += "ober"; break; // Encripta "o" como "ober".
                case "u": textoEncriptado += "ufat"; break; // Encripta "u" como "ufat".
                default: textoEncriptado += texto[i]; break; // Deja el carácter sin cambios si no es una vocal.
            }
        }
        document.getElementById("div-salida-mensaje").style.display = "none"; // Oculta el mensaje de salida predeterminado.
        document.getElementById("div-salida-textarea").style.display = "block"; // Muestra el área de texto de salida.
        document.getElementById("textarea-salida").value = textoEncriptado; // Establece el texto encriptado en el área de texto de salida.
    }
}

function desencriptar() {
    // Desencripta el texto de entrada y lo muestra en el área de texto de salida.
    if (evaluarTexto()) { // Verifica si el texto de entrada es válido.
        let texto = document.getElementById("textarea-entrada").value; // Obtiene el texto de entrada.
        let textoDesencriptado = texto.replaceAll("ai", "a") // Desencripta "ai" a "a".
        .replaceAll("enter", "e") // Desencripta "enter" a "e".
        .replaceAll("imes", "i") // Desencripta "imes" a "i".
        .replaceAll("ober", "o") // Desencripta "ober" a "o".
        .replaceAll("ufat", "u"); // Desencripta "ufat" a "u".
        document.getElementById("div-salida-mensaje").style.display = "none"; // Oculta el mensaje de salida predeterminado.
        document.getElementById("div-salida-textarea").style.display = "block"; // Muestra el área de texto de salida.
        document.getElementById("textarea-salida").value = textoDesencriptado; // Establece el texto desencriptado en el área de texto de salida.
    }
}

function evaluarTexto() {
    // Evalúa si el texto de entrada es válido (solo letras minúsculas y sin acentos).
    let evaluacion = false; // Variable para almacenar el resultado de la evaluación.
    let texto = document.getElementById("textarea-entrada").value; // Obtiene el texto de entrada.
    if (texto.length == 0) {
        mostrarAlerta("No hay texto que transformar", 1000); // Muestra una alerta que indica que no hay texto qeu copiar con duracion de 1000 ms.
        evaluacion = false; 
    } else {
        for (let i = 0; i < texto.length; i++) {
            let valorCaracter = texto.charCodeAt(i); // Obtiene el código ASCII del carácter actual.
            if (!((valorCaracter > 96 && valorCaracter < 126) || (valorCaracter == 129) || (valorCaracter == 164) || (valorCaracter == 32) || (valorCaracter == 10))) {
                // Verifica si el carácter no es una letra minúscula sin acentos, una enie, una u con dieresis, un espacio o una nueva línea, de acuerdo a su valor en ascci
                mostrarAlerta("El texto ingresado tiene el caracter inválido \"" + texto[i] + "\". Por favor ingrese solo letras minúsculas y sin acentos.", 3000);
                // Muestra una alerta si se encuentra un carácter inválido.
                evaluacion = false; // Establece la evaluación como falsa.
                break; // Sale del bucle si se encuentra un carácter inválido.
            } else {
                evaluacion = true; // Establece la evaluación como verdadera si el carácter es válido.
            }
        }
    }

    if(evaluacion == true){
        let audio = document.getElementById("audio-criptar"); // Establece el audio que sonara al dar clic al boton
        audio.play(); // Reproduce el audio
    }

    return evaluacion; // Devuelve el resultado de la evaluación.
}

function copiar() {
    // Copia el texto de salida al portapapeles.
    
    let texto = document.getElementById("textarea-salida").value.trim(); // Obtiene el valor y elimina espacios en blanco al inicio y final.
    if(texto.length != 0){ // Verifica que el texto no esté vacío.
        navigator.clipboard.writeText(texto); // Copia el texto al portapapeles.
        mostrarAlerta("Texto copiado", 1000); // Muestra una alerta que indica que el texto ha sido copiado.
        let audio = document.getElementById("audio-copiar"); // Establece el audio que sonara al dar clic al boton
        audio.play(); // Reproduce el audio
    } else{
        mostrarAlerta("No hay texto que copiar", 1000); // Muestra una alerta que indica que no hay texto que copiar.
    }
}

function mostrarAlerta(texto, duracion) {
    document.getElementById("div-alerta").hidden = false; // Muestra el div con id "div-alerta".
    document.getElementById("div-alerta").innerText = texto; // Establece el texto de la alerta.
    setTimeout(ocultarAlerta, duracion); // Llama a la función ocultarAlerta después de un tiempo especificado en milisegundos.
}

function ocultarAlerta() {
    document.getElementById("div-alerta").hidden = true; // Oculta el div con id "div-alerta".
}

function guardar() { 
    let textoCompleto = ""; // Inicializa la variable textoCompleto como una cadena vacía
    let textAreaEntrada = document.getElementById('textarea-entrada').value; // Obtiene el valor del textarea de entrada
    let textAreaSalida = document.getElementById('textarea-salida').value; // Obtiene el valor del textarea de salida

    if (textAreaEntrada.length != 0) { // Verifica si el textarea de entrada no está vacío
        textoCompleto = "Texto Ingresado:\n" + textAreaEntrada + "\n\n"; // Si no está vacío, añade su contenido a textoCompleto
    }

    if (textAreaSalida.length != 0) { // Verifica si el textarea de salida no está vacío
        textoCompleto = textoCompleto + "Texto Salida:\n" + textAreaSalida; // Si no está vacío, añade su contenido a textoCompleto
    }

    if (textoCompleto.length != 0) { // Verifica si textoCompleto no está vacío
        let blob = new Blob([textoCompleto], { type: 'text/plain' }); // Crea un Blob con el contenido de textoCompleto y tipo de texto plano
        let enlace = document.createElement('a'); // Crea un elemento de enlace (a)
        enlace.href = URL.createObjectURL(blob); // Establece el href del enlace con una URL que apunta al Blob
        enlace.download = 'EncripcionDesencripcion.txt'; // Establece el atributo download del enlace con el nombre del archivo
        enlace.click(); // Simula un clic en el enlace para iniciar la descarga
        let audio = document.getElementById("audio-guardar"); // Establece el audio que sonara al dar clic al boton
        audio.play(); // Reproduce el audio
    } else {
        mostrarAlerta("No hay textos que guardar", 1300); // Muestra una alerta si no hay textos que guardar
    }
}



