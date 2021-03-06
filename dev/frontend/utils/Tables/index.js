const utils =  require('./utils')
const $ = require('jquery')
class Tables{

    createTemplate(datos){
    let template = require('./../Templates/table.html')   
    let headers = utils.headers(datos)
    let body = utils.body(datos)
    template = template.replace(':headers',headers)
    template = template.replace(':body',body)
    return template
    }
    
    drawMainTable(template,ruta){
        $('div#main-content').html(template)
        utils.clickTr(ruta)
        utils.loadOrder(ruta)
        utils.hideAdd(ruta)
    }

  
}


module.exports = Tables
