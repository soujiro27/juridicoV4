window.CKEDITOR_BASEPATH = 'node_modules/ckeditor/'
/*---------node_modules---------*/
const co = require('co')
const Promise = require('bluebird')
const page = require ('page')
const $ = require('jquery')
require('ckeditor')
const apis = require('./../../../../apis/forms/index')

const api = new apis()

/*--------archivos externos---------*/
const addUtils = require('./utils')

/*--------plantillas---------*/
const templates={
    Caracteres:require('./../../Templates/Caracteres.html'),
    DoctosTextos:require('./../../Templates/DoctosTextos.html'),
    SubTiposDocumentos:require('./../../Templates/SubTiposDocumentos.html'),
    Acciones:require('./../../Templates/Acciones.html'),
    Volantes:require('./../../Templates/Volantes.html'),
    VolantesDiversos:require('./../../Templates/volantesDiversos.html'),
    documentos : require('./../../Templates/documentos.html'),
    confronta : require('./../../Templates/confronta.html'),
    
}

/*--------instanciar cclearlases---------*/




page('/SIA/juridico/Caracteres/add',function(ctx,next){
    $('div#main-content').html(templates.Caracteres)
    addUtils.hideButtons()
    addUtils.cancelar('Caracteres')
    addUtils.insert('Caracteres')
})


page('/SIA/juridico/DoctosTextos/add',function(ctx,next){
    addUtils.getDatosDoctosTexto(templates.DoctosTextos)
    .then(json=>{
        $('div#main-content').html(json)
        addUtils.getSubTipoDoc()
        CKEDITOR.disableAutoInline=true
        CKEDITOR.replace('textoForm')
        addUtils.insert('DoctosTextos')
        addUtils.hideButtons()
        addUtils.cancelar('DoctosTextos')
    })
})

page('/SIA/juridico/SubTiposDocumentos/add',function(ctx,next){
    addUtils.getDatosDoctosTexto(templates.SubTiposDocumentos)
    .then(json => {
        $('div#main-content').html(json)
        addUtils.insert('SubTiposDocumentos')
        addUtils.hideButtons()
        addUtils.cancelar('SubTiposDocumentos')
        $('#test').prop('indeterminate', true)
    })
   
})


page('/SIA/juridico/Acciones/add',function(ctx,next){
    $('div#main-content').html(templates.Acciones)
    addUtils.insert('Acciones')
    addUtils.hideButtons()
    addUtils.cancelar('Acciones')
})



page('/SIA/juridico/Volantes/add',function(ctx,next){
    addUtils.getDatosVolantes(templates.Volantes)
    .then(json=>{
        $('div#main-content').html(json)
        $('input.fechaInput').datepicker({ dateFormat: "yy-mm-dd" });
        addUtils.getSubTipoDocAuditoria()
        addUtils.notaInformativa()
        addUtils.modalAuditoria();
        addUtils.insert('Volantes')
        addUtils.hideButtons()
        addUtils.cancelar('Volantes')
    })
})


page('/SIA/juridico/VolantesDiversos/add',function(ctx,next){
    addUtils.getDatosVolantes(templates.VolantesDiversos)
    .then(json=>{
        $('div#main-content').html(json)
        $('input.fechaInput').datepicker({ dateFormat: "yy-mm-dd" });
        addUtils.getSubTipoDocDiversos()
        addUtils.notaInformativa()
        addUtils.insert('VolantesDiversos')
        addUtils.hideButtons()
        addUtils.cancelar('VolantesDiversos')
    })
})

page('/SIA/juridico/DocumentosGral/add',function(ctx,next){
    $('div#main-content').html(templates.documentos)
    addUtils.nameFile()
    addUtils.searchDocumento()
    addUtils.uploadFileAll('DocumentosGral')
    addUtils.hideButtons()
    addUtils.cancelar('DocumentosGral')
})


page('/SIA/juridico/Documentos/add',function(ctx,next){
    $('div#main-content').html(templates.documentos)
    addUtils.nameFile()
    addUtils.searchDocumento()
    addUtils.uploadFileAll('DocumentosGral')
    addUtils.hideButtons()
    addUtils.cancelar('Documentos')
})

page('/SIA/juridico/Irac/add/idVolante/:id',function(ctx,next){
    let index = co(function*(){
        let template = yield addUtils.loadObservaciones(ctx.params.id)
        $('div#main-content').html(template)
        addUtils.hideButtons()
        addUtils.updateObservaciones()
        addUtils.newObservacion(ctx.params.id)
        addUtils.cedulaIrac(ctx.params.id)
        addUtils.cancelar('Irac')

    })
})

page('/SIA/juridico/confrontasJuridico/add/idVolante/:id',function(ctx,next){
    let template = templates.confronta
    $('div#main-content').html(template)
    addUtils.manejoConfronta(ctx.params.id)
    addUtils.hideButtons()
    addUtils.cancelar('confrontasJuridico')
})

page('/SIA/juridico/Ifa/add/idVolante/:id',function(ctx,next){
    let index = co(function*(){
        let template = yield addUtils.loadObservaciones(ctx.params.id)
        $('div#main-content').html(template)
        addUtils.hideButtons()
        addUtils.updateObservaciones()
        addUtils.newObservacion(ctx.params.id)
        addUtils.cedulaIfa(ctx.params.id)
        addUtils.cancelar('Ifa')

    })
})