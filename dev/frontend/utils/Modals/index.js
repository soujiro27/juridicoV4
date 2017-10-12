const $ = require('jquery')
let confirm = require('jquery-confirm')

class Modals{
    caracteres(template,datos){
        $.confirm({
            title: 'Actualizar Registro',
            theme:'dark',
            content:template
        })
    }
}



module.exports = Modals