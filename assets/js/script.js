// Capturando elementos do arquivo HTML
const container = document.querySelector('.container')
const divRadios = document.querySelector('.opcoesProcess')
const radioCriptografar = document.querySelector('#criptografar')
const radioDesriptografar = document.querySelector('#descriptografar')
const tipoCriptografiaScript = document.querySelector('#script')
const selectTipoCript = document.querySelector('#selectTipoCript')
const divSelect = document.querySelector('#divSelect')
const btnProcessar = document.querySelector('#button')
const entrada = document.querySelector('#textoInicial')
const saida = document.querySelector('#textoFinal')
const incremento = document.querySelector('#incremento')

// Criando a div e o span do popUp de erro
const divTextSpan = document.createElement('div')
const textSpan = document.createElement('span')
textSpan.setAttribute('id', 'textSpan')

// Previnindo comportamentos nativos do navegador na página
addEventListener('submit', (e) =>{
    e.preventDefault();
})

// Definindo comportamento do campo select e atribuindo comportamentos dos botões
selectTipoCript.addEventListener('change', () =>{
   
    //Cifra de Cesar selecionado
    if(selectTipoCript.options[selectTipoCript.selectedIndex].value === '1'){
        
        radioCriptografar.setAttribute('onchange' , 'defineCodificarCesar()')
        radioDesriptografar.setAttribute('onchange' , 'defineDecodificarCesar()')
        divRadios.style.display = 'flex'
        btnProcessar.removeAttribute('onclick')
        btnProcessar.style.display = 'block'
        radioCriptografar.checked = true
        btnProcessar.value = 'codificar'
        btnProcessar.setAttribute('onclick', 'codificarCesar()')
        radioDesriptografar.checked = false
        saida.value = ''
        incremento.style.display = 'flex'
    }

    //Base64 selecionado
    else if (selectTipoCript.options[selectTipoCript.selectedIndex].value === '2'){

        radioCriptografar.setAttribute('onchange' , 'defineCodificarBase64()')
        radioDesriptografar.setAttribute('onchange' , 'defineDecodificarBase64()')
        divRadios.style.display = 'flex'
        btnProcessar.removeAttribute('onclick')
        btnProcessar.style.display = 'block'
        radioCriptografar.checked = true
        btnProcessar.value = 'codificar'
        btnProcessar.setAttribute('onclick', 'codificarBase64()')
        radioDesriptografar.checked = false
        saida.value = ''
        incremento.style.display = ''
    }
})

// * Funções responsáveis por atribuir o funcionamento do botão principal da página
function defineCodificarCesar(){
    btnProcessar.value = 'codificar'
    btnProcessar.setAttribute('onclick', 'codificarCesar()')
}

function defineDecodificarCesar(){
    btnProcessar.value = 'decodificar'
    btnProcessar.setAttribute('onclick', 'decodificarCesar()')
}
// *

// *Funções que define comportamento do botãoprincipal quando "Cifra de César" estiver selecionado
function codificarCesar(){
    if(incremento.firstElementChild.value === ''){
        criaPopUpErro()
        erroIncrementoVazio()
    }
    else if(incremento.firstElementChild.value < 1 || incremento.firstElementChild.value > 25){
        criaPopUpErro()
        erroIncrementoInvalido()
    }
    else if(entrada.value === ''){
        criaPopUpErro()
        erroEntradaVazia()
    }
    else{
        saida.value = cifraDeCesarCodificar()
    }
}

function decodificarCesar(){
    if(incremento.firstElementChild.value === ''){
        criaPopUpErro()
        erroIncrementoVazio()
    }
    else if(incremento.firstElementChild.value < 1 || incremento.firstElementChild.value > 25){
        criaPopUpErro()
        erroIncrementoInvalido()
    }
    else if(entrada.value === ''){
        criaPopUpErro()
        erroEntradaVazia()
    }
    else{
        saida.value = cifraDeCesarDecodificar()
    }
}
// *

// *Funções que define comportamento do botãoprincipal quando "Base64" estiver selecionado
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
        criaPopUpErro()
        erroEntradaVazia()
    }
    else{
        saida.value = btoa(entrada.value)
    }
}

function decodificarBase64(){
    if(entrada.value === ''){
        criaPopUpErro()
        erroEntradaVazia()
    }
    else{
    saida.value = atob(entrada.value)
    }
}
// *

// Função responsavel por criar pop-Up de erro
function criaPopUpErro(){
    desabilitaOperações()
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
        reabilitaOperações()
       
    })
}

//  Função responsabel por ocultar elementos de operação da página (select, radio-buttons e botão)
function desabilitaOperações(){
    btnProcessar.style.display = 'none'
    divSelect.style.display = 'none'
    divRadios.style.display = 'none'
}

//  Função responsabel por voltar a exibir elementos de operação da página (select, radio-buttons e botão)
function reabilitaOperações(){
    btnProcessar.style.display = 'block'
    divSelect.style.display = ''
    divRadios.style.display = 'flex'
}

// * Funções responsaveis por inserir o texto no pop-Up de erro
function erroIncrementoVazio(){
    divTextSpan.appendChild(textSpan)
    textSpan.innerHTML = 'INFORME O INCREMENTO'
}

function erroIncrementoInvalido(){
    divTextSpan.appendChild(textSpan)
    if(incremento.firstElementChild.value > 25){
        incremento.firstElementChild.value = 25
    }
    else if(incremento.firstElementChild.value < 1){
        incremento.firstElementChild.value = 1
    }
    textSpan.innerHTML = 'O INCREMENTO NÃO PODE SER MENOR QUE 1 E NEM MAIOR QUE 25'
}

function erroEntradaVazia(){
    divTextSpan.appendChild(textSpan)
    textSpan.innerHTML = 'O CAMPO "TEXTO INICIAL" DEVE SER PREENCHIDO'
}
// *

// Função que Codifica Cifra de Cesar 
function cifraDeCesarCodificar(){
    let result = ''
    const valorIncremento = Number(incremento.firstElementChild.value)
    const valueEntrada = entrada.value
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

// Função que Decodifica Cifra de Cesar 
function cifraDeCesarDecodificar(){
    let result = ''
    const valorIncremento = Number(incremento.firstElementChild.value)
    const valueEntrada = entrada.value
    for(let i=0; i< valueEntrada.length; i++){
        let ascii = valueEntrada[i].charCodeAt();
        if(ascii >= 65 && ascii <= 90){
            result += String.fromCharCode(((ascii - 90 - valorIncremento)% 26) + 90)
        }
        else if(ascii >= 97 && ascii <= 122){
            result += String.fromCharCode(((ascii - 122 - valorIncremento)% 26) + 122)   
        }
        else{   
            result += String.fromCharCode(ascii)
        }
    }  
    return result
}