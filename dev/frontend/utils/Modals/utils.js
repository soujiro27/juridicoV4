const $ = require('jquery')
const urls = require('./../rutasAbsolutas')



const utils = {
    removeSend,
    caracteres,
    isEmptyInput,
    sendDataUpdate

}

function removeSend(){
    $('div.send').remove()
}

function caracteres(datos){
    
    $('div.nombre').append(`<input type="hidden" name="${datos.campo}" value="${datos.idCaracter}" />`)
    $('input#siglas').val(datos.siglas)
    $('input#nombre').val(datos.nombre)
}


function isEmptyInput(datos){
    for(let x in datos){
        let test = datos[x].value
        if(test.length<1){
            $('input[name="'+ datos[x].name + '"]').addClass('inputError')
            $('div.error p.error').text('No puede haber Datos Vacios')
            throw new Error('No puede haber datos Vacios')
        }else{
            return datos
        }
    }
}

function sendDataUpdate(datos, ruta){
    let empty = isEmptyInput(datos)
    //manda los datos con el api y respuesta de la api
    location.href = urls.inicio + ruta
}

module.exports = utils