window.CKEDITOR_BASEPATH = 'node_modules/ckeditor/'
/*---------node_modules---------*/
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
    Acciones:require('./../../Templates/Acciones.html')
}

/*--------instanciar cclearlases---------*/




page('/juridico/Caracteres/add',function(ctx,next){
    $('div#main-content').html(templates.Caracteres)
    addUtils.hideButtons()
    addUtils.cancelar('Caracteres')
})


page('/juridico/DoctosTextos/add',function(ctx,next){
    let template = addUtils.getDatosDoctosTexto(templates.DoctosTextos)
    $('div#main-content').html(template)
    addUtils.getSubTipoDoc()
    CKEDITOR.disableAutoInline=true
    CKEDITOR.replace('texto')
    addUtils.hideButtons()
    addUtils.cancelar('DoctosTextos')
})

page('/juridico/SubTiposDocumentos/add',function(ctx,next){
    let template = addUtils.getDatosDoctosTexto(templates.SubTiposDocumentos)
    $('div#main-content').html(template)
    addUtils.hideButtons()
    addUtils.cancelar('SubTiposDocumentos')
    $('#test').prop('indeterminate', true)
})


page('/juridico/Acciones/add',function(ctx,next){
    $('div#main-content').html(templates.Acciones)
    addUtils.hideButtons()
    addUtils.cancelar('Caracteres')
})
