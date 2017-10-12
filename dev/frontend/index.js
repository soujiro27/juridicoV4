/*---------node_modules ---------*/
require('babelify-es6-polyfill')
const $ = require('jquery')
const page = require('page')
/*---------archivos externos ---------------*/
const utils =  require('./utils/Tables/utils')
const tables =  require('./utils/Tables/index')
const routeAdd = require('./utils/Routes/Add/index')
const routeUpdate = require('./utils/Routes/Update/index')
/*--------------inicio de clases -----------------*/
let table= new tables()


const datos={
    idUsuario:'2294',
    idCuentaActual:'CTA-2016',
    userName:'ROBERTO ANTONIO PAREDES',
    cuenta:'CUENTA PUBLICA 2016',
    ruta:'Caracteres'
}

let datosTabla = utils.loadDataCatalogs(datos.ruta)
table.drawMainTable(table.createTemplate(datosTabla),datos.ruta)

page()
