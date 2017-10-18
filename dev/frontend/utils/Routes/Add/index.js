window.CKEDITOR_BASEPATH = 'node_modules/ckeditor/'
/*---------node_modules---------*/
const co = require('co')
const Promise = require('bluebird')
const page = require ('page')
const $ = require('jquery')
require('ckeditor')

/*--------archivos externos---------*/
const addUtils = require('./utils')

/*--------plantillas---------*/
const templates={
    Caracteres:require('./../../Templates/Caracteres.html'),
    DoctosTextos:require('./../../Templates/DoctosTextos.html'),
    SubTiposDocumentos:require('./../../Templates/SubTiposDocumentos.html'),
    Acciones:require('./../../Templates/Acciones.html'),
    Volantes:require('./../../Templates/Volantes.html')
}

/*--------instanciar cclearlases---------*/




page('/juridico/Caracteres/add',function(ctx,next){
    $('div#main-content').html(templates.Caracteres)
    addUtils.hideButtons()
    addUtils.cancelar('Caracteres')
})


page('/juridico/DoctosTextos/add',function(ctx,next){
    addUtils.getDatosDoctosTexto(templates.DoctosTextos)
    .then(json=>{
        $('div#main-content').html(json)
        addUtils.getSubTipoDoc()
        CKEDITOR.disableAutoInline=true
        CKEDITOR.replace('texto')
        addUtils.hideButtons()
        addUtils.cancelar('DoctosTextos')
    })
})

page('/juridico/SubTiposDocumentos/add',function(ctx,next){
    addUtils.getDatosDoctosTexto(templates.SubTiposDocumentos)
    .then(json => {
        $('div#main-content').html(json)
        addUtils.hideButtons()
        addUtils.cancelar('SubTiposDocumentos')
        $('#test').prop('indeterminate', true)
    })
   
})


page('/juridico/Acciones/add',function(ctx,next){
    $('div#main-content').html(templates.Acciones)
    addUtils.hideButtons()
    addUtils.cancelar('Caracteres')
})



page('/juridico/Volantes/add',function(ctx,next){
    addUtils.getDatosVolantes(templates.Volantes)
    .then(json=>{
        $('div#main-content').html(json)
        addUtils.getSubTipoDocAuditoria()
        addUtils.notaInformativa()
        addUtils.hideButtons()
        addUtils.cancelar('Volantes')
    })
})
