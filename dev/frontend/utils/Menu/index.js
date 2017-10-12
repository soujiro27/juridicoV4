const $ = require('jquery')

const datos={
    idUsuario:'2294',
    idCuentaActual:'CTA-2016',
    userName:'ROBERTO ANTONIO PAREDES',
    cuenta:'CUENTA PUBLICA 2016',
    ruta:'Caracteres'
}

$('a#CuentaPublica').append('<span>'+datos.cuenta+'</span>')
$('h2#tipo').text(datos.ruta)
$('b#usuario').text(datos.userName)



var nUsr=datos.idUsuario
var nCampana=datos.idCuentaActual


if(nUsr!="" && nCampana!=""){    
  var sPanel ="";
  var nRenglon=0;
  var nTotal=0;
  var dato;
  
  $.ajax({
    type: 'GET',
    url: '/lstModulosByUsuarioCampana/' + nCampana,
    success: function(response) {
      var jsonData = JSON.parse(response);
           
      nTotal =jsonData.datos.length;
   
      for (var i = 0; i < nTotal; i++) {
        dato = jsonData.datos[i];
        //modulos.push(dato.tipo, dato.panel, dato.modulo);
        
        sPanel = dato.panel;
        document.getElementById(sPanel).style.display="block";
        
        sPanel = sPanel + "-UL";

        var ul = document.getElementById(sPanel);
          var li = document.createElement("li");            
            var ancla = document.createElement('a');              
            ancla.setAttribute('href', dato.liga);
              //PARA CARGAR UN ICONO
              var icono = document.createElement("li");
              icono.setAttribute("class", dato.icono);              
              ancla.appendChild(icono);               
              
              var texto = document.createTextNode( " " + dato.nombre);
              ancla.appendChild(texto);               
            nRenglon = nRenglon+1;              
          li.appendChild(ancla);
        ul.appendChild(li); 
      }
    },
    error: function(xhr, textStatus, error){
      alert('ERROR: En function cargarMenu(nCampana)  ->  statusText: ' + xhr.statusText + ' TextStatus: ' + textStatus + ' Error:' + error );
    }     
  });  
   }else{
  if(nCampana=="")alert("Debe establecer una CUENTA PÚBLICA como PREDETERMINADA. Por favor consulte con su administrador del sistema.");
}





$(".has_sub > a").click(function(e){
  e.preventDefault();
  var menu_li = $(this).parent("li");
  var menu_ul = $(this).next("ul");

  if(menu_li.hasClass("open")){
    menu_ul.slideUp(350);
    menu_li.removeClass("open")
  }
  else{
    $("#nav > li > ul").slideUp(350);
    $("#nav > li").removeClass("open");
    menu_ul.slideDown(350);
    menu_li.addClass("open");
  }
});


$('div.buttonHide').click(function(){
  let cont=0
  if(cont===0){
    $('ul#nav').animate({
      left:'-200px'
    })
    $(this).animate({
      left:'17px'
    })
  }
   /*$('ul#nav').animate({
     left:'-200px'
   })
   $(this).animate({
     left:'17px'
   })*/
   
})