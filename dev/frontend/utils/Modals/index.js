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

}



module.exports = Modals