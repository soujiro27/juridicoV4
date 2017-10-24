const $ = require('jquery')
const api = require('./../../../../apis/Update/index')
const co = require('co')
const Promise = require('bluebird')


const update = new api()

const utils = {
    getSingleData,
    
}



function getSingleData(campo,id){
    let datos = co(function *(){
        let data = yield update.getData(campo,id)
        return data
    })
    return datos
}


module.exports = utils
