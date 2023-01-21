const container = document.querySelector('.container')
const radioCriptografar = document.querySelector('#criptografar')
const radioDesriptografar = document.querySelector('#descriptografar')
const tipoCriptografiaScript = document.querySelector('#script')
const selectTipoCript = document.querySelector('#selectTipoCript')
const btnProcessar = document.querySelector('#button')
const entrada = document.querySelector('#textoInicial')
const saida = document.querySelector('#textoFinal')
const incremento = document.querySelector('#incremento')
const divTextSpan = document.createElement('div')
const textSpan = document.createElement('span')
textSpan.setAttribute('id', 'textSpan')

selectTipoCript.addEventListener('change', () =>{
   
    if(selectTipoCript.options[selectTipoCript.selectedIndex].value === '1'){
    
        radioCriptografar.setAttribute('onchange' , 'defineCodificarCesar()')
        radioDesriptografar.setAttribute('onchange' , 'defineDecodificarCesar()')
        btnProcessar.removeAttribute('onclick')
        radioCriptografar.checked = true
        btnProcessar.value = 'codificar'
        btnProcessar.setAttribute('onclick', 'codificarCesar()')
        radioDesriptografar.checked = false
        saida.value = ''
        incremento.style.display = 'inline'
    }

    else if (selectTipoCript.options[selectTipoCript.selectedIndex].value === '2'){

        radioCriptografar.setAttribute('onchange' , 'defineCodificarBase64()')
        radioDesriptografar.setAttribute('onchange' , 'defineDecodificarBase64()')
        btnProcessar.removeAttribute('onclick')
        radioCriptografar.checked = true
        btnProcessar.value = 'codificar'
        btnProcessar.setAttribute('onclick', 'codificarBase64()')
        radioDesriptografar.checked = false
        saida.value = ''
        incremento.style.display = ''

    }
})


function defineCodificarCesar(){
    btnProcessar.value = 'codificar'
    btnProcessar.setAttribute('onclick', 'codificarCesar()')
}

function defineDecodificarCesar(){
    btnProcessar.value = 'decodificar'
    btnProcessar.setAttribute('onclick', 'decodificarCesar()')
}

function codificarCesar(){
    if(incremento.firstElementChild.value === ''){
        exibeSpan()
        erroIncrementoVazio()
    }
    else if(entrada.value === ''){
        exibeSpan()
        erroEntradaVazia()
    }
    else{
        saida.value = cifraDeCesarCodificar()
    }
}
function decodificarCesar(){
    if(incremento.firstElementChild.value === ''){
        exibeSpan()
        erroIncrementoVazio()
    }
    else if(entrada.value === ''){
        exibeSpan()
        erroEntradaVazia()
    }
    else{
        saida.value = cifraDeCesarDecodificar()
    }
}


function defineCodificarBase64(){
    
    btnProcessar.value = 'codificar'
    btnProcessar.setAttribute('onclick', 'codificarBase64()')
}

function defineDecodificarBase64(){
    btnProcessar.value = 'decodificar'
    btnProcessar.setAttribute('onclick', 'decodificarBase64()')
}

function codificarBase64(){
    if(entrada.value === ''){
        exibeSpan()
        erroEntradaVazia()
        
    }
    else{
        saida.value = btoa(entrada.value)
    }
    
}

function decodificarBase64(){
    if(entrada.value === ''){
        exibeSpan()
        erroEntradaVazia()
    }
    else{
    saida.value = atob(entrada.value)
    }
}


function exibeSpan(){
    const popUp = document.createElement('div')
    popUp.setAttribute('id', 'popUp')
    popUp.setAttribute('class', 'displayFlex directionColumn')
    container.appendChild(popUp)
    
    
    divTextSpan.setAttribute('id', 'divTextSpan')
    popUp.appendChild(divTextSpan)

    const divBtnClose = document.createElement('div')
    divBtnClose.setAttribute('id', 'divBtnClose')
    divBtnClose.setAttribute('class', 'displayFlex')
    popUp.appendChild(divBtnClose)


    const btnClose = document.createElement('button')
    btnClose.setAttribute('id', 'btnClose')
    btnClose.innerHTML = 'OK'
    divBtnClose.appendChild(btnClose)
    btnClose.addEventListener('click', () => {
        container.removeChild(popUp)
        divTextSpan.removeChild(textSpan)
    })
}

function erroIncrementoVazio(){
    divTextSpan.appendChild(textSpan)
    textSpan.innerHTML = 'INFORME UM INCREMENTO'
}

function erroEntradaVazia(){
    divTextSpan.appendChild(textSpan)
    textSpan.innerHTML = 'O CAMPO "TEXTO INICIAL" PRECISA SER PREENCHIDO'
}



function cifraDeCesarCodificar(){
    let result = ''
    const valorIncremento = Number(incremento.firstElementChild.value)
    const valueEntrada = entrada.value
    console.log(valueEntrada)
    for(let i=0; i< valueEntrada.length; i++){
        let ascii = valueEntrada[i].charCodeAt();
        if(ascii >= 65 && ascii <= 90){
            result += String.fromCharCode(((ascii - 65 + valorIncremento)% 26) + 65)
        }
        else if(ascii >= 97 && ascii <= 122){
            result += String.fromCharCode(((ascii - 97 + valorIncremento)% 26) + 97)   
        }
        else{   
            result += String.fromCharCode(ascii)
        }
    }  
    return result
}


function cifraDeCesarDecodificar(){
    let result = ''
    const valorIncremento = Number(incremento.firstElementChild.value)
    const valueEntrada = entrada.value
    console.log(valueEntrada)
    for(let i=0; i< valueEntrada.length; i++){
        let ascii = valueEntrada[i].charCodeAt();
        if(ascii >= 65 && ascii <= 90){
            result += String.fromCharCode(((ascii - 65 - valorIncremento)% 26) + 65)
        }
        else if(ascii >= 97 && ascii <= 122){
            result += String.fromCharCode(((ascii - 97 - valorIncremento)% 26) + 97)   
        }
        else{   
            result += String.fromCharCode(ascii)
        }
    }  
    return result
}