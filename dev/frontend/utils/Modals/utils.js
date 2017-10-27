const $ = require('jquery')
const urls = require('./../rutasAbsolutas')
const co = require('co')
const Promise = require('bluebird')
const updateApi = require('./../../../apis/Update/index')
const api = new updateApi()

const apiForm = require('./../../../apis/forms/index')

const formApi = new apiForm()

const utils = {
    removeSend,
    removeVolantes,
    removeVolantesDiversos,
    caracteres,
    doctosTextos,
    SubTiposDocumentos,
    acciones,
    volantes,
    volantesDiversos,
    isEmptyInput,
    sendDataUpdate,
    TableDatosAuditoria,
    tableTurnados,
    estatus,
    tipoDocumento,
    subDocumento,
    auditoriaSiNo,
    cambiaHora,
    comboCaracteres,
    comboTurnado,
    comboInstruccion,
    iracObservaciones,
    iracCedula,
    sendDataUpdateRuta,
    confronta

}


const templates = {
    datosAuditoria : require('./../Templates/datosAuditoria.html'),
    datosTurnado :  require('./../Templates/datosTurnado.html')
}


function removeSend(){
    $('div.send').remove()
  
}

function caracteres(datos){
    
    $('input#siglas').val(datos[0].siglas)
    $('input#nombre').val(datos[0].nombre)
    let res = utils.estatus(datos["0"].estatus)
    $('select#estatus').html(res)
    $('div.estatus').append(`<input type="hidden" name="idCaracter" value="${datos[0].idCaracter}" />`)
}

function confronta(datos,nota){
    if(nota=='NO'){
        $('div.notaInformativa').remove()
        $('input#notaInformativa').val(datos[0].notaInformativa)
    }
    $('input#nombre').val(datos[0].nombreResponsable)
    $('input#cargo').val(datos[0].cargoResponsable)
    $('input#fConfronta').val(datos[0].fConfronta)
    let hora = utils.cambiaHora(datos[0].hConfronta)
    $('input#hConfronta').val(hora)
    $('input#fOficio').val(datos[0].fOficio)
    $('input#siglas').val(datos[0].siglas)
    $('input#numFolio').val(datos[0].numFolio)
    $('input#idVolante').val(datos[0].idVolante)
    let res =  utils.estatus(datos[0].estatus)
    $('select#estatus').html(res)
    $('div.estatus').append(`<input type="hidden" name="idConfrontaJuridico" value="${datos[0].idConfrontaJuridico}" />`)


}

function SubTiposDocumentos(datos){
    
    let funcion = co (function * (){
        let tipoDocumento = yield  utils.tipoDocumento(datos[0].idTipoDocto)
        $('select#idDocumento').html(tipoDocumento)
        $('input#nombre').val(datos[0].nombre)
        
        let auditoria =  utils.auditoriaSiNo(datos[0].auditoria)
        $('select#auditoria').html(auditoria)

        
        let res =  utils.estatus(datos[0].estatus)
        $('select#estatus').html(res)
        $('div.estatus').append(`<input type="hidden" name="idSubTipoDocumento" value="${datos[0].idSubTipoDocumento}" />`)
    })
    
}

function acciones(datos){
    
    $('input#nombre').val(datos[0].nombre)
    let res = utils.estatus(datos["0"].estatus)
    $('select#estatus').html(res)
    $('div.estatus').append(`<input type="hidden" name="idAccion" value="${datos[0].idAccion}" />`)
}

function volantes(datos){
    let hora = utils.cambiaHora(datos[0].hRecepcion)
    $('input#Folio').val(datos[0].folio)
    $('input#subFolio').val(datos[0].subFolio)
    $('input#numDocumento').val(datos[0].numDocumento)
    $('input#anexos').val(datos[0].anexos)
    $('input#fDocumento').val(datos[0].fDocumento)
    $('input#fRecepcion').val(datos[0].fRecepcion)
    $('input#hRecepcion').val(hora)
    $('textarea').val(datos[0].asunto)
    let combos = co(function*(){
        let carac =yield utils.comboCaracteres(datos[0].idCaracter)
        let turn = yield utils.comboTurnado(datos[0].idTurnado)
        let acc = yield utils.comboInstruccion(datos[0].idAccion)
        $('select#idCaracter').html(carac)
        $('select#idTurnado').html(turn)
        $('select#idAccion').html(acc)
        let res = utils.estatus(datos["0"].estatus)
        $('select#estatus').html(res)
        $('div.estatus').append(`<input type="hidden" name="idVolante" value="${datos[0].idVolante}" />`)
    })
   
}


