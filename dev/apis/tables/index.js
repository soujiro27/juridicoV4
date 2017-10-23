const $ = require('jquery')
module.exports = class Tables{

        getTable(ruta){
            let data = new Promise (resolve =>{
                $.get({
                    url:'table/' + ruta,
                    success:function(json){
                        resolve(JSON.parse(json))
                    }
                })
            })
            return data
        }

        getTableOrder(ruta,datos){
            let data = new Promise (resolve =>{
                $.get({
                    url:'table/Order/' + ruta,
                    data:datos,
                    success:function(json){
                        resolve(JSON.parse(json))
                    }
                })
            })
            return data
        }
}