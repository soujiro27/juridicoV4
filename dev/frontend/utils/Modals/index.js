require("jquery-ui-browserify");
const $ = require('jquery')
const confirm = require('jquery-confirm')
const co = require('co')
const Promise = require('bluebird')


const utils = require('./utils')
const apiForm = require('./../../../apis/forms/index')

const formApi = new apiForm()




class Modals{
    updateCaracteres(template,datos){
       
        $.confirm({
            title: 'Actualizar Registro',
            theme:'modern',
            content:template,
            onOpenBefore:function(){
                utils.removeSend()
                utils.caracteres(datos)
            },
            buttons:{
                formSubmit:{
                    text: 'Actualizar',
                    btnClass: 'btn-blue',
                    action:function(){
                        let datosForm = $('form#Caracteres').serializeArray()
                        utils.sendDataUpdate(datosForm, 'Caracteres')

                    }
                },
                cancel:{
                    text: 'Cancelar',
                    btnClass: 'btn-danger'
                }
            }
        })
    }

    notaInformativa(){
        $.alert({
            title: '¿Contiene NOTA INFORMATIVA?',
            theme:'modern',
            content:'',
            buttons:{
                confirm:{
                    btnClass:'btn-primary',
                    text: 'SI',
                    action:function(){
                        $('input#notaConfronta').val('SI')
                    }},
                cancel:{
                    btnClass:'btn-danger',
                    text:'NO',
                    action:function(){
                        $('input#notaConfronta').val('NO')
                    }}}})
    }

    auditoria(template,anio){
        $.confirm({
            title: 'Seleccione el Numero de Auditoria',
            theme:'modern',
            content: template,
            buttons:{
                confirm:{
                    text: 'Aceptar',
                    btnClass:'btn-success'
                    
                },
                cancel:{
                    text:'Cancelar',
                    btnClass: 'btn-danger'
                }
            },
            onOpenBefore:function(){
                $('input#auditoria').keyup(function(){
                    let cve = `ASCM/${$(this).val()}${anio}`
                    let datosAuditoria = co(function *(){
                        let datos = yield formApi.getAuditoria({clave:cve})
                        let turnado = yield formApi.getTurnadoAuditoria({cveAuditoria:datos[0].auditoria})
                        
                        let table = utils.TableDatosAuditoria(datos)
                        $('div.datosAuditoria').html(table)

                        let tableTurnado = utils.tableTurnados(turnado)
                        $('div.asignacion').html(tableTurnado)

                        $('p#textoCveAuditoria').text(cve)
                        $('input#cveAuditoria').val(datos[0].auditoria)
                        $('input#idRemitente').val(datos[0].idArea)

                    })
                })
            }
        })
    }


    updateDoctosTextos(template,datos){
        
         $.confirm({
             title: 'Actualizar Registro',
             theme:'modern',
             content:template,
             onOpenBefore:function(){
                 utils.removeSend()
                 utils.doctosTextos(datos)},
             buttons:{
                formSubmit:{
                    text: 'Actualizar',
                    btnClass: 'btn-blue',
                    action:function(){
                        let datosForm = $('form#DoctosTextos').serializeArray()
                        utils.sendDataUpdate(datosForm, 'DoctosTextos')
                    }
                },
                 cancel:{text: 'Cancelar',btnClass: 'btn-danger'}
             }})
    }

    updateSubTipoDocumentos(template,datos){
        
         $.confirm({
             title: 'Actualizar Registro',
             theme:'modern',
             content:template,
             onOpenBefore:function(){
                 utils.removeSend()
                 utils.SubTiposDocumentos(datos)},
             buttons:{
                formSubmit:{
                    text: 'Actualizar',
                    btnClass: 'btn-blue',
                    action:function(){
                        let datosForm = $('form#SubTiposDocumentos').serializeArray()
                        utils.sendDataUpdate(datosForm, 'SubTiposDocumentos')
                    }
                },
                 cancel:{text: 'Cancelar',btnClass: 'btn-danger'}
             }})
    }



    updateAcciones(template,datos){
        
         $.confirm({
             title: 'Actualizar Registro',
             theme:'modern',
             content:template,
             onOpenBefore:function(){
                 utils.removeSend()
                 utils.acciones(datos)},
             buttons:{
                formSubmit:{
                    text: 'Actualizar',
                    btnClass: 'btn-blue',
                    action:function(){
                        let datosForm = $('form#Acciones').serializeArray()
                        utils.sendDataUpdate(datosForm, 'Acciones')
                    }
                },
                 cancel:{text: 'Cancelar',btnClass: 'btn-danger'}
             }})
    }


