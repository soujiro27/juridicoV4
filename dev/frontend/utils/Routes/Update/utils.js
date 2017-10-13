const $ = require('jquery')

const utils = {
    getSingleData,
    
}

const datos = {
    idCaracter: '1023',
    siglas: 'U',
    nombre: 'URGENTE',
    estatus: 'ACTIVO'
    
}


function getSingleData(campo,id){
    let data = datos //api
    data['campo'] = campo
    return data
}


module.exports = utils
