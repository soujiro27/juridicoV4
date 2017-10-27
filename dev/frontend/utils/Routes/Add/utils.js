const $ = require('jquery')
const urls = require('./../../rutasAbsolutas')
const apiForm = require('./../../../../apis/forms/index')
const apiMain = require('./../../../../apis/Main/index')
const co = require('co')
const Promise = require('bluebird')
const modals = require('./../../Modals/index')
const tableUtils = require('./../../Tables/utils')

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
    searchDocumento,
    loadObservaciones,
    newObservacion,
    cedulaIrac,
    buildFirmas,
    clickFirmas,
    insert,
    uploadFileAll,
    datosCedula,
    insertRuta,
    updateObservaciones,
    manejoConfronta,
    cedulaIfa,
    addPromocion
    
}

const templates = {
    auditoria : require('./../../Templates/auditoria.html'),
    irac : require('./../../Templates/irac.html'),
    newObservacion : require('./../../Templates/observacion.html'),
    cedulaIrac : require('./../../Templates/cedulaIrac.html'),
    firmas : require('./../../Templates/firmas.html'),
    iracObservaciones : require('./../../Templates/observacion.html'),
    confronta : require('./../../Templates/confronta.html'),
    cedulaIfa : require('./../../Templates/cedulaIfa.html'),
}


function hideButtons(){
    $('div#headerText').text('Añadir Nuevo Registro')
    $('a#addRegister').hide()
    $('div.estatus').remove();
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
                if(arreglo=='PDF' ){
                    $('div.icon img').attr('src','../../img/pdf.png')
                }else if(arreglo == 'DOC' || arreglo== 'DOCX'){
                    $('div.icon img').attr('src','../../img/doc.png')
                }else if(arreglo == 'XLS' || arreglo == 'XLSX')
                {$('div.icon img').attr('src','../../img/xls.png')

                }else if(arreglo == 'JPG'){
                    $('div.icon img').attr('src','../../img/jpg.png')
                }

                $('div.nombre').html(`<a href="/SIA/juridico/files/${nombre}" target="_blank">${nombre}</a>`)
            }   
            else{
                $('div.icon img').attr('src','../../img/file.png')
                $('div.nombre').html(`<span>No hay archivos o el Documento no Existe</span>`)
            }
        })
    })
}

function loadObservaciones(id){
    let promesa = co(function *(){
        let observaciones = yield formApi.getObservaciones({idVolante:id})
        let td = tableUtils.body(observaciones)
        
        let datosheader = yield formApi.getIracById({id:id})
        
        let template = templates.irac
        let res = template
        .replace(':folio',datosheader[0].folio)
        .replace(':numDocumento',datosheader[0].numDocumento)
        .replace(':remitente',datosheader[0].idRemitente)
        .replace(':body',td)


        return res
        
    })
    return promesa
}


function newObservacion(id){
    $('button#add').click(function(){
        let promesa = co(function *(){
            let datos = yield formApi.getIracById({id:id})
            let template = templates.newObservacion
            let res = template
            .replace(':idVolante',datos[0].idVolante)
            .replace(':cveAuditoria',datos[0].cveAuditoria)
            .replace(':idSubDoc',datos[0].idSubTipoDocumento)
            $('div#main-content').html(res)
            CKEDITOR.disableAutoInline=true
            CKEDITOR.replace('observacion')
            utils.insertRuta('ObservacionesDoctosJuridico')
            utils.cancelar('Irac')
            utils.hideButtons()
        })
    })
}


function cedulaIrac(id){
    $('button#cedula').click(function(){
        let promesa = co(function *(){
            let datos = yield formApi.getIracById({id:id})
            let cedula = yield formApi.getDocumentosSiglas({idVolante:datos[0].idVolante})
            let main = yield mainApi.datosInicio()
            let firmas  = yield formApi.getPersonalFirma({idUsuario:main.idUsuario})
            let camposFirmas = utils.buildFirmas(firmas)
            let template = templates.cedulaIrac
            let res = template
            .replace(':sub',datos[0].idSubTipoDocumento)
            .replace(':idVolante',datos[0].idVolante)
            .replace(':firmas',camposFirmas)

           if(cedula.length>0){
                modal.updateCedulaIrac(res,cedula)
           }else{
               $('div#main-content').html(res)
               $('input.fechaInput').datepicker({ dateFormat: "yy-mm-dd" });
               utils.clickFirmas()
               utils.datosCedula()
               utils.cancelar('Irac')

           }

        })
    })
}

function cedulaIfa(id){
    $('button#cedula').click(function(){
        let promesa = co(function *(){
            let datos = yield formApi.getIracById({id:id})
            let cedula = yield formApi.getDocumentosSiglas({idVolante:datos[0].idVolante})
            let main = yield mainApi.datosInicio()
            let firmas  = yield formApi.getPersonalFirma({idUsuario:main.idUsuario})
            let camposFirmas = utils.buildFirmas(firmas)
            let template = templates.cedulaIfa
            let res = template
            .replace(':sub',datos[0].idSubTipoDocumento)
            .replace(':idVolante',datos[0].idVolante)
            .replace(':firmas',camposFirmas)

           if(cedula.length>0){
               console.log(cedula)
            $('div#main-content').html(res)
            $('input#siglas').val(cedula[0].siglas)
            $('input#fOficio').val(cedula[0].fOficio)
            $('input.fechaInput').datepicker({ dateFormat: "yy-mm-dd" });
            utils.clickFirmas()
            utils.addPromocion()
            utils.hideButtons()
            $('div.numFolio').remove()
            utils.datosCedula()
            utils.cancelar('Ifa')
           }else{
               $('div#main-content').html(res)
               $('input.fechaInput').datepicker({ dateFormat: "yy-mm-dd" });
               utils.clickFirmas()
               utils.addPromocion()
               utils.hideButtons()
               $('div.numFolio').remove()
               utils.datosCedula()
               utils.cancelar('Ifa')

           }

        })
    })
}


