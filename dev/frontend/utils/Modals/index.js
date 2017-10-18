require("jquery-ui-browserify");
const $ = require('jquery')
const confirm = require('jquery-confirm')

const utils = require('./utils')


class Modals{
    caracteres(template,datos){
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
        $.confirm({
            title: '¿Contiene NOTA INFORMATICA?',
            theme:'modern',
            buttons:{
                confirm:{
                    btnClass:'btn-primary',
                    text: 'SI',
                    action:function(){
                        $('input#notaConfronta').val('SI')
                    }},
                somethingElse:{
                    btnClass:'btn-danger',
                    text:'NO',
                    action:function(){
                        $('input#notaConfronta').val('NO')
                    }}}})
    }

    auditoria(){
        
        $.confirm({
            title: '¿Contiene NOTA INFORMATICA?',
            theme:'modern',
        })
    }

}



module.exports = Modals