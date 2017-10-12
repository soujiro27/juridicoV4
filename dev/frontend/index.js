const $ = require('jquery')
const utils =  require('./utils/Tables/utils')
const tables =  require('./utils/Tables/index')
let table= new tables()

const datos={
    idUsuario:'2294',
    idCuentaActual:'CTA-2016',
    userName:'ROBERTO ANTONIO PAREDES',
    cuenta:'CUENTA PUBLICA 2016',
    ruta:'Caracteres'
}

let datosTabla = utils.loadDataCatalogs(datos.ruta)
table.drawMainTable(table.createTemplate(datosTabla))


