const $ = require('jquery')
const urls = require('./../rutasAbsolutas')



const utils = {
    removeSend,
    caracteres,
    isEmptyInput,
    sendDataUpdate,
    TableDatosAuditoria,
    tableTurnados

}


const templates = {
    datosAuditoria : require('./../Templates/datosAuditoria.html'),
    datosTurnado :  require('./../Templates/datosTurnado.html')
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

function TableDatosAuditoria(datos){
    let template = templates.datosAuditoria
    let campos = `<tr><td>${datos[0].sujeto}</td><td>${datos[0].rubros}</td><td>${datos[0].tipo}</td></tr>`
    let res = template.replace(':datos',campos)
    return res
    
}

function tableTurnados(datos){
   let body
    if (datos.length>0){
       body = `<tr>`
       for(let x in datos){
           if(datos[x].nombre=='IRAC'){
               body += `<td>${datos[x].turnado}</td>`
           }
           else if(datos[x].nombre == 'CONFRONTA'){
                body += `<td>${datos[x].turnado}</td>`
           }
           else if(datos[x].nombre == 'IFA'){
            body += `<td>${datos[x].turnado}</td>`
           }
           else{
            body += `<td>No Asignado</td>`
           }
       }
       body += `</tr>`
   }
   else{
       body = `<tr><td>No Asignado</td><td>No Asignado</td><td>No Asignado</td></tr>`
   }
   let template = templates.datosTurnado
   let res = template.replace(':datos',body)
   return res
   
}


module.exports = utils