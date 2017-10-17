const $ = require('jquery')
module.exports = class Tables{

        getTable(ruta){
            let data = new Promise (resolve =>{
                $.get({
                    url:'/table/' + ruta,
                    success:function(json){
                        resolve(JSON.parse(json))
                    }
                })
            })
            return data
        }
}