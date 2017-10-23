module.exports = class Main{
    datosInicio(){
        let datos = new Promise(resolve =>{
            $.get({
                url:'Get/Sessions',
                success: function(json){
                    resolve(JSON.parse(json))
                }
            })
        })
        return datos
    }
}