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
    Acciones:require('./../../Templates/Acciones.html'),
    Volantes : require('./../../Templates/Volantes.html'),
    VolantesDiversos : require('./../../Templates/volantesDiversos.html')
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


 page('/SIA/juridico/DoctosTextos/update/:campo/:id',function(ctx,next){
    let campo = ctx.params.campo
    let id = ctx.params.id
    utils.getSingleData(campo,id)
    .then(json =>{
        modal.updateDoctosTextos(templates.DoctosTextos,json)

    })
 })


 page('/SIA/juridico/Acciones/update/:campo/:id',function(ctx,next){
    let campo = ctx.params.campo
    let id = ctx.params.id
    utils.getSingleData(campo,id)
    .then(json =>{
        modal.updateAcciones(templates.Acciones,json)

    })
 })

 page('/SIA/juridico/Volantes/update/:campo/:id',function(ctx,next){
    let campo = ctx.params.campo
    let id = ctx.params.id
    utils.getSingleData(campo,id)
    .then(json =>{
        modal.updateVolantes(templates.Volantes,json)

    })
 })

 
 page('/SIA/juridico/VolantesDiversos/update/:campo/:id',function(ctx,next){
    let campo = ctx.params.campo
    let id = ctx.params.id
    utils.getSingleDataRuta('Volantes',campo,id)
    .then(json =>{
        modal.updateVolantesDiversos(templates.VolantesDiversos,json)

    })
 })

 page('/SIA/juridico/DocumentosGral/update/:campo/:id',function(ctx,next){
    let campo = ctx.params.campo
    let id = ctx.params.id
    utils.getSingleDataRuta('Volantes',campo,id)
    .then(json =>{
        window.open(`/SIA/juridico/files/${json[0].anexoDoc}`)
        

    })
 })