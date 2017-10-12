const yo = require('yo-yo')
const $ =  require('jquery')

const utils = {
    loadDataCatalogs,
    headers,
    body,

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



module.exports = utils


