const yo = require('yo-yo')
const $ =  require('jquery')
const page =  require('page')

const urls =  require('./../rutasAbsolutas')

const utils = {
    loadDataCatalogs,
    headers,
    body,
    clickTr

}

function loadDataCatalogs(ruta){
    let data=[{
        idCaracter:'1023',
        siglas:'U',
        nombre:'URGENTE',
        estatus:'ACTIVO'
        },
        {
            idCaracter:'1024',
            siglas:'N',
            nombre:'NORMAL',
            estatus:'ACTIVO'
            }
    ]
    return data
}

function headers(datos){
    let th=''
    $.each(datos[0],function(index,el){
        th+=`<th id="${index}" class="${index}" data-order="${index}">${index}</th>`
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

module.exports = utils


