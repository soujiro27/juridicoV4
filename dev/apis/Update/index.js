module.exports = class UpdateApi{
    update(datos){
        let promise = new Promise (resolve =>{
            $.post({
                url: 'Update',
                data: datos,
                success:function(json){
                    resolve(JSON.parse(json))
                }
            })
        })   
        return promise
    }

    getData(campo,id){
        let promesa = new Promise( resolve  => {
            $.get({
                url : 'datos',
                data:{
                    campo:campo,
                    id: id
                },
                success : function (json){
                    resolve(JSON.parse(json))
                }
            })
        })
        return promesa   
    }
}