function volantesDiversos(datos){
    let hora = utils.cambiaHora(datos[0].hRecepcion)
    $('input#Folio').val(datos[0].folio)
    $('input#subFolio').val(datos[0].subFolio)
    $('input#numDocumento').val(datos[0].numDocumento)
    $('input#anexos').val(datos[0].anexos)
    $('input#fDocumento').val(datos[0].fDocumento)
    $('input#fRecepcion').val(datos[0].fRecepcion)
    $('input#hRecepcion').val(hora)
    $('input#idRemitente').val(datos[0].idRemitente)
    $('textarea').val(datos[0].asunto)
    let combos = co(function*(){
        let carac =yield utils.comboCaracteres(datos[0].idCaracter)
        let turn = yield utils.comboTurnado(datos[0].idTurnado)
        let acc = yield utils.comboInstruccion(datos[0].idAccion)
        $('select#idCaracter').html(carac)
        $('select#idTurnado').html(turn)
        $('select#idAccion').html(acc)
        let res = utils.estatus(datos["0"].estatus)
        $('select#estatus').html(res)
        $('div.estatus').append(`<input type="hidden" name="idVolante" value="${datos[0].idVolante}" />`)
    })
   
}

function doctosTextos(datos){
    let funcion = co(function *(){
        let tipoDocumento = yield  utils.tipoDocumento(datos[0].idTipoDocto)
        $('select#idDocumento').html(tipoDocumento)

        let sub = yield utils.subDocumento(datos[0].idTipoDocto,datos[0].idSubTipoDocumento)
        $('select#subDocumento').html(sub)

        $('textarea#textoForm').text(datos[0].texto)
        CKEDITOR.disableAutoInline=true
        let editor = CKEDITOR.replace('textoForm')
        editor.on('change',function(e){
            $('textarea#textoForm').text(editor.getData())
        })
        let res = utils.estatus(datos["0"].estatus)
        $('select#estatus').html(res)
        $('div.estatus').append(`<input type="hidden" name="idDocumentoTexto" value="${datos[0].idDocumentoTexto}" />`)
    
    })
   
    
   
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
    let funcion = co(function * (){
        let send = yield api.update(empty)
        if(send.Success == 'Success'){
            //location.href = urls.inicio + ruta
        }
    })
}

