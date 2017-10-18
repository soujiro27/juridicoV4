const $ = require('jquery')
const urls = require('./../../rutasAbsolutas')
const apiForm = require('./../../../../apis/forms/index')
const co = require('co')
const Promise = require('bluebird')
const modals = require('./../../Modals/index')


const formApi = new apiForm()
const modal = new modals()

const utils = {
    hideButtons,
    cancelar,
    getDatosDoctosTexto,
    getSubTipoDoc,
    getDatosVolantes,
    comboDocumentos,
    comboCaracteres,
    comboTurnados,
    comboAcciones,
    getSubTipoDocAuditoria,
    notaInformativa
    
}





function hideButtons(){
    $('div#headerText').text('Añadir Nuevo Registro')
    $('a#addRegister').hide()
}

function cancelar(ruta){
   $('button#cancelar').click(function(e){
       e.preventDefault()
       location.href = urls.inicio + ruta
   })
}

function getDatosDoctosTexto(template){
    let documentos =co(function * (){
        let documentos = yield formApi.getDatos('tiposDocumentos')
        let opt='<option value="">Seleccione un Documento</option>'
        for(let x in documentos){
            opt+=`<option value="${documentos[x].idTipoDocto}">${documentos[x].nombre}</option>`
        }
        let tmplt=template.replace(':optionDocumento',opt)
        return tmplt
    })
    return documentos
   
}

function getSubTipoDoc(){
    $('select#idDocumento').change(function(){
        let val=$(this).val()
        let subDocumentos = co(function * (){
            let sub = yield formApi.getDatos('subTiposDocumentos')
            let opt='<option value="">Seleccione un Sub Documento</option>'
            for(let x in sub){
                if(val==sub[x].idTipoDocto){
                    opt+=`<option value="${sub[x].idSubTipoDocumento}">${sub[x].nombre}</option>`
                }
            }
            $('select#subDocumento').html(opt)
        }) 
       
    })
}

function getDatosVolantes(template){
    let res = co(function * (){
        
        let documentos = yield formApi.getDatos('tiposDocumentos')
        let comboDocumentos = utils.comboDocumentos(documentos)
        template = template.replace(':documentos',comboDocumentos)

        let caracteres = yield formApi.getDatos('caracteres')
        let comboCaracteres = utils.comboCaracteres(caracteres)
        template = template.replace(':caracteres',comboCaracteres)

        let turnados = yield formApi.getDatos('turnados')
        let comboTurnados = utils.comboTurnados(turnados)
        template = template.replace(':turnados',comboTurnados)
        
        
        let acciones = yield formApi.getDatos('acciones')
        let comboAcciones = utils.comboAcciones(acciones)
        template = template.replace(':acciones',comboAcciones)

        return template
    })
    return res
}


function comboDocumentos(documentos){
    let opt='<option value="">Seleccione un Documento</option>'
    for(let x in documentos){
        opt+=`<option value="${documentos[x].idTipoDocto}">${documentos[x].nombre}</option>`
    }
    return opt
}


function comboCaracteres(documentos){
    let opt='<option value="">Seleccione un Documento</option>'
    for(let x in documentos){
        opt+=`<option value="${documentos[x].idCaracter}">${documentos[x].nombre}</option>`
    }
    return opt
}

function comboTurnados(documentos){
    let opt='<option value="">Seleccione un Documento</option>'
    for(let x in documentos){
        opt+=`<option value="${documentos[x].idArea}">${documentos[x].nombre}</option>`
    }
    return opt
}

function comboAcciones(documentos){
    let opt='<option value="">Seleccione un Documento</option>'
    for(let x in documentos){
        opt+=`<option value="${documentos[x].idAccion}">${documentos[x].nombre}</option>`
    }
    return opt
}

function getSubTipoDocAuditoria(){
    $('select#idDocumento').change(function(){
        let val=$(this).val()
        let subDocumentos = co(function * (){
            let sub = yield formApi.getDatos('SubTiposDocumentosAuditoria')
            let opt='<option value="">Seleccione un Sub Documento</option>'
            for(let x in sub){
                if(val==sub[x].idTipoDocto){
                    opt+=`<option value="${sub[x].idSubTipoDocumento}">${sub[x].nombre}</option>`
                }
            }
            $('select#subDocumento').html(opt)
        }) 
       
    })
}


function notaInformativa(){
    $('select#subDocumento').change(function(){
        let documento = $('select#idDocumento').val()
        let sub =  $('select#subDocumento option:selected').text()
        if(documento=='OFICIO' && sub=='CONFRONTA'){
            modal.notaInformativa()
        }
        
    })
}


module.exports = utils