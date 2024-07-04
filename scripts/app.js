inicializar();

function inicializar(){
    document.getElementById("textarea_salida").style.display = "none";
    document.getElementById("textarea_salida").setAttribute("readonly", "true");
    document.getElementById("textarea_salida").value = "";
    document.getElementById("textarea_ingreso").setAttribute("placeholder", "Ingrese el texto aquí...");
    document.getElementById("textarea_ingreso").setAttribute("placeholder", "Ingrese el texto aquí...");
    document.getElementById("div_mensaje").style.display = "flex";    
}

function encriptar(){
    if(evaluarTexto()){
        let texto = document.getElementById("textarea_ingreso").value;
        let textoEncriptado = "";
        for(let i = 0; i < texto.length; i++){
            let caracter = texto[i];
            switch(caracter){
                case "a": textoEncriptado = textoEncriptado + "ai";
                break;
                case "e": textoEncriptado = textoEncriptado + "enter";
                break;
                case "i": textoEncriptado = textoEncriptado + "imes";
                break;
                case "o": textoEncriptado = textoEncriptado + "ober";
                break;
                case "u": textoEncriptado = textoEncriptado + "ufat";
                break;
                default: textoEncriptado = textoEncriptado + texto[i];
                break;
            }
        }
        document.getElementById("div_mensaje").style = "display:none";
        document.getElementById("textarea_salida").style = "display:block";
        document.getElementById("textarea_salida").value = textoEncriptado;
    }
}

function desencriptar(){
    if(evaluarTexto()){
        let texto = document.getElementById("textarea_ingreso").value;
        let textoDesencriptado = texto.replaceAll("ai", "a");
        texto = textoDesencriptado;
        textoDesencriptado = texto.replaceAll("enter", "e");
        texto = textoDesencriptado;
        textoDesencriptado = texto.replaceAll("imes", "i");
        texto = textoDesencriptado;
        textoDesencriptado = texto.replaceAll("ober", "o");
        texto = textoDesencriptado;
        textoDesencriptado = texto.replaceAll("ufat", "u");

        document.getElementById("div_mensaje").style = "display:none";
        document.getElementById("textarea_salida").style = "display:block";
        document.getElementById("textarea_salida").value = textoDesencriptado;
    }
}

function evaluarTexto(){
    let evaluacion = false;
    let texto = document.getElementById("textarea_ingreso").value;
    if(texto.length == 0){
        inicializar();
        evaluacion = false;
    } else{
        for(let i = 0; i < texto.length; i++){
            let valorCaracter = texto.charCodeAt(i);
            if(!((valorCaracter > 96 && valorCaracter < 126) || (valorCaracter == 129) || (valorCaracter == 164)  || (valorCaracter == 32) || (valorCaracter == 10))){
                alert("El texto ingresado tiene el caracter inválido \"" + texto[i] + "\". Por favor ingrese solo letras minúsculas y sin acentos.");
                evaluacion = false;
                break;
            }else{
                evaluacion = true;
            }     
        }
    }
    return evaluacion;
}

function copiar(){
    let texto = document.getElementById("textarea_salida").value.trim();
    navigator.clipboard.writeText(texto);
}

/*
README
comentarios
pie de pagina
etiquetas header
formatear codigo
*/

