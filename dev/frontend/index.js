/*---------node_modules ---------*/
const $ = require('jquery')
const page = require('page')
/*---------archivos externos ---------------*/
const utils =  require('./utils/Tables/utils')
const tables =  require('./utils/Tables/index')
const routeAdd = require('./utils/Routes/Add/index')
/*--------------inicio de clases -----------------*/
let table= new tables()


const datos={
    idUsuario:'2294',
    idCuentaActual:'CTA-2016',
    userName:'ROBERTO ANTONIO PAREDES',
    cuenta:'CUENTA PUBLICA 2016',
    ruta:'Acciones'
}

let datosTabla = utils.loadDataCatalogs(datos.ruta)
table.drawMainTable(table.createTemplate(datosTabla))

page()