function sendDataUpdateRuta(datos, ruta){
    let empty = isEmptyInput(datos)
    let funcion = co(function * (){
        let send = yield api.updateRuta(ruta,empty)
        if(send.Success == 'Success'){
            //location.href = urls.inicio + ruta
        }
    })
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

function estatus(dato){
    dato = dato.trim()
    let res = ''
    if(dato == 'ACTIVO'){
       res = `<option value="ACTIVO">ACTIVO</option><option value="INACTIVO">INACTIVO</option> `
    }else{  
        res = `<option value="INACTIVO">INACTIVO</option><option value="ACTIVO">ACTIVO</option> `
    }
    return res
}

function tipoDocumento(id){
    let funcion = co(function * (){
        let opt = ''
        let datos = yield formApi.getDatos('tiposDocumentos')
        $.each(datos,function(index,el){
                if(datos[index].idTipoDocto == id){
                    opt+=`<option value="${datos[index].idTipoDocto}" selected>${datos[index].nombre}</option> `
                }else{
                    opt+=`<option value="${datos[index].idTipoDocto}">${datos[index].nombre}</option> `
                }
        })
        return opt
    })
    return funcion
}

function subDocumento(documento,subtipo){
    //esta funcion depende del oficio que se seleeciono
    let subDoc =  co (function *(){
        let opt=''
        let sub = yield api.getDataRuta('SubTiposDocumentos','idTipoDocto',documento)
        $.each(sub,function(index,el){
            if(sub[index].idSubTipoDocumento == subtipo){
                opt+=`<option value="${sub[index].idSubTipoDocumento}" selected>${sub[index].nombre}</option>`
            }else{
                opt+=`<option value="${sub[index].idSubTipoDocumento}" >${sub[index].nombre}</option>`
            }
        })
        return opt
    })
    return subDoc
}

function auditoriaSiNo(dato){
    let res = ''
    if(dato == 'SI'){
       res = `<option value="SI">SI</option><option value="NO">NO</option> `
    }else{  
        res = `<option value="NO">NO</option><option value="SI">SI</option> `
    }
    return res
}


function removeVolantes(){
    $('div.headerVolante').remove()
    $('input#Folio').prop('readonly','true')
    $('input#subFolio').prop('readonly','true')
    $('div.bloque3').remove()
}

function removeVolantesDiversos(){
    $('div.headerVolante').remove()
    $('input#Folio').prop('readonly','true')
    $('input#subFolio').prop('readonly','true')
}

function cambiaHora(dato){
    let res = dato.substring(0,5)
    return res
}


function comboCaracteres(id){
    let funcion = co(function * (){
        let datos = yield formApi.getDatos('caracteres')
       
        let opt = ''
        $.each(datos,function(index,el){
            if(datos[index].idCaracter == id){
                opt+=`<option value="${datos[index].idCaracter}" selected>${datos[index].nombre}</option>`
            }else{
                opt+=`<option value="${datos[index].idCaracter}">${datos[index].nombre}</option>`
            }
        })
        return opt
    })
    return funcion
}


function comboTurnado(id){
    let funcion = co(function * (){
        let datos = yield formApi.getDatos('turnados')
        let opt = ''
        $.each(datos,function(index,el){
            if(datos[index].idArea == id){
                opt+=`<option value="${datos[index].idArea}" selected>${datos[index].nombre}</option>`
            }else{
                opt+=`<option value="${datos[index].idArea}">${datos[index].nombre}</option>`
            }
        })
        return opt
    })
    return funcion
}


function comboInstruccion(id){
    let funcion = co(function * (){
        let datos = yield formApi.getDatos('acciones')
        let opt = ''
        $.each(datos,function(index,el){
            if(datos[index].idAccion == id){
                opt+=`<option value="${datos[index].idAccion}" selected>${datos[index].nombre}</option>`
            }else{
                opt+=`<option value="${datos[index].idAccion}">${datos[index].nombre}</option>`
            }
        })
        return opt
    })
    return funcion
}


function iracObservaciones(datos){
    console.log('datos', datos);
    let funcion = co(function *(){
        $('input#idVolante').val(datos[0].idVolante)
        $('input#cveAuditoria').val(datos[0].cveAuditoria)
        $('input#idSubTipoDocumento').val(datos[0].idSubTipoDocumento)
       $('input#pagina').val(datos[0].pagina)
       $('input#parrafo').val(datos[0].parrafo)
        $('textarea#observacionTexto').text(datos[0].observacion)
        CKEDITOR.disableAutoInline=true
        let editor = CKEDITOR.replace('observacionTexto')
        editor.on('change',function(e){
            $('textarea#observacionTexto').text(editor.getData())
        })
        let res = utils.estatus(datos["0"].estatus)
        $('select#estatus').html(res)
        $('div.estatus').append(`<input type="hidden" name="idObservacionDoctoJuridico" value="${datos[0].idObservacionDoctoJuridico}" />`)
    
    })
   
}


function iracCedula(datos){
    $('input#siglas').val(datos[0].siglas)
    $('input#fOficio').val(datos[0].fOficio)
    $('input#numFolio').val(datos[0].numFolio)
    console.log('datos', datos);
    let puestos = datos[0].idPuestosJuridico
    let puestosArray = puestos.split(',')
    console.log('puestosArray', puestosArray);
    for(let x in puestosArray){
        $(`input[value="${puestosArray[x]}"]`).prop('checked',true)
    }
    let res = utils.estatus(datos["0"].estatus)
    $('select#estatus').html(res)
    $('div.estatus').append(`<input type="hidden" name="idDocumentoSiglas" value="${datos[0].idDocumentoSiglas}" />`)
    

}
module.exports = utils