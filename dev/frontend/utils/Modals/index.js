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


}



module.exports = Modals