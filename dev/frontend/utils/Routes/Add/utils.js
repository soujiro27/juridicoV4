const $ = require('jquery')
const urls = require('./../../rutasAbsolutas')
const apiForm = require('./../../../../apis/forms/index')
const apiMain = require('./../../../../apis/Main/index')
const co = require('co')
const Promise = require('bluebird')
const modals = require('./../../Modals/index')


const formApi = new apiForm()
const mainApi = new apiMain()
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
    getSubTipoDocDiversos,
    notaInformativa,
    modalAuditoria,
    nameFile,
    searchDocumento
    
}

const templates = {
    auditoria : require('./../../Templates/auditoria.html')
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


function getSubTipoDocDiversos(){
    $('select#idDocumento').change(function(){
        let val=$(this).val()
        let subDocumentos = co(function * (){
            let sub = yield formApi.getDatos('SubTiposDocumentosDiversos')
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

function modalAuditoria(){
    $('button#modalAuditoria').click(function(e){
        e.preventDefault()
        let datos = co(function * (){
            let sesiones = yield mainApi.datosInicio()
            let anio = sesiones.idCuentaActual
            anio = '/'+anio.substring(6)
            let template = templates.auditoria
            template = template.replace(':cuenta',sesiones.cuenta).replace(':cta',anio)
            modal.auditoria(template,anio)
        })
    })
}



function nameFile(){
    $('input#imagen').change(function(){
        let nombre = $(this).val()
        if(nombre=='')
        {
            $('span.titulo').text('Selecciona un Archivo')
        }else{

            $('span.titulo').text(nombre)
            let width = $('span.titulo').width()
            width+=150
            width = width + 'px'
            $('div.file').css('width',width)
        }
    })
}

function searchDocumento(){
    $('input#documento').keyup(function(){
        let doc = $(this).val()
        let docs = co(function *(){
            let datos = yield formApi.getDocumentosAuditoria({documento:doc})
            if(datos.length>0){
                let nombre = datos[0].anexoDoc
                let arreglo = nombre.split(".")
                arreglo = arreglo[1].toUpperCase()
                console.log('arreglo', arreglo);
                if(arreglo=='PDF' ){
                    $('div.icon').html(`<span><i class="fa fa-file-pdf-o" aria-hidden="true"></i></span>`)
                }
                $('div.nombre').html(`<span>${nombre}</p>`)
            }   
            else{

            }
        })
    })
}




module.exports = utils