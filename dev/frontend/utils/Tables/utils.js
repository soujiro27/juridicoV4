const yo = require('yo-yo')
const $ =  require('jquery')
const page =  require('page')


const urls =  require('./../rutasAbsolutas')
const tableApi = require('./../../../apis/tables/index')

let api = new tableApi()

const utils = {
    loadDataCatalogs,
    headers,
    body,
    clickTr,
    loadOrder
}

const modulosOrder = ['Volantes']




async function loadDataCatalogs(ruta){
  
    let promesa = api.getTable(ruta)
    let datos = await promesa
    return datos
}

function headers(datos){
    let th=''
    $.each(datos[0],function(index,el){
        th+=`<th id="${index}" class="${index}" data-order="${index}">${index} <div class="orderby"></div></th>`
    })
    return th
}

function body(datos){
    let tr=''
    for(let x in datos){
        tr+= `<tr>`;
        $.each(datos[x],function(index,el){
            tr+= `<td id="${index}"  data-valor="${el}"> ${el} </td>`;
       })
       tr+= `</tr>`
    }
    return tr;
}

function clickTr(ruta){
    $('table.principal tbody tr').click(function(){
        let id=$(this).children().first().data('valor')
        let campo=$(this).children().first().attr('id')
        page.redirect(urls.inicio + ruta + '/update/' + campo + '/' + id)
    })
}

function loadOrder(ruta){
  for(let x in modulosOrder){
      if(ruta==modulosOrder[x]){
        clickOrder()
      }
  }
}

function clickOrder(){
    $('table.principal th').click(function(){
        let template = require('./../Templates/order.html')
        $(this).children().first().html(template)
    })
}


module.exports = utils


