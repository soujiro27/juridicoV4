const $ = require('jquery')
const urls = require('./../../rutasAbsolutas')

const utils = {
    hideButtons,
    cancelar,
    getDatosDoctosTexto,
    getSubTipoDoc
    
}

const tiposDocumentos = [{
    idTipoDocto:'NOTA',
    nombre:'NOTA INFORMATIVA'},
{
    idTipoDocto:'CIRCULAR',
    nombre:'CIRCULAR'
},
{
    idTipoDocto:'OFICIO',
    nombre:'OFICIO'
}]

const subTiposDocumentos=[{
    idSubTipoDocumento:'10',
    idTipoDocto:'CIRCULAR',
    nombre:'CONOCIMIENTO'
},{
    idSubTipoDocumento:'17',
    idTipoDocto:'OFICIO',
    nombre:'IRAC'
},{
    idSubTipoDocumento:'18',
    idTipoDocto:'NOTA',
    nombre:'CONFRONTA'
}
]


function hideButtons(){
    $('div#headerText').text('Añadir Nuevo Registro')
    $('a#addRegister').hide()
}

function cancelar(ruta){
   $('button#cancelar').click(function(e){
       e.preventDefault()
       location.href = urls.inicio + ruta
   })
}

function getDatosDoctosTexto(template){
    let documentos = tiposDocumentos // cambiar por peticion al api
    let opt='<option value="">Seleccione un Documento</option>'
    for(let x in documentos){
        opt+=`<option value="${documentos[x].idTipoDocto}">${documentos[x].nombre}</option>`
    }
    let tmplt=template.replace(':optionDocumento',opt)
    return tmplt
}

function getSubTipoDoc(){
    $('select#idDocumento').change(function(){
        let val=$(this).val()
        let sub = subTiposDocumentos //cambiar por api
        let opt='<option value="">Seleccione un Sub Documento</option>'
        for(let x in sub){
            if(val==sub[x].idTipoDocto){
                opt+=`<option value="${sub[x].idSubTipoDocumento}">${sub[x].nombre}</option>`
            }
        }
        $('select#subDocumento').html(opt)
    })
}






module.exports = utils