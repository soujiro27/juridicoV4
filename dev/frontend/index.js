/*---------node_modules ---------*/
require('babelify-es6-polyfill')
const $ = require('jquery')
const page = require('page')
const co = require('co')
const Promise = require('bluebird')
/*---------archivos externos ---------------*/
const utils =  require('./utils/Tables/utils')
const tables =  require('./utils/Tables/index')
const routeAdd = require('./utils/Routes/Add/index')
const routeUpdate = require('./utils/Routes/Update/index')
const loadDatos = require('./../apis/Main/index')
/*--------------inicio de clases -----------------*/
let table= new tables()
let main = new loadDatos()

let test = co(function * (){
    let datos = yield main.datosInicio()
    let datosTabla = yield utils.loadDataCatalogs(datos.ruta)
    table.drawMainTable(table.createTemplate(datosTabla),datos.ruta)
})

page()
