module.exports = class FormApi{
    getDatos(tipo){
        let datos = new Promise(resolve =>{
            $.get({
                url:`/datos/catalogos/${tipo}`,
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
                url:`/datos/auditoria`,
                data:clave,
                success: function(json){
                    resolve(JSON.parse(json))
                }
            })
        })
        return datos
    }
}