    updateVolantes(template,datos){
        
         $.confirm({
             title: 'Actualizar Registro',
             theme:'modern',
             content:template,
             onOpenBefore:function(){
                utils.removeSend()
                utils.removeVolantes()
                utils.volantes(datos)
                },
             buttons:{
                formSubmit:{
                    text: 'Actualizar',
                    btnClass: 'btn-blue',
                    action:function(){
                        let datosForm = $('form#Volantes').serializeArray()
                        utils.sendDataUpdate(datosForm, 'Volantes')
                    }
                },
                 cancel:{text: 'Cancelar',btnClass: 'btn-danger'}
             }})
    }

    updateVolantesDiversos(template,datos){
        
         $.confirm({
             title: 'Actualizar Registro',
             theme:'modern',
             content:template,
             onOpenBefore:function(){
                utils.removeSend()
                utils.removeVolantesDiversos()
                utils.volantesDiversos(datos)
                },
             buttons:{
                formSubmit:{
                    text: 'Actualizar',
                    btnClass: 'btn-blue',
                    action:function(){
                        let datosForm = $('form#VolantesDiversos').serializeArray()
                        utils.sendDataUpdate(datosForm, 'VolantesDiversos')
                    }
                },
                 cancel:{text: 'Cancelar',btnClass: 'btn-danger'}
             }})
    }



    updateObservaciones(template,datos){
        $.confirm({
            title: 'Actualizar Registro',
            theme:'modern',
            content:template,
            onOpenBefore:function(){
                utils.removeSend()
                utils.iracObservaciones(datos)
            },
            buttons:{
               formSubmit:{
                   text: 'Actualizar',
                   btnClass: 'btn-blue',
                   action:function(){
                       let datosForm = $('form#ObservacionesDoctosJuridico').serializeArray()
                       utils.sendDataUpdate(datosForm, 'Irac')
                   }
               },
                cancel:{text: 'Cancelar',btnClass: 'btn-danger'}
            }})
    }

    updateCedulaIrac(template,datos){
        $.confirm({
            title: 'Actualizar Registro',
            theme:'modern',
            content:template,
            onOpenBefore:function(){
                utils.removeSend()
                utils.iracCedula(datos)
            },
            buttons:{
               formSubmit:{
                   text: 'Actualizar',
                   btnClass: 'btn-blue',
                   action:function(){
                       let puesto=''
                       let datosArray =[]
                       let datos = $('form#DocumentosSiglas').serializeArray()
                       $.each(datos,function(index,el){
                           if(datos[index].name == 'idPuesto'){
                               puesto += datos[index].value + ','
                           }else{
                               let obj = {name:datos[index].name,value:datos[index].value}
                               datosArray.push(obj)
                           }
                       })
                       puesto = puesto.substring(0,puesto.length-1)
                       datosArray.unshift({name:'idPuestosJuridico',value:puesto})
                       utils.sendDataUpdateRuta(datosArray, 'DocumentosSiglas')
                   }
               },
                cancel:{text: 'Cancelar',btnClass: 'btn-danger'}
            }})
    }

    updateConfronta(template,datos,nota){
        
         $.confirm({
             title: 'Actualizar Registro',
             theme:'modern',
             content:template,
             onOpenBefore:function(){
                $('div#main-content').remove()
                 utils.removeSend()
                 utils.confronta(datos,nota)
             },
             buttons:{
                 formSubmit:{
                     text: 'Actualizar',
                     btnClass: 'btn-blue',
                     action:function(){
                         let datosForm = $('form#confrontasJuridico').serializeArray()
                         utils.sendDataUpdateRuta(datosForm, 'confrontasJuridico')
 
                     }
                 },
                 cancel:{
                     text: 'Cancelar',
                     btnClass: 'btn-danger',
                     action:function(){
                         location.href = '/SIA/juridico/confrontasJuridico'
                     }
                 }
             }
         })
     }

    errorMsg(msg){
        $.alert({
            theme : 'supervan',
            title : 'Error',
            content : msg
        })
    }

}



module.exports = Modals