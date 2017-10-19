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
    loadOrder,
    hideAdd,
    redirect
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
        //th+=`<th id="${index}" class="${index}" data-order="${index}">${index}</th>`
        th+=`
            <th id="${index}" class="${index}" data-order="${index}" >
                <div class="thText">
                    <span>${index}</span>
                </div>
            </th>`
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
        utils.redirect(ruta,campo,id)
       
    })
}

function loadOrder(ruta){
  for(let x in modulosOrder){
      if(ruta==modulosOrder[x]){
        clickOrder(ruta)
      }
  }
}

function clickOrder(ruta){

    let div = $('div.thText')
    div.append('<i class="fa fa-caret-up" aria-hidden="true" data-order="ASC"></i>')
    div.append('<i class="fa fa-caret-down" aria-hidden="true" data-order="DESC"></i>')
    $('div.thText i').click(function(){
        let campo = $(this).parent().children().first().text()
        let tipo = $(this).data('order')
        api.getTableOrder(ruta,{campo:campo,tipo:tipo})
        .then(json=>{
            let template = require('./../Templates/table.html')
            let headers = utils.headers(json)
            let body = utils.body(json)
            template = template.replace(':headers',headers)
            template = template.replace(':body',body)
            $('div#main-content').html(template)
            utils.loadOrder(ruta)
        })
        
    })
    
}


function hideAdd(ruta){
    if(ruta == 'Irac' || ruta == 'Ifa' || ruta == 'confrontasJuridico'){
        $('a#addRegister').hide();
    }
}

function redirect(ruta,campo,id)
{
    if(ruta == 'Irac' || ruta == 'Ifa' || ruta == 'confrontasJuridico'){
        page.redirect(urls.inicio + ruta + '/add/' + campo + '/' + id)
    }else{
        page.redirect(urls.inicio + ruta + '/update/' + campo + '/' + id)
    }
}


module.exports = utils


