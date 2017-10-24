window.CKEDITOR_BASEPATH = 'node_modules/ckeditor/'
/*---------node_modules---------*/
const page = require ('page')
const $ = require('jquery')
require('ckeditor')
/*--------archivos externos---------*/
const utils = require ('./utils.js')

/*--------plantillas---------*/
const templates={
    Caracteres:require('./../../Templates/Caracteres.html'),
    DoctosTextos:require('./../../Templates/DoctosTextos.html'),
    SubTiposDocumentos:require('./../../Templates/SubTiposDocumentos.html'),
    Acciones:require('./../../Templates/Acciones.html')
}

/*--------Modals---------*/
const modals = require('./../../Modals/index')
/*--------instanciar clases---------*/

const modal = new modals()


/*----------page--------------*/

page('/SIA/juridico/Caracteres/update/:campo/:id',function(ctx,next){
    let campo = ctx.params.campo
    let id = ctx.params.id
    utils.getSingleData(campo,id)
    .then(json =>{
        modal.updateCaracteres(templates.Caracteres,json)

    })
 })