function datosCedula(){
    $('form#DocumentosSiglas').submit(function(e){
        e.preventDefault()
        let puesto=''
        let datosArray =[]
        let datos = $(this).serializeArray()
        $.each(datos,function(index,el){
            if(datos[index].name == 'idPuesto'){
                puesto += datos[index].value + ','
            }else{
                let obj = {name:datos[index].name,value:datos[index].value}
                datosArray.push(obj)
            }
        })
        puesto = puesto.substring(0,puesto.length-1)
        datosArray.push({name:'idPuestosJuridico',value:puesto})
        
        let send = co(function *(){
            let envio = yield formApi.insertCatalogoRuta('DocumentosSiglas',datosArray)
          if(envio.Error == 'Registro Duplicado'){
              modal.errorMsg('Registro Duplicado')
          }else if (envio.Error == 'El Numero de Folio Y SubFolio ya se encuentra Asignado'){
              modal.errorMsg('El Numero de Folio Y SubFolio ya se encuentra Asignado')
           }
           else{
               location.href = urls.inicio + ruta
   
          }
        })
        

    })
}


function buildFirmas(datos){
    let res = ''
    $.each(datos,function(index,el){
      
    let template = templates.firmas
        let nombre = `${datos[index].saludo} ${datos[index].nombre} ${datos[index].paterno} ${datos[index].materno}`
        let temp = template
        .replace(':idPuesto',datos[index].idPuestoJuridico)
        .replace(':nombre',nombre)
        .replace(':puesto',datos[index].puesto)
        res = res + temp
    })
    return res
}

function clickFirmas(){
    $('input[type=checkbox]').click(function(){
        if($(this).is(':checked'))
        {
            $(this).parent().css({
                'background-color' : '#65140f',
                'color' : 'white'
            })
        }else{
            $(this).parent().css({
                'background-color' : 'white',
                'color' : '#666'
            })
        }
    })
}


function insert(ruta){
 $('form#'+ruta).submit(function(e){
     e.preventDefault()
     let datos = $(this).serializeArray()
     let send = co(function *(){
         let envio = yield formApi.insertCatalogo(ruta,datos)
       if(envio.Error == 'Registro Duplicado'){
           modal.errorMsg('Registro Duplicado')
       }else if (envio.Error == 'El Numero de Folio Y SubFolio ya se encuentra Asignado'){
           modal.errorMsg('El Numero de Folio Y SubFolio ya se encuentra Asignado')
        }
        else{
            location.href = urls.inicio + ruta

       }
     })
 })   
}

function insertRuta(ruta){
    $('form#'+ruta).submit(function(e){
        e.preventDefault()
        let datos = $(this).serializeArray()
        let send = co(function *(){
            let envio = yield formApi.insertCatalogoRuta(ruta,datos)
          if(envio.Error == 'Registro Duplicado'){
              modal.errorMsg('Registro Duplicado')
          }else if (envio.Error == 'El Numero de Folio Y SubFolio ya se encuentra Asignado'){
              modal.errorMsg('El Numero de Folio Y SubFolio ya se encuentra Asignado')
           }
           else{
              // location.href = urls.inicio + ruta
   
          }
        })
    })   
   }



function uploadFileAll(ruta){
    let self=this
    $('form#documentosJur').on('submit',function(e){
        e.preventDefault()
         var formData = new FormData($(this)[0]);
            $.ajax({
        url: 'uploadFile',  
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function(json){
            location.href = urls.inicio + ruta
        },
     
        error: function(){
            alert('ocurrio un eror')
        }
    });
    })
}


function updateObservaciones(){
    $('table.observaciones tbody tr').click(function(){
        let val = $(this).children().first().data('valor')
        let funcion = co(function *(){
            let obsv = yield formApi.getObservacionesById({idObservacionDoctoJuridico:val})
            modal.updateObservaciones(templates.iracObservaciones,obsv)
        })
        
    })
}


function manejoConfronta(id){
    let funcion = co(function *(){
        let campo = yield formApi.getCampoConfronta({idVolante:id})
        let datos = yield formApi.getDocumentosSiglas({idVolante:id})
        if(datos.length>0){
            if(campo["0"].idTipoDocto == 'OFICIO' && campo["0"].nota=='SI' )
            {//algo aqui
            }else{var nota = 'NO'}
            modal.updateConfronta(templates.confronta,datos,nota)
        }else{
            console.log('datos', datos);
            if(campo["0"].idTipoDocto == 'OFICIO' && campo["0"].nota=='SI' )
            {//algo aqui
            }else{$('div.notaInformativa').remove()}
            $('input#idVolante').val(id)
            utils.insertRuta('confrontasJuridico')
        }
    })
}


function addPromocion(){
    $('button#addPromoAccion').click(function(){
        let funcion = co(function *(){
            let textos = yield formApi.getDatos('DoctosTextos')
           
            let td = ''
            let template = `<table id="DoctosTextos" class="table"><thead><th class="idDocumentoTexto">idDocumentoTexto</th><th class="texto">Texto</th></thead><tbody>`
            $.each(textos,function(index,el){
                td += `<tr><td class="idDocumentoTexto" data-id="${textos[index].idDocumentoTexto}">${textos[index].idDocumentoTexto}</td><td class="texto">${textos[index].texto}</td></tr>`
            })
            template = template + td + '</tbody></table>'
            modal.doctosTExtos(template)
        })
    })
}


module.exports = utils