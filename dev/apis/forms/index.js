module.exports = class FormApi{
    getDatos(tipo){
        let datos = new Promise(resolve =>{
            $.get({
                url:`datos/catalogos/${tipo}`,
                success: function(json){
                    resolve(JSON.parse(json))
                }
            })
        })
        return datos
    }

    getAuditoria(clave){
        let datos = new Promise(resolve =>{
            $.get({
                url:`datos/auditoria`,
                data:clave,
                success: function(json){
                    resolve(JSON.parse(json))
                }
            })
        })
        return datos
    }

    getTurnadoAuditoria(clave){
        let datos = new Promise(resolve =>{
            $.get({
                url:`turnado/auditoria`,
                data:clave,
                success: function(json){
                    resolve(JSON.parse(json))
                }
            })
        })
        return datos
    }

    getDocumentosAuditoria(documento){
        let datos = new Promise(resolve =>{
            $.get({
                url:`documentos/auditoria`,
                data:documento,
                success: function(json){
                    resolve(JSON.parse(json))
                }
            })
        })
        return datos
    }

    getObservaciones(volante){
        let datos = new Promise(resolve =>{
            $.get({
                url:`observaciones/irac`,
                data:volante,
                success: function(json){
                    resolve(JSON.parse(json))
                }
            })
        })
        return datos
    }


    getObservacionesById(id){
        let datos = new Promise(resolve =>{
            $.get({
                url:`observaciones/id`,
                data:id,
                success: function(json){
                    resolve(JSON.parse(json))
                }
            })
        })
        return datos
    }

    getIracById(id){
        let datos = new Promise(resolve =>{
            $.get({
                url:`irac/id`,
                data:id,
                success: function(json){
                    resolve(JSON.parse(json))
                }
            })
        })
        return datos
    }

    getDocumentosSiglas(id){
        let datos = new Promise(resolve =>{
            $.get({
                url:`documentosSiglas/id`,
                data:id,
                success: function(json){
                    resolve(JSON.parse(json))
                }
            })
        })
        return datos
    }

    getPersonalFirma(id){
        let datos = new Promise(resolve =>{
            $.get({
                url:`irac/firmas`,
                data:id,
                success: function(json){
                    resolve(JSON.parse(json))
                }
            })
        })
        return datos
    }





    insertCatalogo(ruta,datos){
        let insert = new Promise ( resolve => {
            $.post({
                url: `Insert`,
                data:datos,
                success:function(json){
                    resolve(JSON.parse(json))
                }
            })
        })
        return insert
    }
}