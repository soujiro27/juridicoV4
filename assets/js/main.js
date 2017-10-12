(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/*---------node_modules ---------*/
var $ = require('jquery');
var page = require('page');
/*---------archivos externos ---------------*/
var utils = require('./utils/Tables/utils');
var tables = require('./utils/Tables/index');
var routeAdd = require('./utils/Routes/Add/index');
/*--------------inicio de clases -----------------*/
var table = new tables();

var datos = {
    idUsuario: '2294',
    idCuentaActual: 'CTA-2016',
    userName: 'ROBERTO ANTONIO PAREDES',
    cuenta: 'CUENTA PUBLICA 2016',
    ruta: 'Acciones'
};

var datosTabla = utils.loadDataCatalogs(datos.ruta);
table.drawMainTable(table.createTemplate(datosTabla));

page();

},{"./utils/Routes/Add/index":2,"./utils/Tables/index":4,"./utils/Tables/utils":5,"jquery":20,"page":24}],2:[function(require,module,exports){
'use strict';

window.CKEDITOR_BASEPATH = 'node_modules/ckeditor/';
/*---------node_modules---------*/
var page = require('page');
var $ = require('jquery');
require('ckeditor');
/*--------archivos externos---------*/
var addUtils = require('./utils');

/*--------plantillas---------*/
var templates = {
    Caracteres: require('./../../Templates/Caracteres.html'),
    DoctosTextos: require('./../../Templates/DoctosTextos.html'),
    SubTiposDocumentos: require('./../../Templates/SubTiposDocumentos.html'),
    Acciones: require('./../../Templates/Acciones.html')

    /*--------instanciar cclearlases---------*/

};page('/juridico/Caracteres/add', function (ctx, next) {
    $('div#main-content').html(templates.Caracteres);
    addUtils.hideButtons();
    addUtils.cancelar('Caracteres');
});

page('/juridico/DoctosTextos/add', function (ctx, next) {
    var template = addUtils.getDatosDoctosTexto(templates.DoctosTextos);
    $('div#main-content').html(template);
    addUtils.getSubTipoDoc();
    CKEDITOR.disableAutoInline = true;
    CKEDITOR.replace('texto');
    addUtils.hideButtons();
    addUtils.cancelar('DoctosTextos');
});

page('/juridico/SubTiposDocumentos/add', function (ctx, next) {
    var template = addUtils.getDatosDoctosTexto(templates.SubTiposDocumentos);
    $('div#main-content').html(template);
    addUtils.hideButtons();
    addUtils.cancelar('SubTiposDocumentos');
    $('#test').prop('indeterminate', true);
});

page('/juridico/Acciones/add', function (ctx, next) {
    $('div#main-content').html(templates.Acciones);
    addUtils.hideButtons();
    addUtils.cancelar('Caracteres');
});

},{"./../../Templates/Acciones.html":6,"./../../Templates/Caracteres.html":7,"./../../Templates/DoctosTextos.html":8,"./../../Templates/SubTiposDocumentos.html":9,"./utils":3,"ckeditor":14,"jquery":20,"page":24}],3:[function(require,module,exports){
'use strict';

var $ = require('jquery');
var urls = require('./../../rutasAbsolutas');

var utils = {
    hideButtons: hideButtons,
    cancelar: cancelar,
    getDatosDoctosTexto: getDatosDoctosTexto,
    getSubTipoDoc: getSubTipoDoc

};

var tiposDocumentos = [{
    idTipoDocto: 'NOTA',
    nombre: 'NOTA INFORMATIVA' }, {
    idTipoDocto: 'CIRCULAR',
    nombre: 'CIRCULAR'
}, {
    idTipoDocto: 'OFICIO',
    nombre: 'OFICIO'
}];

var subTiposDocumentos = [{
    idSubTipoDocumento: '10',
    idTipoDocto: 'CIRCULAR',
    nombre: 'CONOCIMIENTO'
}, {
    idSubTipoDocumento: '17',
    idTipoDocto: 'OFICIO',
    nombre: 'IRAC'
}, {
    idSubTipoDocumento: '18',
    idTipoDocto: 'NOTA',
    nombre: 'CONFRONTA'
}];

function hideButtons() {
    $('div#headerText').text('Añadir Nuevo Registro');
    $('a#addRegister').hide();
}

function cancelar(ruta) {
    $('button#cancelar').click(function (e) {
        e.preventDefault();
        location.href = urls.inicio + ruta;
    });
}

function getDatosDoctosTexto(template) {
    var documentos = tiposDocumentos; // cambiar por peticion al api
    var opt = '<option value="">Seleccione un Documento</option>';
    for (var x in documentos) {
        opt += '<option value="' + documentos[x].idTipoDocto + '">' + documentos[x].nombre + '</option>';
    }
    var tmplt = template.replace(':optionDocumento', opt);
    return tmplt;
}

function getSubTipoDoc() {
    $('select#idDocumento').change(function () {
        var val = $(this).val();
        var sub = subTiposDocumentos; //cambiar por api
        var opt = '<option value="">Seleccione un Sub Documento</option>';
        for (var x in sub) {
            if (val == sub[x].idTipoDocto) {
                opt += '<option value="' + sub[x].idSubTipoDocumento + '">' + sub[x].nombre + '</option>';
            }
        }
        $('select#subDocumento').html(opt);
    });
}

module.exports = utils;

},{"./../../rutasAbsolutas":11,"jquery":20}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = require('./utils');
var $ = require('jquery');

var Tables = function () {
    function Tables() {
        _classCallCheck(this, Tables);
    }

    _createClass(Tables, [{
        key: 'createTemplate',
        value: function createTemplate(datos) {
            var template = require('./../Templates/table.html');
            var headers = utils.headers(datos);
            var body = utils.body(datos);
            template = template.replace(':headers', headers);
            template = template.replace(':body', body);
            return template;
        }
    }, {
        key: 'drawMainTable',
        value: function drawMainTable(template) {
            $('div#main-content').html(template);
        }
    }]);

    return Tables;
}();

module.exports = Tables;

},{"./../Templates/table.html":10,"./utils":5,"jquery":20}],5:[function(require,module,exports){
'use strict';

var yo = require('yo-yo');
var $ = require('jquery');

var utils = {
    loadDataCatalogs: loadDataCatalogs,
    headers: headers,
    body: body

};

function loadDataCatalogs(ruta) {
    var data = [{
        idCaracter: '1023',
        siglas: 'U',
        nombre: 'URGENTE',
        estatus: 'ACTIVO'
    }, {
        idCaracter: '1024',
        siglas: 'N',
        nombre: 'NORMAL',
        estatus: 'ACTIVO'
    }];
    return data;
}

function headers(datos) {
    var th = '';
    $.each(datos[0], function (index, el) {
        th += '<th id="' + index + '" class="' + index + '" data-order="' + index + '">' + index + '</th>';
    });
    return th;
}

function body(datos) {
    var tr = '';
    for (var x in datos) {
        tr += '<tr>';
        $.each(datos[x], function (index, el) {
            tr += '<td id="' + index + '"  data-valor="' + el + '"> ' + el + ' </td>';
        });
        tr += '</tr>';
    }
    return tr;
}

module.exports = utils;

},{"jquery":20,"yo-yo":27}],6:[function(require,module,exports){
module.exports = '\n<form id="Acciones" method="POST">\n  <div class="form-group nombre">\n    <label class="form-control-label" for="nombre">Nombre </label>\n    <input class="form-control" id="nombre" type="text" placeholder="Nombre" required="" pattern="[A-Za-z].{1,10}" name="nombre" title="Nombre Incorrecto o Caracteres maximos"/>\n  </div>\n  <div class="form-group send">\n    <input class="btn btn-primary btn-sm" type="submit" value="Guardar"/>\n    <button class="btn btn-danger btn-sm" id="cancelar">Cancelar</button>\n  </div>\n</form>';
},{}],7:[function(require,module,exports){
module.exports = '\n<form id="Caracteres" method="POST">\n  <div class="form-group siglas">\n    <label class="form-control-label" for="siglas">Siglas</label>\n    <input class="form-control" id="siglas" type="text" placeholder="siglas" required="" pattern="[A-Za-z]" name="siglas" title="Inserta una Sigla"/>\n  </div>\n  <div class="form-group nombre">\n    <label class="form-control-label" for="nombre">Nombre</label>\n    <input class="form-control" id="nombre" type="text" placeholder="Nombre" required="" pattern="[A-Za-z]" name="nombre" title="Nombre Incorrecto o Caracteres maximos"/>\n  </div>\n  <div class="form-group send">\n    <input class="btn btn-info" type="submit" value="Guardar"/>\n    <button class="btn btn-danger btn-sm" id="cancelar">Cancelar</button>\n  </div>\n</form>';
},{}],8:[function(require,module,exports){
module.exports = '\n<form id="DoctosTextos" method="POST">\n  <div class="form-group idDocumento">\n    <label class="form-control-label" for="idDocumento">Tipo de Documento</label>\n    <input id="tipo" type="hidden" name="tipo" value="JURIDICO"/>\n    <input id="nombre" type="hidden" name="nombre" value="TEXTO-JURIDICO"/>\n    <select class="form-control" id="idDocumento" name="idTipoDocto" required="required">:optionDocumento</select>\n  </div>\n  <div class="form-group subDocumento">\n    <label class="form-control-label" for="subDocumento">Tipo de SubDocumento</label>\n    <select class="form-control" id="subDocumento" name="idSubTipoDocumento" required="required"></select>\n  </div>\n  <div class="form-group texto">\n    <label class="form-control-label" for="texto">Texto</label>\n    <textarea class="form-control" id="texto" rows="3" name="texto" required="" placeholder="texto"></textarea>\n  </div>\n  <div class="form-group send">\n    <input class="btn btn-primary btn-sm" type="submit" value="Guardar"/>\n    <button class="btn btn-danger btn-sm" id="cancelar">Cancelar</button>\n  </div>\n</form>';
},{}],9:[function(require,module,exports){
module.exports = '\n<form id="SubTiposDocumentos" method="POST">\n  <div class="form-group idDocumento">\n    <label for="idDocumento" clas="form-control-label">Tipo de Documento</label>\n    <select class="form-control" id="idDocumento" name="idTipoDocto" required="required">:optionDocumento</select>\n  </div>\n  <div class="form-group nombre">\n    <label for="nombre" clas="form-control-label">Nombre</label>\n    <input class="form-control" id="nombre" type="text" placeholder="Nombre" required="" pattern="[A-Za-z].{1,49}" name="nombre" title="Nombre Incorrecto o Caracteres maximos"/>\n  </div>\n  <div class="form-group auditoria">\n    <label for="auditoria" clas="form-control-label">Datos Auditoria</label>\n    <select class="form-control" id="auditoria" name="auditoria" required="required" aria-describedby="passwordHelpBlock">\n      <option value=""> Seleccione una Opción </option>\n      <option value="SI">SI</option>\n      <option value="NO">NO</option>\n    </select><small class="form-text text-muted" id="passwordHelpBlock">El Documento Requiere de Datos de una Auditoria</small>\n  </div>\n  <div class="form-group send">\n    <input class="btn btn-primary btn-sm" type="submit" value="Guardar"/>\n    <button class="btn btn-danger btn-sm" id="cancelar">Cancelar</button>\n  </div>\n</form>';
},{}],10:[function(require,module,exports){
module.exports = '\n<table class="table table-striped table-bordered table-hover principal" id="table-main">\n  <thead>:headers</thead>\n  <tbody>:body</tbody>\n</table>';
},{}],11:[function(require,module,exports){
'use strict';

var rutas = {
    inicio: '/juridico/'
};

module.exports = rutas;

},{}],12:[function(require,module,exports){
var document = require('global/document')
var hyperx = require('hyperx')
var onload = require('on-load')

var SVGNS = 'http://www.w3.org/2000/svg'
var XLINKNS = 'http://www.w3.org/1999/xlink'

var BOOL_PROPS = {
  autofocus: 1,
  checked: 1,
  defaultchecked: 1,
  disabled: 1,
  formnovalidate: 1,
  indeterminate: 1,
  readonly: 1,
  required: 1,
  selected: 1,
  willvalidate: 1
}
var COMMENT_TAG = '!--'
var SVG_TAGS = [
  'svg',
  'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
  'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile',
  'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix',
  'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting',
  'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB',
  'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode',
  'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting',
  'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face',
  'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri',
  'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line',
  'linearGradient', 'marker', 'mask', 'metadata', 'missing-glyph', 'mpath',
  'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect',
  'set', 'stop', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref',
  'tspan', 'use', 'view', 'vkern'
]

function belCreateElement (tag, props, children) {
  var el

  // If an svg tag, it needs a namespace
  if (SVG_TAGS.indexOf(tag) !== -1) {
    props.namespace = SVGNS
  }

  // If we are using a namespace
  var ns = false
  if (props.namespace) {
    ns = props.namespace
    delete props.namespace
  }

  // Create the element
  if (ns) {
    el = document.createElementNS(ns, tag)
  } else if (tag === COMMENT_TAG) {
    return document.createComment(props.comment)
  } else {
    el = document.createElement(tag)
  }

  // If adding onload events
  if (props.onload || props.onunload) {
    var load = props.onload || function () {}
    var unload = props.onunload || function () {}
    onload(el, function belOnload () {
      load(el)
    }, function belOnunload () {
      unload(el)
    },
    // We have to use non-standard `caller` to find who invokes `belCreateElement`
    belCreateElement.caller.caller.caller)
    delete props.onload
    delete props.onunload
  }

  // Create the properties
  for (var p in props) {
    if (props.hasOwnProperty(p)) {
      var key = p.toLowerCase()
      var val = props[p]
      // Normalize className
      if (key === 'classname') {
        key = 'class'
        p = 'class'
      }
      // The for attribute gets transformed to htmlFor, but we just set as for
      if (p === 'htmlFor') {
        p = 'for'
      }
      // If a property is boolean, set itself to the key
      if (BOOL_PROPS[key]) {
        if (val === 'true') val = key
        else if (val === 'false') continue
      }
      // If a property prefers being set directly vs setAttribute
      if (key.slice(0, 2) === 'on') {
        el[p] = val
      } else {
        if (ns) {
          if (p === 'xlink:href') {
            el.setAttributeNS(XLINKNS, p, val)
          } else if (/^xmlns($|:)/i.test(p)) {
            // skip xmlns definitions
          } else {
            el.setAttributeNS(null, p, val)
          }
        } else {
          el.setAttribute(p, val)
        }
      }
    }
  }

  function appendChild (childs) {
    if (!Array.isArray(childs)) return
    for (var i = 0; i < childs.length; i++) {
      var node = childs[i]
      if (Array.isArray(node)) {
        appendChild(node)
        continue
      }

      if (typeof node === 'number' ||
        typeof node === 'boolean' ||
        typeof node === 'function' ||
        node instanceof Date ||
        node instanceof RegExp) {
        node = node.toString()
      }

      if (typeof node === 'string') {
        if (el.lastChild && el.lastChild.nodeName === '#text') {
          el.lastChild.nodeValue += node
          continue
        }
        node = document.createTextNode(node)
      }

      if (node && node.nodeType) {
        el.appendChild(node)
      }
    }
  }
  appendChild(children)

  return el
}

module.exports = hyperx(belCreateElement, {comments: true})
module.exports.default = module.exports
module.exports.createElement = belCreateElement

},{"global/document":15,"hyperx":18,"on-load":23}],13:[function(require,module,exports){

},{}],14:[function(require,module,exports){
/*
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md or http://ckeditor.com/license
*/
(function(){function ka(a,f){CKEDITOR.tools.extend(this,f,{editor:a,id:"cke-"+CKEDITOR.tools.getUniqueId(),area:a._.notificationArea});f.type||(this.type="info");this.element=this._createElement();a.plugins.clipboard&&CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(this.element)}function la(a){var f=this;this.editor=a;this.notifications=[];this.element=this._createElement();this._uiBuffer=CKEDITOR.tools.eventsBuffer(10,this._layout,this);this._changeBuffer=CKEDITOR.tools.eventsBuffer(500,this._layout,
this);a.on("destroy",function(){f._removeListeners();f.element.remove()})}window.CKEDITOR&&window.CKEDITOR.dom||(window.CKEDITOR||(window.CKEDITOR=function(){var a=/(^|.*[\\\/])ckeditor\.js(?:\?.*|;.*)?$/i,f={timestamp:"H8DC",version:"4.7.3 (Standard)",revision:"dee99e283",rnd:Math.floor(900*Math.random())+100,_:{pending:[],basePathSrcPattern:a},status:"unloaded",basePath:function(){var c=window.CKEDITOR_BASEPATH||"";if(!c)for(var b=document.getElementsByTagName("script"),f=0;f<b.length;f++){var d=
b[f].src.match(a);if(d){c=d[1];break}}-1==c.indexOf(":/")&&"//"!=c.slice(0,2)&&(c=0===c.indexOf("/")?location.href.match(/^.*?:\/\/[^\/]*/)[0]+c:location.href.match(/^[^\?]*\/(?:)/)[0]+c);if(!c)throw'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';return c}(),getUrl:function(a){-1==a.indexOf(":/")&&0!==a.indexOf("/")&&(a=this.basePath+a);this.timestamp&&"/"!=a.charAt(a.length-1)&&!/[&?]t=/.test(a)&&
(a+=(0<=a.indexOf("?")?"\x26":"?")+"t\x3d"+this.timestamp);return a},domReady:function(){function a(){try{document.addEventListener?(document.removeEventListener("DOMContentLoaded",a,!1),c()):document.attachEvent&&"complete"===document.readyState&&(document.detachEvent("onreadystatechange",a),c())}catch(d){}}function c(){for(var a;a=b.shift();)a()}var b=[];return function(d){function c(){try{document.documentElement.doScroll("left")}catch(g){setTimeout(c,1);return}a()}b.push(d);"complete"===document.readyState&&
setTimeout(a,1);if(1==b.length)if(document.addEventListener)document.addEventListener("DOMContentLoaded",a,!1),window.addEventListener("load",a,!1);else if(document.attachEvent){document.attachEvent("onreadystatechange",a);window.attachEvent("onload",a);d=!1;try{d=!window.frameElement}catch(l){}document.documentElement.doScroll&&d&&c()}}}()},b=window.CKEDITOR_GETURL;if(b){var c=f.getUrl;f.getUrl=function(a){return b.call(f,a)||c.call(f,a)}}return f}()),CKEDITOR.event||(CKEDITOR.event=function(){},
CKEDITOR.event.implementOn=function(a){var f=CKEDITOR.event.prototype,b;for(b in f)null==a[b]&&(a[b]=f[b])},CKEDITOR.event.prototype=function(){function a(a){var e=f(this);return e[a]||(e[a]=new b(a))}var f=function(a){a=a.getPrivate&&a.getPrivate()||a._||(a._={});return a.events||(a.events={})},b=function(a){this.name=a;this.listeners=[]};b.prototype={getListenerIndex:function(a){for(var b=0,f=this.listeners;b<f.length;b++)if(f[b].fn==a)return b;return-1}};return{define:function(b,e){var f=a.call(this,
b);CKEDITOR.tools.extend(f,e,!0)},on:function(b,e,f,k,d){function h(a,g,d,h){a={name:b,sender:this,editor:a,data:g,listenerData:k,stop:d,cancel:h,removeListener:l};return!1===e.call(f,a)?!1:a.data}function l(){n.removeListener(b,e)}var g=a.call(this,b);if(0>g.getListenerIndex(e)){g=g.listeners;f||(f=this);isNaN(d)&&(d=10);var n=this;h.fn=e;h.priority=d;for(var p=g.length-1;0<=p;p--)if(g[p].priority<=d)return g.splice(p+1,0,h),{removeListener:l};g.unshift(h)}return{removeListener:l}},once:function(){var a=
Array.prototype.slice.call(arguments),b=a[1];a[1]=function(a){a.removeListener();return b.apply(this,arguments)};return this.on.apply(this,a)},capture:function(){CKEDITOR.event.useCapture=1;var a=this.on.apply(this,arguments);CKEDITOR.event.useCapture=0;return a},fire:function(){var a=0,b=function(){a=1},m=0,k=function(){m=1};return function(d,h,l){var g=f(this)[d];d=a;var n=m;a=m=0;if(g){var p=g.listeners;if(p.length)for(var p=p.slice(0),u,C=0;C<p.length;C++){if(g.errorProof)try{u=p[C].call(this,
l,h,b,k)}catch(w){}else u=p[C].call(this,l,h,b,k);!1===u?m=1:"undefined"!=typeof u&&(h=u);if(a||m)break}}h=m?!1:"undefined"==typeof h?!0:h;a=d;m=n;return h}}(),fireOnce:function(a,b,m){b=this.fire(a,b,m);delete f(this)[a];return b},removeListener:function(a,b){var m=f(this)[a];if(m){var k=m.getListenerIndex(b);0<=k&&m.listeners.splice(k,1)}},removeAllListeners:function(){var a=f(this),b;for(b in a)delete a[b]},hasListeners:function(a){return(a=f(this)[a])&&0<a.listeners.length}}}()),CKEDITOR.editor||
(CKEDITOR.editor=function(){CKEDITOR._.pending.push([this,arguments]);CKEDITOR.event.call(this)},CKEDITOR.editor.prototype.fire=function(a,f){a in{instanceReady:1,loaded:1}&&(this[a]=!0);return CKEDITOR.event.prototype.fire.call(this,a,f,this)},CKEDITOR.editor.prototype.fireOnce=function(a,f){a in{instanceReady:1,loaded:1}&&(this[a]=!0);return CKEDITOR.event.prototype.fireOnce.call(this,a,f,this)},CKEDITOR.event.implementOn(CKEDITOR.editor.prototype)),CKEDITOR.env||(CKEDITOR.env=function(){var a=
navigator.userAgent.toLowerCase(),f=a.match(/edge[ \/](\d+.?\d*)/),b=-1<a.indexOf("trident/"),b=!(!f&&!b),b={ie:b,edge:!!f,webkit:!b&&-1<a.indexOf(" applewebkit/"),air:-1<a.indexOf(" adobeair/"),mac:-1<a.indexOf("macintosh"),quirks:"BackCompat"==document.compatMode&&(!document.documentMode||10>document.documentMode),mobile:-1<a.indexOf("mobile"),iOS:/(ipad|iphone|ipod)/.test(a),isCustomDomain:function(){if(!this.ie)return!1;var a=document.domain,b=window.location.hostname;return a!=b&&a!="["+b+"]"},
secure:"https:"==location.protocol};b.gecko="Gecko"==navigator.product&&!b.webkit&&!b.ie;b.webkit&&(-1<a.indexOf("chrome")?b.chrome=!0:b.safari=!0);var c=0;b.ie&&(c=f?parseFloat(f[1]):b.quirks||!document.documentMode?parseFloat(a.match(/msie (\d+)/)[1]):document.documentMode,b.ie9Compat=9==c,b.ie8Compat=8==c,b.ie7Compat=7==c,b.ie6Compat=7>c||b.quirks);b.gecko&&(f=a.match(/rv:([\d\.]+)/))&&(f=f[1].split("."),c=1E4*f[0]+100*(f[1]||0)+1*(f[2]||0));b.air&&(c=parseFloat(a.match(/ adobeair\/(\d+)/)[1]));
b.webkit&&(c=parseFloat(a.match(/ applewebkit\/(\d+)/)[1]));b.version=c;b.isCompatible=!(b.ie&&7>c)&&!(b.gecko&&4E4>c)&&!(b.webkit&&534>c);b.hidpi=2<=window.devicePixelRatio;b.needsBrFiller=b.gecko||b.webkit||b.ie&&10<c;b.needsNbspFiller=b.ie&&11>c;b.cssClass="cke_browser_"+(b.ie?"ie":b.gecko?"gecko":b.webkit?"webkit":"unknown");b.quirks&&(b.cssClass+=" cke_browser_quirks");b.ie&&(b.cssClass+=" cke_browser_ie"+(b.quirks?"6 cke_browser_iequirks":b.version));b.air&&(b.cssClass+=" cke_browser_air");
b.iOS&&(b.cssClass+=" cke_browser_ios");b.hidpi&&(b.cssClass+=" cke_hidpi");return b}()),"unloaded"==CKEDITOR.status&&function(){CKEDITOR.event.implementOn(CKEDITOR);CKEDITOR.loadFullCore=function(){if("basic_ready"!=CKEDITOR.status)CKEDITOR.loadFullCore._load=1;else{delete CKEDITOR.loadFullCore;var a=document.createElement("script");a.type="text/javascript";a.src=CKEDITOR.basePath+"ckeditor.js";document.getElementsByTagName("head")[0].appendChild(a)}};CKEDITOR.loadFullCoreTimeout=0;CKEDITOR.add=
function(a){(this._.pending||(this._.pending=[])).push(a)};(function(){CKEDITOR.domReady(function(){var a=CKEDITOR.loadFullCore,f=CKEDITOR.loadFullCoreTimeout;a&&(CKEDITOR.status="basic_ready",a&&a._load?a():f&&setTimeout(function(){CKEDITOR.loadFullCore&&CKEDITOR.loadFullCore()},1E3*f))})})();CKEDITOR.status="basic_loaded"}(),"use strict",CKEDITOR.VERBOSITY_WARN=1,CKEDITOR.VERBOSITY_ERROR=2,CKEDITOR.verbosity=CKEDITOR.VERBOSITY_WARN|CKEDITOR.VERBOSITY_ERROR,CKEDITOR.warn=function(a,f){CKEDITOR.verbosity&
CKEDITOR.VERBOSITY_WARN&&CKEDITOR.fire("log",{type:"warn",errorCode:a,additionalData:f})},CKEDITOR.error=function(a,f){CKEDITOR.verbosity&CKEDITOR.VERBOSITY_ERROR&&CKEDITOR.fire("log",{type:"error",errorCode:a,additionalData:f})},CKEDITOR.on("log",function(a){if(window.console&&window.console.log){var f=console[a.data.type]?a.data.type:"log",b=a.data.errorCode;if(a=a.data.additionalData)console[f]("[CKEDITOR] Error code: "+b+".",a);else console[f]("[CKEDITOR] Error code: "+b+".");console[f]("[CKEDITOR] For more information about this error go to http://docs.ckeditor.com/#!/guide/dev_errors-section-"+
b)}},null,null,999),CKEDITOR.dom={},function(){var a=[],f=CKEDITOR.env.gecko?"-moz-":CKEDITOR.env.webkit?"-webkit-":CKEDITOR.env.ie?"-ms-":"",b=/&/g,c=/>/g,e=/</g,m=/"/g,k=/&(lt|gt|amp|quot|nbsp|shy|#\d{1,5});/g,d={lt:"\x3c",gt:"\x3e",amp:"\x26",quot:'"',nbsp:" ",shy:"­"},h=function(a,g){return"#"==g[0]?String.fromCharCode(parseInt(g.slice(1),10)):d[g]};CKEDITOR.on("reset",function(){a=[]});CKEDITOR.tools={arrayCompare:function(a,g){if(!a&&!g)return!0;if(!a||!g||a.length!=g.length)return!1;for(var d=
0;d<a.length;d++)if(a[d]!=g[d])return!1;return!0},getIndex:function(a,g){for(var d=0;d<a.length;++d)if(g(a[d]))return d;return-1},clone:function(a){var g;if(a&&a instanceof Array){g=[];for(var d=0;d<a.length;d++)g[d]=CKEDITOR.tools.clone(a[d]);return g}if(null===a||"object"!=typeof a||a instanceof String||a instanceof Number||a instanceof Boolean||a instanceof Date||a instanceof RegExp||a.nodeType||a.window===a)return a;g=new a.constructor;for(d in a)g[d]=CKEDITOR.tools.clone(a[d]);return g},capitalize:function(a,
g){return a.charAt(0).toUpperCase()+(g?a.slice(1):a.slice(1).toLowerCase())},extend:function(a){var g=arguments.length,d,b;"boolean"==typeof(d=arguments[g-1])?g--:"boolean"==typeof(d=arguments[g-2])&&(b=arguments[g-1],g-=2);for(var h=1;h<g;h++){var c=arguments[h],e;for(e in c)if(!0===d||null==a[e])if(!b||e in b)a[e]=c[e]}return a},prototypedCopy:function(a){var g=function(){};g.prototype=a;return new g},copy:function(a){var g={},d;for(d in a)g[d]=a[d];return g},isArray:function(a){return"[object Array]"==
Object.prototype.toString.call(a)},isEmpty:function(a){for(var g in a)if(a.hasOwnProperty(g))return!1;return!0},cssVendorPrefix:function(a,g,d){if(d)return f+a+":"+g+";"+a+":"+g;d={};d[a]=g;d[f+a]=g;return d},cssStyleToDomStyle:function(){var a=document.createElement("div").style,g="undefined"!=typeof a.cssFloat?"cssFloat":"undefined"!=typeof a.styleFloat?"styleFloat":"float";return function(a){return"float"==a?g:a.replace(/-./g,function(a){return a.substr(1).toUpperCase()})}}(),buildStyleHtml:function(a){a=
[].concat(a);for(var g,d=[],b=0;b<a.length;b++)if(g=a[b])/@import|[{}]/.test(g)?d.push("\x3cstyle\x3e"+g+"\x3c/style\x3e"):d.push('\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"'+g+'"\x3e');return d.join("")},htmlEncode:function(a){return void 0===a||null===a?"":String(a).replace(b,"\x26amp;").replace(c,"\x26gt;").replace(e,"\x26lt;")},htmlDecode:function(a){return a.replace(k,h)},htmlEncodeAttr:function(a){return CKEDITOR.tools.htmlEncode(a).replace(m,"\x26quot;")},htmlDecodeAttr:function(a){return CKEDITOR.tools.htmlDecode(a)},
transformPlainTextToHtml:function(a,g){var d=g==CKEDITOR.ENTER_BR,b=this.htmlEncode(a.replace(/\r\n/g,"\n")),b=b.replace(/\t/g,"\x26nbsp;\x26nbsp; \x26nbsp;"),h=g==CKEDITOR.ENTER_P?"p":"div";if(!d){var c=/\n{2}/g;if(c.test(b))var e="\x3c"+h+"\x3e",f="\x3c/"+h+"\x3e",b=e+b.replace(c,function(){return f+e})+f}b=b.replace(/\n/g,"\x3cbr\x3e");d||(b=b.replace(new RegExp("\x3cbr\x3e(?\x3d\x3c/"+h+"\x3e)"),function(a){return CKEDITOR.tools.repeat(a,2)}));b=b.replace(/^ | $/g,"\x26nbsp;");return b=b.replace(/(>|\s) /g,
function(a,g){return g+"\x26nbsp;"}).replace(/ (?=<)/g,"\x26nbsp;")},getNextNumber:function(){var a=0;return function(){return++a}}(),getNextId:function(){return"cke_"+this.getNextNumber()},getUniqueId:function(){for(var a="e",g=0;8>g;g++)a+=Math.floor(65536*(1+Math.random())).toString(16).substring(1);return a},override:function(a,g){var d=g(a);d.prototype=a.prototype;return d},setTimeout:function(a,g,d,b,h){h||(h=window);d||(d=h);return h.setTimeout(function(){b?a.apply(d,[].concat(b)):a.apply(d)},
g||0)},trim:function(){var a=/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;return function(g){return g.replace(a,"")}}(),ltrim:function(){var a=/^[ \t\n\r]+/g;return function(g){return g.replace(a,"")}}(),rtrim:function(){var a=/[ \t\n\r]+$/g;return function(g){return g.replace(a,"")}}(),indexOf:function(a,g){if("function"==typeof g)for(var d=0,b=a.length;d<b;d++){if(g(a[d]))return d}else{if(a.indexOf)return a.indexOf(g);d=0;for(b=a.length;d<b;d++)if(a[d]===g)return d}return-1},search:function(a,g){var d=CKEDITOR.tools.indexOf(a,
g);return 0<=d?a[d]:null},bind:function(a,g){return function(){return a.apply(g,arguments)}},createClass:function(a){var g=a.$,d=a.base,b=a.privates||a._,h=a.proto;a=a.statics;!g&&(g=function(){d&&this.base.apply(this,arguments)});if(b)var c=g,g=function(){var a=this._||(this._={}),g;for(g in b){var d=b[g];a[g]="function"==typeof d?CKEDITOR.tools.bind(d,this):d}c.apply(this,arguments)};d&&(g.prototype=this.prototypedCopy(d.prototype),g.prototype.constructor=g,g.base=d,g.baseProto=d.prototype,g.prototype.base=
function(){this.base=d.prototype.base;d.apply(this,arguments);this.base=arguments.callee});h&&this.extend(g.prototype,h,!0);a&&this.extend(g,a,!0);return g},addFunction:function(d,g){return a.push(function(){return d.apply(g||this,arguments)})-1},removeFunction:function(d){a[d]=null},callFunction:function(d){var g=a[d];return g&&g.apply(window,Array.prototype.slice.call(arguments,1))},cssLength:function(){var a=/^-?\d+\.?\d*px$/,g;return function(d){g=CKEDITOR.tools.trim(d+"")+"px";return a.test(g)?
g:d||""}}(),convertToPx:function(){var a;return function(g){a||(a=CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"\x3e\x3c/div\x3e',CKEDITOR.document),CKEDITOR.document.getBody().append(a));return/%$/.test(g)?g:(a.setStyle("width",g),a.$.clientWidth)}}(),repeat:function(a,g){return Array(g+1).join(a)},tryThese:function(){for(var a,g=0,d=arguments.length;g<d;g++){var b=arguments[g];try{a=b();break}catch(h){}}return a},
genKey:function(){return Array.prototype.slice.call(arguments).join("-")},defer:function(a){return function(){var g=arguments,d=this;window.setTimeout(function(){a.apply(d,g)},0)}},normalizeCssText:function(a,g){var d=[],b,h=CKEDITOR.tools.parseCssText(a,!0,g);for(b in h)d.push(b+":"+h[b]);d.sort();return d.length?d.join(";")+";":""},convertRgbToHex:function(a){return a.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi,function(a,d,b,l){a=[d,b,l];for(d=0;3>d;d++)a[d]=("0"+parseInt(a[d],10).toString(16)).slice(-2);
return"#"+a.join("")})},normalizeHex:function(a){return a.replace(/#(([0-9a-f]{3}){1,2})($|;|\s+)/gi,function(a,d,b,l){a=d.toLowerCase();3==a.length&&(a=a.split(""),a=[a[0],a[0],a[1],a[1],a[2],a[2]].join(""));return"#"+a+l})},parseCssText:function(a,g,d){var b={};d&&(a=(new CKEDITOR.dom.element("span")).setAttribute("style",a).getAttribute("style")||"");a&&(a=CKEDITOR.tools.normalizeHex(CKEDITOR.tools.convertRgbToHex(a)));if(!a||";"==a)return b;a.replace(/&quot;/g,'"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g,
function(a,d,l){g&&(d=d.toLowerCase(),"font-family"==d&&(l=l.replace(/\s*,\s*/g,",")),l=CKEDITOR.tools.trim(l));b[d]=l});return b},writeCssText:function(a,g){var d,b=[];for(d in a)b.push(d+":"+a[d]);g&&b.sort();return b.join("; ")},objectCompare:function(a,g,d){var b;if(!a&&!g)return!0;if(!a||!g)return!1;for(b in a)if(a[b]!=g[b])return!1;if(!d)for(b in g)if(a[b]!=g[b])return!1;return!0},objectKeys:function(a){var g=[],d;for(d in a)g.push(d);return g},convertArrayToObject:function(a,g){var d={};1==
arguments.length&&(g=!0);for(var b=0,h=a.length;b<h;++b)d[a[b]]=g;return d},fixDomain:function(){for(var a;;)try{a=window.parent.document.domain;break}catch(g){a=a?a.replace(/.+?(?:\.|$)/,""):document.domain;if(!a)break;document.domain=a}return!!a},eventsBuffer:function(a,g,d){function b(){c=(new Date).getTime();h=!1;d?g.call(d):g()}var h,c=0;return{input:function(){if(!h){var g=(new Date).getTime()-c;g<a?h=setTimeout(b,a-g):b()}},reset:function(){h&&clearTimeout(h);h=c=0}}},enableHtml5Elements:function(a,
g){for(var d="abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section summary time video".split(" "),b=d.length,h;b--;)h=a.createElement(d[b]),g&&a.appendChild(h)},checkIfAnyArrayItemMatches:function(a,g){for(var d=0,b=a.length;d<b;++d)if(a[d].match(g))return!0;return!1},checkIfAnyObjectPropertyMatches:function(a,g){for(var d in a)if(d.match(g))return!0;return!1},keystrokeToString:function(a,g){var d=g&16711680,b=
g&65535,h=CKEDITOR.env.mac,c=[],e=[];d&CKEDITOR.CTRL&&(c.push(h?"⌘":a[17]),e.push(h?a[224]:a[17]));d&CKEDITOR.ALT&&(c.push(h?"⌥":a[18]),e.push(a[18]));d&CKEDITOR.SHIFT&&(c.push(h?"⇧":a[16]),e.push(a[16]));b&&(a[b]?(c.push(a[b]),e.push(a[b])):(c.push(String.fromCharCode(b)),e.push(String.fromCharCode(b))));return{display:c.join("+"),aria:e.join("+")}},transparentImageData:"data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw\x3d\x3d",getCookie:function(a){a=a.toLowerCase();
for(var g=document.cookie.split(";"),d,b,h=0;h<g.length;h++)if(d=g[h].split("\x3d"),b=decodeURIComponent(CKEDITOR.tools.trim(d[0]).toLowerCase()),b===a)return decodeURIComponent(1<d.length?d[1]:"");return null},setCookie:function(a,g){document.cookie=encodeURIComponent(a)+"\x3d"+encodeURIComponent(g)+";path\x3d/"},getCsrfToken:function(){var a=CKEDITOR.tools.getCookie("ckCsrfToken");if(!a||40!=a.length){var a=[],g="";if(window.crypto&&window.crypto.getRandomValues)a=new Uint8Array(40),window.crypto.getRandomValues(a);
else for(var d=0;40>d;d++)a.push(Math.floor(256*Math.random()));for(d=0;d<a.length;d++)var b="abcdefghijklmnopqrstuvwxyz0123456789".charAt(a[d]%36),g=g+(.5<Math.random()?b.toUpperCase():b);a=g;CKEDITOR.tools.setCookie("ckCsrfToken",a)}return a},escapeCss:function(a){return a?window.CSS&&CSS.escape?CSS.escape(a):isNaN(parseInt(a.charAt(0),10))?a:"\\3"+a.charAt(0)+" "+a.substring(1,a.length):""},getMouseButton:function(a){var g=(a=a.data)&&a.$;return a&&g?CKEDITOR.env.ie&&9>CKEDITOR.env.version?4===
g.button?CKEDITOR.MOUSE_BUTTON_MIDDLE:1===g.button?CKEDITOR.MOUSE_BUTTON_LEFT:CKEDITOR.MOUSE_BUTTON_RIGHT:g.button:!1},style:{parse:{_colors:{aliceblue:"#F0F8FF",antiquewhite:"#FAEBD7",aqua:"#00FFFF",aquamarine:"#7FFFD4",azure:"#F0FFFF",beige:"#F5F5DC",bisque:"#FFE4C4",black:"#000000",blanchedalmond:"#FFEBCD",blue:"#0000FF",blueviolet:"#8A2BE2",brown:"#A52A2A",burlywood:"#DEB887",cadetblue:"#5F9EA0",chartreuse:"#7FFF00",chocolate:"#D2691E",coral:"#FF7F50",cornflowerblue:"#6495ED",cornsilk:"#FFF8DC",
crimson:"#DC143C",cyan:"#00FFFF",darkblue:"#00008B",darkcyan:"#008B8B",darkgoldenrod:"#B8860B",darkgray:"#A9A9A9",darkgreen:"#006400",darkgrey:"#A9A9A9",darkkhaki:"#BDB76B",darkmagenta:"#8B008B",darkolivegreen:"#556B2F",darkorange:"#FF8C00",darkorchid:"#9932CC",darkred:"#8B0000",darksalmon:"#E9967A",darkseagreen:"#8FBC8F",darkslateblue:"#483D8B",darkslategray:"#2F4F4F",darkslategrey:"#2F4F4F",darkturquoise:"#00CED1",darkviolet:"#9400D3",deeppink:"#FF1493",deepskyblue:"#00BFFF",dimgray:"#696969",dimgrey:"#696969",
dodgerblue:"#1E90FF",firebrick:"#B22222",floralwhite:"#FFFAF0",forestgreen:"#228B22",fuchsia:"#FF00FF",gainsboro:"#DCDCDC",ghostwhite:"#F8F8FF",gold:"#FFD700",goldenrod:"#DAA520",gray:"#808080",green:"#008000",greenyellow:"#ADFF2F",grey:"#808080",honeydew:"#F0FFF0",hotpink:"#FF69B4",indianred:"#CD5C5C",indigo:"#4B0082",ivory:"#FFFFF0",khaki:"#F0E68C",lavender:"#E6E6FA",lavenderblush:"#FFF0F5",lawngreen:"#7CFC00",lemonchiffon:"#FFFACD",lightblue:"#ADD8E6",lightcoral:"#F08080",lightcyan:"#E0FFFF",lightgoldenrodyellow:"#FAFAD2",
lightgray:"#D3D3D3",lightgreen:"#90EE90",lightgrey:"#D3D3D3",lightpink:"#FFB6C1",lightsalmon:"#FFA07A",lightseagreen:"#20B2AA",lightskyblue:"#87CEFA",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#B0C4DE",lightyellow:"#FFFFE0",lime:"#00FF00",limegreen:"#32CD32",linen:"#FAF0E6",magenta:"#FF00FF",maroon:"#800000",mediumaquamarine:"#66CDAA",mediumblue:"#0000CD",mediumorchid:"#BA55D3",mediumpurple:"#9370DB",mediumseagreen:"#3CB371",mediumslateblue:"#7B68EE",mediumspringgreen:"#00FA9A",
mediumturquoise:"#48D1CC",mediumvioletred:"#C71585",midnightblue:"#191970",mintcream:"#F5FFFA",mistyrose:"#FFE4E1",moccasin:"#FFE4B5",navajowhite:"#FFDEAD",navy:"#000080",oldlace:"#FDF5E6",olive:"#808000",olivedrab:"#6B8E23",orange:"#FFA500",orangered:"#FF4500",orchid:"#DA70D6",palegoldenrod:"#EEE8AA",palegreen:"#98FB98",paleturquoise:"#AFEEEE",palevioletred:"#DB7093",papayawhip:"#FFEFD5",peachpuff:"#FFDAB9",peru:"#CD853F",pink:"#FFC0CB",plum:"#DDA0DD",powderblue:"#B0E0E6",purple:"#800080",rebeccapurple:"#663399",
red:"#FF0000",rosybrown:"#BC8F8F",royalblue:"#4169E1",saddlebrown:"#8B4513",salmon:"#FA8072",sandybrown:"#F4A460",seagreen:"#2E8B57",seashell:"#FFF5EE",sienna:"#A0522D",silver:"#C0C0C0",skyblue:"#87CEEB",slateblue:"#6A5ACD",slategray:"#708090",slategrey:"#708090",snow:"#FFFAFA",springgreen:"#00FF7F",steelblue:"#4682B4",tan:"#D2B48C",teal:"#008080",thistle:"#D8BFD8",tomato:"#FF6347",turquoise:"#40E0D0",violet:"#EE82EE",wheat:"#F5DEB3",white:"#FFFFFF",whitesmoke:"#F5F5F5",yellow:"#FFFF00",yellowgreen:"#9ACD32"},
_borderStyle:"none hidden dotted dashed solid double groove ridge inset outset".split(" "),_widthRegExp:/^(thin|medium|thick|[\+-]?\d+(\.\d+)?[a-z%]+|[\+-]?0+(\.0+)?|\.\d+[a-z%]+)$/,_rgbaRegExp:/rgba?\(\s*\d+%?\s*,\s*\d+%?\s*,\s*\d+%?\s*(?:,\s*[0-9.]+\s*)?\)/gi,_hslaRegExp:/hsla?\(\s*[0-9.]+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[0-9.]+\s*)?\)/gi,background:function(a){var g={},d=this._findColor(a);d.length&&(g.color=d[0],CKEDITOR.tools.array.forEach(d,function(g){a=a.replace(g,"")}));if(a=CKEDITOR.tools.trim(a))g.unprocessed=
a;return g},margin:function(a){function g(a){d.top=b[a[0]];d.right=b[a[1]];d.bottom=b[a[2]];d.left=b[a[3]]}var d={},b=a.match(/(?:\-?[\.\d]+(?:%|\w*)|auto|inherit|initial|unset)/g)||["0px"];switch(b.length){case 1:g([0,0,0,0]);break;case 2:g([0,1,0,1]);break;case 3:g([0,1,2,1]);break;case 4:g([0,1,2,3])}return d},border:function(a){var g={};a=a.split(/\s+/);CKEDITOR.tools.array.forEach(a,function(a){if(!g.color){var d=CKEDITOR.tools.style.parse._findColor(a);if(d.length){g.color=d[0];return}}g.style||
-1===CKEDITOR.tools.indexOf(CKEDITOR.tools.style.parse._borderStyle,a)?!g.width&&CKEDITOR.tools.style.parse._widthRegExp.test(a)&&(g.width=a):g.style=a});return g},_findColor:function(a){var g=[],d=CKEDITOR.tools.array,g=g.concat(a.match(this._rgbaRegExp)||[]),g=g.concat(a.match(this._hslaRegExp)||[]);return g=g.concat(d.filter(a.split(/\s+/),function(a){return a.match(/^\#[a-f0-9]{3}(?:[a-f0-9]{3})?$/gi)?!0:a.toLowerCase()in CKEDITOR.tools.style.parse._colors}))}}},array:{filter:function(a,g,d){var b=
[];this.forEach(a,function(h,c){g.call(d,h,c,a)&&b.push(h)});return b},forEach:function(a,g,d){var b=a.length,h;for(h=0;h<b;h++)g.call(d,a[h],h,a)},map:function(a,g,d){for(var b=[],h=0;h<a.length;h++)b.push(g.call(d,a[h],h,a));return b},reduce:function(a,g,d,b){for(var h=0;h<a.length;h++)d=g.call(b,d,a[h],h,a);return d}},object:{findKey:function(a,g){if("object"!==typeof a)return null;for(var d in a)if(a[d]===g)return d;return null}}};CKEDITOR.tools.array.indexOf=CKEDITOR.tools.indexOf;CKEDITOR.tools.array.isArray=
CKEDITOR.tools.isArray;CKEDITOR.MOUSE_BUTTON_LEFT=0;CKEDITOR.MOUSE_BUTTON_MIDDLE=1;CKEDITOR.MOUSE_BUTTON_RIGHT=2}(),CKEDITOR.dtd=function(){var a=CKEDITOR.tools.extend,f=function(a,g){for(var d=CKEDITOR.tools.clone(a),b=1;b<arguments.length;b++){g=arguments[b];for(var h in g)delete d[h]}return d},b={},c={},e={address:1,article:1,aside:1,blockquote:1,details:1,div:1,dl:1,fieldset:1,figure:1,footer:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,header:1,hgroup:1,hr:1,main:1,menu:1,nav:1,ol:1,p:1,pre:1,section:1,
table:1,ul:1},m={command:1,link:1,meta:1,noscript:1,script:1,style:1},k={},d={"#":1},h={center:1,dir:1,noframes:1};a(b,{a:1,abbr:1,area:1,audio:1,b:1,bdi:1,bdo:1,br:1,button:1,canvas:1,cite:1,code:1,command:1,datalist:1,del:1,dfn:1,em:1,embed:1,i:1,iframe:1,img:1,input:1,ins:1,kbd:1,keygen:1,label:1,map:1,mark:1,meter:1,noscript:1,object:1,output:1,progress:1,q:1,ruby:1,s:1,samp:1,script:1,select:1,small:1,span:1,strong:1,sub:1,sup:1,textarea:1,time:1,u:1,"var":1,video:1,wbr:1},d,{acronym:1,applet:1,
basefont:1,big:1,font:1,isindex:1,strike:1,style:1,tt:1});a(c,e,b,h);f={a:f(b,{a:1,button:1}),abbr:b,address:c,area:k,article:c,aside:c,audio:a({source:1,track:1},c),b:b,base:k,bdi:b,bdo:b,blockquote:c,body:c,br:k,button:f(b,{a:1,button:1}),canvas:b,caption:c,cite:b,code:b,col:k,colgroup:{col:1},command:k,datalist:a({option:1},b),dd:c,del:b,details:a({summary:1},c),dfn:b,div:c,dl:{dt:1,dd:1},dt:c,em:b,embed:k,fieldset:a({legend:1},c),figcaption:c,figure:a({figcaption:1},c),footer:c,form:c,h1:b,h2:b,
h3:b,h4:b,h5:b,h6:b,head:a({title:1,base:1},m),header:c,hgroup:{h1:1,h2:1,h3:1,h4:1,h5:1,h6:1},hr:k,html:a({head:1,body:1},c,m),i:b,iframe:d,img:k,input:k,ins:b,kbd:b,keygen:k,label:b,legend:b,li:c,link:k,main:c,map:c,mark:b,menu:a({li:1},c),meta:k,meter:f(b,{meter:1}),nav:c,noscript:a({link:1,meta:1,style:1},b),object:a({param:1},b),ol:{li:1},optgroup:{option:1},option:d,output:b,p:b,param:k,pre:b,progress:f(b,{progress:1}),q:b,rp:b,rt:b,ruby:a({rp:1,rt:1},b),s:b,samp:b,script:d,section:c,select:{optgroup:1,
option:1},small:b,source:k,span:b,strong:b,style:d,sub:b,summary:a({h1:1,h2:1,h3:1,h4:1,h5:1,h6:1},b),sup:b,table:{caption:1,colgroup:1,thead:1,tfoot:1,tbody:1,tr:1},tbody:{tr:1},td:c,textarea:d,tfoot:{tr:1},th:c,thead:{tr:1},time:f(b,{time:1}),title:d,tr:{th:1,td:1},track:k,u:b,ul:{li:1},"var":b,video:a({source:1,track:1},c),wbr:k,acronym:b,applet:a({param:1},c),basefont:k,big:b,center:c,dialog:k,dir:{li:1},font:b,isindex:k,noframes:c,strike:b,tt:b};a(f,{$block:a({audio:1,dd:1,dt:1,figcaption:1,
li:1,video:1},e,h),$blockLimit:{article:1,aside:1,audio:1,body:1,caption:1,details:1,dir:1,div:1,dl:1,fieldset:1,figcaption:1,figure:1,footer:1,form:1,header:1,hgroup:1,main:1,menu:1,nav:1,ol:1,section:1,table:1,td:1,th:1,tr:1,ul:1,video:1},$cdata:{script:1,style:1},$editable:{address:1,article:1,aside:1,blockquote:1,body:1,details:1,div:1,fieldset:1,figcaption:1,footer:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,header:1,hgroup:1,main:1,nav:1,p:1,pre:1,section:1},$empty:{area:1,base:1,basefont:1,br:1,
col:1,command:1,dialog:1,embed:1,hr:1,img:1,input:1,isindex:1,keygen:1,link:1,meta:1,param:1,source:1,track:1,wbr:1},$inline:b,$list:{dl:1,ol:1,ul:1},$listItem:{dd:1,dt:1,li:1},$nonBodyContent:a({body:1,head:1,html:1},f.head),$nonEditable:{applet:1,audio:1,button:1,embed:1,iframe:1,map:1,object:1,option:1,param:1,script:1,textarea:1,video:1},$object:{applet:1,audio:1,button:1,hr:1,iframe:1,img:1,input:1,object:1,select:1,table:1,textarea:1,video:1},$removeEmpty:{abbr:1,acronym:1,b:1,bdi:1,bdo:1,big:1,
cite:1,code:1,del:1,dfn:1,em:1,font:1,i:1,ins:1,label:1,kbd:1,mark:1,meter:1,output:1,q:1,ruby:1,s:1,samp:1,small:1,span:1,strike:1,strong:1,sub:1,sup:1,time:1,tt:1,u:1,"var":1},$tabIndex:{a:1,area:1,button:1,input:1,object:1,select:1,textarea:1},$tableContent:{caption:1,col:1,colgroup:1,tbody:1,td:1,tfoot:1,th:1,thead:1,tr:1},$transparent:{a:1,audio:1,canvas:1,del:1,ins:1,map:1,noscript:1,object:1,video:1},$intermediate:{caption:1,colgroup:1,dd:1,dt:1,figcaption:1,legend:1,li:1,optgroup:1,option:1,
rp:1,rt:1,summary:1,tbody:1,td:1,tfoot:1,th:1,thead:1,tr:1}});return f}(),CKEDITOR.dom.event=function(a){this.$=a},CKEDITOR.dom.event.prototype={getKey:function(){return this.$.keyCode||this.$.which},getKeystroke:function(){var a=this.getKey();if(this.$.ctrlKey||this.$.metaKey)a+=CKEDITOR.CTRL;this.$.shiftKey&&(a+=CKEDITOR.SHIFT);this.$.altKey&&(a+=CKEDITOR.ALT);return a},preventDefault:function(a){var f=this.$;f.preventDefault?f.preventDefault():f.returnValue=!1;a&&this.stopPropagation()},stopPropagation:function(){var a=
this.$;a.stopPropagation?a.stopPropagation():a.cancelBubble=!0},getTarget:function(){var a=this.$.target||this.$.srcElement;return a?new CKEDITOR.dom.node(a):null},getPhase:function(){return this.$.eventPhase||2},getPageOffset:function(){var a=this.getTarget().getDocument().$;return{x:this.$.pageX||this.$.clientX+(a.documentElement.scrollLeft||a.body.scrollLeft),y:this.$.pageY||this.$.clientY+(a.documentElement.scrollTop||a.body.scrollTop)}}},CKEDITOR.CTRL=1114112,CKEDITOR.SHIFT=2228224,CKEDITOR.ALT=
4456448,CKEDITOR.EVENT_PHASE_CAPTURING=1,CKEDITOR.EVENT_PHASE_AT_TARGET=2,CKEDITOR.EVENT_PHASE_BUBBLING=3,CKEDITOR.dom.domObject=function(a){a&&(this.$=a)},CKEDITOR.dom.domObject.prototype=function(){var a=function(a,b){return function(c){"undefined"!=typeof CKEDITOR&&a.fire(b,new CKEDITOR.dom.event(c))}};return{getPrivate:function(){var a;(a=this.getCustomData("_"))||this.setCustomData("_",a={});return a},on:function(f){var b=this.getCustomData("_cke_nativeListeners");b||(b={},this.setCustomData("_cke_nativeListeners",
b));b[f]||(b=b[f]=a(this,f),this.$.addEventListener?this.$.addEventListener(f,b,!!CKEDITOR.event.useCapture):this.$.attachEvent&&this.$.attachEvent("on"+f,b));return CKEDITOR.event.prototype.on.apply(this,arguments)},removeListener:function(a){CKEDITOR.event.prototype.removeListener.apply(this,arguments);if(!this.hasListeners(a)){var b=this.getCustomData("_cke_nativeListeners"),c=b&&b[a];c&&(this.$.removeEventListener?this.$.removeEventListener(a,c,!1):this.$.detachEvent&&this.$.detachEvent("on"+
a,c),delete b[a])}},removeAllListeners:function(){var a=this.getCustomData("_cke_nativeListeners"),b;for(b in a){var c=a[b];this.$.detachEvent?this.$.detachEvent("on"+b,c):this.$.removeEventListener&&this.$.removeEventListener(b,c,!1);delete a[b]}CKEDITOR.event.prototype.removeAllListeners.call(this)}}}(),function(a){var f={};CKEDITOR.on("reset",function(){f={}});a.equals=function(a){try{return a&&a.$===this.$}catch(c){return!1}};a.setCustomData=function(a,c){var e=this.getUniqueId();(f[e]||(f[e]=
{}))[a]=c;return this};a.getCustomData=function(a){var c=this.$["data-cke-expando"];return(c=c&&f[c])&&a in c?c[a]:null};a.removeCustomData=function(a){var c=this.$["data-cke-expando"],c=c&&f[c],e,m;c&&(e=c[a],m=a in c,delete c[a]);return m?e:null};a.clearCustomData=function(){this.removeAllListeners();var a=this.$["data-cke-expando"];a&&delete f[a]};a.getUniqueId=function(){return this.$["data-cke-expando"]||(this.$["data-cke-expando"]=CKEDITOR.tools.getNextNumber())};CKEDITOR.event.implementOn(a)}(CKEDITOR.dom.domObject.prototype),
CKEDITOR.dom.node=function(a){return a?new CKEDITOR.dom[a.nodeType==CKEDITOR.NODE_DOCUMENT?"document":a.nodeType==CKEDITOR.NODE_ELEMENT?"element":a.nodeType==CKEDITOR.NODE_TEXT?"text":a.nodeType==CKEDITOR.NODE_COMMENT?"comment":a.nodeType==CKEDITOR.NODE_DOCUMENT_FRAGMENT?"documentFragment":"domObject"](a):this},CKEDITOR.dom.node.prototype=new CKEDITOR.dom.domObject,CKEDITOR.NODE_ELEMENT=1,CKEDITOR.NODE_DOCUMENT=9,CKEDITOR.NODE_TEXT=3,CKEDITOR.NODE_COMMENT=8,CKEDITOR.NODE_DOCUMENT_FRAGMENT=11,CKEDITOR.POSITION_IDENTICAL=
0,CKEDITOR.POSITION_DISCONNECTED=1,CKEDITOR.POSITION_FOLLOWING=2,CKEDITOR.POSITION_PRECEDING=4,CKEDITOR.POSITION_IS_CONTAINED=8,CKEDITOR.POSITION_CONTAINS=16,CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype,{appendTo:function(a,f){a.append(this,f);return a},clone:function(a,f){function b(c){c["data-cke-expando"]&&(c["data-cke-expando"]=!1);if(c.nodeType==CKEDITOR.NODE_ELEMENT||c.nodeType==CKEDITOR.NODE_DOCUMENT_FRAGMENT)if(f||c.nodeType!=CKEDITOR.NODE_ELEMENT||c.removeAttribute("id",!1),a){c=c.childNodes;
for(var e=0;e<c.length;e++)b(c[e])}}function c(b){if(b.type==CKEDITOR.NODE_ELEMENT||b.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT){if(b.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT){var e=b.getName();":"==e[0]&&b.renameNode(e.substring(1))}if(a)for(e=0;e<b.getChildCount();e++)c(b.getChild(e))}}var e=this.$.cloneNode(a);b(e);e=new CKEDITOR.dom.node(e);CKEDITOR.env.ie&&9>CKEDITOR.env.version&&(this.type==CKEDITOR.NODE_ELEMENT||this.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT)&&c(e);return e},hasPrevious:function(){return!!this.$.previousSibling},
hasNext:function(){return!!this.$.nextSibling},insertAfter:function(a){a.$.parentNode.insertBefore(this.$,a.$.nextSibling);return a},insertBefore:function(a){a.$.parentNode.insertBefore(this.$,a.$);return a},insertBeforeMe:function(a){this.$.parentNode.insertBefore(a.$,this.$);return a},getAddress:function(a){for(var f=[],b=this.getDocument().$.documentElement,c=this.$;c&&c!=b;){var e=c.parentNode;e&&f.unshift(this.getIndex.call({$:c},a));c=e}return f},getDocument:function(){return new CKEDITOR.dom.document(this.$.ownerDocument||
this.$.parentNode.ownerDocument)},getIndex:function(a){function f(a,d){var h=d?a.nextSibling:a.previousSibling;return h&&h.nodeType==CKEDITOR.NODE_TEXT?b(h)?f(h,d):h:null}function b(a){return!a.nodeValue||a.nodeValue==CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE}var c=this.$,e=-1,m;if(!this.$.parentNode||a&&c.nodeType==CKEDITOR.NODE_TEXT&&b(c)&&!f(c)&&!f(c,!0))return-1;do a&&c!=this.$&&c.nodeType==CKEDITOR.NODE_TEXT&&(m||b(c))||(e++,m=c.nodeType==CKEDITOR.NODE_TEXT);while(c=c.previousSibling);return e},
getNextSourceNode:function(a,f,b){if(b&&!b.call){var c=b;b=function(a){return!a.equals(c)}}a=!a&&this.getFirst&&this.getFirst();var e;if(!a){if(this.type==CKEDITOR.NODE_ELEMENT&&b&&!1===b(this,!0))return null;a=this.getNext()}for(;!a&&(e=(e||this).getParent());){if(b&&!1===b(e,!0))return null;a=e.getNext()}return!a||b&&!1===b(a)?null:f&&f!=a.type?a.getNextSourceNode(!1,f,b):a},getPreviousSourceNode:function(a,f,b){if(b&&!b.call){var c=b;b=function(a){return!a.equals(c)}}a=!a&&this.getLast&&this.getLast();
var e;if(!a){if(this.type==CKEDITOR.NODE_ELEMENT&&b&&!1===b(this,!0))return null;a=this.getPrevious()}for(;!a&&(e=(e||this).getParent());){if(b&&!1===b(e,!0))return null;a=e.getPrevious()}return!a||b&&!1===b(a)?null:f&&a.type!=f?a.getPreviousSourceNode(!1,f,b):a},getPrevious:function(a){var f=this.$,b;do b=(f=f.previousSibling)&&10!=f.nodeType&&new CKEDITOR.dom.node(f);while(b&&a&&!a(b));return b},getNext:function(a){var f=this.$,b;do b=(f=f.nextSibling)&&new CKEDITOR.dom.node(f);while(b&&a&&!a(b));
return b},getParent:function(a){var f=this.$.parentNode;return f&&(f.nodeType==CKEDITOR.NODE_ELEMENT||a&&f.nodeType==CKEDITOR.NODE_DOCUMENT_FRAGMENT)?new CKEDITOR.dom.node(f):null},getParents:function(a){var f=this,b=[];do b[a?"push":"unshift"](f);while(f=f.getParent());return b},getCommonAncestor:function(a){if(a.equals(this))return this;if(a.contains&&a.contains(this))return a;var f=this.contains?this:this.getParent();do if(f.contains(a))return f;while(f=f.getParent());return null},getPosition:function(a){var f=
this.$,b=a.$;if(f.compareDocumentPosition)return f.compareDocumentPosition(b);if(f==b)return CKEDITOR.POSITION_IDENTICAL;if(this.type==CKEDITOR.NODE_ELEMENT&&a.type==CKEDITOR.NODE_ELEMENT){if(f.contains){if(f.contains(b))return CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_PRECEDING;if(b.contains(f))return CKEDITOR.POSITION_IS_CONTAINED+CKEDITOR.POSITION_FOLLOWING}if("sourceIndex"in f)return 0>f.sourceIndex||0>b.sourceIndex?CKEDITOR.POSITION_DISCONNECTED:f.sourceIndex<b.sourceIndex?CKEDITOR.POSITION_PRECEDING:
CKEDITOR.POSITION_FOLLOWING}f=this.getAddress();a=a.getAddress();for(var b=Math.min(f.length,a.length),c=0;c<b;c++)if(f[c]!=a[c])return f[c]<a[c]?CKEDITOR.POSITION_PRECEDING:CKEDITOR.POSITION_FOLLOWING;return f.length<a.length?CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_PRECEDING:CKEDITOR.POSITION_IS_CONTAINED+CKEDITOR.POSITION_FOLLOWING},getAscendant:function(a,f){var b=this.$,c,e;f||(b=b.parentNode);"function"==typeof a?(e=!0,c=a):(e=!1,c=function(b){b="string"==typeof b.nodeName?b.nodeName.toLowerCase():
"";return"string"==typeof a?b==a:b in a});for(;b;){if(c(e?new CKEDITOR.dom.node(b):b))return new CKEDITOR.dom.node(b);try{b=b.parentNode}catch(m){b=null}}return null},hasAscendant:function(a,f){var b=this.$;f||(b=b.parentNode);for(;b;){if(b.nodeName&&b.nodeName.toLowerCase()==a)return!0;b=b.parentNode}return!1},move:function(a,f){a.append(this.remove(),f)},remove:function(a){var f=this.$,b=f.parentNode;if(b){if(a)for(;a=f.firstChild;)b.insertBefore(f.removeChild(a),f);b.removeChild(f)}return this},
replace:function(a){this.insertBefore(a);a.remove()},trim:function(){this.ltrim();this.rtrim()},ltrim:function(){for(var a;this.getFirst&&(a=this.getFirst());){if(a.type==CKEDITOR.NODE_TEXT){var f=CKEDITOR.tools.ltrim(a.getText()),b=a.getLength();if(f)f.length<b&&(a.split(b-f.length),this.$.removeChild(this.$.firstChild));else{a.remove();continue}}break}},rtrim:function(){for(var a;this.getLast&&(a=this.getLast());){if(a.type==CKEDITOR.NODE_TEXT){var f=CKEDITOR.tools.rtrim(a.getText()),b=a.getLength();
if(f)f.length<b&&(a.split(f.length),this.$.lastChild.parentNode.removeChild(this.$.lastChild));else{a.remove();continue}}break}CKEDITOR.env.needsBrFiller&&(a=this.$.lastChild)&&1==a.type&&"br"==a.nodeName.toLowerCase()&&a.parentNode.removeChild(a)},isReadOnly:function(a){var f=this;this.type!=CKEDITOR.NODE_ELEMENT&&(f=this.getParent());CKEDITOR.env.edge&&f&&f.is("textarea","input")&&(a=!0);if(!a&&f&&"undefined"!=typeof f.$.isContentEditable)return!(f.$.isContentEditable||f.data("cke-editable"));for(;f;){if(f.data("cke-editable"))return!1;
if(f.hasAttribute("contenteditable"))return"false"==f.getAttribute("contenteditable");f=f.getParent()}return!0}}),CKEDITOR.dom.window=function(a){CKEDITOR.dom.domObject.call(this,a)},CKEDITOR.dom.window.prototype=new CKEDITOR.dom.domObject,CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype,{focus:function(){this.$.focus()},getViewPaneSize:function(){var a=this.$.document,f="CSS1Compat"==a.compatMode;return{width:(f?a.documentElement.clientWidth:a.body.clientWidth)||0,height:(f?a.documentElement.clientHeight:
a.body.clientHeight)||0}},getScrollPosition:function(){var a=this.$;if("pageXOffset"in a)return{x:a.pageXOffset||0,y:a.pageYOffset||0};a=a.document;return{x:a.documentElement.scrollLeft||a.body.scrollLeft||0,y:a.documentElement.scrollTop||a.body.scrollTop||0}},getFrame:function(){var a=this.$.frameElement;return a?new CKEDITOR.dom.element.get(a):null}}),CKEDITOR.dom.document=function(a){CKEDITOR.dom.domObject.call(this,a)},CKEDITOR.dom.document.prototype=new CKEDITOR.dom.domObject,CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype,
{type:CKEDITOR.NODE_DOCUMENT,appendStyleSheet:function(a){if(this.$.createStyleSheet)this.$.createStyleSheet(a);else{var f=new CKEDITOR.dom.element("link");f.setAttributes({rel:"stylesheet",type:"text/css",href:a});this.getHead().append(f)}},appendStyleText:function(a){if(this.$.createStyleSheet){var f=this.$.createStyleSheet("");f.cssText=a}else{var b=new CKEDITOR.dom.element("style",this);b.append(new CKEDITOR.dom.text(a,this));this.getHead().append(b)}return f||b.$.sheet},createElement:function(a,
f){var b=new CKEDITOR.dom.element(a,this);f&&(f.attributes&&b.setAttributes(f.attributes),f.styles&&b.setStyles(f.styles));return b},createText:function(a){return new CKEDITOR.dom.text(a,this)},focus:function(){this.getWindow().focus()},getActive:function(){var a;try{a=this.$.activeElement}catch(f){return null}return new CKEDITOR.dom.element(a)},getById:function(a){return(a=this.$.getElementById(a))?new CKEDITOR.dom.element(a):null},getByAddress:function(a,f){for(var b=this.$.documentElement,c=0;b&&
c<a.length;c++){var e=a[c];if(f)for(var m=-1,k=0;k<b.childNodes.length;k++){var d=b.childNodes[k];if(!0!==f||3!=d.nodeType||!d.previousSibling||3!=d.previousSibling.nodeType)if(m++,m==e){b=d;break}}else b=b.childNodes[e]}return b?new CKEDITOR.dom.node(b):null},getElementsByTag:function(a,f){CKEDITOR.env.ie&&8>=document.documentMode||!f||(a=f+":"+a);return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(a))},getHead:function(){var a=this.$.getElementsByTagName("head")[0];return a=a?new CKEDITOR.dom.element(a):
this.getDocumentElement().append(new CKEDITOR.dom.element("head"),!0)},getBody:function(){return new CKEDITOR.dom.element(this.$.body)},getDocumentElement:function(){return new CKEDITOR.dom.element(this.$.documentElement)},getWindow:function(){return new CKEDITOR.dom.window(this.$.parentWindow||this.$.defaultView)},write:function(a){this.$.open("text/html","replace");CKEDITOR.env.ie&&(a=a.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i,'$\x26\n\x3cscript data-cke-temp\x3d"1"\x3e('+CKEDITOR.tools.fixDomain+
")();\x3c/script\x3e"));this.$.write(a);this.$.close()},find:function(a){return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(a))},findOne:function(a){return(a=this.$.querySelector(a))?new CKEDITOR.dom.element(a):null},_getHtml5ShivFrag:function(){var a=this.getCustomData("html5ShivFrag");a||(a=this.$.createDocumentFragment(),CKEDITOR.tools.enableHtml5Elements(a,!0),this.setCustomData("html5ShivFrag",a));return a}}),CKEDITOR.dom.nodeList=function(a){this.$=a},CKEDITOR.dom.nodeList.prototype={count:function(){return this.$.length},
getItem:function(a){return 0>a||a>=this.$.length?null:(a=this.$[a])?new CKEDITOR.dom.node(a):null},toArray:function(){return CKEDITOR.tools.array.map(this.$,function(a){return new CKEDITOR.dom.node(a)})}},CKEDITOR.dom.element=function(a,f){"string"==typeof a&&(a=(f?f.$:document).createElement(a));CKEDITOR.dom.domObject.call(this,a)},CKEDITOR.dom.element.get=function(a){return(a="string"==typeof a?document.getElementById(a)||document.getElementsByName(a)[0]:a)&&(a.$?a:new CKEDITOR.dom.element(a))},
CKEDITOR.dom.element.prototype=new CKEDITOR.dom.node,CKEDITOR.dom.element.createFromHtml=function(a,f){var b=new CKEDITOR.dom.element("div",f);b.setHtml(a);return b.getFirst().remove()},CKEDITOR.dom.element.setMarker=function(a,f,b,c){var e=f.getCustomData("list_marker_id")||f.setCustomData("list_marker_id",CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"),m=f.getCustomData("list_marker_names")||f.setCustomData("list_marker_names",{}).getCustomData("list_marker_names");a[e]=f;m[b]=1;
return f.setCustomData(b,c)},CKEDITOR.dom.element.clearAllMarkers=function(a){for(var f in a)CKEDITOR.dom.element.clearMarkers(a,a[f],1)},CKEDITOR.dom.element.clearMarkers=function(a,f,b){var c=f.getCustomData("list_marker_names"),e=f.getCustomData("list_marker_id"),m;for(m in c)f.removeCustomData(m);f.removeCustomData("list_marker_names");b&&(f.removeCustomData("list_marker_id"),delete a[e])},function(){function a(a,b){return-1<(" "+a+" ").replace(m," ").indexOf(" "+b+" ")}function f(a){var b=!0;
a.$.id||(a.$.id="cke_tmp_"+CKEDITOR.tools.getNextNumber(),b=!1);return function(){b||a.removeAttribute("id")}}function b(a,b){var c=CKEDITOR.tools.escapeCss(a.$.id);return"#"+c+" "+b.split(/,\s*/).join(", #"+c+" ")}function c(a){for(var b=0,c=0,g=k[a].length;c<g;c++)b+=parseFloat(this.getComputedStyle(k[a][c])||0,10)||0;return b}var e=document.createElement("_").classList,e="undefined"!==typeof e&&null!==String(e.add).match(/\[Native code\]/gi),m=/[\n\t\r]/g;CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype,
{type:CKEDITOR.NODE_ELEMENT,addClass:e?function(a){this.$.classList.add(a);return this}:function(d){var b=this.$.className;b&&(a(b,d)||(b+=" "+d));this.$.className=b||d;return this},removeClass:e?function(a){var b=this.$;b.classList.remove(a);b.className||b.removeAttribute("class");return this}:function(d){var b=this.getAttribute("class");b&&a(b,d)&&((b=b.replace(new RegExp("(?:^|\\s+)"+d+"(?\x3d\\s|$)"),"").replace(/^\s+/,""))?this.setAttribute("class",b):this.removeAttribute("class"));return this},
hasClass:function(d){return a(this.$.className,d)},append:function(a,b){"string"==typeof a&&(a=this.getDocument().createElement(a));b?this.$.insertBefore(a.$,this.$.firstChild):this.$.appendChild(a.$);return a},appendHtml:function(a){if(this.$.childNodes.length){var b=new CKEDITOR.dom.element("div",this.getDocument());b.setHtml(a);b.moveChildren(this)}else this.setHtml(a)},appendText:function(a){null!=this.$.text&&CKEDITOR.env.ie&&9>CKEDITOR.env.version?this.$.text+=a:this.append(new CKEDITOR.dom.text(a))},
appendBogus:function(a){if(a||CKEDITOR.env.needsBrFiller){for(a=this.getLast();a&&a.type==CKEDITOR.NODE_TEXT&&!CKEDITOR.tools.rtrim(a.getText());)a=a.getPrevious();a&&a.is&&a.is("br")||(a=this.getDocument().createElement("br"),CKEDITOR.env.gecko&&a.setAttribute("type","_moz"),this.append(a))}},breakParent:function(a,b){var c=new CKEDITOR.dom.range(this.getDocument());c.setStartAfter(this);c.setEndAfter(a);var g=c.extractContents(!1,b||!1),e;c.insertNode(this.remove());if(CKEDITOR.env.ie&&!CKEDITOR.env.edge){for(c=
new CKEDITOR.dom.element("div");e=g.getFirst();)e.$.style.backgroundColor&&(e.$.style.backgroundColor=e.$.style.backgroundColor),c.append(e);c.insertAfter(this);c.remove(!0)}else g.insertAfterNode(this)},contains:document.compareDocumentPosition?function(a){return!!(this.$.compareDocumentPosition(a.$)&16)}:function(a){var b=this.$;return a.type!=CKEDITOR.NODE_ELEMENT?b.contains(a.getParent().$):b!=a.$&&b.contains(a.$)},focus:function(){function a(){try{this.$.focus()}catch(d){}}return function(b){b?
CKEDITOR.tools.setTimeout(a,100,this):a.call(this)}}(),getHtml:function(){var a=this.$.innerHTML;return CKEDITOR.env.ie?a.replace(/<\?[^>]*>/g,""):a},getOuterHtml:function(){if(this.$.outerHTML)return this.$.outerHTML.replace(/<\?[^>]*>/,"");var a=this.$.ownerDocument.createElement("div");a.appendChild(this.$.cloneNode(!0));return a.innerHTML},getClientRect:function(){var a=CKEDITOR.tools.extend({},this.$.getBoundingClientRect());!a.width&&(a.width=a.right-a.left);!a.height&&(a.height=a.bottom-a.top);
return a},setHtml:CKEDITOR.env.ie&&9>CKEDITOR.env.version?function(a){try{var b=this.$;if(this.getParent())return b.innerHTML=a;var c=this.getDocument()._getHtml5ShivFrag();c.appendChild(b);b.innerHTML=a;c.removeChild(b);return a}catch(g){this.$.innerHTML="";b=new CKEDITOR.dom.element("body",this.getDocument());b.$.innerHTML=a;for(b=b.getChildren();b.count();)this.append(b.getItem(0));return a}}:function(a){return this.$.innerHTML=a},setText:function(){var a=document.createElement("p");a.innerHTML=
"x";a=a.textContent;return function(b){this.$[a?"textContent":"innerText"]=b}}(),getAttribute:function(){var a=function(a){return this.$.getAttribute(a,2)};return CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)?function(a){switch(a){case "class":a="className";break;case "http-equiv":a="httpEquiv";break;case "name":return this.$.name;case "tabindex":return a=this.$.getAttribute(a,2),0!==a&&0===this.$.tabIndex&&(a=null),a;case "checked":return a=this.$.attributes.getNamedItem(a),(a.specified?
a.nodeValue:this.$.checked)?"checked":null;case "hspace":case "value":return this.$[a];case "style":return this.$.style.cssText;case "contenteditable":case "contentEditable":return this.$.attributes.getNamedItem("contentEditable").specified?this.$.getAttribute("contentEditable"):null}return this.$.getAttribute(a,2)}:a}(),getAttributes:function(a){var b={},c=this.$.attributes,g;a=CKEDITOR.tools.isArray(a)?a:[];for(g=0;g<c.length;g++)-1===CKEDITOR.tools.indexOf(a,c[g].name)&&(b[c[g].name]=c[g].value);
return b},getChildren:function(){return new CKEDITOR.dom.nodeList(this.$.childNodes)},getComputedStyle:document.defaultView&&document.defaultView.getComputedStyle?function(a){var b=this.getWindow().$.getComputedStyle(this.$,null);return b?b.getPropertyValue(a):""}:function(a){return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(a)]},getDtd:function(){var a=CKEDITOR.dtd[this.getName()];this.getDtd=function(){return a};return a},getElementsByTag:CKEDITOR.dom.document.prototype.getElementsByTag,
getTabIndex:function(){var a=this.$.tabIndex;return 0!==a||CKEDITOR.dtd.$tabIndex[this.getName()]||0===parseInt(this.getAttribute("tabindex"),10)?a:-1},getText:function(){return this.$.textContent||this.$.innerText||""},getWindow:function(){return this.getDocument().getWindow()},getId:function(){return this.$.id||null},getNameAtt:function(){return this.$.name||null},getName:function(){var a=this.$.nodeName.toLowerCase();if(CKEDITOR.env.ie&&8>=document.documentMode){var b=this.$.scopeName;"HTML"!=
b&&(a=b.toLowerCase()+":"+a)}this.getName=function(){return a};return this.getName()},getValue:function(){return this.$.value},getFirst:function(a){var b=this.$.firstChild;(b=b&&new CKEDITOR.dom.node(b))&&a&&!a(b)&&(b=b.getNext(a));return b},getLast:function(a){var b=this.$.lastChild;(b=b&&new CKEDITOR.dom.node(b))&&a&&!a(b)&&(b=b.getPrevious(a));return b},getStyle:function(a){return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)]},is:function(){var a=this.getName();if("object"==typeof arguments[0])return!!arguments[0][a];
for(var b=0;b<arguments.length;b++)if(arguments[b]==a)return!0;return!1},isEditable:function(a){var b=this.getName();return this.isReadOnly()||"none"==this.getComputedStyle("display")||"hidden"==this.getComputedStyle("visibility")||CKEDITOR.dtd.$nonEditable[b]||CKEDITOR.dtd.$empty[b]||this.is("a")&&(this.data("cke-saved-name")||this.hasAttribute("name"))&&!this.getChildCount()?!1:!1!==a?(a=CKEDITOR.dtd[b]||CKEDITOR.dtd.span,!(!a||!a["#"])):!0},isIdentical:function(a){var b=this.clone(0,1);a=a.clone(0,
1);b.removeAttributes(["_moz_dirty","data-cke-expando","data-cke-saved-href","data-cke-saved-name"]);a.removeAttributes(["_moz_dirty","data-cke-expando","data-cke-saved-href","data-cke-saved-name"]);if(b.$.isEqualNode)return b.$.style.cssText=CKEDITOR.tools.normalizeCssText(b.$.style.cssText),a.$.style.cssText=CKEDITOR.tools.normalizeCssText(a.$.style.cssText),b.$.isEqualNode(a.$);b=b.getOuterHtml();a=a.getOuterHtml();if(CKEDITOR.env.ie&&9>CKEDITOR.env.version&&this.is("a")){var c=this.getParent();
c.type==CKEDITOR.NODE_ELEMENT&&(c=c.clone(),c.setHtml(b),b=c.getHtml(),c.setHtml(a),a=c.getHtml())}return b==a},isVisible:function(){var a=(this.$.offsetHeight||this.$.offsetWidth)&&"hidden"!=this.getComputedStyle("visibility"),b,c;a&&CKEDITOR.env.webkit&&(b=this.getWindow(),!b.equals(CKEDITOR.document.getWindow())&&(c=b.$.frameElement)&&(a=(new CKEDITOR.dom.element(c)).isVisible()));return!!a},isEmptyInlineRemoveable:function(){if(!CKEDITOR.dtd.$removeEmpty[this.getName()])return!1;for(var a=this.getChildren(),
b=0,c=a.count();b<c;b++){var g=a.getItem(b);if(g.type!=CKEDITOR.NODE_ELEMENT||!g.data("cke-bookmark"))if(g.type==CKEDITOR.NODE_ELEMENT&&!g.isEmptyInlineRemoveable()||g.type==CKEDITOR.NODE_TEXT&&CKEDITOR.tools.trim(g.getText()))return!1}return!0},hasAttributes:CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)?function(){for(var a=this.$.attributes,b=0;b<a.length;b++){var c=a[b];switch(c.nodeName){case "class":if(this.getAttribute("class"))return!0;case "data-cke-expando":continue;default:if(c.specified)return!0}}return!1}:
function(){var a=this.$.attributes,b=a.length,c={"data-cke-expando":1,_moz_dirty:1};return 0<b&&(2<b||!c[a[0].nodeName]||2==b&&!c[a[1].nodeName])},hasAttribute:function(){function a(b){var d=this.$.attributes.getNamedItem(b);if("input"==this.getName())switch(b){case "class":return 0<this.$.className.length;case "checked":return!!this.$.checked;case "value":return b=this.getAttribute("type"),"checkbox"==b||"radio"==b?"on"!=this.$.value:!!this.$.value}return d?d.specified:!1}return CKEDITOR.env.ie?
8>CKEDITOR.env.version?function(b){return"name"==b?!!this.$.name:a.call(this,b)}:a:function(a){return!!this.$.attributes.getNamedItem(a)}}(),hide:function(){this.setStyle("display","none")},moveChildren:function(a,b){var c=this.$;a=a.$;if(c!=a){var g;if(b)for(;g=c.lastChild;)a.insertBefore(c.removeChild(g),a.firstChild);else for(;g=c.firstChild;)a.appendChild(c.removeChild(g))}},mergeSiblings:function(){function a(b,d,g){if(d&&d.type==CKEDITOR.NODE_ELEMENT){for(var c=[];d.data("cke-bookmark")||d.isEmptyInlineRemoveable();)if(c.push(d),
d=g?d.getNext():d.getPrevious(),!d||d.type!=CKEDITOR.NODE_ELEMENT)return;if(b.isIdentical(d)){for(var e=g?b.getLast():b.getFirst();c.length;)c.shift().move(b,!g);d.moveChildren(b,!g);d.remove();e&&e.type==CKEDITOR.NODE_ELEMENT&&e.mergeSiblings()}}}return function(b){if(!1===b||CKEDITOR.dtd.$removeEmpty[this.getName()]||this.is("a"))a(this,this.getNext(),!0),a(this,this.getPrevious())}}(),show:function(){this.setStyles({display:"",visibility:""})},setAttribute:function(){var a=function(a,b){this.$.setAttribute(a,
b);return this};return CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)?function(b,c){"class"==b?this.$.className=c:"style"==b?this.$.style.cssText=c:"tabindex"==b?this.$.tabIndex=c:"checked"==b?this.$.checked=c:"contenteditable"==b?a.call(this,"contentEditable",c):a.apply(this,arguments);return this}:CKEDITOR.env.ie8Compat&&CKEDITOR.env.secure?function(b,c){if("src"==b&&c.match(/^http:\/\//))try{a.apply(this,arguments)}catch(g){}else a.apply(this,arguments);return this}:a}(),setAttributes:function(a){for(var b in a)this.setAttribute(b,
a[b]);return this},setValue:function(a){this.$.value=a;return this},removeAttribute:function(){var a=function(a){this.$.removeAttribute(a)};return CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)?function(a){"class"==a?a="className":"tabindex"==a?a="tabIndex":"contenteditable"==a&&(a="contentEditable");this.$.removeAttribute(a)}:a}(),removeAttributes:function(a){if(CKEDITOR.tools.isArray(a))for(var b=0;b<a.length;b++)this.removeAttribute(a[b]);else for(b in a=a||this.getAttributes(),
a)a.hasOwnProperty(b)&&this.removeAttribute(b)},removeStyle:function(a){var b=this.$.style;if(b.removeProperty||"border"!=a&&"margin"!=a&&"padding"!=a)b.removeProperty?b.removeProperty(a):b.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(a)),this.$.style.cssText||this.removeAttribute("style");else{var c=["top","left","right","bottom"],g;"border"==a&&(g=["color","style","width"]);for(var b=[],e=0;e<c.length;e++)if(g)for(var f=0;f<g.length;f++)b.push([a,c[e],g[f]].join("-"));else b.push([a,c[e]].join("-"));
for(a=0;a<b.length;a++)this.removeStyle(b[a])}},setStyle:function(a,b){this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)]=b;return this},setStyles:function(a){for(var b in a)this.setStyle(b,a[b]);return this},setOpacity:function(a){CKEDITOR.env.ie&&9>CKEDITOR.env.version?(a=Math.round(100*a),this.setStyle("filter",100<=a?"":"progid:DXImageTransform.Microsoft.Alpha(opacity\x3d"+a+")")):this.setStyle("opacity",a)},unselectable:function(){this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select","none"));
if(CKEDITOR.env.ie){this.setAttribute("unselectable","on");for(var a,b=this.getElementsByTag("*"),c=0,g=b.count();c<g;c++)a=b.getItem(c),a.setAttribute("unselectable","on")}},getPositionedAncestor:function(){for(var a=this;"html"!=a.getName();){if("static"!=a.getComputedStyle("position"))return a;a=a.getParent()}return null},getDocumentPosition:function(a){var b=0,c=0,g=this.getDocument(),e=g.getBody(),f="BackCompat"==g.$.compatMode;if(document.documentElement.getBoundingClientRect&&(CKEDITOR.env.ie?
8!==CKEDITOR.env.version:1)){var m=this.$.getBoundingClientRect(),k=g.$.documentElement,w=k.clientTop||e.$.clientTop||0,q=k.clientLeft||e.$.clientLeft||0,x=!0;CKEDITOR.env.ie&&(x=g.getDocumentElement().contains(this),g=g.getBody().contains(this),x=f&&g||!f&&x);x&&(CKEDITOR.env.webkit||CKEDITOR.env.ie&&12<=CKEDITOR.env.version?(b=e.$.scrollLeft||k.scrollLeft,c=e.$.scrollTop||k.scrollTop):(c=f?e.$:k,b=c.scrollLeft,c=c.scrollTop),b=m.left+b-q,c=m.top+c-w)}else for(w=this,q=null;w&&"body"!=w.getName()&&
"html"!=w.getName();){b+=w.$.offsetLeft-w.$.scrollLeft;c+=w.$.offsetTop-w.$.scrollTop;w.equals(this)||(b+=w.$.clientLeft||0,c+=w.$.clientTop||0);for(;q&&!q.equals(w);)b-=q.$.scrollLeft,c-=q.$.scrollTop,q=q.getParent();q=w;w=(m=w.$.offsetParent)?new CKEDITOR.dom.element(m):null}a&&(m=this.getWindow(),w=a.getWindow(),!m.equals(w)&&m.$.frameElement&&(a=(new CKEDITOR.dom.element(m.$.frameElement)).getDocumentPosition(a),b+=a.x,c+=a.y));document.documentElement.getBoundingClientRect||!CKEDITOR.env.gecko||
f||(b+=this.$.clientLeft?1:0,c+=this.$.clientTop?1:0);return{x:b,y:c}},scrollIntoView:function(a){var b=this.getParent();if(b){do if((b.$.clientWidth&&b.$.clientWidth<b.$.scrollWidth||b.$.clientHeight&&b.$.clientHeight<b.$.scrollHeight)&&!b.is("body")&&this.scrollIntoParent(b,a,1),b.is("html")){var c=b.getWindow();try{var g=c.$.frameElement;g&&(b=new CKEDITOR.dom.element(g))}catch(e){}}while(b=b.getParent())}},scrollIntoParent:function(a,b,c){var g,e,f,m;function k(b,g){/body|html/.test(a.getName())?
a.getWindow().$.scrollBy(b,g):(a.$.scrollLeft+=b,a.$.scrollTop+=g)}function w(a,b){var g={x:0,y:0};if(!a.is(x?"body":"html")){var c=a.$.getBoundingClientRect();g.x=c.left;g.y=c.top}c=a.getWindow();c.equals(b)||(c=w(CKEDITOR.dom.element.get(c.$.frameElement),b),g.x+=c.x,g.y+=c.y);return g}function q(a,b){return parseInt(a.getComputedStyle("margin-"+b)||0,10)||0}!a&&(a=this.getWindow());f=a.getDocument();var x="BackCompat"==f.$.compatMode;a instanceof CKEDITOR.dom.window&&(a=x?f.getBody():f.getDocumentElement());
CKEDITOR.env.webkit&&(f=this.getEditor(!1))&&(f._.previousScrollTop=null);f=a.getWindow();e=w(this,f);var r=w(a,f),A=this.$.offsetHeight;g=this.$.offsetWidth;var t=a.$.clientHeight,y=a.$.clientWidth;f=e.x-q(this,"left")-r.x||0;m=e.y-q(this,"top")-r.y||0;g=e.x+g+q(this,"right")-(r.x+y)||0;e=e.y+A+q(this,"bottom")-(r.y+t)||0;(0>m||0<e)&&k(0,!0===b?m:!1===b?e:0>m?m:e);c&&(0>f||0<g)&&k(0>f?f:g,0)},setState:function(a,b,c){b=b||"cke";switch(a){case CKEDITOR.TRISTATE_ON:this.addClass(b+"_on");this.removeClass(b+
"_off");this.removeClass(b+"_disabled");c&&this.setAttribute("aria-pressed",!0);c&&this.removeAttribute("aria-disabled");break;case CKEDITOR.TRISTATE_DISABLED:this.addClass(b+"_disabled");this.removeClass(b+"_off");this.removeClass(b+"_on");c&&this.setAttribute("aria-disabled",!0);c&&this.removeAttribute("aria-pressed");break;default:this.addClass(b+"_off"),this.removeClass(b+"_on"),this.removeClass(b+"_disabled"),c&&this.removeAttribute("aria-pressed"),c&&this.removeAttribute("aria-disabled")}},
getFrameDocument:function(){var a=this.$;try{a.contentWindow.document}catch(b){a.src=a.src}return a&&new CKEDITOR.dom.document(a.contentWindow.document)},copyAttributes:function(a,b){var c=this.$.attributes;b=b||{};for(var g=0;g<c.length;g++){var e=c[g],f=e.nodeName.toLowerCase(),m;if(!(f in b))if("checked"==f&&(m=this.getAttribute(f)))a.setAttribute(f,m);else if(!CKEDITOR.env.ie||this.hasAttribute(f))m=this.getAttribute(f),null===m&&(m=e.nodeValue),a.setAttribute(f,m)}""!==this.$.style.cssText&&
(a.$.style.cssText=this.$.style.cssText)},renameNode:function(a){if(this.getName()!=a){var b=this.getDocument();a=new CKEDITOR.dom.element(a,b);this.copyAttributes(a);this.moveChildren(a);this.getParent(!0)&&this.$.parentNode.replaceChild(a.$,this.$);a.$["data-cke-expando"]=this.$["data-cke-expando"];this.$=a.$;delete this.getName}},getChild:function(){function a(b,c){var g=b.childNodes;if(0<=c&&c<g.length)return g[c]}return function(b){var c=this.$;if(b.slice)for(b=b.slice();0<b.length&&c;)c=a(c,
b.shift());else c=a(c,b);return c?new CKEDITOR.dom.node(c):null}}(),getChildCount:function(){return this.$.childNodes.length},disableContextMenu:function(){function a(b){return b.type==CKEDITOR.NODE_ELEMENT&&b.hasClass("cke_enable_context_menu")}this.on("contextmenu",function(b){b.data.getTarget().getAscendant(a,!0)||b.data.preventDefault()})},getDirection:function(a){return a?this.getComputedStyle("direction")||this.getDirection()||this.getParent()&&this.getParent().getDirection(1)||this.getDocument().$.dir||
"ltr":this.getStyle("direction")||this.getAttribute("dir")},data:function(a,b){a="data-"+a;if(void 0===b)return this.getAttribute(a);!1===b?this.removeAttribute(a):this.setAttribute(a,b);return null},getEditor:function(a){var b=CKEDITOR.instances,c,g,e;a=a||void 0===a;for(c in b)if(g=b[c],g.element.equals(this)&&g.elementMode!=CKEDITOR.ELEMENT_MODE_APPENDTO||!a&&(e=g.editable())&&(e.equals(this)||e.contains(this)))return g;return null},find:function(a){var c=f(this);a=new CKEDITOR.dom.nodeList(this.$.querySelectorAll(b(this,
a)));c();return a},findOne:function(a){var c=f(this);a=this.$.querySelector(b(this,a));c();return a?new CKEDITOR.dom.element(a):null},forEach:function(a,b,c){if(!(c||b&&this.type!=b))var g=a(this);if(!1!==g){c=this.getChildren();for(var e=0;e<c.count();e++)g=c.getItem(e),g.type==CKEDITOR.NODE_ELEMENT?g.forEach(a,b):b&&g.type!=b||a(g)}}});var k={width:["border-left-width","border-right-width","padding-left","padding-right"],height:["border-top-width","border-bottom-width","padding-top","padding-bottom"]};
CKEDITOR.dom.element.prototype.setSize=function(a,b,e){"number"==typeof b&&(!e||CKEDITOR.env.ie&&CKEDITOR.env.quirks||(b-=c.call(this,a)),this.setStyle(a,b+"px"))};CKEDITOR.dom.element.prototype.getSize=function(a,b){var e=Math.max(this.$["offset"+CKEDITOR.tools.capitalize(a)],this.$["client"+CKEDITOR.tools.capitalize(a)])||0;b&&(e-=c.call(this,a));return e}}(),CKEDITOR.dom.documentFragment=function(a){a=a||CKEDITOR.document;this.$=a.type==CKEDITOR.NODE_DOCUMENT?a.$.createDocumentFragment():a},CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype,
CKEDITOR.dom.element.prototype,{type:CKEDITOR.NODE_DOCUMENT_FRAGMENT,insertAfterNode:function(a){a=a.$;a.parentNode.insertBefore(this.$,a.nextSibling)},getHtml:function(){var a=new CKEDITOR.dom.element("div");this.clone(1,1).appendTo(a);return a.getHtml().replace(/\s*data-cke-expando=".*?"/g,"")}},!0,{append:1,appendBogus:1,clone:1,getFirst:1,getHtml:1,getLast:1,getParent:1,getNext:1,getPrevious:1,appendTo:1,moveChildren:1,insertBefore:1,insertAfterNode:1,replace:1,trim:1,type:1,ltrim:1,rtrim:1,getDocument:1,
getChildCount:1,getChild:1,getChildren:1}),function(){function a(a,b){var g=this.range;if(this._.end)return null;if(!this._.start){this._.start=1;if(g.collapsed)return this.end(),null;g.optimize()}var c,d=g.startContainer;c=g.endContainer;var e=g.startOffset,f=g.endOffset,l,h=this.guard,n=this.type,m=a?"getPreviousSourceNode":"getNextSourceNode";if(!a&&!this._.guardLTR){var k=c.type==CKEDITOR.NODE_ELEMENT?c:c.getParent(),B=c.type==CKEDITOR.NODE_ELEMENT?c.getChild(f):c.getNext();this._.guardLTR=function(a,
b){return(!b||!k.equals(a))&&(!B||!a.equals(B))&&(a.type!=CKEDITOR.NODE_ELEMENT||!b||!a.equals(g.root))}}if(a&&!this._.guardRTL){var H=d.type==CKEDITOR.NODE_ELEMENT?d:d.getParent(),G=d.type==CKEDITOR.NODE_ELEMENT?e?d.getChild(e-1):null:d.getPrevious();this._.guardRTL=function(a,b){return(!b||!H.equals(a))&&(!G||!a.equals(G))&&(a.type!=CKEDITOR.NODE_ELEMENT||!b||!a.equals(g.root))}}var E=a?this._.guardRTL:this._.guardLTR;l=h?function(a,b){return!1===E(a,b)?!1:h(a,b)}:E;this.current?c=this.current[m](!1,
n,l):(a?c.type==CKEDITOR.NODE_ELEMENT&&(c=0<f?c.getChild(f-1):!1===l(c,!0)?null:c.getPreviousSourceNode(!0,n,l)):(c=d,c.type==CKEDITOR.NODE_ELEMENT&&((c=c.getChild(e))||(c=!1===l(d,!0)?null:d.getNextSourceNode(!0,n,l)))),c&&!1===l(c)&&(c=null));for(;c&&!this._.end;){this.current=c;if(!this.evaluator||!1!==this.evaluator(c)){if(!b)return c}else if(b&&this.evaluator)return!1;c=c[m](!1,n,l)}this.end();return this.current=null}function f(b){for(var g,c=null;g=a.call(this,b);)c=g;return c}CKEDITOR.dom.walker=
CKEDITOR.tools.createClass({$:function(a){this.range=a;this._={}},proto:{end:function(){this._.end=1},next:function(){return a.call(this)},previous:function(){return a.call(this,1)},checkForward:function(){return!1!==a.call(this,0,1)},checkBackward:function(){return!1!==a.call(this,1,1)},lastForward:function(){return f.call(this)},lastBackward:function(){return f.call(this,1)},reset:function(){delete this.current;this._={}}}});var b={block:1,"list-item":1,table:1,"table-row-group":1,"table-header-group":1,
"table-footer-group":1,"table-row":1,"table-column-group":1,"table-column":1,"table-cell":1,"table-caption":1},c={absolute:1,fixed:1};CKEDITOR.dom.element.prototype.isBlockBoundary=function(a){return"none"!=this.getComputedStyle("float")||this.getComputedStyle("position")in c||!b[this.getComputedStyle("display")]?!!(this.is(CKEDITOR.dtd.$block)||a&&this.is(a)):!0};CKEDITOR.dom.walker.blockBoundary=function(a){return function(b){return!(b.type==CKEDITOR.NODE_ELEMENT&&b.isBlockBoundary(a))}};CKEDITOR.dom.walker.listItemBoundary=
function(){return this.blockBoundary({br:1})};CKEDITOR.dom.walker.bookmark=function(a,b){function g(a){return a&&a.getName&&"span"==a.getName()&&a.data("cke-bookmark")}return function(c){var d,e;d=c&&c.type!=CKEDITOR.NODE_ELEMENT&&(e=c.getParent())&&g(e);d=a?d:d||g(c);return!!(b^d)}};CKEDITOR.dom.walker.whitespaces=function(a){return function(b){var g;b&&b.type==CKEDITOR.NODE_TEXT&&(g=!CKEDITOR.tools.trim(b.getText())||CKEDITOR.env.webkit&&b.getText()==CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE);
return!!(a^g)}};CKEDITOR.dom.walker.invisible=function(a){var b=CKEDITOR.dom.walker.whitespaces(),g=CKEDITOR.env.webkit?1:0;return function(c){b(c)?c=1:(c.type==CKEDITOR.NODE_TEXT&&(c=c.getParent()),c=c.$.offsetWidth<=g);return!!(a^c)}};CKEDITOR.dom.walker.nodeType=function(a,b){return function(g){return!!(b^g.type==a)}};CKEDITOR.dom.walker.bogus=function(a){function b(a){return!m(a)&&!k(a)}return function(g){var c=CKEDITOR.env.needsBrFiller?g.is&&g.is("br"):g.getText&&e.test(g.getText());c&&(c=g.getParent(),
g=g.getNext(b),c=c.isBlockBoundary()&&(!g||g.type==CKEDITOR.NODE_ELEMENT&&g.isBlockBoundary()));return!!(a^c)}};CKEDITOR.dom.walker.temp=function(a){return function(b){b.type!=CKEDITOR.NODE_ELEMENT&&(b=b.getParent());b=b&&b.hasAttribute("data-cke-temp");return!!(a^b)}};var e=/^[\t\r\n ]*(?:&nbsp;|\xa0)$/,m=CKEDITOR.dom.walker.whitespaces(),k=CKEDITOR.dom.walker.bookmark(),d=CKEDITOR.dom.walker.temp(),h=function(a){return k(a)||m(a)||a.type==CKEDITOR.NODE_ELEMENT&&a.is(CKEDITOR.dtd.$inline)&&!a.is(CKEDITOR.dtd.$empty)};
CKEDITOR.dom.walker.ignored=function(a){return function(b){b=m(b)||k(b)||d(b);return!!(a^b)}};var l=CKEDITOR.dom.walker.ignored();CKEDITOR.dom.walker.empty=function(a){return function(b){for(var g=0,c=b.getChildCount();g<c;++g)if(!l(b.getChild(g)))return!!a;return!a}};var g=CKEDITOR.dom.walker.empty(),n=CKEDITOR.dom.walker.validEmptyBlockContainers=CKEDITOR.tools.extend(function(a){var b={},g;for(g in a)CKEDITOR.dtd[g]["#"]&&(b[g]=1);return b}(CKEDITOR.dtd.$block),{caption:1,td:1,th:1});CKEDITOR.dom.walker.editable=
function(a){return function(b){b=l(b)?!1:b.type==CKEDITOR.NODE_TEXT||b.type==CKEDITOR.NODE_ELEMENT&&(b.is(CKEDITOR.dtd.$inline)||b.is("hr")||"false"==b.getAttribute("contenteditable")||!CKEDITOR.env.needsBrFiller&&b.is(n)&&g(b))?!0:!1;return!!(a^b)}};CKEDITOR.dom.element.prototype.getBogus=function(){var a=this;do a=a.getPreviousSourceNode();while(h(a));return a&&(CKEDITOR.env.needsBrFiller?a.is&&a.is("br"):a.getText&&e.test(a.getText()))?a:!1}}(),CKEDITOR.dom.range=function(a){this.endOffset=this.endContainer=
this.startOffset=this.startContainer=null;this.collapsed=!0;var f=a instanceof CKEDITOR.dom.document;this.document=f?a:a.getDocument();this.root=f?a.getBody():a},function(){function a(a){a.collapsed=a.startContainer&&a.endContainer&&a.startContainer.equals(a.endContainer)&&a.startOffset==a.endOffset}function f(a,b,c,d,e){function f(a,b,g,c){var d=g?a.getPrevious():a.getNext();if(c&&m)return d;t||c?b.append(a.clone(!0,e),g):(a.remove(),k&&b.append(a,g));return d}function l(){var a,b,g,c=Math.min(J.length,
D.length);for(a=0;a<c;a++)if(b=J[a],g=D[a],!b.equals(g))return a;return a-1}function h(){var b=Q-1,c=E&&I&&!y.equals(v);b<N-1||b<R-1||c?(c?a.moveToPosition(v,CKEDITOR.POSITION_BEFORE_START):R==b+1&&G?a.moveToPosition(D[b],CKEDITOR.POSITION_BEFORE_END):a.moveToPosition(D[b+1],CKEDITOR.POSITION_BEFORE_START),d&&(b=J[b+1])&&b.type==CKEDITOR.NODE_ELEMENT&&(c=CKEDITOR.dom.element.createFromHtml('\x3cspan data-cke-bookmark\x3d"1" style\x3d"display:none"\x3e\x26nbsp;\x3c/span\x3e',a.document),c.insertAfter(b),
b.mergeSiblings(!1),a.moveToBookmark({startNode:c}))):a.collapse(!0)}a.optimizeBookmark();var m=0===b,k=1==b,t=2==b;b=t||k;var y=a.startContainer,v=a.endContainer,z=a.startOffset,B=a.endOffset,H,G,E,I,F,K;if(t&&v.type==CKEDITOR.NODE_TEXT&&(y.equals(v)||y.type===CKEDITOR.NODE_ELEMENT&&y.getFirst().equals(v)))c.append(a.document.createText(v.substring(z,B)));else{v.type==CKEDITOR.NODE_TEXT?t?K=!0:v=v.split(B):0<v.getChildCount()?B>=v.getChildCount()?(v=v.getChild(B-1),G=!0):v=v.getChild(B):I=G=!0;y.type==
CKEDITOR.NODE_TEXT?t?F=!0:y.split(z):0<y.getChildCount()?0===z?(y=y.getChild(z),H=!0):y=y.getChild(z-1):E=H=!0;for(var J=y.getParents(),D=v.getParents(),Q=l(),N=J.length-1,R=D.length-1,L=c,U,ca,ba,fa=-1,O=Q;O<=N;O++){ca=J[O];ba=ca.getNext();for(O!=N||ca.equals(D[O])&&N<R?b&&(U=L.append(ca.clone(0,e))):H?f(ca,L,!1,E):F&&L.append(a.document.createText(ca.substring(z)));ba;){if(ba.equals(D[O])){fa=O;break}ba=f(ba,L)}L=U}L=c;for(O=Q;O<=R;O++)if(c=D[O],ba=c.getPrevious(),c.equals(J[O]))b&&(L=L.getChild(0));
else{O!=R||c.equals(J[O])&&R<N?b&&(U=L.append(c.clone(0,e))):G?f(c,L,!1,I):K&&L.append(a.document.createText(c.substring(0,B)));if(O>fa)for(;ba;)ba=f(ba,L,!0);L=U}t||h()}}function b(){var a=!1,b=CKEDITOR.dom.walker.whitespaces(),c=CKEDITOR.dom.walker.bookmark(!0),d=CKEDITOR.dom.walker.bogus();return function(e){return c(e)||b(e)?!0:d(e)&&!a?a=!0:e.type==CKEDITOR.NODE_TEXT&&(e.hasAscendant("pre")||CKEDITOR.tools.trim(e.getText()).length)||e.type==CKEDITOR.NODE_ELEMENT&&!e.is(m)?!1:!0}}function c(a){var b=
CKEDITOR.dom.walker.whitespaces(),c=CKEDITOR.dom.walker.bookmark(1);return function(d){return c(d)||b(d)?!0:!a&&k(d)||d.type==CKEDITOR.NODE_ELEMENT&&d.is(CKEDITOR.dtd.$removeEmpty)}}function e(a){return function(){var b;return this[a?"getPreviousNode":"getNextNode"](function(a){!b&&l(a)&&(b=a);return h(a)&&!(k(a)&&a.equals(b))})}}var m={abbr:1,acronym:1,b:1,bdo:1,big:1,cite:1,code:1,del:1,dfn:1,em:1,font:1,i:1,ins:1,label:1,kbd:1,q:1,samp:1,small:1,span:1,strike:1,strong:1,sub:1,sup:1,tt:1,u:1,"var":1},
k=CKEDITOR.dom.walker.bogus(),d=/^[\t\r\n ]*(?:&nbsp;|\xa0)$/,h=CKEDITOR.dom.walker.editable(),l=CKEDITOR.dom.walker.ignored(!0);CKEDITOR.dom.range.prototype={clone:function(){var a=new CKEDITOR.dom.range(this.root);a._setStartContainer(this.startContainer);a.startOffset=this.startOffset;a._setEndContainer(this.endContainer);a.endOffset=this.endOffset;a.collapsed=this.collapsed;return a},collapse:function(a){a?(this._setEndContainer(this.startContainer),this.endOffset=this.startOffset):(this._setStartContainer(this.endContainer),
this.startOffset=this.endOffset);this.collapsed=!0},cloneContents:function(a){var b=new CKEDITOR.dom.documentFragment(this.document);this.collapsed||f(this,2,b,!1,"undefined"==typeof a?!0:a);return b},deleteContents:function(a){this.collapsed||f(this,0,null,a)},extractContents:function(a,b){var c=new CKEDITOR.dom.documentFragment(this.document);this.collapsed||f(this,1,c,a,"undefined"==typeof b?!0:b);return c},createBookmark:function(a){var b,c,d,e,f=this.collapsed;b=this.document.createElement("span");
b.data("cke-bookmark",1);b.setStyle("display","none");b.setHtml("\x26nbsp;");a&&(d="cke_bm_"+CKEDITOR.tools.getNextNumber(),b.setAttribute("id",d+(f?"C":"S")));f||(c=b.clone(),c.setHtml("\x26nbsp;"),a&&c.setAttribute("id",d+"E"),e=this.clone(),e.collapse(),e.insertNode(c));e=this.clone();e.collapse(!0);e.insertNode(b);c?(this.setStartAfter(b),this.setEndBefore(c)):this.moveToPosition(b,CKEDITOR.POSITION_AFTER_END);return{startNode:a?d+(f?"C":"S"):b,endNode:a?d+"E":c,serializable:a,collapsed:f}},createBookmark2:function(){function a(b){var g=
b.container,d=b.offset,e;e=g;var f=d;e=e.type!=CKEDITOR.NODE_ELEMENT||0===f||f==e.getChildCount()?0:e.getChild(f-1).type==CKEDITOR.NODE_TEXT&&e.getChild(f).type==CKEDITOR.NODE_TEXT;e&&(g=g.getChild(d-1),d=g.getLength());if(g.type==CKEDITOR.NODE_ELEMENT&&0<d){a:{for(e=g;d--;)if(f=e.getChild(d).getIndex(!0),0<=f){d=f;break a}d=-1}d+=1}if(g.type==CKEDITOR.NODE_TEXT){e=g;for(f=0;(e=e.getPrevious())&&e.type==CKEDITOR.NODE_TEXT;)f+=e.getText().replace(CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE,"").length;
e=f;g.getText()?d+=e:(f=g.getPrevious(c),e?(d=e,g=f?f.getNext():g.getParent().getFirst()):(g=g.getParent(),d=f?f.getIndex(!0)+1:0))}b.container=g;b.offset=d}function b(a,g){var c=g.getCustomData("cke-fillingChar");if(c){var d=a.container;c.equals(d)&&(a.offset-=CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE.length,0>=a.offset&&(a.offset=d.getIndex(),a.container=d.getParent()))}}var c=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_TEXT,!0);return function(c){var d=this.collapsed,e={container:this.startContainer,
offset:this.startOffset},f={container:this.endContainer,offset:this.endOffset};c&&(a(e),b(e,this.root),d||(a(f),b(f,this.root)));return{start:e.container.getAddress(c),end:d?null:f.container.getAddress(c),startOffset:e.offset,endOffset:f.offset,normalized:c,collapsed:d,is2:!0}}}(),moveToBookmark:function(a){if(a.is2){var b=this.document.getByAddress(a.start,a.normalized),c=a.startOffset,d=a.end&&this.document.getByAddress(a.end,a.normalized);a=a.endOffset;this.setStart(b,c);d?this.setEnd(d,a):this.collapse(!0)}else b=
(c=a.serializable)?this.document.getById(a.startNode):a.startNode,a=c?this.document.getById(a.endNode):a.endNode,this.setStartBefore(b),b.remove(),a?(this.setEndBefore(a),a.remove()):this.collapse(!0)},getBoundaryNodes:function(){var a=this.startContainer,b=this.endContainer,c=this.startOffset,d=this.endOffset,e;if(a.type==CKEDITOR.NODE_ELEMENT)if(e=a.getChildCount(),e>c)a=a.getChild(c);else if(1>e)a=a.getPreviousSourceNode();else{for(a=a.$;a.lastChild;)a=a.lastChild;a=new CKEDITOR.dom.node(a);a=
a.getNextSourceNode()||a}if(b.type==CKEDITOR.NODE_ELEMENT)if(e=b.getChildCount(),e>d)b=b.getChild(d).getPreviousSourceNode(!0);else if(1>e)b=b.getPreviousSourceNode();else{for(b=b.$;b.lastChild;)b=b.lastChild;b=new CKEDITOR.dom.node(b)}a.getPosition(b)&CKEDITOR.POSITION_FOLLOWING&&(a=b);return{startNode:a,endNode:b}},getCommonAncestor:function(a,b){var c=this.startContainer,d=this.endContainer,c=c.equals(d)?a&&c.type==CKEDITOR.NODE_ELEMENT&&this.startOffset==this.endOffset-1?c.getChild(this.startOffset):
c:c.getCommonAncestor(d);return b&&!c.is?c.getParent():c},optimize:function(){var a=this.startContainer,b=this.startOffset;a.type!=CKEDITOR.NODE_ELEMENT&&(b?b>=a.getLength()&&this.setStartAfter(a):this.setStartBefore(a));a=this.endContainer;b=this.endOffset;a.type!=CKEDITOR.NODE_ELEMENT&&(b?b>=a.getLength()&&this.setEndAfter(a):this.setEndBefore(a))},optimizeBookmark:function(){var a=this.startContainer,b=this.endContainer;a.is&&a.is("span")&&a.data("cke-bookmark")&&this.setStartAt(a,CKEDITOR.POSITION_BEFORE_START);
b&&b.is&&b.is("span")&&b.data("cke-bookmark")&&this.setEndAt(b,CKEDITOR.POSITION_AFTER_END)},trim:function(a,b){var c=this.startContainer,d=this.startOffset,e=this.collapsed;if((!a||e)&&c&&c.type==CKEDITOR.NODE_TEXT){if(d)if(d>=c.getLength())d=c.getIndex()+1,c=c.getParent();else{var f=c.split(d),d=c.getIndex()+1,c=c.getParent();this.startContainer.equals(this.endContainer)?this.setEnd(f,this.endOffset-this.startOffset):c.equals(this.endContainer)&&(this.endOffset+=1)}else d=c.getIndex(),c=c.getParent();
this.setStart(c,d);if(e){this.collapse(!0);return}}c=this.endContainer;d=this.endOffset;b||e||!c||c.type!=CKEDITOR.NODE_TEXT||(d?(d>=c.getLength()||c.split(d),d=c.getIndex()+1):d=c.getIndex(),c=c.getParent(),this.setEnd(c,d))},enlarge:function(a,b){function c(a){return a&&a.type==CKEDITOR.NODE_ELEMENT&&a.hasAttribute("contenteditable")?null:a}var d=new RegExp(/[^\s\ufeff]/);switch(a){case CKEDITOR.ENLARGE_INLINE:var e=1;case CKEDITOR.ENLARGE_ELEMENT:var f=function(a,b){var c=new CKEDITOR.dom.range(h);
c.setStart(a,b);c.setEndAt(h,CKEDITOR.POSITION_BEFORE_END);var c=new CKEDITOR.dom.walker(c),g;for(c.guard=function(a){return!(a.type==CKEDITOR.NODE_ELEMENT&&a.isBlockBoundary())};g=c.next();){if(g.type!=CKEDITOR.NODE_TEXT)return!1;H=g!=a?g.getText():g.substring(b);if(d.test(H))return!1}return!0};if(this.collapsed)break;var l=this.getCommonAncestor(),h=this.root,m,k,t,y,v,z=!1,B,H;B=this.startContainer;var G=this.startOffset;B.type==CKEDITOR.NODE_TEXT?(G&&(B=!CKEDITOR.tools.trim(B.substring(0,G)).length&&
B,z=!!B),B&&((y=B.getPrevious())||(t=B.getParent()))):(G&&(y=B.getChild(G-1)||B.getLast()),y||(t=B));for(t=c(t);t||y;){if(t&&!y){!v&&t.equals(l)&&(v=!0);if(e?t.isBlockBoundary():!h.contains(t))break;z&&"inline"==t.getComputedStyle("display")||(z=!1,v?m=t:this.setStartBefore(t));y=t.getPrevious()}for(;y;)if(B=!1,y.type==CKEDITOR.NODE_COMMENT)y=y.getPrevious();else{if(y.type==CKEDITOR.NODE_TEXT)H=y.getText(),d.test(H)&&(y=null),B=/[\s\ufeff]$/.test(H);else if((y.$.offsetWidth>(CKEDITOR.env.webkit?1:
0)||b&&y.is("br"))&&!y.data("cke-bookmark"))if(z&&CKEDITOR.dtd.$removeEmpty[y.getName()]){H=y.getText();if(d.test(H))y=null;else for(var G=y.$.getElementsByTagName("*"),E=0,I;I=G[E++];)if(!CKEDITOR.dtd.$removeEmpty[I.nodeName.toLowerCase()]){y=null;break}y&&(B=!!H.length)}else y=null;B&&(z?v?m=t:t&&this.setStartBefore(t):z=!0);if(y){B=y.getPrevious();if(!t&&!B){t=y;y=null;break}y=B}else t=null}t&&(t=c(t.getParent()))}B=this.endContainer;G=this.endOffset;t=y=null;v=z=!1;B.type==CKEDITOR.NODE_TEXT?
CKEDITOR.tools.trim(B.substring(G)).length?z=!0:(z=!B.getLength(),G==B.getLength()?(y=B.getNext())||(t=B.getParent()):f(B,G)&&(t=B.getParent())):(y=B.getChild(G))||(t=B);for(;t||y;){if(t&&!y){!v&&t.equals(l)&&(v=!0);if(e?t.isBlockBoundary():!h.contains(t))break;z&&"inline"==t.getComputedStyle("display")||(z=!1,v?k=t:t&&this.setEndAfter(t));y=t.getNext()}for(;y;){B=!1;if(y.type==CKEDITOR.NODE_TEXT)H=y.getText(),f(y,0)||(y=null),B=/^[\s\ufeff]/.test(H);else if(y.type==CKEDITOR.NODE_ELEMENT){if((0<y.$.offsetWidth||
b&&y.is("br"))&&!y.data("cke-bookmark"))if(z&&CKEDITOR.dtd.$removeEmpty[y.getName()]){H=y.getText();if(d.test(H))y=null;else for(G=y.$.getElementsByTagName("*"),E=0;I=G[E++];)if(!CKEDITOR.dtd.$removeEmpty[I.nodeName.toLowerCase()]){y=null;break}y&&(B=!!H.length)}else y=null}else B=1;B&&z&&(v?k=t:this.setEndAfter(t));if(y){B=y.getNext();if(!t&&!B){t=y;y=null;break}y=B}else t=null}t&&(t=c(t.getParent()))}m&&k&&(l=m.contains(k)?k:m,this.setStartBefore(l),this.setEndAfter(l));break;case CKEDITOR.ENLARGE_BLOCK_CONTENTS:case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:t=
new CKEDITOR.dom.range(this.root);h=this.root;t.setStartAt(h,CKEDITOR.POSITION_AFTER_START);t.setEnd(this.startContainer,this.startOffset);t=new CKEDITOR.dom.walker(t);var F,K,J=CKEDITOR.dom.walker.blockBoundary(a==CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS?{br:1}:null),D=null,Q=function(a){if(a.type==CKEDITOR.NODE_ELEMENT&&"false"==a.getAttribute("contenteditable"))if(D){if(D.equals(a)){D=null;return}}else D=a;else if(D)return;var b=J(a);b||(F=a);return b},e=function(a){var b=Q(a);!b&&a.is&&a.is("br")&&
(K=a);return b};t.guard=Q;t=t.lastBackward();F=F||h;this.setStartAt(F,!F.is("br")&&(!t&&this.checkStartOfBlock()||t&&F.contains(t))?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_AFTER_END);if(a==CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS){t=this.clone();t=new CKEDITOR.dom.walker(t);var N=CKEDITOR.dom.walker.whitespaces(),R=CKEDITOR.dom.walker.bookmark();t.evaluator=function(a){return!N(a)&&!R(a)};if((t=t.previous())&&t.type==CKEDITOR.NODE_ELEMENT&&t.is("br"))break}t=this.clone();t.collapse();t.setEndAt(h,
CKEDITOR.POSITION_BEFORE_END);t=new CKEDITOR.dom.walker(t);t.guard=a==CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS?e:Q;F=D=K=null;t=t.lastForward();F=F||h;this.setEndAt(F,!t&&this.checkEndOfBlock()||t&&F.contains(t)?CKEDITOR.POSITION_BEFORE_END:CKEDITOR.POSITION_BEFORE_START);K&&this.setEndAfter(K)}},shrink:function(a,b,c){var d="boolean"===typeof c?c:c&&"boolean"===typeof c.shrinkOnBlockBoundary?c.shrinkOnBlockBoundary:!0,e=c&&c.skipBogus;if(!this.collapsed){a=a||CKEDITOR.SHRINK_TEXT;var f=this.clone(),l=
this.startContainer,h=this.endContainer,m=this.startOffset,k=this.endOffset,t=c=1;l&&l.type==CKEDITOR.NODE_TEXT&&(m?m>=l.getLength()?f.setStartAfter(l):(f.setStartBefore(l),c=0):f.setStartBefore(l));h&&h.type==CKEDITOR.NODE_TEXT&&(k?k>=h.getLength()?f.setEndAfter(h):(f.setEndAfter(h),t=0):f.setEndBefore(h));var f=new CKEDITOR.dom.walker(f),y=CKEDITOR.dom.walker.bookmark(),v=CKEDITOR.dom.walker.bogus();f.evaluator=function(b){return b.type==(a==CKEDITOR.SHRINK_ELEMENT?CKEDITOR.NODE_ELEMENT:CKEDITOR.NODE_TEXT)};
var z;f.guard=function(b,c){if(e&&v(b)||y(b))return!0;if(a==CKEDITOR.SHRINK_ELEMENT&&b.type==CKEDITOR.NODE_TEXT||c&&b.equals(z)||!1===d&&b.type==CKEDITOR.NODE_ELEMENT&&b.isBlockBoundary()||b.type==CKEDITOR.NODE_ELEMENT&&b.hasAttribute("contenteditable"))return!1;c||b.type!=CKEDITOR.NODE_ELEMENT||(z=b);return!0};c&&(l=f[a==CKEDITOR.SHRINK_ELEMENT?"lastForward":"next"]())&&this.setStartAt(l,b?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_BEFORE_START);t&&(f.reset(),(f=f[a==CKEDITOR.SHRINK_ELEMENT?
"lastBackward":"previous"]())&&this.setEndAt(f,b?CKEDITOR.POSITION_BEFORE_END:CKEDITOR.POSITION_AFTER_END));return!(!c&&!t)}},insertNode:function(a){this.optimizeBookmark();this.trim(!1,!0);var b=this.startContainer,c=b.getChild(this.startOffset);c?a.insertBefore(c):b.append(a);a.getParent()&&a.getParent().equals(this.endContainer)&&this.endOffset++;this.setStartBefore(a)},moveToPosition:function(a,b){this.setStartAt(a,b);this.collapse(!0)},moveToRange:function(a){this.setStart(a.startContainer,a.startOffset);
this.setEnd(a.endContainer,a.endOffset)},selectNodeContents:function(a){this.setStart(a,0);this.setEnd(a,a.type==CKEDITOR.NODE_TEXT?a.getLength():a.getChildCount())},setStart:function(b,c){b.type==CKEDITOR.NODE_ELEMENT&&CKEDITOR.dtd.$empty[b.getName()]&&(c=b.getIndex(),b=b.getParent());this._setStartContainer(b);this.startOffset=c;this.endContainer||(this._setEndContainer(b),this.endOffset=c);a(this)},setEnd:function(b,c){b.type==CKEDITOR.NODE_ELEMENT&&CKEDITOR.dtd.$empty[b.getName()]&&(c=b.getIndex()+
1,b=b.getParent());this._setEndContainer(b);this.endOffset=c;this.startContainer||(this._setStartContainer(b),this.startOffset=c);a(this)},setStartAfter:function(a){this.setStart(a.getParent(),a.getIndex()+1)},setStartBefore:function(a){this.setStart(a.getParent(),a.getIndex())},setEndAfter:function(a){this.setEnd(a.getParent(),a.getIndex()+1)},setEndBefore:function(a){this.setEnd(a.getParent(),a.getIndex())},setStartAt:function(b,c){switch(c){case CKEDITOR.POSITION_AFTER_START:this.setStart(b,0);
break;case CKEDITOR.POSITION_BEFORE_END:b.type==CKEDITOR.NODE_TEXT?this.setStart(b,b.getLength()):this.setStart(b,b.getChildCount());break;case CKEDITOR.POSITION_BEFORE_START:this.setStartBefore(b);break;case CKEDITOR.POSITION_AFTER_END:this.setStartAfter(b)}a(this)},setEndAt:function(b,c){switch(c){case CKEDITOR.POSITION_AFTER_START:this.setEnd(b,0);break;case CKEDITOR.POSITION_BEFORE_END:b.type==CKEDITOR.NODE_TEXT?this.setEnd(b,b.getLength()):this.setEnd(b,b.getChildCount());break;case CKEDITOR.POSITION_BEFORE_START:this.setEndBefore(b);
break;case CKEDITOR.POSITION_AFTER_END:this.setEndAfter(b)}a(this)},fixBlock:function(a,b){var c=this.createBookmark(),d=this.document.createElement(b);this.collapse(a);this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);this.extractContents().appendTo(d);d.trim();this.insertNode(d);var e=d.getBogus();e&&e.remove();d.appendBogus();this.moveToBookmark(c);return d},splitBlock:function(a,b){var c=new CKEDITOR.dom.elementPath(this.startContainer,this.root),d=new CKEDITOR.dom.elementPath(this.endContainer,this.root),
e=c.block,f=d.block,l=null;if(!c.blockLimit.equals(d.blockLimit))return null;"br"!=a&&(e||(e=this.fixBlock(!0,a),f=(new CKEDITOR.dom.elementPath(this.endContainer,this.root)).block),f||(f=this.fixBlock(!1,a)));c=e&&this.checkStartOfBlock();d=f&&this.checkEndOfBlock();this.deleteContents();e&&e.equals(f)&&(d?(l=new CKEDITOR.dom.elementPath(this.startContainer,this.root),this.moveToPosition(f,CKEDITOR.POSITION_AFTER_END),f=null):c?(l=new CKEDITOR.dom.elementPath(this.startContainer,this.root),this.moveToPosition(e,
CKEDITOR.POSITION_BEFORE_START),e=null):(f=this.splitElement(e,b||!1),e.is("ul","ol")||e.appendBogus()));return{previousBlock:e,nextBlock:f,wasStartOfBlock:c,wasEndOfBlock:d,elementPath:l}},splitElement:function(a,b){if(!this.collapsed)return null;this.setEndAt(a,CKEDITOR.POSITION_BEFORE_END);var c=this.extractContents(!1,b||!1),d=a.clone(!1,b||!1);c.appendTo(d);d.insertAfter(a);this.moveToPosition(a,CKEDITOR.POSITION_AFTER_END);return d},removeEmptyBlocksAtEnd:function(){function a(g){return function(a){return b(a)||
c(a)||a.type==CKEDITOR.NODE_ELEMENT&&a.isEmptyInlineRemoveable()||g.is("table")&&a.is("caption")?!1:!0}}var b=CKEDITOR.dom.walker.whitespaces(),c=CKEDITOR.dom.walker.bookmark(!1);return function(b){for(var c=this.createBookmark(),d=this[b?"endPath":"startPath"](),e=d.block||d.blockLimit,f;e&&!e.equals(d.root)&&!e.getFirst(a(e));)f=e.getParent(),this[b?"setEndAt":"setStartAt"](e,CKEDITOR.POSITION_AFTER_END),e.remove(1),e=f;this.moveToBookmark(c)}}(),startPath:function(){return new CKEDITOR.dom.elementPath(this.startContainer,
this.root)},endPath:function(){return new CKEDITOR.dom.elementPath(this.endContainer,this.root)},checkBoundaryOfElement:function(a,b){var d=b==CKEDITOR.START,e=this.clone();e.collapse(d);e[d?"setStartAt":"setEndAt"](a,d?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_BEFORE_END);e=new CKEDITOR.dom.walker(e);e.evaluator=c(d);return e[d?"checkBackward":"checkForward"]()},checkStartOfBlock:function(){var a=this.startContainer,c=this.startOffset;CKEDITOR.env.ie&&c&&a.type==CKEDITOR.NODE_TEXT&&(a=CKEDITOR.tools.ltrim(a.substring(0,
c)),d.test(a)&&this.trim(0,1));this.trim();a=new CKEDITOR.dom.elementPath(this.startContainer,this.root);c=this.clone();c.collapse(!0);c.setStartAt(a.block||a.blockLimit,CKEDITOR.POSITION_AFTER_START);a=new CKEDITOR.dom.walker(c);a.evaluator=b();return a.checkBackward()},checkEndOfBlock:function(){var a=this.endContainer,c=this.endOffset;CKEDITOR.env.ie&&a.type==CKEDITOR.NODE_TEXT&&(a=CKEDITOR.tools.rtrim(a.substring(c)),d.test(a)&&this.trim(1,0));this.trim();a=new CKEDITOR.dom.elementPath(this.endContainer,
this.root);c=this.clone();c.collapse(!1);c.setEndAt(a.block||a.blockLimit,CKEDITOR.POSITION_BEFORE_END);a=new CKEDITOR.dom.walker(c);a.evaluator=b();return a.checkForward()},getPreviousNode:function(a,b,c){var d=this.clone();d.collapse(1);d.setStartAt(c||this.root,CKEDITOR.POSITION_AFTER_START);c=new CKEDITOR.dom.walker(d);c.evaluator=a;c.guard=b;return c.previous()},getNextNode:function(a,b,c){var d=this.clone();d.collapse();d.setEndAt(c||this.root,CKEDITOR.POSITION_BEFORE_END);c=new CKEDITOR.dom.walker(d);
c.evaluator=a;c.guard=b;return c.next()},checkReadOnly:function(){function a(b,c){for(;b;){if(b.type==CKEDITOR.NODE_ELEMENT){if("false"==b.getAttribute("contentEditable")&&!b.data("cke-editable"))return 0;if(b.is("html")||"true"==b.getAttribute("contentEditable")&&(b.contains(c)||b.equals(c)))break}b=b.getParent()}return 1}return function(){var b=this.startContainer,c=this.endContainer;return!(a(b,c)&&a(c,b))}}(),moveToElementEditablePosition:function(a,b){if(a.type==CKEDITOR.NODE_ELEMENT&&!a.isEditable(!1))return this.moveToPosition(a,
b?CKEDITOR.POSITION_AFTER_END:CKEDITOR.POSITION_BEFORE_START),!0;for(var c=0;a;){if(a.type==CKEDITOR.NODE_TEXT){b&&this.endContainer&&this.checkEndOfBlock()&&d.test(a.getText())?this.moveToPosition(a,CKEDITOR.POSITION_BEFORE_START):this.moveToPosition(a,b?CKEDITOR.POSITION_AFTER_END:CKEDITOR.POSITION_BEFORE_START);c=1;break}if(a.type==CKEDITOR.NODE_ELEMENT)if(a.isEditable())this.moveToPosition(a,b?CKEDITOR.POSITION_BEFORE_END:CKEDITOR.POSITION_AFTER_START),c=1;else if(b&&a.is("br")&&this.endContainer&&
this.checkEndOfBlock())this.moveToPosition(a,CKEDITOR.POSITION_BEFORE_START);else if("false"==a.getAttribute("contenteditable")&&a.is(CKEDITOR.dtd.$block))return this.setStartBefore(a),this.setEndAfter(a),!0;var e=a,f=c,h=void 0;e.type==CKEDITOR.NODE_ELEMENT&&e.isEditable(!1)&&(h=e[b?"getLast":"getFirst"](l));f||h||(h=e[b?"getPrevious":"getNext"](l));a=h}return!!c},moveToClosestEditablePosition:function(a,b){var c,d=0,e,f,l=[CKEDITOR.POSITION_AFTER_END,CKEDITOR.POSITION_BEFORE_START];a?(c=new CKEDITOR.dom.range(this.root),
c.moveToPosition(a,l[b?0:1])):c=this.clone();if(a&&!a.is(CKEDITOR.dtd.$block))d=1;else if(e=c[b?"getNextEditableNode":"getPreviousEditableNode"]())d=1,(f=e.type==CKEDITOR.NODE_ELEMENT)&&e.is(CKEDITOR.dtd.$block)&&"false"==e.getAttribute("contenteditable")?(c.setStartAt(e,CKEDITOR.POSITION_BEFORE_START),c.setEndAt(e,CKEDITOR.POSITION_AFTER_END)):!CKEDITOR.env.needsBrFiller&&f&&e.is(CKEDITOR.dom.walker.validEmptyBlockContainers)?(c.setEnd(e,0),c.collapse()):c.moveToPosition(e,l[b?1:0]);d&&this.moveToRange(c);
return!!d},moveToElementEditStart:function(a){return this.moveToElementEditablePosition(a)},moveToElementEditEnd:function(a){return this.moveToElementEditablePosition(a,!0)},getEnclosedNode:function(){var a=this.clone();a.optimize();if(a.startContainer.type!=CKEDITOR.NODE_ELEMENT||a.endContainer.type!=CKEDITOR.NODE_ELEMENT)return null;var a=new CKEDITOR.dom.walker(a),b=CKEDITOR.dom.walker.bookmark(!1,!0),c=CKEDITOR.dom.walker.whitespaces(!0);a.evaluator=function(a){return c(a)&&b(a)};var d=a.next();
a.reset();return d&&d.equals(a.previous())?d:null},getTouchedStartNode:function(){var a=this.startContainer;return this.collapsed||a.type!=CKEDITOR.NODE_ELEMENT?a:a.getChild(this.startOffset)||a},getTouchedEndNode:function(){var a=this.endContainer;return this.collapsed||a.type!=CKEDITOR.NODE_ELEMENT?a:a.getChild(this.endOffset-1)||a},getNextEditableNode:e(),getPreviousEditableNode:e(1),_getTableElement:function(a){a=a||{td:1,th:1,tr:1,tbody:1,thead:1,tfoot:1,table:1};var b=this.startContainer,c=
this.endContainer,d=b.getAscendant("table",!0),e=c.getAscendant("table",!0);return CKEDITOR.env.safari&&d&&c.equals(this.root)?b.getAscendant(a,!0):this.getEnclosedNode()?this.getEnclosedNode().getAscendant(a,!0):d&&e&&(d.equals(e)||d.contains(e)||e.contains(d))?b.getAscendant(a,!0):null},scrollIntoView:function(){var a=new CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e",this.document),b,c,d,e=this.clone();e.optimize();(d=e.startContainer.type==CKEDITOR.NODE_TEXT)?(c=e.startContainer.getText(),
b=e.startContainer.split(e.startOffset),a.insertAfter(e.startContainer)):e.insertNode(a);a.scrollIntoView();d&&(e.startContainer.setText(c),b.remove());a.remove()},_setStartContainer:function(a){this.startContainer=a},_setEndContainer:function(a){this.endContainer=a},_find:function(a,b){var c=this.getCommonAncestor(),d=this.getBoundaryNodes(),e=[],f,l,h,m;if(c&&c.find)for(l=c.find(a),f=0;f<l.count();f++)if(c=l.getItem(f),b||!c.isReadOnly())h=c.getPosition(d.startNode)&CKEDITOR.POSITION_FOLLOWING||
d.startNode.equals(c),m=c.getPosition(d.endNode)&CKEDITOR.POSITION_PRECEDING+CKEDITOR.POSITION_IS_CONTAINED||d.endNode.equals(c),h&&m&&e.push(c);return e}};CKEDITOR.dom.range.mergeRanges=function(a){return CKEDITOR.tools.array.reduce(a,function(a,b){var c=a[a.length-1],d=!1;b=b.clone();b.enlarge(CKEDITOR.ENLARGE_ELEMENT);if(c){var g=new CKEDITOR.dom.range(b.root),d=new CKEDITOR.dom.walker(g),e=CKEDITOR.dom.walker.whitespaces();g.setStart(c.endContainer,c.endOffset);g.setEnd(b.startContainer,b.startOffset);
for(g=d.next();e(g)||b.endContainer.equals(g);)g=d.next();d=!g}d?c.setEnd(b.endContainer,b.endOffset):a.push(b);return a},[])}}(),CKEDITOR.POSITION_AFTER_START=1,CKEDITOR.POSITION_BEFORE_END=2,CKEDITOR.POSITION_BEFORE_START=3,CKEDITOR.POSITION_AFTER_END=4,CKEDITOR.ENLARGE_ELEMENT=1,CKEDITOR.ENLARGE_BLOCK_CONTENTS=2,CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS=3,CKEDITOR.ENLARGE_INLINE=4,CKEDITOR.START=1,CKEDITOR.END=2,CKEDITOR.SHRINK_ELEMENT=1,CKEDITOR.SHRINK_TEXT=2,"use strict",function(){function a(a){1>
arguments.length||(this.range=a,this.forceBrBreak=0,this.enlargeBr=1,this.enforceRealBlocks=0,this._||(this._={}))}function f(a){var b=[];a.forEach(function(a){if("true"==a.getAttribute("contenteditable"))return b.push(a),!1},CKEDITOR.NODE_ELEMENT,!0);return b}function b(a,c,d,e){a:{null==e&&(e=f(d));for(var h;h=e.shift();)if(h.getDtd().p){e={element:h,remaining:e};break a}e=null}if(!e)return 0;if((h=CKEDITOR.filter.instances[e.element.data("cke-filter")])&&!h.check(c))return b(a,c,d,e.remaining);
c=new CKEDITOR.dom.range(e.element);c.selectNodeContents(e.element);c=c.createIterator();c.enlargeBr=a.enlargeBr;c.enforceRealBlocks=a.enforceRealBlocks;c.activeFilter=c.filter=h;a._.nestedEditable={element:e.element,container:d,remaining:e.remaining,iterator:c};return 1}function c(a,b,c){if(!b)return!1;a=a.clone();a.collapse(!c);return a.checkBoundaryOfElement(b,c?CKEDITOR.START:CKEDITOR.END)}var e=/^[\r\n\t ]+$/,m=CKEDITOR.dom.walker.bookmark(!1,!0),k=CKEDITOR.dom.walker.whitespaces(!0),d=function(a){return m(a)&&
k(a)},h={dd:1,dt:1,li:1};a.prototype={getNextParagraph:function(a){var g,f,k,u,C;a=a||"p";if(this._.nestedEditable){if(g=this._.nestedEditable.iterator.getNextParagraph(a))return this.activeFilter=this._.nestedEditable.iterator.activeFilter,g;this.activeFilter=this.filter;if(b(this,a,this._.nestedEditable.container,this._.nestedEditable.remaining))return this.activeFilter=this._.nestedEditable.iterator.activeFilter,this._.nestedEditable.iterator.getNextParagraph(a);this._.nestedEditable=null}if(!this.range.root.getDtd()[a])return null;
if(!this._.started){var w=this.range.clone();f=w.startPath();var q=w.endPath(),x=!w.collapsed&&c(w,f.block),r=!w.collapsed&&c(w,q.block,1);w.shrink(CKEDITOR.SHRINK_ELEMENT,!0);x&&w.setStartAt(f.block,CKEDITOR.POSITION_BEFORE_END);r&&w.setEndAt(q.block,CKEDITOR.POSITION_AFTER_START);f=w.endContainer.hasAscendant("pre",!0)||w.startContainer.hasAscendant("pre",!0);w.enlarge(this.forceBrBreak&&!f||!this.enlargeBr?CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:CKEDITOR.ENLARGE_BLOCK_CONTENTS);w.collapsed||(f=new CKEDITOR.dom.walker(w.clone()),
q=CKEDITOR.dom.walker.bookmark(!0,!0),f.evaluator=q,this._.nextNode=f.next(),f=new CKEDITOR.dom.walker(w.clone()),f.evaluator=q,f=f.previous(),this._.lastNode=f.getNextSourceNode(!0,null,w.root),this._.lastNode&&this._.lastNode.type==CKEDITOR.NODE_TEXT&&!CKEDITOR.tools.trim(this._.lastNode.getText())&&this._.lastNode.getParent().isBlockBoundary()&&(q=this.range.clone(),q.moveToPosition(this._.lastNode,CKEDITOR.POSITION_AFTER_END),q.checkEndOfBlock()&&(q=new CKEDITOR.dom.elementPath(q.endContainer,
q.root),this._.lastNode=(q.block||q.blockLimit).getNextSourceNode(!0))),this._.lastNode&&w.root.contains(this._.lastNode)||(this._.lastNode=this._.docEndMarker=w.document.createText(""),this._.lastNode.insertAfter(f)),w=null);this._.started=1;f=w}q=this._.nextNode;w=this._.lastNode;for(this._.nextNode=null;q;){var x=0,r=q.hasAscendant("pre"),A=q.type!=CKEDITOR.NODE_ELEMENT,t=0;if(A)q.type==CKEDITOR.NODE_TEXT&&e.test(q.getText())&&(A=0);else{var y=q.getName();if(CKEDITOR.dtd.$block[y]&&"false"==q.getAttribute("contenteditable")){g=
q;b(this,a,g);break}else if(q.isBlockBoundary(this.forceBrBreak&&!r&&{br:1})){if("br"==y)A=1;else if(!f&&!q.getChildCount()&&"hr"!=y){g=q;k=q.equals(w);break}f&&(f.setEndAt(q,CKEDITOR.POSITION_BEFORE_START),"br"!=y&&(this._.nextNode=q));x=1}else{if(q.getFirst()){f||(f=this.range.clone(),f.setStartAt(q,CKEDITOR.POSITION_BEFORE_START));q=q.getFirst();continue}A=1}}A&&!f&&(f=this.range.clone(),f.setStartAt(q,CKEDITOR.POSITION_BEFORE_START));k=(!x||A)&&q.equals(w);if(f&&!x)for(;!q.getNext(d)&&!k;){y=
q.getParent();if(y.isBlockBoundary(this.forceBrBreak&&!r&&{br:1})){x=1;A=0;k||y.equals(w);f.setEndAt(y,CKEDITOR.POSITION_BEFORE_END);break}q=y;A=1;k=q.equals(w);t=1}A&&f.setEndAt(q,CKEDITOR.POSITION_AFTER_END);q=this._getNextSourceNode(q,t,w);if((k=!q)||x&&f)break}if(!g){if(!f)return this._.docEndMarker&&this._.docEndMarker.remove(),this._.nextNode=null;g=new CKEDITOR.dom.elementPath(f.startContainer,f.root);q=g.blockLimit;x={div:1,th:1,td:1};g=g.block;!g&&q&&!this.enforceRealBlocks&&x[q.getName()]&&
f.checkStartOfBlock()&&f.checkEndOfBlock()&&!q.equals(f.root)?g=q:!g||this.enforceRealBlocks&&g.is(h)?(g=this.range.document.createElement(a),f.extractContents().appendTo(g),g.trim(),f.insertNode(g),u=C=!0):"li"!=g.getName()?f.checkStartOfBlock()&&f.checkEndOfBlock()||(g=g.clone(!1),f.extractContents().appendTo(g),g.trim(),C=f.splitBlock(),u=!C.wasStartOfBlock,C=!C.wasEndOfBlock,f.insertNode(g)):k||(this._.nextNode=g.equals(w)?null:this._getNextSourceNode(f.getBoundaryNodes().endNode,1,w))}u&&(u=
g.getPrevious())&&u.type==CKEDITOR.NODE_ELEMENT&&("br"==u.getName()?u.remove():u.getLast()&&"br"==u.getLast().$.nodeName.toLowerCase()&&u.getLast().remove());C&&(u=g.getLast())&&u.type==CKEDITOR.NODE_ELEMENT&&"br"==u.getName()&&(!CKEDITOR.env.needsBrFiller||u.getPrevious(m)||u.getNext(m))&&u.remove();this._.nextNode||(this._.nextNode=k||g.equals(w)||!w?null:this._getNextSourceNode(g,1,w));return g},_getNextSourceNode:function(a,b,c){function d(a){return!(a.equals(c)||a.equals(e))}var e=this.range.root;
for(a=a.getNextSourceNode(b,null,d);!m(a);)a=a.getNextSourceNode(b,null,d);return a}};CKEDITOR.dom.range.prototype.createIterator=function(){return new a(this)}}(),CKEDITOR.command=function(a,f){this.uiItems=[];this.exec=function(b){if(this.state==CKEDITOR.TRISTATE_DISABLED||!this.checkAllowed())return!1;this.editorFocus&&a.focus();return!1===this.fire("exec")?!0:!1!==f.exec.call(this,a,b)};this.refresh=function(a,b){if(!this.readOnly&&a.readOnly)return!0;if(this.context&&!b.isContextFor(this.context)||
!this.checkAllowed(!0))return this.disable(),!0;this.startDisabled||this.enable();this.modes&&!this.modes[a.mode]&&this.disable();return!1===this.fire("refresh",{editor:a,path:b})?!0:f.refresh&&!1!==f.refresh.apply(this,arguments)};var b;this.checkAllowed=function(c){return c||"boolean"!=typeof b?b=a.activeFilter.checkFeature(this):b};CKEDITOR.tools.extend(this,f,{modes:{wysiwyg:1},editorFocus:1,contextSensitive:!!f.context,state:CKEDITOR.TRISTATE_DISABLED});CKEDITOR.event.call(this)},CKEDITOR.command.prototype=
{enable:function(){this.state==CKEDITOR.TRISTATE_DISABLED&&this.checkAllowed()&&this.setState(this.preserveState&&"undefined"!=typeof this.previousState?this.previousState:CKEDITOR.TRISTATE_OFF)},disable:function(){this.setState(CKEDITOR.TRISTATE_DISABLED)},setState:function(a){if(this.state==a||a!=CKEDITOR.TRISTATE_DISABLED&&!this.checkAllowed())return!1;this.previousState=this.state;this.state=a;this.fire("state");return!0},toggleState:function(){this.state==CKEDITOR.TRISTATE_OFF?this.setState(CKEDITOR.TRISTATE_ON):
this.state==CKEDITOR.TRISTATE_ON&&this.setState(CKEDITOR.TRISTATE_OFF)}},CKEDITOR.event.implementOn(CKEDITOR.command.prototype),CKEDITOR.ENTER_P=1,CKEDITOR.ENTER_BR=2,CKEDITOR.ENTER_DIV=3,CKEDITOR.config={customConfig:"config.js",autoUpdateElement:!0,language:"",defaultLanguage:"en",contentsLangDirection:"",enterMode:CKEDITOR.ENTER_P,forceEnterMode:!1,shiftEnterMode:CKEDITOR.ENTER_BR,docType:"\x3c!DOCTYPE html\x3e",bodyId:"",bodyClass:"",fullPage:!1,height:200,contentsCss:CKEDITOR.getUrl("contents.css"),
extraPlugins:"",removePlugins:"",protectedSource:[],tabIndex:0,width:"",baseFloatZIndex:1E4,blockedKeystrokes:[CKEDITOR.CTRL+66,CKEDITOR.CTRL+73,CKEDITOR.CTRL+85]},function(){function a(a,b,c,d,e){var g,f;a=[];for(g in b){f=b[g];f="boolean"==typeof f?{}:"function"==typeof f?{match:f}:E(f);"$"!=g.charAt(0)&&(f.elements=g);c&&(f.featureName=c.toLowerCase());var h=f;h.elements=k(h.elements,/\s+/)||null;h.propertiesOnly=h.propertiesOnly||!0===h.elements;var l=/\s*,\s*/,m=void 0;for(m in K){h[m]=k(h[m],
l)||null;var q=h,t=J[m],y=k(h[J[m]],l),D=h[m],v=[],H=!0,n=void 0;y?H=!1:y={};for(n in D)"!"==n.charAt(0)&&(n=n.slice(1),v.push(n),y[n]=!0,H=!1);for(;n=v.pop();)D[n]=D["!"+n],delete D["!"+n];q[t]=(H?!1:y)||null}h.match=h.match||null;d.push(f);a.push(f)}b=e.elements;e=e.generic;var r;c=0;for(d=a.length;c<d;++c){g=E(a[c]);f=!0===g.classes||!0===g.styles||!0===g.attributes;h=g;m=t=l=void 0;for(l in K)h[l]=x(h[l]);q=!0;for(m in J){l=J[m];t=h[l];y=[];D=void 0;for(D in t)-1<D.indexOf("*")?y.push(new RegExp("^"+
D.replace(/\*/g,".*")+"$")):y.push(D);t=y;t.length&&(h[l]=t,q=!1)}h.nothingRequired=q;h.noProperties=!(h.attributes||h.classes||h.styles);if(!0===g.elements||null===g.elements)e[f?"unshift":"push"](g);else for(r in h=g.elements,delete g.elements,h)if(b[r])b[r][f?"unshift":"push"](g);else b[r]=[g]}}function f(a,c,e,g){if(!a.match||a.match(c))if(g||d(a,c))if(a.propertiesOnly||(e.valid=!0),e.allAttributes||(e.allAttributes=b(a.attributes,c.attributes,e.validAttributes)),e.allStyles||(e.allStyles=b(a.styles,
c.styles,e.validStyles)),!e.allClasses){a=a.classes;c=c.classes;g=e.validClasses;if(a)if(!0===a)a=!0;else{for(var f=0,h=c.length,l;f<h;++f)l=c[f],g[l]||(g[l]=a(l));a=!1}else a=!1;e.allClasses=a}}function b(a,b,c){if(!a)return!1;if(!0===a)return!0;for(var d in b)c[d]||(c[d]=a(d));return!1}function c(a,b,c){if(!a.match||a.match(b)){if(a.noProperties)return!1;c.hadInvalidAttribute=e(a.attributes,b.attributes)||c.hadInvalidAttribute;c.hadInvalidStyle=e(a.styles,b.styles)||c.hadInvalidStyle;a=a.classes;
b=b.classes;if(a){for(var d=!1,g=!0===a,f=b.length;f--;)if(g||a(b[f]))b.splice(f,1),d=!0;a=d}else a=!1;c.hadInvalidClass=a||c.hadInvalidClass}}function e(a,b){if(!a)return!1;var c=!1,d=!0===a,e;for(e in b)if(d||a(e))delete b[e],c=!0;return c}function m(a,b,c){if(a.disabled||a.customConfig&&!c||!b)return!1;a._.cachedChecks={};return!0}function k(a,b){if(!a)return!1;if(!0===a)return a;if("string"==typeof a)return a=I(a),"*"==a?!0:CKEDITOR.tools.convertArrayToObject(a.split(b));if(CKEDITOR.tools.isArray(a))return a.length?
CKEDITOR.tools.convertArrayToObject(a):!1;var c={},d=0,e;for(e in a)c[e]=a[e],d++;return d?c:!1}function d(a,b){if(a.nothingRequired)return!0;var c,d,e,g;if(e=a.requiredClasses)for(g=b.classes,c=0;c<e.length;++c)if(d=e[c],"string"==typeof d){if(-1==CKEDITOR.tools.indexOf(g,d))return!1}else if(!CKEDITOR.tools.checkIfAnyArrayItemMatches(g,d))return!1;return h(b.styles,a.requiredStyles)&&h(b.attributes,a.requiredAttributes)}function h(a,b){if(!b)return!0;for(var c=0,d;c<b.length;++c)if(d=b[c],"string"==
typeof d){if(!(d in a))return!1}else if(!CKEDITOR.tools.checkIfAnyObjectPropertyMatches(a,d))return!1;return!0}function l(a){if(!a)return{};a=a.split(/\s*,\s*/).sort();for(var b={};a.length;)b[a.shift()]="cke-test";return b}function g(a){var b,c,d,e,g={},f=1;for(a=I(a);b=a.match(D);)(c=b[2])?(d=n(c,"styles"),e=n(c,"attrs"),c=n(c,"classes")):d=e=c=null,g["$"+f++]={elements:b[1],classes:c,styles:d,attributes:e},a=a.slice(b[0].length);return g}function n(a,b){var c=a.match(Q[b]);return c?I(c[1]):null}
function p(a){var b=a.styleBackup=a.attributes.style,c=a.classBackup=a.attributes["class"];a.styles||(a.styles=CKEDITOR.tools.parseCssText(b||"",1));a.classes||(a.classes=c?c.split(/\s+/):[])}function u(a,b,d,e){var g=0,h;e.toHtml&&(b.name=b.name.replace(N,"$1"));if(e.doCallbacks&&a.elementCallbacks){a:{h=a.elementCallbacks;for(var l=0,m=h.length,k;l<m;++l)if(k=h[l](b)){h=k;break a}h=void 0}if(h)return h}if(e.doTransform&&(h=a._.transformations[b.name])){p(b);for(l=0;l<h.length;++l)y(a,b,h[l]);w(b)}if(e.doFilter){a:{l=
b.name;m=a._;a=m.allowedRules.elements[l];h=m.allowedRules.generic;l=m.disallowedRules.elements[l];m=m.disallowedRules.generic;k=e.skipRequired;var t={valid:!1,validAttributes:{},validClasses:{},validStyles:{},allAttributes:!1,allClasses:!1,allStyles:!1,hadInvalidAttribute:!1,hadInvalidClass:!1,hadInvalidStyle:!1},D,v;if(a||h){p(b);if(l)for(D=0,v=l.length;D<v;++D)if(!1===c(l[D],b,t)){a=null;break a}if(m)for(D=0,v=m.length;D<v;++D)c(m[D],b,t);if(a)for(D=0,v=a.length;D<v;++D)f(a[D],b,t,k);if(h)for(D=
0,v=h.length;D<v;++D)f(h[D],b,t,k);a=t}else a=null}if(!a||!a.valid)return d.push(b),1;v=a.validAttributes;var J=a.validStyles;h=a.validClasses;var l=b.attributes,H=b.styles,m=b.classes;k=b.classBackup;var n=b.styleBackup,x,r,z=[],t=[],E=/^data-cke-/;D=!1;delete l.style;delete l["class"];delete b.classBackup;delete b.styleBackup;if(!a.allAttributes)for(x in l)v[x]||(E.test(x)?x==(r=x.replace(/^data-cke-saved-/,""))||v[r]||(delete l[x],D=!0):(delete l[x],D=!0));if(!a.allStyles||a.hadInvalidStyle){for(x in H)a.allStyles||
J[x]?z.push(x+":"+H[x]):D=!0;z.length&&(l.style=z.sort().join("; "))}else n&&(l.style=n);if(!a.allClasses||a.hadInvalidClass){for(x=0;x<m.length;++x)(a.allClasses||h[m[x]])&&t.push(m[x]);t.length&&(l["class"]=t.sort().join(" "));k&&t.length<k.split(/\s+/).length&&(D=!0)}else k&&(l["class"]=k);D&&(g=1);if(!e.skipFinalValidation&&!q(b))return d.push(b),1}e.toHtml&&(b.name=b.name.replace(R,"cke:$1"));return g}function C(a){var b=[],c;for(c in a)-1<c.indexOf("*")&&b.push(c.replace(/\*/g,".*"));return b.length?
new RegExp("^(?:"+b.join("|")+")$"):null}function w(a){var b=a.attributes,c;delete b.style;delete b["class"];if(c=CKEDITOR.tools.writeCssText(a.styles,!0))b.style=c;a.classes.length&&(b["class"]=a.classes.sort().join(" "))}function q(a){switch(a.name){case "a":if(!(a.children.length||a.attributes.name||a.attributes.id))return!1;break;case "img":if(!a.attributes.src)return!1}return!0}function x(a){if(!a)return!1;if(!0===a)return!0;var b=C(a);return function(c){return c in a||b&&c.match(b)}}function r(){return new CKEDITOR.htmlParser.element("br")}
function A(a){return a.type==CKEDITOR.NODE_ELEMENT&&("br"==a.name||G.$block[a.name])}function t(a,b,c){var d=a.name;if(G.$empty[d]||!a.children.length)"hr"==d&&"br"==b?a.replaceWith(r()):(a.parent&&c.push({check:"it",el:a.parent}),a.remove());else if(G.$block[d]||"tr"==d)if("br"==b)a.previous&&!A(a.previous)&&(b=r(),b.insertBefore(a)),a.next&&!A(a.next)&&(b=r(),b.insertAfter(a)),a.replaceWithChildren();else{var d=a.children,e;b:{e=G[b];for(var g=0,f=d.length,h;g<f;++g)if(h=d[g],h.type==CKEDITOR.NODE_ELEMENT&&
!e[h.name]){e=!1;break b}e=!0}if(e)a.name=b,a.attributes={},c.push({check:"parent-down",el:a});else{e=a.parent;for(var g=e.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT||"body"==e.name,l,m,f=d.length;0<f;)h=d[--f],g&&(h.type==CKEDITOR.NODE_TEXT||h.type==CKEDITOR.NODE_ELEMENT&&G.$inline[h.name])?(l||(l=new CKEDITOR.htmlParser.element(b),l.insertAfter(a),c.push({check:"parent-down",el:l})),l.add(h,0)):(l=null,m=G[e.name]||G.span,h.insertAfter(a),e.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT||h.type!=CKEDITOR.NODE_ELEMENT||
m[h.name]||c.push({check:"el-up",el:h}));a.remove()}}else d in{style:1,script:1}?a.remove():(a.parent&&c.push({check:"it",el:a.parent}),a.replaceWithChildren())}function y(a,b,c){var d,e;for(d=0;d<c.length;++d)if(e=c[d],!(e.check&&!a.check(e.check,!1)||e.left&&!e.left(b))){e.right(b,L);break}}function v(a,b){var c=b.getDefinition(),d=c.attributes,e=c.styles,g,f,h,l;if(a.name!=c.element)return!1;for(g in d)if("class"==g)for(c=d[g].split(/\s+/),h=a.classes.join("|");l=c.pop();){if(-1==h.indexOf(l))return!1}else if(a.attributes[g]!=
d[g])return!1;for(f in e)if(a.styles[f]!=e[f])return!1;return!0}function z(a,b){var c,d;"string"==typeof a?c=a:a instanceof CKEDITOR.style?d=a:(c=a[0],d=a[1]);return[{element:c,left:d,right:function(a,c){c.transform(a,b)}}]}function B(a){return function(b){return v(b,a)}}function H(a){return function(b,c){c[a](b)}}var G=CKEDITOR.dtd,E=CKEDITOR.tools.copy,I=CKEDITOR.tools.trim,F=["","p","br","div"];CKEDITOR.FILTER_SKIP_TREE=2;CKEDITOR.filter=function(a){this.allowedContent=[];this.disallowedContent=
[];this.elementCallbacks=null;this.disabled=!1;this.editor=null;this.id=CKEDITOR.tools.getNextNumber();this._={allowedRules:{elements:{},generic:[]},disallowedRules:{elements:{},generic:[]},transformations:{},cachedTests:{},cachedChecks:{}};CKEDITOR.filter.instances[this.id]=this;if(a instanceof CKEDITOR.editor){a=this.editor=a;this.customConfig=!0;var b=a.config.allowedContent;!0===b?this.disabled=!0:(b||(this.customConfig=!1),this.allow(b,"config",1),this.allow(a.config.extraAllowedContent,"extra",
1),this.allow(F[a.enterMode]+" "+F[a.shiftEnterMode],"default",1),this.disallow(a.config.disallowedContent))}else this.customConfig=!1,this.allow(a,"default",1)};CKEDITOR.filter.instances={};CKEDITOR.filter.prototype={allow:function(b,c,d){if(!m(this,b,d))return!1;var e,f;if("string"==typeof b)b=g(b);else if(b instanceof CKEDITOR.style){if(b.toAllowedContentRules)return this.allow(b.toAllowedContentRules(this.editor),c,d);e=b.getDefinition();b={};d=e.attributes;b[e.element]=e={styles:e.styles,requiredStyles:e.styles&&
CKEDITOR.tools.objectKeys(e.styles)};d&&(d=E(d),e.classes=d["class"]?d["class"].split(/\s+/):null,e.requiredClasses=e.classes,delete d["class"],e.attributes=d,e.requiredAttributes=d&&CKEDITOR.tools.objectKeys(d))}else if(CKEDITOR.tools.isArray(b)){for(e=0;e<b.length;++e)f=this.allow(b[e],c,d);return f}a(this,b,c,this.allowedContent,this._.allowedRules);return!0},applyTo:function(a,b,c,d){if(this.disabled)return!1;var e=this,g=[],f=this.editor&&this.editor.config.protectedSource,h,l=!1,m={doFilter:!c,
doTransform:!0,doCallbacks:!0,toHtml:b};a.forEach(function(a){if(a.type==CKEDITOR.NODE_ELEMENT){if("off"==a.attributes["data-cke-filter"])return!1;if(!b||"span"!=a.name||!~CKEDITOR.tools.objectKeys(a.attributes).join("|").indexOf("data-cke-"))if(h=u(e,a,g,m),h&1)l=!0;else if(h&2)return!1}else if(a.type==CKEDITOR.NODE_COMMENT&&a.value.match(/^\{cke_protected\}(?!\{C\})/)){var c;a:{var d=decodeURIComponent(a.value.replace(/^\{cke_protected\}/,""));c=[];var q,k,t;if(f)for(k=0;k<f.length;++k)if((t=d.match(f[k]))&&
t[0].length==d.length){c=!0;break a}d=CKEDITOR.htmlParser.fragment.fromHtml(d);1==d.children.length&&(q=d.children[0]).type==CKEDITOR.NODE_ELEMENT&&u(e,q,c,m);c=!c.length}c||g.push(a)}},null,!0);g.length&&(l=!0);var k;a=[];d=F[d||(this.editor?this.editor.enterMode:CKEDITOR.ENTER_P)];for(var y;c=g.pop();)c.type==CKEDITOR.NODE_ELEMENT?t(c,d,a):c.remove();for(;k=a.pop();)if(c=k.el,c.parent)switch(y=G[c.parent.name]||G.span,k.check){case "it":G.$removeEmpty[c.name]&&!c.children.length?t(c,d,a):q(c)||
t(c,d,a);break;case "el-up":c.parent.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT||y[c.name]||t(c,d,a);break;case "parent-down":c.parent.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT||y[c.name]||t(c.parent,d,a)}return l},checkFeature:function(a){if(this.disabled||!a)return!0;a.toFeature&&(a=a.toFeature(this.editor));return!a.requiredContent||this.check(a.requiredContent)},disable:function(){this.disabled=!0},disallow:function(b){if(!m(this,b,!0))return!1;"string"==typeof b&&(b=g(b));a(this,b,null,this.disallowedContent,
this._.disallowedRules);return!0},addContentForms:function(a){if(!this.disabled&&a){var b,c,d=[],e;for(b=0;b<a.length&&!e;++b)c=a[b],("string"==typeof c||c instanceof CKEDITOR.style)&&this.check(c)&&(e=c);if(e){for(b=0;b<a.length;++b)d.push(z(a[b],e));this.addTransformations(d)}}},addElementCallback:function(a){this.elementCallbacks||(this.elementCallbacks=[]);this.elementCallbacks.push(a)},addFeature:function(a){if(this.disabled||!a)return!0;a.toFeature&&(a=a.toFeature(this.editor));this.allow(a.allowedContent,
a.name);this.addTransformations(a.contentTransformations);this.addContentForms(a.contentForms);return a.requiredContent&&(this.customConfig||this.disallowedContent.length)?this.check(a.requiredContent):!0},addTransformations:function(a){var b,c;if(!this.disabled&&a){var d=this._.transformations,e;for(e=0;e<a.length;++e){b=a[e];var g=void 0,f=void 0,h=void 0,l=void 0,m=void 0,q=void 0;c=[];for(f=0;f<b.length;++f)h=b[f],"string"==typeof h?(h=h.split(/\s*:\s*/),l=h[0],m=null,q=h[1]):(l=h.check,m=h.left,
q=h.right),g||(g=h,g=g.element?g.element:l?l.match(/^([a-z0-9]+)/i)[0]:g.left.getDefinition().element),m instanceof CKEDITOR.style&&(m=B(m)),c.push({check:l==g?null:l,left:m,right:"string"==typeof q?H(q):q});b=g;d[b]||(d[b]=[]);d[b].push(c)}}},check:function(a,b,c){if(this.disabled)return!0;if(CKEDITOR.tools.isArray(a)){for(var d=a.length;d--;)if(this.check(a[d],b,c))return!0;return!1}var e,f;if("string"==typeof a){f=a+"\x3c"+(!1===b?"0":"1")+(c?"1":"0")+"\x3e";if(f in this._.cachedChecks)return this._.cachedChecks[f];
d=g(a).$1;e=d.styles;var h=d.classes;d.name=d.elements;d.classes=h=h?h.split(/\s*,\s*/):[];d.styles=l(e);d.attributes=l(d.attributes);d.children=[];h.length&&(d.attributes["class"]=h.join(" "));e&&(d.attributes.style=CKEDITOR.tools.writeCssText(d.styles));e=d}else d=a.getDefinition(),e=d.styles,h=d.attributes||{},e&&!CKEDITOR.tools.isEmpty(e)?(e=E(e),h.style=CKEDITOR.tools.writeCssText(e,!0)):e={},e={name:d.element,attributes:h,classes:h["class"]?h["class"].split(/\s+/):[],styles:e,children:[]};var h=
CKEDITOR.tools.clone(e),m=[],q;if(!1!==b&&(q=this._.transformations[e.name])){for(d=0;d<q.length;++d)y(this,e,q[d]);w(e)}u(this,h,m,{doFilter:!0,doTransform:!1!==b,skipRequired:!c,skipFinalValidation:!c});b=0<m.length?!1:CKEDITOR.tools.objectCompare(e.attributes,h.attributes,!0)?!0:!1;"string"==typeof a&&(this._.cachedChecks[f]=b);return b},getAllowedEnterMode:function(){var a=["p","div","br"],b={p:CKEDITOR.ENTER_P,div:CKEDITOR.ENTER_DIV,br:CKEDITOR.ENTER_BR};return function(c,d){var e=a.slice(),
g;if(this.check(F[c]))return c;for(d||(e=e.reverse());g=e.pop();)if(this.check(g))return b[g];return CKEDITOR.ENTER_BR}}(),clone:function(){var a=new CKEDITOR.filter,b=CKEDITOR.tools.clone;a.allowedContent=b(this.allowedContent);a._.allowedRules=b(this._.allowedRules);a.disallowedContent=b(this.disallowedContent);a._.disallowedRules=b(this._.disallowedRules);a._.transformations=b(this._.transformations);a.disabled=this.disabled;a.editor=this.editor;return a},destroy:function(){delete CKEDITOR.filter.instances[this.id];
delete this._;delete this.allowedContent;delete this.disallowedContent}};var K={styles:1,attributes:1,classes:1},J={styles:"requiredStyles",attributes:"requiredAttributes",classes:"requiredClasses"},D=/^([a-z0-9\-*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i,Q={styles:/{([^}]+)}/,attrs:/\[([^\]]+)\]/,classes:/\(([^\)]+)\)/},N=/^cke:(object|embed|param)$/,R=/^(object|embed|param)$/,L;L=CKEDITOR.filter.transformationsTools={sizeToStyle:function(a){this.lengthToStyle(a,
"width");this.lengthToStyle(a,"height")},sizeToAttribute:function(a){this.lengthToAttribute(a,"width");this.lengthToAttribute(a,"height")},lengthToStyle:function(a,b,c){c=c||b;if(!(c in a.styles)){var d=a.attributes[b];d&&(/^\d+$/.test(d)&&(d+="px"),a.styles[c]=d)}delete a.attributes[b]},lengthToAttribute:function(a,b,c){c=c||b;if(!(c in a.attributes)){var d=a.styles[b],e=d&&d.match(/^(\d+)(?:\.\d*)?px$/);e?a.attributes[c]=e[1]:"cke-test"==d&&(a.attributes[c]="cke-test")}delete a.styles[b]},alignmentToStyle:function(a){if(!("float"in
a.styles)){var b=a.attributes.align;if("left"==b||"right"==b)a.styles["float"]=b}delete a.attributes.align},alignmentToAttribute:function(a){if(!("align"in a.attributes)){var b=a.styles["float"];if("left"==b||"right"==b)a.attributes.align=b}delete a.styles["float"]},splitBorderShorthand:function(a){function b(d){a.styles["border-top-width"]=c[d[0]];a.styles["border-right-width"]=c[d[1]];a.styles["border-bottom-width"]=c[d[2]];a.styles["border-left-width"]=c[d[3]]}if(a.styles.border){var c=a.styles.border.match(/([\.\d]+\w+)/g)||
["0px"];switch(c.length){case 1:a.styles["border-width"]=c[0];break;case 2:b([0,1,0,1]);break;case 3:b([0,1,2,1]);break;case 4:b([0,1,2,3])}a.styles["border-style"]=a.styles["border-style"]||(a.styles.border.match(/(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|initial|inherit)/)||[])[0];a.styles["border-style"]||delete a.styles["border-style"];delete a.styles.border}},listTypeToStyle:function(a){if(a.attributes.type)switch(a.attributes.type){case "a":a.styles["list-style-type"]=
"lower-alpha";break;case "A":a.styles["list-style-type"]="upper-alpha";break;case "i":a.styles["list-style-type"]="lower-roman";break;case "I":a.styles["list-style-type"]="upper-roman";break;case "1":a.styles["list-style-type"]="decimal";break;default:a.styles["list-style-type"]=a.attributes.type}},splitMarginShorthand:function(a){function b(d){a.styles["margin-top"]=c[d[0]];a.styles["margin-right"]=c[d[1]];a.styles["margin-bottom"]=c[d[2]];a.styles["margin-left"]=c[d[3]]}if(a.styles.margin){var c=
a.styles.margin.match(/(\-?[\.\d]+\w+)/g)||["0px"];switch(c.length){case 1:b([0,0,0,0]);break;case 2:b([0,1,0,1]);break;case 3:b([0,1,2,1]);break;case 4:b([0,1,2,3])}delete a.styles.margin}},matchesStyle:v,transform:function(a,b){if("string"==typeof b)a.name=b;else{var c=b.getDefinition(),d=c.styles,e=c.attributes,g,f,h,l;a.name=c.element;for(g in e)if("class"==g)for(c=a.classes.join("|"),h=e[g].split(/\s+/);l=h.pop();)-1==c.indexOf(l)&&a.classes.push(l);else a.attributes[g]=e[g];for(f in d)a.styles[f]=
d[f]}}}}(),function(){CKEDITOR.focusManager=function(a){if(a.focusManager)return a.focusManager;this.hasFocus=!1;this.currentActive=null;this._={editor:a};return this};CKEDITOR.focusManager._={blurDelay:200};CKEDITOR.focusManager.prototype={focus:function(a){this._.timer&&clearTimeout(this._.timer);a&&(this.currentActive=a);this.hasFocus||this._.locked||((a=CKEDITOR.currentInstance)&&a.focusManager.blur(1),this.hasFocus=!0,(a=this._.editor.container)&&a.addClass("cke_focus"),this._.editor.fire("focus"))},
lock:function(){this._.locked=1},unlock:function(){delete this._.locked},blur:function(a){function f(){if(this.hasFocus){this.hasFocus=!1;var a=this._.editor.container;a&&a.removeClass("cke_focus");this._.editor.fire("blur")}}if(!this._.locked){this._.timer&&clearTimeout(this._.timer);var b=CKEDITOR.focusManager._.blurDelay;a||!b?f.call(this):this._.timer=CKEDITOR.tools.setTimeout(function(){delete this._.timer;f.call(this)},b,this)}},add:function(a,f){var b=a.getCustomData("focusmanager");if(!b||
b!=this){b&&b.remove(a);var b="focus",c="blur";f&&(CKEDITOR.env.ie?(b="focusin",c="focusout"):CKEDITOR.event.useCapture=1);var e={blur:function(){a.equals(this.currentActive)&&this.blur()},focus:function(){this.focus(a)}};a.on(b,e.focus,this);a.on(c,e.blur,this);f&&(CKEDITOR.event.useCapture=0);a.setCustomData("focusmanager",this);a.setCustomData("focusmanager_handlers",e)}},remove:function(a){a.removeCustomData("focusmanager");var f=a.removeCustomData("focusmanager_handlers");a.removeListener("blur",
f.blur);a.removeListener("focus",f.focus)}}}(),CKEDITOR.keystrokeHandler=function(a){if(a.keystrokeHandler)return a.keystrokeHandler;this.keystrokes={};this.blockedKeystrokes={};this._={editor:a};return this},function(){var a,f=function(b){b=b.data;var e=b.getKeystroke(),f=this.keystrokes[e],k=this._.editor;a=!1===k.fire("key",{keyCode:e,domEvent:b});a||(f&&(a=!1!==k.execCommand(f,{from:"keystrokeHandler"})),a||(a=!!this.blockedKeystrokes[e]));a&&b.preventDefault(!0);return!a},b=function(b){a&&(a=
!1,b.data.preventDefault(!0))};CKEDITOR.keystrokeHandler.prototype={attach:function(a){a.on("keydown",f,this);if(CKEDITOR.env.gecko&&CKEDITOR.env.mac)a.on("keypress",b,this)}}}(),function(){CKEDITOR.lang={languages:{af:1,ar:1,az:1,bg:1,bn:1,bs:1,ca:1,cs:1,cy:1,da:1,de:1,"de-ch":1,el:1,"en-au":1,"en-ca":1,"en-gb":1,en:1,eo:1,es:1,"es-mx":1,et:1,eu:1,fa:1,fi:1,fo:1,"fr-ca":1,fr:1,gl:1,gu:1,he:1,hi:1,hr:1,hu:1,id:1,is:1,it:1,ja:1,ka:1,km:1,ko:1,ku:1,lt:1,lv:1,mk:1,mn:1,ms:1,nb:1,nl:1,no:1,oc:1,pl:1,
"pt-br":1,pt:1,ro:1,ru:1,si:1,sk:1,sl:1,sq:1,"sr-latn":1,sr:1,sv:1,th:1,tr:1,tt:1,ug:1,uk:1,vi:1,"zh-cn":1,zh:1},rtl:{ar:1,fa:1,he:1,ku:1,ug:1},load:function(a,f,b){a&&CKEDITOR.lang.languages[a]||(a=this.detect(f,a));var c=this;f=function(){c[a].dir=c.rtl[a]?"rtl":"ltr";b(a,c[a])};this[a]?f():CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/"+a+".js"),f,this)},detect:function(a,f){var b=this.languages;f=f||navigator.userLanguage||navigator.language||a;var c=f.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/),
e=c[1],c=c[2];b[e+"-"+c]?e=e+"-"+c:b[e]||(e=null);CKEDITOR.lang.detect=e?function(){return e}:function(a){return a};return e||a}}}(),CKEDITOR.scriptLoader=function(){var a={},f={};return{load:function(b,c,e,m){var k="string"==typeof b;k&&(b=[b]);e||(e=CKEDITOR);var d=b.length,h=[],l=[],g=function(a){c&&(k?c.call(e,a):c.call(e,h,l))};if(0===d)g(!0);else{var n=function(a,b){(b?h:l).push(a);0>=--d&&(m&&CKEDITOR.document.getDocumentElement().removeStyle("cursor"),g(b))},p=function(b,c){a[b]=1;var d=f[b];
delete f[b];for(var e=0;e<d.length;e++)d[e](b,c)},u=function(b){if(a[b])n(b,!0);else{var d=f[b]||(f[b]=[]);d.push(n);if(!(1<d.length)){var e=new CKEDITOR.dom.element("script");e.setAttributes({type:"text/javascript",src:b});c&&(CKEDITOR.env.ie&&(8>=CKEDITOR.env.version||CKEDITOR.env.ie9Compat)?e.$.onreadystatechange=function(){if("loaded"==e.$.readyState||"complete"==e.$.readyState)e.$.onreadystatechange=null,p(b,!0)}:(e.$.onload=function(){setTimeout(function(){p(b,!0)},0)},e.$.onerror=function(){p(b,
!1)}));e.appendTo(CKEDITOR.document.getHead())}}};m&&CKEDITOR.document.getDocumentElement().setStyle("cursor","wait");for(var C=0;C<d;C++)u(b[C])}},queue:function(){function a(){var b;(b=c[0])&&this.load(b.scriptUrl,b.callback,CKEDITOR,0)}var c=[];return function(e,f){var k=this;c.push({scriptUrl:e,callback:function(){f&&f.apply(this,arguments);c.shift();a.call(k)}});1==c.length&&a.call(this)}}()}}(),CKEDITOR.resourceManager=function(a,f){this.basePath=a;this.fileName=f;this.registered={};this.loaded=
{};this.externals={};this._={waitingList:{}}},CKEDITOR.resourceManager.prototype={add:function(a,f){if(this.registered[a])throw Error('[CKEDITOR.resourceManager.add] The resource name "'+a+'" is already registered.');var b=this.registered[a]=f||{};b.name=a;b.path=this.getPath(a);CKEDITOR.fire(a+CKEDITOR.tools.capitalize(this.fileName)+"Ready",b);return this.get(a)},get:function(a){return this.registered[a]||null},getPath:function(a){var f=this.externals[a];return CKEDITOR.getUrl(f&&f.dir||this.basePath+
a+"/")},getFilePath:function(a){var f=this.externals[a];return CKEDITOR.getUrl(this.getPath(a)+(f?f.file:this.fileName+".js"))},addExternal:function(a,f,b){a=a.split(",");for(var c=0;c<a.length;c++){var e=a[c];b||(f=f.replace(/[^\/]+$/,function(a){b=a;return""}));this.externals[e]={dir:f,file:b||this.fileName+".js"}}},load:function(a,f,b){CKEDITOR.tools.isArray(a)||(a=a?[a]:[]);for(var c=this.loaded,e=this.registered,m=[],k={},d={},h=0;h<a.length;h++){var l=a[h];if(l)if(c[l]||e[l])d[l]=this.get(l);
else{var g=this.getFilePath(l);m.push(g);g in k||(k[g]=[]);k[g].push(l)}}CKEDITOR.scriptLoader.load(m,function(a,e){if(e.length)throw Error('[CKEDITOR.resourceManager.load] Resource name "'+k[e[0]].join(",")+'" was not found at "'+e[0]+'".');for(var g=0;g<a.length;g++)for(var h=k[a[g]],l=0;l<h.length;l++){var m=h[l];d[m]=this.get(m);c[m]=1}f.call(b,d)},this)}},CKEDITOR.plugins=new CKEDITOR.resourceManager("plugins/","plugin"),CKEDITOR.plugins.load=CKEDITOR.tools.override(CKEDITOR.plugins.load,function(a){var f=
{};return function(b,c,e){var m={},k=function(b){a.call(this,b,function(a){CKEDITOR.tools.extend(m,a);var b=[],d;for(d in a){var n=a[d],p=n&&n.requires;if(!f[d]){if(n.icons)for(var u=n.icons.split(","),C=u.length;C--;)CKEDITOR.skin.addIcon(u[C],n.path+"icons/"+(CKEDITOR.env.hidpi&&n.hidpi?"hidpi/":"")+u[C]+".png");f[d]=1}if(p)for(p.split&&(p=p.split(",")),n=0;n<p.length;n++)m[p[n]]||b.push(p[n])}if(b.length)k.call(this,b);else{for(d in m)n=m[d],n.onLoad&&!n.onLoad._called&&(!1===n.onLoad()&&delete m[d],
n.onLoad._called=1);c&&c.call(e||window,m)}},this)};k.call(this,b)}}),CKEDITOR.plugins.setLang=function(a,f,b){var c=this.get(a);a=c.langEntries||(c.langEntries={});c=c.lang||(c.lang=[]);c.split&&(c=c.split(","));-1==CKEDITOR.tools.indexOf(c,f)&&c.push(f);a[f]=b},CKEDITOR.ui=function(a){if(a.ui)return a.ui;this.items={};this.instances={};this.editor=a;this._={handlers:{}};return this},CKEDITOR.ui.prototype={add:function(a,f,b){b.name=a.toLowerCase();var c=this.items[a]={type:f,command:b.command||
null,args:Array.prototype.slice.call(arguments,2)};CKEDITOR.tools.extend(c,b)},get:function(a){return this.instances[a]},create:function(a){var f=this.items[a],b=f&&this._.handlers[f.type],c=f&&f.command&&this.editor.getCommand(f.command),b=b&&b.create.apply(this,f.args);this.instances[a]=b;c&&c.uiItems.push(b);b&&!b.type&&(b.type=f.type);return b},addHandler:function(a,f){this._.handlers[a]=f},space:function(a){return CKEDITOR.document.getById(this.spaceId(a))},spaceId:function(a){return this.editor.id+
"_"+a}},CKEDITOR.event.implementOn(CKEDITOR.ui),function(){function a(a,e,g){CKEDITOR.event.call(this);a=a&&CKEDITOR.tools.clone(a);if(void 0!==e){if(!(e instanceof CKEDITOR.dom.element))throw Error("Expect element of type CKEDITOR.dom.element.");if(!g)throw Error("One of the element modes must be specified.");if(CKEDITOR.env.ie&&CKEDITOR.env.quirks&&g==CKEDITOR.ELEMENT_MODE_INLINE)throw Error("Inline element mode is not supported on IE quirks.");if(!b(e,g))throw Error('The specified element mode is not supported on element: "'+
e.getName()+'".');this.element=e;this.elementMode=g;this.name=this.elementMode!=CKEDITOR.ELEMENT_MODE_APPENDTO&&(e.getId()||e.getNameAtt())}else this.elementMode=CKEDITOR.ELEMENT_MODE_NONE;this._={};this.commands={};this.templates={};this.name=this.name||f();this.id=CKEDITOR.tools.getNextId();this.status="unloaded";this.config=CKEDITOR.tools.prototypedCopy(CKEDITOR.config);this.ui=new CKEDITOR.ui(this);this.focusManager=new CKEDITOR.focusManager(this);this.keystrokeHandler=new CKEDITOR.keystrokeHandler(this);
this.on("readOnly",c);this.on("selectionChange",function(a){m(this,a.data.path)});this.on("activeFilterChange",function(){m(this,this.elementPath(),!0)});this.on("mode",c);this.on("instanceReady",function(){this.config.startupFocus&&this.focus()});CKEDITOR.fire("instanceCreated",null,this);CKEDITOR.add(this);CKEDITOR.tools.setTimeout(function(){"destroyed"!==this.status?d(this,a):CKEDITOR.warn("editor-incorrect-destroy")},0,this)}function f(){do var a="editor"+ ++C;while(CKEDITOR.instances[a]);return a}
function b(a,b){return b==CKEDITOR.ELEMENT_MODE_INLINE?a.is(CKEDITOR.dtd.$editable)||a.is("textarea"):b==CKEDITOR.ELEMENT_MODE_REPLACE?!a.is(CKEDITOR.dtd.$nonBodyContent):1}function c(){var a=this.commands,b;for(b in a)e(this,a[b])}function e(a,b){b[b.startDisabled?"disable":a.readOnly&&!b.readOnly?"disable":b.modes[a.mode]?"enable":"disable"]()}function m(a,b,c){if(b){var d,e,g=a.commands;for(e in g)d=g[e],(c||d.contextSensitive)&&d.refresh(a,b)}}function k(a){var b=a.config.customConfig;if(!b)return!1;
var b=CKEDITOR.getUrl(b),c=w[b]||(w[b]={});c.fn?(c.fn.call(a,a.config),CKEDITOR.getUrl(a.config.customConfig)!=b&&k(a)||a.fireOnce("customConfigLoaded")):CKEDITOR.scriptLoader.queue(b,function(){c.fn=CKEDITOR.editorConfig?CKEDITOR.editorConfig:function(){};k(a)});return!0}function d(a,b){a.on("customConfigLoaded",function(){if(b){if(b.on)for(var c in b.on)a.on(c,b.on[c]);CKEDITOR.tools.extend(a.config,b,!0);delete a.config.on}c=a.config;a.readOnly=c.readOnly?!0:a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?
a.element.is("textarea")?a.element.hasAttribute("disabled")||a.element.hasAttribute("readonly"):a.element.isReadOnly():a.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE?a.element.hasAttribute("disabled")||a.element.hasAttribute("readonly"):!1;a.blockless=a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?!(a.element.is("textarea")||CKEDITOR.dtd[a.element.getName()].p):!1;a.tabIndex=c.tabIndex||a.element&&a.element.getAttribute("tabindex")||0;a.activeEnterMode=a.enterMode=a.blockless?CKEDITOR.ENTER_BR:c.enterMode;
a.activeShiftEnterMode=a.shiftEnterMode=a.blockless?CKEDITOR.ENTER_BR:c.shiftEnterMode;c.skin&&(CKEDITOR.skinName=c.skin);a.fireOnce("configLoaded");a.dataProcessor=new CKEDITOR.htmlDataProcessor(a);a.filter=a.activeFilter=new CKEDITOR.filter(a);h(a)});b&&null!=b.customConfig&&(a.config.customConfig=b.customConfig);k(a)||a.fireOnce("customConfigLoaded")}function h(a){CKEDITOR.skin.loadPart("editor",function(){l(a)})}function l(a){CKEDITOR.lang.load(a.config.language,a.config.defaultLanguage,function(b,
c){var d=a.config.title;a.langCode=b;a.lang=CKEDITOR.tools.prototypedCopy(c);a.title="string"==typeof d||!1===d?d:[a.lang.editor,a.name].join(", ");a.config.contentsLangDirection||(a.config.contentsLangDirection=a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?a.element.getDirection(1):a.lang.dir);a.fire("langLoaded");g(a)})}function g(a){a.getStylesSet(function(b){a.once("loaded",function(){a.fire("stylesSet",{styles:b})},null,null,1);n(a)})}function n(a){var b=a.config,c=b.plugins,d=b.extraPlugins,e=
b.removePlugins;if(d)var g=new RegExp("(?:^|,)(?:"+d.replace(/\s*,\s*/g,"|")+")(?\x3d,|$)","g"),c=c.replace(g,""),c=c+(","+d);if(e)var f=new RegExp("(?:^|,)(?:"+e.replace(/\s*,\s*/g,"|")+")(?\x3d,|$)","g"),c=c.replace(f,"");CKEDITOR.env.air&&(c+=",adobeair");CKEDITOR.plugins.load(c.split(","),function(c){var d=[],e=[],g=[];a.plugins=c;for(var h in c){var l=c[h],m=l.lang,k=null,t=l.requires,y;CKEDITOR.tools.isArray(t)&&(t=t.join(","));if(t&&(y=t.match(f)))for(;t=y.pop();)CKEDITOR.error("editor-plugin-required",
{plugin:t.replace(",",""),requiredBy:h});m&&!a.lang[h]&&(m.split&&(m=m.split(",")),0<=CKEDITOR.tools.indexOf(m,a.langCode)?k=a.langCode:(k=a.langCode.replace(/-.*/,""),k=k!=a.langCode&&0<=CKEDITOR.tools.indexOf(m,k)?k:0<=CKEDITOR.tools.indexOf(m,"en")?"en":m[0]),l.langEntries&&l.langEntries[k]?(a.lang[h]=l.langEntries[k],k=null):g.push(CKEDITOR.getUrl(l.path+"lang/"+k+".js")));e.push(k);d.push(l)}CKEDITOR.scriptLoader.load(g,function(){for(var c=["beforeInit","init","afterInit"],g=0;g<c.length;g++)for(var f=
0;f<d.length;f++){var h=d[f];0===g&&e[f]&&h.lang&&h.langEntries&&(a.lang[h.name]=h.langEntries[e[f]]);if(h[c[g]])h[c[g]](a)}a.fireOnce("pluginsLoaded");b.keystrokes&&a.setKeystroke(a.config.keystrokes);for(f=0;f<a.config.blockedKeystrokes.length;f++)a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[f]]=1;a.status="loaded";a.fireOnce("loaded");CKEDITOR.fire("instanceLoaded",null,a)})})}function p(){var a=this.element;if(a&&this.elementMode!=CKEDITOR.ELEMENT_MODE_APPENDTO){var b=this.getData();
this.config.htmlEncodeOutput&&(b=CKEDITOR.tools.htmlEncode(b));a.is("textarea")?a.setValue(b):a.setHtml(b);return!0}return!1}function u(a,b){function c(a){var b=a.startContainer,d=a.endContainer;return b.is&&(b.is("tr")||b.is("td")&&b.equals(d)&&a.endOffset===b.getChildCount())?!0:!1}function d(a){var b=a.startContainer;return b.is("tr")?a.cloneContents():b.clone(!0)}for(var e=new CKEDITOR.dom.documentFragment,g,f,h,l=0;l<a.length;l++){var m=a[l],k=m.startContainer.getAscendant("tr",!0);c(m)?(g||
(g=k.getAscendant("table").clone(),g.append(k.getAscendant({thead:1,tbody:1,tfoot:1}).clone()),e.append(g),g=g.findOne("thead, tbody, tfoot")),f&&f.equals(k)||(f=k,h=k.clone(),g.append(h)),h.append(d(m))):e.append(m.cloneContents())}return g?e:b.getHtmlFromRange(a[0])}a.prototype=CKEDITOR.editor.prototype;CKEDITOR.editor=a;var C=0,w={};CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{addCommand:function(a,b){b.name=a.toLowerCase();var c=new CKEDITOR.command(this,b);this.mode&&e(this,c);return this.commands[a]=
c},_attachToForm:function(){function a(b){c.updateElement();c._.required&&!d.getValue()&&!1===c.fire("required")&&b.data.preventDefault()}function b(a){return!!(a&&a.call&&a.apply)}var c=this,d=c.element,e=new CKEDITOR.dom.element(d.$.form);d.is("textarea")&&e&&(e.on("submit",a),b(e.$.submit)&&(e.$.submit=CKEDITOR.tools.override(e.$.submit,function(b){return function(){a();b.apply?b.apply(this):b()}})),c.on("destroy",function(){e.removeListener("submit",a)}))},destroy:function(a){this.fire("beforeDestroy");
!a&&p.call(this);this.editable(null);this.filter&&(this.filter.destroy(),delete this.filter);delete this.activeFilter;this.status="destroyed";this.fire("destroy");this.removeAllListeners();CKEDITOR.remove(this);CKEDITOR.fire("instanceDestroyed",null,this)},elementPath:function(a){if(!a){a=this.getSelection();if(!a)return null;a=a.getStartElement()}return a?new CKEDITOR.dom.elementPath(a,this.editable()):null},createRange:function(){var a=this.editable();return a?new CKEDITOR.dom.range(a):null},execCommand:function(a,
b){var c=this.getCommand(a),d={name:a,commandData:b||{},command:c};return c&&c.state!=CKEDITOR.TRISTATE_DISABLED&&!1!==this.fire("beforeCommandExec",d)&&(d.returnValue=c.exec(d.commandData),!c.async&&!1!==this.fire("afterCommandExec",d))?d.returnValue:!1},getCommand:function(a){return this.commands[a]},getData:function(a){!a&&this.fire("beforeGetData");var b=this._.data;"string"!=typeof b&&(b=(b=this.element)&&this.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE?b.is("textarea")?b.getValue():b.getHtml():
"");b={dataValue:b};!a&&this.fire("getData",b);return b.dataValue},getSnapshot:function(){var a=this.fire("getSnapshot");"string"!=typeof a&&(a=(a=this.element)&&this.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE?a.is("textarea")?a.getValue():a.getHtml():"");return a},loadSnapshot:function(a){this.fire("loadSnapshot",a)},setData:function(a,b,c){var d=!0,e=b;b&&"object"==typeof b&&(c=b.internal,e=b.callback,d=!b.noSnapshot);!c&&d&&this.fire("saveSnapshot");if(e||!c)this.once("dataReady",function(a){!c&&
d&&this.fire("saveSnapshot");e&&e.call(a.editor)});a={dataValue:a};!c&&this.fire("setData",a);this._.data=a.dataValue;!c&&this.fire("afterSetData",a)},setReadOnly:function(a){a=null==a||a;this.readOnly!=a&&(this.readOnly=a,this.keystrokeHandler.blockedKeystrokes[8]=+a,this.editable().setReadOnly(a),this.fire("readOnly"))},insertHtml:function(a,b,c){this.fire("insertHtml",{dataValue:a,mode:b,range:c})},insertText:function(a){this.fire("insertText",a)},insertElement:function(a){this.fire("insertElement",
a)},getSelectedHtml:function(a){var b=this.editable(),c=this.getSelection(),c=c&&c.getRanges();if(!b||!c||0===c.length)return null;b=u(c,b);return a?b.getHtml():b},extractSelectedHtml:function(a,b){var c=this.editable(),d=this.getSelection().getRanges(),e=new CKEDITOR.dom.documentFragment,g;if(!c||0===d.length)return null;for(g=0;g<d.length;g++)e.append(c.extractHtmlFromRange(d[g],b));b||this.getSelection().selectRanges([d[0]]);return a?e.getHtml():e},focus:function(){this.fire("beforeFocus")},checkDirty:function(){return"ready"==
this.status&&this._.previousValue!==this.getSnapshot()},resetDirty:function(){this._.previousValue=this.getSnapshot()},updateElement:function(){return p.call(this)},setKeystroke:function(){for(var a=this.keystrokeHandler.keystrokes,b=CKEDITOR.tools.isArray(arguments[0])?arguments[0]:[[].slice.call(arguments,0)],c,d,e=b.length;e--;)c=b[e],d=0,CKEDITOR.tools.isArray(c)&&(d=c[1],c=c[0]),d?a[c]=d:delete a[c]},getCommandKeystroke:function(a){if(a="string"===typeof a?this.getCommand(a):a){var b=CKEDITOR.tools.object.findKey(this.commands,
a),c=this.keystrokeHandler.keystrokes,d;if(a.fakeKeystroke)return a.fakeKeystroke;for(d in c)if(c.hasOwnProperty(d)&&c[d]==b)return d}return null},addFeature:function(a){return this.filter.addFeature(a)},setActiveFilter:function(a){a||(a=this.filter);this.activeFilter!==a&&(this.activeFilter=a,this.fire("activeFilterChange"),a===this.filter?this.setActiveEnterMode(null,null):this.setActiveEnterMode(a.getAllowedEnterMode(this.enterMode),a.getAllowedEnterMode(this.shiftEnterMode,!0)))},setActiveEnterMode:function(a,
b){a=a?this.blockless?CKEDITOR.ENTER_BR:a:this.enterMode;b=b?this.blockless?CKEDITOR.ENTER_BR:b:this.shiftEnterMode;if(this.activeEnterMode!=a||this.activeShiftEnterMode!=b)this.activeEnterMode=a,this.activeShiftEnterMode=b,this.fire("activeEnterModeChange")},showNotification:function(a){alert(a)}})}(),CKEDITOR.ELEMENT_MODE_NONE=0,CKEDITOR.ELEMENT_MODE_REPLACE=1,CKEDITOR.ELEMENT_MODE_APPENDTO=2,CKEDITOR.ELEMENT_MODE_INLINE=3,CKEDITOR.htmlParser=function(){this._={htmlPartsRegex:/<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--\x3e)|(?:([^\/\s>]+)((?:\s+[\w\-:.]+(?:\s*=\s*?(?:(?:"[^"]*")|(?:'[^']*')|[^\s"'\/>]+))?)*)[\S\s]*?(\/?)>))/g}},
function(){var a=/([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,f={checked:1,compact:1,declare:1,defer:1,disabled:1,ismap:1,multiple:1,nohref:1,noresize:1,noshade:1,nowrap:1,readonly:1,selected:1};CKEDITOR.htmlParser.prototype={onTagOpen:function(){},onTagClose:function(){},onText:function(){},onCDATA:function(){},onComment:function(){},parse:function(b){for(var c,e,m=0,k;c=this._.htmlPartsRegex.exec(b);){e=c.index;if(e>m)if(m=b.substring(m,e),k)k.push(m);else this.onText(m);
m=this._.htmlPartsRegex.lastIndex;if(e=c[1])if(e=e.toLowerCase(),k&&CKEDITOR.dtd.$cdata[e]&&(this.onCDATA(k.join("")),k=null),!k){this.onTagClose(e);continue}if(k)k.push(c[0]);else if(e=c[3]){if(e=e.toLowerCase(),!/="/.test(e)){var d={},h,l=c[4];c=!!c[5];if(l)for(;h=a.exec(l);){var g=h[1].toLowerCase();h=h[2]||h[3]||h[4]||"";d[g]=!h&&f[g]?g:CKEDITOR.tools.htmlDecodeAttr(h)}this.onTagOpen(e,d,c);!k&&CKEDITOR.dtd.$cdata[e]&&(k=[])}}else if(e=c[2])this.onComment(e)}if(b.length>m)this.onText(b.substring(m,
b.length))}}}(),CKEDITOR.htmlParser.basicWriter=CKEDITOR.tools.createClass({$:function(){this._={output:[]}},proto:{openTag:function(a){this._.output.push("\x3c",a)},openTagClose:function(a,f){f?this._.output.push(" /\x3e"):this._.output.push("\x3e")},attribute:function(a,f){"string"==typeof f&&(f=CKEDITOR.tools.htmlEncodeAttr(f));this._.output.push(" ",a,'\x3d"',f,'"')},closeTag:function(a){this._.output.push("\x3c/",a,"\x3e")},text:function(a){this._.output.push(a)},comment:function(a){this._.output.push("\x3c!--",
a,"--\x3e")},write:function(a){this._.output.push(a)},reset:function(){this._.output=[];this._.indent=!1},getHtml:function(a){var f=this._.output.join("");a&&this.reset();return f}}}),"use strict",function(){CKEDITOR.htmlParser.node=function(){};CKEDITOR.htmlParser.node.prototype={remove:function(){var a=this.parent.children,f=CKEDITOR.tools.indexOf(a,this),b=this.previous,c=this.next;b&&(b.next=c);c&&(c.previous=b);a.splice(f,1);this.parent=null},replaceWith:function(a){var f=this.parent.children,
b=CKEDITOR.tools.indexOf(f,this),c=a.previous=this.previous,e=a.next=this.next;c&&(c.next=a);e&&(e.previous=a);f[b]=a;a.parent=this.parent;this.parent=null},insertAfter:function(a){var f=a.parent.children,b=CKEDITOR.tools.indexOf(f,a),c=a.next;f.splice(b+1,0,this);this.next=a.next;this.previous=a;a.next=this;c&&(c.previous=this);this.parent=a.parent},insertBefore:function(a){var f=a.parent.children,b=CKEDITOR.tools.indexOf(f,a);f.splice(b,0,this);this.next=a;(this.previous=a.previous)&&(a.previous.next=
this);a.previous=this;this.parent=a.parent},getAscendant:function(a){var f="function"==typeof a?a:"string"==typeof a?function(b){return b.name==a}:function(b){return b.name in a},b=this.parent;for(;b&&b.type==CKEDITOR.NODE_ELEMENT;){if(f(b))return b;b=b.parent}return null},wrapWith:function(a){this.replaceWith(a);a.add(this);return a},getIndex:function(){return CKEDITOR.tools.indexOf(this.parent.children,this)},getFilterContext:function(a){return a||{}}}}(),"use strict",CKEDITOR.htmlParser.comment=
function(a){this.value=a;this._={isBlockLike:!1}},CKEDITOR.htmlParser.comment.prototype=CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node,{type:CKEDITOR.NODE_COMMENT,filter:function(a,f){var b=this.value;if(!(b=a.onComment(f,b,this)))return this.remove(),!1;if("string"!=typeof b)return this.replaceWith(b),!1;this.value=b;return!0},writeHtml:function(a,f){f&&this.filter(f);a.comment(this.value)}}),"use strict",function(){CKEDITOR.htmlParser.text=function(a){this.value=a;this._={isBlockLike:!1}};CKEDITOR.htmlParser.text.prototype=
CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node,{type:CKEDITOR.NODE_TEXT,filter:function(a,f){if(!(this.value=a.onText(f,this.value,this)))return this.remove(),!1},writeHtml:function(a,f){f&&this.filter(f);a.text(this.value)}})}(),"use strict",function(){CKEDITOR.htmlParser.cdata=function(a){this.value=a};CKEDITOR.htmlParser.cdata.prototype=CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node,{type:CKEDITOR.NODE_TEXT,filter:function(){},writeHtml:function(a){a.write(this.value)}})}(),"use strict",
CKEDITOR.htmlParser.fragment=function(){this.children=[];this.parent=null;this._={isBlockLike:!0,hasInlineStarted:!1}},function(){function a(a){return a.attributes["data-cke-survive"]?!1:"a"==a.name&&a.attributes.href||CKEDITOR.dtd.$removeEmpty[a.name]}var f=CKEDITOR.tools.extend({table:1,ul:1,ol:1,dl:1},CKEDITOR.dtd.table,CKEDITOR.dtd.ul,CKEDITOR.dtd.ol,CKEDITOR.dtd.dl),b={ol:1,ul:1},c=CKEDITOR.tools.extend({},{html:1},CKEDITOR.dtd.html,CKEDITOR.dtd.body,CKEDITOR.dtd.head,{style:1,script:1}),e={ul:"li",
ol:"li",dl:"dd",table:"tbody",tbody:"tr",thead:"tr",tfoot:"tr",tr:"td"};CKEDITOR.htmlParser.fragment.fromHtml=function(m,k,d){function h(a){var b;if(0<q.length)for(var c=0;c<q.length;c++){var d=q[c],e=d.name,g=CKEDITOR.dtd[e],f=r.name&&CKEDITOR.dtd[r.name];f&&!f[e]||a&&g&&!g[a]&&CKEDITOR.dtd[a]?e==r.name&&(n(r,r.parent,1),c--):(b||(l(),b=1),d=d.clone(),d.parent=r,r=d,q.splice(c,1),c--)}}function l(){for(;x.length;)n(x.shift(),r)}function g(a){if(a._.isBlockLike&&"pre"!=a.name&&"textarea"!=a.name){var b=
a.children.length,c=a.children[b-1],d;c&&c.type==CKEDITOR.NODE_TEXT&&((d=CKEDITOR.tools.rtrim(c.value))?c.value=d:a.children.length=b-1)}}function n(b,c,e){c=c||r||w;var f=r;void 0===b.previous&&(p(c,b)&&(r=c,C.onTagOpen(d,{}),b.returnPoint=c=r),g(b),a(b)&&!b.children.length||c.add(b),"pre"==b.name&&(t=!1),"textarea"==b.name&&(A=!1));b.returnPoint?(r=b.returnPoint,delete b.returnPoint):r=e?c:f}function p(a,b){if((a==w||"body"==a.name)&&d&&(!a.name||CKEDITOR.dtd[a.name][d])){var c,e;return(c=b.attributes&&
(e=b.attributes["data-cke-real-element-type"])?e:b.name)&&c in CKEDITOR.dtd.$inline&&!(c in CKEDITOR.dtd.head)&&!b.isOrphan||b.type==CKEDITOR.NODE_TEXT}}function u(a,b){return a in CKEDITOR.dtd.$listItem||a in CKEDITOR.dtd.$tableContent?a==b||"dt"==a&&"dd"==b||"dd"==a&&"dt"==b:!1}var C=new CKEDITOR.htmlParser,w=k instanceof CKEDITOR.htmlParser.element?k:"string"==typeof k?new CKEDITOR.htmlParser.element(k):new CKEDITOR.htmlParser.fragment,q=[],x=[],r=w,A="textarea"==w.name,t="pre"==w.name;C.onTagOpen=
function(d,e,g,m){e=new CKEDITOR.htmlParser.element(d,e);e.isUnknown&&g&&(e.isEmpty=!0);e.isOptionalClose=m;if(a(e))q.push(e);else{if("pre"==d)t=!0;else{if("br"==d&&t){r.add(new CKEDITOR.htmlParser.text("\n"));return}"textarea"==d&&(A=!0)}if("br"==d)x.push(e);else{for(;!(m=(g=r.name)?CKEDITOR.dtd[g]||(r._.isBlockLike?CKEDITOR.dtd.div:CKEDITOR.dtd.span):c,e.isUnknown||r.isUnknown||m[d]);)if(r.isOptionalClose)C.onTagClose(g);else if(d in b&&g in b)g=r.children,(g=g[g.length-1])&&"li"==g.name||n(g=new CKEDITOR.htmlParser.element("li"),
r),!e.returnPoint&&(e.returnPoint=r),r=g;else if(d in CKEDITOR.dtd.$listItem&&!u(d,g))C.onTagOpen("li"==d?"ul":"dl",{},0,1);else if(g in f&&!u(d,g))!e.returnPoint&&(e.returnPoint=r),r=r.parent;else if(g in CKEDITOR.dtd.$inline&&q.unshift(r),r.parent)n(r,r.parent,1);else{e.isOrphan=1;break}h(d);l();e.parent=r;e.isEmpty?n(e):r=e}}};C.onTagClose=function(a){for(var b=q.length-1;0<=b;b--)if(a==q[b].name){q.splice(b,1);return}for(var c=[],e=[],g=r;g!=w&&g.name!=a;)g._.isBlockLike||e.unshift(g),c.push(g),
g=g.returnPoint||g.parent;if(g!=w){for(b=0;b<c.length;b++){var f=c[b];n(f,f.parent)}r=g;g._.isBlockLike&&l();n(g,g.parent);g==r&&(r=r.parent);q=q.concat(e)}"body"==a&&(d=!1)};C.onText=function(a){if(!(r._.hasInlineStarted&&!x.length||t||A)&&(a=CKEDITOR.tools.ltrim(a),0===a.length))return;var b=r.name,g=b?CKEDITOR.dtd[b]||(r._.isBlockLike?CKEDITOR.dtd.div:CKEDITOR.dtd.span):c;if(!A&&!g["#"]&&b in f)C.onTagOpen(e[b]||""),C.onText(a);else{l();h();t||A||(a=a.replace(/[\t\r\n ]{2,}|[\t\r\n]/g," "));a=
new CKEDITOR.htmlParser.text(a);if(p(r,a))this.onTagOpen(d,{},0,1);r.add(a)}};C.onCDATA=function(a){r.add(new CKEDITOR.htmlParser.cdata(a))};C.onComment=function(a){l();h();r.add(new CKEDITOR.htmlParser.comment(a))};C.parse(m);for(l();r!=w;)n(r,r.parent,1);g(w);return w};CKEDITOR.htmlParser.fragment.prototype={type:CKEDITOR.NODE_DOCUMENT_FRAGMENT,add:function(a,b){isNaN(b)&&(b=this.children.length);var c=0<b?this.children[b-1]:null;if(c){if(a._.isBlockLike&&c.type==CKEDITOR.NODE_TEXT&&(c.value=CKEDITOR.tools.rtrim(c.value),
0===c.value.length)){this.children.pop();this.add(a);return}c.next=a}a.previous=c;a.parent=this;this.children.splice(b,0,a);this._.hasInlineStarted||(this._.hasInlineStarted=a.type==CKEDITOR.NODE_TEXT||a.type==CKEDITOR.NODE_ELEMENT&&!a._.isBlockLike)},filter:function(a,b){b=this.getFilterContext(b);a.onRoot(b,this);this.filterChildren(a,!1,b)},filterChildren:function(a,b,c){if(this.childrenFilteredBy!=a.id){c=this.getFilterContext(c);if(b&&!this.parent)a.onRoot(c,this);this.childrenFilteredBy=a.id;
for(b=0;b<this.children.length;b++)!1===this.children[b].filter(a,c)&&b--}},writeHtml:function(a,b){b&&this.filter(b);this.writeChildrenHtml(a)},writeChildrenHtml:function(a,b,c){var e=this.getFilterContext();if(c&&!this.parent&&b)b.onRoot(e,this);b&&this.filterChildren(b,!1,e);b=0;c=this.children;for(e=c.length;b<e;b++)c[b].writeHtml(a)},forEach:function(a,b,c){if(!(c||b&&this.type!=b))var e=a(this);if(!1!==e){c=this.children;for(var f=0;f<c.length;f++)e=c[f],e.type==CKEDITOR.NODE_ELEMENT?e.forEach(a,
b):b&&e.type!=b||a(e)}},getFilterContext:function(a){return a||{}}}}(),"use strict",function(){function a(){this.rules=[]}function f(b,c,e,f){var k,d;for(k in c)(d=b[k])||(d=b[k]=new a),d.add(c[k],e,f)}CKEDITOR.htmlParser.filter=CKEDITOR.tools.createClass({$:function(b){this.id=CKEDITOR.tools.getNextNumber();this.elementNameRules=new a;this.attributeNameRules=new a;this.elementsRules={};this.attributesRules={};this.textRules=new a;this.commentRules=new a;this.rootRules=new a;b&&this.addRules(b,10)},
proto:{addRules:function(a,c){var e;"number"==typeof c?e=c:c&&"priority"in c&&(e=c.priority);"number"!=typeof e&&(e=10);"object"!=typeof c&&(c={});a.elementNames&&this.elementNameRules.addMany(a.elementNames,e,c);a.attributeNames&&this.attributeNameRules.addMany(a.attributeNames,e,c);a.elements&&f(this.elementsRules,a.elements,e,c);a.attributes&&f(this.attributesRules,a.attributes,e,c);a.text&&this.textRules.add(a.text,e,c);a.comment&&this.commentRules.add(a.comment,e,c);a.root&&this.rootRules.add(a.root,
e,c)},applyTo:function(a){a.filter(this)},onElementName:function(a,c){return this.elementNameRules.execOnName(a,c)},onAttributeName:function(a,c){return this.attributeNameRules.execOnName(a,c)},onText:function(a,c,e){return this.textRules.exec(a,c,e)},onComment:function(a,c,e){return this.commentRules.exec(a,c,e)},onRoot:function(a,c){return this.rootRules.exec(a,c)},onElement:function(a,c){for(var e=[this.elementsRules["^"],this.elementsRules[c.name],this.elementsRules.$],f,k=0;3>k;k++)if(f=e[k]){f=
f.exec(a,c,this);if(!1===f)return null;if(f&&f!=c)return this.onNode(a,f);if(c.parent&&!c.name)break}return c},onNode:function(a,c){var e=c.type;return e==CKEDITOR.NODE_ELEMENT?this.onElement(a,c):e==CKEDITOR.NODE_TEXT?new CKEDITOR.htmlParser.text(this.onText(a,c.value)):e==CKEDITOR.NODE_COMMENT?new CKEDITOR.htmlParser.comment(this.onComment(a,c.value)):null},onAttribute:function(a,c,e,f){return(e=this.attributesRules[e])?e.exec(a,f,c,this):f}}});CKEDITOR.htmlParser.filterRulesGroup=a;a.prototype=
{add:function(a,c,e){this.rules.splice(this.findIndex(c),0,{value:a,priority:c,options:e})},addMany:function(a,c,e){for(var f=[this.findIndex(c),0],k=0,d=a.length;k<d;k++)f.push({value:a[k],priority:c,options:e});this.rules.splice.apply(this.rules,f)},findIndex:function(a){for(var c=this.rules,e=c.length-1;0<=e&&a<c[e].priority;)e--;return e+1},exec:function(a,c){var e=c instanceof CKEDITOR.htmlParser.node||c instanceof CKEDITOR.htmlParser.fragment,f=Array.prototype.slice.call(arguments,1),k=this.rules,
d=k.length,h,l,g,n;for(n=0;n<d;n++)if(e&&(h=c.type,l=c.name),g=k[n],!(a.nonEditable&&!g.options.applyToAll||a.nestedEditable&&g.options.excludeNestedEditable)){g=g.value.apply(null,f);if(!1===g||e&&g&&(g.name!=l||g.type!=h))return g;null!=g&&(f[0]=c=g)}return c},execOnName:function(a,c){for(var e=0,f=this.rules,k=f.length,d;c&&e<k;e++)d=f[e],a.nonEditable&&!d.options.applyToAll||a.nestedEditable&&d.options.excludeNestedEditable||(c=c.replace(d.value[0],d.value[1]));return c}}}(),function(){function a(a,
d){function g(a){return a||CKEDITOR.env.needsNbspFiller?new CKEDITOR.htmlParser.text(" "):new CKEDITOR.htmlParser.element("br",{"data-cke-bogus":1})}function f(a,d){return function(e){if(e.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT){var f=[],l=b(e),k,t;if(l)for(h(l,1)&&f.push(l);l;)m(l)&&(k=c(l))&&h(k)&&((t=c(k))&&!m(t)?f.push(k):(g(D).insertAfter(k),k.remove())),l=l.previous;for(l=0;l<f.length;l++)f[l].remove();if(f=!a||!1!==("function"==typeof d?d(e):d))D||CKEDITOR.env.needsBrFiller||e.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT?
D||CKEDITOR.env.needsBrFiller||!(7<document.documentMode||e.name in CKEDITOR.dtd.tr||e.name in CKEDITOR.dtd.$listItem)?(f=b(e),f=!f||"form"==e.name&&"input"==f.name):f=!1:f=!1;f&&e.add(g(a))}}}function h(a,b){if((!D||CKEDITOR.env.needsBrFiller)&&a.type==CKEDITOR.NODE_ELEMENT&&"br"==a.name&&!a.attributes["data-cke-eol"])return!0;var c;return a.type==CKEDITOR.NODE_TEXT&&(c=a.value.match(q))&&(c.index&&((new CKEDITOR.htmlParser.text(a.value.substring(0,c.index))).insertBefore(a),a.value=c[0]),!CKEDITOR.env.needsBrFiller&&
D&&(!b||a.parent.name in J)||!D&&((c=a.previous)&&"br"==c.name||!c||m(c)))?!0:!1}var l={elements:{}},D="html"==d,J=CKEDITOR.tools.extend({},t),n;for(n in J)"#"in r[n]||delete J[n];for(n in J)l.elements[n]=f(D,a.config.fillEmptyBlocks);l.root=f(D,!1);l.elements.br=function(a){return function(b){if(b.parent.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT){var d=b.attributes;if("data-cke-bogus"in d||"data-cke-eol"in d)delete d["data-cke-bogus"];else{for(d=b.next;d&&e(d);)d=d.next;var f=c(b);!d&&m(b.parent)?k(b.parent,
g(a)):m(d)&&f&&!m(f)&&g(a).insertBefore(d)}}}}(D);return l}function f(a,b){return a!=CKEDITOR.ENTER_BR&&!1!==b?a==CKEDITOR.ENTER_DIV?"div":"p":!1}function b(a){for(a=a.children[a.children.length-1];a&&e(a);)a=a.previous;return a}function c(a){for(a=a.previous;a&&e(a);)a=a.previous;return a}function e(a){return a.type==CKEDITOR.NODE_TEXT&&!CKEDITOR.tools.trim(a.value)||a.type==CKEDITOR.NODE_ELEMENT&&a.attributes["data-cke-bookmark"]}function m(a){return a&&(a.type==CKEDITOR.NODE_ELEMENT&&a.name in
t||a.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT)}function k(a,b){var c=a.children[a.children.length-1];a.children.push(b);b.parent=a;c&&(c.next=b,b.previous=c)}function d(a){a=a.attributes;"false"!=a.contenteditable&&(a["data-cke-editable"]=a.contenteditable?"true":1);a.contenteditable="false"}function h(a){a=a.attributes;switch(a["data-cke-editable"]){case "true":a.contenteditable="true";break;case "1":delete a.contenteditable}}function l(a){return a.replace(H,function(a,b,c){return"\x3c"+b+c.replace(G,
function(a,b){return E.test(b)&&-1==c.indexOf("data-cke-saved-"+b)?" data-cke-saved-"+a+" data-cke-"+CKEDITOR.rnd+"-"+a:a})+"\x3e"})}function g(a,b){return a.replace(b,function(a,b,c){0===a.indexOf("\x3ctextarea")&&(a=b+u(c).replace(/</g,"\x26lt;").replace(/>/g,"\x26gt;")+"\x3c/textarea\x3e");return"\x3ccke:encoded\x3e"+encodeURIComponent(a)+"\x3c/cke:encoded\x3e"})}function n(a){return a.replace(K,function(a,b){return decodeURIComponent(b)})}function p(a){return a.replace(/\x3c!--(?!{cke_protected})[\s\S]+?--\x3e/g,
function(a){return"\x3c!--"+x+"{C}"+encodeURIComponent(a).replace(/--/g,"%2D%2D")+"--\x3e"})}function u(a){return a.replace(/\x3c!--\{cke_protected\}\{C\}([\s\S]+?)--\x3e/g,function(a,b){return decodeURIComponent(b)})}function C(a,b){var c=b._.dataStore;return a.replace(/\x3c!--\{cke_protected\}([\s\S]+?)--\x3e/g,function(a,b){return decodeURIComponent(b)}).replace(/\{cke_protected_(\d+)\}/g,function(a,b){return c&&c[b]||""})}function w(a,b){var c=[],d=b.config.protectedSource,e=b._.dataStore||(b._.dataStore=
{id:1}),g=/<\!--\{cke_temp(comment)?\}(\d*?)--\x3e/g,d=[/<script[\s\S]*?(<\/script>|$)/gi,/<noscript[\s\S]*?<\/noscript>/gi,/<meta[\s\S]*?\/?>/gi].concat(d);a=a.replace(/\x3c!--[\s\S]*?--\x3e/g,function(a){return"\x3c!--{cke_tempcomment}"+(c.push(a)-1)+"--\x3e"});for(var f=0;f<d.length;f++)a=a.replace(d[f],function(a){a=a.replace(g,function(a,b,d){return c[d]});return/cke_temp(comment)?/.test(a)?a:"\x3c!--{cke_temp}"+(c.push(a)-1)+"--\x3e"});a=a.replace(g,function(a,b,d){return"\x3c!--"+x+(b?"{C}":
"")+encodeURIComponent(c[d]).replace(/--/g,"%2D%2D")+"--\x3e"});a=a.replace(/<\w+(?:\s+(?:(?:[^\s=>]+\s*=\s*(?:[^'"\s>]+|'[^']*'|"[^"]*"))|[^\s=\/>]+))+\s*\/?>/g,function(a){return a.replace(/\x3c!--\{cke_protected\}([^>]*)--\x3e/g,function(a,b){e[e.id]=decodeURIComponent(b);return"{cke_protected_"+e.id++ +"}"})});return a=a.replace(/<(title|iframe|textarea)([^>]*)>([\s\S]*?)<\/\1>/g,function(a,c,d,e){return"\x3c"+c+d+"\x3e"+C(u(e),b)+"\x3c/"+c+"\x3e"})}CKEDITOR.htmlDataProcessor=function(b){var c,
d,e=this;this.editor=b;this.dataFilter=c=new CKEDITOR.htmlParser.filter;this.htmlFilter=d=new CKEDITOR.htmlParser.filter;this.writer=new CKEDITOR.htmlParser.basicWriter;c.addRules(y);c.addRules(v,{applyToAll:!0});c.addRules(a(b,"data"),{applyToAll:!0});d.addRules(z);d.addRules(B,{applyToAll:!0});d.addRules(a(b,"html"),{applyToAll:!0});b.on("toHtml",function(a){a=a.data;var c=a.dataValue,d,c=w(c,b),c=g(c,F),c=l(c),c=g(c,I),c=c.replace(J,"$1cke:$2"),c=c.replace(Q,"\x3ccke:$1$2\x3e\x3c/cke:$1\x3e"),
c=c.replace(/(<pre\b[^>]*>)(\r\n|\n)/g,"$1$2$2"),c=c.replace(/([^a-z0-9<\-])(on\w{3,})(?!>)/gi,"$1data-cke-"+CKEDITOR.rnd+"-$2");d=a.context||b.editable().getName();var e;CKEDITOR.env.ie&&9>CKEDITOR.env.version&&"pre"==d&&(d="div",c="\x3cpre\x3e"+c+"\x3c/pre\x3e",e=1);d=b.document.createElement(d);d.setHtml("a"+c);c=d.getHtml().substr(1);c=c.replace(new RegExp("data-cke-"+CKEDITOR.rnd+"-","ig"),"");e&&(c=c.replace(/^<pre>|<\/pre>$/gi,""));c=c.replace(D,"$1$2");c=n(c);c=u(c);d=!1===a.fixForBody?!1:
f(a.enterMode,b.config.autoParagraph);c=CKEDITOR.htmlParser.fragment.fromHtml(c,a.context,d);d&&(e=c,!e.children.length&&CKEDITOR.dtd[e.name][d]&&(d=new CKEDITOR.htmlParser.element(d),e.add(d)));a.dataValue=c},null,null,5);b.on("toHtml",function(a){a.data.filter.applyTo(a.data.dataValue,!0,a.data.dontFilter,a.data.enterMode)&&b.fire("dataFiltered")},null,null,6);b.on("toHtml",function(a){a.data.dataValue.filterChildren(e.dataFilter,!0)},null,null,10);b.on("toHtml",function(a){a=a.data;var b=a.dataValue,
c=new CKEDITOR.htmlParser.basicWriter;b.writeChildrenHtml(c);b=c.getHtml(!0);a.dataValue=p(b)},null,null,15);b.on("toDataFormat",function(a){var c=a.data.dataValue;a.data.enterMode!=CKEDITOR.ENTER_BR&&(c=c.replace(/^<br *\/?>/i,""));a.data.dataValue=CKEDITOR.htmlParser.fragment.fromHtml(c,a.data.context,f(a.data.enterMode,b.config.autoParagraph))},null,null,5);b.on("toDataFormat",function(a){a.data.dataValue.filterChildren(e.htmlFilter,!0)},null,null,10);b.on("toDataFormat",function(a){a.data.filter.applyTo(a.data.dataValue,
!1,!0)},null,null,11);b.on("toDataFormat",function(a){var c=a.data.dataValue,d=e.writer;d.reset();c.writeChildrenHtml(d);c=d.getHtml(!0);c=u(c);c=C(c,b);a.data.dataValue=c},null,null,15)};CKEDITOR.htmlDataProcessor.prototype={toHtml:function(a,b,c,d){var e=this.editor,g,f,h,l;b&&"object"==typeof b?(g=b.context,c=b.fixForBody,d=b.dontFilter,f=b.filter,h=b.enterMode,l=b.protectedWhitespaces):g=b;g||null===g||(g=e.editable().getName());return e.fire("toHtml",{dataValue:a,context:g,fixForBody:c,dontFilter:d,
filter:f||e.filter,enterMode:h||e.enterMode,protectedWhitespaces:l}).dataValue},toDataFormat:function(a,b){var c,d,e;b&&(c=b.context,d=b.filter,e=b.enterMode);c||null===c||(c=this.editor.editable().getName());return this.editor.fire("toDataFormat",{dataValue:a,filter:d||this.editor.filter,context:c,enterMode:e||this.editor.enterMode}).dataValue}};var q=/(?:&nbsp;|\xa0)$/,x="{cke_protected}",r=CKEDITOR.dtd,A="caption colgroup col thead tfoot tbody".split(" "),t=CKEDITOR.tools.extend({},r.$blockLimit,
r.$block),y={elements:{input:d,textarea:d}},v={attributeNames:[[/^on/,"data-cke-pa-on"],[/^srcdoc/,"data-cke-pa-srcdoc"],[/^data-cke-expando$/,""]],elements:{iframe:function(a){if(a.attributes&&a.attributes.src){var b=a.attributes.src.toLowerCase().replace(/[^a-z]/gi,"");if(0===b.indexOf("javascript")||0===b.indexOf("data"))a.attributes["data-cke-pa-src"]=a.attributes.src,delete a.attributes.src}}}},z={elements:{embed:function(a){var b=a.parent;if(b&&"object"==b.name){var c=b.attributes.width,b=b.attributes.height;
c&&(a.attributes.width=c);b&&(a.attributes.height=b)}},a:function(a){var b=a.attributes;if(!(a.children.length||b.name||b.id||a.attributes["data-cke-saved-name"]))return!1}}},B={elementNames:[[/^cke:/,""],[/^\?xml:namespace$/,""]],attributeNames:[[/^data-cke-(saved|pa)-/,""],[/^data-cke-.*/,""],["hidefocus",""]],elements:{$:function(a){var b=a.attributes;if(b){if(b["data-cke-temp"])return!1;for(var c=["name","href","src"],d,e=0;e<c.length;e++)d="data-cke-saved-"+c[e],d in b&&delete b[c[e]]}return a},
table:function(a){a.children.slice(0).sort(function(a,b){var c,d;a.type==CKEDITOR.NODE_ELEMENT&&b.type==a.type&&(c=CKEDITOR.tools.indexOf(A,a.name),d=CKEDITOR.tools.indexOf(A,b.name));-1<c&&-1<d&&c!=d||(c=a.parent?a.getIndex():-1,d=b.parent?b.getIndex():-1);return c>d?1:-1})},param:function(a){a.children=[];a.isEmpty=!0;return a},span:function(a){"Apple-style-span"==a.attributes["class"]&&delete a.name},html:function(a){delete a.attributes.contenteditable;delete a.attributes["class"]},body:function(a){delete a.attributes.spellcheck;
delete a.attributes.contenteditable},style:function(a){var b=a.children[0];b&&b.value&&(b.value=CKEDITOR.tools.trim(b.value));a.attributes.type||(a.attributes.type="text/css")},title:function(a){var b=a.children[0];!b&&k(a,b=new CKEDITOR.htmlParser.text);b.value=a.attributes["data-cke-title"]||""},input:h,textarea:h},attributes:{"class":function(a){return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g,""))||!1}}};CKEDITOR.env.ie&&(B.attributes.style=function(a){return a.replace(/(^|;)([^\:]+)/g,
function(a){return a.toLowerCase()})});var H=/<(a|area|img|input|source)\b([^>]*)>/gi,G=/([\w-:]+)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi,E=/^(href|src|name)$/i,I=/(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi,F=/(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi,K=/<cke:encoded>([^<]*)<\/cke:encoded>/gi,J=/(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi,D=/(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi,Q=/<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi}(),
"use strict",CKEDITOR.htmlParser.element=function(a,f){this.name=a;this.attributes=f||{};this.children=[];var b=a||"",c=b.match(/^cke:(.*)/);c&&(b=c[1]);b=!!(CKEDITOR.dtd.$nonBodyContent[b]||CKEDITOR.dtd.$block[b]||CKEDITOR.dtd.$listItem[b]||CKEDITOR.dtd.$tableContent[b]||CKEDITOR.dtd.$nonEditable[b]||"br"==b);this.isEmpty=!!CKEDITOR.dtd.$empty[a];this.isUnknown=!CKEDITOR.dtd[a];this._={isBlockLike:b,hasInlineStarted:this.isEmpty||!b}},CKEDITOR.htmlParser.cssStyle=function(a){var f={};((a instanceof
CKEDITOR.htmlParser.element?a.attributes.style:a)||"").replace(/&quot;/g,'"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g,function(a,c,e){"font-family"==c&&(e=e.replace(/["']/g,""));f[c.toLowerCase()]=e});return{rules:f,populate:function(a){var c=this.toString();c&&(a instanceof CKEDITOR.dom.element?a.setAttribute("style",c):a instanceof CKEDITOR.htmlParser.element?a.attributes.style=c:a.style=c)},toString:function(){var a=[],c;for(c in f)f[c]&&a.push(c,":",f[c],";");return a.join("")}}},function(){function a(a){return function(b){return b.type==
CKEDITOR.NODE_ELEMENT&&("string"==typeof a?b.name==a:b.name in a)}}var f=function(a,b){a=a[0];b=b[0];return a<b?-1:a>b?1:0},b=CKEDITOR.htmlParser.fragment.prototype;CKEDITOR.htmlParser.element.prototype=CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node,{type:CKEDITOR.NODE_ELEMENT,add:b.add,clone:function(){return new CKEDITOR.htmlParser.element(this.name,this.attributes)},filter:function(a,b){var f=this,k,d;b=f.getFilterContext(b);if(b.off)return!0;if(!f.parent)a.onRoot(b,f);for(;;){k=f.name;if(!(d=
a.onElementName(b,k)))return this.remove(),!1;f.name=d;if(!(f=a.onElement(b,f)))return this.remove(),!1;if(f!==this)return this.replaceWith(f),!1;if(f.name==k)break;if(f.type!=CKEDITOR.NODE_ELEMENT)return this.replaceWith(f),!1;if(!f.name)return this.replaceWithChildren(),!1}k=f.attributes;var h,l;for(h in k){for(d=k[h];;)if(l=a.onAttributeName(b,h))if(l!=h)delete k[h],h=l;else break;else{delete k[h];break}l&&(!1===(d=a.onAttribute(b,f,l,d))?delete k[l]:k[l]=d)}f.isEmpty||this.filterChildren(a,!1,
b);return!0},filterChildren:b.filterChildren,writeHtml:function(a,b){b&&this.filter(b);var m=this.name,k=[],d=this.attributes,h,l;a.openTag(m,d);for(h in d)k.push([h,d[h]]);a.sortAttributes&&k.sort(f);h=0;for(l=k.length;h<l;h++)d=k[h],a.attribute(d[0],d[1]);a.openTagClose(m,this.isEmpty);this.writeChildrenHtml(a);this.isEmpty||a.closeTag(m)},writeChildrenHtml:b.writeChildrenHtml,replaceWithChildren:function(){for(var a=this.children,b=a.length;b;)a[--b].insertAfter(this);this.remove()},forEach:b.forEach,
getFirst:function(b){if(!b)return this.children.length?this.children[0]:null;"function"!=typeof b&&(b=a(b));for(var e=0,f=this.children.length;e<f;++e)if(b(this.children[e]))return this.children[e];return null},getHtml:function(){var a=new CKEDITOR.htmlParser.basicWriter;this.writeChildrenHtml(a);return a.getHtml()},setHtml:function(a){a=this.children=CKEDITOR.htmlParser.fragment.fromHtml(a).children;for(var b=0,f=a.length;b<f;++b)a[b].parent=this},getOuterHtml:function(){var a=new CKEDITOR.htmlParser.basicWriter;
this.writeHtml(a);return a.getHtml()},split:function(a){for(var b=this.children.splice(a,this.children.length-a),f=this.clone(),k=0;k<b.length;++k)b[k].parent=f;f.children=b;b[0]&&(b[0].previous=null);0<a&&(this.children[a-1].next=null);this.parent.add(f,this.getIndex()+1);return f},find:function(a,b){void 0===b&&(b=!1);var f=[],k;for(k=0;k<this.children.length;k++){var d=this.children[k];"function"==typeof a&&a(d)?f.push(d):"string"==typeof a&&d.name===a&&f.push(d);b&&d.find&&(f=f.concat(d.find(a,
b)))}return f},addClass:function(a){if(!this.hasClass(a)){var b=this.attributes["class"]||"";this.attributes["class"]=b+(b?" ":"")+a}},removeClass:function(a){var b=this.attributes["class"];b&&((b=CKEDITOR.tools.trim(b.replace(new RegExp("(?:\\s+|^)"+a+"(?:\\s+|$)")," ")))?this.attributes["class"]=b:delete this.attributes["class"])},hasClass:function(a){var b=this.attributes["class"];return b?(new RegExp("(?:^|\\s)"+a+"(?\x3d\\s|$)")).test(b):!1},getFilterContext:function(a){var b=[];a||(a={off:!1,
nonEditable:!1,nestedEditable:!1});a.off||"off"!=this.attributes["data-cke-processor"]||b.push("off",!0);a.nonEditable||"false"!=this.attributes.contenteditable?a.nonEditable&&!a.nestedEditable&&"true"==this.attributes.contenteditable&&b.push("nestedEditable",!0):b.push("nonEditable",!0);if(b.length){a=CKEDITOR.tools.copy(a);for(var f=0;f<b.length;f+=2)a[b[f]]=b[f+1]}return a}},!0)}(),function(){var a=/{([^}]+)}/g;CKEDITOR.template=function(a){this.source=String(a)};CKEDITOR.template.prototype.output=
function(f,b){var c=this.source.replace(a,function(a,b){return void 0!==f[b]?f[b]:a});return b?b.push(c):c}}(),delete CKEDITOR.loadFullCore,CKEDITOR.instances={},CKEDITOR.document=new CKEDITOR.dom.document(document),CKEDITOR.add=function(a){CKEDITOR.instances[a.name]=a;a.on("focus",function(){CKEDITOR.currentInstance!=a&&(CKEDITOR.currentInstance=a,CKEDITOR.fire("currentInstance"))});a.on("blur",function(){CKEDITOR.currentInstance==a&&(CKEDITOR.currentInstance=null,CKEDITOR.fire("currentInstance"))});
CKEDITOR.fire("instance",null,a)},CKEDITOR.remove=function(a){delete CKEDITOR.instances[a.name]},function(){var a={};CKEDITOR.addTemplate=function(f,b){var c=a[f];if(c)return c;c={name:f,source:b};CKEDITOR.fire("template",c);return a[f]=new CKEDITOR.template(c.source)};CKEDITOR.getTemplate=function(f){return a[f]}}(),function(){var a=[];CKEDITOR.addCss=function(f){a.push(f)};CKEDITOR.getCss=function(){return a.join("\n")}}(),CKEDITOR.on("instanceDestroyed",function(){CKEDITOR.tools.isEmpty(this.instances)&&
CKEDITOR.fire("reset")}),CKEDITOR.TRISTATE_ON=1,CKEDITOR.TRISTATE_OFF=2,CKEDITOR.TRISTATE_DISABLED=0,function(){CKEDITOR.inline=function(a,f){if(!CKEDITOR.env.isCompatible)return null;a=CKEDITOR.dom.element.get(a);if(a.getEditor())throw'The editor instance "'+a.getEditor().name+'" is already attached to the provided element.';var b=new CKEDITOR.editor(f,a,CKEDITOR.ELEMENT_MODE_INLINE),c=a.is("textarea")?a:null;c?(b.setData(c.getValue(),null,!0),a=CKEDITOR.dom.element.createFromHtml('\x3cdiv contenteditable\x3d"'+
!!b.readOnly+'" class\x3d"cke_textarea_inline"\x3e'+c.getValue()+"\x3c/div\x3e",CKEDITOR.document),a.insertAfter(c),c.hide(),c.$.form&&b._attachToForm()):b.setData(a.getHtml(),null,!0);b.on("loaded",function(){b.fire("uiReady");b.editable(a);b.container=a;b.ui.contentsElement=a;b.setData(b.getData(1));b.resetDirty();b.fire("contentDom");b.mode="wysiwyg";b.fire("mode");b.status="ready";b.fireOnce("instanceReady");CKEDITOR.fire("instanceReady",null,b)},null,null,1E4);b.on("destroy",function(){c&&(b.container.clearCustomData(),
b.container.remove(),c.show());b.element.clearCustomData();delete b.element});return b};CKEDITOR.inlineAll=function(){var a,f,b;for(b in CKEDITOR.dtd.$editable)for(var c=CKEDITOR.document.getElementsByTag(b),e=0,m=c.count();e<m;e++)a=c.getItem(e),"true"==a.getAttribute("contenteditable")&&(f={element:a,config:{}},!1!==CKEDITOR.fire("inline",f)&&CKEDITOR.inline(a,f.config))};CKEDITOR.domReady(function(){!CKEDITOR.disableAutoInline&&CKEDITOR.inlineAll()})}(),CKEDITOR.replaceClass="ckeditor",function(){function a(a,
e,m,k){if(!CKEDITOR.env.isCompatible)return null;a=CKEDITOR.dom.element.get(a);if(a.getEditor())throw'The editor instance "'+a.getEditor().name+'" is already attached to the provided element.';var d=new CKEDITOR.editor(e,a,k);k==CKEDITOR.ELEMENT_MODE_REPLACE&&(a.setStyle("visibility","hidden"),d._.required=a.hasAttribute("required"),a.removeAttribute("required"));m&&d.setData(m,null,!0);d.on("loaded",function(){b(d);k==CKEDITOR.ELEMENT_MODE_REPLACE&&d.config.autoUpdateElement&&a.$.form&&d._attachToForm();
d.setMode(d.config.startupMode,function(){d.resetDirty();d.status="ready";d.fireOnce("instanceReady");CKEDITOR.fire("instanceReady",null,d)})});d.on("destroy",f);return d}function f(){var a=this.container,b=this.element;a&&(a.clearCustomData(),a.remove());b&&(b.clearCustomData(),this.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE&&(b.show(),this._.required&&b.setAttribute("required","required")),delete this.element)}function b(a){var b=a.name,f=a.element,k=a.elementMode,d=a.fire("uiSpace",{space:"top",
html:""}).html,h=a.fire("uiSpace",{space:"bottom",html:""}).html,l=new CKEDITOR.template('\x3c{outerEl} id\x3d"cke_{name}" class\x3d"{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} '+CKEDITOR.env.cssClass+'"  dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"application"'+(a.title?' aria-labelledby\x3d"cke_{name}_arialbl"':"")+"\x3e"+(a.title?'\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e':"")+'\x3c{outerEl} class\x3d"cke_inner cke_reset" role\x3d"presentation"\x3e{topHtml}\x3c{outerEl} id\x3d"{contentId}" class\x3d"cke_contents cke_reset" role\x3d"presentation"\x3e\x3c/{outerEl}\x3e{bottomHtml}\x3c/{outerEl}\x3e\x3c/{outerEl}\x3e'),
b=CKEDITOR.dom.element.createFromHtml(l.output({id:a.id,name:b,langDir:a.lang.dir,langCode:a.langCode,voiceLabel:a.title,topHtml:d?'\x3cspan id\x3d"'+a.ui.spaceId("top")+'" class\x3d"cke_top cke_reset_all" role\x3d"presentation" style\x3d"height:auto"\x3e'+d+"\x3c/span\x3e":"",contentId:a.ui.spaceId("contents"),bottomHtml:h?'\x3cspan id\x3d"'+a.ui.spaceId("bottom")+'" class\x3d"cke_bottom cke_reset_all" role\x3d"presentation"\x3e'+h+"\x3c/span\x3e":"",outerEl:CKEDITOR.env.ie?"span":"div"}));k==CKEDITOR.ELEMENT_MODE_REPLACE?
(f.hide(),b.insertAfter(f)):f.append(b);a.container=b;a.ui.contentsElement=a.ui.space("contents");d&&a.ui.space("top").unselectable();h&&a.ui.space("bottom").unselectable();f=a.config.width;k=a.config.height;f&&b.setStyle("width",CKEDITOR.tools.cssLength(f));k&&a.ui.space("contents").setStyle("height",CKEDITOR.tools.cssLength(k));b.disableContextMenu();CKEDITOR.env.webkit&&b.on("focus",function(){a.focus()});a.fireOnce("uiReady")}CKEDITOR.replace=function(b,e){return a(b,e,null,CKEDITOR.ELEMENT_MODE_REPLACE)};
CKEDITOR.appendTo=function(b,e,f){return a(b,e,f,CKEDITOR.ELEMENT_MODE_APPENDTO)};CKEDITOR.replaceAll=function(){for(var a=document.getElementsByTagName("textarea"),b=0;b<a.length;b++){var f=null,k=a[b];if(k.name||k.id){if("string"==typeof arguments[0]){if(!(new RegExp("(?:^|\\s)"+arguments[0]+"(?:$|\\s)")).test(k.className))continue}else if("function"==typeof arguments[0]&&(f={},!1===arguments[0](k,f)))continue;this.replace(k,f)}}};CKEDITOR.editor.prototype.addMode=function(a,b){(this._.modes||(this._.modes=
{}))[a]=b};CKEDITOR.editor.prototype.setMode=function(a,b){var f=this,k=this._.modes;if(a!=f.mode&&k&&k[a]){f.fire("beforeSetMode",a);if(f.mode){var d=f.checkDirty(),k=f._.previousModeData,h,l=0;f.fire("beforeModeUnload");f.editable(0);f._.previousMode=f.mode;f._.previousModeData=h=f.getData(1);"source"==f.mode&&k==h&&(f.fire("lockSnapshot",{forceUpdate:!0}),l=1);f.ui.space("contents").setHtml("");f.mode=""}else f._.previousModeData=f.getData(1);this._.modes[a](function(){f.mode=a;void 0!==d&&!d&&
f.resetDirty();l?f.fire("unlockSnapshot"):"wysiwyg"==a&&f.fire("saveSnapshot");setTimeout(function(){f.fire("mode");b&&b.call(f)},0)})}};CKEDITOR.editor.prototype.resize=function(a,b,f,k){var d=this.container,h=this.ui.space("contents"),l=CKEDITOR.env.webkit&&this.document&&this.document.getWindow().$.frameElement;k=k?this.container.getFirst(function(a){return a.type==CKEDITOR.NODE_ELEMENT&&a.hasClass("cke_inner")}):d;k.setSize("width",a,!0);l&&(l.style.width="1%");var g=(k.$.offsetHeight||0)-(h.$.clientHeight||
0),d=Math.max(b-(f?0:g),0);b=f?b+g:b;h.setStyle("height",d+"px");l&&(l.style.width="100%");this.fire("resize",{outerHeight:b,contentsHeight:d,outerWidth:a||k.getSize("width")})};CKEDITOR.editor.prototype.getResizable=function(a){return a?this.ui.space("contents"):this.container};CKEDITOR.domReady(function(){CKEDITOR.replaceClass&&CKEDITOR.replaceAll(CKEDITOR.replaceClass)})}(),CKEDITOR.config.startupMode="wysiwyg",function(){function a(a){var b=a.editor,d=a.data.path,e=d.blockLimit,g=a.data.selection,
h=g.getRanges()[0],l;if(CKEDITOR.env.gecko||CKEDITOR.env.ie&&CKEDITOR.env.needsBrFiller)if(g=f(g,d))g.appendBogus(),l=CKEDITOR.env.ie;k(b,d.block,e)&&h.collapsed&&!h.getCommonAncestor().isReadOnly()&&(d=h.clone(),d.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS),e=new CKEDITOR.dom.walker(d),e.guard=function(a){return!c(a)||a.type==CKEDITOR.NODE_COMMENT||a.isReadOnly()},!e.checkForward()||d.checkStartOfBlock()&&d.checkEndOfBlock())&&(b=h.fixBlock(!0,b.activeEnterMode==CKEDITOR.ENTER_DIV?"div":"p"),CKEDITOR.env.needsBrFiller||
(b=b.getFirst(c))&&b.type==CKEDITOR.NODE_TEXT&&CKEDITOR.tools.trim(b.getText()).match(/^(?:&nbsp;|\xa0)$/)&&b.remove(),l=1,a.cancel());l&&h.select()}function f(a,b){if(a.isFake)return 0;var d=b.block||b.blockLimit,e=d&&d.getLast(c);if(!(!d||!d.isBlockBoundary()||e&&e.type==CKEDITOR.NODE_ELEMENT&&e.isBlockBoundary()||d.is("pre")||d.getBogus()))return d}function b(a){var b=a.data.getTarget();b.is("input")&&(b=b.getAttribute("type"),"submit"!=b&&"reset"!=b||a.data.preventDefault())}function c(a){return g(a)&&
n(a)}function e(a,b){return function(c){var d=c.data.$.toElement||c.data.$.fromElement||c.data.$.relatedTarget;(d=d&&d.nodeType==CKEDITOR.NODE_ELEMENT?new CKEDITOR.dom.element(d):null)&&(b.equals(d)||b.contains(d))||a.call(this,c)}}function m(a){function b(a){return function(b,e){e&&b.type==CKEDITOR.NODE_ELEMENT&&b.is(g)&&(d=b);if(!(e||!c(b)||a&&u(b)))return!1}}var d,e=a.getRanges()[0];a=a.root;var g={table:1,ul:1,ol:1,dl:1};if(e.startPath().contains(g)){var f=e.clone();f.collapse(1);f.setStartAt(a,
CKEDITOR.POSITION_AFTER_START);a=new CKEDITOR.dom.walker(f);a.guard=b();a.checkBackward();if(d)return f=e.clone(),f.collapse(),f.setEndAt(d,CKEDITOR.POSITION_AFTER_END),a=new CKEDITOR.dom.walker(f),a.guard=b(!0),d=!1,a.checkForward(),d}return null}function k(a,b,c){return!1!==a.config.autoParagraph&&a.activeEnterMode!=CKEDITOR.ENTER_BR&&(a.editable().equals(c)&&!b||b&&"true"==b.getAttribute("contenteditable"))}function d(a){return a.activeEnterMode!=CKEDITOR.ENTER_BR&&!1!==a.config.autoParagraph?
a.activeEnterMode==CKEDITOR.ENTER_DIV?"div":"p":!1}function h(a){var b=a.editor;b.getSelection().scrollIntoView();setTimeout(function(){b.fire("saveSnapshot")},0)}function l(a,b,c){var d=a.getCommonAncestor(b);for(b=a=c?b:a;(a=a.getParent())&&!d.equals(a)&&1==a.getChildCount();)b=a;b.remove()}var g,n,p,u,C,w,q,x,r,A;CKEDITOR.editable=CKEDITOR.tools.createClass({base:CKEDITOR.dom.element,$:function(a,b){this.base(b.$||b);this.editor=a;this.status="unloaded";this.hasFocus=!1;this.setup()},proto:{focus:function(){var a;
if(CKEDITOR.env.webkit&&!this.hasFocus&&(a=this.editor._.previousActive||this.getDocument().getActive(),this.contains(a))){a.focus();return}CKEDITOR.env.edge&&14<CKEDITOR.env.version&&!this.hasFocus&&this.getDocument().equals(CKEDITOR.document)&&(this.editor._.previousScrollTop=this.$.scrollTop);try{if(!CKEDITOR.env.ie||CKEDITOR.env.edge&&14<CKEDITOR.env.version||!this.getDocument().equals(CKEDITOR.document))if(CKEDITOR.env.chrome){var b=this.$.scrollTop;this.$.focus();this.$.scrollTop=b}else this.$.focus();
else this.$.setActive()}catch(c){if(!CKEDITOR.env.ie)throw c;}CKEDITOR.env.safari&&!this.isInline()&&(a=CKEDITOR.document.getActive(),a.equals(this.getWindow().getFrame())||this.getWindow().focus())},on:function(a,b){var c=Array.prototype.slice.call(arguments,0);CKEDITOR.env.ie&&/^focus|blur$/.exec(a)&&(a="focus"==a?"focusin":"focusout",b=e(b,this),c[0]=a,c[1]=b);return CKEDITOR.dom.element.prototype.on.apply(this,c)},attachListener:function(a){!this._.listeners&&(this._.listeners=[]);var b=Array.prototype.slice.call(arguments,
1),b=a.on.apply(a,b);this._.listeners.push(b);return b},clearListeners:function(){var a=this._.listeners;try{for(;a.length;)a.pop().removeListener()}catch(b){}},restoreAttrs:function(){var a=this._.attrChanges,b,c;for(c in a)a.hasOwnProperty(c)&&(b=a[c],null!==b?this.setAttribute(c,b):this.removeAttribute(c))},attachClass:function(a){var b=this.getCustomData("classes");this.hasClass(a)||(!b&&(b=[]),b.push(a),this.setCustomData("classes",b),this.addClass(a))},changeAttr:function(a,b){var c=this.getAttribute(a);
b!==c&&(!this._.attrChanges&&(this._.attrChanges={}),a in this._.attrChanges||(this._.attrChanges[a]=c),this.setAttribute(a,b))},insertText:function(a){this.editor.focus();this.insertHtml(this.transformPlainTextToHtml(a),"text")},transformPlainTextToHtml:function(a){var b=this.editor.getSelection().getStartElement().hasAscendant("pre",!0)?CKEDITOR.ENTER_BR:this.editor.activeEnterMode;return CKEDITOR.tools.transformPlainTextToHtml(a,b)},insertHtml:function(a,b,c){var d=this.editor;d.focus();d.fire("saveSnapshot");
c||(c=d.getSelection().getRanges()[0]);w(this,b||"html",a,c);c.select();h(this);this.editor.fire("afterInsertHtml",{})},insertHtmlIntoRange:function(a,b,c){w(this,c||"html",a,b);this.editor.fire("afterInsertHtml",{intoRange:b})},insertElement:function(a,b){var d=this.editor;d.focus();d.fire("saveSnapshot");var e=d.activeEnterMode,d=d.getSelection(),g=a.getName(),g=CKEDITOR.dtd.$block[g];b||(b=d.getRanges()[0]);this.insertElementIntoRange(a,b)&&(b.moveToPosition(a,CKEDITOR.POSITION_AFTER_END),g&&((g=
a.getNext(function(a){return c(a)&&!u(a)}))&&g.type==CKEDITOR.NODE_ELEMENT&&g.is(CKEDITOR.dtd.$block)?g.getDtd()["#"]?b.moveToElementEditStart(g):b.moveToElementEditEnd(a):g||e==CKEDITOR.ENTER_BR||(g=b.fixBlock(!0,e==CKEDITOR.ENTER_DIV?"div":"p"),b.moveToElementEditStart(g))));d.selectRanges([b]);h(this)},insertElementIntoSelection:function(a){this.insertElement(a)},insertElementIntoRange:function(a,b){var c=this.editor,d=c.config.enterMode,e=a.getName(),g=CKEDITOR.dtd.$block[e];if(b.checkReadOnly())return!1;
b.deleteContents(1);b.startContainer.type==CKEDITOR.NODE_ELEMENT&&(b.startContainer.is({tr:1,table:1,tbody:1,thead:1,tfoot:1})?q(b):b.startContainer.is(CKEDITOR.dtd.$list)&&x(b));var f,h;if(g)for(;(f=b.getCommonAncestor(0,1))&&(h=CKEDITOR.dtd[f.getName()])&&(!h||!h[e]);)f.getName()in CKEDITOR.dtd.span?b.splitElement(f):b.checkStartOfBlock()&&b.checkEndOfBlock()?(b.setStartBefore(f),b.collapse(!0),f.remove()):b.splitBlock(d==CKEDITOR.ENTER_DIV?"div":"p",c.editable());b.insertNode(a);return!0},setData:function(a,
b){b||(a=this.editor.dataProcessor.toHtml(a));this.setHtml(a);this.fixInitialSelection();"unloaded"==this.status&&(this.status="ready");this.editor.fire("dataReady")},getData:function(a){var b=this.getHtml();a||(b=this.editor.dataProcessor.toDataFormat(b));return b},setReadOnly:function(a){this.setAttribute("contenteditable",!a)},detach:function(){this.removeClass("cke_editable");this.status="detached";var a=this.editor;this._.detach();delete a.document;delete a.window},isInline:function(){return this.getDocument().equals(CKEDITOR.document)},
fixInitialSelection:function(){function a(){var b=c.getDocument().$,d=b.getSelection(),e;a:if(d.anchorNode&&d.anchorNode==c.$)e=!0;else{if(CKEDITOR.env.webkit&&(e=c.getDocument().getActive())&&e.equals(c)&&!d.anchorNode){e=!0;break a}e=void 0}e&&(e=new CKEDITOR.dom.range(c),e.moveToElementEditStart(c),b=b.createRange(),b.setStart(e.startContainer.$,e.startOffset),b.collapse(!0),d.removeAllRanges(),d.addRange(b))}function b(){var a=c.getDocument().$,d=a.selection,e=c.getDocument().getActive();"None"==
d.type&&e.equals(c)&&(d=new CKEDITOR.dom.range(c),a=a.body.createTextRange(),d.moveToElementEditStart(c),d=d.startContainer,d.type!=CKEDITOR.NODE_ELEMENT&&(d=d.getParent()),a.moveToElementText(d.$),a.collapse(!0),a.select())}var c=this;if(CKEDITOR.env.ie&&(9>CKEDITOR.env.version||CKEDITOR.env.quirks))this.hasFocus&&(this.focus(),b());else if(this.hasFocus)this.focus(),a();else this.once("focus",function(){a()},null,null,-999)},getHtmlFromRange:function(a){if(a.collapsed)return new CKEDITOR.dom.documentFragment(a.document);
a={doc:this.getDocument(),range:a.clone()};r.eol.detect(a,this);r.bogus.exclude(a);r.cell.shrink(a);a.fragment=a.range.cloneContents();r.tree.rebuild(a,this);r.eol.fix(a,this);return new CKEDITOR.dom.documentFragment(a.fragment.$)},extractHtmlFromRange:function(a,b){var c=A,d={range:a,doc:a.document},e=this.getHtmlFromRange(a);if(a.collapsed)return a.optimize(),e;a.enlarge(CKEDITOR.ENLARGE_INLINE,1);c.table.detectPurge(d);d.bookmark=a.createBookmark();delete d.range;var g=this.editor.createRange();
g.moveToPosition(d.bookmark.startNode,CKEDITOR.POSITION_BEFORE_START);d.targetBookmark=g.createBookmark();c.list.detectMerge(d,this);c.table.detectRanges(d,this);c.block.detectMerge(d,this);d.tableContentsRanges?(c.table.deleteRanges(d),a.moveToBookmark(d.bookmark),d.range=a):(a.moveToBookmark(d.bookmark),d.range=a,a.extractContents(c.detectExtractMerge(d)));a.moveToBookmark(d.targetBookmark);a.optimize();c.fixUneditableRangePosition(a);c.list.merge(d,this);c.table.purge(d,this);c.block.merge(d,this);
if(b){c=a.startPath();if(d=a.checkStartOfBlock()&&a.checkEndOfBlock()&&c.block&&!a.root.equals(c.block)){a:{var d=c.block.getElementsByTag("span"),g=0,f;if(d)for(;f=d.getItem(g++);)if(!n(f)){d=!0;break a}d=!1}d=!d}d&&(a.moveToPosition(c.block,CKEDITOR.POSITION_BEFORE_START),c.block.remove())}else c.autoParagraph(this.editor,a),p(a.startContainer)&&a.startContainer.appendBogus();a.startContainer.mergeSiblings();return e},setup:function(){var a=this.editor;this.attachListener(a,"beforeGetData",function(){var b=
this.getData();this.is("textarea")||!1!==a.config.ignoreEmptyParagraph&&(b=b.replace(C,function(a,b){return b}));a.setData(b,null,1)},this);this.attachListener(a,"getSnapshot",function(a){a.data=this.getData(1)},this);this.attachListener(a,"afterSetData",function(){this.setData(a.getData(1))},this);this.attachListener(a,"loadSnapshot",function(a){this.setData(a.data,1)},this);this.attachListener(a,"beforeFocus",function(){var b=a.getSelection();(b=b&&b.getNative())&&"Control"==b.type||this.focus()},
this);this.attachListener(a,"insertHtml",function(a){this.insertHtml(a.data.dataValue,a.data.mode,a.data.range)},this);this.attachListener(a,"insertElement",function(a){this.insertElement(a.data)},this);this.attachListener(a,"insertText",function(a){this.insertText(a.data)},this);this.setReadOnly(a.readOnly);this.attachClass("cke_editable");a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?this.attachClass("cke_editable_inline"):a.elementMode!=CKEDITOR.ELEMENT_MODE_REPLACE&&a.elementMode!=CKEDITOR.ELEMENT_MODE_APPENDTO||
this.attachClass("cke_editable_themed");this.attachClass("cke_contents_"+a.config.contentsLangDirection);a.keystrokeHandler.blockedKeystrokes[8]=+a.readOnly;a.keystrokeHandler.attach(this);this.on("blur",function(){this.hasFocus=!1},null,null,-1);this.on("focus",function(){this.hasFocus=!0},null,null,-1);if(CKEDITOR.env.webkit)this.on("scroll",function(){a._.previousScrollTop=a.editable().$.scrollTop},null,null,-1);if(CKEDITOR.env.edge&&14<CKEDITOR.env.version){var d=function(){var b=a.editable();
null!=a._.previousScrollTop&&b.getDocument().equals(CKEDITOR.document)&&(b.$.scrollTop=a._.previousScrollTop,a._.previousScrollTop=null,this.removeListener("scroll",d))};this.on("scroll",d)}a.focusManager.add(this);this.equals(CKEDITOR.document.getActive())&&(this.hasFocus=!0,a.once("contentDom",function(){a.focusManager.focus(this)},this));this.isInline()&&this.changeAttr("tabindex",a.tabIndex);if(!this.is("textarea")){a.document=this.getDocument();a.window=this.getWindow();var e=a.document;this.changeAttr("spellcheck",
!a.config.disableNativeSpellChecker);var f=a.config.contentsLangDirection;this.getDirection(1)!=f&&this.changeAttr("dir",f);var h=CKEDITOR.getCss();if(h){var f=e.getHead(),k=f.getCustomData("stylesheet");k?h!=k.getText()&&(CKEDITOR.env.ie&&9>CKEDITOR.env.version?k.$.styleSheet.cssText=h:k.setText(h)):(h=e.appendStyleText(h),h=new CKEDITOR.dom.element(h.ownerNode||h.owningElement),f.setCustomData("stylesheet",h),h.data("cke-temp",1))}f=e.getCustomData("stylesheet_ref")||0;e.setCustomData("stylesheet_ref",
f+1);this.setCustomData("cke_includeReadonly",!a.config.disableReadonlyStyling);this.attachListener(this,"click",function(a){a=a.data;var b=(new CKEDITOR.dom.elementPath(a.getTarget(),this)).contains("a");b&&2!=a.$.button&&b.isReadOnly()&&a.preventDefault()});var n={8:1,46:1};this.attachListener(a,"key",function(b){if(a.readOnly)return!0;var c=b.data.domEvent.getKey(),d;b=a.getSelection();if(0!==b.getRanges().length){if(c in n){var e,f=b.getRanges()[0],h=f.startPath(),l,k,q,c=8==c;CKEDITOR.env.ie&&
11>CKEDITOR.env.version&&(e=b.getSelectedElement())||(e=m(b))?(a.fire("saveSnapshot"),f.moveToPosition(e,CKEDITOR.POSITION_BEFORE_START),e.remove(),f.select(),a.fire("saveSnapshot"),d=1):f.collapsed&&((l=h.block)&&(q=l[c?"getPrevious":"getNext"](g))&&q.type==CKEDITOR.NODE_ELEMENT&&q.is("table")&&f[c?"checkStartOfBlock":"checkEndOfBlock"]()?(a.fire("saveSnapshot"),f[c?"checkEndOfBlock":"checkStartOfBlock"]()&&l.remove(),f["moveToElementEdit"+(c?"End":"Start")](q),f.select(),a.fire("saveSnapshot"),
d=1):h.blockLimit&&h.blockLimit.is("td")&&(k=h.blockLimit.getAscendant("table"))&&f.checkBoundaryOfElement(k,c?CKEDITOR.START:CKEDITOR.END)&&(q=k[c?"getPrevious":"getNext"](g))?(a.fire("saveSnapshot"),f["moveToElementEdit"+(c?"End":"Start")](q),f.checkStartOfBlock()&&f.checkEndOfBlock()?q.remove():f.select(),a.fire("saveSnapshot"),d=1):(k=h.contains(["td","th","caption"]))&&f.checkBoundaryOfElement(k,c?CKEDITOR.START:CKEDITOR.END)&&(d=1))}return!d}});a.blockless&&CKEDITOR.env.ie&&CKEDITOR.env.needsBrFiller&&
this.attachListener(this,"keyup",function(b){b.data.getKeystroke()in n&&!this.getFirst(c)&&(this.appendBogus(),b=a.createRange(),b.moveToPosition(this,CKEDITOR.POSITION_AFTER_START),b.select())});this.attachListener(this,"dblclick",function(b){if(a.readOnly)return!1;b={element:b.data.getTarget()};a.fire("doubleclick",b)});CKEDITOR.env.ie&&this.attachListener(this,"click",b);CKEDITOR.env.ie&&!CKEDITOR.env.edge||this.attachListener(this,"mousedown",function(b){var c=b.data.getTarget();c.is("img","hr",
"input","textarea","select")&&!c.isReadOnly()&&(a.getSelection().selectElement(c),c.is("input","textarea","select")&&b.data.preventDefault())});CKEDITOR.env.edge&&this.attachListener(this,"mouseup",function(b){(b=b.data.getTarget())&&b.is("img")&&a.getSelection().selectElement(b)});CKEDITOR.env.gecko&&this.attachListener(this,"mouseup",function(b){if(2==b.data.$.button&&(b=b.data.getTarget(),!b.getOuterHtml().replace(C,""))){var c=a.createRange();c.moveToElementEditStart(b);c.select(!0)}});CKEDITOR.env.webkit&&
(this.attachListener(this,"click",function(a){a.data.getTarget().is("input","select")&&a.data.preventDefault()}),this.attachListener(this,"mouseup",function(a){a.data.getTarget().is("input","textarea")&&a.data.preventDefault()}));CKEDITOR.env.webkit&&this.attachListener(a,"key",function(b){if(a.readOnly)return!0;var c=b.data.domEvent.getKey();if(c in n&&(b=a.getSelection(),0!==b.getRanges().length)){var c=8==c,d=b.getRanges()[0];b=d.startPath();if(d.collapsed)a:{var e=b.block;if(e&&d[c?"checkStartOfBlock":
"checkEndOfBlock"]()&&d.moveToClosestEditablePosition(e,!c)&&d.collapsed){if(d.startContainer.type==CKEDITOR.NODE_ELEMENT){var g=d.startContainer.getChild(d.startOffset-(c?1:0));if(g&&g.type==CKEDITOR.NODE_ELEMENT&&g.is("hr")){a.fire("saveSnapshot");g.remove();b=!0;break a}}d=d.startPath().block;if(!d||d&&d.contains(e))b=void 0;else{a.fire("saveSnapshot");var f;(f=(c?d:e).getBogus())&&f.remove();f=a.getSelection();g=f.createBookmarks();(c?e:d).moveChildren(c?d:e,!1);b.lastElement.mergeSiblings();
l(e,d,!c);f.selectBookmarks(g);b=!0}}else b=!1}else c=d,f=b.block,d=c.endPath().block,f&&d&&!f.equals(d)?(a.fire("saveSnapshot"),(e=f.getBogus())&&e.remove(),c.enlarge(CKEDITOR.ENLARGE_INLINE),c.deleteContents(),d.getParent()&&(d.moveChildren(f,!1),b.lastElement.mergeSiblings(),l(f,d,!0)),c=a.getSelection().getRanges()[0],c.collapse(1),c.optimize(),""===c.startContainer.getHtml()&&c.startContainer.appendBogus(),c.select(),b=!0):b=!1;if(!b)return;a.getSelection().scrollIntoView();a.fire("saveSnapshot");
return!1}},this,null,100)}}},_:{detach:function(){this.editor.setData(this.editor.getData(),0,1);this.clearListeners();this.restoreAttrs();var a;if(a=this.removeCustomData("classes"))for(;a.length;)this.removeClass(a.pop());if(!this.is("textarea")){a=this.getDocument();var b=a.getHead();if(b.getCustomData("stylesheet")){var c=a.getCustomData("stylesheet_ref");--c?a.setCustomData("stylesheet_ref",c):(a.removeCustomData("stylesheet_ref"),b.removeCustomData("stylesheet").remove())}}this.editor.fire("contentDomUnload");
delete this.editor}}});CKEDITOR.editor.prototype.editable=function(a){var b=this._.editable;if(b&&a)return 0;arguments.length&&(b=this._.editable=a?a instanceof CKEDITOR.editable?a:new CKEDITOR.editable(this,a):(b&&b.detach(),null));return b};CKEDITOR.on("instanceLoaded",function(b){var c=b.editor;c.on("insertElement",function(a){a=a.data;a.type==CKEDITOR.NODE_ELEMENT&&(a.is("input")||a.is("textarea"))&&("false"!=a.getAttribute("contentEditable")&&a.data("cke-editable",a.hasAttribute("contenteditable")?
"true":"1"),a.setAttribute("contentEditable",!1))});c.on("selectionChange",function(b){if(!c.readOnly){var d=c.getSelection();d&&!d.isLocked&&(d=c.checkDirty(),c.fire("lockSnapshot"),a(b),c.fire("unlockSnapshot"),!d&&c.resetDirty())}})});CKEDITOR.on("instanceCreated",function(a){var b=a.editor;b.on("mode",function(){var a=b.editable();if(a&&a.isInline()){var c=b.title;a.changeAttr("role","textbox");a.changeAttr("aria-label",c);c&&a.changeAttr("title",c);var d=b.fire("ariaEditorHelpLabel",{}).label;
if(d&&(c=this.ui.space(this.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?"top":"contents"))){var e=CKEDITOR.tools.getNextId(),d=CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"'+e+'" class\x3d"cke_voice_label"\x3e'+d+"\x3c/span\x3e");c.append(d);a.changeAttr("aria-describedby",e)}}})});CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}");g=CKEDITOR.dom.walker.whitespaces(!0);n=CKEDITOR.dom.walker.bookmark(!1,!0);p=CKEDITOR.dom.walker.empty();
u=CKEDITOR.dom.walker.bogus();C=/(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi;w=function(){function a(b){return b.type==CKEDITOR.NODE_ELEMENT}function b(c,d){var e,g,f,h,l=[],k=d.range.startContainer;e=d.range.startPath();for(var k=m[k.getName()],n=0,q=c.getChildren(),H=q.count(),x=-1,v=-1,r=0,p=e.contains(m.$list);n<H;++n)e=q.getItem(n),a(e)?(f=e.getName(),p&&f in CKEDITOR.dtd.$list?l=l.concat(b(e,d)):(h=!!k[f],
"br"!=f||!e.data("cke-eol")||n&&n!=H-1||(r=(g=n?l[n-1].node:q.getItem(n+1))&&(!a(g)||!g.is("br")),g=g&&a(g)&&m.$block[g.getName()]),-1!=x||h||(x=n),h||(v=n),l.push({isElement:1,isLineBreak:r,isBlock:e.isBlockBoundary(),hasBlockSibling:g,node:e,name:f,allowed:h}),g=r=0)):l.push({isElement:0,node:e,allowed:1});-1<x&&(l[x].firstNotAllowed=1);-1<v&&(l[v].lastNotAllowed=1);return l}function e(b,c){var d=[],g=b.getChildren(),f=g.count(),h,l=0,k=m[c],n=!b.is(m.$inline)||b.is("br");for(n&&d.push(" ");l<f;l++)h=
g.getItem(l),a(h)&&!h.is(k)?d=d.concat(e(h,c)):d.push(h);n&&d.push(" ");return d}function g(b){return a(b.startContainer)&&b.startContainer.getChild(b.startOffset-1)}function f(b){return b&&a(b)&&(b.is(m.$removeEmpty)||b.is("a")&&!b.isBlockBoundary())}function h(b,c,d,e){var g=b.clone(),f,l;g.setEndAt(c,CKEDITOR.POSITION_BEFORE_END);(f=(new CKEDITOR.dom.walker(g)).next())&&a(f)&&n[f.getName()]&&(l=f.getPrevious())&&a(l)&&!l.getParent().equals(b.startContainer)&&d.contains(l)&&e.contains(f)&&f.isIdentical(l)&&
(f.moveChildren(l),f.remove(),h(b,c,d,e))}function l(b,c){function d(b,c){if(c.isBlock&&c.isElement&&!c.node.is("br")&&a(b)&&b.is("br"))return b.remove(),1}var e=c.endContainer.getChild(c.endOffset),g=c.endContainer.getChild(c.endOffset-1);e&&d(e,b[b.length-1]);g&&d(g,b[0])&&(c.setEnd(c.endContainer,c.endOffset-1),c.collapse())}var m=CKEDITOR.dtd,n={p:1,div:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,ul:1,ol:1,li:1,pre:1,dl:1,blockquote:1},q={p:1,div:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1},x=CKEDITOR.tools.extend({},
m.$inline);delete x.br;return function(n,D,r,p){var A=n.editor,w=!1;"unfiltered_html"==D&&(D="html",w=!0);if(!p.checkReadOnly()){var C=(new CKEDITOR.dom.elementPath(p.startContainer,p.root)).blockLimit||p.root;n={type:D,dontFilter:w,editable:n,editor:A,range:p,blockLimit:C,mergeCandidates:[],zombies:[]};D=n.range;p=n.mergeCandidates;var I,u;"text"==n.type&&D.shrink(CKEDITOR.SHRINK_ELEMENT,!0,!1)&&(I=CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e",D.document),D.insertNode(I),
D.setStartAfter(I));w=new CKEDITOR.dom.elementPath(D.startContainer);n.endPath=C=new CKEDITOR.dom.elementPath(D.endContainer);if(!D.collapsed){var A=C.block||C.blockLimit,fa=D.getCommonAncestor();A&&!A.equals(fa)&&!A.contains(fa)&&D.checkEndOfBlock()&&n.zombies.push(A);D.deleteContents()}for(;(u=g(D))&&a(u)&&u.isBlockBoundary()&&w.contains(u);)D.moveToPosition(u,CKEDITOR.POSITION_BEFORE_END);h(D,n.blockLimit,w,C);I&&(D.setEndBefore(I),D.collapse(),I.remove());I=D.startPath();if(A=I.contains(f,!1,
1))D.splitElement(A),n.inlineStylesRoot=A,n.inlineStylesPeak=I.lastElement;I=D.createBookmark();(A=I.startNode.getPrevious(c))&&a(A)&&f(A)&&p.push(A);(A=I.startNode.getNext(c))&&a(A)&&f(A)&&p.push(A);for(A=I.startNode;(A=A.getParent())&&f(A);)p.push(A);D.moveToBookmark(I);if(I=r){I=n.range;if("text"==n.type&&n.inlineStylesRoot){u=n.inlineStylesPeak;D=u.getDocument().createText("{cke-peak}");for(p=n.inlineStylesRoot.getParent();!u.equals(p);)D=D.appendTo(u.clone()),u=u.getParent();r=D.getOuterHtml().split("{cke-peak}").join(r)}u=
n.blockLimit.getName();if(/^\s+|\s+$/.test(r)&&"span"in CKEDITOR.dtd[u]){var O='\x3cspan data-cke-marker\x3d"1"\x3e\x26nbsp;\x3c/span\x3e';r=O+r+O}r=n.editor.dataProcessor.toHtml(r,{context:null,fixForBody:!1,protectedWhitespaces:!!O,dontFilter:n.dontFilter,filter:n.editor.activeFilter,enterMode:n.editor.activeEnterMode});u=I.document.createElement("body");u.setHtml(r);O&&(u.getFirst().remove(),u.getLast().remove());if((O=I.startPath().block)&&(1!=O.getChildCount()||!O.getBogus()))a:{var P;if(1==
u.getChildCount()&&a(P=u.getFirst())&&P.is(q)&&!P.hasAttribute("contenteditable")){O=P.getElementsByTag("*");I=0;for(p=O.count();I<p;I++)if(D=O.getItem(I),!D.is(x))break a;P.moveChildren(P.getParent(1));P.remove()}}n.dataWrapper=u;I=r}if(I){P=n.range;I=P.document;var M;u=n.blockLimit;p=0;var T,O=[],S,X;r=A=0;var V,Y;D=P.startContainer;var w=n.endPath.elements[0],Z,C=w.getPosition(D),fa=!!w.getCommonAncestor(D)&&C!=CKEDITOR.POSITION_IDENTICAL&&!(C&CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_IS_CONTAINED);
D=b(n.dataWrapper,n);for(l(D,P);p<D.length;p++){C=D[p];if(M=C.isLineBreak){M=P;V=u;var W=void 0,aa=void 0;C.hasBlockSibling?M=1:(W=M.startContainer.getAscendant(m.$block,1))&&W.is({div:1,p:1})?(aa=W.getPosition(V),aa==CKEDITOR.POSITION_IDENTICAL||aa==CKEDITOR.POSITION_CONTAINS?M=0:(V=M.splitElement(W),M.moveToPosition(V,CKEDITOR.POSITION_AFTER_START),M=1)):M=0}if(M)r=0<p;else{M=P.startPath();!C.isBlock&&k(n.editor,M.block,M.blockLimit)&&(X=d(n.editor))&&(X=I.createElement(X),X.appendBogus(),P.insertNode(X),
CKEDITOR.env.needsBrFiller&&(T=X.getBogus())&&T.remove(),P.moveToPosition(X,CKEDITOR.POSITION_BEFORE_END));if((M=P.startPath().block)&&!M.equals(S)){if(T=M.getBogus())T.remove(),O.push(M);S=M}C.firstNotAllowed&&(A=1);if(A&&C.isElement){M=P.startContainer;for(V=null;M&&!m[M.getName()][C.name];){if(M.equals(u)){M=null;break}V=M;M=M.getParent()}if(M)V&&(Y=P.splitElement(V),n.zombies.push(Y),n.zombies.push(V));else{V=u.getName();Z=!p;M=p==D.length-1;V=e(C.node,V);for(var W=[],aa=V.length,da=0,ia=void 0,
ja=0,ea=-1;da<aa;da++)ia=V[da]," "==ia?(ja||Z&&!da||(W.push(new CKEDITOR.dom.text(" ")),ea=W.length),ja=1):(W.push(ia),ja=0);M&&ea==W.length&&W.pop();Z=W}}if(Z){for(;M=Z.pop();)P.insertNode(M);Z=0}else P.insertNode(C.node);C.lastNotAllowed&&p<D.length-1&&((Y=fa?w:Y)&&P.setEndAt(Y,CKEDITOR.POSITION_AFTER_START),A=0);P.collapse()}}1!=D.length?T=!1:(T=D[0],T=T.isElement&&"false"==T.node.getAttribute("contenteditable"));T&&(r=!0,M=D[0].node,P.setStartAt(M,CKEDITOR.POSITION_BEFORE_START),P.setEndAt(M,
CKEDITOR.POSITION_AFTER_END));n.dontMoveCaret=r;n.bogusNeededBlocks=O}T=n.range;var ga;Y=n.bogusNeededBlocks;for(Z=T.createBookmark();S=n.zombies.pop();)S.getParent()&&(X=T.clone(),X.moveToElementEditStart(S),X.removeEmptyBlocksAtEnd());if(Y)for(;S=Y.pop();)CKEDITOR.env.needsBrFiller?S.appendBogus():S.append(T.document.createText(" "));for(;S=n.mergeCandidates.pop();)S.mergeSiblings();T.moveToBookmark(Z);if(!n.dontMoveCaret){for(S=g(T);S&&a(S)&&!S.is(m.$empty);){if(S.isBlockBoundary())T.moveToPosition(S,
CKEDITOR.POSITION_BEFORE_END);else{if(f(S)&&S.getHtml().match(/(\s|&nbsp;)$/g)){ga=null;break}ga=T.clone();ga.moveToPosition(S,CKEDITOR.POSITION_BEFORE_END)}S=S.getLast(c)}ga&&T.moveToRange(ga)}}}}();q=function(){function a(b){b=new CKEDITOR.dom.walker(b);b.guard=function(a,b){if(b)return!1;if(a.type==CKEDITOR.NODE_ELEMENT)return a.is(CKEDITOR.dtd.$tableContent)};b.evaluator=function(a){return a.type==CKEDITOR.NODE_ELEMENT};return b}function b(a,c,d){c=a.getDocument().createElement(c);a.append(c,
d);return c}function c(a){var b=a.count(),d;for(b;0<b--;)d=a.getItem(b),CKEDITOR.tools.trim(d.getHtml())||(d.appendBogus(),CKEDITOR.env.ie&&9>CKEDITOR.env.version&&d.getChildCount()&&d.getFirst().remove())}return function(d){var e=d.startContainer,g=e.getAscendant("table",1),f=!1;c(g.getElementsByTag("td"));c(g.getElementsByTag("th"));g=d.clone();g.setStart(e,0);g=a(g).lastBackward();g||(g=d.clone(),g.setEndAt(e,CKEDITOR.POSITION_BEFORE_END),g=a(g).lastForward(),f=!0);g||(g=e);g.is("table")?(d.setStartAt(g,
CKEDITOR.POSITION_BEFORE_START),d.collapse(!0),g.remove()):(g.is({tbody:1,thead:1,tfoot:1})&&(g=b(g,"tr",f)),g.is("tr")&&(g=b(g,g.getParent().is("thead")?"th":"td",f)),(e=g.getBogus())&&e.remove(),d.moveToPosition(g,f?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_BEFORE_END))}}();x=function(){function a(b){b=new CKEDITOR.dom.walker(b);b.guard=function(a,b){if(b)return!1;if(a.type==CKEDITOR.NODE_ELEMENT)return a.is(CKEDITOR.dtd.$list)||a.is(CKEDITOR.dtd.$listItem)};b.evaluator=function(a){return a.type==
CKEDITOR.NODE_ELEMENT&&a.is(CKEDITOR.dtd.$listItem)};return b}return function(b){var c=b.startContainer,d=!1,e;e=b.clone();e.setStart(c,0);e=a(e).lastBackward();e||(e=b.clone(),e.setEndAt(c,CKEDITOR.POSITION_BEFORE_END),e=a(e).lastForward(),d=!0);e||(e=c);e.is(CKEDITOR.dtd.$list)?(b.setStartAt(e,CKEDITOR.POSITION_BEFORE_START),b.collapse(!0),e.remove()):((c=e.getBogus())&&c.remove(),b.moveToPosition(e,d?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_BEFORE_END),b.select())}}();r={eol:{detect:function(a,
b){var c=a.range,d=c.clone(),e=c.clone(),g=new CKEDITOR.dom.elementPath(c.startContainer,b),f=new CKEDITOR.dom.elementPath(c.endContainer,b);d.collapse(1);e.collapse();g.block&&d.checkBoundaryOfElement(g.block,CKEDITOR.END)&&(c.setStartAfter(g.block),a.prependEolBr=1);f.block&&e.checkBoundaryOfElement(f.block,CKEDITOR.START)&&(c.setEndBefore(f.block),a.appendEolBr=1)},fix:function(a,b){var c=b.getDocument(),d;a.appendEolBr&&(d=this.createEolBr(c),a.fragment.append(d));!a.prependEolBr||d&&!d.getPrevious()||
a.fragment.append(this.createEolBr(c),1)},createEolBr:function(a){return a.createElement("br",{attributes:{"data-cke-eol":1}})}},bogus:{exclude:function(a){var b=a.range.getBoundaryNodes(),c=b.startNode,b=b.endNode;!b||!u(b)||c&&c.equals(b)||a.range.setEndBefore(b)}},tree:{rebuild:function(a,b){var c=a.range,d=c.getCommonAncestor(),e=new CKEDITOR.dom.elementPath(d,b),g=new CKEDITOR.dom.elementPath(c.startContainer,b),c=new CKEDITOR.dom.elementPath(c.endContainer,b),f;d.type==CKEDITOR.NODE_TEXT&&(d=
d.getParent());if(e.blockLimit.is({tr:1,table:1})){var h=e.contains("table").getParent();f=function(a){return!a.equals(h)}}else if(e.block&&e.block.is(CKEDITOR.dtd.$listItem)&&(g=g.contains(CKEDITOR.dtd.$list),c=c.contains(CKEDITOR.dtd.$list),!g.equals(c))){var l=e.contains(CKEDITOR.dtd.$list).getParent();f=function(a){return!a.equals(l)}}f||(f=function(a){return!a.equals(e.block)&&!a.equals(e.blockLimit)});this.rebuildFragment(a,b,d,f)},rebuildFragment:function(a,b,c,d){for(var e;c&&!c.equals(b)&&
d(c);)e=c.clone(0,1),a.fragment.appendTo(e),a.fragment=e,c=c.getParent()}},cell:{shrink:function(a){a=a.range;var b=a.startContainer,c=a.endContainer,d=a.startOffset,e=a.endOffset;b.type==CKEDITOR.NODE_ELEMENT&&b.equals(c)&&b.is("tr")&&++d==e&&a.shrink(CKEDITOR.SHRINK_TEXT)}}};A=function(){function a(b,c){var d=b.getParent();if(d.is(CKEDITOR.dtd.$inline))b[c?"insertBefore":"insertAfter"](d)}function b(c,d,e){a(d);a(e,1);for(var g;g=e.getNext();)g.insertAfter(d),d=g;p(c)&&c.remove()}function c(a,b){var d=
new CKEDITOR.dom.range(a);d.setStartAfter(b.startNode);d.setEndBefore(b.endNode);return d}return{list:{detectMerge:function(a,b){var d=c(b,a.bookmark),e=d.startPath(),g=d.endPath(),f=e.contains(CKEDITOR.dtd.$list),h=g.contains(CKEDITOR.dtd.$list);a.mergeList=f&&h&&f.getParent().equals(h.getParent())&&!f.equals(h);a.mergeListItems=e.block&&g.block&&e.block.is(CKEDITOR.dtd.$listItem)&&g.block.is(CKEDITOR.dtd.$listItem);if(a.mergeList||a.mergeListItems)d=d.clone(),d.setStartBefore(a.bookmark.startNode),
d.setEndAfter(a.bookmark.endNode),a.mergeListBookmark=d.createBookmark()},merge:function(a,c){if(a.mergeListBookmark){var d=a.mergeListBookmark.startNode,e=a.mergeListBookmark.endNode,g=new CKEDITOR.dom.elementPath(d,c),f=new CKEDITOR.dom.elementPath(e,c);if(a.mergeList){var h=g.contains(CKEDITOR.dtd.$list),l=f.contains(CKEDITOR.dtd.$list);h.equals(l)||(l.moveChildren(h),l.remove())}a.mergeListItems&&(g=g.contains(CKEDITOR.dtd.$listItem),f=f.contains(CKEDITOR.dtd.$listItem),g.equals(f)||b(f,d,e));
d.remove();e.remove()}}},block:{detectMerge:function(a,b){if(!a.tableContentsRanges&&!a.mergeListBookmark){var c=new CKEDITOR.dom.range(b);c.setStartBefore(a.bookmark.startNode);c.setEndAfter(a.bookmark.endNode);a.mergeBlockBookmark=c.createBookmark()}},merge:function(a,c){if(a.mergeBlockBookmark&&!a.purgeTableBookmark){var d=a.mergeBlockBookmark.startNode,e=a.mergeBlockBookmark.endNode,g=new CKEDITOR.dom.elementPath(d,c),f=new CKEDITOR.dom.elementPath(e,c),g=g.block,f=f.block;g&&f&&!g.equals(f)&&
b(f,d,e);d.remove();e.remove()}}},table:function(){function a(c){var e=[],g,f=new CKEDITOR.dom.walker(c),h=c.startPath().contains(d),l=c.endPath().contains(d),k={};f.guard=function(a,f){if(a.type==CKEDITOR.NODE_ELEMENT){var m="visited_"+(f?"out":"in");if(a.getCustomData(m))return;CKEDITOR.dom.element.setMarker(k,a,m,1)}if(f&&h&&a.equals(h))g=c.clone(),g.setEndAt(h,CKEDITOR.POSITION_BEFORE_END),e.push(g);else if(!f&&l&&a.equals(l))g=c.clone(),g.setStartAt(l,CKEDITOR.POSITION_AFTER_START),e.push(g);
else{if(m=!f)m=a.type==CKEDITOR.NODE_ELEMENT&&a.is(d)&&(!h||b(a,h))&&(!l||b(a,l));m&&(g=c.clone(),g.selectNodeContents(a),e.push(g))}};f.lastForward();CKEDITOR.dom.element.clearAllMarkers(k);return e}function b(a,c){var d=CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_IS_CONTAINED,e=a.getPosition(c);return e===CKEDITOR.POSITION_IDENTICAL?!1:0===(e&d)}var d={td:1,th:1,caption:1};return{detectPurge:function(a){var b=a.range,c=b.clone();c.enlarge(CKEDITOR.ENLARGE_ELEMENT);var c=new CKEDITOR.dom.walker(c),
e=0;c.evaluator=function(a){a.type==CKEDITOR.NODE_ELEMENT&&a.is(d)&&++e};c.checkForward();if(1<e){var c=b.startPath().contains("table"),g=b.endPath().contains("table");c&&g&&b.checkBoundaryOfElement(c,CKEDITOR.START)&&b.checkBoundaryOfElement(g,CKEDITOR.END)&&(b=a.range.clone(),b.setStartBefore(c),b.setEndAfter(g),a.purgeTableBookmark=b.createBookmark())}},detectRanges:function(e,g){var f=c(g,e.bookmark),h=f.clone(),l,k,m=f.getCommonAncestor();m.is(CKEDITOR.dtd.$tableContent)&&!m.is(d)&&(m=m.getAscendant("table",
!0));k=m;m=new CKEDITOR.dom.elementPath(f.startContainer,k);k=new CKEDITOR.dom.elementPath(f.endContainer,k);m=m.contains("table");k=k.contains("table");if(m||k)m&&k&&b(m,k)?(e.tableSurroundingRange=h,h.setStartAt(m,CKEDITOR.POSITION_AFTER_END),h.setEndAt(k,CKEDITOR.POSITION_BEFORE_START),h=f.clone(),h.setEndAt(m,CKEDITOR.POSITION_AFTER_END),l=f.clone(),l.setStartAt(k,CKEDITOR.POSITION_BEFORE_START),l=a(h).concat(a(l))):m?k||(e.tableSurroundingRange=h,h.setStartAt(m,CKEDITOR.POSITION_AFTER_END),f.setEndAt(m,
CKEDITOR.POSITION_AFTER_END)):(e.tableSurroundingRange=h,h.setEndAt(k,CKEDITOR.POSITION_BEFORE_START),f.setStartAt(k,CKEDITOR.POSITION_AFTER_START)),e.tableContentsRanges=l?l:a(f)},deleteRanges:function(a){for(var b;b=a.tableContentsRanges.pop();)b.extractContents(),p(b.startContainer)&&b.startContainer.appendBogus();a.tableSurroundingRange&&a.tableSurroundingRange.extractContents()},purge:function(a){if(a.purgeTableBookmark){var b=a.doc,c=a.range.clone(),b=b.createElement("p");b.insertBefore(a.purgeTableBookmark.startNode);
c.moveToBookmark(a.purgeTableBookmark);c.deleteContents();a.range.moveToPosition(b,CKEDITOR.POSITION_AFTER_START)}}}}(),detectExtractMerge:function(a){return!(a.range.startPath().contains(CKEDITOR.dtd.$listItem)&&a.range.endPath().contains(CKEDITOR.dtd.$listItem))},fixUneditableRangePosition:function(a){a.startContainer.getDtd()["#"]||a.moveToClosestEditablePosition(null,!0)},autoParagraph:function(a,b){var c=b.startPath(),e;k(a,c.block,c.blockLimit)&&(e=d(a))&&(e=b.document.createElement(e),e.appendBogus(),
b.insertNode(e),b.moveToPosition(e,CKEDITOR.POSITION_AFTER_START))}}}()}(),function(){function a(a,b){if(0===a.length)return!1;var c,d;if((c=!b&&1===a.length)&&!(c=a[0].collapsed)){var e=a[0];c=e.startContainer.getAscendant({td:1,th:1},!0);var g=e.endContainer.getAscendant({td:1,th:1},!0);d=CKEDITOR.tools.trim;c&&c.equals(g)&&!c.findOne("td, th, tr, tbody, table")?(e=e.cloneContents(),c=e.getFirst()?d(e.getFirst().getText())!==d(c.getText()):!0):c=!1}if(c)return!1;for(d=0;d<a.length;d++)if(c=a[d]._getTableElement(),
!c)return!1;return!0}function f(a){function b(a){a=a.find("td, th");var c=[],d;for(d=0;d<a.count();d++)c.push(a.getItem(d));return c}var c=[],d,e;for(e=0;e<a.length;e++)d=a[e]._getTableElement(),d.is&&d.is({td:1,th:1})?c.push(d):c=c.concat(b(d));return c}function b(a){a=f(a);var b="",c=[],d,e;for(e=0;e<a.length;e++)d&&!d.equals(a[e].getAscendant("tr"))?(b+=c.join("\t")+"\n",d=a[e].getAscendant("tr"),c=[]):0===e&&(d=a[e].getAscendant("tr")),c.push(a[e].getText());return b+=c.join("\t")}function c(a){var c=
this.root.editor,d=c.getSelection(1);this.reset();A=!0;d.root.once("selectionchange",function(a){a.cancel()},null,null,0);d.selectRanges([a[0]]);d=this._.cache;d.ranges=new CKEDITOR.dom.rangeList(a);d.type=CKEDITOR.SELECTION_TEXT;d.selectedElement=a[0]._getTableElement();d.selectedText=b(a);d.nativeSel=null;this.isFake=1;this.rev=q++;c._.fakeSelection=this;A=!1;this.root.fire("selectionchange")}function e(){var b=this._.fakeSelection,c;if(b){c=this.getSelection(1);var d;if(!(d=!c)&&(d=!c.isHidden())){d=
b;var e=c.getRanges(),g=d.getRanges(),f=e.length&&e[0]._getTableElement()&&e[0]._getTableElement().getAscendant("table",!0),h=g.length&&g[0]._getTableElement()&&g[0]._getTableElement().getAscendant("table",!0),l=1===e.length&&e[0]._getTableElement()&&e[0]._getTableElement().is("table"),k=1===g.length&&g[0]._getTableElement()&&g[0]._getTableElement().is("table"),m=1===e.length&&e[0].collapsed,g=a(e,!!CKEDITOR.env.webkit)&&a(g);f=f&&h?f.equals(h)||h.contains(f):!1;f&&(m||g)?(l&&!k&&d.selectRanges(e),
d=!0):d=!1;d=!d}d&&(b.reset(),b=0)}if(!b&&(b=c||this.getSelection(1),!b||b.getType()==CKEDITOR.SELECTION_NONE))return;this.fire("selectionCheck",b);c=this.elementPath();c.compare(this._.selectionPreviousPath)||(d=this._.selectionPreviousPath&&this._.selectionPreviousPath.blockLimit.equals(c.blockLimit),CKEDITOR.env.webkit&&!d&&(this._.previousActive=this.document.getActive()),this._.selectionPreviousPath=c,this.fire("selectionChange",{selection:b,path:c}))}function m(){y=!0;t||(k.call(this),t=CKEDITOR.tools.setTimeout(k,
200,this))}function k(){t=null;y&&(CKEDITOR.tools.setTimeout(e,0,this),y=!1)}function d(a){return v(a)||a.type==CKEDITOR.NODE_ELEMENT&&!a.is(CKEDITOR.dtd.$empty)?!0:!1}function h(a){function b(c,d){return c&&c.type!=CKEDITOR.NODE_TEXT?a.clone()["moveToElementEdit"+(d?"End":"Start")](c):!1}if(!(a.root instanceof CKEDITOR.editable))return!1;var c=a.startContainer,e=a.getPreviousNode(d,null,c),g=a.getNextNode(d,null,c);return b(e)||b(g,1)||!(e||g||c.type==CKEDITOR.NODE_ELEMENT&&c.isBlockBoundary()&&
c.getBogus())?!0:!1}function l(a){g(a,!1);var b=a.getDocument().createText(x);a.setCustomData("cke-fillingChar",b);return b}function g(a,b){var c=a&&a.removeCustomData("cke-fillingChar");if(c){if(!1!==b){var d=a.getDocument().getSelection().getNative(),e=d&&"None"!=d.type&&d.getRangeAt(0),g=x.length;if(c.getLength()>g&&e&&e.intersectsNode(c.$)){var f=[{node:d.anchorNode,offset:d.anchorOffset},{node:d.focusNode,offset:d.focusOffset}];d.anchorNode==c.$&&d.anchorOffset>g&&(f[0].offset-=g);d.focusNode==
c.$&&d.focusOffset>g&&(f[1].offset-=g)}}c.setText(n(c.getText(),1));f&&(c=a.getDocument().$,d=c.getSelection(),c=c.createRange(),c.setStart(f[0].node,f[0].offset),c.collapse(!0),d.removeAllRanges(),d.addRange(c),d.extend(f[1].node,f[1].offset))}}function n(a,b){return b?a.replace(r,function(a,b){return b?" ":""}):a.replace(x,"")}function p(a,b){var c=CKEDITOR.dom.element.createFromHtml('\x3cdiv data-cke-hidden-sel\x3d"1" data-cke-temp\x3d"1" style\x3d"'+(CKEDITOR.env.ie&&14>CKEDITOR.env.version?"display:none":
"position:fixed;top:0;left:-1000px")+'"\x3e'+(b||"\x26nbsp;")+"\x3c/div\x3e",a.document);a.fire("lockSnapshot");a.editable().append(c);var d=a.getSelection(1),e=a.createRange(),g=d.root.on("selectionchange",function(a){a.cancel()},null,null,0);e.setStartAt(c,CKEDITOR.POSITION_AFTER_START);e.setEndAt(c,CKEDITOR.POSITION_BEFORE_END);d.selectRanges([e]);g.removeListener();a.fire("unlockSnapshot");a._.hiddenSelectionContainer=c}function u(a){var b={37:1,39:1,8:1,46:1};return function(c){var d=c.data.getKeystroke();
if(b[d]){var e=a.getSelection().getRanges(),g=e[0];1==e.length&&g.collapsed&&(d=g[38>d?"getPreviousEditableNode":"getNextEditableNode"]())&&d.type==CKEDITOR.NODE_ELEMENT&&"false"==d.getAttribute("contenteditable")&&(a.getSelection().fake(d),c.data.preventDefault(),c.cancel())}}}function C(a){for(var b=0;b<a.length;b++){var c=a[b];c.getCommonAncestor().isReadOnly()&&a.splice(b,1);if(!c.collapsed){if(c.startContainer.isReadOnly())for(var d=c.startContainer,e;d&&!((e=d.type==CKEDITOR.NODE_ELEMENT)&&
d.is("body")||!d.isReadOnly());)e&&"false"==d.getAttribute("contentEditable")&&c.setStartAfter(d),d=d.getParent();d=c.startContainer;e=c.endContainer;var g=c.startOffset,f=c.endOffset,h=c.clone();d&&d.type==CKEDITOR.NODE_TEXT&&(g>=d.getLength()?h.setStartAfter(d):h.setStartBefore(d));e&&e.type==CKEDITOR.NODE_TEXT&&(f?h.setEndAfter(e):h.setEndBefore(e));d=new CKEDITOR.dom.walker(h);d.evaluator=function(d){if(d.type==CKEDITOR.NODE_ELEMENT&&d.isReadOnly()){var e=c.clone();c.setEndBefore(d);c.collapsed&&
a.splice(b--,1);d.getPosition(h.endContainer)&CKEDITOR.POSITION_CONTAINS||(e.setStartAfter(d),e.collapsed||a.splice(b+1,0,e));return!0}return!1};d.next()}}return a}var w="function"!=typeof window.getSelection,q=1,x=CKEDITOR.tools.repeat("​",7),r=new RegExp(x+"( )?","g"),A,t,y,v=CKEDITOR.dom.walker.invisible(1),z=function(){function a(b){return function(a){var c=a.editor.createRange();c.moveToClosestEditablePosition(a.selected,b)&&a.editor.getSelection().selectRanges([c]);return!1}}function b(a){return function(b){var c=
b.editor,d=c.createRange(),e;(e=d.moveToClosestEditablePosition(b.selected,a))||(e=d.moveToClosestEditablePosition(b.selected,!a));e&&c.getSelection().selectRanges([d]);c.fire("saveSnapshot");b.selected.remove();e||(d.moveToElementEditablePosition(c.editable()),c.getSelection().selectRanges([d]));c.fire("saveSnapshot");return!1}}var c=a(),d=a(1);return{37:c,38:c,39:d,40:d,8:b(),46:b(1)}}();CKEDITOR.on("instanceCreated",function(a){function b(){var a=c.getSelection();a&&a.removeAllRanges()}var c=a.editor;
c.on("contentDom",function(){function a(){r=new CKEDITOR.dom.selection(c.getSelection());r.lock()}function b(){h.removeListener("mouseup",b);n.removeListener("mouseup",b);var a=CKEDITOR.document.$.selection,c=a.createRange();"None"!=a.type&&c.parentElement()&&c.parentElement().ownerDocument==f.$&&c.select()}function d(a){if(CKEDITOR.env.ie){var b=(a=a.getRanges()[0])?a.startContainer.getAscendant(function(a){return a.type==CKEDITOR.NODE_ELEMENT&&("false"==a.getAttribute("contenteditable")||"true"==
a.getAttribute("contenteditable"))},!0):null;return a&&"false"==b.getAttribute("contenteditable")&&b}}var f=c.document,h=CKEDITOR.document,l=c.editable(),k=f.getBody(),n=f.getDocumentElement(),q=l.isInline(),x,r;CKEDITOR.env.gecko&&l.attachListener(l,"focus",function(a){a.removeListener();0!==x&&(a=c.getSelection().getNative())&&a.isCollapsed&&a.anchorNode==l.$&&(a=c.createRange(),a.moveToElementEditStart(l),a.select())},null,null,-2);l.attachListener(l,CKEDITOR.env.webkit?"DOMFocusIn":"focus",function(){x&&
CKEDITOR.env.webkit&&(x=c._.previousActive&&c._.previousActive.equals(f.getActive()))&&null!=c._.previousScrollTop&&c._.previousScrollTop!=l.$.scrollTop&&(l.$.scrollTop=c._.previousScrollTop);c.unlockSelection(x);x=0},null,null,-1);l.attachListener(l,"mousedown",function(){x=0});if(CKEDITOR.env.ie||q)w?l.attachListener(l,"beforedeactivate",a,null,null,-1):l.attachListener(c,"selectionCheck",a,null,null,-1),l.attachListener(l,CKEDITOR.env.webkit?"DOMFocusOut":"blur",function(){c.lockSelection(r);x=
1},null,null,-1),l.attachListener(l,"mousedown",function(){x=0});if(CKEDITOR.env.ie&&!q){var p;l.attachListener(l,"mousedown",function(a){2==a.data.$.button&&((a=c.document.getSelection())&&a.getType()!=CKEDITOR.SELECTION_NONE||(p=c.window.getScrollPosition()))});l.attachListener(l,"mouseup",function(a){2==a.data.$.button&&p&&(c.document.$.documentElement.scrollLeft=p.x,c.document.$.documentElement.scrollTop=p.y);p=null});if("BackCompat"!=f.$.compatMode){if(CKEDITOR.env.ie7Compat||CKEDITOR.env.ie6Compat){var v,
y;n.on("mousedown",function(a){function b(a){a=a.data.$;if(v){var c=k.$.createTextRange();try{c.moveToPoint(a.clientX,a.clientY)}catch(d){}v.setEndPoint(0>y.compareEndPoints("StartToStart",c)?"EndToEnd":"StartToStart",c);v.select()}}function c(){n.removeListener("mousemove",b);h.removeListener("mouseup",c);n.removeListener("mouseup",c);v.select()}a=a.data;if(a.getTarget().is("html")&&a.$.y<n.$.clientHeight&&a.$.x<n.$.clientWidth){v=k.$.createTextRange();try{v.moveToPoint(a.$.clientX,a.$.clientY)}catch(d){}y=
v.duplicate();n.on("mousemove",b);h.on("mouseup",c);n.on("mouseup",c)}})}if(7<CKEDITOR.env.version&&11>CKEDITOR.env.version)n.on("mousedown",function(a){a.data.getTarget().is("html")&&(h.on("mouseup",b),n.on("mouseup",b))})}}l.attachListener(l,"selectionchange",e,c);l.attachListener(l,"keyup",m,c);l.attachListener(l,"keydown",function(a){var b=this.getSelection(1);d(b)&&(b.selectElement(d(b)),a.data.preventDefault())},c);l.attachListener(l,CKEDITOR.env.webkit?"DOMFocusIn":"focus",function(){c.forceNextSelectionCheck();
c.selectionChange(1)});if(q&&(CKEDITOR.env.webkit||CKEDITOR.env.gecko)){var t;l.attachListener(l,"mousedown",function(){t=1});l.attachListener(f.getDocumentElement(),"mouseup",function(){t&&m.call(c);t=0})}else l.attachListener(CKEDITOR.env.ie?l:f.getDocumentElement(),"mouseup",m,c);CKEDITOR.env.webkit&&l.attachListener(f,"keydown",function(a){switch(a.data.getKey()){case 13:case 33:case 34:case 35:case 36:case 37:case 39:case 8:case 45:case 46:l.hasFocus&&g(l)}},null,null,-1);l.attachListener(l,
"keydown",u(c),null,null,-1)});c.on("setData",function(){c.unlockSelection();CKEDITOR.env.webkit&&b()});c.on("contentDomUnload",function(){c.unlockSelection()});if(CKEDITOR.env.ie9Compat)c.on("beforeDestroy",b,null,null,9);c.on("dataReady",function(){delete c._.fakeSelection;delete c._.hiddenSelectionContainer;c.selectionChange(1)});c.on("loadSnapshot",function(){var a=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT),b=c.editable().getLast(a);b&&b.hasAttribute("data-cke-hidden-sel")&&(b.remove(),
CKEDITOR.env.gecko&&(a=c.editable().getFirst(a))&&a.is("br")&&a.getAttribute("_moz_editor_bogus_node")&&a.remove())},null,null,100);c.on("key",function(a){if("wysiwyg"==c.mode){var b=c.getSelection();if(b.isFake){var d=z[a.data.keyCode];if(d)return d({editor:c,selected:b.getSelectedElement(),selection:b,keyEvent:a})}}})});if(CKEDITOR.env.webkit)CKEDITOR.on("instanceReady",function(a){var b=a.editor;b.on("selectionChange",function(){var a=b.editable(),c=a.getCustomData("cke-fillingChar");c&&(c.getCustomData("ready")?
(g(a),a.editor.fire("selectionCheck")):c.setCustomData("ready",1))},null,null,-1);b.on("beforeSetMode",function(){g(b.editable())},null,null,-1);b.on("getSnapshot",function(a){a.data&&(a.data=n(a.data))},b,null,20);b.on("toDataFormat",function(a){a.data.dataValue=n(a.data.dataValue)},null,null,0)});CKEDITOR.editor.prototype.selectionChange=function(a){(a?e:m).call(this)};CKEDITOR.editor.prototype.getSelection=function(a){return!this._.savedSelection&&!this._.fakeSelection||a?(a=this.editable())&&
"wysiwyg"==this.mode?new CKEDITOR.dom.selection(a):null:this._.savedSelection||this._.fakeSelection};CKEDITOR.editor.prototype.lockSelection=function(a){a=a||this.getSelection(1);return a.getType()!=CKEDITOR.SELECTION_NONE?(!a.isLocked&&a.lock(),this._.savedSelection=a,!0):!1};CKEDITOR.editor.prototype.unlockSelection=function(a){var b=this._.savedSelection;return b?(b.unlock(a),delete this._.savedSelection,!0):!1};CKEDITOR.editor.prototype.forceNextSelectionCheck=function(){delete this._.selectionPreviousPath};
CKEDITOR.dom.document.prototype.getSelection=function(){return new CKEDITOR.dom.selection(this)};CKEDITOR.dom.range.prototype.select=function(){var a=this.root instanceof CKEDITOR.editable?this.root.editor.getSelection():new CKEDITOR.dom.selection(this.root);a.selectRanges([this]);return a};CKEDITOR.SELECTION_NONE=1;CKEDITOR.SELECTION_TEXT=2;CKEDITOR.SELECTION_ELEMENT=3;CKEDITOR.dom.selection=function(a){if(a instanceof CKEDITOR.dom.selection){var b=a;a=a.root}var c=a instanceof CKEDITOR.dom.element;
this.rev=b?b.rev:q++;this.document=a instanceof CKEDITOR.dom.document?a:a.getDocument();this.root=c?a:this.document.getBody();this.isLocked=0;this._={cache:{}};if(b)return CKEDITOR.tools.extend(this._.cache,b._.cache),this.isFake=b.isFake,this.isLocked=b.isLocked,this;a=this.getNative();var d,e;if(a)if(a.getRangeAt)d=(e=a.rangeCount&&a.getRangeAt(0))&&new CKEDITOR.dom.node(e.commonAncestorContainer);else{try{e=a.createRange()}catch(g){}d=e&&CKEDITOR.dom.element.get(e.item&&e.item(0)||e.parentElement())}if(!d||
d.type!=CKEDITOR.NODE_ELEMENT&&d.type!=CKEDITOR.NODE_TEXT||!this.root.equals(d)&&!this.root.contains(d))this._.cache.type=CKEDITOR.SELECTION_NONE,this._.cache.startElement=null,this._.cache.selectedElement=null,this._.cache.selectedText="",this._.cache.ranges=new CKEDITOR.dom.rangeList;return this};var B={img:1,hr:1,li:1,table:1,tr:1,td:1,th:1,embed:1,object:1,ol:1,ul:1,a:1,input:1,form:1,select:1,textarea:1,button:1,fieldset:1,thead:1,tfoot:1};CKEDITOR.tools.extend(CKEDITOR.dom.selection,{_removeFillingCharSequenceString:n,
_createFillingCharSequenceNode:l,FILLING_CHAR_SEQUENCE:x});CKEDITOR.dom.selection.prototype={getNative:function(){return void 0!==this._.cache.nativeSel?this._.cache.nativeSel:this._.cache.nativeSel=w?this.document.$.selection:this.document.getWindow().$.getSelection()},getType:w?function(){var a=this._.cache;if(a.type)return a.type;var b=CKEDITOR.SELECTION_NONE;try{var c=this.getNative(),d=c.type;"Text"==d&&(b=CKEDITOR.SELECTION_TEXT);"Control"==d&&(b=CKEDITOR.SELECTION_ELEMENT);c.createRange().parentElement()&&
(b=CKEDITOR.SELECTION_TEXT)}catch(e){}return a.type=b}:function(){var a=this._.cache;if(a.type)return a.type;var b=CKEDITOR.SELECTION_TEXT,c=this.getNative();if(!c||!c.rangeCount)b=CKEDITOR.SELECTION_NONE;else if(1==c.rangeCount){var c=c.getRangeAt(0),d=c.startContainer;d==c.endContainer&&1==d.nodeType&&1==c.endOffset-c.startOffset&&B[d.childNodes[c.startOffset].nodeName.toLowerCase()]&&(b=CKEDITOR.SELECTION_ELEMENT)}return a.type=b},getRanges:function(){var a=w?function(){function a(b){return(new CKEDITOR.dom.node(b)).getIndex()}
var b=function(b,c){b=b.duplicate();b.collapse(c);var d=b.parentElement();if(!d.hasChildNodes())return{container:d,offset:0};for(var e=d.children,g,f,h=b.duplicate(),l=0,k=e.length-1,m=-1,n,q;l<=k;)if(m=Math.floor((l+k)/2),g=e[m],h.moveToElementText(g),n=h.compareEndPoints("StartToStart",b),0<n)k=m-1;else if(0>n)l=m+1;else return{container:d,offset:a(g)};if(-1==m||m==e.length-1&&0>n){h.moveToElementText(d);h.setEndPoint("StartToStart",b);h=h.text.replace(/(\r\n|\r)/g,"\n").length;e=d.childNodes;if(!h)return g=
e[e.length-1],g.nodeType!=CKEDITOR.NODE_TEXT?{container:d,offset:e.length}:{container:g,offset:g.nodeValue.length};for(d=e.length;0<h&&0<d;)f=e[--d],f.nodeType==CKEDITOR.NODE_TEXT&&(q=f,h-=f.nodeValue.length);return{container:q,offset:-h}}h.collapse(0<n?!0:!1);h.setEndPoint(0<n?"StartToStart":"EndToStart",b);h=h.text.replace(/(\r\n|\r)/g,"\n").length;if(!h)return{container:d,offset:a(g)+(0<n?0:1)};for(;0<h;)try{f=g[0<n?"previousSibling":"nextSibling"],f.nodeType==CKEDITOR.NODE_TEXT&&(h-=f.nodeValue.length,
q=f),g=f}catch(x){return{container:d,offset:a(g)}}return{container:q,offset:0<n?-h:q.nodeValue.length+h}};return function(){var a=this.getNative(),c=a&&a.createRange(),d=this.getType();if(!a)return[];if(d==CKEDITOR.SELECTION_TEXT)return a=new CKEDITOR.dom.range(this.root),d=b(c,!0),a.setStart(new CKEDITOR.dom.node(d.container),d.offset),d=b(c),a.setEnd(new CKEDITOR.dom.node(d.container),d.offset),a.endContainer.getPosition(a.startContainer)&CKEDITOR.POSITION_PRECEDING&&a.endOffset<=a.startContainer.getIndex()&&
a.collapse(),[a];if(d==CKEDITOR.SELECTION_ELEMENT){for(var d=[],e=0;e<c.length;e++){for(var g=c.item(e),f=g.parentNode,h=0,a=new CKEDITOR.dom.range(this.root);h<f.childNodes.length&&f.childNodes[h]!=g;h++);a.setStart(new CKEDITOR.dom.node(f),h);a.setEnd(new CKEDITOR.dom.node(f),h+1);d.push(a)}return d}return[]}}():function(){var a=[],b,c=this.getNative();if(!c)return a;for(var d=0;d<c.rangeCount;d++){var e=c.getRangeAt(d);b=new CKEDITOR.dom.range(this.root);b.setStart(new CKEDITOR.dom.node(e.startContainer),
e.startOffset);b.setEnd(new CKEDITOR.dom.node(e.endContainer),e.endOffset);a.push(b)}return a};return function(b){var c=this._.cache,d=c.ranges;d||(c.ranges=d=new CKEDITOR.dom.rangeList(a.call(this)));return b?C(new CKEDITOR.dom.rangeList(d.slice())):d}}(),getStartElement:function(){var a=this._.cache;if(void 0!==a.startElement)return a.startElement;var b;switch(this.getType()){case CKEDITOR.SELECTION_ELEMENT:return this.getSelectedElement();case CKEDITOR.SELECTION_TEXT:var c=this.getRanges()[0];
if(c){if(c.collapsed)b=c.startContainer,b.type!=CKEDITOR.NODE_ELEMENT&&(b=b.getParent());else{for(c.optimize();b=c.startContainer,c.startOffset==(b.getChildCount?b.getChildCount():b.getLength())&&!b.isBlockBoundary();)c.setStartAfter(b);b=c.startContainer;if(b.type!=CKEDITOR.NODE_ELEMENT)return b.getParent();if((b=b.getChild(c.startOffset))&&b.type==CKEDITOR.NODE_ELEMENT)for(c=b.getFirst();c&&c.type==CKEDITOR.NODE_ELEMENT;)b=c,c=c.getFirst();else b=c.startContainer}b=b.$}}return a.startElement=b?
new CKEDITOR.dom.element(b):null},getSelectedElement:function(){var a=this._.cache;if(void 0!==a.selectedElement)return a.selectedElement;var b=this,c=CKEDITOR.tools.tryThese(function(){return b.getNative().createRange().item(0)},function(){for(var a=b.getRanges()[0].clone(),c,d,e=2;e&&!((c=a.getEnclosedNode())&&c.type==CKEDITOR.NODE_ELEMENT&&B[c.getName()]&&(d=c));e--)a.shrink(CKEDITOR.SHRINK_ELEMENT);return d&&d.$});return a.selectedElement=c?new CKEDITOR.dom.element(c):null},getSelectedText:function(){var a=
this._.cache;if(void 0!==a.selectedText)return a.selectedText;var b=this.getNative(),b=w?"Control"==b.type?"":b.createRange().text:b.toString();return a.selectedText=b},lock:function(){this.getRanges();this.getStartElement();this.getSelectedElement();this.getSelectedText();this._.cache.nativeSel=null;this.isLocked=1},unlock:function(b){if(this.isLocked){if(b)var d=this.getSelectedElement(),e=this.getRanges(),g=this.isFake;this.isLocked=0;this.reset();b&&(b=d||e[0]&&e[0].getCommonAncestor())&&b.getAscendant("body",
1)&&(a(e)?c.call(this,e):g?this.fake(d):d?this.selectElement(d):this.selectRanges(e))}},reset:function(){this._.cache={};this.isFake=0;var a=this.root.editor;if(a&&a._.fakeSelection)if(this.rev==a._.fakeSelection.rev){delete a._.fakeSelection;var b=a._.hiddenSelectionContainer;if(b){var c=a.checkDirty();a.fire("lockSnapshot");b.remove();a.fire("unlockSnapshot");!c&&a.resetDirty()}delete a._.hiddenSelectionContainer}else CKEDITOR.warn("selection-fake-reset");this.rev=q++},selectElement:function(a){var b=
new CKEDITOR.dom.range(this.root);b.setStartBefore(a);b.setEndAfter(a);this.selectRanges([b])},selectRanges:function(b){var d=this.root.editor,e=d&&d._.hiddenSelectionContainer;this.reset();if(e)for(var e=this.root,f,k=0;k<b.length;++k)f=b[k],f.endContainer.equals(e)&&(f.endOffset=Math.min(f.endOffset,e.getChildCount()));if(b.length)if(this.isLocked){var m=CKEDITOR.document.getActive();this.unlock();this.selectRanges(b);this.lock();m&&!m.equals(this.root)&&m.focus()}else{var n;a:{var D,q;if(1==b.length&&
!(q=b[0]).collapsed&&(n=q.getEnclosedNode())&&n.type==CKEDITOR.NODE_ELEMENT&&(q=q.clone(),q.shrink(CKEDITOR.SHRINK_ELEMENT,!0),(D=q.getEnclosedNode())&&D.type==CKEDITOR.NODE_ELEMENT&&(n=D),"false"==n.getAttribute("contenteditable")))break a;n=void 0}if(n)this.fake(n);else if(d&&d.plugins.tableselection&&CKEDITOR.plugins.tableselection.isSupportedEnvironment&&a(b)&&!A)c.call(this,b);else{if(w){D=CKEDITOR.dom.walker.whitespaces(!0);n=/\ufeff|\u00a0/;q={table:1,tbody:1,tr:1};1<b.length&&(d=b[b.length-
1],b[0].setEnd(d.endContainer,d.endOffset));d=b[0];b=d.collapsed;var x,r,p;if((e=d.getEnclosedNode())&&e.type==CKEDITOR.NODE_ELEMENT&&e.getName()in B&&(!e.is("a")||!e.getText()))try{p=e.$.createControlRange();p.addElement(e.$);p.select();return}catch(v){}if(d.startContainer.type==CKEDITOR.NODE_ELEMENT&&d.startContainer.getName()in q||d.endContainer.type==CKEDITOR.NODE_ELEMENT&&d.endContainer.getName()in q)d.shrink(CKEDITOR.NODE_ELEMENT,!0),b=d.collapsed;p=d.createBookmark();q=p.startNode;b||(m=p.endNode);
p=d.document.$.body.createTextRange();p.moveToElementText(q.$);p.moveStart("character",1);m?(n=d.document.$.body.createTextRange(),n.moveToElementText(m.$),p.setEndPoint("EndToEnd",n),p.moveEnd("character",-1)):(x=q.getNext(D),r=q.hasAscendant("pre"),x=!(x&&x.getText&&x.getText().match(n))&&(r||!q.hasPrevious()||q.getPrevious().is&&q.getPrevious().is("br")),r=d.document.createElement("span"),r.setHtml("\x26#65279;"),r.insertBefore(q),x&&d.document.createText("﻿").insertBefore(q));d.setStartBefore(q);
q.remove();b?(x?(p.moveStart("character",-1),p.select(),d.document.$.selection.clear()):p.select(),d.moveToPosition(r,CKEDITOR.POSITION_BEFORE_START),r.remove()):(d.setEndBefore(m),m.remove(),p.select())}else{m=this.getNative();if(!m)return;this.removeAllRanges();for(p=0;p<b.length;p++){if(p<b.length-1&&(x=b[p],r=b[p+1],n=x.clone(),n.setStart(x.endContainer,x.endOffset),n.setEnd(r.startContainer,r.startOffset),!n.collapsed&&(n.shrink(CKEDITOR.NODE_ELEMENT,!0),d=n.getCommonAncestor(),n=n.getEnclosedNode(),
d.isReadOnly()||n&&n.isReadOnly()))){r.setStart(x.startContainer,x.startOffset);b.splice(p--,1);continue}d=b[p];r=this.document.$.createRange();d.collapsed&&CKEDITOR.env.webkit&&h(d)&&(n=l(this.root),d.insertNode(n),(x=n.getNext())&&!n.getPrevious()&&x.type==CKEDITOR.NODE_ELEMENT&&"br"==x.getName()?(g(this.root),d.moveToPosition(x,CKEDITOR.POSITION_BEFORE_START)):d.moveToPosition(n,CKEDITOR.POSITION_AFTER_END));r.setStart(d.startContainer.$,d.startOffset);try{r.setEnd(d.endContainer.$,d.endOffset)}catch(y){if(0<=
y.toString().indexOf("NS_ERROR_ILLEGAL_VALUE"))d.collapse(1),r.setEnd(d.endContainer.$,d.endOffset);else throw y;}m.addRange(r)}}this.reset();this.root.fire("selectionchange")}}},fake:function(a,b){var c=this.root.editor;void 0===b&&a.hasAttribute("aria-label")&&(b=a.getAttribute("aria-label"));this.reset();p(c,b);var d=this._.cache,e=new CKEDITOR.dom.range(this.root);e.setStartBefore(a);e.setEndAfter(a);d.ranges=new CKEDITOR.dom.rangeList(e);d.selectedElement=d.startElement=a;d.type=CKEDITOR.SELECTION_ELEMENT;
d.selectedText=d.nativeSel=null;this.isFake=1;this.rev=q++;c._.fakeSelection=this;this.root.fire("selectionchange")},isHidden:function(){var a=this.getCommonAncestor();a&&a.type==CKEDITOR.NODE_TEXT&&(a=a.getParent());return!(!a||!a.data("cke-hidden-sel"))},isInTable:function(b){return a(this.getRanges(),b)},isCollapsed:function(){var a=this.getRanges();return 1===a.length&&a[0].collapsed},createBookmarks:function(a){a=this.getRanges().createBookmarks(a);this.isFake&&(a.isFake=1);return a},createBookmarks2:function(a){a=
this.getRanges().createBookmarks2(a);this.isFake&&(a.isFake=1);return a},selectBookmarks:function(b){for(var c=[],d,e=0;e<b.length;e++){var g=new CKEDITOR.dom.range(this.root);g.moveToBookmark(b[e]);c.push(g)}b.isFake&&(d=a(c)?c[0]._getTableElement():c[0].getEnclosedNode(),d&&d.type==CKEDITOR.NODE_ELEMENT||(CKEDITOR.warn("selection-not-fake"),b.isFake=0));b.isFake&&!a(c)?this.fake(d):this.selectRanges(c);return this},getCommonAncestor:function(){var a=this.getRanges();return a.length?a[0].startContainer.getCommonAncestor(a[a.length-
1].endContainer):null},scrollIntoView:function(){this.type!=CKEDITOR.SELECTION_NONE&&this.getRanges()[0].scrollIntoView()},removeAllRanges:function(){if(this.getType()!=CKEDITOR.SELECTION_NONE){var a=this.getNative();try{a&&a[w?"empty":"removeAllRanges"]()}catch(b){}this.reset()}}}}(),"use strict",CKEDITOR.STYLE_BLOCK=1,CKEDITOR.STYLE_INLINE=2,CKEDITOR.STYLE_OBJECT=3,function(){function a(a,b){for(var c,d;(a=a.getParent())&&!a.equals(b);)if(a.getAttribute("data-nostyle"))c=a;else if(!d){var e=a.getAttribute("contentEditable");
"false"==e?c=a:"true"==e&&(d=1)}return c}function f(a,b,c,d){return(a.getPosition(b)|d)==d&&(!c.childRule||c.childRule(a))}function b(c){var d=c.document;if(c.collapsed)d=x(this,d),c.insertNode(d),c.moveToPosition(d,CKEDITOR.POSITION_BEFORE_END);else{var g=this.element,h=this._.definition,l,k=h.ignoreReadonly,m=k||h.includeReadonly;null==m&&(m=c.root.getCustomData("cke_includeReadonly"));var n=CKEDITOR.dtd[g];n||(l=!0,n=CKEDITOR.dtd.span);c.enlarge(CKEDITOR.ENLARGE_INLINE,1);c.trim();var q=c.createBookmark(),
r=q.startNode,p=q.endNode,v=r,y;if(!k){var t=c.getCommonAncestor(),k=a(r,t),t=a(p,t);k&&(v=k.getNextSourceNode(!0));t&&(p=t)}for(v.getPosition(p)==CKEDITOR.POSITION_FOLLOWING&&(v=0);v;){k=!1;if(v.equals(p))v=null,k=!0;else{var A=v.type==CKEDITOR.NODE_ELEMENT?v.getName():null,t=A&&"false"==v.getAttribute("contentEditable"),w=A&&v.getAttribute("data-nostyle");if(A&&v.data("cke-bookmark")){v=v.getNextSourceNode(!0);continue}if(t&&m&&CKEDITOR.dtd.$block[A])for(var u=v,z=e(u),B=void 0,H=z.length,da=0,
u=H&&new CKEDITOR.dom.range(u.getDocument());da<H;++da){var B=z[da],G=CKEDITOR.filter.instances[B.data("cke-filter")];if(G?G.check(this):1)u.selectNodeContents(B),b.call(this,u)}z=A?!n[A]||w?0:t&&!m?0:f(v,p,h,K):1;if(z)if(B=v.getParent(),z=h,H=g,da=l,!B||!(B.getDtd()||CKEDITOR.dtd.span)[H]&&!da||z.parentRule&&!z.parentRule(B))k=!0;else{if(y||A&&CKEDITOR.dtd.$removeEmpty[A]&&(v.getPosition(p)|K)!=K||(y=c.clone(),y.setStartBefore(v)),A=v.type,A==CKEDITOR.NODE_TEXT||t||A==CKEDITOR.NODE_ELEMENT&&!v.getChildCount()){for(var A=
v,F;(k=!A.getNext(I))&&(F=A.getParent(),n[F.getName()])&&f(F,r,h,J);)A=F;y.setEndAfter(A)}}else k=!0;v=v.getNextSourceNode(w||t)}if(k&&y&&!y.collapsed){for(var k=x(this,d),t=k.hasAttributes(),w=y.getCommonAncestor(),A={},z={},B={},H={},ea,E,ha;k&&w;){if(w.getName()==g){for(ea in h.attributes)!H[ea]&&(ha=w.getAttribute(E))&&(k.getAttribute(ea)==ha?z[ea]=1:H[ea]=1);for(E in h.styles)!B[E]&&(ha=w.getStyle(E))&&(k.getStyle(E)==ha?A[E]=1:B[E]=1)}w=w.getParent()}for(ea in z)k.removeAttribute(ea);for(E in A)k.removeStyle(E);
t&&!k.hasAttributes()&&(k=null);k?(y.extractContents().appendTo(k),y.insertNode(k),C.call(this,k),k.mergeSiblings(),CKEDITOR.env.ie||k.$.normalize()):(k=new CKEDITOR.dom.element("span"),y.extractContents().appendTo(k),y.insertNode(k),C.call(this,k),k.remove(!0));y=null}}c.moveToBookmark(q);c.shrink(CKEDITOR.SHRINK_TEXT);c.shrink(CKEDITOR.NODE_ELEMENT,!0)}}function c(a){function b(){for(var a=new CKEDITOR.dom.elementPath(d.getParent()),c=new CKEDITOR.dom.elementPath(m.getParent()),e=null,g=null,f=
0;f<a.elements.length;f++){var h=a.elements[f];if(h==a.block||h==a.blockLimit)break;n.checkElementRemovable(h,!0)&&(e=h)}for(f=0;f<c.elements.length;f++){h=c.elements[f];if(h==c.block||h==c.blockLimit)break;n.checkElementRemovable(h,!0)&&(g=h)}g&&m.breakParent(g);e&&d.breakParent(e)}a.enlarge(CKEDITOR.ENLARGE_INLINE,1);var c=a.createBookmark(),d=c.startNode,e=this._.definition.alwaysRemoveElement;if(a.collapsed){for(var g=new CKEDITOR.dom.elementPath(d.getParent(),a.root),f,h=0,l;h<g.elements.length&&
(l=g.elements[h])&&l!=g.block&&l!=g.blockLimit;h++)if(this.checkElementRemovable(l)){var k;!e&&a.collapsed&&(a.checkBoundaryOfElement(l,CKEDITOR.END)||(k=a.checkBoundaryOfElement(l,CKEDITOR.START)))?(f=l,f.match=k?"start":"end"):(l.mergeSiblings(),l.is(this.element)?u.call(this,l):w(l,t(this)[l.getName()]))}if(f){e=d;for(h=0;;h++){l=g.elements[h];if(l.equals(f))break;else if(l.match)continue;else l=l.clone();l.append(e);e=l}e["start"==f.match?"insertBefore":"insertAfter"](f)}}else{var m=c.endNode,
n=this;b();for(g=d;!g.equals(m);)f=g.getNextSourceNode(),g.type==CKEDITOR.NODE_ELEMENT&&this.checkElementRemovable(g)&&(g.getName()==this.element?u.call(this,g):w(g,t(this)[g.getName()]),f.type==CKEDITOR.NODE_ELEMENT&&f.contains(d)&&(b(),f=d.getNext())),g=f}a.moveToBookmark(c);a.shrink(CKEDITOR.NODE_ELEMENT,!0)}function e(a){var b=[];a.forEach(function(a){if("true"==a.getAttribute("contenteditable"))return b.push(a),!1},CKEDITOR.NODE_ELEMENT,!0);return b}function m(a){var b=a.getEnclosedNode()||a.getCommonAncestor(!1,
!0);(a=(new CKEDITOR.dom.elementPath(b,a.root)).contains(this.element,1))&&!a.isReadOnly()&&r(a,this)}function k(a){var b=a.getCommonAncestor(!0,!0);if(a=(new CKEDITOR.dom.elementPath(b,a.root)).contains(this.element,1)){var b=this._.definition,c=b.attributes;if(c)for(var d in c)a.removeAttribute(d,c[d]);if(b.styles)for(var e in b.styles)b.styles.hasOwnProperty(e)&&a.removeStyle(e)}}function d(a){var b=a.createBookmark(!0),c=a.createIterator();c.enforceRealBlocks=!0;this._.enterMode&&(c.enlargeBr=
this._.enterMode!=CKEDITOR.ENTER_BR);for(var d,e=a.document,g;d=c.getNextParagraph();)!d.isReadOnly()&&(c.activeFilter?c.activeFilter.check(this):1)&&(g=x(this,e,d),l(d,g));a.moveToBookmark(b)}function h(a){var b=a.createBookmark(1),c=a.createIterator();c.enforceRealBlocks=!0;c.enlargeBr=this._.enterMode!=CKEDITOR.ENTER_BR;for(var d,e;d=c.getNextParagraph();)this.checkElementRemovable(d)&&(d.is("pre")?((e=this._.enterMode==CKEDITOR.ENTER_BR?null:a.document.createElement(this._.enterMode==CKEDITOR.ENTER_P?
"p":"div"))&&d.copyAttributes(e),l(d,e)):u.call(this,d));a.moveToBookmark(b)}function l(a,b){var c=!b;c&&(b=a.getDocument().createElement("div"),a.copyAttributes(b));var d=b&&b.is("pre"),e=a.is("pre"),f=!d&&e;if(d&&!e){e=b;(f=a.getBogus())&&f.remove();f=a.getHtml();f=n(f,/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g,"");f=f.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi,"$1");f=f.replace(/([ \t\n\r]+|&nbsp;)/g," ");f=f.replace(/<br\b[^>]*>/gi,"\n");if(CKEDITOR.env.ie){var h=a.getDocument().createElement("div");
h.append(e);e.$.outerHTML="\x3cpre\x3e"+f+"\x3c/pre\x3e";e.copyAttributes(h.getFirst());e=h.getFirst().remove()}else e.setHtml(f);b=e}else f?b=p(c?[a.getHtml()]:g(a),b):a.moveChildren(b);b.replace(a);if(d){var c=b,l;(l=c.getPrevious(F))&&l.type==CKEDITOR.NODE_ELEMENT&&l.is("pre")&&(d=n(l.getHtml(),/\n$/,"")+"\n\n"+n(c.getHtml(),/^\n/,""),CKEDITOR.env.ie?c.$.outerHTML="\x3cpre\x3e"+d+"\x3c/pre\x3e":c.setHtml(d),l.remove())}else c&&q(b)}function g(a){var b=[];n(a.getOuterHtml(),/(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi,
function(a,b,c){return b+"\x3c/pre\x3e"+c+"\x3cpre\x3e"}).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi,function(a,c){b.push(c)});return b}function n(a,b,c){var d="",e="";a=a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi,function(a,b,c){b&&(d=b);c&&(e=c);return""});return d+a.replace(b,c)+e}function p(a,b){var c;1<a.length&&(c=new CKEDITOR.dom.documentFragment(b.getDocument()));for(var d=0;d<a.length;d++){var e=a[d],e=e.replace(/(\r\n|\r)/g,"\n"),e=n(e,/^[ \t]*\n/,
""),e=n(e,/\n$/,""),e=n(e,/^[ \t]+|[ \t]+$/g,function(a,b){return 1==a.length?"\x26nbsp;":b?" "+CKEDITOR.tools.repeat("\x26nbsp;",a.length-1):CKEDITOR.tools.repeat("\x26nbsp;",a.length-1)+" "}),e=e.replace(/\n/g,"\x3cbr\x3e"),e=e.replace(/[ \t]{2,}/g,function(a){return CKEDITOR.tools.repeat("\x26nbsp;",a.length-1)+" "});if(c){var g=b.clone();g.setHtml(e);c.append(g)}else b.setHtml(e)}return c||b}function u(a,b){var c=this._.definition,d=c.attributes,c=c.styles,e=t(this)[a.getName()],g=CKEDITOR.tools.isEmpty(d)&&
CKEDITOR.tools.isEmpty(c),f;for(f in d)if("class"!=f&&!this._.definition.fullMatch||a.getAttribute(f)==y(f,d[f]))b&&"data-"==f.slice(0,5)||(g=a.hasAttribute(f),a.removeAttribute(f));for(var h in c)this._.definition.fullMatch&&a.getStyle(h)!=y(h,c[h],!0)||(g=g||!!a.getStyle(h),a.removeStyle(h));w(a,e,B[a.getName()]);g&&(this._.definition.alwaysRemoveElement?q(a,1):!CKEDITOR.dtd.$block[a.getName()]||this._.enterMode==CKEDITOR.ENTER_BR&&!a.hasAttributes()?q(a):a.renameNode(this._.enterMode==CKEDITOR.ENTER_P?
"p":"div"))}function C(a){for(var b=t(this),c=a.getElementsByTag(this.element),d,e=c.count();0<=--e;)d=c.getItem(e),d.isReadOnly()||u.call(this,d,!0);for(var g in b)if(g!=this.element)for(c=a.getElementsByTag(g),e=c.count()-1;0<=e;e--)d=c.getItem(e),d.isReadOnly()||w(d,b[g])}function w(a,b,c){if(b=b&&b.attributes)for(var d=0;d<b.length;d++){var e=b[d][0],g;if(g=a.getAttribute(e)){var f=b[d][1];(null===f||f.test&&f.test(g)||"string"==typeof f&&g==f)&&a.removeAttribute(e)}}c||q(a)}function q(a,b){if(!a.hasAttributes()||
b)if(CKEDITOR.dtd.$block[a.getName()]){var c=a.getPrevious(F),d=a.getNext(F);!c||c.type!=CKEDITOR.NODE_TEXT&&c.isBlockBoundary({br:1})||a.append("br",1);!d||d.type!=CKEDITOR.NODE_TEXT&&d.isBlockBoundary({br:1})||a.append("br");a.remove(!0)}else c=a.getFirst(),d=a.getLast(),a.remove(!0),c&&(c.type==CKEDITOR.NODE_ELEMENT&&c.mergeSiblings(),d&&!c.equals(d)&&d.type==CKEDITOR.NODE_ELEMENT&&d.mergeSiblings())}function x(a,b,c){var d;d=a.element;"*"==d&&(d="span");d=new CKEDITOR.dom.element(d,b);c&&c.copyAttributes(d);
d=r(d,a);b.getCustomData("doc_processing_style")&&d.hasAttribute("id")?d.removeAttribute("id"):b.setCustomData("doc_processing_style",1);return d}function r(a,b){var c=b._.definition,d=c.attributes,c=CKEDITOR.style.getStyleText(c);if(d)for(var e in d)a.setAttribute(e,d[e]);c&&a.setAttribute("style",c);return a}function A(a,b){for(var c in a)a[c]=a[c].replace(E,function(a,c){return b[c]})}function t(a){if(a._.overrides)return a._.overrides;var b=a._.overrides={},c=a._.definition.overrides;if(c){CKEDITOR.tools.isArray(c)||
(c=[c]);for(var d=0;d<c.length;d++){var e=c[d],g,f;"string"==typeof e?g=e.toLowerCase():(g=e.element?e.element.toLowerCase():a.element,f=e.attributes);e=b[g]||(b[g]={});if(f){var e=e.attributes=e.attributes||[],h;for(h in f)e.push([h.toLowerCase(),f[h]])}}}return b}function y(a,b,c){var d=new CKEDITOR.dom.element("span");d[c?"setStyle":"setAttribute"](a,b);return d[c?"getStyle":"getAttribute"](a)}function v(a,b){function c(a,b){return"font-family"==b.toLowerCase()?a.replace(/["']/g,""):a}"string"==
typeof a&&(a=CKEDITOR.tools.parseCssText(a));"string"==typeof b&&(b=CKEDITOR.tools.parseCssText(b,!0));for(var d in a)if(!(d in b)||c(b[d],d)!=c(a[d],d)&&"inherit"!=a[d]&&"inherit"!=b[d])return!1;return!0}function z(a,b,c){var d=a.document,e=a.getRanges();b=b?this.removeFromRange:this.applyToRange;var g,f;if(a.isFake&&a.isInTable())for(g=[],f=0;f<e.length;f++)g.push(e[f].clone());for(var h=e.createIterator();f=h.getNextRange();)b.call(this,f,c);a.selectRanges(g||e);d.removeCustomData("doc_processing_style")}
var B={address:1,div:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,p:1,pre:1,section:1,header:1,footer:1,nav:1,article:1,aside:1,figure:1,dialog:1,hgroup:1,time:1,meter:1,menu:1,command:1,keygen:1,output:1,progress:1,details:1,datagrid:1,datalist:1},H={a:1,blockquote:1,embed:1,hr:1,img:1,li:1,object:1,ol:1,table:1,td:1,tr:1,th:1,ul:1,dl:1,dt:1,dd:1,form:1,audio:1,video:1},G=/\s*(?:;\s*|$)/,E=/#\((.+?)\)/g,I=CKEDITOR.dom.walker.bookmark(0,1),F=CKEDITOR.dom.walker.whitespaces(1);CKEDITOR.style=function(a,b){if("string"==
typeof a.type)return new CKEDITOR.style.customHandlers[a.type](a);var c=a.attributes;c&&c.style&&(a.styles=CKEDITOR.tools.extend({},a.styles,CKEDITOR.tools.parseCssText(c.style)),delete c.style);b&&(a=CKEDITOR.tools.clone(a),A(a.attributes,b),A(a.styles,b));c=this.element=a.element?"string"==typeof a.element?a.element.toLowerCase():a.element:"*";this.type=a.type||(B[c]?CKEDITOR.STYLE_BLOCK:H[c]?CKEDITOR.STYLE_OBJECT:CKEDITOR.STYLE_INLINE);"object"==typeof this.element&&(this.type=CKEDITOR.STYLE_OBJECT);
this._={definition:a}};CKEDITOR.style.prototype={apply:function(a){if(a instanceof CKEDITOR.dom.document)return z.call(this,a.getSelection());if(this.checkApplicable(a.elementPath(),a)){var b=this._.enterMode;b||(this._.enterMode=a.activeEnterMode);z.call(this,a.getSelection(),0,a);this._.enterMode=b}},remove:function(a){if(a instanceof CKEDITOR.dom.document)return z.call(this,a.getSelection(),1);if(this.checkApplicable(a.elementPath(),a)){var b=this._.enterMode;b||(this._.enterMode=a.activeEnterMode);
z.call(this,a.getSelection(),1,a);this._.enterMode=b}},applyToRange:function(a){this.applyToRange=this.type==CKEDITOR.STYLE_INLINE?b:this.type==CKEDITOR.STYLE_BLOCK?d:this.type==CKEDITOR.STYLE_OBJECT?m:null;return this.applyToRange(a)},removeFromRange:function(a){this.removeFromRange=this.type==CKEDITOR.STYLE_INLINE?c:this.type==CKEDITOR.STYLE_BLOCK?h:this.type==CKEDITOR.STYLE_OBJECT?k:null;return this.removeFromRange(a)},applyToObject:function(a){r(a,this)},checkActive:function(a,b){switch(this.type){case CKEDITOR.STYLE_BLOCK:return this.checkElementRemovable(a.block||
a.blockLimit,!0,b);case CKEDITOR.STYLE_OBJECT:case CKEDITOR.STYLE_INLINE:for(var c=a.elements,d=0,e;d<c.length;d++)if(e=c[d],this.type!=CKEDITOR.STYLE_INLINE||e!=a.block&&e!=a.blockLimit){if(this.type==CKEDITOR.STYLE_OBJECT){var g=e.getName();if(!("string"==typeof this.element?g==this.element:g in this.element))continue}if(this.checkElementRemovable(e,!0,b))return!0}}return!1},checkApplicable:function(a,b,c){b&&b instanceof CKEDITOR.filter&&(c=b);if(c&&!c.check(this))return!1;switch(this.type){case CKEDITOR.STYLE_OBJECT:return!!a.contains(this.element);
case CKEDITOR.STYLE_BLOCK:return!!a.blockLimit.getDtd()[this.element]}return!0},checkElementMatch:function(a,b){var c=this._.definition;if(!a||!c.ignoreReadonly&&a.isReadOnly())return!1;var d=a.getName();if("string"==typeof this.element?d==this.element:d in this.element){if(!b&&!a.hasAttributes())return!0;if(d=c._AC)c=d;else{var d={},e=0,g=c.attributes;if(g)for(var f in g)e++,d[f]=g[f];if(f=CKEDITOR.style.getStyleText(c))d.style||e++,d.style=f;d._length=e;c=c._AC=d}if(c._length){for(var h in c)if("_length"!=
h)if(d=a.getAttribute(h)||"","style"==h?v(c[h],d):c[h]==d){if(!b)return!0}else if(b)return!1;if(b)return!0}else return!0}return!1},checkElementRemovable:function(a,b,c){if(this.checkElementMatch(a,b,c))return!0;if(b=t(this)[a.getName()]){var d;if(!(b=b.attributes))return!0;for(c=0;c<b.length;c++)if(d=b[c][0],d=a.getAttribute(d)){var e=b[c][1];if(null===e)return!0;if("string"==typeof e){if(d==e)return!0}else if(e.test(d))return!0}}return!1},buildPreview:function(a){var b=this._.definition,c=[],d=b.element;
"bdo"==d&&(d="span");var c=["\x3c",d],e=b.attributes;if(e)for(var g in e)c.push(" ",g,'\x3d"',e[g],'"');(e=CKEDITOR.style.getStyleText(b))&&c.push(' style\x3d"',e,'"');c.push("\x3e",a||b.name,"\x3c/",d,"\x3e");return c.join("")},getDefinition:function(){return this._.definition}};CKEDITOR.style.getStyleText=function(a){var b=a._ST;if(b)return b;var b=a.styles,c=a.attributes&&a.attributes.style||"",d="";c.length&&(c=c.replace(G,";"));for(var e in b){var g=b[e],f=(e+":"+g).replace(G,";");"inherit"==
g?d+=f:c+=f}c.length&&(c=CKEDITOR.tools.normalizeCssText(c,!0));return a._ST=c+d};CKEDITOR.style.customHandlers={};CKEDITOR.style.addCustomHandler=function(a){var b=function(a){this._={definition:a};this.setup&&this.setup(a)};b.prototype=CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.style.prototype),{assignedTo:CKEDITOR.STYLE_OBJECT},a,!0);return this.customHandlers[a.type]=b};var K=CKEDITOR.POSITION_PRECEDING|CKEDITOR.POSITION_IDENTICAL|CKEDITOR.POSITION_IS_CONTAINED,J=CKEDITOR.POSITION_FOLLOWING|
CKEDITOR.POSITION_IDENTICAL|CKEDITOR.POSITION_IS_CONTAINED}(),CKEDITOR.styleCommand=function(a,f){this.requiredContent=this.allowedContent=this.style=a;CKEDITOR.tools.extend(this,f,!0)},CKEDITOR.styleCommand.prototype.exec=function(a){a.focus();this.state==CKEDITOR.TRISTATE_OFF?a.applyStyle(this.style):this.state==CKEDITOR.TRISTATE_ON&&a.removeStyle(this.style)},CKEDITOR.stylesSet=new CKEDITOR.resourceManager("","stylesSet"),CKEDITOR.addStylesSet=CKEDITOR.tools.bind(CKEDITOR.stylesSet.add,CKEDITOR.stylesSet),
CKEDITOR.loadStylesSet=function(a,f,b){CKEDITOR.stylesSet.addExternal(a,f,"");CKEDITOR.stylesSet.load(a,b)},CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{attachStyleStateChange:function(a,f){var b=this._.styleStateChangeCallbacks;b||(b=this._.styleStateChangeCallbacks=[],this.on("selectionChange",function(a){for(var e=0;e<b.length;e++){var f=b[e],k=f.style.checkActive(a.data.path,this)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF;f.fn.call(this,k)}}));b.push({style:a,fn:f})},applyStyle:function(a){a.apply(this)},
removeStyle:function(a){a.remove(this)},getStylesSet:function(a){if(this._.stylesDefinitions)a(this._.stylesDefinitions);else{var f=this,b=f.config.stylesCombo_stylesSet||f.config.stylesSet;if(!1===b)a(null);else if(b instanceof Array)f._.stylesDefinitions=b,a(b);else{b||(b="default");var b=b.split(":"),c=b[0];CKEDITOR.stylesSet.addExternal(c,b[1]?b.slice(1).join(":"):CKEDITOR.getUrl("styles.js"),"");CKEDITOR.stylesSet.load(c,function(b){f._.stylesDefinitions=b[c];a(f._.stylesDefinitions)})}}}}),
CKEDITOR.dom.comment=function(a,f){"string"==typeof a&&(a=(f?f.$:document).createComment(a));CKEDITOR.dom.domObject.call(this,a)},CKEDITOR.dom.comment.prototype=new CKEDITOR.dom.node,CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype,{type:CKEDITOR.NODE_COMMENT,getOuterHtml:function(){return"\x3c!--"+this.$.nodeValue+"--\x3e"}}),"use strict",function(){var a={},f={},b;for(b in CKEDITOR.dtd.$blockLimit)b in CKEDITOR.dtd.$list||(a[b]=1);for(b in CKEDITOR.dtd.$block)b in CKEDITOR.dtd.$blockLimit||
b in CKEDITOR.dtd.$empty||(f[b]=1);CKEDITOR.dom.elementPath=function(b,e){var m=null,k=null,d=[],h=b,l;e=e||b.getDocument().getBody();h||(h=e);do if(h.type==CKEDITOR.NODE_ELEMENT){d.push(h);if(!this.lastElement&&(this.lastElement=h,h.is(CKEDITOR.dtd.$object)||"false"==h.getAttribute("contenteditable")))continue;if(h.equals(e))break;if(!k&&(l=h.getName(),"true"==h.getAttribute("contenteditable")?k=h:!m&&f[l]&&(m=h),a[l])){if(l=!m&&"div"==l){a:{l=h.getChildren();for(var g=0,n=l.count();g<n;g++){var p=
l.getItem(g);if(p.type==CKEDITOR.NODE_ELEMENT&&CKEDITOR.dtd.$block[p.getName()]){l=!0;break a}}l=!1}l=!l}l?m=h:k=h}}while(h=h.getParent());k||(k=e);this.block=m;this.blockLimit=k;this.root=e;this.elements=d}}(),CKEDITOR.dom.elementPath.prototype={compare:function(a){var f=this.elements;a=a&&a.elements;if(!a||f.length!=a.length)return!1;for(var b=0;b<f.length;b++)if(!f[b].equals(a[b]))return!1;return!0},contains:function(a,f,b){var c=0,e;"string"==typeof a&&(e=function(b){return b.getName()==a});a instanceof
CKEDITOR.dom.element?e=function(b){return b.equals(a)}:CKEDITOR.tools.isArray(a)?e=function(b){return-1<CKEDITOR.tools.indexOf(a,b.getName())}:"function"==typeof a?e=a:"object"==typeof a&&(e=function(b){return b.getName()in a});var m=this.elements,k=m.length;f&&(b?c+=1:--k);b&&(m=Array.prototype.slice.call(m,0),m.reverse());for(;c<k;c++)if(e(m[c]))return m[c];return null},isContextFor:function(a){var f;return a in CKEDITOR.dtd.$block?(f=this.contains(CKEDITOR.dtd.$intermediate)||this.root.equals(this.block)&&
this.block||this.blockLimit,!!f.getDtd()[a]):!0},direction:function(){return(this.block||this.blockLimit||this.root).getDirection(1)}},CKEDITOR.dom.text=function(a,f){"string"==typeof a&&(a=(f?f.$:document).createTextNode(a));this.$=a},CKEDITOR.dom.text.prototype=new CKEDITOR.dom.node,CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype,{type:CKEDITOR.NODE_TEXT,getLength:function(){return this.$.nodeValue.length},getText:function(){return this.$.nodeValue},setText:function(a){this.$.nodeValue=a},split:function(a){var f=
this.$.parentNode,b=f.childNodes.length,c=this.getLength(),e=this.getDocument(),m=new CKEDITOR.dom.text(this.$.splitText(a),e);f.childNodes.length==b&&(a>=c?(m=e.createText(""),m.insertAfter(this)):(a=e.createText(""),a.insertAfter(m),a.remove()));return m},substring:function(a,f){return"number"!=typeof f?this.$.nodeValue.substr(a):this.$.nodeValue.substring(a,f)}}),function(){function a(a,c,e){var f=a.serializable,k=c[e?"endContainer":"startContainer"],d=e?"endOffset":"startOffset",h=f?c.document.getById(a.startNode):
a.startNode;a=f?c.document.getById(a.endNode):a.endNode;k.equals(h.getPrevious())?(c.startOffset=c.startOffset-k.getLength()-a.getPrevious().getLength(),k=a.getNext()):k.equals(a.getPrevious())&&(c.startOffset-=k.getLength(),k=a.getNext());k.equals(h.getParent())&&c[d]++;k.equals(a.getParent())&&c[d]++;c[e?"endContainer":"startContainer"]=k;return c}CKEDITOR.dom.rangeList=function(a){if(a instanceof CKEDITOR.dom.rangeList)return a;a?a instanceof CKEDITOR.dom.range&&(a=[a]):a=[];return CKEDITOR.tools.extend(a,
f)};var f={createIterator:function(){var a=this,c=CKEDITOR.dom.walker.bookmark(),e=[],f;return{getNextRange:function(k){f=void 0===f?0:f+1;var d=a[f];if(d&&1<a.length){if(!f)for(var h=a.length-1;0<=h;h--)e.unshift(a[h].createBookmark(!0));if(k)for(var l=0;a[f+l+1];){var g=d.document;k=0;h=g.getById(e[l].endNode);for(g=g.getById(e[l+1].startNode);;){h=h.getNextSourceNode(!1);if(g.equals(h))k=1;else if(c(h)||h.type==CKEDITOR.NODE_ELEMENT&&h.isBlockBoundary())continue;break}if(!k)break;l++}for(d.moveToBookmark(e.shift());l--;)h=
a[++f],h.moveToBookmark(e.shift()),d.setEnd(h.endContainer,h.endOffset)}return d}}},createBookmarks:function(b){for(var c=[],e,f=0;f<this.length;f++){c.push(e=this[f].createBookmark(b,!0));for(var k=f+1;k<this.length;k++)this[k]=a(e,this[k]),this[k]=a(e,this[k],!0)}return c},createBookmarks2:function(a){for(var c=[],e=0;e<this.length;e++)c.push(this[e].createBookmark2(a));return c},moveToBookmarks:function(a){for(var c=0;c<this.length;c++)this[c].moveToBookmark(a[c])}}}(),function(){function a(){return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1]||
"skins/"+CKEDITOR.skinName.split(",")[0]+"/")}function f(b){var c=CKEDITOR.skin["ua_"+b],d=CKEDITOR.env;if(c)for(var c=c.split(",").sort(function(a,b){return a>b?-1:1}),e=0,f;e<c.length;e++)if(f=c[e],d.ie&&(f.replace(/^ie/,"")==d.version||d.quirks&&"iequirks"==f)&&(f="ie"),d[f]){b+="_"+c[e];break}return CKEDITOR.getUrl(a()+b+".css")}function b(a,b){m[a]||(CKEDITOR.document.appendStyleSheet(f(a)),m[a]=1);b&&b()}function c(a){var b=a.getById(k);b||(b=a.getHead().append("style"),b.setAttribute("id",
k),b.setAttribute("type","text/css"));return b}function e(a,b,c){var d,e,f;if(CKEDITOR.env.webkit)for(b=b.split("}").slice(0,-1),e=0;e<b.length;e++)b[e]=b[e].split("{");for(var h=0;h<a.length;h++)if(CKEDITOR.env.webkit)for(e=0;e<b.length;e++){f=b[e][1];for(d=0;d<c.length;d++)f=f.replace(c[d][0],c[d][1]);a[h].$.sheet.addRule(b[e][0],f)}else{f=b;for(d=0;d<c.length;d++)f=f.replace(c[d][0],c[d][1]);CKEDITOR.env.ie&&11>CKEDITOR.env.version?a[h].$.styleSheet.cssText+=f:a[h].$.innerHTML+=f}}var m={};CKEDITOR.skin=
{path:a,loadPart:function(c,d){CKEDITOR.skin.name!=CKEDITOR.skinName.split(",")[0]?CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(a()+"skin.js"),function(){b(c,d)}):b(c,d)},getPath:function(a){return CKEDITOR.getUrl(f(a))},icons:{},addIcon:function(a,b,c,d){a=a.toLowerCase();this.icons[a]||(this.icons[a]={path:b,offset:c||0,bgsize:d||"16px"})},getIconStyle:function(a,b,c,d,e){var f;a&&(a=a.toLowerCase(),b&&(f=this.icons[a+"-rtl"]),f||(f=this.icons[a]));a=c||f&&f.path||"";d=d||f&&f.offset;e=e||f&&f.bgsize||
"16px";a&&(a=a.replace(/'/g,"\\'"));return a&&"background-image:url('"+CKEDITOR.getUrl(a)+"');background-position:0 "+d+"px;background-size:"+e+";"}};CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{getUiColor:function(){return this.uiColor},setUiColor:function(a){var b=c(CKEDITOR.document);return(this.setUiColor=function(a){this.uiColor=a;var c=CKEDITOR.skin.chameleon,f="",l="";"function"==typeof c&&(f=c(this,"editor"),l=c(this,"panel"));a=[[h,a]];e([b],f,a);e(d,l,a)}).call(this,a)}});var k="cke_ui_color",
d=[],h=/\$color/g;CKEDITOR.on("instanceLoaded",function(a){if(!CKEDITOR.env.ie||!CKEDITOR.env.quirks){var b=a.editor;a=function(a){a=(a.data[0]||a.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument();if(!a.getById("cke_ui_color")){a=c(a);d.push(a);var f=b.getUiColor();f&&e([a],CKEDITOR.skin.chameleon(b,"panel"),[[h,f]])}};b.on("panelShow",a);b.on("menuShow",a);b.config.uiColor&&b.setUiColor(b.config.uiColor)}})}(),function(){if(CKEDITOR.env.webkit)CKEDITOR.env.hc=!1;else{var a=CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"width:0;height:0;position:absolute;left:-10000px;border:1px solid;border-color:red blue"\x3e\x3c/div\x3e',
CKEDITOR.document);a.appendTo(CKEDITOR.document.getHead());try{var f=a.getComputedStyle("border-top-color"),b=a.getComputedStyle("border-right-color");CKEDITOR.env.hc=!(!f||f!=b)}catch(c){CKEDITOR.env.hc=!1}a.remove()}CKEDITOR.env.hc&&(CKEDITOR.env.cssClass+=" cke_hc");CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}");CKEDITOR.status="loaded";CKEDITOR.fireOnce("loaded");if(a=CKEDITOR._.pending)for(delete CKEDITOR._.pending,f=0;f<a.length;f++)CKEDITOR.editor.prototype.constructor.apply(a[f][0],
a[f][1]),CKEDITOR.add(a[f][0])}(),CKEDITOR.skin.name="moono-lisa",CKEDITOR.skin.ua_editor="ie,iequirks,ie8,gecko",CKEDITOR.skin.ua_dialog="ie,iequirks,ie8",CKEDITOR.skin.chameleon=function(){var a=function(){return function(a,c){for(var e=a.match(/[^#]./g),f=0;3>f;f++){var k=f,d;d=parseInt(e[f],16);d=("0"+(0>c?0|d*(1+c):0|d+(255-d)*c).toString(16)).slice(-2);e[k]=d}return"#"+e.join("")}}(),f={editor:new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_bottom [background-color:{defaultBackground};border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [background-color:{defaultBackground};outline-color:{defaultBorder};] {id} .cke_dialog_tab [background-color:{dialogTab};border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [background-color:{lightBackground};] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} a.cke_button_off:hover,{id} a.cke_button_off:focus,{id} a.cke_button_off:active [background-color:{darkBackground};border-color:{toolbarElementsBorder};] {id} .cke_button_on [background-color:{ckeButtonOn};border-color:{toolbarElementsBorder};] {id} .cke_toolbar_separator,{id} .cke_toolgroup a.cke_button:last-child:after,{id} .cke_toolgroup a.cke_button.cke_button_disabled:hover:last-child:after [background-color: {toolbarElementsBorder};border-color: {toolbarElementsBorder};] {id} a.cke_combo_button:hover,{id} a.cke_combo_button:focus,{id} .cke_combo_on a.cke_combo_button [border-color:{toolbarElementsBorder};background-color:{darkBackground};] {id} .cke_combo:after [border-color:{toolbarElementsBorder};] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover,{id} a.cke_path_item:focus,{id} a.cke_path_item:active [background-color:{darkBackground};] {id}.cke_panel [border-color:{defaultBorder};] "),
panel:new CKEDITOR.template(".cke_panel_grouptitle [background-color:{lightBackground};border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover,.cke_menubutton:focus,.cke_menubutton:active [background-color:{menubuttonHover};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menubutton_disabled:hover .cke_menubutton_icon,.cke_menubutton_disabled:focus .cke_menubutton_icon,.cke_menubutton_disabled:active .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ")};
return function(b,c){var e=a(b.uiColor,.4),e={id:"."+b.id,defaultBorder:a(e,-.2),toolbarElementsBorder:a(e,-.25),defaultBackground:e,lightBackground:a(e,.8),darkBackground:a(e,-.15),ckeButtonOn:a(e,.4),ckeResizer:a(e,-.4),ckeColorauto:a(e,.8),dialogBody:a(e,.7),dialogTab:a(e,.65),dialogTabSelected:"#FFF",dialogTabSelectedBorder:"#FFF",elementsPathColor:a(e,-.6),menubuttonHover:a(e,.1),menubuttonIcon:a(e,.5),menubuttonIconHover:a(e,.3)};return f[c].output(e).replace(/\[/g,"{").replace(/\]/g,"}")}}(),
CKEDITOR.plugins.add("dialogui",{onLoad:function(){var a=function(a){this._||(this._={});this._["default"]=this._.initValue=a["default"]||"";this._.required=a.required||!1;for(var b=[this._],c=1;c<arguments.length;c++)b.push(arguments[c]);b.push(!0);CKEDITOR.tools.extend.apply(CKEDITOR.tools,b);return this._},f={build:function(a,b,c){return new CKEDITOR.ui.dialog.textInput(a,b,c)}},b={build:function(a,b,c){return new CKEDITOR.ui.dialog[b.type](a,b,c)}},c={isChanged:function(){return this.getValue()!=
this.getInitValue()},reset:function(a){this.setValue(this.getInitValue(),a)},setInitValue:function(){this._.initValue=this.getValue()},resetInitValue:function(){this._.initValue=this._["default"]},getInitValue:function(){return this._.initValue}},e=CKEDITOR.tools.extend({},CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors,{onChange:function(a,b){this._.domOnChangeRegistered||(a.on("load",function(){this.getInputElement().on("change",function(){a.parts.dialog.isVisible()&&this.fire("change",{value:this.getValue()})},
this)},this),this._.domOnChangeRegistered=!0);this.on("change",b)}},!0),m=/^on([A-Z]\w+)/,k=function(a){for(var b in a)(m.test(b)||"title"==b||"type"==b)&&delete a[b];return a},d=function(a){a=a.data.getKeystroke();a==CKEDITOR.SHIFT+CKEDITOR.ALT+36?this.setDirectionMarker("ltr"):a==CKEDITOR.SHIFT+CKEDITOR.ALT+35&&this.setDirectionMarker("rtl")};CKEDITOR.tools.extend(CKEDITOR.ui.dialog,{labeledElement:function(b,c,d,e){if(!(4>arguments.length)){var f=a.call(this,c);f.labelId=CKEDITOR.tools.getNextId()+
"_label";this._.children=[];var k={role:c.role||"presentation"};c.includeLabel&&(k["aria-labelledby"]=f.labelId);CKEDITOR.ui.dialog.uiElement.call(this,b,c,d,"div",null,k,function(){var a=[],d=c.required?" cke_required":"";"horizontal"!=c.labelLayout?a.push('\x3clabel class\x3d"cke_dialog_ui_labeled_label'+d+'" ',' id\x3d"'+f.labelId+'"',f.inputId?' for\x3d"'+f.inputId+'"':"",(c.labelStyle?' style\x3d"'+c.labelStyle+'"':"")+"\x3e",c.label,"\x3c/label\x3e",'\x3cdiv class\x3d"cke_dialog_ui_labeled_content"',
c.controlStyle?' style\x3d"'+c.controlStyle+'"':"",' role\x3d"presentation"\x3e',e.call(this,b,c),"\x3c/div\x3e"):(d={type:"hbox",widths:c.widths,padding:0,children:[{type:"html",html:'\x3clabel class\x3d"cke_dialog_ui_labeled_label'+d+'" id\x3d"'+f.labelId+'" for\x3d"'+f.inputId+'"'+(c.labelStyle?' style\x3d"'+c.labelStyle+'"':"")+"\x3e"+CKEDITOR.tools.htmlEncode(c.label)+"\x3c/label\x3e"},{type:"html",html:'\x3cspan class\x3d"cke_dialog_ui_labeled_content"'+(c.controlStyle?' style\x3d"'+c.controlStyle+
'"':"")+"\x3e"+e.call(this,b,c)+"\x3c/span\x3e"}]},CKEDITOR.dialog._.uiElementBuilders.hbox.build(b,d,a));return a.join("")})}},textInput:function(b,c,e){if(!(3>arguments.length)){a.call(this,c);var f=this._.inputId=CKEDITOR.tools.getNextId()+"_textInput",k={"class":"cke_dialog_ui_input_"+c.type,id:f,type:c.type};c.validate&&(this.validate=c.validate);c.maxLength&&(k.maxlength=c.maxLength);c.size&&(k.size=c.size);c.inputStyle&&(k.style=c.inputStyle);var m=this,C=!1;b.on("load",function(){m.getInputElement().on("keydown",
function(a){13==a.data.getKeystroke()&&(C=!0)});m.getInputElement().on("keyup",function(a){13==a.data.getKeystroke()&&C&&(b.getButton("ok")&&setTimeout(function(){b.getButton("ok").click()},0),C=!1);m.bidi&&d.call(m,a)},null,null,1E3)});CKEDITOR.ui.dialog.labeledElement.call(this,b,c,e,function(){var a=['\x3cdiv class\x3d"cke_dialog_ui_input_',c.type,'" role\x3d"presentation"'];c.width&&a.push('style\x3d"width:'+c.width+'" ');a.push("\x3e\x3cinput ");k["aria-labelledby"]=this._.labelId;this._.required&&
(k["aria-required"]=this._.required);for(var b in k)a.push(b+'\x3d"'+k[b]+'" ');a.push(" /\x3e\x3c/div\x3e");return a.join("")})}},textarea:function(b,c,e){if(!(3>arguments.length)){a.call(this,c);var f=this,k=this._.inputId=CKEDITOR.tools.getNextId()+"_textarea",m={};c.validate&&(this.validate=c.validate);m.rows=c.rows||5;m.cols=c.cols||20;m["class"]="cke_dialog_ui_input_textarea "+(c["class"]||"");"undefined"!=typeof c.inputStyle&&(m.style=c.inputStyle);c.dir&&(m.dir=c.dir);if(f.bidi)b.on("load",
function(){f.getInputElement().on("keyup",d)},f);CKEDITOR.ui.dialog.labeledElement.call(this,b,c,e,function(){m["aria-labelledby"]=this._.labelId;this._.required&&(m["aria-required"]=this._.required);var a=['\x3cdiv class\x3d"cke_dialog_ui_input_textarea" role\x3d"presentation"\x3e\x3ctextarea id\x3d"',k,'" '],b;for(b in m)a.push(b+'\x3d"'+CKEDITOR.tools.htmlEncode(m[b])+'" ');a.push("\x3e",CKEDITOR.tools.htmlEncode(f._["default"]),"\x3c/textarea\x3e\x3c/div\x3e");return a.join("")})}},checkbox:function(b,
c,d){if(!(3>arguments.length)){var e=a.call(this,c,{"default":!!c["default"]});c.validate&&(this.validate=c.validate);CKEDITOR.ui.dialog.uiElement.call(this,b,c,d,"span",null,null,function(){var a=CKEDITOR.tools.extend({},c,{id:c.id?c.id+"_checkbox":CKEDITOR.tools.getNextId()+"_checkbox"},!0),d=[],f=CKEDITOR.tools.getNextId()+"_label",g={"class":"cke_dialog_ui_checkbox_input",type:"checkbox","aria-labelledby":f};k(a);c["default"]&&(g.checked="checked");"undefined"!=typeof a.inputStyle&&(a.style=a.inputStyle);
e.checkbox=new CKEDITOR.ui.dialog.uiElement(b,a,d,"input",null,g);d.push(' \x3clabel id\x3d"',f,'" for\x3d"',g.id,'"'+(c.labelStyle?' style\x3d"'+c.labelStyle+'"':"")+"\x3e",CKEDITOR.tools.htmlEncode(c.label),"\x3c/label\x3e");return d.join("")})}},radio:function(b,c,d){if(!(3>arguments.length)){a.call(this,c);this._["default"]||(this._["default"]=this._.initValue=c.items[0][1]);c.validate&&(this.validate=c.validate);var e=[],f=this;c.role="radiogroup";c.includeLabel=!0;CKEDITOR.ui.dialog.labeledElement.call(this,
b,c,d,function(){for(var a=[],d=[],g=(c.id?c.id:CKEDITOR.tools.getNextId())+"_radio",m=0;m<c.items.length;m++){var x=c.items[m],r=void 0!==x[2]?x[2]:x[0],A=void 0!==x[1]?x[1]:x[0],t=CKEDITOR.tools.getNextId()+"_radio_input",y=t+"_label",t=CKEDITOR.tools.extend({},c,{id:t,title:null,type:null},!0),r=CKEDITOR.tools.extend({},t,{title:r},!0),v={type:"radio","class":"cke_dialog_ui_radio_input",name:g,value:A,"aria-labelledby":y},z=[];f._["default"]==A&&(v.checked="checked");k(t);k(r);"undefined"!=typeof t.inputStyle&&
(t.style=t.inputStyle);t.keyboardFocusable=!0;e.push(new CKEDITOR.ui.dialog.uiElement(b,t,z,"input",null,v));z.push(" ");new CKEDITOR.ui.dialog.uiElement(b,r,z,"label",null,{id:y,"for":v.id},x[0]);a.push(z.join(""))}new CKEDITOR.ui.dialog.hbox(b,e,a,d);return d.join("")});this._.children=e}},button:function(b,c,d){if(arguments.length){"function"==typeof c&&(c=c(b.getParentEditor()));a.call(this,c,{disabled:c.disabled||!1});CKEDITOR.event.implementOn(this);var e=this;b.on("load",function(){var a=this.getElement();
(function(){a.on("click",function(a){e.click();a.data.preventDefault()});a.on("keydown",function(a){a.data.getKeystroke()in{32:1}&&(e.click(),a.data.preventDefault())})})();a.unselectable()},this);var f=CKEDITOR.tools.extend({},c);delete f.style;var k=CKEDITOR.tools.getNextId()+"_label";CKEDITOR.ui.dialog.uiElement.call(this,b,f,d,"a",null,{style:c.style,href:"javascript:void(0)",title:c.label,hidefocus:"true","class":c["class"],role:"button","aria-labelledby":k},'\x3cspan id\x3d"'+k+'" class\x3d"cke_dialog_ui_button"\x3e'+
CKEDITOR.tools.htmlEncode(c.label)+"\x3c/span\x3e")}},select:function(b,c,d){if(!(3>arguments.length)){var e=a.call(this,c);c.validate&&(this.validate=c.validate);e.inputId=CKEDITOR.tools.getNextId()+"_select";CKEDITOR.ui.dialog.labeledElement.call(this,b,c,d,function(){var a=CKEDITOR.tools.extend({},c,{id:c.id?c.id+"_select":CKEDITOR.tools.getNextId()+"_select"},!0),d=[],f=[],g={id:e.inputId,"class":"cke_dialog_ui_input_select","aria-labelledby":this._.labelId};d.push('\x3cdiv class\x3d"cke_dialog_ui_input_',
c.type,'" role\x3d"presentation"');c.width&&d.push('style\x3d"width:'+c.width+'" ');d.push("\x3e");void 0!==c.size&&(g.size=c.size);void 0!==c.multiple&&(g.multiple=c.multiple);k(a);for(var m=0,x;m<c.items.length&&(x=c.items[m]);m++)f.push('\x3coption value\x3d"',CKEDITOR.tools.htmlEncode(void 0!==x[1]?x[1]:x[0]).replace(/"/g,"\x26quot;"),'" /\x3e ',CKEDITOR.tools.htmlEncode(x[0]));"undefined"!=typeof a.inputStyle&&(a.style=a.inputStyle);e.select=new CKEDITOR.ui.dialog.uiElement(b,a,d,"select",null,
g,f.join(""));d.push("\x3c/div\x3e");return d.join("")})}},file:function(b,c,d){if(!(3>arguments.length)){void 0===c["default"]&&(c["default"]="");var e=CKEDITOR.tools.extend(a.call(this,c),{definition:c,buttons:[]});c.validate&&(this.validate=c.validate);b.on("load",function(){CKEDITOR.document.getById(e.frameId).getParent().addClass("cke_dialog_ui_input_file")});CKEDITOR.ui.dialog.labeledElement.call(this,b,c,d,function(){e.frameId=CKEDITOR.tools.getNextId()+"_fileInput";var a=['\x3ciframe frameborder\x3d"0" allowtransparency\x3d"0" class\x3d"cke_dialog_ui_input_file" role\x3d"presentation" id\x3d"',
e.frameId,'" title\x3d"',c.label,'" src\x3d"javascript:void('];a.push(CKEDITOR.env.ie?"(function(){"+encodeURIComponent("document.open();("+CKEDITOR.tools.fixDomain+")();document.close();")+"})()":"0");a.push(')"\x3e\x3c/iframe\x3e');return a.join("")})}},fileButton:function(b,c,d){var e=this;if(!(3>arguments.length)){a.call(this,c);c.validate&&(this.validate=c.validate);var f=CKEDITOR.tools.extend({},c),k=f.onClick;f.className=(f.className?f.className+" ":"")+"cke_dialog_ui_button";f.onClick=function(a){var d=
c["for"];k&&!1===k.call(this,a)||(b.getContentElement(d[0],d[1]).submit(),this.disable())};b.on("load",function(){b.getContentElement(c["for"][0],c["for"][1])._.buttons.push(e)});CKEDITOR.ui.dialog.button.call(this,b,f,d)}},html:function(){var a=/^\s*<[\w:]+\s+([^>]*)?>/,b=/^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/,c=/\/$/;return function(d,e,f){if(!(3>arguments.length)){var k=[],m=e.html;"\x3c"!=m.charAt(0)&&(m="\x3cspan\x3e"+m+"\x3c/span\x3e");var q=e.focus;if(q){var x=this.focus;this.focus=function(){("function"==
typeof q?q:x).call(this);this.fire("focus")};e.isFocusable&&(this.isFocusable=this.isFocusable);this.keyboardFocusable=!0}CKEDITOR.ui.dialog.uiElement.call(this,d,e,k,"span",null,null,"");k=k.join("").match(a);m=m.match(b)||["","",""];c.test(m[1])&&(m[1]=m[1].slice(0,-1),m[2]="/"+m[2]);f.push([m[1]," ",k[1]||"",m[2]].join(""))}}}(),fieldset:function(a,b,c,d,e){var f=e.label;this._={children:b};CKEDITOR.ui.dialog.uiElement.call(this,a,e,d,"fieldset",null,null,function(){var a=[];f&&a.push("\x3clegend"+
(e.labelStyle?' style\x3d"'+e.labelStyle+'"':"")+"\x3e"+f+"\x3c/legend\x3e");for(var b=0;b<c.length;b++)a.push(c[b]);return a.join("")})}},!0);CKEDITOR.ui.dialog.html.prototype=new CKEDITOR.ui.dialog.uiElement;CKEDITOR.ui.dialog.labeledElement.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,{setLabel:function(a){var b=CKEDITOR.document.getById(this._.labelId);1>b.getChildCount()?(new CKEDITOR.dom.text(a,CKEDITOR.document)).appendTo(b):b.getChild(0).$.nodeValue=a;return this},getLabel:function(){var a=
CKEDITOR.document.getById(this._.labelId);return!a||1>a.getChildCount()?"":a.getChild(0).getText()},eventProcessors:e},!0);CKEDITOR.ui.dialog.button.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,{click:function(){return this._.disabled?!1:this.fire("click",{dialog:this._.dialog})},enable:function(){this._.disabled=!1;var a=this.getElement();a&&a.removeClass("cke_disabled")},disable:function(){this._.disabled=!0;this.getElement().addClass("cke_disabled")},isVisible:function(){return this.getElement().getFirst().isVisible()},
isEnabled:function(){return!this._.disabled},eventProcessors:CKEDITOR.tools.extend({},CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors,{onClick:function(a,b){this.on("click",function(){b.apply(this,arguments)})}},!0),accessKeyUp:function(){this.click()},accessKeyDown:function(){this.focus()},keyboardFocusable:!0},!0);CKEDITOR.ui.dialog.textInput.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement,{getInputElement:function(){return CKEDITOR.document.getById(this._.inputId)},
focus:function(){var a=this.selectParentTab();setTimeout(function(){var b=a.getInputElement();b&&b.$.focus()},0)},select:function(){var a=this.selectParentTab();setTimeout(function(){var b=a.getInputElement();b&&(b.$.focus(),b.$.select())},0)},accessKeyUp:function(){this.select()},setValue:function(a){if(this.bidi){var b=a&&a.charAt(0);(b="‪"==b?"ltr":"‫"==b?"rtl":null)&&(a=a.slice(1));this.setDirectionMarker(b)}a||(a="");return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this,arguments)},
getValue:function(){var a=CKEDITOR.ui.dialog.uiElement.prototype.getValue.call(this);if(this.bidi&&a){var b=this.getDirectionMarker();b&&(a=("ltr"==b?"‪":"‫")+a)}return a},setDirectionMarker:function(a){var b=this.getInputElement();a?b.setAttributes({dir:a,"data-cke-dir-marker":a}):this.getDirectionMarker()&&b.removeAttributes(["dir","data-cke-dir-marker"])},getDirectionMarker:function(){return this.getInputElement().data("cke-dir-marker")},keyboardFocusable:!0},c,!0);CKEDITOR.ui.dialog.textarea.prototype=
new CKEDITOR.ui.dialog.textInput;CKEDITOR.ui.dialog.select.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement,{getInputElement:function(){return this._.select.getElement()},add:function(a,b,c){var d=new CKEDITOR.dom.element("option",this.getDialog().getParentEditor().document),e=this.getInputElement().$;d.$.text=a;d.$.value=void 0===b||null===b?a:b;void 0===c||null===c?CKEDITOR.env.ie?e.add(d.$):e.add(d.$,null):e.add(d.$,c);return this},remove:function(a){this.getInputElement().$.remove(a);
return this},clear:function(){for(var a=this.getInputElement().$;0<a.length;)a.remove(0);return this},keyboardFocusable:!0},c,!0);CKEDITOR.ui.dialog.checkbox.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,{getInputElement:function(){return this._.checkbox.getElement()},setValue:function(a,b){this.getInputElement().$.checked=a;!b&&this.fire("change",{value:a})},getValue:function(){return this.getInputElement().$.checked},accessKeyUp:function(){this.setValue(!this.getValue())},eventProcessors:{onChange:function(a,
b){if(!CKEDITOR.env.ie||8<CKEDITOR.env.version)return e.onChange.apply(this,arguments);a.on("load",function(){var a=this._.checkbox.getElement();a.on("propertychange",function(b){b=b.data.$;"checked"==b.propertyName&&this.fire("change",{value:a.$.checked})},this)},this);this.on("change",b);return null}},keyboardFocusable:!0},c,!0);CKEDITOR.ui.dialog.radio.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,{setValue:function(a,b){for(var c=this._.children,d,e=0;e<c.length&&(d=c[e]);e++)d.getElement().$.checked=
d.getValue()==a;!b&&this.fire("change",{value:a})},getValue:function(){for(var a=this._.children,b=0;b<a.length;b++)if(a[b].getElement().$.checked)return a[b].getValue();return null},accessKeyUp:function(){var a=this._.children,b;for(b=0;b<a.length;b++)if(a[b].getElement().$.checked){a[b].getElement().focus();return}a[0].getElement().focus()},eventProcessors:{onChange:function(a,b){if(!CKEDITOR.env.ie||8<CKEDITOR.env.version)return e.onChange.apply(this,arguments);a.on("load",function(){for(var a=
this._.children,b=this,c=0;c<a.length;c++)a[c].getElement().on("propertychange",function(a){a=a.data.$;"checked"==a.propertyName&&this.$.checked&&b.fire("change",{value:this.getAttribute("value")})})},this);this.on("change",b);return null}}},c,!0);CKEDITOR.ui.dialog.file.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement,c,{getInputElement:function(){var a=CKEDITOR.document.getById(this._.frameId).getFrameDocument();return 0<a.$.forms.length?new CKEDITOR.dom.element(a.$.forms[0].elements[0]):
this.getElement()},submit:function(){this.getInputElement().getParent().$.submit();return this},getAction:function(){return this.getInputElement().getParent().$.action},registerEvents:function(a){var b=/^on([A-Z]\w+)/,c,d=function(a,b,c,d){a.on("formLoaded",function(){a.getInputElement().on(c,d,a)})},e;for(e in a)if(c=e.match(b))this.eventProcessors[e]?this.eventProcessors[e].call(this,this._.dialog,a[e]):d(this,this._.dialog,c[1].toLowerCase(),a[e]);return this},reset:function(){function a(){c.$.open();
var h="";d.size&&(h=d.size-(CKEDITOR.env.ie?7:0));var r=b.frameId+"_input";c.$.write(['\x3chtml dir\x3d"'+m+'" lang\x3d"'+q+'"\x3e\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e\x3cbody style\x3d"margin: 0; overflow: hidden; background: transparent;"\x3e','\x3cform enctype\x3d"multipart/form-data" method\x3d"POST" dir\x3d"'+m+'" lang\x3d"'+q+'" action\x3d"',CKEDITOR.tools.htmlEncode(d.action),'"\x3e\x3clabel id\x3d"',b.labelId,'" for\x3d"',r,'" style\x3d"display:none"\x3e',CKEDITOR.tools.htmlEncode(d.label),
'\x3c/label\x3e\x3cinput style\x3d"width:100%" id\x3d"',r,'" aria-labelledby\x3d"',b.labelId,'" type\x3d"file" name\x3d"',CKEDITOR.tools.htmlEncode(d.id||"cke_upload"),'" size\x3d"',CKEDITOR.tools.htmlEncode(0<h?h:""),'" /\x3e\x3c/form\x3e\x3c/body\x3e\x3c/html\x3e\x3cscript\x3e',CKEDITOR.env.ie?"("+CKEDITOR.tools.fixDomain+")();":"","window.parent.CKEDITOR.tools.callFunction("+f+");","window.onbeforeunload \x3d function() {window.parent.CKEDITOR.tools.callFunction("+k+")}","\x3c/script\x3e"].join(""));
c.$.close();for(h=0;h<e.length;h++)e[h].enable()}var b=this._,c=CKEDITOR.document.getById(b.frameId).getFrameDocument(),d=b.definition,e=b.buttons,f=this.formLoadedNumber,k=this.formUnloadNumber,m=b.dialog._.editor.lang.dir,q=b.dialog._.editor.langCode;f||(f=this.formLoadedNumber=CKEDITOR.tools.addFunction(function(){this.fire("formLoaded")},this),k=this.formUnloadNumber=CKEDITOR.tools.addFunction(function(){this.getInputElement().clearCustomData()},this),this.getDialog()._.editor.on("destroy",function(){CKEDITOR.tools.removeFunction(f);
CKEDITOR.tools.removeFunction(k)}));CKEDITOR.env.gecko?setTimeout(a,500):a()},getValue:function(){return this.getInputElement().$.value||""},setInitValue:function(){this._.initValue=""},eventProcessors:{onChange:function(a,b){this._.domOnChangeRegistered||(this.on("formLoaded",function(){this.getInputElement().on("change",function(){this.fire("change",{value:this.getValue()})},this)},this),this._.domOnChangeRegistered=!0);this.on("change",b)}},keyboardFocusable:!0},!0);CKEDITOR.ui.dialog.fileButton.prototype=
new CKEDITOR.ui.dialog.button;CKEDITOR.ui.dialog.fieldset.prototype=CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype);CKEDITOR.dialog.addUIElement("text",f);CKEDITOR.dialog.addUIElement("password",f);CKEDITOR.dialog.addUIElement("textarea",b);CKEDITOR.dialog.addUIElement("checkbox",b);CKEDITOR.dialog.addUIElement("radio",b);CKEDITOR.dialog.addUIElement("button",b);CKEDITOR.dialog.addUIElement("select",b);CKEDITOR.dialog.addUIElement("file",b);CKEDITOR.dialog.addUIElement("fileButton",b);CKEDITOR.dialog.addUIElement("html",
b);CKEDITOR.dialog.addUIElement("fieldset",{build:function(a,b,c){for(var d=b.children,e,f=[],k=[],m=0;m<d.length&&(e=d[m]);m++){var q=[];f.push(q);k.push(CKEDITOR.dialog._.uiElementBuilders[e.type].build(a,e,q))}return new CKEDITOR.ui.dialog[b.type](a,k,f,c,b)}})}}),CKEDITOR.DIALOG_RESIZE_NONE=0,CKEDITOR.DIALOG_RESIZE_WIDTH=1,CKEDITOR.DIALOG_RESIZE_HEIGHT=2,CKEDITOR.DIALOG_RESIZE_BOTH=3,CKEDITOR.DIALOG_STATE_IDLE=1,CKEDITOR.DIALOG_STATE_BUSY=2,function(){function a(){for(var a=this._.tabIdList.length,
b=CKEDITOR.tools.indexOf(this._.tabIdList,this._.currentTabId)+a,c=b-1;c>b-a;c--)if(this._.tabs[this._.tabIdList[c%a]][0].$.offsetHeight)return this._.tabIdList[c%a];return null}function f(){for(var a=this._.tabIdList.length,b=CKEDITOR.tools.indexOf(this._.tabIdList,this._.currentTabId),c=b+1;c<b+a;c++)if(this._.tabs[this._.tabIdList[c%a]][0].$.offsetHeight)return this._.tabIdList[c%a];return null}function b(a,b){for(var c=a.$.getElementsByTagName("input"),d=0,e=c.length;d<e;d++){var f=new CKEDITOR.dom.element(c[d]);
"text"==f.getAttribute("type").toLowerCase()&&(b?(f.setAttribute("value",f.getCustomData("fake_value")||""),f.removeCustomData("fake_value")):(f.setCustomData("fake_value",f.getAttribute("value")),f.setAttribute("value","")))}}function c(a,b){var c=this.getInputElement();c&&(a?c.removeAttribute("aria-invalid"):c.setAttribute("aria-invalid",!0));a||(this.select?this.select():this.focus());b&&alert(b);this.fire("validated",{valid:a,msg:b})}function e(){var a=this.getInputElement();a&&a.removeAttribute("aria-invalid")}
function m(a){var b=CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog",w).output({id:CKEDITOR.tools.getNextNumber(),editorId:a.id,langDir:a.lang.dir,langCode:a.langCode,editorDialogClass:"cke_editor_"+a.name.replace(/\./g,"\\.")+"_dialog",closeTitle:a.lang.common.close,hidpi:CKEDITOR.env.hidpi?"cke_hidpi":""})),c=b.getChild([0,0,0,0,0]),d=c.getChild(0),e=c.getChild(1);a.plugins.clipboard&&CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(c);!CKEDITOR.env.ie||CKEDITOR.env.quirks||
CKEDITOR.env.edge||(a="javascript:void(function(){"+encodeURIComponent("document.open();("+CKEDITOR.tools.fixDomain+")();document.close();")+"}())",CKEDITOR.dom.element.createFromHtml('\x3ciframe frameBorder\x3d"0" class\x3d"cke_iframe_shim" src\x3d"'+a+'" tabIndex\x3d"-1"\x3e\x3c/iframe\x3e').appendTo(c.getParent()));d.unselectable();e.unselectable();return{element:b,parts:{dialog:b.getChild(0),title:d,close:e,tabs:c.getChild(2),contents:c.getChild([3,0,0,0]),footer:c.getChild([3,0,1,0])}}}function k(a,
b,c){this.element=b;this.focusIndex=c;this.tabIndex=0;this.isFocusable=function(){return!b.getAttribute("disabled")&&b.isVisible()};this.focus=function(){a._.currentFocusIndex=this.focusIndex;this.element.focus()};b.on("keydown",function(a){a.data.getKeystroke()in{32:1,13:1}&&this.fire("click")});b.on("focus",function(){this.fire("mouseover")});b.on("blur",function(){this.fire("mouseout")})}function d(a){function b(){a.layout()}var c=CKEDITOR.document.getWindow();c.on("resize",b);a.on("hide",function(){c.removeListener("resize",
b)})}function h(a,b){this._={dialog:a};CKEDITOR.tools.extend(this,b)}function l(a){function b(c){var k=a.getSize(),l=CKEDITOR.document.getWindow().getViewPaneSize(),m=c.data.$.screenX,n=c.data.$.screenY,q=m-d.x,x=n-d.y;d={x:m,y:n};e.x+=q;e.y+=x;a.move(e.x+h[3]<g?-h[3]:e.x-h[1]>l.width-k.width-g?l.width-k.width+("rtl"==f.lang.dir?0:h[1]):e.x,e.y+h[0]<g?-h[0]:e.y-h[2]>l.height-k.height-g?l.height-k.height+h[2]:e.y,1);c.data.preventDefault()}function c(){CKEDITOR.document.removeListener("mousemove",
b);CKEDITOR.document.removeListener("mouseup",c);if(CKEDITOR.env.ie6Compat){var a=z.getChild(0).getFrameDocument();a.removeListener("mousemove",b);a.removeListener("mouseup",c)}}var d=null,e=null,f=a.getParentEditor(),g=f.config.dialog_magnetDistance,h=CKEDITOR.skin.margins||[0,0,0,0];"undefined"==typeof g&&(g=20);a.parts.title.on("mousedown",function(f){d={x:f.data.$.screenX,y:f.data.$.screenY};CKEDITOR.document.on("mousemove",b);CKEDITOR.document.on("mouseup",c);e=a.getPosition();if(CKEDITOR.env.ie6Compat){var g=
z.getChild(0).getFrameDocument();g.on("mousemove",b);g.on("mouseup",c)}f.data.preventDefault()},a)}function g(a){function b(c){var n="rtl"==f.lang.dir,q=m.width,x=m.height,r=q+(c.data.$.screenX-l.x)*(n?-1:1)*(a._.moved?1:2),v=x+(c.data.$.screenY-l.y)*(a._.moved?1:2),y=a._.element.getFirst(),y=n&&y.getComputedStyle("right"),A=a.getPosition();A.y+v>k.height&&(v=k.height-A.y);(n?y:A.x)+r>k.width&&(r=k.width-(n?y:A.x));if(e==CKEDITOR.DIALOG_RESIZE_WIDTH||e==CKEDITOR.DIALOG_RESIZE_BOTH)q=Math.max(d.minWidth||
0,r-g);if(e==CKEDITOR.DIALOG_RESIZE_HEIGHT||e==CKEDITOR.DIALOG_RESIZE_BOTH)x=Math.max(d.minHeight||0,v-h);a.resize(q,x);a._.moved||a.layout();c.data.preventDefault()}function c(){CKEDITOR.document.removeListener("mouseup",c);CKEDITOR.document.removeListener("mousemove",b);n&&(n.remove(),n=null);if(CKEDITOR.env.ie6Compat){var a=z.getChild(0).getFrameDocument();a.removeListener("mouseup",c);a.removeListener("mousemove",b)}}var d=a.definition,e=d.resizable;if(e!=CKEDITOR.DIALOG_RESIZE_NONE){var f=a.getParentEditor(),
g,h,k,l,m,n,q=CKEDITOR.tools.addFunction(function(d){m=a.getSize();var e=a.parts.contents;e.$.getElementsByTagName("iframe").length&&(n=CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_dialog_resize_cover" style\x3d"height: 100%; position: absolute; width: 100%;"\x3e\x3c/div\x3e'),e.append(n));h=m.height-a.parts.contents.getSize("height",!(CKEDITOR.env.gecko||CKEDITOR.env.ie&&CKEDITOR.env.quirks));g=m.width-a.parts.contents.getSize("width",1);l={x:d.screenX,y:d.screenY};k=CKEDITOR.document.getWindow().getViewPaneSize();
CKEDITOR.document.on("mousemove",b);CKEDITOR.document.on("mouseup",c);CKEDITOR.env.ie6Compat&&(e=z.getChild(0).getFrameDocument(),e.on("mousemove",b),e.on("mouseup",c));d.preventDefault&&d.preventDefault()});a.on("load",function(){var b="";e==CKEDITOR.DIALOG_RESIZE_WIDTH?b=" cke_resizer_horizontal":e==CKEDITOR.DIALOG_RESIZE_HEIGHT&&(b=" cke_resizer_vertical");b=CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_resizer'+b+" cke_resizer_"+f.lang.dir+'" title\x3d"'+CKEDITOR.tools.htmlEncode(f.lang.common.resize)+
'" onmousedown\x3d"CKEDITOR.tools.callFunction('+q+', event )"\x3e'+("ltr"==f.lang.dir?"◢":"◣")+"\x3c/div\x3e");a.parts.footer.append(b,1)});f.on("destroy",function(){CKEDITOR.tools.removeFunction(q)})}}function n(a){a.data.preventDefault(1)}function p(a){var b=CKEDITOR.document.getWindow(),c=a.config,d=CKEDITOR.skinName||a.config.skin,e=c.dialog_backgroundCoverColor||("moono-lisa"==d?"black":"white"),d=c.dialog_backgroundCoverOpacity,f=c.baseFloatZIndex,c=CKEDITOR.tools.genKey(e,d,f),g=v[c];g?g.show():
(f=['\x3cdiv tabIndex\x3d"-1" style\x3d"position: ',CKEDITOR.env.ie6Compat?"absolute":"fixed","; z-index: ",f,"; top: 0px; left: 0px; ",CKEDITOR.env.ie6Compat?"":"background-color: "+e,'" class\x3d"cke_dialog_background_cover"\x3e'],CKEDITOR.env.ie6Compat&&(e="\x3chtml\x3e\x3cbody style\x3d\\'background-color:"+e+";\\'\x3e\x3c/body\x3e\x3c/html\x3e",f.push('\x3ciframe hidefocus\x3d"true" frameborder\x3d"0" id\x3d"cke_dialog_background_iframe" src\x3d"javascript:'),f.push("void((function(){"+encodeURIComponent("document.open();("+
CKEDITOR.tools.fixDomain+")();document.write( '"+e+"' );document.close();")+"})())"),f.push('" style\x3d"position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity\x3d0)"\x3e\x3c/iframe\x3e')),f.push("\x3c/div\x3e"),g=CKEDITOR.dom.element.createFromHtml(f.join("")),g.setOpacity(void 0!==d?d:.5),g.on("keydown",n),g.on("keypress",n),g.on("keyup",n),g.appendTo(CKEDITOR.document.getBody()),v[c]=g);a.focusManager.add(g);z=g;a=function(){var a=b.getViewPaneSize();
g.setStyles({width:a.width+"px",height:a.height+"px"})};var h=function(){var a=b.getScrollPosition(),c=CKEDITOR.dialog._.currentTop;g.setStyles({left:a.x+"px",top:a.y+"px"});if(c){do a=c.getPosition(),c.move(a.x,a.y);while(c=c._.parentDialog)}};y=a;b.on("resize",a);a();CKEDITOR.env.mac&&CKEDITOR.env.webkit||g.focus();if(CKEDITOR.env.ie6Compat){var k=function(){h();arguments.callee.prevScrollHandler.apply(this,arguments)};b.$.setTimeout(function(){k.prevScrollHandler=window.onscroll||function(){};
window.onscroll=k},0);h()}}function u(a){z&&(a.focusManager.remove(z),a=CKEDITOR.document.getWindow(),z.hide(),a.removeListener("resize",y),CKEDITOR.env.ie6Compat&&a.$.setTimeout(function(){window.onscroll=window.onscroll&&window.onscroll.prevScrollHandler||null},0),y=null)}var C=CKEDITOR.tools.cssLength,w='\x3cdiv class\x3d"cke_reset_all {editorId} {editorDialogClass} {hidpi}" dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"dialog" aria-labelledby\x3d"cke_dialog_title_{id}"\x3e\x3ctable class\x3d"cke_dialog '+
CKEDITOR.env.cssClass+' cke_{langDir}" style\x3d"position:absolute" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd role\x3d"presentation"\x3e\x3cdiv class\x3d"cke_dialog_body" role\x3d"presentation"\x3e\x3cdiv id\x3d"cke_dialog_title_{id}" class\x3d"cke_dialog_title" role\x3d"presentation"\x3e\x3c/div\x3e\x3ca id\x3d"cke_dialog_close_button_{id}" class\x3d"cke_dialog_close_button" href\x3d"javascript:void(0)" title\x3d"{closeTitle}" role\x3d"button"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e\x3cdiv id\x3d"cke_dialog_tabs_{id}" class\x3d"cke_dialog_tabs" role\x3d"tablist"\x3e\x3c/div\x3e\x3ctable class\x3d"cke_dialog_contents" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_contents_{id}" class\x3d"cke_dialog_contents_body" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_footer_{id}" class\x3d"cke_dialog_footer" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e';
CKEDITOR.dialog=function(b,d){function h(){var a=B._.focusList;a.sort(function(a,b){return a.tabIndex!=b.tabIndex?b.tabIndex-a.tabIndex:a.focusIndex-b.focusIndex});for(var b=a.length,c=0;c<b;c++)a[c].focusIndex=c}function k(a){var b=B._.focusList;a=a||0;if(!(1>b.length)){var c=B._.currentFocusIndex;B._.tabBarMode&&0>a&&(c=0);try{b[c].getInputElement().$.blur()}catch(d){}var e=c,f=1<B._.pageCount;do{e+=a;if(f&&!B._.tabBarMode&&(e==b.length||-1==e)){B._.tabBarMode=!0;B._.tabs[B._.currentTabId][0].focus();
B._.currentFocusIndex=-1;return}e=(e+b.length)%b.length;if(e==c)break}while(a&&!b[e].isFocusable());b[e].focus();"text"==b[e].type&&b[e].select()}}function n(c){if(B==CKEDITOR.dialog._.currentTop){var d=c.data.getKeystroke(),e="rtl"==b.lang.dir,g=[37,38,39,40];z=w=0;if(9==d||d==CKEDITOR.SHIFT+9)k(d==CKEDITOR.SHIFT+9?-1:1),z=1;else if(d==CKEDITOR.ALT+121&&!B._.tabBarMode&&1<B.getPageCount())B._.tabBarMode=!0,B._.tabs[B._.currentTabId][0].focus(),B._.currentFocusIndex=-1,z=1;else if(-1!=CKEDITOR.tools.indexOf(g,
d)&&B._.tabBarMode)d=-1!=CKEDITOR.tools.indexOf([e?39:37,38],d)?a.call(B):f.call(B),B.selectPage(d),B._.tabs[d][0].focus(),z=1;else if(13!=d&&32!=d||!B._.tabBarMode)if(13==d)d=c.data.getTarget(),d.is("a","button","select","textarea")||d.is("input")&&"button"==d.$.type||((d=this.getButton("ok"))&&CKEDITOR.tools.setTimeout(d.click,0,d),z=1),w=1;else if(27==d)(d=this.getButton("cancel"))?CKEDITOR.tools.setTimeout(d.click,0,d):!1!==this.fire("cancel",{hide:!0}).hide&&this.hide(),w=1;else return;else this.selectPage(this._.currentTabId),
this._.tabBarMode=!1,this._.currentFocusIndex=-1,k(1),z=1;x(c)}}function x(a){z?a.data.preventDefault(1):w&&a.data.stopPropagation()}var r=CKEDITOR.dialog._.dialogDefinitions[d],v=CKEDITOR.tools.clone(q),y=b.config.dialog_buttonsOrder||"OS",A=b.lang.dir,p={},z,w;("OS"==y&&CKEDITOR.env.mac||"rtl"==y&&"ltr"==A||"ltr"==y&&"rtl"==A)&&v.buttons.reverse();r=CKEDITOR.tools.extend(r(b),v);r=CKEDITOR.tools.clone(r);r=new t(this,r);v=m(b);this._={editor:b,element:v.element,name:d,contentSize:{width:0,height:0},
size:{width:0,height:0},contents:{},buttons:{},accessKeyMap:{},tabs:{},tabIdList:[],currentTabId:null,currentTabIndex:null,pageCount:0,lastTab:null,tabBarMode:!1,focusList:[],currentFocusIndex:0,hasFocus:!1};this.parts=v.parts;CKEDITOR.tools.setTimeout(function(){b.fire("ariaWidget",this.parts.contents)},0,this);v={position:CKEDITOR.env.ie6Compat?"absolute":"fixed",top:0,visibility:"hidden"};v["rtl"==A?"right":"left"]=0;this.parts.dialog.setStyles(v);CKEDITOR.event.call(this);this.definition=r=CKEDITOR.fire("dialogDefinition",
{name:d,definition:r},b).definition;if(!("removeDialogTabs"in b._)&&b.config.removeDialogTabs){v=b.config.removeDialogTabs.split(";");for(A=0;A<v.length;A++)if(y=v[A].split(":"),2==y.length){var C=y[0];p[C]||(p[C]=[]);p[C].push(y[1])}b._.removeDialogTabs=p}if(b._.removeDialogTabs&&(p=b._.removeDialogTabs[d]))for(A=0;A<p.length;A++)r.removeContents(p[A]);if(r.onLoad)this.on("load",r.onLoad);if(r.onShow)this.on("show",r.onShow);if(r.onHide)this.on("hide",r.onHide);if(r.onOk)this.on("ok",function(a){b.fire("saveSnapshot");
setTimeout(function(){b.fire("saveSnapshot")},0);!1===r.onOk.call(this,a)&&(a.data.hide=!1)});this.state=CKEDITOR.DIALOG_STATE_IDLE;if(r.onCancel)this.on("cancel",function(a){!1===r.onCancel.call(this,a)&&(a.data.hide=!1)});var B=this,u=function(a){var b=B._.contents,c=!1,d;for(d in b)for(var e in b[d])if(c=a.call(this,b[d][e]))return};this.on("ok",function(a){u(function(b){if(b.validate){var d=b.validate(this),e="string"==typeof d||!1===d;e&&(a.data.hide=!1,a.stop());c.call(b,!e,"string"==typeof d?
d:void 0);return e}})},this,null,0);this.on("cancel",function(a){u(function(c){if(c.isChanged())return b.config.dialog_noConfirmCancel||confirm(b.lang.common.confirmCancel)||(a.data.hide=!1),!0})},this,null,0);this.parts.close.on("click",function(a){!1!==this.fire("cancel",{hide:!0}).hide&&this.hide();a.data.preventDefault()},this);this.changeFocus=k;var H=this._.element;b.focusManager.add(H,1);this.on("show",function(){H.on("keydown",n,this);if(CKEDITOR.env.gecko)H.on("keypress",x,this)});this.on("hide",
function(){H.removeListener("keydown",n);CKEDITOR.env.gecko&&H.removeListener("keypress",x);u(function(a){e.apply(a)})});this.on("iframeAdded",function(a){(new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document)).on("keydown",n,this,null,0)});this.on("show",function(){h();var a=1<B._.pageCount;b.config.dialog_startupFocusTab&&a?(B._.tabBarMode=!0,B._.tabs[B._.currentTabId][0].focus(),B._.currentFocusIndex=-1):this._.hasFocus||(this._.currentFocusIndex=a?-1:this._.focusList.length-1,r.onFocus?
(a=r.onFocus.call(this))&&a.focus():k(1))},this,null,4294967295);if(CKEDITOR.env.ie6Compat)this.on("load",function(){var a=this.getElement(),b=a.getFirst();b.remove();b.appendTo(a)},this);l(this);g(this);(new CKEDITOR.dom.text(r.title,CKEDITOR.document)).appendTo(this.parts.title);for(A=0;A<r.contents.length;A++)(p=r.contents[A])&&this.addPage(p);this.parts.tabs.on("click",function(a){var b=a.data.getTarget();b.hasClass("cke_dialog_tab")&&(b=b.$.id,this.selectPage(b.substring(4,b.lastIndexOf("_"))),
this._.tabBarMode&&(this._.tabBarMode=!1,this._.currentFocusIndex=-1,k(1)),a.data.preventDefault())},this);A=[];p=CKEDITOR.dialog._.uiElementBuilders.hbox.build(this,{type:"hbox",className:"cke_dialog_footer_buttons",widths:[],children:r.buttons},A).getChild();this.parts.footer.setHtml(A.join(""));for(A=0;A<p.length;A++)this._.buttons[p[A].id]=p[A]};CKEDITOR.dialog.prototype={destroy:function(){this.hide();this._.element.remove()},resize:function(){return function(a,b){this._.contentSize&&this._.contentSize.width==
a&&this._.contentSize.height==b||(CKEDITOR.dialog.fire("resize",{dialog:this,width:a,height:b},this._.editor),this.fire("resize",{width:a,height:b},this._.editor),this.parts.contents.setStyles({width:a+"px",height:b+"px"}),"rtl"==this._.editor.lang.dir&&this._.position&&(this._.position.x=CKEDITOR.document.getWindow().getViewPaneSize().width-this._.contentSize.width-parseInt(this._.element.getFirst().getStyle("right"),10)),this._.contentSize={width:a,height:b})}}(),getSize:function(){var a=this._.element.getFirst();
return{width:a.$.offsetWidth||0,height:a.$.offsetHeight||0}},move:function(a,b,c){var d=this._.element.getFirst(),e="rtl"==this._.editor.lang.dir,f="fixed"==d.getComputedStyle("position");CKEDITOR.env.ie&&d.setStyle("zoom","100%");f&&this._.position&&this._.position.x==a&&this._.position.y==b||(this._.position={x:a,y:b},f||(f=CKEDITOR.document.getWindow().getScrollPosition(),a+=f.x,b+=f.y),e&&(f=this.getSize(),a=CKEDITOR.document.getWindow().getViewPaneSize().width-f.width-a),b={top:(0<b?b:0)+"px"},
b[e?"right":"left"]=(0<a?a:0)+"px",d.setStyles(b),c&&(this._.moved=1))},getPosition:function(){return CKEDITOR.tools.extend({},this._.position)},show:function(){var a=this._.element,b=this.definition;a.getParent()&&a.getParent().equals(CKEDITOR.document.getBody())?a.setStyle("display","block"):a.appendTo(CKEDITOR.document.getBody());this.resize(this._.contentSize&&this._.contentSize.width||b.width||b.minWidth,this._.contentSize&&this._.contentSize.height||b.height||b.minHeight);this.reset();null===
this._.currentTabId&&this.selectPage(this.definition.contents[0].id);null===CKEDITOR.dialog._.currentZIndex&&(CKEDITOR.dialog._.currentZIndex=this._.editor.config.baseFloatZIndex);this._.element.getFirst().setStyle("z-index",CKEDITOR.dialog._.currentZIndex+=10);null===CKEDITOR.dialog._.currentTop?(CKEDITOR.dialog._.currentTop=this,this._.parentDialog=null,p(this._.editor)):(this._.parentDialog=CKEDITOR.dialog._.currentTop,this._.parentDialog.getElement().getFirst().$.style.zIndex-=Math.floor(this._.editor.config.baseFloatZIndex/
2),CKEDITOR.dialog._.currentTop=this);a.on("keydown",H);a.on("keyup",G);this._.hasFocus=!1;for(var c in b.contents)if(b.contents[c]){var a=b.contents[c],e=this._.tabs[a.id],f=a.requiredContent,g=0;if(e){for(var h in this._.contents[a.id]){var k=this._.contents[a.id][h];"hbox"!=k.type&&"vbox"!=k.type&&k.getInputElement()&&(k.requiredContent&&!this._.editor.activeFilter.check(k.requiredContent)?k.disable():(k.enable(),g++))}!g||f&&!this._.editor.activeFilter.check(f)?e[0].addClass("cke_dialog_tab_disabled"):
e[0].removeClass("cke_dialog_tab_disabled")}}CKEDITOR.tools.setTimeout(function(){this.layout();d(this);this.parts.dialog.setStyle("visibility","");this.fireOnce("load",{});CKEDITOR.ui.fire("ready",this);this.fire("show",{});this._.editor.fire("dialogShow",this);this._.parentDialog||this._.editor.focusManager.lock();this.foreach(function(a){a.setInitValue&&a.setInitValue()})},100,this)},layout:function(){var a=this.parts.dialog,b=this.getSize(),c=CKEDITOR.document.getWindow().getViewPaneSize(),d=
(c.width-b.width)/2,e=(c.height-b.height)/2;CKEDITOR.env.ie6Compat||(b.height+(0<e?e:0)>c.height||b.width+(0<d?d:0)>c.width?a.setStyle("position","absolute"):a.setStyle("position","fixed"));this.move(this._.moved?this._.position.x:d,this._.moved?this._.position.y:e)},foreach:function(a){for(var b in this._.contents)for(var c in this._.contents[b])a.call(this,this._.contents[b][c]);return this},reset:function(){var a=function(a){a.reset&&a.reset(1)};return function(){this.foreach(a);return this}}(),
setupContent:function(){var a=arguments;this.foreach(function(b){b.setup&&b.setup.apply(b,a)})},commitContent:function(){var a=arguments;this.foreach(function(b){CKEDITOR.env.ie&&this._.currentFocusIndex==b.focusIndex&&b.getInputElement().$.blur();b.commit&&b.commit.apply(b,a)})},hide:function(){if(this.parts.dialog.isVisible()){this.fire("hide",{});this._.editor.fire("dialogHide",this);this.selectPage(this._.tabIdList[0]);var a=this._.element;a.setStyle("display","none");this.parts.dialog.setStyle("visibility",
"hidden");for(I(this);CKEDITOR.dialog._.currentTop!=this;)CKEDITOR.dialog._.currentTop.hide();if(this._.parentDialog){var b=this._.parentDialog.getElement().getFirst();b.setStyle("z-index",parseInt(b.$.style.zIndex,10)+Math.floor(this._.editor.config.baseFloatZIndex/2))}else u(this._.editor);if(CKEDITOR.dialog._.currentTop=this._.parentDialog)CKEDITOR.dialog._.currentZIndex-=10;else{CKEDITOR.dialog._.currentZIndex=null;a.removeListener("keydown",H);a.removeListener("keyup",G);var c=this._.editor;
c.focus();setTimeout(function(){c.focusManager.unlock();CKEDITOR.env.iOS&&c.window.focus()},0)}delete this._.parentDialog;this.foreach(function(a){a.resetInitValue&&a.resetInitValue()});this.setState(CKEDITOR.DIALOG_STATE_IDLE)}},addPage:function(a){if(!a.requiredContent||this._.editor.filter.check(a.requiredContent)){for(var b=[],c=a.label?' title\x3d"'+CKEDITOR.tools.htmlEncode(a.label)+'"':"",d=CKEDITOR.dialog._.uiElementBuilders.vbox.build(this,{type:"vbox",className:"cke_dialog_page_contents",
children:a.elements,expand:!!a.expand,padding:a.padding,style:a.style||"width: 100%;"},b),e=this._.contents[a.id]={},f=d.getChild(),g=0;d=f.shift();)d.notAllowed||"hbox"==d.type||"vbox"==d.type||g++,e[d.id]=d,"function"==typeof d.getChild&&f.push.apply(f,d.getChild());g||(a.hidden=!0);b=CKEDITOR.dom.element.createFromHtml(b.join(""));b.setAttribute("role","tabpanel");d=CKEDITOR.env;e="cke_"+a.id+"_"+CKEDITOR.tools.getNextNumber();c=CKEDITOR.dom.element.createFromHtml(['\x3ca class\x3d"cke_dialog_tab"',
0<this._.pageCount?" cke_last":"cke_first",c,a.hidden?' style\x3d"display:none"':"",' id\x3d"',e,'"',d.gecko&&!d.hc?"":' href\x3d"javascript:void(0)"',' tabIndex\x3d"-1" hidefocus\x3d"true" role\x3d"tab"\x3e',a.label,"\x3c/a\x3e"].join(""));b.setAttribute("aria-labelledby",e);this._.tabs[a.id]=[c,b];this._.tabIdList.push(a.id);!a.hidden&&this._.pageCount++;this._.lastTab=c;this.updateStyle();b.setAttribute("name",a.id);b.appendTo(this.parts.contents);c.unselectable();this.parts.tabs.append(c);a.accessKey&&
(E(this,this,"CTRL+"+a.accessKey,K,F),this._.accessKeyMap["CTRL+"+a.accessKey]=a.id)}},selectPage:function(a){if(this._.currentTabId!=a&&!this._.tabs[a][0].hasClass("cke_dialog_tab_disabled")&&!1!==this.fire("selectPage",{page:a,currentPage:this._.currentTabId})){for(var c in this._.tabs){var d=this._.tabs[c][0],e=this._.tabs[c][1];c!=a&&(d.removeClass("cke_dialog_tab_selected"),e.hide());e.setAttribute("aria-hidden",c!=a)}var f=this._.tabs[a];f[0].addClass("cke_dialog_tab_selected");CKEDITOR.env.ie6Compat||
CKEDITOR.env.ie7Compat?(b(f[1]),f[1].show(),setTimeout(function(){b(f[1],1)},0)):f[1].show();this._.currentTabId=a;this._.currentTabIndex=CKEDITOR.tools.indexOf(this._.tabIdList,a)}},updateStyle:function(){this.parts.dialog[(1===this._.pageCount?"add":"remove")+"Class"]("cke_single_page")},hidePage:function(b){var c=this._.tabs[b]&&this._.tabs[b][0];c&&1!=this._.pageCount&&c.isVisible()&&(b==this._.currentTabId&&this.selectPage(a.call(this)),c.hide(),this._.pageCount--,this.updateStyle())},showPage:function(a){if(a=
this._.tabs[a]&&this._.tabs[a][0])a.show(),this._.pageCount++,this.updateStyle()},getElement:function(){return this._.element},getName:function(){return this._.name},getContentElement:function(a,b){var c=this._.contents[a];return c&&c[b]},getValueOf:function(a,b){return this.getContentElement(a,b).getValue()},setValueOf:function(a,b,c){return this.getContentElement(a,b).setValue(c)},getButton:function(a){return this._.buttons[a]},click:function(a){return this._.buttons[a].click()},disableButton:function(a){return this._.buttons[a].disable()},
enableButton:function(a){return this._.buttons[a].enable()},getPageCount:function(){return this._.pageCount},getParentEditor:function(){return this._.editor},getSelectedElement:function(){return this.getParentEditor().getSelection().getSelectedElement()},addFocusable:function(a,b){if("undefined"==typeof b)b=this._.focusList.length,this._.focusList.push(new k(this,a,b));else{this._.focusList.splice(b,0,new k(this,a,b));for(var c=b+1;c<this._.focusList.length;c++)this._.focusList[c].focusIndex++}},
setState:function(a){if(this.state!=a){this.state=a;if(a==CKEDITOR.DIALOG_STATE_BUSY){if(!this.parts.spinner){var b=this.getParentEditor().lang.dir,c={attributes:{"class":"cke_dialog_spinner"},styles:{"float":"rtl"==b?"right":"left"}};c.styles["margin-"+("rtl"==b?"left":"right")]="8px";this.parts.spinner=CKEDITOR.document.createElement("div",c);this.parts.spinner.setHtml("\x26#8987;");this.parts.spinner.appendTo(this.parts.title,1)}this.parts.spinner.show();this.getButton("ok").disable()}else a==
CKEDITOR.DIALOG_STATE_IDLE&&(this.parts.spinner&&this.parts.spinner.hide(),this.getButton("ok").enable());this.fire("state",a)}}};CKEDITOR.tools.extend(CKEDITOR.dialog,{add:function(a,b){this._.dialogDefinitions[a]&&"function"!=typeof b||(this._.dialogDefinitions[a]=b)},exists:function(a){return!!this._.dialogDefinitions[a]},getCurrent:function(){return CKEDITOR.dialog._.currentTop},isTabEnabled:function(a,b,c){a=a.config.removeDialogTabs;return!(a&&a.match(new RegExp("(?:^|;)"+b+":"+c+"(?:$|;)",
"i")))},okButton:function(){var a=function(a,b){b=b||{};return CKEDITOR.tools.extend({id:"ok",type:"button",label:a.lang.common.ok,"class":"cke_dialog_ui_button_ok",onClick:function(a){a=a.data.dialog;!1!==a.fire("ok",{hide:!0}).hide&&a.hide()}},b,!0)};a.type="button";a.override=function(b){return CKEDITOR.tools.extend(function(c){return a(c,b)},{type:"button"},!0)};return a}(),cancelButton:function(){var a=function(a,b){b=b||{};return CKEDITOR.tools.extend({id:"cancel",type:"button",label:a.lang.common.cancel,
"class":"cke_dialog_ui_button_cancel",onClick:function(a){a=a.data.dialog;!1!==a.fire("cancel",{hide:!0}).hide&&a.hide()}},b,!0)};a.type="button";a.override=function(b){return CKEDITOR.tools.extend(function(c){return a(c,b)},{type:"button"},!0)};return a}(),addUIElement:function(a,b){this._.uiElementBuilders[a]=b}});CKEDITOR.dialog._={uiElementBuilders:{},dialogDefinitions:{},currentTop:null,currentZIndex:null};CKEDITOR.event.implementOn(CKEDITOR.dialog);CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);
var q={resizable:CKEDITOR.DIALOG_RESIZE_BOTH,minWidth:600,minHeight:400,buttons:[CKEDITOR.dialog.okButton,CKEDITOR.dialog.cancelButton]},x=function(a,b,c){for(var d=0,e;e=a[d];d++)if(e.id==b||c&&e[c]&&(e=x(e[c],b,c)))return e;return null},r=function(a,b,c,d,e){if(c){for(var f=0,g;g=a[f];f++){if(g.id==c)return a.splice(f,0,b),b;if(d&&g[d]&&(g=r(g[d],b,c,d,!0)))return g}if(e)return null}a.push(b);return b},A=function(a,b,c){for(var d=0,e;e=a[d];d++){if(e.id==b)return a.splice(d,1);if(c&&e[c]&&(e=A(e[c],
b,c)))return e}return null},t=function(a,b){this.dialog=a;for(var c=b.contents,d=0,e;e=c[d];d++)c[d]=e&&new h(a,e);CKEDITOR.tools.extend(this,b)};t.prototype={getContents:function(a){return x(this.contents,a)},getButton:function(a){return x(this.buttons,a)},addContents:function(a,b){return r(this.contents,a,b)},addButton:function(a,b){return r(this.buttons,a,b)},removeContents:function(a){A(this.contents,a)},removeButton:function(a){A(this.buttons,a)}};h.prototype={get:function(a){return x(this.elements,
a,"children")},add:function(a,b){return r(this.elements,a,b,"children")},remove:function(a){A(this.elements,a,"children")}};var y,v={},z,B={},H=function(a){var b=a.data.$.ctrlKey||a.data.$.metaKey,c=a.data.$.altKey,d=a.data.$.shiftKey,e=String.fromCharCode(a.data.$.keyCode);(b=B[(b?"CTRL+":"")+(c?"ALT+":"")+(d?"SHIFT+":"")+e])&&b.length&&(b=b[b.length-1],b.keydown&&b.keydown.call(b.uiElement,b.dialog,b.key),a.data.preventDefault())},G=function(a){var b=a.data.$.ctrlKey||a.data.$.metaKey,c=a.data.$.altKey,
d=a.data.$.shiftKey,e=String.fromCharCode(a.data.$.keyCode);(b=B[(b?"CTRL+":"")+(c?"ALT+":"")+(d?"SHIFT+":"")+e])&&b.length&&(b=b[b.length-1],b.keyup&&(b.keyup.call(b.uiElement,b.dialog,b.key),a.data.preventDefault()))},E=function(a,b,c,d,e){(B[c]||(B[c]=[])).push({uiElement:a,dialog:b,key:c,keyup:e||a.accessKeyUp,keydown:d||a.accessKeyDown})},I=function(a){for(var b in B){for(var c=B[b],d=c.length-1;0<=d;d--)c[d].dialog!=a&&c[d].uiElement!=a||c.splice(d,1);0===c.length&&delete B[b]}},F=function(a,
b){a._.accessKeyMap[b]&&a.selectPage(a._.accessKeyMap[b])},K=function(){};(function(){CKEDITOR.ui.dialog={uiElement:function(a,b,c,d,e,f,g){if(!(4>arguments.length)){var h=(d.call?d(b):d)||"div",k=["\x3c",h," "],l=(e&&e.call?e(b):e)||{},m=(f&&f.call?f(b):f)||{},n=(g&&g.call?g.call(this,a,b):g)||"",q=this.domId=m.id||CKEDITOR.tools.getNextId()+"_uiElement";b.requiredContent&&!a.getParentEditor().filter.check(b.requiredContent)&&(l.display="none",this.notAllowed=!0);m.id=q;var r={};b.type&&(r["cke_dialog_ui_"+
b.type]=1);b.className&&(r[b.className]=1);b.disabled&&(r.cke_disabled=1);for(var x=m["class"]&&m["class"].split?m["class"].split(" "):[],q=0;q<x.length;q++)x[q]&&(r[x[q]]=1);x=[];for(q in r)x.push(q);m["class"]=x.join(" ");b.title&&(m.title=b.title);r=(b.style||"").split(";");b.align&&(x=b.align,l["margin-left"]="left"==x?0:"auto",l["margin-right"]="right"==x?0:"auto");for(q in l)r.push(q+":"+l[q]);b.hidden&&r.push("display:none");for(q=r.length-1;0<=q;q--)""===r[q]&&r.splice(q,1);0<r.length&&(m.style=
(m.style?m.style+"; ":"")+r.join("; "));for(q in m)k.push(q+'\x3d"'+CKEDITOR.tools.htmlEncode(m[q])+'" ');k.push("\x3e",n,"\x3c/",h,"\x3e");c.push(k.join(""));(this._||(this._={})).dialog=a;"boolean"==typeof b.isChanged&&(this.isChanged=function(){return b.isChanged});"function"==typeof b.isChanged&&(this.isChanged=b.isChanged);"function"==typeof b.setValue&&(this.setValue=CKEDITOR.tools.override(this.setValue,function(a){return function(c){a.call(this,b.setValue.call(this,c))}}));"function"==typeof b.getValue&&
(this.getValue=CKEDITOR.tools.override(this.getValue,function(a){return function(){return b.getValue.call(this,a.call(this))}}));CKEDITOR.event.implementOn(this);this.registerEvents(b);this.accessKeyUp&&this.accessKeyDown&&b.accessKey&&E(this,a,"CTRL+"+b.accessKey);var v=this;a.on("load",function(){var b=v.getInputElement();if(b){var c=v.type in{checkbox:1,ratio:1}&&CKEDITOR.env.ie&&8>CKEDITOR.env.version?"cke_dialog_ui_focused":"";b.on("focus",function(){a._.tabBarMode=!1;a._.hasFocus=!0;v.fire("focus");
c&&this.addClass(c)});b.on("blur",function(){v.fire("blur");c&&this.removeClass(c)})}});CKEDITOR.tools.extend(this,b);this.keyboardFocusable&&(this.tabIndex=b.tabIndex||0,this.focusIndex=a._.focusList.push(this)-1,this.on("focus",function(){a._.currentFocusIndex=v.focusIndex}))}},hbox:function(a,b,c,d,e){if(!(4>arguments.length)){this._||(this._={});var f=this._.children=b,g=e&&e.widths||null,h=e&&e.height||null,k,l={role:"presentation"};e&&e.align&&(l.align=e.align);CKEDITOR.ui.dialog.uiElement.call(this,
a,e||{type:"hbox"},d,"table",{},l,function(){var a=['\x3ctbody\x3e\x3ctr class\x3d"cke_dialog_ui_hbox"\x3e'];for(k=0;k<c.length;k++){var b="cke_dialog_ui_hbox_child",d=[];0===k&&(b="cke_dialog_ui_hbox_first");k==c.length-1&&(b="cke_dialog_ui_hbox_last");a.push('\x3ctd class\x3d"',b,'" role\x3d"presentation" ');g?g[k]&&d.push("width:"+C(g[k])):d.push("width:"+Math.floor(100/c.length)+"%");h&&d.push("height:"+C(h));e&&void 0!==e.padding&&d.push("padding:"+C(e.padding));CKEDITOR.env.ie&&CKEDITOR.env.quirks&&
f[k].align&&d.push("text-align:"+f[k].align);0<d.length&&a.push('style\x3d"'+d.join("; ")+'" ');a.push("\x3e",c[k],"\x3c/td\x3e")}a.push("\x3c/tr\x3e\x3c/tbody\x3e");return a.join("")})}},vbox:function(a,b,c,d,e){if(!(3>arguments.length)){this._||(this._={});var f=this._.children=b,g=e&&e.width||null,h=e&&e.heights||null;CKEDITOR.ui.dialog.uiElement.call(this,a,e||{type:"vbox"},d,"div",null,{role:"presentation"},function(){var b=['\x3ctable role\x3d"presentation" cellspacing\x3d"0" border\x3d"0" '];
b.push('style\x3d"');e&&e.expand&&b.push("height:100%;");b.push("width:"+C(g||"100%"),";");CKEDITOR.env.webkit&&b.push("float:none;");b.push('"');b.push('align\x3d"',CKEDITOR.tools.htmlEncode(e&&e.align||("ltr"==a.getParentEditor().lang.dir?"left":"right")),'" ');b.push("\x3e\x3ctbody\x3e");for(var d=0;d<c.length;d++){var k=[];b.push('\x3ctr\x3e\x3ctd role\x3d"presentation" ');g&&k.push("width:"+C(g||"100%"));h?k.push("height:"+C(h[d])):e&&e.expand&&k.push("height:"+Math.floor(100/c.length)+"%");
e&&void 0!==e.padding&&k.push("padding:"+C(e.padding));CKEDITOR.env.ie&&CKEDITOR.env.quirks&&f[d].align&&k.push("text-align:"+f[d].align);0<k.length&&b.push('style\x3d"',k.join("; "),'" ');b.push(' class\x3d"cke_dialog_ui_vbox_child"\x3e',c[d],"\x3c/td\x3e\x3c/tr\x3e")}b.push("\x3c/tbody\x3e\x3c/table\x3e");return b.join("")})}}}})();CKEDITOR.ui.dialog.uiElement.prototype={getElement:function(){return CKEDITOR.document.getById(this.domId)},getInputElement:function(){return this.getElement()},getDialog:function(){return this._.dialog},
setValue:function(a,b){this.getInputElement().setValue(a);!b&&this.fire("change",{value:a});return this},getValue:function(){return this.getInputElement().getValue()},isChanged:function(){return!1},selectParentTab:function(){for(var a=this.getInputElement();(a=a.getParent())&&-1==a.$.className.search("cke_dialog_page_contents"););if(!a)return this;a=a.getAttribute("name");this._.dialog._.currentTabId!=a&&this._.dialog.selectPage(a);return this},focus:function(){this.selectParentTab().getInputElement().focus();
return this},registerEvents:function(a){var b=/^on([A-Z]\w+)/,c,d=function(a,b,c,d){b.on("load",function(){a.getInputElement().on(c,d,a)})},e;for(e in a)if(c=e.match(b))this.eventProcessors[e]?this.eventProcessors[e].call(this,this._.dialog,a[e]):d(this,this._.dialog,c[1].toLowerCase(),a[e]);return this},eventProcessors:{onLoad:function(a,b){a.on("load",b,this)},onShow:function(a,b){a.on("show",b,this)},onHide:function(a,b){a.on("hide",b,this)}},accessKeyDown:function(){this.focus()},accessKeyUp:function(){},
disable:function(){var a=this.getElement();this.getInputElement().setAttribute("disabled","true");a.addClass("cke_disabled")},enable:function(){var a=this.getElement();this.getInputElement().removeAttribute("disabled");a.removeClass("cke_disabled")},isEnabled:function(){return!this.getElement().hasClass("cke_disabled")},isVisible:function(){return this.getInputElement().isVisible()},isFocusable:function(){return this.isEnabled()&&this.isVisible()?!0:!1}};CKEDITOR.ui.dialog.hbox.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,
{getChild:function(a){if(1>arguments.length)return this._.children.concat();a.splice||(a=[a]);return 2>a.length?this._.children[a[0]]:this._.children[a[0]]&&this._.children[a[0]].getChild?this._.children[a[0]].getChild(a.slice(1,a.length)):null}},!0);CKEDITOR.ui.dialog.vbox.prototype=new CKEDITOR.ui.dialog.hbox;(function(){var a={build:function(a,b,c){for(var d=b.children,e,f=[],g=[],h=0;h<d.length&&(e=d[h]);h++){var k=[];f.push(k);g.push(CKEDITOR.dialog._.uiElementBuilders[e.type].build(a,e,k))}return new CKEDITOR.ui.dialog[b.type](a,
g,f,c,b)}};CKEDITOR.dialog.addUIElement("hbox",a);CKEDITOR.dialog.addUIElement("vbox",a)})();CKEDITOR.dialogCommand=function(a,b){this.dialogName=a;CKEDITOR.tools.extend(this,b,!0)};CKEDITOR.dialogCommand.prototype={exec:function(a){var b=this.tabId;a.openDialog(this.dialogName,function(a){b&&a.selectPage(b)})},canUndo:!1,editorFocus:1};(function(){var a=/^([a]|[^a])+$/,b=/^\d*$/,c=/^\d*(?:\.\d+)?$/,d=/^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/,e=/^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i,
f=/^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/;CKEDITOR.VALIDATE_OR=1;CKEDITOR.VALIDATE_AND=2;CKEDITOR.dialog.validate={functions:function(){var a=arguments;return function(){var b=this&&this.getValue?this.getValue():a[0],c,d=CKEDITOR.VALIDATE_AND,e=[],f;for(f=0;f<a.length;f++)if("function"==typeof a[f])e.push(a[f]);else break;f<a.length&&"string"==typeof a[f]&&(c=a[f],f++);f<a.length&&"number"==typeof a[f]&&(d=a[f]);var g=d==CKEDITOR.VALIDATE_AND?!0:!1;for(f=0;f<e.length;f++)g=d==CKEDITOR.VALIDATE_AND?g&&
e[f](b):g||e[f](b);return g?!0:c}},regex:function(a,b){return function(c){c=this&&this.getValue?this.getValue():c;return a.test(c)?!0:b}},notEmpty:function(b){return this.regex(a,b)},integer:function(a){return this.regex(b,a)},number:function(a){return this.regex(c,a)},cssLength:function(a){return this.functions(function(a){return e.test(CKEDITOR.tools.trim(a))},a)},htmlLength:function(a){return this.functions(function(a){return d.test(CKEDITOR.tools.trim(a))},a)},inlineStyle:function(a){return this.functions(function(a){return f.test(CKEDITOR.tools.trim(a))},
a)},equals:function(a,b){return this.functions(function(b){return b==a},b)},notEqual:function(a,b){return this.functions(function(b){return b!=a},b)}};CKEDITOR.on("instanceDestroyed",function(a){if(CKEDITOR.tools.isEmpty(CKEDITOR.instances)){for(var b;b=CKEDITOR.dialog._.currentTop;)b.hide();for(var c in v)v[c].remove();v={}}a=a.editor._.storedDialogs;for(var d in a)a[d].destroy()})})();CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{openDialog:function(a,b){var c=null,d=CKEDITOR.dialog._.dialogDefinitions[a];
null===CKEDITOR.dialog._.currentTop&&p(this);if("function"==typeof d)c=this._.storedDialogs||(this._.storedDialogs={}),c=c[a]||(c[a]=new CKEDITOR.dialog(this,a)),b&&b.call(c,c),c.show();else{if("failed"==d)throw u(this),Error('[CKEDITOR.dialog.openDialog] Dialog "'+a+'" failed when loading definition.');"string"==typeof d&&CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(d),function(){"function"!=typeof CKEDITOR.dialog._.dialogDefinitions[a]&&(CKEDITOR.dialog._.dialogDefinitions[a]="failed");this.openDialog(a,
b)},this,0,1)}CKEDITOR.skin.loadPart("dialog");return c}})}(),CKEDITOR.plugins.add("dialog",{requires:"dialogui",init:function(a){a.on("doubleclick",function(f){f.data.dialog&&a.openDialog(f.data.dialog)},null,null,999)}}),function(){CKEDITOR.plugins.add("a11yhelp",{requires:"dialog",availableLangs:{af:1,ar:1,az:1,bg:1,ca:1,cs:1,cy:1,da:1,de:1,"de-ch":1,el:1,en:1,"en-gb":1,eo:1,es:1,"es-mx":1,et:1,eu:1,fa:1,fi:1,fo:1,fr:1,"fr-ca":1,gl:1,gu:1,he:1,hi:1,hr:1,hu:1,id:1,it:1,ja:1,km:1,ko:1,ku:1,lt:1,
lv:1,mk:1,mn:1,nb:1,nl:1,no:1,oc:1,pl:1,pt:1,"pt-br":1,ro:1,ru:1,si:1,sk:1,sl:1,sq:1,sr:1,"sr-latn":1,sv:1,th:1,tr:1,tt:1,ug:1,uk:1,vi:1,zh:1,"zh-cn":1},init:function(a){var f=this;a.addCommand("a11yHelp",{exec:function(){var b=a.langCode,b=f.availableLangs[b]?b:f.availableLangs[b.replace(/-.*/,"")]?b.replace(/-.*/,""):"en";CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(f.path+"dialogs/lang/"+b+".js"),function(){a.lang.a11yhelp=f.langEntries[b];a.openDialog("a11yHelp")})},modes:{wysiwyg:1,source:1},readOnly:1,
canUndo:!1});a.setKeystroke(CKEDITOR.ALT+48,"a11yHelp");CKEDITOR.dialog.add("a11yHelp",this.path+"dialogs/a11yhelp.js");a.on("ariaEditorHelpLabel",function(b){b.data.label=a.lang.common.editorHelp})}})}(),CKEDITOR.plugins.add("about",{requires:"dialog",init:function(a){var f=a.addCommand("about",new CKEDITOR.dialogCommand("about"));f.modes={wysiwyg:1,source:1};f.canUndo=!1;f.readOnly=1;a.ui.addButton&&a.ui.addButton("About",{label:a.lang.about.title,command:"about",toolbar:"about"});CKEDITOR.dialog.add("about",
this.path+"dialogs/about.js")}}),CKEDITOR.plugins.add("basicstyles",{init:function(a){var f=0,b=function(b,d,e,l){if(l){l=new CKEDITOR.style(l);var g=c[e];g.unshift(l);a.attachStyleStateChange(l,function(b){!a.readOnly&&a.getCommand(e).setState(b)});a.addCommand(e,new CKEDITOR.styleCommand(l,{contentForms:g}));a.ui.addButton&&a.ui.addButton(b,{label:d,command:e,toolbar:"basicstyles,"+(f+=10)})}},c={bold:["strong","b",["span",function(a){a=a.styles["font-weight"];return"bold"==a||700<=+a}]],italic:["em",
"i",["span",function(a){return"italic"==a.styles["font-style"]}]],underline:["u",["span",function(a){return"underline"==a.styles["text-decoration"]}]],strike:["s","strike",["span",function(a){return"line-through"==a.styles["text-decoration"]}]],subscript:["sub"],superscript:["sup"]},e=a.config,m=a.lang.basicstyles;b("Bold",m.bold,"bold",e.coreStyles_bold);b("Italic",m.italic,"italic",e.coreStyles_italic);b("Underline",m.underline,"underline",e.coreStyles_underline);b("Strike",m.strike,"strike",e.coreStyles_strike);
b("Subscript",m.subscript,"subscript",e.coreStyles_subscript);b("Superscript",m.superscript,"superscript",e.coreStyles_superscript);a.setKeystroke([[CKEDITOR.CTRL+66,"bold"],[CKEDITOR.CTRL+73,"italic"],[CKEDITOR.CTRL+85,"underline"]])}}),CKEDITOR.config.coreStyles_bold={element:"strong",overrides:"b"},CKEDITOR.config.coreStyles_italic={element:"em",overrides:"i"},CKEDITOR.config.coreStyles_underline={element:"u"},CKEDITOR.config.coreStyles_strike={element:"s",overrides:"strike"},CKEDITOR.config.coreStyles_subscript=
{element:"sub"},CKEDITOR.config.coreStyles_superscript={element:"sup"},function(){var a={exec:function(a){var b=a.getCommand("blockquote").state,c=a.getSelection(),e=c&&c.getRanges()[0];if(e){var m=c.createBookmarks();if(CKEDITOR.env.ie){var k=m[0].startNode,d=m[0].endNode,h;if(k&&"blockquote"==k.getParent().getName())for(h=k;h=h.getNext();)if(h.type==CKEDITOR.NODE_ELEMENT&&h.isBlockBoundary()){k.move(h,!0);break}if(d&&"blockquote"==d.getParent().getName())for(h=d;h=h.getPrevious();)if(h.type==CKEDITOR.NODE_ELEMENT&&
h.isBlockBoundary()){d.move(h);break}}var l=e.createIterator();l.enlargeBr=a.config.enterMode!=CKEDITOR.ENTER_BR;if(b==CKEDITOR.TRISTATE_OFF){for(k=[];b=l.getNextParagraph();)k.push(b);1>k.length&&(b=a.document.createElement(a.config.enterMode==CKEDITOR.ENTER_P?"p":"div"),d=m.shift(),e.insertNode(b),b.append(new CKEDITOR.dom.text("﻿",a.document)),e.moveToBookmark(d),e.selectNodeContents(b),e.collapse(!0),d=e.createBookmark(),k.push(b),m.unshift(d));h=k[0].getParent();e=[];for(d=0;d<k.length;d++)b=
k[d],h=h.getCommonAncestor(b.getParent());for(b={table:1,tbody:1,tr:1,ol:1,ul:1};b[h.getName()];)h=h.getParent();for(d=null;0<k.length;){for(b=k.shift();!b.getParent().equals(h);)b=b.getParent();b.equals(d)||e.push(b);d=b}for(;0<e.length;)if(b=e.shift(),"blockquote"==b.getName()){for(d=new CKEDITOR.dom.documentFragment(a.document);b.getFirst();)d.append(b.getFirst().remove()),k.push(d.getLast());d.replace(b)}else k.push(b);e=a.document.createElement("blockquote");for(e.insertBefore(k[0]);0<k.length;)b=
k.shift(),e.append(b)}else if(b==CKEDITOR.TRISTATE_ON){d=[];for(h={};b=l.getNextParagraph();){for(k=e=null;b.getParent();){if("blockquote"==b.getParent().getName()){e=b.getParent();k=b;break}b=b.getParent()}e&&k&&!k.getCustomData("blockquote_moveout")&&(d.push(k),CKEDITOR.dom.element.setMarker(h,k,"blockquote_moveout",!0))}CKEDITOR.dom.element.clearAllMarkers(h);b=[];k=[];for(h={};0<d.length;)l=d.shift(),e=l.getParent(),l.getPrevious()?l.getNext()?(l.breakParent(l.getParent()),k.push(l.getNext())):
l.remove().insertAfter(e):l.remove().insertBefore(e),e.getCustomData("blockquote_processed")||(k.push(e),CKEDITOR.dom.element.setMarker(h,e,"blockquote_processed",!0)),b.push(l);CKEDITOR.dom.element.clearAllMarkers(h);for(d=k.length-1;0<=d;d--){e=k[d];a:{h=e;for(var l=0,g=h.getChildCount(),n=void 0;l<g&&(n=h.getChild(l));l++)if(n.type==CKEDITOR.NODE_ELEMENT&&n.isBlockBoundary()){h=!1;break a}h=!0}h&&e.remove()}if(a.config.enterMode==CKEDITOR.ENTER_BR)for(e=!0;b.length;)if(l=b.shift(),"div"==l.getName()){d=
new CKEDITOR.dom.documentFragment(a.document);!e||!l.getPrevious()||l.getPrevious().type==CKEDITOR.NODE_ELEMENT&&l.getPrevious().isBlockBoundary()||d.append(a.document.createElement("br"));for(e=l.getNext()&&!(l.getNext().type==CKEDITOR.NODE_ELEMENT&&l.getNext().isBlockBoundary());l.getFirst();)l.getFirst().remove().appendTo(d);e&&d.append(a.document.createElement("br"));d.replace(l);e=!1}}c.selectBookmarks(m);a.focus()}},refresh:function(a,b){this.setState(a.elementPath(b.block||b.blockLimit).contains("blockquote",
1)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF)},context:"blockquote",allowedContent:"blockquote",requiredContent:"blockquote"};CKEDITOR.plugins.add("blockquote",{init:function(f){f.blockless||(f.addCommand("blockquote",a),f.ui.addButton&&f.ui.addButton("Blockquote",{label:f.lang.blockquote.toolbar,command:"blockquote",toolbar:"blocks,10"}))}})}(),"use strict",CKEDITOR.plugins.add("notification",{init:function(a){function f(a){var c=new CKEDITOR.dom.element("div");c.setStyles({position:"fixed","margin-left":"-9999px"});
c.setAttributes({"aria-live":"assertive","aria-atomic":"true"});c.setText(a);CKEDITOR.document.getBody().append(c);setTimeout(function(){c.remove()},100)}a._.notificationArea=new la(a);a.showNotification=function(b,c,e){var f,k;"progress"==c?f=e:k=e;b=new CKEDITOR.plugins.notification(a,{message:b,type:c,progress:f,duration:k});b.show();return b};a.on("key",function(b){if(27==b.data.keyCode){var c=a._.notificationArea.notifications;c.length&&(f(a.lang.notification.closed),c[c.length-1].hide(),b.cancel())}})}}),
ka.prototype={show:function(){!1!==this.editor.fire("notificationShow",{notification:this})&&(this.area.add(this),this._hideAfterTimeout())},update:function(a){var f=!0;!1===this.editor.fire("notificationUpdate",{notification:this,options:a})&&(f=!1);var b=this.element,c=b.findOne(".cke_notification_message"),e=b.findOne(".cke_notification_progress"),m=a.type;b.removeAttribute("role");a.progress&&"progress"!=this.type&&(m="progress");m&&(b.removeClass(this._getClass()),b.removeAttribute("aria-label"),
this.type=m,b.addClass(this._getClass()),b.setAttribute("aria-label",this.type),"progress"!=this.type||e?"progress"!=this.type&&e&&e.remove():(e=this._createProgressElement(),e.insertBefore(c)));void 0!==a.message&&(this.message=a.message,c.setHtml(this.message));void 0!==a.progress&&(this.progress=a.progress,e&&e.setStyle("width",this._getPercentageProgress()));f&&a.important&&(b.setAttribute("role","alert"),this.isVisible()||this.area.add(this));this.duration=a.duration;this._hideAfterTimeout()},
hide:function(){!1!==this.editor.fire("notificationHide",{notification:this})&&this.area.remove(this)},isVisible:function(){return 0<=CKEDITOR.tools.indexOf(this.area.notifications,this)},_createElement:function(){var a=this,f,b,c=this.editor.lang.common.close;f=new CKEDITOR.dom.element("div");f.addClass("cke_notification");f.addClass(this._getClass());f.setAttributes({id:this.id,role:"alert","aria-label":this.type});"progress"==this.type&&f.append(this._createProgressElement());b=new CKEDITOR.dom.element("p");
b.addClass("cke_notification_message");b.setHtml(this.message);f.append(b);b=CKEDITOR.dom.element.createFromHtml('\x3ca class\x3d"cke_notification_close" href\x3d"javascript:void(0)" title\x3d"'+c+'" role\x3d"button" tabindex\x3d"-1"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e');f.append(b);b.on("click",function(){a.editor.focus();a.hide()});return f},_getClass:function(){return"progress"==this.type?"cke_notification_info":"cke_notification_"+this.type},_createProgressElement:function(){var a=
new CKEDITOR.dom.element("span");a.addClass("cke_notification_progress");a.setStyle("width",this._getPercentageProgress());return a},_getPercentageProgress:function(){return Math.round(100*(this.progress||0))+"%"},_hideAfterTimeout:function(){var a=this,f;this._hideTimeoutId&&clearTimeout(this._hideTimeoutId);if("number"==typeof this.duration)f=this.duration;else if("info"==this.type||"success"==this.type)f="number"==typeof this.editor.config.notification_duration?this.editor.config.notification_duration:
5E3;f&&(a._hideTimeoutId=setTimeout(function(){a.hide()},f))}},la.prototype={add:function(a){this.notifications.push(a);this.element.append(a.element);1==this.element.getChildCount()&&(CKEDITOR.document.getBody().append(this.element),this._attachListeners());this._layout()},remove:function(a){var f=CKEDITOR.tools.indexOf(this.notifications,a);0>f||(this.notifications.splice(f,1),a.element.remove(),this.element.getChildCount()||(this._removeListeners(),this.element.remove()))},_createElement:function(){var a=
this.editor,f=a.config,b=new CKEDITOR.dom.element("div");b.addClass("cke_notifications_area");b.setAttribute("id","cke_notifications_area_"+a.name);b.setStyle("z-index",f.baseFloatZIndex-2);return b},_attachListeners:function(){var a=CKEDITOR.document.getWindow(),f=this.editor;a.on("scroll",this._uiBuffer.input);a.on("resize",this._uiBuffer.input);f.on("change",this._changeBuffer.input);f.on("floatingSpaceLayout",this._layout,this,null,20);f.on("blur",this._layout,this,null,20)},_removeListeners:function(){var a=
CKEDITOR.document.getWindow(),f=this.editor;a.removeListener("scroll",this._uiBuffer.input);a.removeListener("resize",this._uiBuffer.input);f.removeListener("change",this._changeBuffer.input);f.removeListener("floatingSpaceLayout",this._layout);f.removeListener("blur",this._layout)},_layout:function(){function a(){f.setStyle("left",w(q+c.width-l-g))}var f=this.element,b=this.editor,c=b.ui.contentsElement.getClientRect(),e=b.ui.contentsElement.getDocumentPosition(),m,k,d=f.getClientRect(),h,l=this._notificationWidth,
g=this._notificationMargin;h=CKEDITOR.document.getWindow();var n=h.getScrollPosition(),p=h.getViewPaneSize(),u=CKEDITOR.document.getBody(),C=u.getDocumentPosition(),w=CKEDITOR.tools.cssLength;l&&g||(h=this.element.getChild(0),l=this._notificationWidth=h.getClientRect().width,g=this._notificationMargin=parseInt(h.getComputedStyle("margin-left"),10)+parseInt(h.getComputedStyle("margin-right"),10));b.toolbar&&(m=b.ui.space("top"),k=m.getClientRect());m&&m.isVisible()&&k.bottom>c.top&&k.bottom<c.bottom-
d.height?f.setStyles({position:"fixed",top:w(k.bottom)}):0<c.top?f.setStyles({position:"absolute",top:w(e.y)}):e.y+c.height-d.height>n.y?f.setStyles({position:"fixed",top:0}):f.setStyles({position:"absolute",top:w(e.y+c.height-d.height)});var q="fixed"==f.getStyle("position")?c.left:"static"!=u.getComputedStyle("position")?e.x-C.x:e.x;c.width<l+g?e.x+l+g>n.x+p.width?a():f.setStyle("left",w(q)):e.x+l+g>n.x+p.width?f.setStyle("left",w(q)):e.x+c.width/2+l/2+g>n.x+p.width?f.setStyle("left",w(q-e.x+n.x+
p.width-l-g)):0>c.left+c.width-l-g?a():0>c.left+c.width/2-l/2?f.setStyle("left",w(q-e.x+n.x)):f.setStyle("left",w(q+c.width/2-l/2-g/2))}},CKEDITOR.plugins.notification=ka,function(){var a='\x3ca id\x3d"{id}" class\x3d"cke_button cke_button__{name} cke_button_{state} {cls}"'+(CKEDITOR.env.gecko&&!CKEDITOR.env.hc?"":" href\x3d\"javascript:void('{titleJs}')\"")+' title\x3d"{title}" tabindex\x3d"-1" hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasArrow}" aria-disabled\x3d"{ariaDisabled}"';
CKEDITOR.env.gecko&&CKEDITOR.env.mac&&(a+=' onkeypress\x3d"return false;"');CKEDITOR.env.gecko&&(a+=' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');var a=a+(' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" '+(CKEDITOR.env.ie?'onclick\x3d"return false;" onmouseup':"onclick")+'\x3d"CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{style}"'),
a=a+'\x3e\x26nbsp;\x3c/span\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_button_label cke_button__{name}_label" aria-hidden\x3d"false"\x3e{label}\x3c/span\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_button_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e{arrowHtml}\x3c/a\x3e',f=CKEDITOR.addTemplate("buttonArrow",'\x3cspan class\x3d"cke_button_arrow"\x3e'+(CKEDITOR.env.hc?"\x26#9660;":"")+"\x3c/span\x3e"),b=CKEDITOR.addTemplate("button",a);CKEDITOR.plugins.add("button",{beforeInit:function(a){a.ui.addHandler(CKEDITOR.UI_BUTTON,
CKEDITOR.ui.button.handler)}});CKEDITOR.UI_BUTTON="button";CKEDITOR.ui.button=function(a){CKEDITOR.tools.extend(this,a,{title:a.label,click:a.click||function(b){b.execCommand(a.command)}});this._={}};CKEDITOR.ui.button.handler={create:function(a){return new CKEDITOR.ui.button(a)}};CKEDITOR.ui.button.prototype={render:function(a,e){function m(){var b=a.mode;b&&(b=this.modes[b]?void 0!==x[b]?x[b]:CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,b=a.readOnly&&!this.readOnly?CKEDITOR.TRISTATE_DISABLED:
b,this.setState(b),this.refresh&&this.refresh())}var k=CKEDITOR.env,d=this._.id=CKEDITOR.tools.getNextId(),h="",l=this.command,g,n,p;this._.editor=a;var u={id:d,button:this,editor:a,focus:function(){CKEDITOR.document.getById(d).focus()},execute:function(){this.button.click(a)},attach:function(a){this.button.attach(a)}},C=CKEDITOR.tools.addFunction(function(a){if(u.onkey)return a=new CKEDITOR.dom.event(a),!1!==u.onkey(u,a.getKeystroke())}),w=CKEDITOR.tools.addFunction(function(a){var b;u.onfocus&&
(b=!1!==u.onfocus(u,new CKEDITOR.dom.event(a)));return b}),q=0;u.clickFn=g=CKEDITOR.tools.addFunction(function(){q&&(a.unlockSelection(1),q=0);u.execute();k.iOS&&a.focus()});if(this.modes){var x={};a.on("beforeModeUnload",function(){a.mode&&this._.state!=CKEDITOR.TRISTATE_DISABLED&&(x[a.mode]=this._.state)},this);a.on("activeFilterChange",m,this);a.on("mode",m,this);!this.readOnly&&a.on("readOnly",m,this)}else l&&(l=a.getCommand(l))&&(l.on("state",function(){this.setState(l.state)},this),h+=l.state==
CKEDITOR.TRISTATE_ON?"on":l.state==CKEDITOR.TRISTATE_DISABLED?"disabled":"off");if(this.directional)a.on("contentDirChanged",function(b){var d=CKEDITOR.document.getById(this._.id),e=d.getFirst();b=b.data;b!=a.lang.dir?d.addClass("cke_"+b):d.removeClass("cke_ltr").removeClass("cke_rtl");e.setAttribute("style",CKEDITOR.skin.getIconStyle(r,"rtl"==b,this.icon,this.iconOffset))},this);l?(n=a.getCommandKeystroke(l))&&(p=CKEDITOR.tools.keystrokeToString(a.lang.common.keyboard,n)):h+="off";var r=n=this.name||
this.command;this.icon&&!/\./.test(this.icon)&&(r=this.icon,this.icon=null);h={id:d,name:n,iconName:r,label:this.label,cls:this.className||"",state:h,ariaDisabled:"disabled"==h?"true":"false",title:this.title+(p?" ("+p.display+")":""),ariaShortcut:p?a.lang.common.keyboardShortcut+" "+p.aria:"",titleJs:k.gecko&&!k.hc?"":(this.title||"").replace("'",""),hasArrow:this.hasArrow?"true":"false",keydownFn:C,focusFn:w,clickFn:g,style:CKEDITOR.skin.getIconStyle(r,"rtl"==a.lang.dir,this.icon,this.iconOffset),
arrowHtml:this.hasArrow?f.output():""};b.output(h,e);if(this.onRender)this.onRender();return u},setState:function(a){if(this._.state==a)return!1;this._.state=a;var b=CKEDITOR.document.getById(this._.id);return b?(b.setState(a,"cke_button"),a==CKEDITOR.TRISTATE_DISABLED?b.setAttribute("aria-disabled",!0):b.removeAttribute("aria-disabled"),this.hasArrow?(a=a==CKEDITOR.TRISTATE_ON?this._.editor.lang.button.selectedLabel.replace(/%1/g,this.label):this.label,CKEDITOR.document.getById(this._.id+"_label").setText(a)):
a==CKEDITOR.TRISTATE_ON?b.setAttribute("aria-pressed",!0):b.removeAttribute("aria-pressed"),!0):!1},getState:function(){return this._.state},toFeature:function(a){if(this._.feature)return this._.feature;var b=this;this.allowedContent||this.requiredContent||!this.command||(b=a.getCommand(this.command)||b);return this._.feature=b}};CKEDITOR.ui.prototype.addButton=function(a,b){this.add(a,CKEDITOR.UI_BUTTON,b)}}(),function(){function a(a){function b(){for(var g=c(),h=CKEDITOR.tools.clone(a.config.toolbarGroups)||
f(a),l=0;l<h.length;l++){var m=h[l];if("/"!=m){"string"==typeof m&&(m=h[l]={name:m});var w,q=m.groups;if(q)for(var x=0;x<q.length;x++)w=q[x],(w=g[w])&&d(m,w);(w=g[m.name])&&d(m,w)}}return h}function c(){var b={},d,f,g;for(d in a.ui.items)f=a.ui.items[d],g=f.toolbar||"others",g=g.split(","),f=g[0],g=parseInt(g[1]||-1,10),b[f]||(b[f]=[]),b[f].push({name:d,order:g});for(f in b)b[f]=b[f].sort(function(a,b){return a.order==b.order?0:0>b.order?-1:0>a.order?1:a.order<b.order?-1:1});return b}function d(b,
c){if(c.length){b.items?b.items.push(a.ui.create("-")):b.items=[];for(var d;d=c.shift();)d="string"==typeof d?d:d.name,l&&-1!=CKEDITOR.tools.indexOf(l,d)||(d=a.ui.create(d))&&a.addFeature(d)&&b.items.push(d)}}function h(a){var b=[],c,e,f;for(c=0;c<a.length;++c)e=a[c],f={},"/"==e?b.push(e):CKEDITOR.tools.isArray(e)?(d(f,CKEDITOR.tools.clone(e)),b.push(f)):e.items&&(d(f,CKEDITOR.tools.clone(e.items)),f.name=e.name,b.push(f));return b}var l=a.config.removeButtons,l=l&&l.split(","),g=a.config.toolbar;
"string"==typeof g&&(g=a.config["toolbar_"+g]);return a.toolbar=g?h(g):b()}function f(a){return a._.toolbarGroups||(a._.toolbarGroups=[{name:"document",groups:["mode","document","doctools"]},{name:"clipboard",groups:["clipboard","undo"]},{name:"editing",groups:["find","selection","spellchecker"]},{name:"forms"},"/",{name:"basicstyles",groups:["basicstyles","cleanup"]},{name:"paragraph",groups:["list","indent","blocks","align","bidi"]},{name:"links"},{name:"insert"},"/",{name:"styles"},{name:"colors"},
{name:"tools"},{name:"others"},{name:"about"}])}var b=function(){this.toolbars=[];this.focusCommandExecuted=!1};b.prototype.focus=function(){for(var a=0,b;b=this.toolbars[a++];)for(var c=0,d;d=b.items[c++];)if(d.focus){d.focus();return}};var c={modes:{wysiwyg:1,source:1},readOnly:1,exec:function(a){a.toolbox&&(a.toolbox.focusCommandExecuted=!0,CKEDITOR.env.ie||CKEDITOR.env.air?setTimeout(function(){a.toolbox.focus()},100):a.toolbox.focus())}};CKEDITOR.plugins.add("toolbar",{requires:"button",init:function(e){var f,
k=function(a,b){var c,g="rtl"==e.lang.dir,n=e.config.toolbarGroupCycling,p=g?37:39,g=g?39:37,n=void 0===n||n;switch(b){case 9:case CKEDITOR.SHIFT+9:for(;!c||!c.items.length;)if(c=9==b?(c?c.next:a.toolbar.next)||e.toolbox.toolbars[0]:(c?c.previous:a.toolbar.previous)||e.toolbox.toolbars[e.toolbox.toolbars.length-1],c.items.length)for(a=c.items[f?c.items.length-1:0];a&&!a.focus;)(a=f?a.previous:a.next)||(c=0);a&&a.focus();return!1;case p:c=a;do c=c.next,!c&&n&&(c=a.toolbar.items[0]);while(c&&!c.focus);
c?c.focus():k(a,9);return!1;case 40:return a.button&&a.button.hasArrow?a.execute():k(a,40==b?p:g),!1;case g:case 38:c=a;do c=c.previous,!c&&n&&(c=a.toolbar.items[a.toolbar.items.length-1]);while(c&&!c.focus);c?c.focus():(f=1,k(a,CKEDITOR.SHIFT+9),f=0);return!1;case 27:return e.focus(),!1;case 13:case 32:return a.execute(),!1}return!0};e.on("uiSpace",function(c){if(c.data.space==e.config.toolbarLocation){c.removeListener();e.toolbox=new b;var f=CKEDITOR.tools.getNextId(),l=['\x3cspan id\x3d"',f,'" class\x3d"cke_voice_label"\x3e',
e.lang.toolbar.toolbars,"\x3c/span\x3e",'\x3cspan id\x3d"'+e.ui.spaceId("toolbox")+'" class\x3d"cke_toolbox" role\x3d"group" aria-labelledby\x3d"',f,'" onmousedown\x3d"return false;"\x3e'],f=!1!==e.config.toolbarStartupExpanded,g,m;e.config.toolbarCanCollapse&&e.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE&&l.push('\x3cspan class\x3d"cke_toolbox_main"'+(f?"\x3e":' style\x3d"display:none"\x3e'));for(var p=e.toolbox.toolbars,u=a(e),C=u.length,w=0;w<C;w++){var q,x=0,r,A=u[w],t="/"!==A&&("/"===u[w+1]||w==
C-1),y;if(A)if(g&&(l.push("\x3c/span\x3e"),m=g=0),"/"===A)l.push('\x3cspan class\x3d"cke_toolbar_break"\x3e\x3c/span\x3e');else{y=A.items||A;for(var v=0;v<y.length;v++){var z=y[v],B;if(z){var H=function(a){a=a.render(e,l);G=x.items.push(a)-1;0<G&&(a.previous=x.items[G-1],a.previous.next=a);a.toolbar=x;a.onkey=k;a.onfocus=function(){e.toolbox.focusCommandExecuted||e.focus()}};if(z.type==CKEDITOR.UI_SEPARATOR)m=g&&z;else{B=!1!==z.canGroup;if(!x){q=CKEDITOR.tools.getNextId();x={id:q,items:[]};r=A.name&&
(e.lang.toolbar.toolbarGroups[A.name]||A.name);l.push('\x3cspan id\x3d"',q,'" class\x3d"cke_toolbar'+(t?' cke_toolbar_last"':'"'),r?' aria-labelledby\x3d"'+q+'_label"':"",' role\x3d"toolbar"\x3e');r&&l.push('\x3cspan id\x3d"',q,'_label" class\x3d"cke_voice_label"\x3e',r,"\x3c/span\x3e");l.push('\x3cspan class\x3d"cke_toolbar_start"\x3e\x3c/span\x3e');var G=p.push(x)-1;0<G&&(x.previous=p[G-1],x.previous.next=x)}B?g||(l.push('\x3cspan class\x3d"cke_toolgroup" role\x3d"presentation"\x3e'),g=1):g&&(l.push("\x3c/span\x3e"),
g=0);m&&(H(m),m=0);H(z)}}}g&&(l.push("\x3c/span\x3e"),m=g=0);x&&l.push('\x3cspan class\x3d"cke_toolbar_end"\x3e\x3c/span\x3e\x3c/span\x3e')}}e.config.toolbarCanCollapse&&l.push("\x3c/span\x3e");if(e.config.toolbarCanCollapse&&e.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE){var E=CKEDITOR.tools.addFunction(function(){e.execCommand("toolbarCollapse")});e.on("destroy",function(){CKEDITOR.tools.removeFunction(E)});e.addCommand("toolbarCollapse",{readOnly:1,exec:function(a){var b=a.ui.space("toolbar_collapser"),
c=b.getPrevious(),d=a.ui.space("contents"),e=c.getParent(),f=parseInt(d.$.style.height,10),g=e.$.offsetHeight,h=b.hasClass("cke_toolbox_collapser_min");h?(c.show(),b.removeClass("cke_toolbox_collapser_min"),b.setAttribute("title",a.lang.toolbar.toolbarCollapse)):(c.hide(),b.addClass("cke_toolbox_collapser_min"),b.setAttribute("title",a.lang.toolbar.toolbarExpand));b.getFirst().setText(h?"▲":"◀");d.setStyle("height",f-(e.$.offsetHeight-g)+"px");a.fire("resize",{outerHeight:a.container.$.offsetHeight,
contentsHeight:d.$.offsetHeight,outerWidth:a.container.$.offsetWidth})},modes:{wysiwyg:1,source:1}});e.setKeystroke(CKEDITOR.ALT+(CKEDITOR.env.ie||CKEDITOR.env.webkit?189:109),"toolbarCollapse");l.push('\x3ca title\x3d"'+(f?e.lang.toolbar.toolbarCollapse:e.lang.toolbar.toolbarExpand)+'" id\x3d"'+e.ui.spaceId("toolbar_collapser")+'" tabIndex\x3d"-1" class\x3d"cke_toolbox_collapser');f||l.push(" cke_toolbox_collapser_min");l.push('" onclick\x3d"CKEDITOR.tools.callFunction('+E+')"\x3e','\x3cspan class\x3d"cke_arrow"\x3e\x26#9650;\x3c/span\x3e',
"\x3c/a\x3e")}l.push("\x3c/span\x3e");c.data.html+=l.join("")}});e.on("destroy",function(){if(this.toolbox){var a,b=0,c,e,f;for(a=this.toolbox.toolbars;b<a.length;b++)for(e=a[b].items,c=0;c<e.length;c++)f=e[c],f.clickFn&&CKEDITOR.tools.removeFunction(f.clickFn),f.keyDownFn&&CKEDITOR.tools.removeFunction(f.keyDownFn)}});e.on("uiReady",function(){var a=e.ui.space("toolbox");a&&e.focusManager.add(a,1)});e.addCommand("toolbarFocus",c);e.setKeystroke(CKEDITOR.ALT+121,"toolbarFocus");e.ui.add("-",CKEDITOR.UI_SEPARATOR,
{});e.ui.addHandler(CKEDITOR.UI_SEPARATOR,{create:function(){return{render:function(a,b){b.push('\x3cspan class\x3d"cke_toolbar_separator" role\x3d"separator"\x3e\x3c/span\x3e');return{}}}}})}});CKEDITOR.ui.prototype.addToolbarGroup=function(a,b,c){var d=f(this.editor),h=0===b,l={name:a};if(c){if(c=CKEDITOR.tools.search(d,function(a){return a.name==c})){!c.groups&&(c.groups=[]);if(b&&(b=CKEDITOR.tools.indexOf(c.groups,b),0<=b)){c.groups.splice(b+1,0,a);return}h?c.groups.splice(0,0,a):c.groups.push(a);
return}b=null}b&&(b=CKEDITOR.tools.indexOf(d,function(a){return a.name==b}));h?d.splice(0,0,a):"number"==typeof b?d.splice(b+1,0,l):d.push(a)}}(),CKEDITOR.UI_SEPARATOR="separator",CKEDITOR.config.toolbarLocation="top","use strict",function(){function a(a,b,c){b.type||(b.type="auto");if(c&&!1===a.fire("beforePaste",b)||!b.dataValue&&b.dataTransfer.isEmpty())return!1;b.dataValue||(b.dataValue="");if(CKEDITOR.env.gecko&&"drop"==b.method&&a.toolbox)a.once("afterPaste",function(){a.toolbox.focus()});return a.fire("paste",
b)}function f(b){function c(){var a=b.editable();if(CKEDITOR.plugins.clipboard.isCustomCopyCutSupported){var d=function(a){b.readOnly&&"cut"==a.name||B.initPasteDataTransfer(a,b);a.data.preventDefault()};a.on("copy",d);a.on("cut",d);a.on("cut",function(){b.readOnly||b.extractSelectedHtml()},null,null,999)}a.on(B.mainPasteEvent,function(a){"beforepaste"==B.mainPasteEvent&&H||y(a)});"beforepaste"==B.mainPasteEvent&&(a.on("paste",function(a){G||(f(),a.data.preventDefault(),y(a),k("paste"))}),a.on("contextmenu",
h,null,null,0),a.on("beforepaste",function(a){!a.data||a.data.$.ctrlKey||a.data.$.shiftKey||h()},null,null,0));a.on("beforecut",function(){!H&&l(b)});var e;a.attachListener(CKEDITOR.env.ie?a:b.document.getDocumentElement(),"mouseup",function(){e=setTimeout(function(){v()},0)});b.on("destroy",function(){clearTimeout(e)});a.on("keyup",v)}function d(a){return{type:a,canUndo:"cut"==a,startDisabled:!0,fakeKeystroke:"cut"==a?CKEDITOR.CTRL+88:CKEDITOR.CTRL+67,exec:function(){"cut"==this.type&&l();var a;
var c=this.type;if(CKEDITOR.env.ie)a=k(c);else try{a=b.document.$.execCommand(c,!1,null)}catch(d){a=!1}a||b.showNotification(b.lang.clipboard[this.type+"Error"]);return a}}}function e(){return{canUndo:!1,async:!0,fakeKeystroke:CKEDITOR.CTRL+86,exec:function(b,c){function d(c,g){g="undefined"!==typeof g?g:!0;c?(c.method="paste",c.dataTransfer||(c.dataTransfer=B.initPasteDataTransfer()),a(b,c,g)):f&&b.showNotification(k,"info",b.config.clipboard_notificationDuration);b.fire("afterCommandExec",{name:"paste",
command:e,returnValue:!!c})}c="undefined"!==typeof c&&null!==c?c:{};var e=this,f="undefined"!==typeof c.notification?c.notification:!0,g=c.type,h=CKEDITOR.tools.keystrokeToString(b.lang.common.keyboard,b.getCommandKeystroke(this)),k="string"===typeof f?f:b.lang.clipboard.pasteNotification.replace(/%1/,'\x3ckbd aria-label\x3d"'+h.aria+'"\x3e'+h.display+"\x3c/kbd\x3e"),h="string"===typeof c?c:c.dataValue;g?b._.nextPasteType=g:delete b._.nextPasteType;"string"===typeof h?d({dataValue:h}):b.getClipboardData(d)}}}
function f(){G=1;setTimeout(function(){G=0},100)}function h(){H=1;setTimeout(function(){H=0},10)}function k(a){var c=b.document,d=c.getBody(),e=!1,f=function(){e=!0};d.on(a,f);7<CKEDITOR.env.version?c.$.execCommand(a):c.$.selection.createRange().execCommand(a);d.removeListener(a,f);return e}function l(){if(CKEDITOR.env.ie&&!CKEDITOR.env.quirks){var a=b.getSelection(),c,d,e;a.getType()==CKEDITOR.SELECTION_ELEMENT&&(c=a.getSelectedElement())&&(d=a.getRanges()[0],e=b.document.createText(""),e.insertBefore(c),
d.setStartBefore(e),d.setEndAfter(c),a.selectRanges([d]),setTimeout(function(){c.getParent()&&(e.remove(),a.selectElement(c))},0))}}function m(a,c){var d=b.document,e=b.editable(),f=function(a){a.cancel()},h;if(!d.getById("cke_pastebin")){var k=b.getSelection(),l=k.createBookmarks();CKEDITOR.env.ie&&k.root.fire("selectionchange");var q=new CKEDITOR.dom.element(!CKEDITOR.env.webkit&&!e.is("body")||CKEDITOR.env.ie?"div":"body",d);q.setAttributes({id:"cke_pastebin","data-cke-temp":"1"});var n=0,d=d.getWindow();
CKEDITOR.env.webkit?(e.append(q),q.addClass("cke_editable"),e.is("body")||(n="static"!=e.getComputedStyle("position")?e:CKEDITOR.dom.element.get(e.$.offsetParent),n=n.getDocumentPosition().y)):e.getAscendant(CKEDITOR.env.ie?"body":"html",1).append(q);q.setStyles({position:"absolute",top:d.getScrollPosition().y-n+10+"px",width:"1px",height:Math.max(1,d.getViewPaneSize().height-20)+"px",overflow:"hidden",margin:0,padding:0});CKEDITOR.env.safari&&q.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select",
"text"));(n=q.getParent().isReadOnly())?(q.setOpacity(0),q.setAttribute("contenteditable",!0)):q.setStyle("ltr"==b.config.contentsLangDirection?"left":"right","-10000px");b.on("selectionChange",f,null,null,0);if(CKEDITOR.env.webkit||CKEDITOR.env.gecko)h=e.once("blur",f,null,null,-100);n&&q.focus();n=new CKEDITOR.dom.range(q);n.selectNodeContents(q);var r=n.select();CKEDITOR.env.ie&&(h=e.once("blur",function(){b.lockSelection(r)}));var x=CKEDITOR.document.getWindow().getScrollPosition().y;setTimeout(function(){CKEDITOR.env.webkit&&
(CKEDITOR.document.getBody().$.scrollTop=x);h&&h.removeListener();CKEDITOR.env.ie&&e.focus();k.selectBookmarks(l);q.remove();var a;CKEDITOR.env.webkit&&(a=q.getFirst())&&a.is&&a.hasClass("Apple-style-span")&&(q=a);b.removeListener("selectionChange",f);c(q.getHtml())},0)}}function A(){if("paste"==B.mainPasteEvent)return b.fire("beforePaste",{type:"auto",method:"paste"}),!1;b.focus();f();var a=b.focusManager;a.lock();if(b.editable().fire(B.mainPasteEvent)&&!k("paste"))return a.unlock(),!1;a.unlock();
return!0}function t(a){if("wysiwyg"==b.mode)switch(a.data.keyCode){case CKEDITOR.CTRL+86:case CKEDITOR.SHIFT+45:a=b.editable();f();"paste"==B.mainPasteEvent&&a.fire("beforepaste");break;case CKEDITOR.CTRL+88:case CKEDITOR.SHIFT+46:b.fire("saveSnapshot"),setTimeout(function(){b.fire("saveSnapshot")},50)}}function y(c){var d={type:"auto",method:"paste",dataTransfer:B.initPasteDataTransfer(c)};d.dataTransfer.cacheData();var e=!1!==b.fire("beforePaste",d);e&&B.canClipboardApiBeTrusted(d.dataTransfer,
b)?(c.data.preventDefault(),setTimeout(function(){a(b,d)},0)):m(c,function(c){d.dataValue=c.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig,"");e&&a(b,d)})}function v(){if("wysiwyg"==b.mode){var a=z("paste");b.getCommand("cut").setState(z("cut"));b.getCommand("copy").setState(z("copy"));b.getCommand("paste").setState(a);b.fire("pasteState",a)}}function z(a){if(E&&a in{paste:1,cut:1})return CKEDITOR.TRISTATE_DISABLED;if("paste"==a)return CKEDITOR.TRISTATE_OFF;a=b.getSelection();var c=a.getRanges();
return a.getType()==CKEDITOR.SELECTION_NONE||1==c.length&&c[0].collapsed?CKEDITOR.TRISTATE_DISABLED:CKEDITOR.TRISTATE_OFF}var B=CKEDITOR.plugins.clipboard,H=0,G=0,E=0;(function(){b.on("key",t);b.on("contentDom",c);b.on("selectionChange",function(a){E=a.data.selection.getRanges()[0].checkReadOnly();v()});b.contextMenu&&b.contextMenu.addListener(function(a,b){E=b.getRanges()[0].checkReadOnly();return{cut:z("cut"),copy:z("copy"),paste:z("paste")}})})();(function(){function a(c,d,e,f,h){var k=b.lang.clipboard[d];
b.addCommand(d,e);b.ui.addButton&&b.ui.addButton(c,{label:k,command:d,toolbar:"clipboard,"+f});b.addMenuItems&&b.addMenuItem(d,{label:k,command:d,group:"clipboard",order:h})}a("Cut","cut",d("cut"),10,1);a("Copy","copy",d("copy"),20,4);a("Paste","paste",e(),30,8)})();b.getClipboardData=function(a,c){function d(a){a.removeListener();a.cancel();c(a.data)}c||(c=a,a=null);b.on("paste",d,null,null,0);!1===A()&&(b.removeListener("paste",d),c(null))}}function b(a){if(CKEDITOR.env.webkit){if(!a.match(/^[^<]*$/g)&&
!a.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi))return"html"}else if(CKEDITOR.env.ie){if(!a.match(/^([^<]|<br( ?\/)?>)*$/gi)&&!a.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi))return"html"}else if(CKEDITOR.env.gecko){if(!a.match(/^([^<]|<br( ?\/)?>)*$/gi))return"html"}else return"html";return"htmlifiedtext"}function c(a,b){function c(a){return CKEDITOR.tools.repeat("\x3c/p\x3e\x3cp\x3e",~~(a/2))+(1==a%2?"\x3cbr\x3e":"")}b=b.replace(/\s+/g," ").replace(/> +</g,"\x3e\x3c").replace(/<br ?\/>/gi,
"\x3cbr\x3e");b=b.replace(/<\/?[A-Z]+>/g,function(a){return a.toLowerCase()});if(b.match(/^[^<]$/))return b;CKEDITOR.env.webkit&&-1<b.indexOf("\x3cdiv\x3e")&&(b=b.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g,"\x3cbr\x3e").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g,"\x3cdiv\x3e\x3c/div\x3e"),b.match(/<div>(<br>|)<\/div>/)&&(b="\x3cp\x3e"+b.replace(/(<div>(<br>|)<\/div>)+/g,function(a){return c(a.split("\x3c/div\x3e\x3cdiv\x3e").length+1)})+"\x3c/p\x3e"),b=b.replace(/<\/div><div>/g,"\x3cbr\x3e"),
b=b.replace(/<\/?div>/g,""));CKEDITOR.env.gecko&&a.enterMode!=CKEDITOR.ENTER_BR&&(CKEDITOR.env.gecko&&(b=b.replace(/^<br><br>$/,"\x3cbr\x3e")),-1<b.indexOf("\x3cbr\x3e\x3cbr\x3e")&&(b="\x3cp\x3e"+b.replace(/(<br>){2,}/g,function(a){return c(a.length/4)})+"\x3c/p\x3e"));return k(a,b)}function e(){function a(){var b={},c;for(c in CKEDITOR.dtd)"$"!=c.charAt(0)&&"div"!=c&&"span"!=c&&(b[c]=1);return b}var b={};return{get:function(c){return"plain-text"==c?b.plainText||(b.plainText=new CKEDITOR.filter("br")):
"semantic-content"==c?((c=b.semanticContent)||(c=new CKEDITOR.filter,c.allow({$1:{elements:a(),attributes:!0,styles:!1,classes:!1}}),c=b.semanticContent=c),c):c?new CKEDITOR.filter(c):null}}}function m(a,b,c){b=CKEDITOR.htmlParser.fragment.fromHtml(b);var d=new CKEDITOR.htmlParser.basicWriter;c.applyTo(b,!0,!1,a.activeEnterMode);b.writeHtml(d);return d.getHtml()}function k(a,b){a.enterMode==CKEDITOR.ENTER_BR?b=b.replace(/(<\/p><p>)+/g,function(a){return CKEDITOR.tools.repeat("\x3cbr\x3e",a.length/
7*2)}).replace(/<\/?p>/g,""):a.enterMode==CKEDITOR.ENTER_DIV&&(b=b.replace(/<(\/)?p>/g,"\x3c$1div\x3e"));return b}function d(a){a.data.preventDefault();a.data.$.dataTransfer.dropEffect="none"}function h(b){var c=CKEDITOR.plugins.clipboard;b.on("contentDom",function(){function d(c,e,f){e.select();a(b,{dataTransfer:f,method:"drop"},1);f.sourceEditor.fire("saveSnapshot");f.sourceEditor.editable().extractHtmlFromRange(c);f.sourceEditor.getSelection().selectRanges([c]);f.sourceEditor.fire("saveSnapshot")}
function e(d,f){d.select();a(b,{dataTransfer:f,method:"drop"},1);c.resetDragDataTransfer()}function f(a,c,d){var e={$:a.data.$,target:a.data.getTarget()};c&&(e.dragRange=c);d&&(e.dropRange=d);!1===b.fire(a.name,e)&&a.data.preventDefault()}function h(a){a.type!=CKEDITOR.NODE_ELEMENT&&(a=a.getParent());return a.getChildCount()}var k=b.editable(),l=CKEDITOR.plugins.clipboard.getDropTarget(b),m=b.ui.space("top"),A=b.ui.space("bottom");c.preventDefaultDropOnElement(m);c.preventDefaultDropOnElement(A);
k.attachListener(l,"dragstart",f);k.attachListener(b,"dragstart",c.resetDragDataTransfer,c,null,1);k.attachListener(b,"dragstart",function(a){c.initDragDataTransfer(a,b)},null,null,2);k.attachListener(b,"dragstart",function(){var a=c.dragRange=b.getSelection().getRanges()[0];CKEDITOR.env.ie&&10>CKEDITOR.env.version&&(c.dragStartContainerChildCount=a?h(a.startContainer):null,c.dragEndContainerChildCount=a?h(a.endContainer):null)},null,null,100);k.attachListener(l,"dragend",f);k.attachListener(b,"dragend",
c.initDragDataTransfer,c,null,1);k.attachListener(b,"dragend",c.resetDragDataTransfer,c,null,100);k.attachListener(l,"dragover",function(a){if(CKEDITOR.env.edge)a.data.preventDefault();else{var b=a.data.getTarget();b&&b.is&&b.is("html")?a.data.preventDefault():CKEDITOR.env.ie&&CKEDITOR.plugins.clipboard.isFileApiSupported&&a.data.$.dataTransfer.types.contains("Files")&&a.data.preventDefault()}});k.attachListener(l,"drop",function(a){if(!a.data.$.defaultPrevented){a.data.preventDefault();var d=a.data.getTarget();
if(!d.isReadOnly()||d.type==CKEDITOR.NODE_ELEMENT&&d.is("html")){var d=c.getRangeAtDropPosition(a,b),e=c.dragRange;d&&f(a,e,d)}}},null,null,9999);k.attachListener(b,"drop",c.initDragDataTransfer,c,null,1);k.attachListener(b,"drop",function(a){if(a=a.data){var f=a.dropRange,h=a.dragRange,k=a.dataTransfer;k.getTransferType(b)==CKEDITOR.DATA_TRANSFER_INTERNAL?setTimeout(function(){c.internalDrop(h,f,k,b)},0):k.getTransferType(b)==CKEDITOR.DATA_TRANSFER_CROSS_EDITORS?d(h,f,k):e(f,k)}},null,null,9999)})}
CKEDITOR.plugins.add("clipboard",{requires:"notification,toolbar",init:function(a){var d,k=e();a.config.forcePasteAsPlainText?d="plain-text":a.config.pasteFilter?d=a.config.pasteFilter:!CKEDITOR.env.webkit||"pasteFilter"in a.config||(d="semantic-content");a.pasteFilter=k.get(d);f(a);h(a);if(CKEDITOR.env.gecko){var l=["image/png","image/jpeg","image/gif"],C;a.on("paste",function(b){var c=b.data,d=c.dataTransfer;if(!c.dataValue&&"paste"==c.method&&d&&1==d.getFilesCount()&&C!=d.id&&(d=d.getFile(0),-1!=
CKEDITOR.tools.indexOf(l,d.type))){var e=new FileReader;e.addEventListener("load",function(){b.data.dataValue='\x3cimg src\x3d"'+e.result+'" /\x3e';a.fire("paste",b.data)},!1);e.addEventListener("abort",function(){a.fire("paste",b.data)},!1);e.addEventListener("error",function(){a.fire("paste",b.data)},!1);e.readAsDataURL(d);C=c.dataTransfer.id;b.stop()}},null,null,1)}a.on("paste",function(b){b.data.dataTransfer||(b.data.dataTransfer=new CKEDITOR.plugins.clipboard.dataTransfer);if(!b.data.dataValue){var c=
b.data.dataTransfer,d=c.getData("text/html");if(d)b.data.dataValue=d,b.data.type="html";else if(d=c.getData("text/plain"))b.data.dataValue=a.editable().transformPlainTextToHtml(d),b.data.type="text"}},null,null,1);a.on("paste",function(a){var b=a.data.dataValue,c=CKEDITOR.dtd.$block;-1<b.indexOf("Apple-")&&(b=b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi," "),"html"!=a.data.type&&(b=b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi,function(a,b){return b.replace(/\t/g,
"\x26nbsp;\x26nbsp; \x26nbsp;")})),-1<b.indexOf('\x3cbr class\x3d"Apple-interchange-newline"\x3e')&&(a.data.startsWithEOL=1,a.data.preSniffing="html",b=b.replace(/<br class="Apple-interchange-newline">/,"")),b=b.replace(/(<[^>]+) class="Apple-[^"]*"/gi,"$1"));if(b.match(/^<[^<]+cke_(editable|contents)/i)){var d,e,f=new CKEDITOR.dom.element("div");for(f.setHtml(b);1==f.getChildCount()&&(d=f.getFirst())&&d.type==CKEDITOR.NODE_ELEMENT&&(d.hasClass("cke_editable")||d.hasClass("cke_contents"));)f=e=d;
e&&(b=e.getHtml().replace(/<br>$/i,""))}CKEDITOR.env.ie?b=b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g,function(b,d){return d.toLowerCase()in c?(a.data.preSniffing="html","\x3c"+d):b}):CKEDITOR.env.webkit?b=b.replace(/<\/(\w+)><div><br><\/div>$/,function(b,d){return d in c?(a.data.endsWithEOL=1,"\x3c/"+d+"\x3e"):b}):CKEDITOR.env.gecko&&(b=b.replace(/(\s)<br>$/,"$1"));a.data.dataValue=b},null,null,3);a.on("paste",function(d){d=d.data;var e=a._.nextPasteType||d.type,f=d.dataValue,h,l=a.config.clipboard_defaultContentType||
"html",n=d.dataTransfer.getTransferType(a);h="html"==e||"html"==d.preSniffing?"html":b(f);delete a._.nextPasteType;"htmlifiedtext"==h&&(f=c(a.config,f));"text"==e&&"html"==h?f=m(a,f,k.get("plain-text")):n==CKEDITOR.DATA_TRANSFER_EXTERNAL&&a.pasteFilter&&!d.dontFilter&&(f=m(a,f,a.pasteFilter));d.startsWithEOL&&(f='\x3cbr data-cke-eol\x3d"1"\x3e'+f);d.endsWithEOL&&(f+='\x3cbr data-cke-eol\x3d"1"\x3e');"auto"==e&&(e="html"==h||"html"==l?"html":"text");d.type=e;d.dataValue=f;delete d.preSniffing;delete d.startsWithEOL;
delete d.endsWithEOL},null,null,6);a.on("paste",function(b){b=b.data;b.dataValue&&(a.insertHtml(b.dataValue,b.type,b.range),setTimeout(function(){a.fire("afterPaste")},0))},null,null,1E3)}});CKEDITOR.plugins.clipboard={isCustomCopyCutSupported:!CKEDITOR.env.ie&&!CKEDITOR.env.iOS,isCustomDataTypesSupported:!CKEDITOR.env.ie,isFileApiSupported:!CKEDITOR.env.ie||9<CKEDITOR.env.version,mainPasteEvent:CKEDITOR.env.ie&&!CKEDITOR.env.edge?"beforepaste":"paste",canClipboardApiBeTrusted:function(a,b){return a.getTransferType(b)!=
CKEDITOR.DATA_TRANSFER_EXTERNAL||CKEDITOR.env.chrome&&!a.isEmpty()||CKEDITOR.env.gecko&&(a.getData("text/html")||a.getFilesCount())||CKEDITOR.env.safari&&603<=CKEDITOR.env.version&&!CKEDITOR.env.iOS?!0:!1},getDropTarget:function(a){var b=a.editable();return CKEDITOR.env.ie&&9>CKEDITOR.env.version||b.isInline()?b:a.document},fixSplitNodesAfterDrop:function(a,b,c,d){function e(a,c,d){var f=a;f.type==CKEDITOR.NODE_TEXT&&(f=a.getParent());if(f.equals(c)&&d!=c.getChildCount())return a=b.startContainer.getChild(b.startOffset-
1),c=b.startContainer.getChild(b.startOffset),a&&a.type==CKEDITOR.NODE_TEXT&&c&&c.type==CKEDITOR.NODE_TEXT&&(d=a.getLength(),a.setText(a.getText()+c.getText()),c.remove(),b.setStart(a,d),b.collapse(!0)),!0}var f=b.startContainer;"number"==typeof d&&"number"==typeof c&&f.type==CKEDITOR.NODE_ELEMENT&&(e(a.startContainer,f,c)||e(a.endContainer,f,d))},isDropRangeAffectedByDragRange:function(a,b){var c=b.startContainer,d=b.endOffset;return a.endContainer.equals(c)&&a.endOffset<=d||a.startContainer.getParent().equals(c)&&
a.startContainer.getIndex()<d||a.endContainer.getParent().equals(c)&&a.endContainer.getIndex()<d?!0:!1},internalDrop:function(b,c,d,e){var f=CKEDITOR.plugins.clipboard,h=e.editable(),k,l;e.fire("saveSnapshot");e.fire("lockSnapshot",{dontUpdate:1});CKEDITOR.env.ie&&10>CKEDITOR.env.version&&this.fixSplitNodesAfterDrop(b,c,f.dragStartContainerChildCount,f.dragEndContainerChildCount);(l=this.isDropRangeAffectedByDragRange(b,c))||(k=b.createBookmark(!1));f=c.clone().createBookmark(!1);l&&(k=b.createBookmark(!1));
b=k.startNode;c=k.endNode;l=f.startNode;c&&b.getPosition(l)&CKEDITOR.POSITION_PRECEDING&&c.getPosition(l)&CKEDITOR.POSITION_FOLLOWING&&l.insertBefore(b);b=e.createRange();b.moveToBookmark(k);h.extractHtmlFromRange(b,1);c=e.createRange();c.moveToBookmark(f);a(e,{dataTransfer:d,method:"drop",range:c},1);e.fire("unlockSnapshot")},getRangeAtDropPosition:function(a,b){var c=a.data.$,d=c.clientX,e=c.clientY,f=b.getSelection(!0).getRanges()[0],h=b.createRange();if(a.data.testRange)return a.data.testRange;
if(document.caretRangeFromPoint&&b.document.$.caretRangeFromPoint(d,e))c=b.document.$.caretRangeFromPoint(d,e),h.setStart(CKEDITOR.dom.node(c.startContainer),c.startOffset),h.collapse(!0);else if(c.rangeParent)h.setStart(CKEDITOR.dom.node(c.rangeParent),c.rangeOffset),h.collapse(!0);else{if(CKEDITOR.env.ie&&8<CKEDITOR.env.version&&f&&b.editable().hasFocus)return f;if(document.body.createTextRange){b.focus();c=b.document.getBody().$.createTextRange();try{for(var k=!1,l=0;20>l&&!k;l++){if(!k)try{c.moveToPoint(d,
e-l),k=!0}catch(m){}if(!k)try{c.moveToPoint(d,e+l),k=!0}catch(t){}}if(k){var y="cke-temp-"+(new Date).getTime();c.pasteHTML('\x3cspan id\x3d"'+y+'"\x3e​\x3c/span\x3e');var v=b.document.getById(y);h.moveToPosition(v,CKEDITOR.POSITION_BEFORE_START);v.remove()}else{var z=b.document.$.elementFromPoint(d,e),B=new CKEDITOR.dom.element(z),H;if(B.equals(b.editable())||"html"==B.getName())return f&&f.startContainer&&!f.startContainer.equals(b.editable())?f:null;H=B.getClientRect();d<H.left?h.setStartAt(B,
CKEDITOR.POSITION_AFTER_START):h.setStartAt(B,CKEDITOR.POSITION_BEFORE_END);h.collapse(!0)}}catch(G){return null}}else return null}return h},initDragDataTransfer:function(a,b){var c=a.data.$?a.data.$.dataTransfer:null,d=new this.dataTransfer(c,b);c?this.dragData&&d.id==this.dragData.id?d=this.dragData:this.dragData=d:this.dragData?d=this.dragData:this.dragData=d;a.data.dataTransfer=d},resetDragDataTransfer:function(){this.dragData=null},initPasteDataTransfer:function(a,b){if(this.isCustomCopyCutSupported){if(a&&
a.data&&a.data.$){var c=new this.dataTransfer(a.data.$.clipboardData,b);this.copyCutData&&c.id==this.copyCutData.id?(c=this.copyCutData,c.$=a.data.$.clipboardData):this.copyCutData=c;return c}return new this.dataTransfer(null,b)}return new this.dataTransfer(CKEDITOR.env.edge&&a&&a.data.$&&a.data.$.clipboardData||null,b)},preventDefaultDropOnElement:function(a){a&&a.on("dragover",d)}};var l=CKEDITOR.plugins.clipboard.isCustomDataTypesSupported?"cke/id":"Text";CKEDITOR.plugins.clipboard.dataTransfer=
function(a,b){a&&(this.$=a);this._={metaRegExp:/^<meta.*?>/i,bodyRegExp:/<body(?:[\s\S]*?)>([\s\S]*)<\/body>/i,fragmentRegExp:/\x3c!--(?:Start|End)Fragment--\x3e/g,data:{},files:[],normalizeType:function(a){a=a.toLowerCase();return"text"==a||"text/plain"==a?"Text":"url"==a?"URL":a}};this.id=this.getData(l);this.id||(this.id="Text"==l?"":"cke-"+CKEDITOR.tools.getUniqueId());if("Text"!=l)try{this.$.setData(l,this.id)}catch(c){}b&&(this.sourceEditor=b,this.setData("text/html",b.getSelectedHtml(1)),"Text"==
l||this.getData("text/plain")||this.setData("text/plain",b.getSelection().getSelectedText()))};CKEDITOR.DATA_TRANSFER_INTERNAL=1;CKEDITOR.DATA_TRANSFER_CROSS_EDITORS=2;CKEDITOR.DATA_TRANSFER_EXTERNAL=3;CKEDITOR.plugins.clipboard.dataTransfer.prototype={getData:function(a,b){a=this._.normalizeType(a);var c=this._.data[a],d;if(void 0===c||null===c||""===c)try{c=this.$.getData(a)}catch(e){}if(void 0===c||null===c||""===c)c="";"text/html"!=a||b?"Text"==a&&CKEDITOR.env.gecko&&this.getFilesCount()&&"file://"==
c.substring(0,7)&&(c=""):(c=c.replace(this._.metaRegExp,""),(d=this._.bodyRegExp.exec(c))&&d.length&&(c=d[1],c=c.replace(this._.fragmentRegExp,"")));"string"===typeof c&&(d=c.indexOf("\x3c/html\x3e"),c=-1!==d?c.substring(0,d+7):c);return c},setData:function(a,b){a=this._.normalizeType(a);this._.data[a]=b;if(CKEDITOR.plugins.clipboard.isCustomDataTypesSupported||"URL"==a||"Text"==a){"Text"==l&&"Text"==a&&(this.id=b);try{this.$.setData(a,b)}catch(c){}}},getTransferType:function(a){return this.sourceEditor?
this.sourceEditor==a?CKEDITOR.DATA_TRANSFER_INTERNAL:CKEDITOR.DATA_TRANSFER_CROSS_EDITORS:CKEDITOR.DATA_TRANSFER_EXTERNAL},cacheData:function(){function a(c){c=b._.normalizeType(c);var d=b.getData(c,!0);d&&(b._.data[c]=d)}if(this.$){var b=this,c,d;if(CKEDITOR.plugins.clipboard.isCustomDataTypesSupported){if(this.$.types)for(c=0;c<this.$.types.length;c++)a(this.$.types[c])}else a("Text"),a("URL");d=this._getImageFromClipboard();if(this.$&&this.$.files||d){this._.files=[];if(this.$.files&&this.$.files.length)for(c=
0;c<this.$.files.length;c++)this._.files.push(this.$.files[c]);0===this._.files.length&&d&&this._.files.push(d)}}},getFilesCount:function(){return this._.files.length?this._.files.length:this.$&&this.$.files&&this.$.files.length?this.$.files.length:this._getImageFromClipboard()?1:0},getFile:function(a){return this._.files.length?this._.files[a]:this.$&&this.$.files&&this.$.files.length?this.$.files[a]:0===a?this._getImageFromClipboard():void 0},isEmpty:function(){var a={},b;if(this.getFilesCount())return!1;
for(b in this._.data)a[b]=1;if(this.$)if(CKEDITOR.plugins.clipboard.isCustomDataTypesSupported){if(this.$.types)for(var c=0;c<this.$.types.length;c++)a[this.$.types[c]]=1}else a.Text=1,a.URL=1;"Text"!=l&&(a[l]=0);for(b in a)if(a[b]&&""!==this.getData(b))return!1;return!0},_getImageFromClipboard:function(){var a;if(this.$&&this.$.items&&this.$.items[0])try{if((a=this.$.items[0].getAsFile())&&a.type)return a}catch(b){}}}}(),CKEDITOR.config.clipboard_notificationDuration=1E4,function(){CKEDITOR.plugins.add("panel",
{beforeInit:function(a){a.ui.addHandler(CKEDITOR.UI_PANEL,CKEDITOR.ui.panel.handler)}});CKEDITOR.UI_PANEL="panel";CKEDITOR.ui.panel=function(a,b){b&&CKEDITOR.tools.extend(this,b);CKEDITOR.tools.extend(this,{className:"",css:[]});this.id=CKEDITOR.tools.getNextId();this.document=a;this.isFramed=this.forceIFrame||this.css.length;this._={blocks:{}}};CKEDITOR.ui.panel.handler={create:function(a){return new CKEDITOR.ui.panel(a)}};var a=CKEDITOR.addTemplate("panel",'\x3cdiv lang\x3d"{langCode}" id\x3d"{id}" dir\x3d{dir} class\x3d"cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}" style\x3d"z-index:{z-index}" role\x3d"presentation"\x3e{frame}\x3c/div\x3e'),
f=CKEDITOR.addTemplate("panel-frame",'\x3ciframe id\x3d"{id}" class\x3d"cke_panel_frame" role\x3d"presentation" frameborder\x3d"0" src\x3d"{src}"\x3e\x3c/iframe\x3e'),b=CKEDITOR.addTemplate("panel-frame-inner",'\x3c!DOCTYPE html\x3e\x3chtml class\x3d"cke_panel_container {env}" dir\x3d"{dir}" lang\x3d"{langCode}"\x3e\x3chead\x3e{css}\x3c/head\x3e\x3cbody class\x3d"cke_{dir}" style\x3d"margin:0;padding:0" onload\x3d"{onload}"\x3e\x3c/body\x3e\x3c/html\x3e');CKEDITOR.ui.panel.prototype={render:function(c,
e){this.getHolderElement=function(){var a=this._.holder;if(!a){if(this.isFramed){var a=this.document.getById(this.id+"_frame"),c=a.getParent(),a=a.getFrameDocument();CKEDITOR.env.iOS&&c.setStyles({overflow:"scroll","-webkit-overflow-scrolling":"touch"});c=CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function(){this.isLoaded=!0;if(this.onLoad)this.onLoad()},this));a.write(b.output(CKEDITOR.tools.extend({css:CKEDITOR.tools.buildStyleHtml(this.css),onload:"window.parent.CKEDITOR.tools.callFunction("+
c+");"},m)));a.getWindow().$.CKEDITOR=CKEDITOR;a.on("keydown",function(a){var b=a.data.getKeystroke(),c=this.document.getById(this.id).getAttribute("dir");this._.onKeyDown&&!1===this._.onKeyDown(b)?a.data.preventDefault():(27==b||b==("rtl"==c?39:37))&&this.onEscape&&!1===this.onEscape(b)&&a.data.preventDefault()},this);a=a.getBody();a.unselectable();CKEDITOR.env.air&&CKEDITOR.tools.callFunction(c)}else a=this.document.getById(this.id);this._.holder=a}return a};var m={editorId:c.id,id:this.id,langCode:c.langCode,
dir:c.lang.dir,cls:this.className,frame:"",env:CKEDITOR.env.cssClass,"z-index":c.config.baseFloatZIndex+1};if(this.isFramed){var k=CKEDITOR.env.air?"javascript:void(0)":CKEDITOR.env.ie?"javascript:void(function(){"+encodeURIComponent("document.open();("+CKEDITOR.tools.fixDomain+")();document.close();")+"}())":"";m.frame=f.output({id:this.id+"_frame",src:k})}k=a.output(m);e&&e.push(k);return k},addBlock:function(a,b){b=this._.blocks[a]=b instanceof CKEDITOR.ui.panel.block?b:new CKEDITOR.ui.panel.block(this.getHolderElement(),
b);this._.currentBlock||this.showBlock(a);return b},getBlock:function(a){return this._.blocks[a]},showBlock:function(a){a=this._.blocks[a];var b=this._.currentBlock,f=!this.forceIFrame||CKEDITOR.env.ie?this._.holder:this.document.getById(this.id+"_frame");b&&b.hide();this._.currentBlock=a;CKEDITOR.fire("ariaWidget",f);a._.focusIndex=-1;this._.onKeyDown=a.onKeyDown&&CKEDITOR.tools.bind(a.onKeyDown,a);a.show();return a},destroy:function(){this.element&&this.element.remove()}};CKEDITOR.ui.panel.block=
CKEDITOR.tools.createClass({$:function(a,b){this.element=a.append(a.getDocument().createElement("div",{attributes:{tabindex:-1,"class":"cke_panel_block"},styles:{display:"none"}}));b&&CKEDITOR.tools.extend(this,b);this.element.setAttributes({role:this.attributes.role||"presentation","aria-label":this.attributes["aria-label"],title:this.attributes.title||this.attributes["aria-label"]});this.keys={};this._.focusIndex=-1;this.element.disableContextMenu()},_:{markItem:function(a){-1!=a&&(a=this.element.getElementsByTag("a").getItem(this._.focusIndex=
a),CKEDITOR.env.webkit&&a.getDocument().getWindow().focus(),a.focus(),this.onMark&&this.onMark(a))},markFirstDisplayed:function(a){for(var b=function(a){return a.type==CKEDITOR.NODE_ELEMENT&&"none"==a.getStyle("display")},f=this._.getItems(),k,d,h=f.count()-1;0<=h;h--)if(k=f.getItem(h),k.getAscendant(b)||(d=k,this._.focusIndex=h),"true"==k.getAttribute("aria-selected")){d=k;this._.focusIndex=h;break}d&&(a&&a(),CKEDITOR.env.webkit&&d.getDocument().getWindow().focus(),d.focus(),this.onMark&&this.onMark(d))},
getItems:function(){return this.element.getElementsByTag("a")}},proto:{show:function(){this.element.setStyle("display","")},hide:function(){this.onHide&&!0===this.onHide.call(this)||this.element.setStyle("display","none")},onKeyDown:function(a,b){var f=this.keys[a];switch(f){case "next":for(var k=this._.focusIndex,f=this.element.getElementsByTag("a"),d;d=f.getItem(++k);)if(d.getAttribute("_cke_focus")&&d.$.offsetWidth){this._.focusIndex=k;d.focus();break}return d||b?!1:(this._.focusIndex=-1,this.onKeyDown(a,
1));case "prev":k=this._.focusIndex;for(f=this.element.getElementsByTag("a");0<k&&(d=f.getItem(--k));){if(d.getAttribute("_cke_focus")&&d.$.offsetWidth){this._.focusIndex=k;d.focus();break}d=null}return d||b?!1:(this._.focusIndex=f.count(),this.onKeyDown(a,1));case "click":case "mouseup":return k=this._.focusIndex,(d=0<=k&&this.element.getElementsByTag("a").getItem(k))&&(d.$[f]?d.$[f]():d.$["on"+f]()),!1}return!0}}})}(),CKEDITOR.plugins.add("floatpanel",{requires:"panel"}),function(){function a(a,
c,e,m,k){k=CKEDITOR.tools.genKey(c.getUniqueId(),e.getUniqueId(),a.lang.dir,a.uiColor||"",m.css||"",k||"");var d=f[k];d||(d=f[k]=new CKEDITOR.ui.panel(c,m),d.element=e.append(CKEDITOR.dom.element.createFromHtml(d.render(a),c)),d.element.setStyles({display:"none",position:"absolute"}));return d}var f={};CKEDITOR.ui.floatPanel=CKEDITOR.tools.createClass({$:function(b,c,e,f){function k(){g.hide()}e.forceIFrame=1;e.toolbarRelated&&b.elementMode==CKEDITOR.ELEMENT_MODE_INLINE&&(c=CKEDITOR.document.getById("cke_"+
b.name));var d=c.getDocument();f=a(b,d,c,e,f||0);var h=f.element,l=h.getFirst(),g=this;h.disableContextMenu();this.element=h;this._={editor:b,panel:f,parentElement:c,definition:e,document:d,iframe:l,children:[],dir:b.lang.dir,showBlockParams:null};b.on("mode",k);b.on("resize",k);d.getWindow().on("resize",function(){this.reposition()},this)},proto:{addBlock:function(a,c){return this._.panel.addBlock(a,c)},addListBlock:function(a,c){return this._.panel.addListBlock(a,c)},getBlock:function(a){return this._.panel.getBlock(a)},
showBlock:function(a,c,e,f,k,d){var h=this._.panel,l=h.showBlock(a);this._.showBlockParams=[].slice.call(arguments);this.allowBlur(!1);var g=this._.editor.editable();this._.returnFocus=g.hasFocus?g:new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement);this._.hideTimeout=0;var n=this.element,g=this._.iframe,g=CKEDITOR.env.ie&&!CKEDITOR.env.edge?g:new CKEDITOR.dom.window(g.$.contentWindow),p=n.getDocument(),u=this._.parentElement.getPositionedAncestor(),C=c.getDocumentPosition(p),p=u?u.getDocumentPosition(p):
{x:0,y:0},w="rtl"==this._.dir,q=C.x+(f||0)-p.x,x=C.y+(k||0)-p.y;!w||1!=e&&4!=e?w||2!=e&&3!=e||(q+=c.$.offsetWidth-1):q+=c.$.offsetWidth;if(3==e||4==e)x+=c.$.offsetHeight-1;this._.panel._.offsetParentId=c.getId();n.setStyles({top:x+"px",left:0,display:""});n.setOpacity(0);n.getFirst().removeStyle("width");this._.editor.focusManager.add(g);this._.blurSet||(CKEDITOR.event.useCapture=!0,g.on("blur",function(a){function b(){delete this._.returnFocus;this.hide()}this.allowBlur()&&a.data.getPhase()==CKEDITOR.EVENT_PHASE_AT_TARGET&&
this.visible&&!this._.activeChild&&(CKEDITOR.env.iOS?this._.hideTimeout||(this._.hideTimeout=CKEDITOR.tools.setTimeout(b,0,this)):b.call(this))},this),g.on("focus",function(){this._.focused=!0;this.hideChild();this.allowBlur(!0)},this),CKEDITOR.env.iOS&&(g.on("touchstart",function(){clearTimeout(this._.hideTimeout)},this),g.on("touchend",function(){this._.hideTimeout=0;this.focus()},this)),CKEDITOR.event.useCapture=!1,this._.blurSet=1);h.onEscape=CKEDITOR.tools.bind(function(a){if(this.onEscape&&
!1===this.onEscape(a))return!1},this);CKEDITOR.tools.setTimeout(function(){var a=CKEDITOR.tools.bind(function(){var a=n;a.removeStyle("width");if(l.autoSize){var b=l.element.getDocument(),b=(CKEDITOR.env.webkit||CKEDITOR.env.edge?l.element:b.getBody()).$.scrollWidth;CKEDITOR.env.ie&&CKEDITOR.env.quirks&&0<b&&(b+=(a.$.offsetWidth||0)-(a.$.clientWidth||0)+3);a.setStyle("width",b+10+"px");b=l.element.$.scrollHeight;CKEDITOR.env.ie&&CKEDITOR.env.quirks&&0<b&&(b+=(a.$.offsetHeight||0)-(a.$.clientHeight||
0)+3);a.setStyle("height",b+"px");h._.currentBlock.element.setStyle("display","none").removeStyle("display")}else a.removeStyle("height");w&&(q-=n.$.offsetWidth);n.setStyle("left",q+"px");var b=h.element.getWindow(),a=n.$.getBoundingClientRect(),b=b.getViewPaneSize(),c=a.width||a.right-a.left,e=a.height||a.bottom-a.top,f=w?a.right:b.width-a.left,g=w?b.width-a.right:a.left;w?f<c&&(q=g>c?q+c:b.width>c?q-a.left:q-a.right+b.width):f<c&&(q=g>c?q-c:b.width>c?q-a.right+b.width:q-a.left);c=a.top;b.height-
a.top<e&&(x=c>e?x-e:b.height>e?x-a.bottom+b.height:x-a.top);CKEDITOR.env.ie&&(b=a=new CKEDITOR.dom.element(n.$.offsetParent),"html"==b.getName()&&(b=b.getDocument().getBody()),"rtl"==b.getComputedStyle("direction")&&(q=CKEDITOR.env.ie8Compat?q-2*n.getDocument().getDocumentElement().$.scrollLeft:q-(a.$.scrollWidth-a.$.clientWidth)));var a=n.getFirst(),k;(k=a.getCustomData("activePanel"))&&k.onHide&&k.onHide.call(this,1);a.setCustomData("activePanel",this);n.setStyles({top:x+"px",left:q+"px"});n.setOpacity(1);
d&&d()},this);h.isLoaded?a():h.onLoad=a;CKEDITOR.tools.setTimeout(function(){var a=CKEDITOR.env.webkit&&CKEDITOR.document.getWindow().getScrollPosition().y;this.focus();l.element.focus();CKEDITOR.env.webkit&&(CKEDITOR.document.getBody().$.scrollTop=a);this.allowBlur(!0);CKEDITOR.env.ie?CKEDITOR.tools.setTimeout(function(){l.markFirstDisplayed?l.markFirstDisplayed():l._.markFirstDisplayed()},0):l.markFirstDisplayed?l.markFirstDisplayed():l._.markFirstDisplayed();this._.editor.fire("panelShow",this)},
0,this)},CKEDITOR.env.air?200:0,this);this.visible=1;this.onShow&&this.onShow.call(this)},reposition:function(){var a=this._.showBlockParams;this.visible&&this._.showBlockParams&&(this.hide(),this.showBlock.apply(this,a))},focus:function(){if(CKEDITOR.env.webkit){var a=CKEDITOR.document.getActive();a&&!a.equals(this._.iframe)&&a.$.blur()}(this._.lastFocused||this._.iframe.getFrameDocument().getWindow()).focus()},blur:function(){var a=this._.iframe.getFrameDocument().getActive();a&&a.is("a")&&(this._.lastFocused=
a)},hide:function(a){if(this.visible&&(!this.onHide||!0!==this.onHide.call(this))){this.hideChild();CKEDITOR.env.gecko&&this._.iframe.getFrameDocument().$.activeElement.blur();this.element.setStyle("display","none");this.visible=0;this.element.getFirst().removeCustomData("activePanel");if(a=a&&this._.returnFocus)CKEDITOR.env.webkit&&a.type&&a.getWindow().$.focus(),a.focus();delete this._.lastFocused;this._.showBlockParams=null;this._.editor.fire("panelHide",this)}},allowBlur:function(a){var c=this._.panel;
void 0!==a&&(c.allowBlur=a);return c.allowBlur},showAsChild:function(a,c,e,f,k,d){if(this._.activeChild!=a||a._.panel._.offsetParentId!=e.getId())this.hideChild(),a.onHide=CKEDITOR.tools.bind(function(){CKEDITOR.tools.setTimeout(function(){this._.focused||this.hide()},0,this)},this),this._.activeChild=a,this._.focused=!1,a.showBlock(c,e,f,k,d),this.blur(),(CKEDITOR.env.ie7Compat||CKEDITOR.env.ie6Compat)&&setTimeout(function(){a.element.getChild(0).$.style.cssText+=""},100)},hideChild:function(a){var c=
this._.activeChild;c&&(delete c.onHide,delete this._.activeChild,c.hide(),a&&this.focus())}}});CKEDITOR.on("instanceDestroyed",function(){var a=CKEDITOR.tools.isEmpty(CKEDITOR.instances),c;for(c in f){var e=f[c];a?e.destroy():e.element.hide()}a&&(f={})})}(),CKEDITOR.plugins.add("menu",{requires:"floatpanel",beforeInit:function(a){for(var f=a.config.menu_groups.split(","),b=a._.menuGroups={},c=a._.menuItems={},e=0;e<f.length;e++)b[f[e]]=e+1;a.addMenuGroup=function(a,c){b[a]=c||100};a.addMenuItem=function(a,
e){b[e.group]&&(c[a]=new CKEDITOR.menuItem(this,a,e))};a.addMenuItems=function(a){for(var b in a)this.addMenuItem(b,a[b])};a.getMenuItem=function(a){return c[a]};a.removeMenuItem=function(a){delete c[a]}}}),function(){function a(a){a.sort(function(a,b){return a.group<b.group?-1:a.group>b.group?1:a.order<b.order?-1:a.order>b.order?1:0})}var f='\x3cspan class\x3d"cke_menuitem"\x3e\x3ca id\x3d"{id}" class\x3d"cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}" href\x3d"{href}" title\x3d"{title}" tabindex\x3d"-1" _cke_focus\x3d1 hidefocus\x3d"true" role\x3d"{role}" aria-label\x3d"{label}" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasPopup}" aria-disabled\x3d"{disabled}" {ariaChecked} draggable\x3d"false"';
CKEDITOR.env.gecko&&CKEDITOR.env.mac&&(f+=' onkeypress\x3d"return false;"');CKEDITOR.env.gecko&&(f+=' onblur\x3d"this.style.cssText \x3d this.style.cssText;" ondragstart\x3d"return false;"');var f=f+(' onmouseover\x3d"CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout\x3d"CKEDITOR.tools.callFunction({moveOutFn},{index});" '+(CKEDITOR.env.ie?'onclick\x3d"return false;" onmouseup':"onclick")+'\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;"\x3e'),b=CKEDITOR.addTemplate("menuItem",
f+'\x3cspan class\x3d"cke_menubutton_inner"\x3e\x3cspan class\x3d"cke_menubutton_icon"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{iconStyle}"\x3e\x3c/span\x3e\x3c/span\x3e\x3cspan class\x3d"cke_menubutton_label"\x3e{label}\x3c/span\x3e{shortcutHtml}{arrowHtml}\x3c/span\x3e\x3c/a\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_voice_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e\x3c/span\x3e'),c=CKEDITOR.addTemplate("menuArrow",'\x3cspan class\x3d"cke_menuarrow"\x3e\x3cspan\x3e{label}\x3c/span\x3e\x3c/span\x3e'),
e=CKEDITOR.addTemplate("menuShortcut",'\x3cspan class\x3d"cke_menubutton_label cke_menubutton_shortcut"\x3e{shortcut}\x3c/span\x3e');CKEDITOR.menu=CKEDITOR.tools.createClass({$:function(a,b){b=this._.definition=b||{};this.id=CKEDITOR.tools.getNextId();this.editor=a;this.items=[];this._.listeners=[];this._.level=b.level||1;var c=CKEDITOR.tools.extend({},b.panel,{css:[CKEDITOR.skin.getPath("editor")],level:this._.level-1,block:{}}),e=c.block.attributes=c.attributes||{};!e.role&&(e.role="menu");this._.panelDefinition=
c},_:{onShow:function(){var a=this.editor.getSelection(),b=a&&a.getStartElement(),c=this.editor.elementPath(),e=this._.listeners;this.removeAll();for(var f=0;f<e.length;f++){var g=e[f](b,a,c);if(g)for(var n in g){var p=this.editor.getMenuItem(n);!p||p.command&&!this.editor.getCommand(p.command).state||(p.state=g[n],this.add(p))}}},onClick:function(a){this.hide();if(a.onClick)a.onClick();else a.command&&this.editor.execCommand(a.command)},onEscape:function(a){var b=this.parent;b?b._.panel.hideChild(1):
27==a&&this.hide(1);return!1},onHide:function(){this.onHide&&this.onHide()},showSubMenu:function(a){var b=this._.subMenu,c=this.items[a];if(c=c.getItems&&c.getItems()){b?b.removeAll():(b=this._.subMenu=new CKEDITOR.menu(this.editor,CKEDITOR.tools.extend({},this._.definition,{level:this._.level+1},!0)),b.parent=this,b._.onClick=CKEDITOR.tools.bind(this._.onClick,this));for(var e in c){var f=this.editor.getMenuItem(e);f&&(f.state=c[e],b.add(f))}var g=this._.panel.getBlock(this.id).element.getDocument().getById(this.id+
String(a));setTimeout(function(){b.show(g,2)},0)}else this._.panel.hideChild(1)}},proto:{add:function(a){a.order||(a.order=this.items.length);this.items.push(a)},removeAll:function(){this.items=[]},show:function(b,c,d,e){if(!this.parent&&(this._.onShow(),!this.items.length))return;c=c||("rtl"==this.editor.lang.dir?2:1);var f=this.items,g=this.editor,n=this._.panel,p=this._.element;if(!n){n=this._.panel=new CKEDITOR.ui.floatPanel(this.editor,CKEDITOR.document.getBody(),this._.panelDefinition,this._.level);
n.onEscape=CKEDITOR.tools.bind(function(a){if(!1===this._.onEscape(a))return!1},this);n.onShow=function(){n._.panel.getHolderElement().getParent().addClass("cke").addClass("cke_reset_all")};n.onHide=CKEDITOR.tools.bind(function(){this._.onHide&&this._.onHide()},this);p=n.addBlock(this.id,this._.panelDefinition.block);p.autoSize=!0;var u=p.keys;u[40]="next";u[9]="next";u[38]="prev";u[CKEDITOR.SHIFT+9]="prev";u["rtl"==g.lang.dir?37:39]=CKEDITOR.env.ie?"mouseup":"click";u[32]=CKEDITOR.env.ie?"mouseup":
"click";CKEDITOR.env.ie&&(u[13]="mouseup");p=this._.element=p.element;u=p.getDocument();u.getBody().setStyle("overflow","hidden");u.getElementsByTag("html").getItem(0).setStyle("overflow","hidden");this._.itemOverFn=CKEDITOR.tools.addFunction(function(a){clearTimeout(this._.showSubTimeout);this._.showSubTimeout=CKEDITOR.tools.setTimeout(this._.showSubMenu,g.config.menu_subMenuDelay||400,this,[a])},this);this._.itemOutFn=CKEDITOR.tools.addFunction(function(){clearTimeout(this._.showSubTimeout)},this);
this._.itemClickFn=CKEDITOR.tools.addFunction(function(a){var b=this.items[a];if(b.state==CKEDITOR.TRISTATE_DISABLED)this.hide(1);else if(b.getItems)this._.showSubMenu(a);else this._.onClick(b)},this)}a(f);for(var u=g.elementPath(),u=['\x3cdiv class\x3d"cke_menu'+(u&&u.direction()!=g.lang.dir?" cke_mixed_dir_content":"")+'" role\x3d"presentation"\x3e'],C=f.length,w=C&&f[0].group,q=0;q<C;q++){var x=f[q];w!=x.group&&(u.push('\x3cdiv class\x3d"cke_menuseparator" role\x3d"separator"\x3e\x3c/div\x3e'),
w=x.group);x.render(this,q,u)}u.push("\x3c/div\x3e");p.setHtml(u.join(""));CKEDITOR.ui.fire("ready",this);this.parent?this.parent._.panel.showAsChild(n,this.id,b,c,d,e):n.showBlock(this.id,b,c,d,e);g.fire("menuShow",[n])},addListener:function(a){this._.listeners.push(a)},hide:function(a){this._.onHide&&this._.onHide();this._.panel&&this._.panel.hide(a)}}});CKEDITOR.menuItem=CKEDITOR.tools.createClass({$:function(a,b,c){CKEDITOR.tools.extend(this,c,{order:0,className:"cke_menubutton__"+b});this.group=
a._.menuGroups[this.group];this.editor=a;this.name=b},proto:{render:function(a,f,d){var h=a.id+String(f),l="undefined"==typeof this.state?CKEDITOR.TRISTATE_OFF:this.state,g="",n=this.editor,p,u,C=l==CKEDITOR.TRISTATE_ON?"on":l==CKEDITOR.TRISTATE_DISABLED?"disabled":"off";this.role in{menuitemcheckbox:1,menuitemradio:1}&&(g=' aria-checked\x3d"'+(l==CKEDITOR.TRISTATE_ON?"true":"false")+'"');var w=this.getItems,q="\x26#"+("rtl"==this.editor.lang.dir?"9668":"9658")+";",x=this.name;this.icon&&!/\./.test(this.icon)&&
(x=this.icon);this.command&&(p=n.getCommand(this.command),(p=n.getCommandKeystroke(p))&&(u=CKEDITOR.tools.keystrokeToString(n.lang.common.keyboard,p)));a={id:h,name:this.name,iconName:x,label:this.label,cls:this.className||"",state:C,hasPopup:w?"true":"false",disabled:l==CKEDITOR.TRISTATE_DISABLED,title:this.label+(u?" ("+u.display+")":""),ariaShortcut:u?n.lang.common.keyboardShortcut+" "+u.aria:"",href:"javascript:void('"+(this.label||"").replace("'")+"')",hoverFn:a._.itemOverFn,moveOutFn:a._.itemOutFn,
clickFn:a._.itemClickFn,index:f,iconStyle:CKEDITOR.skin.getIconStyle(x,"rtl"==this.editor.lang.dir,x==this.icon?null:this.icon,this.iconOffset),shortcutHtml:u?e.output({shortcut:u.display}):"",arrowHtml:w?c.output({label:q}):"",role:this.role?this.role:"menuitem",ariaChecked:g};b.output(a,d)}}})}(),CKEDITOR.config.menu_groups="clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div",
CKEDITOR.plugins.add("contextmenu",{requires:"menu",onLoad:function(){CKEDITOR.plugins.contextMenu=CKEDITOR.tools.createClass({base:CKEDITOR.menu,$:function(a){this.base.call(this,a,{panel:{className:"cke_menu_panel",attributes:{"aria-label":a.lang.contextmenu.options}}})},proto:{addTarget:function(a,f){a.on("contextmenu",function(a){a=a.data;var c=CKEDITOR.env.webkit?b:CKEDITOR.env.mac?a.$.metaKey:a.$.ctrlKey;if(!f||!c){a.preventDefault();if(CKEDITOR.env.mac&&CKEDITOR.env.webkit){var c=this.editor,
k=(new CKEDITOR.dom.elementPath(a.getTarget(),c.editable())).contains(function(a){return a.hasAttribute("contenteditable")},!0);k&&"false"==k.getAttribute("contenteditable")&&c.getSelection().fake(k)}var k=a.getTarget().getDocument(),d=a.getTarget().getDocument().getDocumentElement(),c=!k.equals(CKEDITOR.document),k=k.getWindow().getScrollPosition(),h=c?a.$.clientX:a.$.pageX||k.x+a.$.clientX,l=c?a.$.clientY:a.$.pageY||k.y+a.$.clientY;CKEDITOR.tools.setTimeout(function(){this.open(d,null,h,l)},CKEDITOR.env.ie?
200:0,this)}},this);if(CKEDITOR.env.webkit){var b,c=function(){b=0};a.on("keydown",function(a){b=CKEDITOR.env.mac?a.data.$.metaKey:a.data.$.ctrlKey});a.on("keyup",c);a.on("contextmenu",c)}},open:function(a,f,b,c){!1!==this.editor.config.enableContextMenu&&(this.editor.focus(),a=a||CKEDITOR.document.getDocumentElement(),this.editor.selectionChange(1),this.show(a,f,b,c))}}})},beforeInit:function(a){var f=a.contextMenu=new CKEDITOR.plugins.contextMenu(a);a.on("contentDom",function(){f.addTarget(a.editable(),
!1!==a.config.browserContextMenuOnCtrl)});a.addCommand("contextMenu",{exec:function(){a.contextMenu.open(a.document.getBody())}});a.setKeystroke(CKEDITOR.SHIFT+121,"contextMenu");a.setKeystroke(CKEDITOR.CTRL+CKEDITOR.SHIFT+121,"contextMenu")}}),function(){function a(a,b){function k(b){b=g.list[b];var c;b.equals(a.editable())||"true"==b.getAttribute("contenteditable")?(c=a.createRange(),c.selectNodeContents(b),c=c.select()):(c=a.getSelection(),c.selectElement(b));CKEDITOR.env.ie&&a.fire("selectionChange",
{selection:c,path:new CKEDITOR.dom.elementPath(b)});a.focus()}function d(){l&&l.setHtml('\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e');delete g.list}var h=a.ui.spaceId("path"),l,g=a._.elementsPath,n=g.idBase;b.html+='\x3cspan id\x3d"'+h+'_label" class\x3d"cke_voice_label"\x3e'+a.lang.elementspath.eleLabel+'\x3c/span\x3e\x3cspan id\x3d"'+h+'" class\x3d"cke_path" role\x3d"group" aria-labelledby\x3d"'+h+'_label"\x3e\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e\x3c/span\x3e';
a.on("uiReady",function(){var b=a.ui.space("path");b&&a.focusManager.add(b,1)});g.onClick=k;var p=CKEDITOR.tools.addFunction(k),u=CKEDITOR.tools.addFunction(function(b,c){var d=g.idBase,f;c=new CKEDITOR.dom.event(c);f="rtl"==a.lang.dir;switch(c.getKeystroke()){case f?39:37:case 9:return(f=CKEDITOR.document.getById(d+(b+1)))||(f=CKEDITOR.document.getById(d+"0")),f.focus(),!1;case f?37:39:case CKEDITOR.SHIFT+9:return(f=CKEDITOR.document.getById(d+(b-1)))||(f=CKEDITOR.document.getById(d+(g.list.length-
1))),f.focus(),!1;case 27:return a.focus(),!1;case 13:case 32:return k(b),!1}return!0});a.on("selectionChange",function(){for(var b=[],d=g.list=[],f=[],k=g.filters,m=!0,A=a.elementPath().elements,t,y=A.length;y--;){var v=A[y],z=0;t=v.data("cke-display-name")?v.data("cke-display-name"):v.data("cke-real-element-type")?v.data("cke-real-element-type"):v.getName();(m=v.hasAttribute("contenteditable")?"true"==v.getAttribute("contenteditable"):m)||v.hasAttribute("contenteditable")||(z=1);for(var B=0;B<k.length;B++){var H=
k[B](v,t);if(!1===H){z=1;break}t=H||t}z||(d.unshift(v),f.unshift(t))}d=d.length;for(k=0;k<d;k++)t=f[k],m=a.lang.elementspath.eleTitle.replace(/%1/,t),t=c.output({id:n+k,label:m,text:t,jsTitle:"javascript:void('"+t+"')",index:k,keyDownFn:u,clickFn:p}),b.unshift(t);l||(l=CKEDITOR.document.getById(h));f=l;f.setHtml(b.join("")+'\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e');a.fire("elementsPathUpdate",{space:f})});a.on("readOnly",d);a.on("contentDomUnload",d);a.addCommand("elementsPathFocus",
f.toolbarFocus);a.setKeystroke(CKEDITOR.ALT+122,"elementsPathFocus")}var f={toolbarFocus:{editorFocus:!1,readOnly:1,exec:function(a){(a=CKEDITOR.document.getById(a._.elementsPath.idBase+"0"))&&a.focus(CKEDITOR.env.ie||CKEDITOR.env.air)}}},b="";CKEDITOR.env.gecko&&CKEDITOR.env.mac&&(b+=' onkeypress\x3d"return false;"');CKEDITOR.env.gecko&&(b+=' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');var c=CKEDITOR.addTemplate("pathItem",'\x3ca id\x3d"{id}" href\x3d"{jsTitle}" tabindex\x3d"-1" class\x3d"cke_path_item" title\x3d"{label}"'+
b+' hidefocus\x3d"true"  onkeydown\x3d"return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );" onclick\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;" role\x3d"button" aria-label\x3d"{label}"\x3e{text}\x3c/a\x3e');CKEDITOR.plugins.add("elementspath",{init:function(b){b._.elementsPath={idBase:"cke_elementspath_"+CKEDITOR.tools.getNextNumber()+"_",filters:[]};b.on("uiSpace",function(c){"bottom"==c.data.space&&a(b,c.data)})}})}(),function(){function a(a,e){var m,k;e.on("refresh",
function(a){var c=[f],e;for(e in a.data.states)c.push(a.data.states[e]);this.setState(CKEDITOR.tools.search(c,b)?b:f)},e,null,100);e.on("exec",function(b){m=a.getSelection();k=m.createBookmarks(1);b.data||(b.data={});b.data.done=!1},e,null,0);e.on("exec",function(){a.forceNextSelectionCheck();m.selectBookmarks(k)},e,null,100)}var f=CKEDITOR.TRISTATE_DISABLED,b=CKEDITOR.TRISTATE_OFF;CKEDITOR.plugins.add("indent",{init:function(b){var e=CKEDITOR.plugins.indent.genericDefinition;a(b,b.addCommand("indent",
new e(!0)));a(b,b.addCommand("outdent",new e));b.ui.addButton&&(b.ui.addButton("Indent",{label:b.lang.indent.indent,command:"indent",directional:!0,toolbar:"indent,20"}),b.ui.addButton("Outdent",{label:b.lang.indent.outdent,command:"outdent",directional:!0,toolbar:"indent,10"}));b.on("dirChanged",function(a){var e=b.createRange(),d=a.data.node;e.setStartBefore(d);e.setEndAfter(d);for(var f=new CKEDITOR.dom.walker(e),l;l=f.next();)if(l.type==CKEDITOR.NODE_ELEMENT)if(!l.equals(d)&&l.getDirection())e.setStartAfter(l),
f=new CKEDITOR.dom.walker(e);else{var g=b.config.indentClasses;if(g)for(var n="ltr"==a.data.dir?["_rtl",""]:["","_rtl"],p=0;p<g.length;p++)l.hasClass(g[p]+n[0])&&(l.removeClass(g[p]+n[0]),l.addClass(g[p]+n[1]));g=l.getStyle("margin-right");n=l.getStyle("margin-left");g?l.setStyle("margin-left",g):l.removeStyle("margin-left");n?l.setStyle("margin-right",n):l.removeStyle("margin-right")}})}});CKEDITOR.plugins.indent={genericDefinition:function(a){this.isIndent=!!a;this.startDisabled=!this.isIndent},
specificDefinition:function(a,b,f){this.name=b;this.editor=a;this.jobs={};this.enterBr=a.config.enterMode==CKEDITOR.ENTER_BR;this.isIndent=!!f;this.relatedGlobal=f?"indent":"outdent";this.indentKey=f?9:CKEDITOR.SHIFT+9;this.database={}},registerCommands:function(a,b){a.on("pluginsLoaded",function(){for(var a in b)(function(a,b){var c=a.getCommand(b.relatedGlobal),e;for(e in b.jobs)c.on("exec",function(c){c.data.done||(a.fire("lockSnapshot"),b.execJob(a,e)&&(c.data.done=!0),a.fire("unlockSnapshot"),
CKEDITOR.dom.element.clearAllMarkers(b.database))},this,null,e),c.on("refresh",function(c){c.data.states||(c.data.states={});c.data.states[b.name+"@"+e]=b.refreshJob(a,e,c.data.path)},this,null,e);a.addFeature(b)})(this,b[a])})}};CKEDITOR.plugins.indent.genericDefinition.prototype={context:"p",exec:function(){}};CKEDITOR.plugins.indent.specificDefinition.prototype={execJob:function(a,b){var m=this.jobs[b];if(m.state!=f)return m.exec.call(this,a)},refreshJob:function(a,b,m){b=this.jobs[b];a.activeFilter.checkFeature(this)?
b.state=b.refresh.call(this,a,m):b.state=f;return b.state},getContext:function(a){return a.contains(this.context)}}}(),function(){function a(a){function c(f){for(var h=m.startContainer,r=m.endContainer;h&&!h.getParent().equals(f);)h=h.getParent();for(;r&&!r.getParent().equals(f);)r=r.getParent();if(!h||!r)return!1;for(var A=h,h=[],t=!1;!t;)A.equals(r)&&(t=!0),h.push(A),A=A.getNext();if(1>h.length)return!1;A=f.getParents(!0);for(r=0;r<A.length;r++)if(A[r].getName&&k[A[r].getName()]){f=A[r];break}for(var A=
e.isIndent?1:-1,r=h[0],h=h[h.length-1],t=CKEDITOR.plugins.list.listToArray(f,g),y=t[h.getCustomData("listarray_index")].indent,r=r.getCustomData("listarray_index");r<=h.getCustomData("listarray_index");r++)if(t[r].indent+=A,0<A){var v=t[r].parent;t[r].parent=new CKEDITOR.dom.element(v.getName(),v.getDocument())}for(r=h.getCustomData("listarray_index")+1;r<t.length&&t[r].indent>y;r++)t[r].indent+=A;h=CKEDITOR.plugins.list.arrayToList(t,g,null,a.config.enterMode,f.getDirection());if(!e.isIndent){var z;
if((z=f.getParent())&&z.is("li"))for(var A=h.listNode.getChildren(),B=[],C,r=A.count()-1;0<=r;r--)(C=A.getItem(r))&&C.is&&C.is("li")&&B.push(C)}h&&h.listNode.replace(f);if(B&&B.length)for(r=0;r<B.length;r++){for(C=f=B[r];(C=C.getNext())&&C.is&&C.getName()in k;)CKEDITOR.env.needsNbspFiller&&!f.getFirst(b)&&f.append(m.document.createText(" ")),f.append(C);f.insertAfter(z)}h&&a.fire("contentDomInvalidated");return!0}for(var e=this,g=this.database,k=this.context,m,u=a.getSelection(),u=(u&&u.getRanges()).createIterator();m=
u.getNextRange();){for(var C=m.getCommonAncestor();C&&(C.type!=CKEDITOR.NODE_ELEMENT||!k[C.getName()]);){if(a.editable().equals(C)){C=!1;break}C=C.getParent()}C||(C=m.startPath().contains(k))&&m.setEndAt(C,CKEDITOR.POSITION_BEFORE_END);if(!C){var w=m.getEnclosedNode();w&&w.type==CKEDITOR.NODE_ELEMENT&&w.getName()in k&&(m.setStartAt(w,CKEDITOR.POSITION_AFTER_START),m.setEndAt(w,CKEDITOR.POSITION_BEFORE_END),C=w)}C&&m.startContainer.type==CKEDITOR.NODE_ELEMENT&&m.startContainer.getName()in k&&(w=new CKEDITOR.dom.walker(m),
w.evaluator=f,m.startContainer=w.next());C&&m.endContainer.type==CKEDITOR.NODE_ELEMENT&&m.endContainer.getName()in k&&(w=new CKEDITOR.dom.walker(m),w.evaluator=f,m.endContainer=w.previous());if(C)return c(C)}return 0}function f(a){return a.type==CKEDITOR.NODE_ELEMENT&&a.is("li")}function b(a){return c(a)&&e(a)}var c=CKEDITOR.dom.walker.whitespaces(!0),e=CKEDITOR.dom.walker.bookmark(!1,!0),m=CKEDITOR.TRISTATE_DISABLED,k=CKEDITOR.TRISTATE_OFF;CKEDITOR.plugins.add("indentlist",{requires:"indent",init:function(b){function c(b){e.specificDefinition.apply(this,
arguments);this.requiredContent=["ul","ol"];b.on("key",function(a){var c=b.elementPath();if("wysiwyg"==b.mode&&a.data.keyCode==this.indentKey&&c){var d=this.getContext(c);!d||this.isIndent&&CKEDITOR.plugins.indentList.firstItemInPath(this.context,c,d)||(b.execCommand(this.relatedGlobal),a.cancel())}},this);this.jobs[this.isIndent?10:30]={refresh:this.isIndent?function(a,b){var c=this.getContext(b),d=CKEDITOR.plugins.indentList.firstItemInPath(this.context,b,c);return c&&this.isIndent&&!d?k:m}:function(a,
b){return!this.getContext(b)||this.isIndent?m:k},exec:CKEDITOR.tools.bind(a,this)}}var e=CKEDITOR.plugins.indent;e.registerCommands(b,{indentlist:new c(b,"indentlist",!0),outdentlist:new c(b,"outdentlist")});CKEDITOR.tools.extend(c.prototype,e.specificDefinition.prototype,{context:{ol:1,ul:1}})}});CKEDITOR.plugins.indentList={};CKEDITOR.plugins.indentList.firstItemInPath=function(a,b,c){var e=b.contains(f);c||(c=b.contains(a));return c&&e&&e.equals(c.getFirst(f))}}(),function(){function a(a,b,c){function d(c){if(!(!(l=
k[c?"getFirst":"getLast"]())||l.is&&l.isBlockBoundary()||!(m=b.root[c?"getPrevious":"getNext"](CKEDITOR.dom.walker.invisible(!0)))||m.is&&m.isBlockBoundary({br:1})))a.document.createElement("br")[c?"insertBefore":"insertAfter"](l)}for(var e=CKEDITOR.plugins.list.listToArray(b.root,c),f=[],g=0;g<b.contents.length;g++){var h=b.contents[g];(h=h.getAscendant("li",!0))&&!h.getCustomData("list_item_processed")&&(f.push(h),CKEDITOR.dom.element.setMarker(c,h,"list_item_processed",!0))}h=null;for(g=0;g<f.length;g++)h=
f[g].getCustomData("listarray_index"),e[h].indent=-1;for(g=h+1;g<e.length;g++)if(e[g].indent>e[g-1].indent+1){f=e[g-1].indent+1-e[g].indent;for(h=e[g].indent;e[g]&&e[g].indent>=h;)e[g].indent+=f,g++;g--}var k=CKEDITOR.plugins.list.arrayToList(e,c,null,a.config.enterMode,b.root.getAttribute("dir")).listNode,l,m;d(!0);d();k.replace(b.root);a.fire("contentDomInvalidated")}function f(a,b){this.name=a;this.context=this.type=b;this.allowedContent=b+" li";this.requiredContent=b}function b(a,b,c,d){for(var e,
f;e=a[d?"getLast":"getFirst"](u);)(f=e.getDirection(1))!==b.getDirection(1)&&e.setAttribute("dir",f),e.remove(),c?e[d?"insertBefore":"insertAfter"](c):b.append(e,d)}function c(a){function c(d){var e=a[d?"getPrevious":"getNext"](g);e&&e.type==CKEDITOR.NODE_ELEMENT&&e.is(a.getName())&&(b(a,e,null,!d),a.remove(),a=e)}c();c(1)}function e(a){return a.type==CKEDITOR.NODE_ELEMENT&&(a.getName()in CKEDITOR.dtd.$block||a.getName()in CKEDITOR.dtd.$listItem)&&CKEDITOR.dtd[a.getName()]["#"]}function m(a,d,e){a.fire("saveSnapshot");
e.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS);var f=e.extractContents();d.trim(!1,!0);var h=d.createBookmark(),l=new CKEDITOR.dom.elementPath(d.startContainer),m=l.block,l=l.lastElement.getAscendant("li",1)||m,y=new CKEDITOR.dom.elementPath(e.startContainer),v=y.contains(CKEDITOR.dtd.$listItem),y=y.contains(CKEDITOR.dtd.$list);m?(m=m.getBogus())&&m.remove():y&&(m=y.getPrevious(g))&&n(m)&&m.remove();(m=f.getLast())&&m.type==CKEDITOR.NODE_ELEMENT&&m.is("br")&&m.remove();(m=d.startContainer.getChild(d.startOffset))?
f.insertBefore(m):d.startContainer.append(f);v&&(f=k(v))&&(l.contains(v)?(b(f,v.getParent(),v),f.remove()):l.append(f));for(;e.checkStartOfBlock()&&e.checkEndOfBlock();){y=e.startPath();f=y.block;if(!f)break;f.is("li")&&(l=f.getParent(),f.equals(l.getLast(g))&&f.equals(l.getFirst(g))&&(f=l));e.moveToPosition(f,CKEDITOR.POSITION_BEFORE_START);f.remove()}e=e.clone();f=a.editable();e.setEndAt(f,CKEDITOR.POSITION_BEFORE_END);e=new CKEDITOR.dom.walker(e);e.evaluator=function(a){return g(a)&&!n(a)};(e=
e.next())&&e.type==CKEDITOR.NODE_ELEMENT&&e.getName()in CKEDITOR.dtd.$list&&c(e);d.moveToBookmark(h);d.select();a.fire("saveSnapshot")}function k(a){return(a=a.getLast(g))&&a.type==CKEDITOR.NODE_ELEMENT&&a.getName()in d?a:null}var d={ol:1,ul:1},h=CKEDITOR.dom.walker.whitespaces(),l=CKEDITOR.dom.walker.bookmark(),g=function(a){return!(h(a)||l(a))},n=CKEDITOR.dom.walker.bogus();CKEDITOR.plugins.list={listToArray:function(a,b,c,e,f){if(!d[a.getName()])return[];e||(e=0);c||(c=[]);for(var g=0,h=a.getChildCount();g<
h;g++){var k=a.getChild(g);k.type==CKEDITOR.NODE_ELEMENT&&k.getName()in CKEDITOR.dtd.$list&&CKEDITOR.plugins.list.listToArray(k,b,c,e+1);if("li"==k.$.nodeName.toLowerCase()){var l={parent:a,indent:e,element:k,contents:[]};f?l.grandparent=f:(l.grandparent=a.getParent(),l.grandparent&&"li"==l.grandparent.$.nodeName.toLowerCase()&&(l.grandparent=l.grandparent.getParent()));b&&CKEDITOR.dom.element.setMarker(b,k,"listarray_index",c.length);c.push(l);for(var m=0,n=k.getChildCount(),p;m<n;m++)p=k.getChild(m),
p.type==CKEDITOR.NODE_ELEMENT&&d[p.getName()]?CKEDITOR.plugins.list.listToArray(p,b,c,e+1,l.grandparent):l.contents.push(p)}}return c},arrayToList:function(a,b,c,e,f){c||(c=0);if(!a||a.length<c+1)return null;for(var h,k=a[c].parent.getDocument(),m=new CKEDITOR.dom.documentFragment(k),n=null,z=c,B=Math.max(a[c].indent,0),p=null,u,E,I=e==CKEDITOR.ENTER_P?"p":"div";;){var F=a[z];h=F.grandparent;u=F.element.getDirection(1);if(F.indent==B){n&&a[z].parent.getName()==n.getName()||(n=a[z].parent.clone(!1,
1),f&&n.setAttribute("dir",f),m.append(n));p=n.append(F.element.clone(0,1));u!=n.getDirection(1)&&p.setAttribute("dir",u);for(h=0;h<F.contents.length;h++)p.append(F.contents[h].clone(1,1));z++}else if(F.indent==Math.max(B,0)+1)F=a[z-1].element.getDirection(1),z=CKEDITOR.plugins.list.arrayToList(a,null,z,e,F!=u?u:null),!p.getChildCount()&&CKEDITOR.env.needsNbspFiller&&7>=k.$.documentMode&&p.append(k.createText(" ")),p.append(z.listNode),z=z.nextIndex;else if(-1==F.indent&&!c&&h){d[h.getName()]?(p=
F.element.clone(!1,!0),u!=h.getDirection(1)&&p.setAttribute("dir",u)):p=new CKEDITOR.dom.documentFragment(k);var n=h.getDirection(1)!=u,K=F.element,J=K.getAttribute("class"),D=K.getAttribute("style"),Q=p.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT&&(e!=CKEDITOR.ENTER_BR||n||D||J),N,R=F.contents.length,L;for(h=0;h<R;h++)if(N=F.contents[h],l(N)&&1<R)Q?L=N.clone(1,1):p.append(N.clone(1,1));else if(N.type==CKEDITOR.NODE_ELEMENT&&N.isBlockBoundary()){n&&!N.getDirection()&&N.setAttribute("dir",u);E=N;var U=K.getAttribute("style");
U&&E.setAttribute("style",U.replace(/([^;])$/,"$1;")+(E.getAttribute("style")||""));J&&N.addClass(J);E=null;L&&(p.append(L),L=null);p.append(N.clone(1,1))}else Q?(E||(E=k.createElement(I),p.append(E),n&&E.setAttribute("dir",u)),D&&E.setAttribute("style",D),J&&E.setAttribute("class",J),L&&(E.append(L),L=null),E.append(N.clone(1,1))):p.append(N.clone(1,1));L&&((E||p).append(L),L=null);p.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT&&z!=a.length-1&&(CKEDITOR.env.needsBrFiller&&(u=p.getLast())&&u.type==CKEDITOR.NODE_ELEMENT&&
u.is("br")&&u.remove(),(u=p.getLast(g))&&u.type==CKEDITOR.NODE_ELEMENT&&u.is(CKEDITOR.dtd.$block)||p.append(k.createElement("br")));u=p.$.nodeName.toLowerCase();"div"!=u&&"p"!=u||p.appendBogus();m.append(p);n=null;z++}else return null;E=null;if(a.length<=z||Math.max(a[z].indent,0)<B)break}if(b)for(a=m.getFirst();a;){if(a.type==CKEDITOR.NODE_ELEMENT&&(CKEDITOR.dom.element.clearMarkers(b,a),a.getName()in CKEDITOR.dtd.$listItem&&(c=a,k=f=e=void 0,e=c.getDirection()))){for(f=c.getParent();f&&!(k=f.getDirection());)f=
f.getParent();e==k&&c.removeAttribute("dir")}a=a.getNextSourceNode()}return{listNode:m,nextIndex:z}}};var p=/^h[1-6]$/,u=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT);f.prototype={exec:function(b){this.refresh(b,b.elementPath());var e=b.config,f=b.getSelection(),h=f&&f.getRanges();if(this.state==CKEDITOR.TRISTATE_OFF){var k=b.editable();if(k.getFirst(g)){var l=1==h.length&&h[0];(e=l&&l.getEnclosedNode())&&e.is&&this.type==e.getName()&&this.setState(CKEDITOR.TRISTATE_ON)}else e.enterMode==CKEDITOR.ENTER_BR?
k.appendBogus():h[0].fixBlock(1,e.enterMode==CKEDITOR.ENTER_P?"p":"div"),f.selectRanges(h)}for(var e=f.createBookmarks(!0),k=[],m={},h=h.createIterator(),n=0;(l=h.getNextRange())&&++n;){var v=l.getBoundaryNodes(),z=v.startNode,B=v.endNode;z.type==CKEDITOR.NODE_ELEMENT&&"td"==z.getName()&&l.setStartAt(v.startNode,CKEDITOR.POSITION_AFTER_START);B.type==CKEDITOR.NODE_ELEMENT&&"td"==B.getName()&&l.setEndAt(v.endNode,CKEDITOR.POSITION_BEFORE_END);l=l.createIterator();for(l.forceBrBreak=this.state==CKEDITOR.TRISTATE_OFF;v=
l.getNextParagraph();)if(!v.getCustomData("list_block")){CKEDITOR.dom.element.setMarker(m,v,"list_block",1);for(var u=b.elementPath(v),z=u.elements,B=0,u=u.blockLimit,G,E=z.length-1;0<=E&&(G=z[E]);E--)if(d[G.getName()]&&u.contains(G)){u.removeCustomData("list_group_object_"+n);(z=G.getCustomData("list_group_object"))?z.contents.push(v):(z={root:G,contents:[v]},k.push(z),CKEDITOR.dom.element.setMarker(m,G,"list_group_object",z));B=1;break}B||(B=u,B.getCustomData("list_group_object_"+n)?B.getCustomData("list_group_object_"+
n).contents.push(v):(z={root:B,contents:[v]},CKEDITOR.dom.element.setMarker(m,B,"list_group_object_"+n,z),k.push(z)))}}for(G=[];0<k.length;)if(z=k.shift(),this.state==CKEDITOR.TRISTATE_OFF)if(d[z.root.getName()]){h=b;n=z;z=m;l=G;B=CKEDITOR.plugins.list.listToArray(n.root,z);u=[];for(v=0;v<n.contents.length;v++)E=n.contents[v],(E=E.getAscendant("li",!0))&&!E.getCustomData("list_item_processed")&&(u.push(E),CKEDITOR.dom.element.setMarker(z,E,"list_item_processed",!0));for(var E=n.root.getDocument(),
I=void 0,F=void 0,v=0;v<u.length;v++){var K=u[v].getCustomData("listarray_index"),I=B[K].parent;I.is(this.type)||(F=E.createElement(this.type),I.copyAttributes(F,{start:1,type:1}),F.removeStyle("list-style-type"),B[K].parent=F)}z=CKEDITOR.plugins.list.arrayToList(B,z,null,h.config.enterMode);B=void 0;u=z.listNode.getChildCount();for(v=0;v<u&&(B=z.listNode.getChild(v));v++)B.getName()==this.type&&l.push(B);z.listNode.replace(n.root);h.fire("contentDomInvalidated")}else{B=b;l=z;v=G;u=l.contents;h=l.root.getDocument();
n=[];1==u.length&&u[0].equals(l.root)&&(z=h.createElement("div"),u[0].moveChildren&&u[0].moveChildren(z),u[0].append(z),u[0]=z);l=l.contents[0].getParent();for(E=0;E<u.length;E++)l=l.getCommonAncestor(u[E].getParent());I=B.config.useComputedState;B=z=void 0;I=void 0===I||I;for(E=0;E<u.length;E++)for(F=u[E];K=F.getParent();){if(K.equals(l)){n.push(F);!B&&F.getDirection()&&(B=1);F=F.getDirection(I);null!==z&&(z=z&&z!=F?null:F);break}F=K}if(!(1>n.length)){u=n[n.length-1].getNext();E=h.createElement(this.type);
v.push(E);for(I=v=void 0;n.length;)v=n.shift(),I=h.createElement("li"),F=v,F.is("pre")||p.test(F.getName())||"false"==F.getAttribute("contenteditable")?v.appendTo(I):(v.copyAttributes(I),z&&v.getDirection()&&(I.removeStyle("direction"),I.removeAttribute("dir")),v.moveChildren(I),v.remove()),I.appendTo(E);z&&B&&E.setAttribute("dir",z);u?E.insertBefore(u):E.appendTo(l)}}else this.state==CKEDITOR.TRISTATE_ON&&d[z.root.getName()]&&a.call(this,b,z,m);for(E=0;E<G.length;E++)c(G[E]);CKEDITOR.dom.element.clearAllMarkers(m);
f.selectBookmarks(e);b.focus()},refresh:function(a,b){var c=b.contains(d,1),e=b.blockLimit||b.root;c&&e.contains(c)?this.setState(c.is(this.type)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF):this.setState(CKEDITOR.TRISTATE_OFF)}};CKEDITOR.plugins.add("list",{requires:"indentlist",init:function(a){a.blockless||(a.addCommand("numberedlist",new f("numberedlist","ol")),a.addCommand("bulletedlist",new f("bulletedlist","ul")),a.ui.addButton&&(a.ui.addButton("NumberedList",{label:a.lang.list.numberedlist,
command:"numberedlist",directional:!0,toolbar:"list,10"}),a.ui.addButton("BulletedList",{label:a.lang.list.bulletedlist,command:"bulletedlist",directional:!0,toolbar:"list,20"})),a.on("key",function(b){var c=b.data.domEvent.getKey(),f;if("wysiwyg"==a.mode&&c in{8:1,46:1}){var h=a.getSelection().getRanges()[0],l=h&&h.startPath();if(h&&h.collapsed){var t=8==c,y=a.editable(),v=new CKEDITOR.dom.walker(h.clone());v.evaluator=function(a){return g(a)&&!n(a)};v.guard=function(a,b){return!(b&&a.type==CKEDITOR.NODE_ELEMENT&&
a.is("table"))};c=h.clone();if(t){var z;(z=l.contains(d))&&h.checkBoundaryOfElement(z,CKEDITOR.START)&&(z=z.getParent())&&z.is("li")&&(z=k(z))?(f=z,z=z.getPrevious(g),c.moveToPosition(z&&n(z)?z:f,CKEDITOR.POSITION_BEFORE_START)):(v.range.setStartAt(y,CKEDITOR.POSITION_AFTER_START),v.range.setEnd(h.startContainer,h.startOffset),(z=v.previous())&&z.type==CKEDITOR.NODE_ELEMENT&&(z.getName()in d||z.is("li"))&&(z.is("li")||(v.range.selectNodeContents(z),v.reset(),v.evaluator=e,z=v.previous()),f=z,c.moveToElementEditEnd(f),
c.moveToPosition(c.endPath().block,CKEDITOR.POSITION_BEFORE_END)));if(f)m(a,c,h),b.cancel();else{var B=l.contains(d);B&&h.checkBoundaryOfElement(B,CKEDITOR.START)&&(f=B.getFirst(g),h.checkBoundaryOfElement(f,CKEDITOR.START)&&(z=B.getPrevious(g),k(f)?z&&(h.moveToElementEditEnd(z),h.select()):a.execCommand("outdent"),b.cancel()))}}else if(f=l.contains("li")){if(v.range.setEndAt(y,CKEDITOR.POSITION_BEFORE_END),t=(y=f.getLast(g))&&e(y)?y:f,l=0,(z=v.next())&&z.type==CKEDITOR.NODE_ELEMENT&&z.getName()in
d&&z.equals(y)?(l=1,z=v.next()):h.checkBoundaryOfElement(t,CKEDITOR.END)&&(l=2),l&&z){h=h.clone();h.moveToElementEditStart(z);if(1==l&&(c.optimize(),!c.startContainer.equals(f))){for(f=c.startContainer;f.is(CKEDITOR.dtd.$inline);)B=f,f=f.getParent();B&&c.moveToPosition(B,CKEDITOR.POSITION_AFTER_END)}2==l&&(c.moveToPosition(c.endPath().block,CKEDITOR.POSITION_BEFORE_END),h.endPath().block&&h.moveToPosition(h.endPath().block,CKEDITOR.POSITION_AFTER_START));m(a,c,h);b.cancel()}}else v.range.setEndAt(y,
CKEDITOR.POSITION_BEFORE_END),(z=v.next())&&z.type==CKEDITOR.NODE_ELEMENT&&z.is(d)&&(z=z.getFirst(g),l.block&&h.checkStartOfBlock()&&h.checkEndOfBlock()?(l.block.remove(),h.moveToElementEditStart(z),h.select()):k(z)?(h.moveToElementEditStart(z),h.select()):(h=h.clone(),h.moveToElementEditStart(z),m(a,c,h)),b.cancel());setTimeout(function(){a.selectionChange(1)})}}}))}})}(),function(){function a(a,b,c){c=a.config.forceEnterMode||c;if("wysiwyg"==a.mode){b||(b=a.activeEnterMode);var e=a.elementPath();
e&&!e.isContextFor("p")&&(b=CKEDITOR.ENTER_BR,c=1);a.fire("saveSnapshot");b==CKEDITOR.ENTER_BR?k(a,b,null,c):d(a,b,null,c);a.fire("saveSnapshot")}}function f(a){a=a.getSelection().getRanges(!0);for(var b=a.length-1;0<b;b--)a[b].deleteContents();return a[0]}function b(a){var b=a.startContainer.getAscendant(function(a){return a.type==CKEDITOR.NODE_ELEMENT&&"true"==a.getAttribute("contenteditable")},!0);if(a.root.equals(b))return a;b=new CKEDITOR.dom.range(b);b.moveToRange(a);return b}CKEDITOR.plugins.add("enterkey",
{init:function(b){b.addCommand("enter",{modes:{wysiwyg:1},editorFocus:!1,exec:function(b){a(b)}});b.addCommand("shiftEnter",{modes:{wysiwyg:1},editorFocus:!1,exec:function(b){a(b,b.activeShiftEnterMode,1)}});b.setKeystroke([[13,"enter"],[CKEDITOR.SHIFT+13,"shiftEnter"]])}});var c=CKEDITOR.dom.walker.whitespaces(),e=CKEDITOR.dom.walker.bookmark();CKEDITOR.plugins.enterkey={enterBlock:function(a,d,m,p){if(m=m||f(a)){m=b(m);var u=m.document,C=m.checkStartOfBlock(),w=m.checkEndOfBlock(),q=a.elementPath(m.startContainer),
x=q.block,r=d==CKEDITOR.ENTER_DIV?"div":"p",A;if(C&&w){if(x&&(x.is("li")||x.getParent().is("li"))){x.is("li")||(x=x.getParent());m=x.getParent();A=m.getParent();p=!x.hasPrevious();var t=!x.hasNext(),r=a.getSelection(),y=r.createBookmarks(),C=x.getDirection(1),w=x.getAttribute("class"),v=x.getAttribute("style"),z=A.getDirection(1)!=C;a=a.enterMode!=CKEDITOR.ENTER_BR||z||v||w;if(A.is("li"))p||t?(p&&t&&m.remove(),x[t?"insertAfter":"insertBefore"](A)):x.breakParent(A);else{if(a)if(q.block.is("li")?(A=
u.createElement(d==CKEDITOR.ENTER_P?"p":"div"),z&&A.setAttribute("dir",C),v&&A.setAttribute("style",v),w&&A.setAttribute("class",w),x.moveChildren(A)):A=q.block,p||t)A[p?"insertBefore":"insertAfter"](m);else x.breakParent(m),A.insertAfter(m);else if(x.appendBogus(!0),p||t)for(;u=x[p?"getFirst":"getLast"]();)u[p?"insertBefore":"insertAfter"](m);else for(x.breakParent(m);u=x.getLast();)u.insertAfter(m);x.remove()}r.selectBookmarks(y);return}if(x&&x.getParent().is("blockquote")){x.breakParent(x.getParent());
x.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1))||x.getPrevious().remove();x.getNext().getFirst(CKEDITOR.dom.walker.invisible(1))||x.getNext().remove();m.moveToElementEditStart(x);m.select();return}}else if(x&&x.is("pre")&&!w){k(a,d,m,p);return}if(C=m.splitBlock(r)){d=C.previousBlock;x=C.nextBlock;q=C.wasStartOfBlock;a=C.wasEndOfBlock;x?(y=x.getParent(),y.is("li")&&(x.breakParent(y),x.move(x.getNext(),1))):d&&(y=d.getParent())&&y.is("li")&&(d.breakParent(y),y=d.getNext(),m.moveToElementEditStart(y),
d.move(d.getPrevious()));if(q||a){if(d){if(d.is("li")||!h.test(d.getName())&&!d.is("pre"))A=d.clone()}else x&&(A=x.clone());A?p&&!A.is("li")&&A.renameNode(r):y&&y.is("li")?A=y:(A=u.createElement(r),d&&(t=d.getDirection())&&A.setAttribute("dir",t));if(u=C.elementPath)for(p=0,r=u.elements.length;p<r;p++){y=u.elements[p];if(y.equals(u.block)||y.equals(u.blockLimit))break;CKEDITOR.dtd.$removeEmpty[y.getName()]&&(y=y.clone(),A.moveChildren(y),A.append(y))}A.appendBogus();A.getParent()||m.insertNode(A);
A.is("li")&&A.removeAttribute("value");!CKEDITOR.env.ie||!q||a&&d.getChildCount()||(m.moveToElementEditStart(a?d:A),m.select());m.moveToElementEditStart(q&&!a?x:A)}else x.is("li")&&(A=m.clone(),A.selectNodeContents(x),A=new CKEDITOR.dom.walker(A),A.evaluator=function(a){return!(e(a)||c(a)||a.type==CKEDITOR.NODE_ELEMENT&&a.getName()in CKEDITOR.dtd.$inline&&!(a.getName()in CKEDITOR.dtd.$empty))},(y=A.next())&&y.type==CKEDITOR.NODE_ELEMENT&&y.is("ul","ol")&&(CKEDITOR.env.needsBrFiller?u.createElement("br"):
u.createText(" ")).insertBefore(y)),x&&m.moveToElementEditStart(x);m.select();m.scrollIntoView()}}},enterBr:function(a,b,c,e){if(c=c||f(a)){var k=c.document,m=c.checkEndOfBlock(),w=new CKEDITOR.dom.elementPath(a.getSelection().getStartElement()),q=w.block,x=q&&w.block.getName();e||"li"!=x?(!e&&m&&h.test(x)?(m=q.getDirection())?(k=k.createElement("div"),k.setAttribute("dir",m),k.insertAfter(q),c.setStart(k,0)):(k.createElement("br").insertAfter(q),CKEDITOR.env.gecko&&k.createText("").insertAfter(q),
c.setStartAt(q.getNext(),CKEDITOR.env.ie?CKEDITOR.POSITION_BEFORE_START:CKEDITOR.POSITION_AFTER_START)):(a="pre"==x&&CKEDITOR.env.ie&&8>CKEDITOR.env.version?k.createText("\r"):k.createElement("br"),c.deleteContents(),c.insertNode(a),CKEDITOR.env.needsBrFiller?(k.createText("﻿").insertAfter(a),m&&(q||w.blockLimit).appendBogus(),a.getNext().$.nodeValue="",c.setStartAt(a.getNext(),CKEDITOR.POSITION_AFTER_START)):c.setStartAt(a,CKEDITOR.POSITION_AFTER_END)),c.collapse(!0),c.select(),c.scrollIntoView()):
d(a,b,c,e)}}};var m=CKEDITOR.plugins.enterkey,k=m.enterBr,d=m.enterBlock,h=/^h[1-6]$/}(),function(){function a(a,b){var c={},e=[],m={nbsp:" ",shy:"­",gt:"\x3e",lt:"\x3c",amp:"\x26",apos:"'",quot:'"'};a=a.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g,function(a,d){var f=b?"\x26"+d+";":m[d];c[f]=b?m[d]:"\x26"+d+";";e.push(f);return""});if(!b&&a){a=a.split(",");var k=document.createElement("div"),d;k.innerHTML="\x26"+a.join(";\x26")+";";d=k.innerHTML;k=null;for(k=0;k<d.length;k++){var h=d.charAt(k);
c[h]="\x26"+a[k]+";";e.push(h)}}c.regex=e.join(b?"|":"");return c}CKEDITOR.plugins.add("entities",{afterInit:function(f){function b(a){return h[a]}function c(a){return"force"!=e.entities_processNumerical&&k[a]?k[a]:"\x26#"+a.charCodeAt(0)+";"}var e=f.config;if(f=(f=f.dataProcessor)&&f.htmlFilter){var m=[];!1!==e.basicEntities&&m.push("nbsp,gt,lt,amp");e.entities&&(m.length&&m.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro"),
e.entities_latin&&m.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml"),e.entities_greek&&m.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv"),
e.entities_additional&&m.push(e.entities_additional));var k=a(m.join(",")),d=k.regex?"["+k.regex+"]":"a^";delete k.regex;e.entities&&e.entities_processNumerical&&(d="[^ -~]|"+d);var d=new RegExp(d,"g"),h=a("nbsp,gt,lt,amp,shy",!0),l=new RegExp(h.regex,"g");f.addRules({text:function(a){return a.replace(l,b).replace(d,c)}},{applyToAll:!0,excludeNestedEditable:!0})}}})}(),CKEDITOR.config.basicEntities=!0,CKEDITOR.config.entities=!0,CKEDITOR.config.entities_latin=!0,CKEDITOR.config.entities_greek=!0,
CKEDITOR.config.entities_additional="#39",CKEDITOR.plugins.add("popup"),CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{popup:function(a,f,b,c){f=f||"80%";b=b||"70%";"string"==typeof f&&1<f.length&&"%"==f.substr(f.length-1,1)&&(f=parseInt(window.screen.width*parseInt(f,10)/100,10));"string"==typeof b&&1<b.length&&"%"==b.substr(b.length-1,1)&&(b=parseInt(window.screen.height*parseInt(b,10)/100,10));640>f&&(f=640);420>b&&(b=420);var e=parseInt((window.screen.height-b)/2,10),m=parseInt((window.screen.width-
f)/2,10);c=(c||"location\x3dno,menubar\x3dno,toolbar\x3dno,dependent\x3dyes,minimizable\x3dno,modal\x3dyes,alwaysRaised\x3dyes,resizable\x3dyes,scrollbars\x3dyes")+",width\x3d"+f+",height\x3d"+b+",top\x3d"+e+",left\x3d"+m;var k=window.open("",null,c,!0);if(!k)return!1;try{-1==navigator.userAgent.toLowerCase().indexOf(" chrome/")&&(k.moveTo(m,e),k.resizeTo(f,b)),k.focus(),k.location.href=a}catch(d){window.open(a,null,c,!0)}return!0}}),function(){function a(a,b){var c=[];if(b)for(var d in b)c.push(d+
"\x3d"+encodeURIComponent(b[d]));else return a;return a+(-1!=a.indexOf("?")?"\x26":"?")+c.join("\x26")}function f(a){a+="";return a.charAt(0).toUpperCase()+a.substr(1)}function b(){var b=this.getDialog(),c=b.getParentEditor();c._.filebrowserSe=this;var d=c.config["filebrowser"+f(b.getName())+"WindowWidth"]||c.config.filebrowserWindowWidth||"80%",b=c.config["filebrowser"+f(b.getName())+"WindowHeight"]||c.config.filebrowserWindowHeight||"70%",e=this.filebrowser.params||{};e.CKEditor=c.name;e.CKEditorFuncNum=
c._.filebrowserFn;e.langCode||(e.langCode=c.langCode);e=a(this.filebrowser.url,e);c.popup(e,d,b,c.config.filebrowserWindowFeatures||c.config.fileBrowserWindowFeatures)}function c(){var a=this.getDialog();a.getParentEditor()._.filebrowserSe=this;return a.getContentElement(this["for"][0],this["for"][1]).getInputElement().$.value&&a.getContentElement(this["for"][0],this["for"][1]).getAction()?!0:!1}function e(b,c,d){var e=d.params||{};e.CKEditor=b.name;e.CKEditorFuncNum=b._.filebrowserFn;e.langCode||
(e.langCode=b.langCode);c.action=a(d.url,e);c.filebrowser=d}function m(a,d,g,k){if(k&&k.length)for(var p,u=k.length;u--;)if(p=k[u],"hbox"!=p.type&&"vbox"!=p.type&&"fieldset"!=p.type||m(a,d,g,p.children),p.filebrowser)if("string"==typeof p.filebrowser&&(p.filebrowser={action:"fileButton"==p.type?"QuickUpload":"Browse",target:p.filebrowser}),"Browse"==p.filebrowser.action){var C=p.filebrowser.url;void 0===C&&(C=a.config["filebrowser"+f(d)+"BrowseUrl"],void 0===C&&(C=a.config.filebrowserBrowseUrl));
C&&(p.onClick=b,p.filebrowser.url=C,p.hidden=!1)}else if("QuickUpload"==p.filebrowser.action&&p["for"]&&(C=p.filebrowser.url,void 0===C&&(C=a.config["filebrowser"+f(d)+"UploadUrl"],void 0===C&&(C=a.config.filebrowserUploadUrl)),C)){var w=p.onClick;p.onClick=function(a){var b=a.sender;if(w&&!1===w.call(b,a))return!1;if(c.call(b,a)){a=b.getDialog().getContentElement(this["for"][0],this["for"][1]).getInputElement();if(b=new CKEDITOR.dom.element(a.$.form))(a=b.$.elements.ckCsrfToken)?a=new CKEDITOR.dom.element(a):
(a=new CKEDITOR.dom.element("input"),a.setAttributes({name:"ckCsrfToken",type:"hidden"}),b.append(a)),a.setAttribute("value",CKEDITOR.tools.getCsrfToken());return!0}return!1};p.filebrowser.url=C;p.hidden=!1;e(a,g.getContents(p["for"][0]).get(p["for"][1]),p.filebrowser)}}function k(a,b,c){if(-1!==c.indexOf(";")){c=c.split(";");for(var d=0;d<c.length;d++)if(k(a,b,c[d]))return!0;return!1}return(a=a.getContents(b).get(c).filebrowser)&&a.url}function d(a,b){var c=this._.filebrowserSe.getDialog(),d=this._.filebrowserSe["for"],
e=this._.filebrowserSe.filebrowser.onSelect;d&&c.getContentElement(d[0],d[1]).reset();if("function"!=typeof b||!1!==b.call(this._.filebrowserSe))if(!e||!1!==e.call(this._.filebrowserSe,a,b))if("string"==typeof b&&b&&alert(b),a&&(d=this._.filebrowserSe,c=d.getDialog(),d=d.filebrowser.target||null))if(d=d.split(":"),e=c.getContentElement(d[0],d[1]))e.setValue(a),c.selectPage(d[0])}CKEDITOR.plugins.add("filebrowser",{requires:"popup",init:function(a){a._.filebrowserFn=CKEDITOR.tools.addFunction(d,a);
a.on("destroy",function(){CKEDITOR.tools.removeFunction(this._.filebrowserFn)})}});CKEDITOR.on("dialogDefinition",function(a){if(a.editor.plugins.filebrowser)for(var b=a.data.definition,c,d=0;d<b.contents.length;++d)if(c=b.contents[d])m(a.editor,a.data.name,b,c.elements),c.hidden&&c.filebrowser&&(c.hidden=!k(b,c.id,c.filebrowser))})}(),function(){function a(a){var e=a.config,m=a.fire("uiSpace",{space:"top",html:""}).html,k=function(){function d(a,c,e){h.setStyle(c,b(e));h.setStyle("position",a)}function g(a){var b=
l.getDocumentPosition();switch(a){case "top":d("absolute","top",b.y-r-y);break;case "pin":d("fixed","top",z);break;case "bottom":d("absolute","top",b.y+(q.height||q.bottom-q.top)+y)}m=a}var m,l,w,q,x,r,A,t=e.floatSpaceDockedOffsetX||0,y=e.floatSpaceDockedOffsetY||0,v=e.floatSpacePinnedOffsetX||0,z=e.floatSpacePinnedOffsetY||0;return function(d){if(l=a.editable()){var n=d&&"focus"==d.name;n&&h.show();a.fire("floatingSpaceLayout",{show:n});h.removeStyle("left");h.removeStyle("right");w=h.getClientRect();
q=l.getClientRect();x=f.getViewPaneSize();r=w.height;A="pageXOffset"in f.$?f.$.pageXOffset:CKEDITOR.document.$.documentElement.scrollLeft;m?(r+y<=q.top?g("top"):r+y>x.height-q.bottom?g("pin"):g("bottom"),d=x.width/2,d=e.floatSpacePreferRight?"right":0<q.left&&q.right<x.width&&q.width>w.width?"rtl"==e.contentsLangDirection?"right":"left":d-q.left>q.right-d?"left":"right",w.width>x.width?(d="left",n=0):(n="left"==d?0<q.left?q.left:0:q.right<x.width?x.width-q.right:0,n+w.width>x.width&&(d="left"==d?
"right":"left",n=0)),h.setStyle(d,b(("pin"==m?v:t)+n+("pin"==m?0:"left"==d?A:-A)))):(m="pin",g("pin"),k(d))}}}();if(m){var d=new CKEDITOR.template('\x3cdiv id\x3d"cke_{name}" class\x3d"cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} '+CKEDITOR.env.cssClass+'" dir\x3d"{langDir}" title\x3d"'+(CKEDITOR.env.gecko?" ":"")+'" lang\x3d"{langCode}" role\x3d"application" style\x3d"{style}"'+(a.title?' aria-labelledby\x3d"cke_{name}_arialbl"':" ")+"\x3e"+(a.title?'\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e':
" ")+'\x3cdiv class\x3d"cke_inner"\x3e\x3cdiv id\x3d"{topId}" class\x3d"cke_top" role\x3d"presentation"\x3e{content}\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e'),h=CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml(d.output({content:m,id:a.id,langDir:a.lang.dir,langCode:a.langCode,name:a.name,style:"display:none;z-index:"+(e.baseFloatZIndex-1),topId:a.ui.spaceId("top"),voiceLabel:a.title}))),l=CKEDITOR.tools.eventsBuffer(500,k),g=CKEDITOR.tools.eventsBuffer(100,k);h.unselectable();h.on("mousedown",
function(a){a=a.data;a.getTarget().hasAscendant("a",1)||a.preventDefault()});a.on("focus",function(b){k(b);a.on("change",l.input);f.on("scroll",g.input);f.on("resize",g.input)});a.on("blur",function(){h.hide();a.removeListener("change",l.input);f.removeListener("scroll",g.input);f.removeListener("resize",g.input)});a.on("destroy",function(){f.removeListener("scroll",g.input);f.removeListener("resize",g.input);h.clearCustomData();h.remove()});a.focusManager.hasFocus&&h.show();a.focusManager.add(h,
1)}}var f=CKEDITOR.document.getWindow(),b=CKEDITOR.tools.cssLength;CKEDITOR.plugins.add("floatingspace",{init:function(b){b.on("loaded",function(){a(this)},null,null,20)}})}(),CKEDITOR.plugins.add("listblock",{requires:"panel",onLoad:function(){var a=CKEDITOR.addTemplate("panel-list",'\x3cul role\x3d"presentation" class\x3d"cke_panel_list"\x3e{items}\x3c/ul\x3e'),f=CKEDITOR.addTemplate("panel-list-item",'\x3cli id\x3d"{id}" class\x3d"cke_panel_listItem" role\x3dpresentation\x3e\x3ca id\x3d"{id}_option" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"{title}" href\x3d"javascript:void(\'{val}\')"  {onclick}\x3d"CKEDITOR.tools.callFunction({clickFn},\'{val}\'); return false;" role\x3d"option"\x3e{text}\x3c/a\x3e\x3c/li\x3e'),
b=CKEDITOR.addTemplate("panel-list-group",'\x3ch1 id\x3d"{id}" class\x3d"cke_panel_grouptitle" role\x3d"presentation" \x3e{label}\x3c/h1\x3e'),c=/\'/g;CKEDITOR.ui.panel.prototype.addListBlock=function(a,b){return this.addBlock(a,new CKEDITOR.ui.listBlock(this.getHolderElement(),b))};CKEDITOR.ui.listBlock=CKEDITOR.tools.createClass({base:CKEDITOR.ui.panel.block,$:function(a,b){b=b||{};var c=b.attributes||(b.attributes={});(this.multiSelect=!!b.multiSelect)&&(c["aria-multiselectable"]=!0);!c.role&&
(c.role="listbox");this.base.apply(this,arguments);this.element.setAttribute("role",c.role);c=this.keys;c[40]="next";c[9]="next";c[38]="prev";c[CKEDITOR.SHIFT+9]="prev";c[32]=CKEDITOR.env.ie?"mouseup":"click";CKEDITOR.env.ie&&(c[13]="mouseup");this._.pendingHtml=[];this._.pendingList=[];this._.items={};this._.groups={}},_:{close:function(){if(this._.started){var b=a.output({items:this._.pendingList.join("")});this._.pendingList=[];this._.pendingHtml.push(b);delete this._.started}},getClick:function(){this._.click||
(this._.click=CKEDITOR.tools.addFunction(function(a){var b=this.toggle(a);if(this.onClick)this.onClick(a,b)},this));return this._.click}},proto:{add:function(a,b,k){var d=CKEDITOR.tools.getNextId();this._.started||(this._.started=1,this._.size=this._.size||0);this._.items[a]=d;var h;h=CKEDITOR.tools.htmlEncodeAttr(a).replace(c,"\\'");a={id:d,val:h,onclick:CKEDITOR.env.ie?'onclick\x3d"return false;" onmouseup':"onclick",clickFn:this._.getClick(),title:CKEDITOR.tools.htmlEncodeAttr(k||a),text:b||a};
this._.pendingList.push(f.output(a))},startGroup:function(a){this._.close();var c=CKEDITOR.tools.getNextId();this._.groups[a]=c;this._.pendingHtml.push(b.output({id:c,label:a}))},commit:function(){this._.close();this.element.appendHtml(this._.pendingHtml.join(""));delete this._.size;this._.pendingHtml=[]},toggle:function(a){var b=this.isMarked(a);b?this.unmark(a):this.mark(a);return!b},hideGroup:function(a){var b=(a=this.element.getDocument().getById(this._.groups[a]))&&a.getNext();a&&(a.setStyle("display",
"none"),b&&"ul"==b.getName()&&b.setStyle("display","none"))},hideItem:function(a){this.element.getDocument().getById(this._.items[a]).setStyle("display","none")},showAll:function(){var a=this._.items,b=this._.groups,c=this.element.getDocument(),d;for(d in a)c.getById(a[d]).setStyle("display","");for(var f in b)a=c.getById(b[f]),d=a.getNext(),a.setStyle("display",""),d&&"ul"==d.getName()&&d.setStyle("display","")},mark:function(a){this.multiSelect||this.unmarkAll();a=this._.items[a];var b=this.element.getDocument().getById(a);
b.addClass("cke_selected");this.element.getDocument().getById(a+"_option").setAttribute("aria-selected",!0);this.onMark&&this.onMark(b)},markFirstDisplayed:function(){var a=this;this._.markFirstDisplayed(function(){a.multiSelect||a.unmarkAll()})},unmark:function(a){var b=this.element.getDocument();a=this._.items[a];var c=b.getById(a);c.removeClass("cke_selected");b.getById(a+"_option").removeAttribute("aria-selected");this.onUnmark&&this.onUnmark(c)},unmarkAll:function(){var a=this._.items,b=this.element.getDocument(),
c;for(c in a){var d=a[c];b.getById(d).removeClass("cke_selected");b.getById(d+"_option").removeAttribute("aria-selected")}this.onUnmark&&this.onUnmark()},isMarked:function(a){return this.element.getDocument().getById(this._.items[a]).hasClass("cke_selected")},focus:function(a){this._.focusIndex=-1;var b=this.element.getElementsByTag("a"),c,d=-1;if(a)for(c=this.element.getDocument().getById(this._.items[a]).getFirst();a=b.getItem(++d);){if(a.equals(c)){this._.focusIndex=d;break}}else this.element.focus();
c&&setTimeout(function(){c.focus()},0)}}})}}),CKEDITOR.plugins.add("richcombo",{requires:"floatpanel,listblock,button",beforeInit:function(a){a.ui.addHandler(CKEDITOR.UI_RICHCOMBO,CKEDITOR.ui.richCombo.handler)}}),function(){var a='\x3cspan id\x3d"{id}" class\x3d"cke_combo cke_combo__{name} {cls}" role\x3d"presentation"\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_combo_label"\x3e{label}\x3c/span\x3e\x3ca class\x3d"cke_combo_button" title\x3d"{title}" tabindex\x3d"-1"'+(CKEDITOR.env.gecko&&!CKEDITOR.env.hc?
"":" href\x3d\"javascript:void('{titleJs}')\"")+' hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-haspopup\x3d"true"';CKEDITOR.env.gecko&&CKEDITOR.env.mac&&(a+=' onkeypress\x3d"return false;"');CKEDITOR.env.gecko&&(a+=' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');var a=a+(' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event,this);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" '+(CKEDITOR.env.ie?'onclick\x3d"return false;" onmouseup':
"onclick")+'\x3d"CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan id\x3d"{id}_text" class\x3d"cke_combo_text cke_combo_inlinelabel"\x3e{label}\x3c/span\x3e\x3cspan class\x3d"cke_combo_open"\x3e\x3cspan class\x3d"cke_combo_arrow"\x3e'+(CKEDITOR.env.hc?"\x26#9660;":CKEDITOR.env.air?"\x26nbsp;":"")+"\x3c/span\x3e\x3c/span\x3e\x3c/a\x3e\x3c/span\x3e"),f=CKEDITOR.addTemplate("combo",a);CKEDITOR.UI_RICHCOMBO="richcombo";CKEDITOR.ui.richCombo=CKEDITOR.tools.createClass({$:function(a){CKEDITOR.tools.extend(this,
a,{canGroup:!1,title:a.label,modes:{wysiwyg:1},editorFocus:1});a=this.panel||{};delete this.panel;this.id=CKEDITOR.tools.getNextNumber();this.document=a.parent&&a.parent.getDocument()||CKEDITOR.document;a.className="cke_combopanel";a.block={multiSelect:a.multiSelect,attributes:a.attributes};a.toolbarRelated=!0;this._={panelDefinition:a,items:{}}},proto:{renderHtml:function(a){var c=[];this.render(a,c);return c.join("")},render:function(a,c){function e(){if(this.getState()!=CKEDITOR.TRISTATE_ON){var c=
this.modes[a.mode]?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED;a.readOnly&&!this.readOnly&&(c=CKEDITOR.TRISTATE_DISABLED);this.setState(c);this.setValue("");c!=CKEDITOR.TRISTATE_DISABLED&&this.refresh&&this.refresh()}}var m=CKEDITOR.env,k="cke_"+this.id,d=CKEDITOR.tools.addFunction(function(c){p&&(a.unlockSelection(1),p=0);l.execute(c)},this),h=this,l={id:k,combo:this,focus:function(){CKEDITOR.document.getById(k).getChild(1).focus()},execute:function(c){var d=h._;if(d.state!=CKEDITOR.TRISTATE_DISABLED)if(h.createPanel(a),
d.on)d.panel.hide();else{h.commit();var e=h.getValue();e?d.list.mark(e):d.list.unmarkAll();d.panel.showBlock(h.id,new CKEDITOR.dom.element(c),4)}},clickFn:d};a.on("activeFilterChange",e,this);a.on("mode",e,this);a.on("selectionChange",e,this);!this.readOnly&&a.on("readOnly",e,this);var g=CKEDITOR.tools.addFunction(function(a,b){a=new CKEDITOR.dom.event(a);var c=a.getKeystroke();switch(c){case 13:case 32:case 40:CKEDITOR.tools.callFunction(d,b);break;default:l.onkey(l,c)}a.preventDefault()}),n=CKEDITOR.tools.addFunction(function(){l.onfocus&&
l.onfocus()}),p=0;l.keyDownFn=g;m={id:k,name:this.name||this.command,label:this.label,title:this.title,cls:this.className||"",titleJs:m.gecko&&!m.hc?"":(this.title||"").replace("'",""),keydownFn:g,focusFn:n,clickFn:d};f.output(m,c);if(this.onRender)this.onRender();return l},createPanel:function(a){if(!this._.panel){var c=this._.panelDefinition,e=this._.panelDefinition.block,f=c.parent||CKEDITOR.document.getBody(),k="cke_combopanel__"+this.name,d=new CKEDITOR.ui.floatPanel(a,f,c),c=d.addListBlock(this.id,
e),h=this;d.onShow=function(){this.element.addClass(k);h.setState(CKEDITOR.TRISTATE_ON);h._.on=1;h.editorFocus&&!a.focusManager.hasFocus&&a.focus();if(h.onOpen)h.onOpen()};d.onHide=function(c){this.element.removeClass(k);h.setState(h.modes&&h.modes[a.mode]?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED);h._.on=0;if(!c&&h.onClose)h.onClose()};d.onEscape=function(){d.hide(1)};c.onClick=function(a,b){h.onClick&&h.onClick.call(h,a,b);d.hide()};this._.panel=d;this._.list=c;d.getBlock(this.id).onHide=
function(){h._.on=0;h.setState(CKEDITOR.TRISTATE_OFF)};this.init&&this.init()}},setValue:function(a,c){this._.value=a;var e=this.document.getById("cke_"+this.id+"_text");e&&(a||c?e.removeClass("cke_combo_inlinelabel"):(c=this.label,e.addClass("cke_combo_inlinelabel")),e.setText("undefined"!=typeof c?c:a))},getValue:function(){return this._.value||""},unmarkAll:function(){this._.list.unmarkAll()},mark:function(a){this._.list.mark(a)},hideItem:function(a){this._.list.hideItem(a)},hideGroup:function(a){this._.list.hideGroup(a)},
showAll:function(){this._.list.showAll()},add:function(a,c,e){this._.items[a]=e||a;this._.list.add(a,c,e)},startGroup:function(a){this._.list.startGroup(a)},commit:function(){this._.committed||(this._.list.commit(),this._.committed=1,CKEDITOR.ui.fire("ready",this));this._.committed=1},setState:function(a){if(this._.state!=a){var c=this.document.getById("cke_"+this.id);c.setState(a,"cke_combo");a==CKEDITOR.TRISTATE_DISABLED?c.setAttribute("aria-disabled",!0):c.removeAttribute("aria-disabled");this._.state=
a}},getState:function(){return this._.state},enable:function(){this._.state==CKEDITOR.TRISTATE_DISABLED&&this.setState(this._.lastState)},disable:function(){this._.state!=CKEDITOR.TRISTATE_DISABLED&&(this._.lastState=this._.state,this.setState(CKEDITOR.TRISTATE_DISABLED))}},statics:{handler:{create:function(a){return new CKEDITOR.ui.richCombo(a)}}}});CKEDITOR.ui.prototype.addRichCombo=function(a,c){this.add(a,CKEDITOR.UI_RICHCOMBO,c)}}(),CKEDITOR.plugins.add("format",{requires:"richcombo",init:function(a){if(!a.blockless){for(var f=
a.config,b=a.lang.format,c=f.format_tags.split(";"),e={},m=0,k=[],d=0;d<c.length;d++){var h=c[d],l=new CKEDITOR.style(f["format_"+h]);if(!a.filter.customConfig||a.filter.check(l))m++,e[h]=l,e[h]._.enterMode=a.config.enterMode,k.push(l)}0!==m&&a.ui.addRichCombo("Format",{label:b.label,title:b.panelTitle,toolbar:"styles,20",allowedContent:k,panel:{css:[CKEDITOR.skin.getPath("editor")].concat(f.contentsCss),multiSelect:!1,attributes:{"aria-label":b.panelTitle}},init:function(){this.startGroup(b.panelTitle);
for(var a in e){var c=b["tag_"+a];this.add(a,e[a].buildPreview(c),c)}},onClick:function(b){a.focus();a.fire("saveSnapshot");b=e[b];var c=a.elementPath();a[b.checkActive(c,a)?"removeStyle":"applyStyle"](b);setTimeout(function(){a.fire("saveSnapshot")},0)},onRender:function(){a.on("selectionChange",function(b){var c=this.getValue();b=b.data.path;this.refresh();for(var d in e)if(e[d].checkActive(b,a)){d!=c&&this.setValue(d,a.lang.format["tag_"+d]);return}this.setValue("")},this)},onOpen:function(){this.showAll();
for(var b in e)a.activeFilter.check(e[b])||this.hideItem(b)},refresh:function(){var b=a.elementPath();if(b){if(b.isContextFor("p"))for(var c in e)if(a.activeFilter.check(e[c]))return;this.setState(CKEDITOR.TRISTATE_DISABLED)}}})}}}),CKEDITOR.config.format_tags="p;h1;h2;h3;h4;h5;h6;pre;address;div",CKEDITOR.config.format_p={element:"p"},CKEDITOR.config.format_div={element:"div"},CKEDITOR.config.format_pre={element:"pre"},CKEDITOR.config.format_address={element:"address"},CKEDITOR.config.format_h1=
{element:"h1"},CKEDITOR.config.format_h2={element:"h2"},CKEDITOR.config.format_h3={element:"h3"},CKEDITOR.config.format_h4={element:"h4"},CKEDITOR.config.format_h5={element:"h5"},CKEDITOR.config.format_h6={element:"h6"},function(){var a={canUndo:!1,exec:function(a){var b=a.document.createElement("hr");a.insertElement(b)},allowedContent:"hr",requiredContent:"hr"};CKEDITOR.plugins.add("horizontalrule",{init:function(f){f.blockless||(f.addCommand("horizontalrule",a),f.ui.addButton&&f.ui.addButton("HorizontalRule",
{label:f.lang.horizontalrule.toolbar,command:"horizontalrule",toolbar:"insert,40"}))}})}(),CKEDITOR.plugins.add("htmlwriter",{init:function(a){var f=new CKEDITOR.htmlWriter;f.forceSimpleAmpersand=a.config.forceSimpleAmpersand;f.indentationChars=a.config.dataIndentationChars||"\t";a.dataProcessor.writer=f}}),CKEDITOR.htmlWriter=CKEDITOR.tools.createClass({base:CKEDITOR.htmlParser.basicWriter,$:function(){this.base();this.indentationChars="\t";this.selfClosingEnd=" /\x3e";this.lineBreakChars="\n";this.sortAttributes=
1;this._.indent=0;this._.indentation="";this._.inPre=0;this._.rules={};var a=CKEDITOR.dtd,f;for(f in CKEDITOR.tools.extend({},a.$nonBodyContent,a.$block,a.$listItem,a.$tableContent))this.setRules(f,{indent:!a[f]["#"],breakBeforeOpen:1,breakBeforeClose:!a[f]["#"],breakAfterClose:1,needsSpace:f in a.$block&&!(f in{li:1,dt:1,dd:1})});this.setRules("br",{breakAfterOpen:1});this.setRules("title",{indent:0,breakAfterOpen:0});this.setRules("style",{indent:0,breakBeforeClose:1});this.setRules("pre",{breakAfterOpen:1,
indent:0})},proto:{openTag:function(a){var f=this._.rules[a];this._.afterCloser&&f&&f.needsSpace&&this._.needsSpace&&this._.output.push("\n");this._.indent?this.indentation():f&&f.breakBeforeOpen&&(this.lineBreak(),this.indentation());this._.output.push("\x3c",a);this._.afterCloser=0},openTagClose:function(a,f){var b=this._.rules[a];f?(this._.output.push(this.selfClosingEnd),b&&b.breakAfterClose&&(this._.needsSpace=b.needsSpace)):(this._.output.push("\x3e"),b&&b.indent&&(this._.indentation+=this.indentationChars));
b&&b.breakAfterOpen&&this.lineBreak();"pre"==a&&(this._.inPre=1)},attribute:function(a,f){"string"==typeof f&&(this.forceSimpleAmpersand&&(f=f.replace(/&amp;/g,"\x26")),f=CKEDITOR.tools.htmlEncodeAttr(f));this._.output.push(" ",a,'\x3d"',f,'"')},closeTag:function(a){var f=this._.rules[a];f&&f.indent&&(this._.indentation=this._.indentation.substr(this.indentationChars.length));this._.indent?this.indentation():f&&f.breakBeforeClose&&(this.lineBreak(),this.indentation());this._.output.push("\x3c/",a,
"\x3e");"pre"==a&&(this._.inPre=0);f&&f.breakAfterClose&&(this.lineBreak(),this._.needsSpace=f.needsSpace);this._.afterCloser=1},text:function(a){this._.indent&&(this.indentation(),!this._.inPre&&(a=CKEDITOR.tools.ltrim(a)));this._.output.push(a)},comment:function(a){this._.indent&&this.indentation();this._.output.push("\x3c!--",a,"--\x3e")},lineBreak:function(){!this._.inPre&&0<this._.output.length&&this._.output.push(this.lineBreakChars);this._.indent=1},indentation:function(){!this._.inPre&&this._.indentation&&
this._.output.push(this._.indentation);this._.indent=0},reset:function(){this._.output=[];this._.indent=0;this._.indentation="";this._.afterCloser=0;this._.inPre=0;this._.needsSpace=0},setRules:function(a,f){var b=this._.rules[a];b?CKEDITOR.tools.extend(b,f,!0):this._.rules[a]=f}}}),function(){function a(a,c){c||(c=a.getSelection().getSelectedElement());if(c&&c.is("img")&&!c.data("cke-realelement")&&!c.isReadOnly())return c}function f(a){var c=a.getStyle("float");if("inherit"==c||"none"==c)c=0;c||
(c=a.getAttribute("align"));return c}CKEDITOR.plugins.add("image",{requires:"dialog",init:function(b){if(!b.plugins.image2){CKEDITOR.dialog.add("image",this.path+"dialogs/image.js");var c="img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width}";CKEDITOR.dialog.isTabEnabled(b,"image","advanced")&&(c="img[alt,dir,id,lang,longdesc,!src,title]{*}(*)");b.addCommand("image",new CKEDITOR.dialogCommand("image",{allowedContent:c,requiredContent:"img[alt,src]",
contentTransformations:[["img{width}: sizeToStyle","img[width]: sizeToAttribute"],["img{float}: alignmentToStyle","img[align]: alignmentToAttribute"]]}));b.ui.addButton&&b.ui.addButton("Image",{label:b.lang.common.image,command:"image",toolbar:"insert,10"});b.on("doubleclick",function(a){var b=a.data.element;!b.is("img")||b.data("cke-realelement")||b.isReadOnly()||(a.data.dialog="image")});b.addMenuItems&&b.addMenuItems({image:{label:b.lang.image.menu,command:"image",group:"image"}});b.contextMenu&&
b.contextMenu.addListener(function(c){if(a(b,c))return{image:CKEDITOR.TRISTATE_OFF}})}},afterInit:function(b){function c(c){var m=b.getCommand("justify"+c);if(m){if("left"==c||"right"==c)m.on("exec",function(k){var d=a(b),h;d&&(h=f(d),h==c?(d.removeStyle("float"),c==f(d)&&d.removeAttribute("align")):d.setStyle("float",c),k.cancel())});m.on("refresh",function(k){var d=a(b);d&&(d=f(d),this.setState(d==c?CKEDITOR.TRISTATE_ON:"right"==c||"left"==c?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED),k.cancel())})}}
b.plugins.image2||(c("left"),c("right"),c("center"),c("block"))}})}(),CKEDITOR.config.image_removeLinkByEmptyURL=!0,function(){function a(a,b){var d=c.exec(a),e=c.exec(b);if(d){if(!d[2]&&"px"==e[2])return e[1];if("px"==d[2]&&!e[2])return e[1]+"px"}return b}var f=CKEDITOR.htmlParser.cssStyle,b=CKEDITOR.tools.cssLength,c=/^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i,e={elements:{$:function(b){var c=b.attributes;if((c=(c=(c=c&&c["data-cke-realelement"])&&new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(c)))&&
c.children[0])&&b.attributes["data-cke-resizable"]){var d=(new f(b)).rules;b=c.attributes;var e=d.width,d=d.height;e&&(b.width=a(b.width,e));d&&(b.height=a(b.height,d))}return c}}};CKEDITOR.plugins.add("fakeobjects",{init:function(a){a.filter.allow("img[!data-cke-realelement,src,alt,title](*){*}","fakeobjects")},afterInit:function(a){(a=(a=a.dataProcessor)&&a.htmlFilter)&&a.addRules(e,{applyToAll:!0})}});CKEDITOR.editor.prototype.createFakeElement=function(a,c,d,e){var l=this.lang.fakeobjects,l=l[d]||
l.unknown;c={"class":c,"data-cke-realelement":encodeURIComponent(a.getOuterHtml()),"data-cke-real-node-type":a.type,alt:l,title:l,align:a.getAttribute("align")||""};CKEDITOR.env.hc||(c.src=CKEDITOR.tools.transparentImageData);d&&(c["data-cke-real-element-type"]=d);e&&(c["data-cke-resizable"]=e,d=new f,e=a.getAttribute("width"),a=a.getAttribute("height"),e&&(d.rules.width=b(e)),a&&(d.rules.height=b(a)),d.populate(c));return this.document.createElement("img",{attributes:c})};CKEDITOR.editor.prototype.createFakeParserElement=
function(a,c,d,e){var l=this.lang.fakeobjects,l=l[d]||l.unknown,g;g=new CKEDITOR.htmlParser.basicWriter;a.writeHtml(g);g=g.getHtml();c={"class":c,"data-cke-realelement":encodeURIComponent(g),"data-cke-real-node-type":a.type,alt:l,title:l,align:a.attributes.align||""};CKEDITOR.env.hc||(c.src=CKEDITOR.tools.transparentImageData);d&&(c["data-cke-real-element-type"]=d);e&&(c["data-cke-resizable"]=e,e=a.attributes,a=new f,d=e.width,e=e.height,void 0!==d&&(a.rules.width=b(d)),void 0!==e&&(a.rules.height=
b(e)),a.populate(c));return new CKEDITOR.htmlParser.element("img",c)};CKEDITOR.editor.prototype.restoreRealElement=function(b){if(b.data("cke-real-node-type")!=CKEDITOR.NODE_ELEMENT)return null;var c=CKEDITOR.dom.element.createFromHtml(decodeURIComponent(b.data("cke-realelement")),this.document);if(b.data("cke-resizable")){var d=b.getStyle("width");b=b.getStyle("height");d&&c.setAttribute("width",a(c.getAttribute("width"),d));b&&c.setAttribute("height",a(c.getAttribute("height"),b))}return c}}(),
"use strict",function(){function a(a){return a.replace(/'/g,"\\$\x26")}function f(a){for(var b,c=a.length,d=[],e=0;e<c;e++)b=a.charCodeAt(e),d.push(b);return"String.fromCharCode("+d.join(",")+")"}function b(b,c){var d=b.plugins.link,e=d.compiledProtectionFunction.params,f,g;g=[d.compiledProtectionFunction.name,"("];for(var h=0;h<e.length;h++)d=e[h].toLowerCase(),f=c[d],0<h&&g.push(","),g.push("'",f?a(encodeURIComponent(c[d])):"","'");g.push(")");return g.join("")}function c(a){a=a.config.emailProtection||
"";var b;a&&"encode"!=a&&(b={},a.replace(/^([^(]+)\(([^)]+)\)$/,function(a,c,d){b.name=c;b.params=[];d.replace(/[^,\s]+/g,function(a){b.params.push(a)})}));return b}CKEDITOR.plugins.add("link",{requires:"dialog,fakeobjects",onLoad:function(){function a(b){return c.replace(/%1/g,"rtl"==b?"right":"left").replace(/%2/g,"cke_contents_"+b)}var b="background:url("+CKEDITOR.getUrl(this.path+"images"+(CKEDITOR.env.hidpi?"/hidpi":"")+"/anchor.png")+") no-repeat %1 center;border:1px dotted #00f;background-size:16px;",
c=".%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{"+b+"padding-%1:18px;cursor:auto;}.%2 img.cke_anchor{"+b+"width:16px;min-height:15px;height:1.15em;vertical-align:text-bottom;}";CKEDITOR.addCss(a("ltr")+a("rtl"))},init:function(a){var b="a[!href]";CKEDITOR.dialog.isTabEnabled(a,"link","advanced")&&(b=b.replace("]",",accesskey,charset,dir,id,lang,name,rel,tabindex,title,type,download]{*}(*)"));CKEDITOR.dialog.isTabEnabled(a,"link","target")&&
(b=b.replace("]",",target,onclick]"));a.addCommand("link",new CKEDITOR.dialogCommand("link",{allowedContent:b,requiredContent:"a[href]"}));a.addCommand("anchor",new CKEDITOR.dialogCommand("anchor",{allowedContent:"a[!name,id]",requiredContent:"a[name]"}));a.addCommand("unlink",new CKEDITOR.unlinkCommand);a.addCommand("removeAnchor",new CKEDITOR.removeAnchorCommand);a.setKeystroke(CKEDITOR.CTRL+76,"link");a.ui.addButton&&(a.ui.addButton("Link",{label:a.lang.link.toolbar,command:"link",toolbar:"links,10"}),
a.ui.addButton("Unlink",{label:a.lang.link.unlink,command:"unlink",toolbar:"links,20"}),a.ui.addButton("Anchor",{label:a.lang.link.anchor.toolbar,command:"anchor",toolbar:"links,30"}));CKEDITOR.dialog.add("link",this.path+"dialogs/link.js");CKEDITOR.dialog.add("anchor",this.path+"dialogs/anchor.js");a.on("doubleclick",function(b){var c=b.data.element.getAscendant({a:1,img:1},!0);c&&!c.isReadOnly()&&(c.is("a")?(b.data.dialog=!c.getAttribute("name")||c.getAttribute("href")&&c.getChildCount()?"link":
"anchor",b.data.link=c):CKEDITOR.plugins.link.tryRestoreFakeAnchor(a,c)&&(b.data.dialog="anchor"))},null,null,0);a.on("doubleclick",function(b){b.data.dialog in{link:1,anchor:1}&&b.data.link&&a.getSelection().selectElement(b.data.link)},null,null,20);a.addMenuItems&&a.addMenuItems({anchor:{label:a.lang.link.anchor.menu,command:"anchor",group:"anchor",order:1},removeAnchor:{label:a.lang.link.anchor.remove,command:"removeAnchor",group:"anchor",order:5},link:{label:a.lang.link.menu,command:"link",group:"link",
order:1},unlink:{label:a.lang.link.unlink,command:"unlink",group:"link",order:5}});a.contextMenu&&a.contextMenu.addListener(function(b){if(!b||b.isReadOnly())return null;b=CKEDITOR.plugins.link.tryRestoreFakeAnchor(a,b);if(!b&&!(b=CKEDITOR.plugins.link.getSelectedLink(a)))return null;var c={};b.getAttribute("href")&&b.getChildCount()&&(c={link:CKEDITOR.TRISTATE_OFF,unlink:CKEDITOR.TRISTATE_OFF});b&&b.hasAttribute("name")&&(c.anchor=c.removeAnchor=CKEDITOR.TRISTATE_OFF);return c});this.compiledProtectionFunction=
c(a)},afterInit:function(a){a.dataProcessor.dataFilter.addRules({elements:{a:function(b){return b.attributes.name?b.children.length?null:a.createFakeParserElement(b,"cke_anchor","anchor"):null}}});var b=a._.elementsPath&&a._.elementsPath.filters;b&&b.push(function(b,c){if("a"==c&&(CKEDITOR.plugins.link.tryRestoreFakeAnchor(a,b)||b.getAttribute("name")&&(!b.getAttribute("href")||!b.getChildCount())))return"anchor"})}});var e=/^javascript:/,m=/^mailto:([^?]+)(?:\?(.+))?$/,k=/subject=([^;?:@&=$,\/]*)/i,
d=/body=([^;?:@&=$,\/]*)/i,h=/^#(.*)$/,l=/^((?:http|https|ftp|news):\/\/)?(.*)$/,g=/^(_(?:self|top|parent|blank))$/,n=/^javascript:void\(location\.href='mailto:'\+String\.fromCharCode\(([^)]+)\)(?:\+'(.*)')?\)$/,p=/^javascript:([^(]+)\(([^)]+)\)$/,u=/\s*window.open\(\s*this\.href\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*;\s*return\s*false;*\s*/,C=/(?:^|,)([^=]+)=(\d+|yes|no)/gi,w={id:"advId",dir:"advLangDir",accessKey:"advAccessKey",name:"advName",lang:"advLangCode",tabindex:"advTabIndex",
title:"advTitle",type:"advContentType","class":"advCSSClasses",charset:"advCharset",style:"advStyles",rel:"advRel"};CKEDITOR.plugins.link={getSelectedLink:function(a,b){var c=a.getSelection(),d=c.getSelectedElement(),e=c.getRanges(),f=[],g;if(!b&&d&&d.is("a"))return d;for(d=0;d<e.length;d++)if(g=c.getRanges()[d],g.shrink(CKEDITOR.SHRINK_TEXT,!1,{skipBogus:!0}),(g=a.elementPath(g.getCommonAncestor()).contains("a",1))&&b)f.push(g);else if(g)return g;return b?f:null},getEditorAnchors:function(a){for(var b=
a.editable(),c=b.isInline()&&!a.plugins.divarea?a.document:b,b=c.getElementsByTag("a"),c=c.getElementsByTag("img"),d=[],e=0,f;f=b.getItem(e++);)(f.data("cke-saved-name")||f.hasAttribute("name"))&&d.push({name:f.data("cke-saved-name")||f.getAttribute("name"),id:f.getAttribute("id")});for(e=0;f=c.getItem(e++);)(f=this.tryRestoreFakeAnchor(a,f))&&d.push({name:f.getAttribute("name"),id:f.getAttribute("id")});return d},fakeAnchor:!0,tryRestoreFakeAnchor:function(a,b){if(b&&b.data("cke-real-element-type")&&
"anchor"==b.data("cke-real-element-type")){var c=a.restoreRealElement(b);if(c.data("cke-saved-name"))return c}},parseLinkAttributes:function(a,b){var c=b&&(b.data("cke-saved-href")||b.getAttribute("href"))||"",f=a.plugins.link.compiledProtectionFunction,t=a.config.emailProtection,y,v={};c.match(e)&&("encode"==t?c=c.replace(n,function(a,b,c){c=c||"";return"mailto:"+String.fromCharCode.apply(String,b.split(","))+c.replace(/\\'/g,"'")}):t&&c.replace(p,function(a,b,c){if(b==f.name){v.type="email";a=v.email=
{};b=/(^')|('$)/g;c=c.match(/[^,\s]+/g);for(var d=c.length,e,g,h=0;h<d;h++)e=decodeURIComponent,g=c[h].replace(b,"").replace(/\\'/g,"'"),g=e(g),e=f.params[h].toLowerCase(),a[e]=g;a.address=[a.name,a.domain].join("@")}}));if(!v.type)if(t=c.match(h))v.type="anchor",v.anchor={},v.anchor.name=v.anchor.id=t[1];else if(t=c.match(m)){y=c.match(k);c=c.match(d);v.type="email";var z=v.email={};z.address=t[1];y&&(z.subject=decodeURIComponent(y[1]));c&&(z.body=decodeURIComponent(c[1]))}else c&&(y=c.match(l))&&
(v.type="url",v.url={},v.url.protocol=y[1],v.url.url=y[2]);if(b){if(c=b.getAttribute("target"))v.target={type:c.match(g)?c:"frame",name:c};else if(c=(c=b.data("cke-pa-onclick")||b.getAttribute("onclick"))&&c.match(u))for(v.target={type:"popup",name:c[1]};t=C.exec(c[2]);)"yes"!=t[2]&&"1"!=t[2]||t[1]in{height:1,width:1,top:1,left:1}?isFinite(t[2])&&(v.target[t[1]]=t[2]):v.target[t[1]]=!0;null!==b.getAttribute("download")&&(v.download=!0);var c={},B;for(B in w)(t=b.getAttribute(B))&&(c[w[B]]=t);if(B=
b.data("cke-saved-name")||c.advName)c.advName=B;CKEDITOR.tools.isEmpty(c)||(v.advanced=c)}return v},getLinkAttributes:function(c,d){var e=c.config.emailProtection||"",g={};switch(d.type){case "url":var e=d.url&&void 0!==d.url.protocol?d.url.protocol:"http://",h=d.url&&CKEDITOR.tools.trim(d.url.url)||"";g["data-cke-saved-href"]=0===h.indexOf("/")?h:e+h;break;case "anchor":e=d.anchor&&d.anchor.id;g["data-cke-saved-href"]="#"+(d.anchor&&d.anchor.name||e||"");break;case "email":var k=d.email,h=k.address;
switch(e){case "":case "encode":var l=encodeURIComponent(k.subject||""),m=encodeURIComponent(k.body||""),k=[];l&&k.push("subject\x3d"+l);m&&k.push("body\x3d"+m);k=k.length?"?"+k.join("\x26"):"";"encode"==e?(e=["javascript:void(location.href\x3d'mailto:'+",f(h)],k&&e.push("+'",a(k),"'"),e.push(")")):e=["mailto:",h,k];break;default:e=h.split("@",2),k.name=e[0],k.domain=e[1],e=["javascript:",b(c,k)]}g["data-cke-saved-href"]=e.join("")}if(d.target)if("popup"==d.target.type){for(var e=["window.open(this.href, '",
d.target.name||"","', '"],n="resizable status location toolbar menubar fullscreen scrollbars dependent".split(" "),h=n.length,l=function(a){d.target[a]&&n.push(a+"\x3d"+d.target[a])},k=0;k<h;k++)n[k]+=d.target[n[k]]?"\x3dyes":"\x3dno";l("width");l("left");l("height");l("top");e.push(n.join(","),"'); return false;");g["data-cke-pa-onclick"]=e.join("")}else"notSet"!=d.target.type&&d.target.name&&(g.target=d.target.name);d.download&&(g.download="");if(d.advanced){for(var p in w)(e=d.advanced[w[p]])&&
(g[p]=e);g.name&&(g["data-cke-saved-name"]=g.name)}g["data-cke-saved-href"]&&(g.href=g["data-cke-saved-href"]);p={target:1,onclick:1,"data-cke-pa-onclick":1,"data-cke-saved-name":1,download:1};d.advanced&&CKEDITOR.tools.extend(p,w);for(var u in g)delete p[u];return{set:g,removed:CKEDITOR.tools.objectKeys(p)}},showDisplayTextForElement:function(a,b){var c={img:1,table:1,tbody:1,thead:1,tfoot:1,input:1,select:1,textarea:1},d=b.getSelection();return b.widgets&&b.widgets.focused||d&&1<d.getRanges().length?
!1:!a||!a.getName||!a.is(c)}};CKEDITOR.unlinkCommand=function(){};CKEDITOR.unlinkCommand.prototype={exec:function(a){if(CKEDITOR.env.ie){var b=a.getSelection().getRanges()[0],c=b.getPreviousEditableNode()&&b.getPreviousEditableNode().getAscendant("a",!0)||b.getNextEditableNode()&&b.getNextEditableNode().getAscendant("a",!0),d;b.collapsed&&c&&(d=b.createBookmark(),b.selectNodeContents(c),b.select())}c=new CKEDITOR.style({element:"a",type:CKEDITOR.STYLE_INLINE,alwaysRemoveElement:1});a.removeStyle(c);
d&&(b.moveToBookmark(d),b.select())},refresh:function(a,b){var c=b.lastElement&&b.lastElement.getAscendant("a",!0);c&&"a"==c.getName()&&c.getAttribute("href")&&c.getChildCount()?this.setState(CKEDITOR.TRISTATE_OFF):this.setState(CKEDITOR.TRISTATE_DISABLED)},contextSensitive:1,startDisabled:1,requiredContent:"a[href]",editorFocus:1};CKEDITOR.removeAnchorCommand=function(){};CKEDITOR.removeAnchorCommand.prototype={exec:function(a){var b=a.getSelection(),c=b.createBookmarks(),d;if(b&&(d=b.getSelectedElement())&&
(d.getChildCount()?d.is("a"):CKEDITOR.plugins.link.tryRestoreFakeAnchor(a,d)))d.remove(1);else if(d=CKEDITOR.plugins.link.getSelectedLink(a))d.hasAttribute("href")?(d.removeAttributes({name:1,"data-cke-saved-name":1}),d.removeClass("cke_anchor")):d.remove(1);b.selectBookmarks(c)},requiredContent:"a[name]"};CKEDITOR.tools.extend(CKEDITOR.config,{linkShowAdvancedTab:!0,linkShowTargetTab:!0})}(),"use strict",function(){function a(a,b,c){return n(b)&&n(c)&&c.equals(b.getNext(function(a){return!(Y(a)||
Z(a)||p(a))}))}function f(a){this.upper=a[0];this.lower=a[1];this.set.apply(this,a.slice(2))}function b(a){var b=a.element;if(b&&n(b)&&(b=b.getAscendant(a.triggers,!0))&&a.editable.contains(b)){var c=k(b);if("true"==c.getAttribute("contenteditable"))return b;if(c.is(a.triggers))return c}return null}function c(a,b,c){t(a,b);t(a,c);a=b.size.bottom;c=c.size.top;return a&&c?0|(a+c)/2:a||c}function e(a,b,c){return b=b[c?"getPrevious":"getNext"](function(b){return b&&b.type==CKEDITOR.NODE_TEXT&&!Y(b)||
n(b)&&!p(b)&&!g(a,b)})}function m(a,b,c){return a>b&&a<c}function k(a,b){if(a.data("cke-editable"))return null;for(b||(a=a.getParent());a&&!a.data("cke-editable");){if(a.hasAttribute("contenteditable"))return a;a=a.getParent()}return null}function d(a){var b=a.doc,c=G('\x3cspan contenteditable\x3d"false" style\x3d"'+T+"position:absolute;border-top:1px dashed "+a.boxColor+'"\x3e\x3c/span\x3e',b),d=CKEDITOR.getUrl(this.path+"images/"+(E.hidpi?"hidpi/":"")+"icon"+(a.rtl?"-rtl":"")+".png");B(c,{attach:function(){this.wrap.getParent()||
this.wrap.appendTo(a.editable,!0);return this},lineChildren:[B(G('\x3cspan title\x3d"'+a.editor.lang.magicline.title+'" contenteditable\x3d"false"\x3e\x26#8629;\x3c/span\x3e',b),{base:T+"height:17px;width:17px;"+(a.rtl?"left":"right")+":17px;background:url("+d+") center no-repeat "+a.boxColor+";cursor:pointer;"+(E.hc?"font-size: 15px;line-height:14px;border:1px solid #fff;text-align:center;":"")+(E.hidpi?"background-size: 9px 10px;":""),looks:["top:-8px; border-radius: 2px;","top:-17px; border-radius: 2px 2px 0px 0px;",
"top:-1px; border-radius: 0px 0px 2px 2px;"]}),B(G(X,b),{base:S+"left:0px;border-left-color:"+a.boxColor+";",looks:["border-width:8px 0 8px 8px;top:-8px","border-width:8px 0 0 8px;top:-8px","border-width:0 0 8px 8px;top:0px"]}),B(G(X,b),{base:S+"right:0px;border-right-color:"+a.boxColor+";",looks:["border-width:8px 8px 8px 0;top:-8px","border-width:8px 8px 0 0;top:-8px","border-width:0 8px 8px 0;top:0px"]})],detach:function(){this.wrap.getParent()&&this.wrap.remove();return this},mouseNear:function(){t(a,
this);var b=a.holdDistance,c=this.size;return c&&m(a.mouse.y,c.top-b,c.bottom+b)&&m(a.mouse.x,c.left-b,c.right+b)?!0:!1},place:function(){var b=a.view,c=a.editable,d=a.trigger,e=d.upper,f=d.lower,g=e||f,h=g.getParent(),k={};this.trigger=d;e&&t(a,e,!0);f&&t(a,f,!0);t(a,h,!0);a.inInlineMode&&y(a,!0);h.equals(c)?(k.left=b.scroll.x,k.right=-b.scroll.x,k.width=""):(k.left=g.size.left-g.size.margin.left+b.scroll.x-(a.inInlineMode?b.editable.left+b.editable.border.left:0),k.width=g.size.outerWidth+g.size.margin.left+
g.size.margin.right+b.scroll.x,k.right="");e&&f?k.top=e.size.margin.bottom===f.size.margin.top?0|e.size.bottom+e.size.margin.bottom/2:e.size.margin.bottom<f.size.margin.top?e.size.bottom+e.size.margin.bottom:e.size.bottom+e.size.margin.bottom-f.size.margin.top:e?f||(k.top=e.size.bottom+e.size.margin.bottom):k.top=f.size.top-f.size.margin.top;d.is(R)||m(k.top,b.scroll.y-15,b.scroll.y+5)?(k.top=a.inInlineMode?0:b.scroll.y,this.look(R)):d.is(L)||m(k.top,b.pane.bottom-5,b.pane.bottom+15)?(k.top=a.inInlineMode?
b.editable.height+b.editable.padding.top+b.editable.padding.bottom:b.pane.bottom-1,this.look(L)):(a.inInlineMode&&(k.top-=b.editable.top+b.editable.border.top),this.look(U));a.inInlineMode&&(k.top--,k.top+=b.editable.scroll.top,k.left+=b.editable.scroll.left);for(var l in k)k[l]=CKEDITOR.tools.cssLength(k[l]);this.setStyles(k)},look:function(a){if(this.oldLook!=a){for(var b=this.lineChildren.length,c;b--;)(c=this.lineChildren[b]).setAttribute("style",c.base+c.looks[0|a/2]);this.oldLook=a}},wrap:new H("span",
a.doc)});for(b=c.lineChildren.length;b--;)c.lineChildren[b].appendTo(c);c.look(U);c.appendTo(c.wrap);c.unselectable();c.lineChildren[0].on("mouseup",function(b){c.detach();h(a,function(b){var c=a.line.trigger;b[c.is(J)?"insertBefore":"insertAfter"](c.is(J)?c.lower:c.upper)},!0);a.editor.focus();E.ie||a.enterMode==CKEDITOR.ENTER_BR||a.hotNode.scrollIntoView();b.data.preventDefault(!0)});c.on("mousedown",function(a){a.data.preventDefault(!0)});a.line=c}function h(a,b,c){var d=new CKEDITOR.dom.range(a.doc),
e=a.editor,f;E.ie&&a.enterMode==CKEDITOR.ENTER_BR?f=a.doc.createText(ca):(f=(f=k(a.element,!0))&&f.data("cke-enter-mode")||a.enterMode,f=new H(K[f],a.doc),f.is("br")||a.doc.createText(ca).appendTo(f));c&&e.fire("saveSnapshot");b(f);d.moveToPosition(f,CKEDITOR.POSITION_AFTER_START);e.getSelection().selectRanges([d]);a.hotNode=f;c&&e.fire("saveSnapshot")}function l(a,c){return{canUndo:!0,modes:{wysiwyg:1},exec:function(){function d(b){var e=E.ie&&9>E.version?" ":ca,f=a.hotNode&&a.hotNode.getText()==
e&&a.element.equals(a.hotNode)&&a.lastCmdDirection===!!c;h(a,function(d){f&&a.hotNode&&a.hotNode.remove();d[c?"insertAfter":"insertBefore"](b);d.setAttributes({"data-cke-magicline-hot":1,"data-cke-magicline-dir":!!c});a.lastCmdDirection=!!c});E.ie||a.enterMode==CKEDITOR.ENTER_BR||a.hotNode.scrollIntoView();a.line.detach()}return function(f){f=f.getSelection().getStartElement();var g;f=f.getAscendant(P,1);if(!w(a,f)&&f&&!f.equals(a.editable)&&!f.contains(a.editable)){(g=k(f))&&"false"==g.getAttribute("contenteditable")&&
(f=g);a.element=f;g=e(a,f,!c);var h;n(g)&&g.is(a.triggers)&&g.is(O)&&(!e(a,g,!c)||(h=e(a,g,!c))&&n(h)&&h.is(a.triggers))?d(g):(h=b(a,f),n(h)&&(e(a,h,!c)?(f=e(a,h,!c))&&n(f)&&f.is(a.triggers)&&d(h):d(h)))}}}()}}function g(a,b){if(!b||b.type!=CKEDITOR.NODE_ELEMENT||!b.$)return!1;var c=a.line;return c.wrap.equals(b)||c.wrap.contains(b)}function n(a){return a&&a.type==CKEDITOR.NODE_ELEMENT&&a.$}function p(a){if(!n(a))return!1;var b;(b=u(a))||(n(a)?(b={left:1,right:1,center:1},b=!(!b[a.getComputedStyle("float")]&&
!b[a.getAttribute("align")])):b=!1);return b}function u(a){return!!{absolute:1,fixed:1}[a.getComputedStyle("position")]}function C(a,b){return n(b)?b.is(a.triggers):null}function w(a,b){if(!b)return!1;for(var c=b.getParents(1),d=c.length;d--;)for(var e=a.tabuList.length;e--;)if(c[d].hasAttribute(a.tabuList[e]))return!0;return!1}function q(a,b,c){b=b[c?"getLast":"getFirst"](function(b){return a.isRelevant(b)&&!b.is(fa)});if(!b)return!1;t(a,b);return c?b.size.top>a.mouse.y:b.size.bottom<a.mouse.y}function x(a){var b=
a.editable,c=a.mouse,d=a.view,e=a.triggerOffset;y(a);var h=c.y>(a.inInlineMode?d.editable.top+d.editable.height/2:Math.min(d.editable.height,d.pane.height)/2),b=b[h?"getLast":"getFirst"](function(a){return!(Y(a)||Z(a))});if(!b)return null;g(a,b)&&(b=a.line.wrap[h?"getPrevious":"getNext"](function(a){return!(Y(a)||Z(a))}));if(!n(b)||p(b)||!C(a,b))return null;t(a,b);return!h&&0<=b.size.top&&m(c.y,0,b.size.top+e)?(a=a.inInlineMode||0===d.scroll.y?R:U,new f([null,b,J,N,a])):h&&b.size.bottom<=d.pane.height&&
m(c.y,b.size.bottom-e,d.pane.height)?(a=a.inInlineMode||m(b.size.bottom,d.pane.height-e,d.pane.height)?L:U,new f([b,null,D,N,a])):null}function r(a){var c=a.mouse,d=a.view,g=a.triggerOffset,h=b(a);if(!h)return null;t(a,h);var g=Math.min(g,0|h.size.outerHeight/2),k=[],l,v;if(m(c.y,h.size.top-1,h.size.top+g))v=!1;else if(m(c.y,h.size.bottom-g,h.size.bottom+1))v=!0;else return null;if(p(h)||q(a,h,v)||h.getParent().is(ba))return null;var r=e(a,h,!v);if(r){if(r&&r.type==CKEDITOR.NODE_TEXT)return null;
if(n(r)){if(p(r)||!C(a,r)||r.getParent().is(ba))return null;k=[r,h][v?"reverse":"concat"]().concat([Q,N])}}else h.equals(a.editable[v?"getLast":"getFirst"](a.isRelevant))?(y(a),v&&m(c.y,h.size.bottom-g,d.pane.height)&&m(h.size.bottom,d.pane.height-g,d.pane.height)?l=L:m(c.y,0,h.size.top+g)&&(l=R)):l=U,k=[null,h][v?"reverse":"concat"]().concat([v?D:J,N,l,h.equals(a.editable[v?"getLast":"getFirst"](a.isRelevant))?v?L:R:U]);return 0 in k?new f(k):null}function A(a,b,c,d){for(var e=b.getDocumentPosition(),
f={},g={},h={},k={},l=aa.length;l--;)f[aa[l]]=parseInt(b.getComputedStyle.call(b,"border-"+aa[l]+"-width"),10)||0,h[aa[l]]=parseInt(b.getComputedStyle.call(b,"padding-"+aa[l]),10)||0,g[aa[l]]=parseInt(b.getComputedStyle.call(b,"margin-"+aa[l]),10)||0;c&&!d||v(a,d);k.top=e.y-(c?0:a.view.scroll.y);k.left=e.x-(c?0:a.view.scroll.x);k.outerWidth=b.$.offsetWidth;k.outerHeight=b.$.offsetHeight;k.height=k.outerHeight-(h.top+h.bottom+f.top+f.bottom);k.width=k.outerWidth-(h.left+h.right+f.left+f.right);k.bottom=
k.top+k.outerHeight;k.right=k.left+k.outerWidth;a.inInlineMode&&(k.scroll={top:b.$.scrollTop,left:b.$.scrollLeft});return B({border:f,padding:h,margin:g,ignoreScroll:c},k,!0)}function t(a,b,c){if(!n(b))return b.size=null;if(!b.size)b.size={};else if(b.size.ignoreScroll==c&&b.size.date>new Date-M)return null;return B(b.size,A(a,b,c),{date:+new Date},!0)}function y(a,b){a.view.editable=A(a,a.editable,b,!0)}function v(a,b){a.view||(a.view={});var c=a.view;if(!(!b&&c&&c.date>new Date-M)){var d=a.win,
c=d.getScrollPosition(),d=d.getViewPaneSize();B(a.view,{scroll:{x:c.x,y:c.y,width:a.doc.$.documentElement.scrollWidth-d.width,height:a.doc.$.documentElement.scrollHeight-d.height},pane:{width:d.width,height:d.height,bottom:d.height+c.y},date:+new Date},!0)}}function z(a,b,c,d){for(var e=d,g=d,h=0,k=!1,l=!1,m=a.view.pane.height,v=a.mouse;v.y+h<m&&0<v.y-h;){k||(k=b(e,d));l||(l=b(g,d));!k&&0<v.y-h&&(e=c(a,{x:v.x,y:v.y-h}));!l&&v.y+h<m&&(g=c(a,{x:v.x,y:v.y+h}));if(k&&l)break;h+=2}return new f([e,g,null,
null])}CKEDITOR.plugins.add("magicline",{init:function(a){var c=a.config,k=c.magicline_triggerOffset||30,m={editor:a,enterMode:c.enterMode,triggerOffset:k,holdDistance:0|k*(c.magicline_holdDistance||.5),boxColor:c.magicline_color||"#ff0000",rtl:"rtl"==c.contentsLangDirection,tabuList:["data-cke-hidden-sel"].concat(c.magicline_tabuList||[]),triggers:c.magicline_everywhere?P:{table:1,hr:1,div:1,ul:1,ol:1,dl:1,form:1,blockquote:1}},q,z,t;m.isRelevant=function(a){return n(a)&&!g(m,a)&&!p(a)};a.on("contentDom",
function(){var k=a.editable(),n=a.document,p=a.window;B(m,{editable:k,inInlineMode:k.isInline(),doc:n,win:p,hotNode:null},!0);m.boundary=m.inInlineMode?m.editable:m.doc.getDocumentElement();k.is(F.$inline)||(m.inInlineMode&&!u(k)&&k.setStyles({position:"relative",top:null,left:null}),d.call(this,m),v(m),k.attachListener(a,"beforeUndoImage",function(){m.line.detach()}),k.attachListener(a,"beforeGetData",function(){m.line.wrap.getParent()&&(m.line.detach(),a.once("getData",function(){m.line.attach()},
null,null,1E3))},null,null,0),k.attachListener(m.inInlineMode?n:n.getWindow().getFrame(),"mouseout",function(b){if("wysiwyg"==a.mode)if(m.inInlineMode){var c=b.data.$.clientX;b=b.data.$.clientY;v(m);y(m,!0);var d=m.view.editable,e=m.view.scroll;c>d.left-e.x&&c<d.right-e.x&&b>d.top-e.y&&b<d.bottom-e.y||(clearTimeout(t),t=null,m.line.detach())}else clearTimeout(t),t=null,m.line.detach()}),k.attachListener(k,"keyup",function(){m.hiddenMode=0}),k.attachListener(k,"keydown",function(b){if("wysiwyg"==a.mode)switch(b.data.getKeystroke()){case 2228240:case 16:m.hiddenMode=
1,m.line.detach()}}),k.attachListener(m.inInlineMode?k:n,"mousemove",function(b){z=!0;if("wysiwyg"==a.mode&&!a.readOnly&&!t){var c={x:b.data.$.clientX,y:b.data.$.clientY};t=setTimeout(function(){m.mouse=c;t=m.trigger=null;v(m);z&&!m.hiddenMode&&a.focusManager.hasFocus&&!m.line.mouseNear()&&(m.element=V(m,!0))&&((m.trigger=x(m)||r(m)||W(m))&&!w(m,m.trigger.upper||m.trigger.lower)?m.line.attach().place():(m.trigger=null,m.line.detach()),z=!1)},30)}}),k.attachListener(p,"scroll",function(){"wysiwyg"==
a.mode&&(m.line.detach(),E.webkit&&(m.hiddenMode=1,clearTimeout(q),q=setTimeout(function(){m.mouseDown||(m.hiddenMode=0)},50)))}),k.attachListener(I?n:p,"mousedown",function(){"wysiwyg"==a.mode&&(m.line.detach(),m.hiddenMode=1,m.mouseDown=1)}),k.attachListener(I?n:p,"mouseup",function(){m.hiddenMode=0;m.mouseDown=0}),a.addCommand("accessPreviousSpace",l(m)),a.addCommand("accessNextSpace",l(m,!0)),a.setKeystroke([[c.magicline_keystrokePrevious,"accessPreviousSpace"],[c.magicline_keystrokeNext,"accessNextSpace"]]),
a.on("loadSnapshot",function(){var b,c,d,e;for(e in{p:1,br:1,div:1})for(b=a.document.getElementsByTag(e),d=b.count();d--;)if((c=b.getItem(d)).data("cke-magicline-hot")){m.hotNode=c;m.lastCmdDirection="true"===c.data("cke-magicline-dir")?!0:!1;return}}),this.backdoor={accessFocusSpace:h,boxTrigger:f,isLine:g,getAscendantTrigger:b,getNonEmptyNeighbour:e,getSize:A,that:m,triggerEdge:r,triggerEditable:x,triggerExpand:W})},this)}});var B=CKEDITOR.tools.extend,H=CKEDITOR.dom.element,G=H.createFromHtml,
E=CKEDITOR.env,I=CKEDITOR.env.ie&&9>CKEDITOR.env.version,F=CKEDITOR.dtd,K={},J=128,D=64,Q=32,N=16,R=4,L=2,U=1,ca=" ",ba=F.$listItem,fa=F.$tableContent,O=B({},F.$nonEditable,F.$empty),P=F.$block,M=100,T="width:0px;height:0px;padding:0px;margin:0px;display:block;z-index:9999;color:#fff;position:absolute;font-size: 0px;line-height:0px;",S=T+"border-color:transparent;display:block;border-style:solid;",X="\x3cspan\x3e"+ca+"\x3c/span\x3e";K[CKEDITOR.ENTER_BR]="br";K[CKEDITOR.ENTER_P]="p";K[CKEDITOR.ENTER_DIV]=
"div";f.prototype={set:function(a,b,c){this.properties=a+b+(c||U);return this},is:function(a){return(this.properties&a)==a}};var V=function(){function a(b,c){var d=b.$.elementFromPoint(c.x,c.y);return d&&d.nodeType?new CKEDITOR.dom.element(d):null}return function(b,c,d){if(!b.mouse)return null;var e=b.doc,f=b.line.wrap;d=d||b.mouse;var h=a(e,d);c&&g(b,h)&&(f.hide(),h=a(e,d),f.show());return!h||h.type!=CKEDITOR.NODE_ELEMENT||!h.$||E.ie&&9>E.version&&!b.boundary.equals(h)&&!b.boundary.contains(h)?null:
h}}(),Y=CKEDITOR.dom.walker.whitespaces(),Z=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_COMMENT),W=function(){function b(e){var f=e.element,g,h,k;if(!n(f)||f.contains(e.editable)||f.isReadOnly())return null;k=z(e,function(a,b){return!b.equals(a)},function(a,b){return V(a,!0,b)},f);g=k.upper;h=k.lower;if(a(e,g,h))return k.set(Q,8);if(g&&f.contains(g))for(;!g.getParent().equals(f);)g=g.getParent();else g=f.getFirst(function(a){return d(e,a)});if(h&&f.contains(h))for(;!h.getParent().equals(f);)h=h.getParent();
else h=f.getLast(function(a){return d(e,a)});if(!g||!h)return null;t(e,g);t(e,h);if(!m(e.mouse.y,g.size.top,h.size.bottom))return null;for(var f=Number.MAX_VALUE,l,v,q,y;h&&!h.equals(g)&&(v=g.getNext(e.isRelevant));)l=Math.abs(c(e,g,v)-e.mouse.y),l<f&&(f=l,q=g,y=v),g=v,t(e,g);if(!q||!y||!m(e.mouse.y,q.size.top,y.size.bottom))return null;k.upper=q;k.lower=y;return k.set(Q,8)}function d(a,b){return!(b&&b.type==CKEDITOR.NODE_TEXT||Z(b)||p(b)||g(a,b)||b.type==CKEDITOR.NODE_ELEMENT&&b.$&&b.is("br"))}return function(c){var d=
b(c),e;if(e=d){e=d.upper;var f=d.lower;e=!e||!f||p(f)||p(e)||f.equals(e)||e.equals(f)||f.contains(e)||e.contains(f)?!1:C(c,e)&&C(c,f)&&a(c,e,f)?!0:!1}return e?d:null}}(),aa=["top","left","right","bottom"]}(),CKEDITOR.config.magicline_keystrokePrevious=CKEDITOR.CTRL+CKEDITOR.SHIFT+51,CKEDITOR.config.magicline_keystrokeNext=CKEDITOR.CTRL+CKEDITOR.SHIFT+52,function(){function a(a){if(!a||a.type!=CKEDITOR.NODE_ELEMENT||"form"!=a.getName())return[];for(var b=[],c=["style","className"],e=0;e<c.length;e++){var f=
a.$.elements.namedItem(c[e]);f&&(f=new CKEDITOR.dom.element(f),b.push([f,f.nextSibling]),f.remove())}return b}function f(a,b){if(a&&a.type==CKEDITOR.NODE_ELEMENT&&"form"==a.getName()&&0<b.length)for(var c=b.length-1;0<=c;c--){var e=b[c][0],f=b[c][1];f?e.insertBefore(f):e.appendTo(a)}}function b(b,c){var d=a(b),e={},l=b.$;c||(e["class"]=l.className||"",l.className="");e.inline=l.style.cssText||"";c||(l.style.cssText="position: static; overflow: visible");f(d);return e}function c(b,c){var d=a(b),e=
b.$;"class"in c&&(e.className=c["class"]);"inline"in c&&(e.style.cssText=c.inline);f(d)}function e(a){if(!a.editable().isInline()){var b=CKEDITOR.instances,c;for(c in b){var e=b[c];"wysiwyg"!=e.mode||e.readOnly||(e=e.document.getBody(),e.setAttribute("contentEditable",!1),e.setAttribute("contentEditable",!0))}a.editable().hasFocus&&(a.toolbox.focus(),a.focus())}}CKEDITOR.plugins.add("maximize",{init:function(a){function f(){var b=l.getViewPaneSize();a.resize(b.width,b.height,null,!0)}if(a.elementMode!=
CKEDITOR.ELEMENT_MODE_INLINE){var d=a.lang,h=CKEDITOR.document,l=h.getWindow(),g,n,p,u=CKEDITOR.TRISTATE_OFF;a.addCommand("maximize",{modes:{wysiwyg:!CKEDITOR.env.iOS,source:!CKEDITOR.env.iOS},readOnly:1,editorFocus:!1,exec:function(){var C=a.container.getFirst(function(a){return a.type==CKEDITOR.NODE_ELEMENT&&a.hasClass("cke_inner")}),w=a.ui.space("contents");if("wysiwyg"==a.mode){var q=a.getSelection();g=q&&q.getRanges();n=l.getScrollPosition()}else{var x=a.editable().$;g=!CKEDITOR.env.ie&&[x.selectionStart,
x.selectionEnd];n=[x.scrollLeft,x.scrollTop]}if(this.state==CKEDITOR.TRISTATE_OFF){l.on("resize",f);p=l.getScrollPosition();for(q=a.container;q=q.getParent();)q.setCustomData("maximize_saved_styles",b(q)),q.setStyle("z-index",a.config.baseFloatZIndex-5);w.setCustomData("maximize_saved_styles",b(w,!0));C.setCustomData("maximize_saved_styles",b(C,!0));w={overflow:CKEDITOR.env.webkit?"":"hidden",width:0,height:0};h.getDocumentElement().setStyles(w);!CKEDITOR.env.gecko&&h.getDocumentElement().setStyle("position",
"fixed");CKEDITOR.env.gecko&&CKEDITOR.env.quirks||h.getBody().setStyles(w);CKEDITOR.env.ie?setTimeout(function(){l.$.scrollTo(0,0)},0):l.$.scrollTo(0,0);C.setStyle("position",CKEDITOR.env.gecko&&CKEDITOR.env.quirks?"fixed":"absolute");C.$.offsetLeft;C.setStyles({"z-index":a.config.baseFloatZIndex-5,left:"0px",top:"0px"});C.addClass("cke_maximized");f();w=C.getDocumentPosition();C.setStyles({left:-1*w.x+"px",top:-1*w.y+"px"});CKEDITOR.env.gecko&&e(a)}else if(this.state==CKEDITOR.TRISTATE_ON){l.removeListener("resize",
f);for(var q=[w,C],r=0;r<q.length;r++)c(q[r],q[r].getCustomData("maximize_saved_styles")),q[r].removeCustomData("maximize_saved_styles");for(q=a.container;q=q.getParent();)c(q,q.getCustomData("maximize_saved_styles")),q.removeCustomData("maximize_saved_styles");CKEDITOR.env.ie?setTimeout(function(){l.$.scrollTo(p.x,p.y)},0):l.$.scrollTo(p.x,p.y);C.removeClass("cke_maximized");CKEDITOR.env.webkit&&(C.setStyle("display","inline"),setTimeout(function(){C.setStyle("display","block")},0));a.fire("resize",
{outerHeight:a.container.$.offsetHeight,contentsHeight:w.$.offsetHeight,outerWidth:a.container.$.offsetWidth})}this.toggleState();if(q=this.uiItems[0])w=this.state==CKEDITOR.TRISTATE_OFF?d.maximize.maximize:d.maximize.minimize,q=CKEDITOR.document.getById(q._.id),q.getChild(1).setHtml(w),q.setAttribute("title",w),q.setAttribute("href",'javascript:void("'+w+'");');"wysiwyg"==a.mode?g?(CKEDITOR.env.gecko&&e(a),a.getSelection().selectRanges(g),(x=a.getSelection().getStartElement())&&x.scrollIntoView(!0)):
l.$.scrollTo(n.x,n.y):(g&&(x.selectionStart=g[0],x.selectionEnd=g[1]),x.scrollLeft=n[0],x.scrollTop=n[1]);g=n=null;u=this.state;a.fire("maximize",this.state)},canUndo:!1});a.ui.addButton&&a.ui.addButton("Maximize",{label:d.maximize.maximize,command:"maximize",toolbar:"tools,10"});a.on("mode",function(){var b=a.getCommand("maximize");b.setState(b.state==CKEDITOR.TRISTATE_DISABLED?CKEDITOR.TRISTATE_DISABLED:u)},null,null,100)}}})}(),function(){function a(a,b,c){var e=CKEDITOR.cleanWord;e?c():(a=CKEDITOR.getUrl(a.config.pasteFromWordCleanupFile||
b+"filter/default.js"),CKEDITOR.scriptLoader.load(a,c,null,!0));return!e}CKEDITOR.plugins.add("pastefromword",{requires:"clipboard",init:function(f){var b=0,c=this.path;f.addCommand("pastefromword",{canUndo:!1,async:!0,exec:function(a,c){b=1;a.execCommand("paste",{type:"html",notification:c&&"undefined"!==typeof c.notification?c.notification:!0})}});f.ui.addButton&&f.ui.addButton("PasteFromWord",{label:f.lang.pastefromword.toolbar,command:"pastefromword",toolbar:"clipboard,50"});f.on("paste",function(e){var m=
e.data,k=(CKEDITOR.plugins.clipboard.isCustomDataTypesSupported?m.dataTransfer.getData("text/html",!0):null)||m.dataValue,d={dataValue:k},h=/(class=\"?Mso|style=(?:\"|\')[^\"]*?\bmso\-|w:WordDocument|<o:\w+>|<\/font>)/,h=/<meta\s*name=(?:\"|\')?generator(?:\"|\')?\s*content=(?:\"|\')?microsoft/gi.test(k)||h.test(k);if(k&&(b||h)&&(!1!==f.fire("pasteFromWord",d)||b)){m.dontFilter=!0;var l=a(f,c,function(){if(l)f.fire("paste",m);else if(!f.config.pasteFromWordPromptCleanup||b||confirm(f.lang.pastefromword.confirmCleanup))d.dataValue=
CKEDITOR.cleanWord(d.dataValue,f),f.fire("afterPasteFromWord",d),m.dataValue=d.dataValue;b=0});l&&e.cancel()}},null,null,3)}})}(),function(){var a={canUndo:!1,async:!0,exec:function(a,b){var c=a.lang,e=CKEDITOR.tools.keystrokeToString(c.common.keyboard,a.getCommandKeystroke(CKEDITOR.env.ie?a.commands.paste:this)),m=b&&"undefined"!==typeof b.notification?b.notification:!b||!b.from||"keystrokeHandler"===b.from&&CKEDITOR.env.ie,c=m&&"string"===typeof m?m:c.pastetext.pasteNotification.replace(/%1/,'\x3ckbd aria-label\x3d"'+
e.aria+'"\x3e'+e.display+"\x3c/kbd\x3e");a.execCommand("paste",{type:"text",notification:m?c:!1})}};CKEDITOR.plugins.add("pastetext",{requires:"clipboard",init:function(f){var b=CKEDITOR.env.safari?CKEDITOR.CTRL+CKEDITOR.ALT+CKEDITOR.SHIFT+86:CKEDITOR.CTRL+CKEDITOR.SHIFT+86;f.addCommand("pastetext",a);f.setKeystroke(b,"pastetext");f.ui.addButton&&f.ui.addButton("PasteText",{label:f.lang.pastetext.button,command:"pastetext",toolbar:"clipboard,40"});if(f.config.forcePasteAsPlainText)f.on("beforePaste",
function(a){"html"!=a.data.type&&(a.data.type="text")});f.on("pasteState",function(a){f.getCommand("pastetext").setState(a.data)})}})}(),CKEDITOR.plugins.add("removeformat",{init:function(a){a.addCommand("removeFormat",CKEDITOR.plugins.removeformat.commands.removeformat);a.ui.addButton&&a.ui.addButton("RemoveFormat",{label:a.lang.removeformat.toolbar,command:"removeFormat",toolbar:"cleanup,10"})}}),CKEDITOR.plugins.removeformat={commands:{removeformat:{exec:function(a){for(var f=a._.removeFormatRegex||
(a._.removeFormatRegex=new RegExp("^(?:"+a.config.removeFormatTags.replace(/,/g,"|")+")$","i")),b=a._.removeAttributes||(a._.removeAttributes=a.config.removeFormatAttributes.split(",")),c=CKEDITOR.plugins.removeformat.filter,e=a.getSelection().getRanges(),m=e.createIterator(),k=function(a){return a.type==CKEDITOR.NODE_ELEMENT},d;d=m.getNextRange();){d.collapsed||d.enlarge(CKEDITOR.ENLARGE_ELEMENT);var h=d.createBookmark(),l=h.startNode,g=h.endNode,n=function(b){for(var d=a.elementPath(b),e=d.elements,
g=1,h;(h=e[g])&&!h.equals(d.block)&&!h.equals(d.blockLimit);g++)f.test(h.getName())&&c(a,h)&&b.breakParent(h)};n(l);if(g)for(n(g),l=l.getNextSourceNode(!0,CKEDITOR.NODE_ELEMENT);l&&!l.equals(g);)if(l.isReadOnly()){if(l.getPosition(g)&CKEDITOR.POSITION_CONTAINS)break;l=l.getNext(k)}else n=l.getNextSourceNode(!1,CKEDITOR.NODE_ELEMENT),"img"==l.getName()&&l.data("cke-realelement")||!c(a,l)||(f.test(l.getName())?l.remove(1):(l.removeAttributes(b),a.fire("removeFormatCleanup",l))),l=n;d.moveToBookmark(h)}a.forceNextSelectionCheck();
a.getSelection().selectRanges(e)}}},filter:function(a,f){for(var b=a._.removeFormatFilters||[],c=0;c<b.length;c++)if(!1===b[c](f))return!1;return!0}},CKEDITOR.editor.prototype.addRemoveFormatFilter=function(a){this._.removeFormatFilters||(this._.removeFormatFilters=[]);this._.removeFormatFilters.push(a)},CKEDITOR.config.removeFormatTags="b,big,cite,code,del,dfn,em,font,i,ins,kbd,q,s,samp,small,span,strike,strong,sub,sup,tt,u,var",CKEDITOR.config.removeFormatAttributes="class,style,lang,width,height,align,hspace,valign",
CKEDITOR.plugins.add("resize",{init:function(a){function f(b){var e=h.width,f=h.height,k=e+(b.data.$.screenX-d.x)*("rtl"==m?-1:1);b=f+(b.data.$.screenY-d.y);l&&(e=Math.max(c.resize_minWidth,Math.min(k,c.resize_maxWidth)));g&&(f=Math.max(c.resize_minHeight,Math.min(b,c.resize_maxHeight)));a.resize(l?e:null,f)}function b(){CKEDITOR.document.removeListener("mousemove",f);CKEDITOR.document.removeListener("mouseup",b);a.document&&(a.document.removeListener("mousemove",f),a.document.removeListener("mouseup",
b))}var c=a.config,e=a.ui.spaceId("resizer"),m=a.element?a.element.getDirection(1):"ltr";!c.resize_dir&&(c.resize_dir="vertical");void 0===c.resize_maxWidth&&(c.resize_maxWidth=3E3);void 0===c.resize_maxHeight&&(c.resize_maxHeight=3E3);void 0===c.resize_minWidth&&(c.resize_minWidth=750);void 0===c.resize_minHeight&&(c.resize_minHeight=250);if(!1!==c.resize_enabled){var k=null,d,h,l=("both"==c.resize_dir||"horizontal"==c.resize_dir)&&c.resize_minWidth!=c.resize_maxWidth,g=("both"==c.resize_dir||"vertical"==
c.resize_dir)&&c.resize_minHeight!=c.resize_maxHeight,n=CKEDITOR.tools.addFunction(function(e){k||(k=a.getResizable());h={width:k.$.offsetWidth||0,height:k.$.offsetHeight||0};d={x:e.screenX,y:e.screenY};c.resize_minWidth>h.width&&(c.resize_minWidth=h.width);c.resize_minHeight>h.height&&(c.resize_minHeight=h.height);CKEDITOR.document.on("mousemove",f);CKEDITOR.document.on("mouseup",b);a.document&&(a.document.on("mousemove",f),a.document.on("mouseup",b));e.preventDefault&&e.preventDefault()});a.on("destroy",
function(){CKEDITOR.tools.removeFunction(n)});a.on("uiSpace",function(b){if("bottom"==b.data.space){var c="";l&&!g&&(c=" cke_resizer_horizontal");!l&&g&&(c=" cke_resizer_vertical");var d='\x3cspan id\x3d"'+e+'" class\x3d"cke_resizer'+c+" cke_resizer_"+m+'" title\x3d"'+CKEDITOR.tools.htmlEncode(a.lang.common.resize)+'" onmousedown\x3d"CKEDITOR.tools.callFunction('+n+', event)"\x3e'+("ltr"==m?"◢":"◣")+"\x3c/span\x3e";"ltr"==m&&"ltr"==c?b.data.html+=d:b.data.html=d+b.data.html}},a,null,100);a.on("maximize",
function(b){a.ui.space("resizer")[b.data==CKEDITOR.TRISTATE_ON?"hide":"show"]()})}}}),CKEDITOR.plugins.add("menubutton",{requires:"button,menu",onLoad:function(){var a=function(a){var b=this._,c=b.menu;b.state!==CKEDITOR.TRISTATE_DISABLED&&(b.on&&c?c.hide():(b.previousState=b.state,c||(c=b.menu=new CKEDITOR.menu(a,{panel:{className:"cke_menu_panel",attributes:{"aria-label":a.lang.common.options}}}),c.onHide=CKEDITOR.tools.bind(function(){var c=this.command?a.getCommand(this.command).modes:this.modes;
this.setState(!c||c[a.mode]?b.previousState:CKEDITOR.TRISTATE_DISABLED);b.on=0},this),this.onMenu&&c.addListener(this.onMenu)),this.setState(CKEDITOR.TRISTATE_ON),b.on=1,setTimeout(function(){c.show(CKEDITOR.document.getById(b.id),4)},0)))};CKEDITOR.ui.menuButton=CKEDITOR.tools.createClass({base:CKEDITOR.ui.button,$:function(f){delete f.panel;this.base(f);this.hasArrow=!0;this.click=a},statics:{handler:{create:function(a){return new CKEDITOR.ui.menuButton(a)}}}})},beforeInit:function(a){a.ui.addHandler(CKEDITOR.UI_MENUBUTTON,
CKEDITOR.ui.menuButton.handler)}}),CKEDITOR.UI_MENUBUTTON="menubutton","use strict",CKEDITOR.plugins.add("scayt",{requires:"menubutton,dialog",tabToOpen:null,dialogName:"scaytDialog",onLoad:function(a){CKEDITOR.plugins.scayt.onLoadTimestamp=(new Date).getTime();"moono-lisa"==(CKEDITOR.skinName||a.config.skin)&&CKEDITOR.document.appendStyleSheet(this.path+"skins/"+CKEDITOR.skin.name+"/scayt.css");CKEDITOR.document.appendStyleSheet(this.path+"dialogs/dialog.css")},init:function(a){var f=this,b=CKEDITOR.plugins.scayt;
this.bindEvents(a);this.parseConfig(a);this.addRule(a);CKEDITOR.dialog.add(this.dialogName,CKEDITOR.getUrl(this.path+"dialogs/options.js"));this.addMenuItems(a);var c=a.lang.scayt,e=CKEDITOR.env;a.ui.add("Scayt",CKEDITOR.UI_MENUBUTTON,{label:c.text_title,title:a.plugins.wsc?a.lang.wsc.title:c.text_title,modes:{wysiwyg:!(e.ie&&(8>e.version||e.quirks))},toolbar:"spellchecker,20",refresh:function(){var c=a.ui.instances.Scayt.getState();a.scayt&&(c=b.state.scayt[a.name]?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF);
a.fire("scaytButtonState",c)},onRender:function(){var b=this;a.on("scaytButtonState",function(a){void 0!==typeof a.data&&b.setState(a.data)})},onMenu:function(){var c=a.scayt;a.getMenuItem("scaytToggle").label=a.lang.scayt[c&&b.state.scayt[a.name]?"btn_disable":"btn_enable"];var e={scaytToggle:CKEDITOR.TRISTATE_OFF,scaytOptions:c?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,scaytLangs:c?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,scaytDict:c?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,
scaytAbout:c?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,WSC:a.plugins.wsc?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED};a.config.scayt_uiTabs[0]||delete e.scaytOptions;a.config.scayt_uiTabs[1]||delete e.scaytLangs;a.config.scayt_uiTabs[2]||delete e.scaytDict;c&&!CKEDITOR.plugins.scayt.isNewUdSupported(c)&&(delete e.scaytDict,a.config.scayt_uiTabs[2]=0,CKEDITOR.plugins.scayt.alarmCompatibilityMessage());return e}});a.contextMenu&&a.addMenuItems&&(a.contextMenu.addListener(function(b,c){var d=
a.scayt,e,l;d&&(l=d.getSelectionNode())&&(e=f.menuGenerator(a,l),d.showBanner("."+a.contextMenu._.definition.panel.className.split(" ").join(" .")));return e}),a.contextMenu._.onHide=CKEDITOR.tools.override(a.contextMenu._.onHide,function(b){return function(){var c=a.scayt;c&&c.hideBanner();return b.apply(this)}}))},addMenuItems:function(a){var f=this,b=CKEDITOR.plugins.scayt;a.addMenuGroup("scaytButton");for(var c=a.config.scayt_contextMenuItemsOrder.split("|"),e=0;e<c.length;e++)c[e]="scayt_"+c[e];
if((c=["grayt_description","grayt_suggest","grayt_control"].concat(c))&&c.length)for(e=0;e<c.length;e++)a.addMenuGroup(c[e],e-10);a.addCommand("scaytToggle",{exec:function(a){var c=a.scayt;b.state.scayt[a.name]=!b.state.scayt[a.name];!0===b.state.scayt[a.name]?c||b.createScayt(a):c&&b.destroy(a)}});a.addCommand("scaytAbout",{exec:function(a){a.scayt.tabToOpen="about";a.lockSelection();a.openDialog(f.dialogName)}});a.addCommand("scaytOptions",{exec:function(a){a.scayt.tabToOpen="options";a.lockSelection();
a.openDialog(f.dialogName)}});a.addCommand("scaytLangs",{exec:function(a){a.scayt.tabToOpen="langs";a.lockSelection();a.openDialog(f.dialogName)}});a.addCommand("scaytDict",{exec:function(a){a.scayt.tabToOpen="dictionaries";a.lockSelection();a.openDialog(f.dialogName)}});c={scaytToggle:{label:a.lang.scayt.btn_enable,group:"scaytButton",command:"scaytToggle"},scaytAbout:{label:a.lang.scayt.btn_about,group:"scaytButton",command:"scaytAbout"},scaytOptions:{label:a.lang.scayt.btn_options,group:"scaytButton",
command:"scaytOptions"},scaytLangs:{label:a.lang.scayt.btn_langs,group:"scaytButton",command:"scaytLangs"},scaytDict:{label:a.lang.scayt.btn_dictionaries,group:"scaytButton",command:"scaytDict"}};a.plugins.wsc&&(c.WSC={label:a.lang.wsc.toolbar,group:"scaytButton",onClick:function(){var b=CKEDITOR.plugins.scayt,c=a.scayt,d=a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?a.container.getText():a.document.getBody().getText();(d=d.replace(/\s/g,""))?(c&&b.state.scayt[a.name]&&c.setMarkupPaused&&c.setMarkupPaused(!0),
a.lockSelection(),a.execCommand("checkspell")):alert("Nothing to check!")}});a.addMenuItems(c)},bindEvents:function(a){var f=CKEDITOR.plugins.scayt,b=a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE,c=function(){f.destroy(a)},e=function(){!f.state.scayt[a.name]||a.readOnly||a.scayt||f.createScayt(a)},m=function(){var c=a.editable();c.attachListener(c,"focus",function(c){CKEDITOR.plugins.scayt&&!a.scayt&&setTimeout(e,0);c=CKEDITOR.plugins.scayt&&CKEDITOR.plugins.scayt.state.scayt[a.name]&&a.scayt;var d,
f;if((b||c)&&a._.savedSelection){c=a._.savedSelection.getSelectedElement();c=!c&&a._.savedSelection.getRanges();for(var k=0;k<c.length;k++)f=c[k],"string"===typeof f.startContainer.$.nodeValue&&(d=f.startContainer.getText().length,(d<f.startOffset||d<f.endOffset)&&a.unlockSelection(!1))}},this,null,-10)},k=function(){b?a.config.scayt_inlineModeImmediateMarkup?e():(a.on("blur",function(){setTimeout(c,0)}),a.on("focus",e),a.focusManager.hasFocus&&e()):e();m();var d=a.editable();d.attachListener(d,"mousedown",
function(b){b=b.data.getTarget();var c=a.widgets&&a.widgets.getByElement(b);c&&(c.wrapper=b.getAscendant(function(a){return a.hasAttribute("data-cke-widget-wrapper")},!0))},this,null,-10)};a.on("contentDom",k);a.on("beforeCommandExec",function(b){var c=a.scayt,e=!1,g=!1,k=!0;b.data.name in f.options.disablingCommandExec&&"wysiwyg"==a.mode?c&&(f.destroy(a),a.fire("scaytButtonState",CKEDITOR.TRISTATE_DISABLED)):"bold"!==b.data.name&&"italic"!==b.data.name&&"underline"!==b.data.name&&"strike"!==b.data.name&&
"subscript"!==b.data.name&&"superscript"!==b.data.name&&"enter"!==b.data.name&&"cut"!==b.data.name&&"language"!==b.data.name||!c||("cut"===b.data.name&&(k=!1,g=!0),"language"===b.data.name&&(g=e=!0),a.fire("reloadMarkupScayt",{removeOptions:{removeInside:k,forceBookmark:g,language:e},timeout:0}))});a.on("beforeSetMode",function(b){if("source"==b.data){if(b=a.scayt)f.destroy(a),a.fire("scaytButtonState",CKEDITOR.TRISTATE_DISABLED);a.document&&a.document.getBody().removeAttribute("_jquid")}});a.on("afterCommandExec",
function(b){"wysiwyg"!=a.mode||"undo"!=b.data.name&&"redo"!=b.data.name||setTimeout(function(){f.reloadMarkup(a.scayt)},250)});a.on("readOnly",function(b){var c;b&&(c=a.scayt,!0===b.editor.readOnly?c&&c.fire("removeMarkupInDocument",{}):c?f.reloadMarkup(c):"wysiwyg"==b.editor.mode&&!0===f.state.scayt[b.editor.name]&&(f.createScayt(a),b.editor.fire("scaytButtonState",CKEDITOR.TRISTATE_ON)))});a.on("beforeDestroy",c);a.on("setData",function(){c();(a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE||a.plugins.divarea)&&
k()},this,null,50);a.on("reloadMarkupScayt",function(b){var c=b.data&&b.data.removeOptions,e=b.data&&b.data.timeout,g=b.data&&b.data.language,k=a.scayt;k&&setTimeout(function(){g&&(c.selectionNode=a.plugins.language.getCurrentLangElement(a),c.selectionNode=c.selectionNode&&c.selectionNode.$||null);k.removeMarkupInSelectionNode(c);f.reloadMarkup(k)},e||0)});a.on("insertElement",function(){a.fire("reloadMarkupScayt",{removeOptions:{forceBookmark:!0}})},this,null,50);a.on("insertHtml",function(){a.scayt&&
a.scayt.setFocused&&a.scayt.setFocused(!0);a.fire("reloadMarkupScayt")},this,null,50);a.on("insertText",function(){a.scayt&&a.scayt.setFocused&&a.scayt.setFocused(!0);a.fire("reloadMarkupScayt")},this,null,50);a.on("scaytDialogShown",function(b){b.data.selectPage(a.scayt.tabToOpen)})},parseConfig:function(a){var f=CKEDITOR.plugins.scayt;f.replaceOldOptionsNames(a.config);"boolean"!==typeof a.config.scayt_autoStartup&&(a.config.scayt_autoStartup=!1);f.state.scayt[a.name]=a.config.scayt_autoStartup;
"boolean"!==typeof a.config.grayt_autoStartup&&(a.config.grayt_autoStartup=!1);"boolean"!==typeof a.config.scayt_inlineModeImmediateMarkup&&(a.config.scayt_inlineModeImmediateMarkup=!1);f.state.grayt[a.name]=a.config.grayt_autoStartup;a.config.scayt_contextCommands||(a.config.scayt_contextCommands="ignoreall|add");a.config.scayt_contextMenuItemsOrder||(a.config.scayt_contextMenuItemsOrder="suggest|moresuggest|control");a.config.scayt_sLang||(a.config.scayt_sLang="en_US");if(void 0===a.config.scayt_maxSuggestions||
"number"!=typeof a.config.scayt_maxSuggestions||0>a.config.scayt_maxSuggestions)a.config.scayt_maxSuggestions=5;if(void 0===a.config.scayt_minWordLength||"number"!=typeof a.config.scayt_minWordLength||1>a.config.scayt_minWordLength)a.config.scayt_minWordLength=4;if(void 0===a.config.scayt_customDictionaryIds||"string"!==typeof a.config.scayt_customDictionaryIds)a.config.scayt_customDictionaryIds="";if(void 0===a.config.scayt_userDictionaryName||"string"!==typeof a.config.scayt_userDictionaryName)a.config.scayt_userDictionaryName=
null;if("string"===typeof a.config.scayt_uiTabs&&3===a.config.scayt_uiTabs.split(",").length){var b=[],c=[];a.config.scayt_uiTabs=a.config.scayt_uiTabs.split(",");CKEDITOR.tools.search(a.config.scayt_uiTabs,function(a){1===Number(a)||0===Number(a)?(c.push(!0),b.push(Number(a))):c.push(!1)});null===CKEDITOR.tools.search(c,!1)?a.config.scayt_uiTabs=b:a.config.scayt_uiTabs=[1,1,1]}else a.config.scayt_uiTabs=[1,1,1];"string"!=typeof a.config.scayt_serviceProtocol&&(a.config.scayt_serviceProtocol=null);
"string"!=typeof a.config.scayt_serviceHost&&(a.config.scayt_serviceHost=null);"string"!=typeof a.config.scayt_servicePort&&(a.config.scayt_servicePort=null);"string"!=typeof a.config.scayt_servicePath&&(a.config.scayt_servicePath=null);a.config.scayt_moreSuggestions||(a.config.scayt_moreSuggestions="on");"string"!==typeof a.config.scayt_customerId&&(a.config.scayt_customerId="1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2");"string"!==typeof a.config.scayt_customPunctuation&&
(a.config.scayt_customPunctuation="-");"string"!==typeof a.config.scayt_srcUrl&&(f=document.location.protocol,f=-1!=f.search(/https?:/)?f:"http:",a.config.scayt_srcUrl=f+"//svc.webspellchecker.net/spellcheck31/lf/scayt3/ckscayt/ckscayt.js");"boolean"!==typeof CKEDITOR.config.scayt_handleCheckDirty&&(CKEDITOR.config.scayt_handleCheckDirty=!0);"boolean"!==typeof CKEDITOR.config.scayt_handleUndoRedo&&(CKEDITOR.config.scayt_handleUndoRedo=!0);CKEDITOR.config.scayt_handleUndoRedo=CKEDITOR.plugins.undo?
CKEDITOR.config.scayt_handleUndoRedo:!1;"boolean"!==typeof a.config.scayt_multiLanguageMode&&(a.config.scayt_multiLanguageMode=!1);"object"!==typeof a.config.scayt_multiLanguageStyles&&(a.config.scayt_multiLanguageStyles={});a.config.scayt_ignoreAllCapsWords&&"boolean"!==typeof a.config.scayt_ignoreAllCapsWords&&(a.config.scayt_ignoreAllCapsWords=!1);a.config.scayt_ignoreDomainNames&&"boolean"!==typeof a.config.scayt_ignoreDomainNames&&(a.config.scayt_ignoreDomainNames=!1);a.config.scayt_ignoreWordsWithMixedCases&&
"boolean"!==typeof a.config.scayt_ignoreWordsWithMixedCases&&(a.config.scayt_ignoreWordsWithMixedCases=!1);a.config.scayt_ignoreWordsWithNumbers&&"boolean"!==typeof a.config.scayt_ignoreWordsWithNumbers&&(a.config.scayt_ignoreWordsWithNumbers=!1);if(a.config.scayt_disableOptionsStorage){var f=CKEDITOR.tools.isArray(a.config.scayt_disableOptionsStorage)?a.config.scayt_disableOptionsStorage:"string"===typeof a.config.scayt_disableOptionsStorage?[a.config.scayt_disableOptionsStorage]:void 0,e="all options lang ignore-all-caps-words ignore-domain-names ignore-words-with-mixed-cases ignore-words-with-numbers".split(" "),
m=["lang","ignore-all-caps-words","ignore-domain-names","ignore-words-with-mixed-cases","ignore-words-with-numbers"],k=CKEDITOR.tools.search,d=CKEDITOR.tools.indexOf;a.config.scayt_disableOptionsStorage=function(a){for(var b=[],c=0;c<a.length;c++){var f=a[c],p=!!k(a,"options");if(!k(e,f)||p&&k(m,function(a){if("lang"===a)return!1}))return;k(m,f)&&m.splice(d(m,f),1);if("all"===f||p&&k(a,"lang"))return[];"options"===f&&(m=["lang"])}return b=b.concat(m)}(f)}},addRule:function(a){var f=CKEDITOR.plugins.scayt,
b=a.dataProcessor,c=b&&b.htmlFilter,e=a._.elementsPath&&a._.elementsPath.filters,b=b&&b.dataFilter,m=a.addRemoveFormatFilter,k=function(b){if(a.scayt&&(b.hasAttribute(f.options.data_attribute_name)||b.hasAttribute(f.options.problem_grammar_data_attribute)))return!1},d=function(b){var c=!0;a.scayt&&(b.hasAttribute(f.options.data_attribute_name)||b.hasAttribute(f.options.problem_grammar_data_attribute))&&(c=!1);return c};e&&e.push(k);b&&b.addRules({elements:{span:function(a){var b=a.hasClass(f.options.misspelled_word_class)&&
a.attributes[f.options.data_attribute_name],c=a.hasClass(f.options.problem_grammar_class)&&a.attributes[f.options.problem_grammar_data_attribute];f&&(b||c)&&delete a.name;return a}}});c&&c.addRules({elements:{span:function(a){var b=a.hasClass(f.options.misspelled_word_class)&&a.attributes[f.options.data_attribute_name],c=a.hasClass(f.options.problem_grammar_class)&&a.attributes[f.options.problem_grammar_data_attribute];f&&(b||c)&&delete a.name;return a}}});m&&m.call(a,d)},scaytMenuDefinition:function(a){var f=
this;a=a.scayt;return{scayt:{scayt_ignore:{label:a.getLocal("btn_ignore"),group:"scayt_control",order:1,exec:function(a){a.scayt.ignoreWord()}},scayt_ignoreall:{label:a.getLocal("btn_ignoreAll"),group:"scayt_control",order:2,exec:function(a){a.scayt.ignoreAllWords()}},scayt_add:{label:a.getLocal("btn_addWord"),group:"scayt_control",order:3,exec:function(a){var c=a.scayt;setTimeout(function(){c.addWordToUserDictionary()},10)}},scayt_option:{label:a.getLocal("btn_options"),group:"scayt_control",order:4,
exec:function(a){a.scayt.tabToOpen="options";a.lockSelection();a.openDialog(f.dialogName)},verification:function(a){return 1==a.config.scayt_uiTabs[0]?!0:!1}},scayt_language:{label:a.getLocal("btn_langs"),group:"scayt_control",order:5,exec:function(a){a.scayt.tabToOpen="langs";a.lockSelection();a.openDialog(f.dialogName)},verification:function(a){return 1==a.config.scayt_uiTabs[1]?!0:!1}},scayt_dictionary:{label:a.getLocal("btn_dictionaries"),group:"scayt_control",order:6,exec:function(a){a.scayt.tabToOpen=
"dictionaries";a.lockSelection();a.openDialog(f.dialogName)},verification:function(a){return 1==a.config.scayt_uiTabs[2]?!0:!1}},scayt_about:{label:a.getLocal("btn_about"),group:"scayt_control",order:7,exec:function(a){a.scayt.tabToOpen="about";a.lockSelection();a.openDialog(f.dialogName)}}},grayt:{grayt_problemdescription:{label:"Grammar problem description",group:"grayt_description",order:1,state:CKEDITOR.TRISTATE_DISABLED,exec:function(a){}},grayt_ignore:{label:a.getLocal("btn_ignore"),group:"grayt_control",
order:2,exec:function(a){a.scayt.ignorePhrase()}},grayt_ignoreall:{label:a.getLocal("btn_ignoreAll"),group:"grayt_control",order:3,exec:function(a){a.scayt.ignoreAllPhrases()}}}}},buildSuggestionMenuItems:function(a,f,b){var c={},e={},m=b?"word":"phrase",k=b?"startGrammarCheck":"startSpellCheck",d=a.scayt;if(0<f.length&&"no_any_suggestions"!==f[0])if(b)for(b=0;b<f.length;b++){var h="scayt_suggest_"+CKEDITOR.plugins.scayt.suggestions[b].replace(" ","_");a.addCommand(h,this.createCommand(CKEDITOR.plugins.scayt.suggestions[b],
m,k));b<a.config.scayt_maxSuggestions?(a.addMenuItem(h,{label:f[b],command:h,group:"scayt_suggest",order:b+1}),c[h]=CKEDITOR.TRISTATE_OFF):(a.addMenuItem(h,{label:f[b],command:h,group:"scayt_moresuggest",order:b+1}),e[h]=CKEDITOR.TRISTATE_OFF,"on"===a.config.scayt_moreSuggestions&&(a.addMenuItem("scayt_moresuggest",{label:d.getLocal("btn_moreSuggestions"),group:"scayt_moresuggest",order:10,getItems:function(){return e}}),c.scayt_moresuggest=CKEDITOR.TRISTATE_OFF))}else for(b=0;b<f.length;b++)h="grayt_suggest_"+
CKEDITOR.plugins.scayt.suggestions[b].replace(" ","_"),a.addCommand(h,this.createCommand(CKEDITOR.plugins.scayt.suggestions[b],m,k)),a.addMenuItem(h,{label:f[b],command:h,group:"grayt_suggest",order:b+1}),c[h]=CKEDITOR.TRISTATE_OFF;else c.no_scayt_suggest=CKEDITOR.TRISTATE_DISABLED,a.addCommand("no_scayt_suggest",{exec:function(){}}),a.addMenuItem("no_scayt_suggest",{label:d.getLocal("btn_noSuggestions")||"no_scayt_suggest",command:"no_scayt_suggest",group:"scayt_suggest",order:0});return c},menuGenerator:function(a,
f){var b=a.scayt,c=this.scaytMenuDefinition(a),e={},m=a.config.scayt_contextCommands.split("|"),k=f.getAttribute(b.getLangAttribute())||b.getLang(),d,h,l;d=b.isScaytNode(f);h=b.isGraytNode(f);d?(c=c.scayt,e=f.getAttribute(b.getScaytNodeAttributeName()),b.fire("getSuggestionsList",{lang:k,word:e}),e=this.buildSuggestionMenuItems(a,CKEDITOR.plugins.scayt.suggestions,d)):h&&(c=c.grayt,e=f.getAttribute(b.getGraytNodeAttributeName()),l=b.getProblemDescriptionText(e,k),c.grayt_problemdescription&&l&&(c.grayt_problemdescription.label=
l),b.fire("getGrammarSuggestionsList",{lang:k,phrase:e}),e=this.buildSuggestionMenuItems(a,CKEDITOR.plugins.scayt.suggestions,d));if(d&&"off"==a.config.scayt_contextCommands)return e;for(var g in c)d&&-1==CKEDITOR.tools.indexOf(m,g.replace("scayt_",""))&&"all"!=a.config.scayt_contextCommands||h&&"grayt_problemdescription"!==g&&-1==CKEDITOR.tools.indexOf(m,g.replace("grayt_",""))&&"all"!=a.config.scayt_contextCommands||(e[g]="undefined"!=typeof c[g].state?c[g].state:CKEDITOR.TRISTATE_OFF,"function"!==
typeof c[g].verification||c[g].verification(a)||delete e[g],a.addCommand(g,{exec:c[g].exec}),a.addMenuItem(g,{label:a.lang.scayt[c[g].label]||c[g].label,command:g,group:c[g].group,order:c[g].order}));return e},createCommand:function(a,f,b){return{exec:function(c){c=c.scayt;var e={};e[f]=a;c.replaceSelectionNode(e);"startGrammarCheck"===b&&c.removeMarkupInSelectionNode({grammarOnly:!0});c.fire(b)}}}}),CKEDITOR.plugins.scayt={charsToObserve:[{charName:"cke-fillingChar",charCode:function(){var a=CKEDITOR.version.match(/^\d(\.\d*)*/),
a=a&&a[0],f;if(a){f="4.5.7";var b,a=a.replace(/\./g,"");f=f.replace(/\./g,"");b=a.length-f.length;b=0<=b?b:0;f=parseInt(a)>=parseInt(f)*Math.pow(10,b)}return f?Array(7).join(String.fromCharCode(8203)):String.fromCharCode(8203)}()}],onLoadTimestamp:"",state:{scayt:{},grayt:{}},warningCounter:0,suggestions:[],options:{disablingCommandExec:{source:!0,newpage:!0,templates:!0},data_attribute_name:"data-scayt-word",misspelled_word_class:"scayt-misspell-word",problem_grammar_data_attribute:"data-grayt-phrase",
problem_grammar_class:"gramm-problem"},backCompatibilityMap:{scayt_service_protocol:"scayt_serviceProtocol",scayt_service_host:"scayt_serviceHost",scayt_service_port:"scayt_servicePort",scayt_service_path:"scayt_servicePath",scayt_customerid:"scayt_customerId"},alarmCompatibilityMessage:function(){5>this.warningCounter&&(console.warn("You are using the latest version of SCAYT plugin for CKEditor with the old application version. In order to have access to the newest features, it is recommended to upgrade the application version to latest one as well. Contact us for more details at support@webspellchecker.net."),
this.warningCounter+=1)},isNewUdSupported:function(a){return a.getUserDictionary?!0:!1},reloadMarkup:function(a){var f;a&&(f=a.getScaytLangList(),a.reloadMarkup?a.reloadMarkup():(this.alarmCompatibilityMessage(),f&&f.ltr&&f.rtl&&a.fire("startSpellCheck, startGrammarCheck")))},replaceOldOptionsNames:function(a){for(var f in a)f in this.backCompatibilityMap&&(a[this.backCompatibilityMap[f]]=a[f],delete a[f])},createScayt:function(a){var f=this,b=CKEDITOR.plugins.scayt;this.loadScaytLibrary(a,function(a){function e(a){return new SCAYT.CKSCAYT(a,
function(){},function(){})}var m=a.window&&a.window.getFrame()||a.editable();if(m){m={lang:a.config.scayt_sLang,container:m.$,customDictionary:a.config.scayt_customDictionaryIds,userDictionaryName:a.config.scayt_userDictionaryName,localization:a.langCode,customer_id:a.config.scayt_customerId,customPunctuation:a.config.scayt_customPunctuation,debug:a.config.scayt_debug,data_attribute_name:f.options.data_attribute_name,misspelled_word_class:f.options.misspelled_word_class,problem_grammar_data_attribute:f.options.problem_grammar_data_attribute,
problem_grammar_class:f.options.problem_grammar_class,"options-to-restore":a.config.scayt_disableOptionsStorage,focused:a.editable().hasFocus,ignoreElementsRegex:a.config.scayt_elementsToIgnore,ignoreGraytElementsRegex:a.config.grayt_elementsToIgnore,minWordLength:a.config.scayt_minWordLength,multiLanguageMode:a.config.scayt_multiLanguageMode,multiLanguageStyles:a.config.scayt_multiLanguageStyles,graytAutoStartup:a.config.grayt_autoStartup,charsToObserve:b.charsToObserve};a.config.scayt_serviceProtocol&&
(m.service_protocol=a.config.scayt_serviceProtocol);a.config.scayt_serviceHost&&(m.service_host=a.config.scayt_serviceHost);a.config.scayt_servicePort&&(m.service_port=a.config.scayt_servicePort);a.config.scayt_servicePath&&(m.service_path=a.config.scayt_servicePath);"boolean"===typeof a.config.scayt_ignoreAllCapsWords&&(m["ignore-all-caps-words"]=a.config.scayt_ignoreAllCapsWords);"boolean"===typeof a.config.scayt_ignoreDomainNames&&(m["ignore-domain-names"]=a.config.scayt_ignoreDomainNames);"boolean"===
typeof a.config.scayt_ignoreWordsWithMixedCases&&(m["ignore-words-with-mixed-cases"]=a.config.scayt_ignoreWordsWithMixedCases);"boolean"===typeof a.config.scayt_ignoreWordsWithNumbers&&(m["ignore-words-with-numbers"]=a.config.scayt_ignoreWordsWithNumbers);var k;try{k=e(m)}catch(d){f.alarmCompatibilityMessage(),delete m.charsToObserve,k=e(m)}k.subscribe("suggestionListSend",function(a){for(var b={},c=[],d=0;d<a.suggestionList.length;d++)b["word_"+a.suggestionList[d]]||(b["word_"+a.suggestionList[d]]=
a.suggestionList[d],c.push(a.suggestionList[d]));CKEDITOR.plugins.scayt.suggestions=c});k.subscribe("selectionIsChanged",function(b){a.getSelection().isLocked&&a.lockSelection()});k.subscribe("graytStateChanged",function(d){b.state.grayt[a.name]=d.state});k.addMarkupHandler&&k.addMarkupHandler(function(b){var d=a.editable(),e=d.getCustomData(b.charName);e&&(e.$=b.node,d.setCustomData(b.charName,e))});a.scayt=k;a.fire("scaytButtonState",a.readOnly?CKEDITOR.TRISTATE_DISABLED:CKEDITOR.TRISTATE_ON)}else b.state.scayt[a.name]=
!1})},destroy:function(a){a.scayt&&a.scayt.destroy();delete a.scayt;a.fire("scaytButtonState",CKEDITOR.TRISTATE_OFF)},loadScaytLibrary:function(a,f){var b,c=function(){CKEDITOR.fireOnce("scaytReady");a.scayt||"function"===typeof f&&f(a)};"undefined"===typeof window.SCAYT||"function"!==typeof window.SCAYT.CKSCAYT?(b=a.config.scayt_srcUrl+"?"+this.onLoadTimestamp,CKEDITOR.scriptLoader.load(b,function(a){a&&c()})):window.SCAYT&&"function"===typeof window.SCAYT.CKSCAYT&&c()}},CKEDITOR.on("dialogDefinition",
function(a){var f=a.data.name;a=a.data.definition.dialog;if("scaytDialog"===f)a.on("cancel",function(a){return!1},this,null,-1);if("checkspell"===f)a.on("cancel",function(a){a=a.sender&&a.sender.getParentEditor();var c=CKEDITOR.plugins.scayt,e=a.scayt;e&&c.state.scayt[a.name]&&e.setMarkupPaused&&e.setMarkupPaused(!1);a.unlockSelection()},this,null,-2);if("link"===f)a.on("ok",function(a){var c=a.sender&&a.sender.getParentEditor();c&&setTimeout(function(){c.fire("reloadMarkupScayt",{removeOptions:{removeInside:!0,
forceBookmark:!0},timeout:0})},0)});if("replace"===f)a.on("hide",function(a){a=a.sender&&a.sender.getParentEditor();var c=CKEDITOR.plugins.scayt,e=a.scayt;a&&setTimeout(function(){e&&(e.fire("removeMarkupInDocument",{}),c.reloadMarkup(e))},0)})}),CKEDITOR.on("scaytReady",function(){if(!0===CKEDITOR.config.scayt_handleCheckDirty){var a=CKEDITOR.editor.prototype;a.checkDirty=CKEDITOR.tools.override(a.checkDirty,function(a){return function(){var c=null,e=this.scayt;if(CKEDITOR.plugins.scayt&&CKEDITOR.plugins.scayt.state.scayt[this.name]&&
this.scayt){if(c="ready"==this.status)var f=e.removeMarkupFromString(this.getSnapshot()),e=e.removeMarkupFromString(this._.previousValue),c=c&&e!==f}else c=a.call(this);return c}});a.resetDirty=CKEDITOR.tools.override(a.resetDirty,function(a){return function(){var c=this.scayt;CKEDITOR.plugins.scayt&&CKEDITOR.plugins.scayt.state.scayt[this.name]&&this.scayt?this._.previousValue=c.removeMarkupFromString(this.getSnapshot()):a.call(this)}})}if(!0===CKEDITOR.config.scayt_handleUndoRedo){var a=CKEDITOR.plugins.undo.Image.prototype,
f="function"==typeof a.equalsContent?"equalsContent":"equals";a[f]=CKEDITOR.tools.override(a[f],function(a){return function(c){var e=c.editor.scayt,f=this.contents,k=c.contents,d=null;CKEDITOR.plugins.scayt&&CKEDITOR.plugins.scayt.state.scayt[c.editor.name]&&c.editor.scayt&&(this.contents=e.removeMarkupFromString(f)||"",c.contents=e.removeMarkupFromString(k)||"");d=a.apply(this,arguments);this.contents=f;c.contents=k;return d}})}}),function(){var a={preserveState:!0,editorFocus:!1,readOnly:1,exec:function(a){this.toggleState();
this.refresh(a)},refresh:function(a){if(a.document){var b=this.state==CKEDITOR.TRISTATE_ON?"attachClass":"removeClass";a.editable()[b]("cke_show_borders")}}};CKEDITOR.plugins.add("showborders",{modes:{wysiwyg:1},onLoad:function(){var a;a=(CKEDITOR.env.ie6Compat?[".%1 table.%2,",".%1 table.%2 td, .%1 table.%2 th","{","border : #d3d3d3 1px dotted","}"]:".%1 table.%2,;.%1 table.%2 \x3e tr \x3e td, .%1 table.%2 \x3e tr \x3e th,;.%1 table.%2 \x3e tbody \x3e tr \x3e td, .%1 table.%2 \x3e tbody \x3e tr \x3e th,;.%1 table.%2 \x3e thead \x3e tr \x3e td, .%1 table.%2 \x3e thead \x3e tr \x3e th,;.%1 table.%2 \x3e tfoot \x3e tr \x3e td, .%1 table.%2 \x3e tfoot \x3e tr \x3e th;{;border : #d3d3d3 1px dotted;}".split(";")).join("").replace(/%2/g,
"cke_show_border").replace(/%1/g,"cke_show_borders ");CKEDITOR.addCss(a)},init:function(f){var b=f.addCommand("showborders",a);b.canUndo=!1;!1!==f.config.startupShowBorders&&b.setState(CKEDITOR.TRISTATE_ON);f.on("mode",function(){b.state!=CKEDITOR.TRISTATE_DISABLED&&b.refresh(f)},null,null,100);f.on("contentDom",function(){b.state!=CKEDITOR.TRISTATE_DISABLED&&b.refresh(f)});f.on("removeFormatCleanup",function(a){a=a.data;f.getCommand("showborders").state==CKEDITOR.TRISTATE_ON&&a.is("table")&&(!a.hasAttribute("border")||
0>=parseInt(a.getAttribute("border"),10))&&a.addClass("cke_show_border")})},afterInit:function(a){var b=a.dataProcessor;a=b&&b.dataFilter;b=b&&b.htmlFilter;a&&a.addRules({elements:{table:function(a){a=a.attributes;var b=a["class"],f=parseInt(a.border,10);f&&!(0>=f)||b&&-1!=b.indexOf("cke_show_border")||(a["class"]=(b||"")+" cke_show_border")}}});b&&b.addRules({elements:{table:function(a){a=a.attributes;var b=a["class"];b&&(a["class"]=b.replace("cke_show_border","").replace(/\s{2}/," ").replace(/^\s+|\s+$/,
""))}}})}});CKEDITOR.on("dialogDefinition",function(a){var b=a.data.name;if("table"==b||"tableProperties"==b)if(a=a.data.definition,b=a.getContents("info").get("txtBorder"),b.commit=CKEDITOR.tools.override(b.commit,function(a){return function(b,f){a.apply(this,arguments);var k=parseInt(this.getValue(),10);f[!k||0>=k?"addClass":"removeClass"]("cke_show_border")}}),a=(a=a.getContents("advanced"))&&a.get("advCSSClasses"))a.setup=CKEDITOR.tools.override(a.setup,function(a){return function(){a.apply(this,
arguments);this.setValue(this.getValue().replace(/cke_show_border/,""))}}),a.commit=CKEDITOR.tools.override(a.commit,function(a){return function(b,f){a.apply(this,arguments);parseInt(f.getAttribute("border"),10)||f.addClass("cke_show_border")}})})}(),function(){CKEDITOR.plugins.add("sourcearea",{init:function(f){function b(){var a=e&&this.equals(CKEDITOR.document.getActive());this.hide();this.setStyle("height",this.getParent().$.clientHeight+"px");this.setStyle("width",this.getParent().$.clientWidth+
"px");this.show();a&&this.focus()}if(f.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE){var c=CKEDITOR.plugins.sourcearea;f.addMode("source",function(c){var e=f.ui.space("contents").getDocument().createElement("textarea");e.setStyles(CKEDITOR.tools.extend({width:CKEDITOR.env.ie7Compat?"99%":"100%",height:"100%",resize:"none",outline:"none","text-align":"left"},CKEDITOR.tools.cssVendorPrefix("tab-size",f.config.sourceAreaTabSize||4)));e.setAttribute("dir","ltr");e.addClass("cke_source").addClass("cke_reset").addClass("cke_enable_context_menu");
f.ui.space("contents").append(e);e=f.editable(new a(f,e));e.setData(f.getData(1));CKEDITOR.env.ie&&(e.attachListener(f,"resize",b,e),e.attachListener(CKEDITOR.document.getWindow(),"resize",b,e),CKEDITOR.tools.setTimeout(b,0,e));f.fire("ariaWidget",this);c()});f.addCommand("source",c.commands.source);f.ui.addButton&&f.ui.addButton("Source",{label:f.lang.sourcearea.toolbar,command:"source",toolbar:"mode,10"});f.on("mode",function(){f.getCommand("source").setState("source"==f.mode?CKEDITOR.TRISTATE_ON:
CKEDITOR.TRISTATE_OFF)});var e=CKEDITOR.env.ie&&9==CKEDITOR.env.version}}});var a=CKEDITOR.tools.createClass({base:CKEDITOR.editable,proto:{setData:function(a){this.setValue(a);this.status="ready";this.editor.fire("dataReady")},getData:function(){return this.getValue()},insertHtml:function(){},insertElement:function(){},insertText:function(){},setReadOnly:function(a){this[(a?"set":"remove")+"Attribute"]("readOnly","readonly")},detach:function(){a.baseProto.detach.call(this);this.clearCustomData();
this.remove()}}})}(),CKEDITOR.plugins.sourcearea={commands:{source:{modes:{wysiwyg:1,source:1},editorFocus:!1,readOnly:1,exec:function(a){"wysiwyg"==a.mode&&a.fire("saveSnapshot");a.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED);a.setMode("source"==a.mode?"wysiwyg":"source")},canUndo:!1}}},CKEDITOR.plugins.add("specialchar",{availableLangs:{af:1,ar:1,az:1,bg:1,ca:1,cs:1,cy:1,da:1,de:1,"de-ch":1,el:1,en:1,"en-au":1,"en-ca":1,"en-gb":1,eo:1,es:1,"es-mx":1,et:1,eu:1,fa:1,fi:1,fr:1,"fr-ca":1,
gl:1,he:1,hr:1,hu:1,id:1,it:1,ja:1,km:1,ko:1,ku:1,lt:1,lv:1,nb:1,nl:1,no:1,oc:1,pl:1,pt:1,"pt-br":1,ru:1,si:1,sk:1,sl:1,sq:1,sv:1,th:1,tr:1,tt:1,ug:1,uk:1,vi:1,zh:1,"zh-cn":1},requires:"dialog",init:function(a){var f=this;CKEDITOR.dialog.add("specialchar",this.path+"dialogs/specialchar.js");a.addCommand("specialchar",{exec:function(){var b=a.langCode,b=f.availableLangs[b]?b:f.availableLangs[b.replace(/-.*/,"")]?b.replace(/-.*/,""):"en";CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(f.path+"dialogs/lang/"+
b+".js"),function(){CKEDITOR.tools.extend(a.lang.specialchar,f.langEntries[b]);a.openDialog("specialchar")})},modes:{wysiwyg:1},canUndo:!1});a.ui.addButton&&a.ui.addButton("SpecialChar",{label:a.lang.specialchar.toolbar,command:"specialchar",toolbar:"insert,50"})}}),CKEDITOR.config.specialChars="! \x26quot; # $ % \x26amp; ' ( ) * + - . / 0 1 2 3 4 5 6 7 8 9 : ; \x26lt; \x3d \x26gt; ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ \x26euro; \x26lsquo; \x26rsquo; \x26ldquo; \x26rdquo; \x26ndash; \x26mdash; \x26iexcl; \x26cent; \x26pound; \x26curren; \x26yen; \x26brvbar; \x26sect; \x26uml; \x26copy; \x26ordf; \x26laquo; \x26not; \x26reg; \x26macr; \x26deg; \x26sup2; \x26sup3; \x26acute; \x26micro; \x26para; \x26middot; \x26cedil; \x26sup1; \x26ordm; \x26raquo; \x26frac14; \x26frac12; \x26frac34; \x26iquest; \x26Agrave; \x26Aacute; \x26Acirc; \x26Atilde; \x26Auml; \x26Aring; \x26AElig; \x26Ccedil; \x26Egrave; \x26Eacute; \x26Ecirc; \x26Euml; \x26Igrave; \x26Iacute; \x26Icirc; \x26Iuml; \x26ETH; \x26Ntilde; \x26Ograve; \x26Oacute; \x26Ocirc; \x26Otilde; \x26Ouml; \x26times; \x26Oslash; \x26Ugrave; \x26Uacute; \x26Ucirc; \x26Uuml; \x26Yacute; \x26THORN; \x26szlig; \x26agrave; \x26aacute; \x26acirc; \x26atilde; \x26auml; \x26aring; \x26aelig; \x26ccedil; \x26egrave; \x26eacute; \x26ecirc; \x26euml; \x26igrave; \x26iacute; \x26icirc; \x26iuml; \x26eth; \x26ntilde; \x26ograve; \x26oacute; \x26ocirc; \x26otilde; \x26ouml; \x26divide; \x26oslash; \x26ugrave; \x26uacute; \x26ucirc; \x26uuml; \x26yacute; \x26thorn; \x26yuml; \x26OElig; \x26oelig; \x26#372; \x26#374 \x26#373 \x26#375; \x26sbquo; \x26#8219; \x26bdquo; \x26hellip; \x26trade; \x26#9658; \x26bull; \x26rarr; \x26rArr; \x26hArr; \x26diams; \x26asymp;".split(" "),
function(){CKEDITOR.plugins.add("stylescombo",{requires:"richcombo",init:function(a){var f=a.config,b=a.lang.stylescombo,c={},e=[],m=[];a.on("stylesSet",function(b){if(b=b.data.styles){for(var d,h,l,g=0,n=b.length;g<n;g++)(d=b[g],a.blockless&&d.element in CKEDITOR.dtd.$block||"string"==typeof d.type&&!CKEDITOR.style.customHandlers[d.type]||(h=d.name,d=new CKEDITOR.style(d),a.filter.customConfig&&!a.filter.check(d)))||(d._name=h,d._.enterMode=f.enterMode,d._.type=l=d.assignedTo||d.type,d._.weight=
g+1E3*(l==CKEDITOR.STYLE_OBJECT?1:l==CKEDITOR.STYLE_BLOCK?2:3),c[h]=d,e.push(d),m.push(d));e.sort(function(a,b){return a._.weight-b._.weight})}});a.ui.addRichCombo("Styles",{label:b.label,title:b.panelTitle,toolbar:"styles,10",allowedContent:m,panel:{css:[CKEDITOR.skin.getPath("editor")].concat(f.contentsCss),multiSelect:!0,attributes:{"aria-label":b.panelTitle}},init:function(){var a,c,f,l,g,m;g=0;for(m=e.length;g<m;g++)a=e[g],c=a._name,l=a._.type,l!=f&&(this.startGroup(b["panelTitle"+String(l)]),
f=l),this.add(c,a.type==CKEDITOR.STYLE_OBJECT?c:a.buildPreview(),c);this.commit()},onClick:function(b){a.focus();a.fire("saveSnapshot");b=c[b];var d=a.elementPath();if(b.group&&b.removeStylesFromSameGroup(a))a.applyStyle(b);else a[b.checkActive(d,a)?"removeStyle":"applyStyle"](b);a.fire("saveSnapshot")},onRender:function(){a.on("selectionChange",function(b){var d=this.getValue();b=b.data.path.elements;for(var e=0,f=b.length,g;e<f;e++){g=b[e];for(var m in c)if(c[m].checkElementRemovable(g,!0,a)){m!=
d&&this.setValue(m);return}}this.setValue("")},this)},onOpen:function(){var e=a.getSelection().getSelectedElement()||a.editable(),e=a.elementPath(e),d=[0,0,0,0];this.showAll();this.unmarkAll();for(var f in c){var l=c[f],g=l._.type;l.checkApplicable(e,a,a.activeFilter)?d[g]++:this.hideItem(f);l.checkActive(e,a)&&this.mark(f)}d[CKEDITOR.STYLE_BLOCK]||this.hideGroup(b["panelTitle"+String(CKEDITOR.STYLE_BLOCK)]);d[CKEDITOR.STYLE_INLINE]||this.hideGroup(b["panelTitle"+String(CKEDITOR.STYLE_INLINE)]);d[CKEDITOR.STYLE_OBJECT]||
this.hideGroup(b["panelTitle"+String(CKEDITOR.STYLE_OBJECT)])},refresh:function(){var b=a.elementPath();if(b){for(var d in c)if(c[d].checkApplicable(b,a,a.activeFilter))return;this.setState(CKEDITOR.TRISTATE_DISABLED)}},reset:function(){c={};e=[]}})}})}(),function(){function a(a){return{editorFocus:!1,canUndo:!1,modes:{wysiwyg:1},exec:function(b){if(b.editable().hasFocus){var c=b.getSelection(),d;if(d=(new CKEDITOR.dom.elementPath(c.getCommonAncestor(),c.root)).contains({td:1,th:1},1)){var c=b.createRange(),
f=CKEDITOR.tools.tryThese(function(){var b=d.getParent().$.cells[d.$.cellIndex+(a?-1:1)];b.parentNode.parentNode;return b},function(){var b=d.getParent(),b=b.getAscendant("table").$.rows[b.$.rowIndex+(a?-1:1)];return b.cells[a?b.cells.length-1:0]});if(f||a)if(f)f=new CKEDITOR.dom.element(f),c.moveToElementEditStart(f),c.checkStartOfBlock()&&c.checkEndOfBlock()||c.selectNodeContents(f);else return!0;else{for(var l=d.getAscendant("table").$,f=d.getParent().$.cells,l=new CKEDITOR.dom.element(l.insertRow(-1),
b.document),g=0,n=f.length;g<n;g++)l.append((new CKEDITOR.dom.element(f[g],b.document)).clone(!1,!1)).appendBogus();c.moveToElementEditStart(l)}c.select(!0);return!0}}return!1}}}var f={editorFocus:!1,modes:{wysiwyg:1,source:1}},b={exec:function(a){a.container.focusNext(!0,a.tabIndex)}},c={exec:function(a){a.container.focusPrevious(!0,a.tabIndex)}};CKEDITOR.plugins.add("tab",{init:function(e){for(var m=!1!==e.config.enableTabKeyTools,k=e.config.tabSpaces||0,d="";k--;)d+=" ";if(d)e.on("key",function(a){9==
a.data.keyCode&&(e.insertText(d),a.cancel())});if(m)e.on("key",function(a){(9==a.data.keyCode&&e.execCommand("selectNextCell")||a.data.keyCode==CKEDITOR.SHIFT+9&&e.execCommand("selectPreviousCell"))&&a.cancel()});e.addCommand("blur",CKEDITOR.tools.extend(b,f));e.addCommand("blurBack",CKEDITOR.tools.extend(c,f));e.addCommand("selectNextCell",a());e.addCommand("selectPreviousCell",a(!0))}})}(),CKEDITOR.dom.element.prototype.focusNext=function(a,f){var b=void 0===f?this.getTabIndex():f,c,e,m,k,d,h;if(0>=
b)for(d=this.getNextSourceNode(a,CKEDITOR.NODE_ELEMENT);d;){if(d.isVisible()&&0===d.getTabIndex()){m=d;break}d=d.getNextSourceNode(!1,CKEDITOR.NODE_ELEMENT)}else for(d=this.getDocument().getBody().getFirst();d=d.getNextSourceNode(!1,CKEDITOR.NODE_ELEMENT);){if(!c)if(!e&&d.equals(this)){if(e=!0,a){if(!(d=d.getNextSourceNode(!0,CKEDITOR.NODE_ELEMENT)))break;c=1}}else e&&!this.contains(d)&&(c=1);if(d.isVisible()&&!(0>(h=d.getTabIndex()))){if(c&&h==b){m=d;break}h>b&&(!m||!k||h<k)?(m=d,k=h):m||0!==h||
(m=d,k=h)}}m&&m.focus()},CKEDITOR.dom.element.prototype.focusPrevious=function(a,f){for(var b=void 0===f?this.getTabIndex():f,c,e,m,k=0,d,h=this.getDocument().getBody().getLast();h=h.getPreviousSourceNode(!1,CKEDITOR.NODE_ELEMENT);){if(!c)if(!e&&h.equals(this)){if(e=!0,a){if(!(h=h.getPreviousSourceNode(!0,CKEDITOR.NODE_ELEMENT)))break;c=1}}else e&&!this.contains(h)&&(c=1);if(h.isVisible()&&!(0>(d=h.getTabIndex())))if(0>=b){if(c&&0===d){m=h;break}d>k&&(m=h,k=d)}else{if(c&&d==b){m=h;break}d<b&&(!m||
d>k)&&(m=h,k=d)}}m&&m.focus()},CKEDITOR.plugins.add("table",{requires:"dialog",init:function(a){function f(a){return CKEDITOR.tools.extend(a||{},{contextSensitive:1,refresh:function(a,b){this.setState(b.contains("table",1)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED)}})}if(!a.blockless){var b=a.lang.table;a.addCommand("table",new CKEDITOR.dialogCommand("table",{context:"table",allowedContent:"table{width,height}[align,border,cellpadding,cellspacing,summary];caption tbody thead tfoot;th td tr[scope];"+
(a.plugins.dialogadvtab?"table"+a.plugins.dialogadvtab.allowedContent():""),requiredContent:"table",contentTransformations:[["table{width}: sizeToStyle","table[width]: sizeToAttribute"],["td: splitBorderShorthand"],[{element:"table",right:function(a){if(a.styles){var b;if(a.styles.border)b=CKEDITOR.tools.style.parse.border(a.styles.border);else if(CKEDITOR.env.ie&&8===CKEDITOR.env.version){var f=a.styles;f["border-left"]&&f["border-left"]===f["border-right"]&&f["border-right"]===f["border-top"]&&
f["border-top"]===f["border-bottom"]&&(b=CKEDITOR.tools.style.parse.border(f["border-top"]))}b&&b.style&&"solid"===b.style&&b.width&&0!==parseFloat(b.width)&&(a.attributes.border=1);"collapse"==a.styles["border-collapse"]&&(a.attributes.cellspacing=0)}}}]]}));a.addCommand("tableProperties",new CKEDITOR.dialogCommand("tableProperties",f()));a.addCommand("tableDelete",f({exec:function(a){var b=a.elementPath().contains("table",1);if(b){var f=b.getParent(),k=a.editable();1!=f.getChildCount()||f.is("td",
"th")||f.equals(k)||(b=f);a=a.createRange();a.moveToPosition(b,CKEDITOR.POSITION_BEFORE_START);b.remove();a.select()}}}));a.ui.addButton&&a.ui.addButton("Table",{label:b.toolbar,command:"table",toolbar:"insert,30"});CKEDITOR.dialog.add("table",this.path+"dialogs/table.js");CKEDITOR.dialog.add("tableProperties",this.path+"dialogs/table.js");a.addMenuItems&&a.addMenuItems({table:{label:b.menu,command:"tableProperties",group:"table",order:5},tabledelete:{label:b.deleteTable,command:"tableDelete",group:"table",
order:1}});a.on("doubleclick",function(a){a.data.element.is("table")&&(a.data.dialog="tableProperties")});a.contextMenu&&a.contextMenu.addListener(function(){return{tabledelete:CKEDITOR.TRISTATE_OFF,table:CKEDITOR.TRISTATE_OFF}})}}}),function(){function a(a,b){function c(a){return b?b.contains(a)&&a.getAscendant("table",!0).equals(b):!0}function d(a){0<e.length||a.type!=CKEDITOR.NODE_ELEMENT||!C.test(a.getName())||a.getCustomData("selected_cell")||(CKEDITOR.dom.element.setMarker(f,a,"selected_cell",
!0),e.push(a))}var e=[],f={};if(!a)return e;for(var g=a.getRanges(),h=0;h<g.length;h++){var k=g[h];if(k.collapsed)(k=k.getCommonAncestor().getAscendant({td:1,th:1},!0))&&c(k)&&e.push(k);else{var k=new CKEDITOR.dom.walker(k),l;for(k.guard=d;l=k.next();)l.type==CKEDITOR.NODE_ELEMENT&&l.is(CKEDITOR.dtd.table)||(l=l.getAscendant({td:1,th:1},!0))&&!l.getCustomData("selected_cell")&&c(l)&&(CKEDITOR.dom.element.setMarker(f,l,"selected_cell",!0),e.push(l))}}CKEDITOR.dom.element.clearAllMarkers(f);return e}
function f(b,c){for(var d=w(b)?b:a(b),e=d[0],f=e.getAscendant("table"),e=e.getDocument(),g=d[0].getParent(),h=g.$.rowIndex,d=d[d.length-1],k=d.getParent().$.rowIndex+d.$.rowSpan-1,d=new CKEDITOR.dom.element(f.$.rows[k]),h=c?h:k,g=c?g:d,d=CKEDITOR.tools.buildTableMap(f),f=d[h],h=c?d[h-1]:d[h+1],d=d[0].length,e=e.createElement("tr"),k=0;f[k]&&k<d;k++){var l;1<f[k].rowSpan&&h&&f[k]==h[k]?(l=f[k],l.rowSpan+=1):(l=(new CKEDITOR.dom.element(f[k])).clone(),l.removeAttribute("rowSpan"),l.appendBogus(),e.append(l),
l=l.$);k+=l.colSpan-1}c?e.insertBefore(g):e.insertAfter(g);return e}function b(c){if(c instanceof CKEDITOR.dom.selection){var d=c.getRanges(),e=a(c),f=e[0].getAscendant("table"),g=CKEDITOR.tools.buildTableMap(f),h=e[0].getParent().$.rowIndex,e=e[e.length-1],k=e.getParent().$.rowIndex+e.$.rowSpan-1,e=[];c.reset();for(c=h;c<=k;c++){for(var l=g[c],m=new CKEDITOR.dom.element(f.$.rows[c]),n=0;n<l.length;n++){var p=new CKEDITOR.dom.element(l[n]),u=p.getParent().$.rowIndex;1==p.$.rowSpan?p.remove():(--p.$.rowSpan,
u==c&&(u=g[c+1],u[n-1]?p.insertAfter(new CKEDITOR.dom.element(u[n-1])):(new CKEDITOR.dom.element(f.$.rows[c+1])).append(p,1)));n+=p.$.colSpan-1}e.push(m)}g=f.$.rows;d[0].moveToPosition(f,CKEDITOR.POSITION_BEFORE_START);h=new CKEDITOR.dom.element(g[k+1]||(0<h?g[h-1]:null)||f.$.parentNode);for(c=e.length;0<=c;c--)b(e[c]);return f.$.parentNode?h:(d[0].select(),null)}c instanceof CKEDITOR.dom.element&&(f=c.getAscendant("table"),1==f.$.rows.length?f.remove():c.remove());return null}function c(a,b){for(var c=
a.getParent().$.cells,d=0,e=0;e<c.length;e++){var f=c[e],d=d+(b?1:f.colSpan);if(f==a.$)break}return d-1}function e(a,b){for(var d=b?Infinity:0,e=0;e<a.length;e++){var f=c(a[e],b);if(b?f<d:f>d)d=f}return d}function m(b,c){for(var d=w(b)?b:a(b),f=d[0].getAscendant("table"),g=e(d,1),d=e(d),h=c?g:d,k=CKEDITOR.tools.buildTableMap(f),f=[],g=[],d=[],l=k.length,m=0;m<l;m++)f.push(k[m][h]),g.push(c?k[m][h-1]:k[m][h+1]);for(m=0;m<l;m++)f[m]&&(1<f[m].colSpan&&g[m]==f[m]?(k=f[m],k.colSpan+=1):(h=new CKEDITOR.dom.element(f[m]),
k=h.clone(),k.removeAttribute("colSpan"),k.appendBogus(),k[c?"insertBefore":"insertAfter"].call(k,h),d.push(k),k=k.$),m+=k.rowSpan-1);return d}function k(b){function c(a){var b,d,e;b=a.getRanges();if(1!==b.length)return a;b=b[0];if(b.collapsed||0!==b.endOffset)return a;d=b.endContainer;e=d.getName().toLowerCase();if("td"!==e&&"th"!==e)return a;for((e=d.getPrevious())||(e=d.getParent().getPrevious().getLast());e.type!==CKEDITOR.NODE_TEXT&&"br"!==e.getName().toLowerCase();)if(e=e.getLast(),!e)return a;
b.setEndAt(e,CKEDITOR.POSITION_BEFORE_END);return b.select()}CKEDITOR.env.webkit&&!b.isFake&&(b=c(b));var d=b.getRanges(),e=a(b),f=e[0],g=e[e.length-1],e=f.getAscendant("table"),h=CKEDITOR.tools.buildTableMap(e),k,l,m=[];b.reset();var n=0;for(b=h.length;n<b;n++)for(var p=0,u=h[n].length;p<u;p++)void 0===k&&h[n][p]==f.$&&(k=p),h[n][p]==g.$&&(l=p);for(n=k;n<=l;n++)for(p=0;p<h.length;p++)g=h[p],f=new CKEDITOR.dom.element(e.$.rows[p]),g=new CKEDITOR.dom.element(g[n]),g.$&&(1==g.$.colSpan?g.remove():--g.$.colSpan,
p+=g.$.rowSpan-1,f.$.cells.length||m.push(f));k=h[0].length-1>l?new CKEDITOR.dom.element(h[0][l+1]):k&&-1!==h[0][k-1].cellIndex?new CKEDITOR.dom.element(h[0][k-1]):new CKEDITOR.dom.element(e.$.parentNode);m.length==b&&(d[0].moveToPosition(e,CKEDITOR.POSITION_AFTER_END),d[0].select(),e.remove());return k}function d(a,b){var c=a.getStartElement().getAscendant({td:1,th:1},!0);if(c){var d=c.clone();d.appendBogus();b?d.insertBefore(c):d.insertAfter(c)}}function h(b){if(b instanceof CKEDITOR.dom.selection){var c=
b.getRanges(),d=a(b),e=d[0]&&d[0].getAscendant("table"),f;a:{var g=0;f=d.length-1;for(var k={},m,n;m=d[g++];)CKEDITOR.dom.element.setMarker(k,m,"delete_cell",!0);for(g=0;m=d[g++];)if((n=m.getPrevious())&&!n.getCustomData("delete_cell")||(n=m.getNext())&&!n.getCustomData("delete_cell")){CKEDITOR.dom.element.clearAllMarkers(k);f=n;break a}CKEDITOR.dom.element.clearAllMarkers(k);g=d[0].getParent();(g=g.getPrevious())?f=g.getLast():(g=d[f].getParent(),f=(g=g.getNext())?g.getChild(0):null)}b.reset();for(b=
d.length-1;0<=b;b--)h(d[b]);f?l(f,!0):e&&(c[0].moveToPosition(e,CKEDITOR.POSITION_BEFORE_START),c[0].select(),e.remove())}else b instanceof CKEDITOR.dom.element&&(c=b.getParent(),1==c.getChildCount()?c.remove():b.remove())}function l(a,b){var c=a.getDocument(),d=CKEDITOR.document;CKEDITOR.env.ie&&10==CKEDITOR.env.version&&(d.focus(),c.focus());c=new CKEDITOR.dom.range(c);c["moveToElementEdit"+(b?"End":"Start")](a)||(c.selectNodeContents(a),c.collapse(b?!1:!0));c.select(!0)}function g(a,b,c){a=a[b];
if("undefined"==typeof c)return a;for(b=0;a&&b<a.length;b++){if(c.is&&a[b]==c.$)return b;if(b==c)return new CKEDITOR.dom.element(a[b])}return c.is?-1:null}function n(b,c,d){var e=a(b),f;if((c?1!=e.length:2>e.length)||(f=b.getCommonAncestor())&&f.type==CKEDITOR.NODE_ELEMENT&&f.is("table"))return!1;var h;b=e[0];f=b.getAscendant("table");var k=CKEDITOR.tools.buildTableMap(f),l=k.length,m=k[0].length,n=b.getParent().$.rowIndex,p=g(k,n,b);if(c){var u;try{var w=parseInt(b.getAttribute("rowspan"),10)||1;
h=parseInt(b.getAttribute("colspan"),10)||1;u=k["up"==c?n-w:"down"==c?n+w:n]["left"==c?p-h:"right"==c?p+h:p]}catch(C){return!1}if(!u||b.$==u)return!1;e["up"==c||"left"==c?"unshift":"push"](new CKEDITOR.dom.element(u))}c=b.getDocument();var K=n,w=u=0,J=!d&&new CKEDITOR.dom.documentFragment(c),D=0;for(c=0;c<e.length;c++){h=e[c];var Q=h.getParent(),N=h.getFirst(),R=h.$.colSpan,L=h.$.rowSpan,Q=Q.$.rowIndex,U=g(k,Q,h),D=D+R*L,w=Math.max(w,U-p+R);u=Math.max(u,Q-n+L);d||(R=h,(L=R.getBogus())&&L.remove(),
R.trim(),h.getChildren().count()&&(Q==K||!N||N.isBlockBoundary&&N.isBlockBoundary({br:1})||(K=J.getLast(CKEDITOR.dom.walker.whitespaces(!0)),!K||K.is&&K.is("br")||J.append("br")),h.moveChildren(J)),c?h.remove():h.setHtml(""));K=Q}if(d)return u*w==D;J.moveChildren(b);b.appendBogus();w>=m?b.removeAttribute("rowSpan"):b.$.rowSpan=u;u>=l?b.removeAttribute("colSpan"):b.$.colSpan=w;d=new CKEDITOR.dom.nodeList(f.$.rows);e=d.count();for(c=e-1;0<=c;c--)f=d.getItem(c),f.$.cells.length||(f.remove(),e++);return b}
function p(b,c){var d=a(b);if(1<d.length)return!1;if(c)return!0;var d=d[0],e=d.getParent(),f=e.getAscendant("table"),h=CKEDITOR.tools.buildTableMap(f),k=e.$.rowIndex,l=g(h,k,d),m=d.$.rowSpan,n;if(1<m){n=Math.ceil(m/2);for(var m=Math.floor(m/2),e=k+n,f=new CKEDITOR.dom.element(f.$.rows[e]),h=g(h,e),p,e=d.clone(),k=0;k<h.length;k++)if(p=h[k],p.parentNode==f.$&&k>l){e.insertBefore(new CKEDITOR.dom.element(p));break}else p=null;p||f.append(e)}else for(m=n=1,f=e.clone(),f.insertAfter(e),f.append(e=d.clone()),
p=g(h,k),l=0;l<p.length;l++)p[l].rowSpan++;e.appendBogus();d.$.rowSpan=n;e.$.rowSpan=m;1==n&&d.removeAttribute("rowSpan");1==m&&e.removeAttribute("rowSpan");return e}function u(b,c){var d=a(b);if(1<d.length)return!1;if(c)return!0;var d=d[0],e=d.getParent(),f=e.getAscendant("table"),f=CKEDITOR.tools.buildTableMap(f),h=g(f,e.$.rowIndex,d),k=d.$.colSpan;if(1<k)e=Math.ceil(k/2),k=Math.floor(k/2);else{for(var k=e=1,l=[],m=0;m<f.length;m++){var n=f[m];l.push(n[h]);1<n[h].rowSpan&&(m+=n[h].rowSpan-1)}for(f=
0;f<l.length;f++)l[f].colSpan++}f=d.clone();f.insertAfter(d);f.appendBogus();d.$.colSpan=e;f.$.colSpan=k;1==e&&d.removeAttribute("colSpan");1==k&&f.removeAttribute("colSpan");return f}var C=/^(?:td|th)$/,w=CKEDITOR.tools.isArray;CKEDITOR.plugins.tabletools={requires:"table,dialog,contextmenu",init:function(c){function e(a){return CKEDITOR.tools.extend(a||{},{contextSensitive:1,refresh:function(a,b){this.setState(b.contains({td:1,th:1},1)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED)}})}function g(a,
b){var d=c.addCommand(a,b);c.addFeature(d)}var w=c.lang.table,t=CKEDITOR.tools.style.parse;g("cellProperties",new CKEDITOR.dialogCommand("cellProperties",e({allowedContent:"td th{width,height,border-color,background-color,white-space,vertical-align,text-align}[colspan,rowspan]",requiredContent:"table",contentTransformations:[[{element:"td",left:function(a){return a.styles.background&&t.background(a.styles.background).color},right:function(a){a.styles["background-color"]=t.background(a.styles.background).color}},
{element:"td",check:"td{vertical-align}",left:function(a){return a.attributes&&a.attributes.valign},right:function(a){a.styles["vertical-align"]=a.attributes.valign;delete a.attributes.valign}}],[{element:"tr",check:"td{height}",left:function(a){return a.styles&&a.styles.height},right:function(a){CKEDITOR.tools.array.forEach(a.children,function(b){b.name in{td:1,th:1}&&(b.attributes["cke-row-height"]=a.styles.height)});delete a.styles.height}}],[{element:"td",check:"td{height}",left:function(a){return(a=
a.attributes)&&a["cke-row-height"]},right:function(a){a.styles.height=a.attributes["cke-row-height"];delete a.attributes["cke-row-height"]}}]]})));CKEDITOR.dialog.add("cellProperties",this.path+"dialogs/tableCell.js");g("rowDelete",e({requiredContent:"table",exec:function(a){a=a.getSelection();(a=b(a))&&l(a)}}));g("rowInsertBefore",e({requiredContent:"table",exec:function(b){b=b.getSelection();b=a(b);f(b,!0)}}));g("rowInsertAfter",e({requiredContent:"table",exec:function(b){b=b.getSelection();b=a(b);
f(b)}}));g("columnDelete",e({requiredContent:"table",exec:function(a){a=a.getSelection();(a=k(a))&&l(a,!0)}}));g("columnInsertBefore",e({requiredContent:"table",exec:function(b){b=b.getSelection();b=a(b);m(b,!0)}}));g("columnInsertAfter",e({requiredContent:"table",exec:function(b){b=b.getSelection();b=a(b);m(b)}}));g("cellDelete",e({requiredContent:"table",exec:function(a){a=a.getSelection();h(a)}}));g("cellMerge",e({allowedContent:"td[colspan,rowspan]",requiredContent:"td[colspan,rowspan]",exec:function(a,
b){b.cell=n(a.getSelection());l(b.cell,!0)}}));g("cellMergeRight",e({allowedContent:"td[colspan]",requiredContent:"td[colspan]",exec:function(a,b){b.cell=n(a.getSelection(),"right");l(b.cell,!0)}}));g("cellMergeDown",e({allowedContent:"td[rowspan]",requiredContent:"td[rowspan]",exec:function(a,b){b.cell=n(a.getSelection(),"down");l(b.cell,!0)}}));g("cellVerticalSplit",e({allowedContent:"td[rowspan]",requiredContent:"td[rowspan]",exec:function(a){l(u(a.getSelection()))}}));g("cellHorizontalSplit",
e({allowedContent:"td[colspan]",requiredContent:"td[colspan]",exec:function(a){l(p(a.getSelection()))}}));g("cellInsertBefore",e({requiredContent:"table",exec:function(a){a=a.getSelection();d(a,!0)}}));g("cellInsertAfter",e({requiredContent:"table",exec:function(a){a=a.getSelection();d(a)}}));c.addMenuItems&&c.addMenuItems({tablecell:{label:w.cell.menu,group:"tablecell",order:1,getItems:function(){var b=c.getSelection(),d=a(b);return{tablecell_insertBefore:CKEDITOR.TRISTATE_OFF,tablecell_insertAfter:CKEDITOR.TRISTATE_OFF,
tablecell_delete:CKEDITOR.TRISTATE_OFF,tablecell_merge:n(b,null,!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_merge_right:n(b,"right",!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_merge_down:n(b,"down",!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_split_vertical:u(b,!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_split_horizontal:p(b,!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_properties:0<d.length?CKEDITOR.TRISTATE_OFF:
CKEDITOR.TRISTATE_DISABLED}}},tablecell_insertBefore:{label:w.cell.insertBefore,group:"tablecell",command:"cellInsertBefore",order:5},tablecell_insertAfter:{label:w.cell.insertAfter,group:"tablecell",command:"cellInsertAfter",order:10},tablecell_delete:{label:w.cell.deleteCell,group:"tablecell",command:"cellDelete",order:15},tablecell_merge:{label:w.cell.merge,group:"tablecell",command:"cellMerge",order:16},tablecell_merge_right:{label:w.cell.mergeRight,group:"tablecell",command:"cellMergeRight",
order:17},tablecell_merge_down:{label:w.cell.mergeDown,group:"tablecell",command:"cellMergeDown",order:18},tablecell_split_horizontal:{label:w.cell.splitHorizontal,group:"tablecell",command:"cellHorizontalSplit",order:19},tablecell_split_vertical:{label:w.cell.splitVertical,group:"tablecell",command:"cellVerticalSplit",order:20},tablecell_properties:{label:w.cell.title,group:"tablecellproperties",command:"cellProperties",order:21},tablerow:{label:w.row.menu,group:"tablerow",order:1,getItems:function(){return{tablerow_insertBefore:CKEDITOR.TRISTATE_OFF,
tablerow_insertAfter:CKEDITOR.TRISTATE_OFF,tablerow_delete:CKEDITOR.TRISTATE_OFF}}},tablerow_insertBefore:{label:w.row.insertBefore,group:"tablerow",command:"rowInsertBefore",order:5},tablerow_insertAfter:{label:w.row.insertAfter,group:"tablerow",command:"rowInsertAfter",order:10},tablerow_delete:{label:w.row.deleteRow,group:"tablerow",command:"rowDelete",order:15},tablecolumn:{label:w.column.menu,group:"tablecolumn",order:1,getItems:function(){return{tablecolumn_insertBefore:CKEDITOR.TRISTATE_OFF,
tablecolumn_insertAfter:CKEDITOR.TRISTATE_OFF,tablecolumn_delete:CKEDITOR.TRISTATE_OFF}}},tablecolumn_insertBefore:{label:w.column.insertBefore,group:"tablecolumn",command:"columnInsertBefore",order:5},tablecolumn_insertAfter:{label:w.column.insertAfter,group:"tablecolumn",command:"columnInsertAfter",order:10},tablecolumn_delete:{label:w.column.deleteColumn,group:"tablecolumn",command:"columnDelete",order:15}});c.contextMenu&&c.contextMenu.addListener(function(a,b,c){return(a=c.contains({td:1,th:1},
1))&&!a.isReadOnly()?{tablecell:CKEDITOR.TRISTATE_OFF,tablerow:CKEDITOR.TRISTATE_OFF,tablecolumn:CKEDITOR.TRISTATE_OFF}:null})},getCellColIndex:c,insertRow:f,insertColumn:m,getSelectedCells:a};CKEDITOR.plugins.add("tabletools",CKEDITOR.plugins.tabletools)}(),CKEDITOR.tools.buildTableMap=function(a,f,b,c,e){a=a.$.rows;b=b||0;c="number"===typeof c?c:a.length-1;e="number"===typeof e?e:-1;var m=-1,k=[];for(f=f||0;f<=c;f++){m++;!k[m]&&(k[m]=[]);for(var d=-1,h=b;h<=(-1===e?a[f].cells.length-1:e);h++){var l=
a[f].cells[h];if(!l)break;for(d++;k[m][d];)d++;for(var g=isNaN(l.colSpan)?1:l.colSpan,l=isNaN(l.rowSpan)?1:l.rowSpan,n=0;n<l&&!(f+n>c);n++){k[m+n]||(k[m+n]=[]);for(var p=0;p<g;p++)k[m+n][d+p]=a[f].cells[h]}d+=g-1;if(-1!==e&&d>=e)break}}return k},function(){function a(a,b){var c=a.getAscendant("table"),d=b.getAscendant("table"),e=CKEDITOR.tools.buildTableMap(c),f=h(a),g=h(b),k=[],l={},m,n;c.contains(d)&&(b=b.getAscendant({td:1,th:1}),g=h(b));f>g&&(c=f,f=g,g=c,c=a,a=b,b=c);for(c=0;c<e[f].length;c++)if(a.$===
e[f][c]){m=c;break}for(c=0;c<e[g].length;c++)if(b.$===e[g][c]){n=c;break}m>n&&(c=m,m=n,n=c);for(c=f;c<=g;c++)for(f=m;f<=n;f++)d=new CKEDITOR.dom.element(e[c][f]),d.$&&!d.getCustomData("selected_cell")&&(k.push(d),CKEDITOR.dom.element.setMarker(l,d,"selected_cell",!0));CKEDITOR.dom.element.clearAllMarkers(l);return k}function f(a){if(a)return a=a.clone(),a.enlarge(CKEDITOR.ENLARGE_ELEMENT),(a=a.getEnclosedNode())&&a.is&&a.is(CKEDITOR.dtd.$tableContent)}function b(a){return(a=a.editable().findOne(".cke_table-faked-selection"))&&
a.getAscendant("table")}function c(a,b){var c=a.editable().find(".cke_table-faked-selection"),d;a.fire("lockSnapshot");a.editable().removeClass("cke_table-faked-selection-editor");for(d=0;d<c.count();d++)c.getItem(d).removeClass("cke_table-faked-selection");0<c.count()&&c.getItem(0).getAscendant("table").data("cke-table-faked-selection-table",!1);a.fire("unlockSnapshot");b&&(w={active:!1},a.getSelection().isInTable()&&a.getSelection().reset())}function e(a,b){var c=[],d,e;for(e=0;e<b.length;e++)d=
a.createRange(),d.setStartBefore(b[e]),d.setEndAfter(b[e]),c.push(d);a.getSelection().selectRanges(c)}function m(b){var c=b.editable().find(".cke_table-faked-selection");1>c.count()||(c=a(c.getItem(0),c.getItem(c.count()-1)),e(b,c))}function k(b,d,f){var g=x(b.getSelection(!0));d=d.is("table")?null:d;var h;(h=w.active&&!w.first)&&!(h=d)&&(h=b.getSelection().getRanges(),h=1<g.length||h[0]&&!h[0].collapsed?!0:!1);if(h)w.first=d||g[0],w.dirty=d?!1:1!==g.length;else if(w.active&&d&&w.first.getAscendant("table").equals(d.getAscendant("table"))){g=
a(w.first,d);if(!w.dirty&&1===g.length)return c(b,"mouseup"===f.name);w.dirty=!0;w.last=d;e(b,g)}}function d(a){var b=(a=a.editor||a.sender.editor)&&a.getSelection(),d=b&&b.getRanges()||[],e;if(b&&(c(a),b.isInTable()&&b.isFake)){1===d.length&&d[0]._getTableElement()&&d[0]._getTableElement().is("table")&&(e=d[0]._getTableElement());e=x(b,e);a.fire("lockSnapshot");for(b=0;b<e.length;b++)e[b].addClass("cke_table-faked-selection");0<e.length&&(a.editable().addClass("cke_table-faked-selection-editor"),
e[0].getAscendant("table").data("cke-table-faked-selection-table",""));a.fire("unlockSnapshot")}}function h(a){return a.getAscendant("tr",!0).$.rowIndex}function l(a){function d(a,b){return a&&b?a.equals(b)||a.contains(b)||b.contains(a)||a.getCommonAncestor(b).is(u):!1}function e(a){return!a.getAscendant("table",!0)&&a.getDocument().equals(g.document)}function f(a,b,c,g){return("mousedown"!==a.name||CKEDITOR.tools.getMouseButton(a)!==CKEDITOR.MOUSE_BUTTON_LEFT&&g)&&("mouseup"!==a.name||e(a.data.getTarget())||
d(c,g))?!1:!0}if(a.data.getTarget().getName){var g=a.editor||a.listenerData.editor,h=g.getSelection(1),n=b(g),p=a.data.getTarget(),q=p&&p.getAscendant({td:1,th:1},!0),p=p&&p.getAscendant("table",!0),u={table:1,thead:1,tbody:1,tfoot:1,tr:1,td:1,th:1};f(a,h,n,p)&&c(g,!0);!w.active&&"mousedown"===a.name&&CKEDITOR.tools.getMouseButton(a)===CKEDITOR.MOUSE_BUTTON_LEFT&&p&&(w={active:!0},CKEDITOR.document.on("mouseup",l,null,{editor:g}));(q||p)&&k(g,q||p,a);"mouseup"===a.name&&(CKEDITOR.tools.getMouseButton(a)===
CKEDITOR.MOUSE_BUTTON_LEFT&&(e(a.data.getTarget())||d(n,p))&&m(g),w={active:!1},CKEDITOR.document.removeListener("mouseup",l))}}function g(a){var b=a.data.getTarget().getAscendant({td:1,th:1},!0);b&&!b.hasClass("cke_table-faked-selection")&&(a.cancel(),a.data.preventDefault())}function n(a,b){function c(a){a.cancel()}var d=a.getSelection(),e=d.createBookmarks(),f=a.document,g=a.createRange(),h=f.getDocumentElement().$,k=CKEDITOR.env.ie&&9>CKEDITOR.env.version,l=a.blockless||CKEDITOR.env.ie?"span":
"div",m,n,p,q;f.getById("cke_table_copybin")||(m=f.createElement(l),n=f.createElement(l),n.setAttributes({id:"cke_table_copybin","data-cke-temp":"1"}),m.setStyles({position:"absolute",width:"1px",height:"1px",overflow:"hidden"}),m.setStyle("ltr"==a.config.contentsLangDirection?"left":"right","-5000px"),m.setHtml(a.getSelectedHtml(!0)),a.fire("lockSnapshot"),n.append(m),a.editable().append(n),q=a.on("selectionChange",c,null,null,0),k&&(p=h.scrollTop),g.selectNodeContents(m),g.select(),k&&(h.scrollTop=
p),setTimeout(function(){n.remove();d.selectBookmarks(e);q.removeListener();a.fire("unlockSnapshot");b&&(a.extractSelectedHtml(),a.fire("saveSnapshot"))},100))}function p(a){var b=a.editor||a.sender.editor;b.getSelection().isInTable()&&n(b,"cut"===a.name)}function u(a){this._reset();a&&this.setSelectedCells(a)}function C(a,b,c){a.on("beforeCommandExec",function(c){-1!==CKEDITOR.tools.array.indexOf(b,c.data.name)&&(c.data.selectedCells=x(a.getSelection()))});a.on("afterCommandExec",function(d){-1!==
CKEDITOR.tools.array.indexOf(b,d.data.name)&&c(a,d.data)})}var w={active:!1},q,x,r,A,t;u.prototype={};u.prototype._reset=function(){this.cells={first:null,last:null,all:[]};this.rows={first:null,last:null}};u.prototype.setSelectedCells=function(a){this._reset();a=a.slice(0);this._arraySortByDOMOrder(a);this.cells.all=a;this.cells.first=a[0];this.cells.last=a[a.length-1];this.rows.first=a[0].getAscendant("tr");this.rows.last=this.cells.last.getAscendant("tr")};u.prototype.getTableMap=function(){var a=
r(this.cells.first,!0),b;a:{b=this.cells.last;var c=b.getAscendant("table"),d=h(b),c=CKEDITOR.tools.buildTableMap(c),e;for(e=0;e<c[d].length;e++)if((new CKEDITOR.dom.element(c[d][e])).equals(b)){b=e;break a}b=void 0}return CKEDITOR.tools.buildTableMap(this._getTable(),h(this.rows.first),a,h(this.rows.last),b)};u.prototype._getTable=function(){return this.rows.first.getAscendant("table")};u.prototype.insertRow=function(a,b,c){if("undefined"===typeof a)a=1;else if(0>=a)return;for(var d=this.cells.first.$.cellIndex,
e=this.cells.last.$.cellIndex,f=c?[]:this.cells.all,g,h=0;h<a;h++)g=A(c?this.cells.all:f,b),g=CKEDITOR.tools.array.filter(g.find("td, th").toArray(),function(a){return c?!0:a.$.cellIndex>=d&&a.$.cellIndex<=e}),f=b?g.concat(f):f.concat(g);this.setSelectedCells(f)};u.prototype.insertColumn=function(a){function b(a){a=h(a);return a>=e&&a<=f}if("undefined"===typeof a)a=1;else if(0>=a)return;for(var c=this.cells,d=c.all,e=h(c.first),f=h(c.last),c=0;c<a;c++)d=d.concat(CKEDITOR.tools.array.filter(t(d),b));
this.setSelectedCells(d)};u.prototype.emptyCells=function(a){a=a||this.cells.all;for(var b=0;b<a.length;b++)a[b].setHtml("")};u.prototype._arraySortByDOMOrder=function(a){a.sort(function(a,b){return a.getPosition(b)&CKEDITOR.POSITION_PRECEDING?-1:1})};var y={onPaste:function(b){function c(a){return Math.max.apply(null,CKEDITOR.tools.array.map(a,function(a){return a.length},0))}function d(a){var b=g.createRange();b.selectNodeContents(a);b.select()}var g=b.editor,h=g.getSelection(),k=x(h),l=this.findTableInPastedContent(g,
b.data.dataValue),m=h.isInTable(!0)&&this.isBoundarySelection(h),n,p;!k.length||1===k.length&&!f(h.getRanges()[0])&&!m||m&&!l||(k=k[0].getAscendant("table"),n=new u(x(h,k)),g.once("afterPaste",function(){var b;if(p){b=new CKEDITOR.dom.element(p[0][0]);var c=p[p.length-1];b=a(b,new CKEDITOR.dom.element(c[c.length-1]))}else b=n.cells.all;e(g,b)}),l?(b.stop(),m?(n.insertRow(1,1===m,!0),h.selectElement(n.rows.first)):(n.emptyCells(),e(g,n.cells.all)),b=n.getTableMap(),p=CKEDITOR.tools.buildTableMap(l),
n.insertRow(p.length-b.length),n.insertColumn(c(p)-c(b)),b=n.getTableMap(),this.pasteTable(n,b,p),g.fire("saveSnapshot"),setTimeout(function(){g.fire("afterPaste")},0)):(d(n.cells.first),g.once("afterPaste",function(){g.fire("lockSnapshot");n.emptyCells(n.cells.all.slice(1));e(g,n.cells.all);g.fire("unlockSnapshot")})))},isBoundarySelection:function(a){a=a.getRanges()[0];var b=a.endContainer.getAscendant("tr",!0);if(b&&a.collapsed){if(a.checkBoundaryOfElement(b,CKEDITOR.START))return 1;if(a.checkBoundaryOfElement(b,
CKEDITOR.END))return 2}return 0},findTableInPastedContent:function(a,b){var c=a.dataProcessor,d=new CKEDITOR.dom.element("body");c||(c=new CKEDITOR.htmlDataProcessor(a));d.setHtml(c.toHtml(b),{fixForBody:!1});return 1<d.getChildCount()?null:d.findOne("table")},pasteTable:function(a,b,c){var d,e=r(a.cells.first,!0),f=a._getTable(),g={},h,k,l,m;for(l=0;l<c.length;l++)for(h=new CKEDITOR.dom.element(f.$.rows[a.rows.first.$.rowIndex+l]),m=0;m<c[l].length;m++)if(k=new CKEDITOR.dom.element(c[l][m]),d=b[l]&&
b[l][m]?new CKEDITOR.dom.element(b[l][m]):null,k&&!k.getCustomData("processed")){if(d&&d.getParent())k.replace(d);else if(0===m||c[l][m-1])(d=0!==m?new CKEDITOR.dom.element(c[l][m-1]):null)&&h.equals(d.getParent())?k.insertAfter(d):0<e?h.$.cells[e]?k.insertAfter(new CKEDITOR.dom.element(h.$.cells[e])):h.append(k):h.append(k,!0);CKEDITOR.dom.element.setMarker(g,k,"processed",!0)}else k.getCustomData("processed")&&d&&d.remove();CKEDITOR.dom.element.clearAllMarkers(g)}};CKEDITOR.plugins.tableselection=
{getCellsBetween:a,keyboardIntegration:function(a){function b(a){var c=a.getEnclosedNode();c&&c.is({td:1,th:1})?a.getEnclosedNode().setText(""):a.deleteContents();CKEDITOR.tools.array.forEach(a._find("td"),function(a){a.appendBogus()})}var c=a.editable();c.attachListener(c,"keydown",function(a){function c(b,d){if(!d.length)return null;var f=a.createRange(),g=CKEDITOR.dom.range.mergeRanges(d);CKEDITOR.tools.array.forEach(g,function(a){a.enlarge(CKEDITOR.ENLARGE_ELEMENT)});var h=g[0].getBoundaryNodes(),
k=h.startNode,h=h.endNode;if(k&&k.is&&k.is(e)){for(var l=k.getAscendant("table",!0),m=k.getPreviousSourceNode(!1,CKEDITOR.NODE_ELEMENT,l),n=!1,p=function(a){return!k.contains(a)&&a.is&&a.is("td","th")};m&&!p(m);)m=m.getPreviousSourceNode(!1,CKEDITOR.NODE_ELEMENT,l);!m&&h&&h.is&&!h.is("table")&&h.getNext()&&(m=h.getNext().findOne("td, th"),n=!0);if(m)f["moveToElementEdit"+(n?"Start":"End")](m);else f.setStartBefore(k.getAscendant("table",!0)),f.collapse(!0);g[0].deleteContents();return[f]}if(k)return f.moveToElementEditablePosition(k),
[f]}var d={37:1,38:1,39:1,40:1,8:1,46:1},e=CKEDITOR.tools.extend({table:1},CKEDITOR.dtd.$tableContent);delete e.td;delete e.th;return function(e){var f=e.data.getKey(),g,h=37===f||38==f,k,l,m;if(d[f]&&(g=a.getSelection())&&g.isInTable()&&g.isFake)if(k=g.getRanges(),l=k[0]._getTableElement(),m=k[k.length-1]._getTableElement(),e.data.preventDefault(),e.cancel(),8<f&&46>f)k[0].moveToElementEditablePosition(h?l:m,!h),g.selectRanges([k[0]]);else{for(e=0;e<k.length;e++)b(k[e]);(e=c(l,k))?k=e:k[0].moveToElementEditablePosition(l);
g.selectRanges(k);a.fire("saveSnapshot")}}}(a),null,null,-1);c.attachListener(c,"keypress",function(c){var d=a.getSelection(),e=c.data.$.charCode||13===c.data.getKey(),f;if(d&&d.isInTable()&&d.isFake&&e&&!(c.data.getKeystroke()&CKEDITOR.CTRL)){c=d.getRanges();e=c[0].getEnclosedNode().getAscendant({td:1,th:1},!0);for(f=0;f<c.length;f++)b(c[f]);e&&(c[0].moveToElementEditablePosition(e),d.selectRanges([c[0]]))}},null,null,-1)},isSupportedEnvironment:!(CKEDITOR.env.ie&&11>CKEDITOR.env.version)};CKEDITOR.plugins.add("tableselection",
{requires:"clipboard,tabletools",onLoad:function(){q=CKEDITOR.plugins.tabletools;x=q.getSelectedCells;r=q.getCellColIndex;A=q.insertRow;t=q.insertColumn;CKEDITOR.document.appendStyleSheet(this.path+"styles/tableselection.css")},init:function(a){CKEDITOR.plugins.tableselection.isSupportedEnvironment&&(a.addContentsCss&&a.addContentsCss(this.path+"styles/tableselection.css"),a.on("contentDom",function(){var b=a.editable(),c=b.isInline()?b:a.document,e={editor:a};b.attachListener(c,"mousedown",l,null,
e);b.attachListener(c,"mousemove",l,null,e);b.attachListener(c,"mouseup",l,null,e);b.attachListener(b,"dragstart",g);b.attachListener(a,"selectionCheck",d);CKEDITOR.plugins.tableselection.keyboardIntegration(a);CKEDITOR.plugins.clipboard&&!CKEDITOR.plugins.clipboard.isCustomCopyCutSupported&&(b.attachListener(b,"cut",p),b.attachListener(b,"copy",p))}),a.on("paste",y.onPaste,y),C(a,"rowInsertBefore rowInsertAfter columnInsertBefore columnInsertAfter cellInsertBefore cellInsertAfter".split(" "),function(a,
b){e(a,b.selectedCells)}),C(a,["cellMerge","cellMergeRight","cellMergeDown"],function(a,b){e(a,[b.commandData.cell])}),C(a,["cellDelete"],function(a){c(a,!0)}))}})}(),"use strict",function(){var a=[CKEDITOR.CTRL+90,CKEDITOR.CTRL+89,CKEDITOR.CTRL+CKEDITOR.SHIFT+90],f={8:1,46:1};CKEDITOR.plugins.add("undo",{init:function(c){function e(a){g.enabled&&!1!==a.data.command.canUndo&&g.save()}function f(){g.enabled=c.readOnly?!1:"wysiwyg"==c.mode;g.onChange()}var g=c.undoManager=new b(c),k=g.editingHandler=
new m(g),p=c.addCommand("undo",{exec:function(){g.undo()&&(c.selectionChange(),this.fire("afterUndo"))},startDisabled:!0,canUndo:!1}),u=c.addCommand("redo",{exec:function(){g.redo()&&(c.selectionChange(),this.fire("afterRedo"))},startDisabled:!0,canUndo:!1});c.setKeystroke([[a[0],"undo"],[a[1],"redo"],[a[2],"redo"]]);g.onChange=function(){p.setState(g.undoable()?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED);u.setState(g.redoable()?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED)};c.on("beforeCommandExec",
e);c.on("afterCommandExec",e);c.on("saveSnapshot",function(a){g.save(a.data&&a.data.contentOnly)});c.on("contentDom",k.attachListeners,k);c.on("instanceReady",function(){c.fire("saveSnapshot")});c.on("beforeModeUnload",function(){"wysiwyg"==c.mode&&g.save(!0)});c.on("mode",f);c.on("readOnly",f);c.ui.addButton&&(c.ui.addButton("Undo",{label:c.lang.undo.undo,command:"undo",toolbar:"undo,10"}),c.ui.addButton("Redo",{label:c.lang.undo.redo,command:"redo",toolbar:"undo,20"}));c.resetUndo=function(){g.reset();
c.fire("saveSnapshot")};c.on("updateSnapshot",function(){g.currentImage&&g.update()});c.on("lockSnapshot",function(a){a=a.data;g.lock(a&&a.dontUpdate,a&&a.forceUpdate)});c.on("unlockSnapshot",g.unlock,g)}});CKEDITOR.plugins.undo={};var b=CKEDITOR.plugins.undo.UndoManager=function(a){this.strokesRecorded=[0,0];this.locked=null;this.previousKeyGroup=-1;this.limit=a.config.undoStackSize||20;this.strokesLimit=25;this.editor=a;this.reset()};b.prototype={type:function(a,c){var e=b.getKeyGroup(a),f=this.strokesRecorded[e]+
1;c=c||f>=this.strokesLimit;this.typing||(this.hasUndo=this.typing=!0,this.hasRedo=!1,this.onChange());c?(f=0,this.editor.fire("saveSnapshot")):this.editor.fire("change");this.strokesRecorded[e]=f;this.previousKeyGroup=e},keyGroupChanged:function(a){return b.getKeyGroup(a)!=this.previousKeyGroup},reset:function(){this.snapshots=[];this.index=-1;this.currentImage=null;this.hasRedo=this.hasUndo=!1;this.locked=null;this.resetType()},resetType:function(){this.strokesRecorded=[0,0];this.typing=!1;this.previousKeyGroup=
-1},refreshState:function(){this.hasUndo=!!this.getNextImage(!0);this.hasRedo=!!this.getNextImage(!1);this.resetType();this.onChange()},save:function(a,b,e){var f=this.editor;if(this.locked||"ready"!=f.status||"wysiwyg"!=f.mode)return!1;var k=f.editable();if(!k||"ready"!=k.status)return!1;k=this.snapshots;b||(b=new c(f));if(!1===b.contents)return!1;if(this.currentImage)if(b.equalsContent(this.currentImage)){if(a||b.equalsSelection(this.currentImage))return!1}else!1!==e&&f.fire("change");k.splice(this.index+
1,k.length-this.index-1);k.length==this.limit&&k.shift();this.index=k.push(b)-1;this.currentImage=b;!1!==e&&this.refreshState();return!0},restoreImage:function(a){var b=this.editor,c;a.bookmarks&&(b.focus(),c=b.getSelection());this.locked={level:999};this.editor.loadSnapshot(a.contents);a.bookmarks?c.selectBookmarks(a.bookmarks):CKEDITOR.env.ie&&(c=this.editor.document.getBody().$.createTextRange(),c.collapse(!0),c.select());this.locked=null;this.index=a.index;this.currentImage=this.snapshots[this.index];
this.update();this.refreshState();b.fire("change")},getNextImage:function(a){var b=this.snapshots,c=this.currentImage,e;if(c)if(a)for(e=this.index-1;0<=e;e--){if(a=b[e],!c.equalsContent(a))return a.index=e,a}else for(e=this.index+1;e<b.length;e++)if(a=b[e],!c.equalsContent(a))return a.index=e,a;return null},redoable:function(){return this.enabled&&this.hasRedo},undoable:function(){return this.enabled&&this.hasUndo},undo:function(){if(this.undoable()){this.save(!0);var a=this.getNextImage(!0);if(a)return this.restoreImage(a),
!0}return!1},redo:function(){if(this.redoable()&&(this.save(!0),this.redoable())){var a=this.getNextImage(!1);if(a)return this.restoreImage(a),!0}return!1},update:function(a){if(!this.locked){a||(a=new c(this.editor));for(var b=this.index,e=this.snapshots;0<b&&this.currentImage.equalsContent(e[b-1]);)--b;e.splice(b,this.index-b+1,a);this.index=b;this.currentImage=a}},updateSelection:function(a){if(!this.snapshots.length)return!1;var b=this.snapshots,c=b[b.length-1];return c.equalsContent(a)&&!c.equalsSelection(a)?
(this.currentImage=b[b.length-1]=a,!0):!1},lock:function(a,b){if(this.locked)this.locked.level++;else if(a)this.locked={level:1};else{var e=null;if(b)e=!0;else{var f=new c(this.editor,!0);this.currentImage&&this.currentImage.equalsContent(f)&&(e=f)}this.locked={update:e,level:1}}},unlock:function(){if(this.locked&&!--this.locked.level){var a=this.locked.update;this.locked=null;if(!0===a)this.update();else if(a){var b=new c(this.editor,!0);a.equalsContent(b)||this.update()}}}};b.navigationKeyCodes=
{37:1,38:1,39:1,40:1,36:1,35:1,33:1,34:1};b.keyGroups={PRINTABLE:0,FUNCTIONAL:1};b.isNavigationKey=function(a){return!!b.navigationKeyCodes[a]};b.getKeyGroup=function(a){var c=b.keyGroups;return f[a]?c.FUNCTIONAL:c.PRINTABLE};b.getOppositeKeyGroup=function(a){var c=b.keyGroups;return a==c.FUNCTIONAL?c.PRINTABLE:c.FUNCTIONAL};b.ieFunctionalKeysBug=function(a){return CKEDITOR.env.ie&&b.getKeyGroup(a)==b.keyGroups.FUNCTIONAL};var c=CKEDITOR.plugins.undo.Image=function(a,b){this.editor=a;a.fire("beforeUndoImage");
var c=a.getSnapshot();CKEDITOR.env.ie&&c&&(c=c.replace(/\s+data-cke-expando=".*?"/g,""));this.contents=c;b||(this.bookmarks=(c=c&&a.getSelection())&&c.createBookmarks2(!0));a.fire("afterUndoImage")},e=/\b(?:href|src|name)="[^"]*?"/gi;c.prototype={equalsContent:function(a){var b=this.contents;a=a.contents;CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)&&(b=b.replace(e,""),a=a.replace(e,""));return b!=a?!1:!0},equalsSelection:function(a){var b=this.bookmarks;a=a.bookmarks;if(b||a){if(!b||
!a||b.length!=a.length)return!1;for(var c=0;c<b.length;c++){var e=b[c],f=a[c];if(e.startOffset!=f.startOffset||e.endOffset!=f.endOffset||!CKEDITOR.tools.arrayCompare(e.start,f.start)||!CKEDITOR.tools.arrayCompare(e.end,f.end))return!1}}return!0}};var m=CKEDITOR.plugins.undo.NativeEditingHandler=function(a){this.undoManager=a;this.ignoreInputEvent=!1;this.keyEventsStack=new k;this.lastKeydownImage=null};m.prototype={onKeydown:function(d){var e=d.data.getKey();if(229!==e)if(-1<CKEDITOR.tools.indexOf(a,
d.data.getKeystroke()))d.data.preventDefault();else if(this.keyEventsStack.cleanUp(d),d=this.undoManager,this.keyEventsStack.getLast(e)||this.keyEventsStack.push(e),this.lastKeydownImage=new c(d.editor),b.isNavigationKey(e)||this.undoManager.keyGroupChanged(e))if(d.strokesRecorded[0]||d.strokesRecorded[1])d.save(!1,this.lastKeydownImage,!1),d.resetType()},onInput:function(){if(this.ignoreInputEvent)this.ignoreInputEvent=!1;else{var a=this.keyEventsStack.getLast();a||(a=this.keyEventsStack.push(0));
this.keyEventsStack.increment(a.keyCode);this.keyEventsStack.getTotalInputs()>=this.undoManager.strokesLimit&&(this.undoManager.type(a.keyCode,!0),this.keyEventsStack.resetInputs())}},onKeyup:function(a){var e=this.undoManager;a=a.data.getKey();var f=this.keyEventsStack.getTotalInputs();this.keyEventsStack.remove(a);if(!(b.ieFunctionalKeysBug(a)&&this.lastKeydownImage&&this.lastKeydownImage.equalsContent(new c(e.editor,!0))))if(0<f)e.type(a);else if(b.isNavigationKey(a))this.onNavigationKey(!0)},
onNavigationKey:function(a){var b=this.undoManager;!a&&b.save(!0,null,!1)||b.updateSelection(new c(b.editor));b.resetType()},ignoreInputEventListener:function(){this.ignoreInputEvent=!0},activateInputEventListener:function(){this.ignoreInputEvent=!1},attachListeners:function(){var a=this.undoManager.editor,c=a.editable(),e=this;c.attachListener(c,"keydown",function(a){e.onKeydown(a);if(b.ieFunctionalKeysBug(a.data.getKey()))e.onInput()},null,null,999);c.attachListener(c,CKEDITOR.env.ie?"keypress":
"input",e.onInput,e,null,999);c.attachListener(c,"keyup",e.onKeyup,e,null,999);c.attachListener(c,"paste",e.ignoreInputEventListener,e,null,999);c.attachListener(c,"drop",e.ignoreInputEventListener,e,null,999);a.on("afterPaste",e.activateInputEventListener,e,null,999);c.attachListener(c.isInline()?c:a.document.getDocumentElement(),"click",function(){e.onNavigationKey()},null,null,999);c.attachListener(this.undoManager.editor,"blur",function(){e.keyEventsStack.remove(9)},null,null,999)}};var k=CKEDITOR.plugins.undo.KeyEventsStack=
function(){this.stack=[]};k.prototype={push:function(a){a=this.stack.push({keyCode:a,inputs:0});return this.stack[a-1]},getLastIndex:function(a){if("number"!=typeof a)return this.stack.length-1;for(var b=this.stack.length;b--;)if(this.stack[b].keyCode==a)return b;return-1},getLast:function(a){a=this.getLastIndex(a);return-1!=a?this.stack[a]:null},increment:function(a){this.getLast(a).inputs++},remove:function(a){a=this.getLastIndex(a);-1!=a&&this.stack.splice(a,1)},resetInputs:function(a){if("number"==
typeof a)this.getLast(a).inputs=0;else for(a=this.stack.length;a--;)this.stack[a].inputs=0},getTotalInputs:function(){for(var a=this.stack.length,b=0;a--;)b+=this.stack[a].inputs;return b},cleanUp:function(a){a=a.data.$;a.ctrlKey||a.metaKey||this.remove(17);a.shiftKey||this.remove(16);a.altKey||this.remove(18)}}}(),CKEDITOR.plugins.add("wsc",{requires:"dialog",parseApi:function(a){a.config.wsc_onFinish="function"===typeof a.config.wsc_onFinish?a.config.wsc_onFinish:function(){};a.config.wsc_onClose=
"function"===typeof a.config.wsc_onClose?a.config.wsc_onClose:function(){}},parseConfig:function(a){a.config.wsc_customerId=a.config.wsc_customerId||CKEDITOR.config.wsc_customerId||"1:ua3xw1-2XyGJ3-GWruD3-6OFNT1-oXcuB1-nR6Bp4-hgQHc-EcYng3-sdRXG3-NOfFk";a.config.wsc_customDictionaryIds=a.config.wsc_customDictionaryIds||CKEDITOR.config.wsc_customDictionaryIds||"";a.config.wsc_userDictionaryName=a.config.wsc_userDictionaryName||CKEDITOR.config.wsc_userDictionaryName||"";a.config.wsc_customLoaderScript=
a.config.wsc_customLoaderScript||CKEDITOR.config.wsc_customLoaderScript;a.config.wsc_interfaceLang=a.config.wsc_interfaceLang;CKEDITOR.config.wsc_cmd=a.config.wsc_cmd||CKEDITOR.config.wsc_cmd||"spell";CKEDITOR.config.wsc_version="v4.3.0-master-d769233";CKEDITOR.config.wsc_removeGlobalVariable=!0},onLoad:function(a){"moono-lisa"==(CKEDITOR.skinName||a.config.skin)&&CKEDITOR.document.appendStyleSheet(this.path+"skins/"+CKEDITOR.skin.name+"/wsc.css")},init:function(a){var f=CKEDITOR.env;this.parseConfig(a);
this.parseApi(a);a.addCommand("checkspell",new CKEDITOR.dialogCommand("checkspell")).modes={wysiwyg:!CKEDITOR.env.opera&&!CKEDITOR.env.air&&document.domain==window.location.hostname&&!(f.ie&&(8>f.version||f.quirks))};"undefined"==typeof a.plugins.scayt&&a.ui.addButton&&a.ui.addButton("SpellChecker",{label:a.lang.wsc.toolbar,click:function(a){var c=a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?a.container.getText():a.document.getBody().getText();(c=c.replace(/\s/g,""))?a.execCommand("checkspell"):alert("Nothing to check!")},
toolbar:"spellchecker,10"});CKEDITOR.dialog.add("checkspell",this.path+(CKEDITOR.env.ie&&7>=CKEDITOR.env.version?"dialogs/wsc_ie.js":window.postMessage?"dialogs/wsc.js":"dialogs/wsc_ie.js"))}}),function(){function a(a){function b(a){var c=!1;g.attachListener(g,"keydown",function(){var b=d.getBody().getElementsByTag(a);if(!c){for(var e=0;e<b.count();e++)b.getItem(e).setCustomData("retain",!0);c=!0}},null,null,1);g.attachListener(g,"keyup",function(){var b=d.getElementsByTag(a);c&&(1!=b.count()||b.getItem(0).getCustomData("retain")||
b.getItem(0).hasAttribute("data-cke-temp")||b.getItem(0).remove(1),c=!1)})}var c=this.editor,d=a.document,h=d.body,l=d.getElementById("cke_actscrpt");l&&l.parentNode.removeChild(l);(l=d.getElementById("cke_shimscrpt"))&&l.parentNode.removeChild(l);(l=d.getElementById("cke_basetagscrpt"))&&l.parentNode.removeChild(l);h.contentEditable=!0;CKEDITOR.env.ie&&(h.hideFocus=!0,h.disabled=!0,h.removeAttribute("disabled"));delete this._.isLoadingData;this.$=h;d=new CKEDITOR.dom.document(d);this.setup();this.fixInitialSelection();
var g=this;CKEDITOR.env.ie&&!CKEDITOR.env.edge&&d.getDocumentElement().addClass(d.$.compatMode);CKEDITOR.env.ie&&!CKEDITOR.env.edge&&c.enterMode!=CKEDITOR.ENTER_P?b("p"):CKEDITOR.env.edge&&c.enterMode!=CKEDITOR.ENTER_DIV&&b("div");if(CKEDITOR.env.webkit||CKEDITOR.env.ie&&10<CKEDITOR.env.version)d.getDocumentElement().on("mousedown",function(a){a.data.getTarget().is("html")&&setTimeout(function(){c.editable().focus()})});f(c);try{c.document.$.execCommand("2D-position",!1,!0)}catch(n){}(CKEDITOR.env.gecko||
CKEDITOR.env.ie&&"CSS1Compat"==c.document.$.compatMode)&&this.attachListener(this,"keydown",function(a){var b=a.data.getKeystroke();if(33==b||34==b)if(CKEDITOR.env.ie)setTimeout(function(){c.getSelection().scrollIntoView()},0);else if(c.window.$.innerHeight>this.$.offsetHeight){var d=c.createRange();d[33==b?"moveToElementEditStart":"moveToElementEditEnd"](this);d.select();a.data.preventDefault()}});CKEDITOR.env.ie&&this.attachListener(d,"blur",function(){try{d.$.selection.empty()}catch(a){}});CKEDITOR.env.iOS&&
this.attachListener(d,"touchend",function(){a.focus()});h=c.document.getElementsByTag("title").getItem(0);h.data("cke-title",h.getText());CKEDITOR.env.ie&&(c.document.$.title=this._.docTitle);CKEDITOR.tools.setTimeout(function(){"unloaded"==this.status&&(this.status="ready");c.fire("contentDom");this._.isPendingFocus&&(c.focus(),this._.isPendingFocus=!1);setTimeout(function(){c.fire("dataReady")},0)},0,this)}function f(a){function b(){var d;a.editable().attachListener(a,"selectionChange",function(){var b=
a.getSelection().getSelectedElement();b&&(d&&(d.detachEvent("onresizestart",c),d=null),b.$.attachEvent("onresizestart",c),d=b.$)})}function c(a){a.returnValue=!1}if(CKEDITOR.env.gecko)try{var d=a.document.$;d.execCommand("enableObjectResizing",!1,!a.config.disableObjectResizing);d.execCommand("enableInlineTableEditing",!1,!a.config.disableNativeTableHandles)}catch(f){}else CKEDITOR.env.ie&&11>CKEDITOR.env.version&&a.config.disableObjectResizing&&b(a)}function b(){var a=[];if(8<=CKEDITOR.document.$.documentMode){a.push("html.CSS1Compat [contenteditable\x3dfalse]{min-height:0 !important}");
var b=[],c;for(c in CKEDITOR.dtd.$removeEmpty)b.push("html.CSS1Compat "+c+"[contenteditable\x3dfalse]");a.push(b.join(",")+"{display:inline-block}")}else CKEDITOR.env.gecko&&(a.push("html{height:100% !important}"),a.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}"));a.push("html{cursor:text;*cursor:auto}");a.push("img,input,textarea{cursor:default}");return a.join("\n")}var c;CKEDITOR.plugins.add("wysiwygarea",{init:function(a){a.config.fullPage&&a.addFeature({allowedContent:"html head title; style [media,type]; body (*)[id]; meta link [*]",
requiredContent:"body"});a.addMode("wysiwyg",function(b){function f(d){d&&d.removeListener();a.editable(new c(a,h.$.contentWindow.document.body));a.setData(a.getData(1),b)}var d="document.open();"+(CKEDITOR.env.ie?"("+CKEDITOR.tools.fixDomain+")();":"")+"document.close();",d=CKEDITOR.env.air?"javascript:void(0)":CKEDITOR.env.ie&&!CKEDITOR.env.edge?"javascript:void(function(){"+encodeURIComponent(d)+"}())":"",h=CKEDITOR.dom.element.createFromHtml('\x3ciframe src\x3d"'+d+'" frameBorder\x3d"0"\x3e\x3c/iframe\x3e');
h.setStyles({width:"100%",height:"100%"});h.addClass("cke_wysiwyg_frame").addClass("cke_reset");d=a.ui.space("contents");d.append(h);var l=CKEDITOR.env.ie&&!CKEDITOR.env.edge||CKEDITOR.env.gecko;if(l)h.on("load",f);var g=a.title,n=a.fire("ariaEditorHelpLabel",{}).label;g&&(CKEDITOR.env.ie&&n&&(g+=", "+n),h.setAttribute("title",g));if(n){var g=CKEDITOR.tools.getNextId(),p=CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"'+g+'" class\x3d"cke_voice_label"\x3e'+n+"\x3c/span\x3e");d.append(p,1);h.setAttribute("aria-describedby",
g)}a.on("beforeModeUnload",function(a){a.removeListener();p&&p.remove()});h.setAttributes({tabIndex:a.tabIndex,allowTransparency:"true"});!l&&f();a.fire("ariaWidget",h)})}});CKEDITOR.editor.prototype.addContentsCss=function(a){var b=this.config,c=b.contentsCss;CKEDITOR.tools.isArray(c)||(b.contentsCss=c?[c]:[]);b.contentsCss.push(a)};c=CKEDITOR.tools.createClass({$:function(){this.base.apply(this,arguments);this._.frameLoadedHandler=CKEDITOR.tools.addFunction(function(b){CKEDITOR.tools.setTimeout(a,
0,this,b)},this);this._.docTitle=this.getWindow().getFrame().getAttribute("title")},base:CKEDITOR.editable,proto:{setData:function(a,c){var f=this.editor;if(c)this.setHtml(a),this.fixInitialSelection(),f.fire("dataReady");else{this._.isLoadingData=!0;f._.dataStore={id:1};var d=f.config,h=d.fullPage,l=d.docType,g=CKEDITOR.tools.buildStyleHtml(b()).replace(/<style>/,'\x3cstyle data-cke-temp\x3d"1"\x3e');h||(g+=CKEDITOR.tools.buildStyleHtml(f.config.contentsCss));var n=d.baseHref?'\x3cbase href\x3d"'+
d.baseHref+'" data-cke-temp\x3d"1" /\x3e':"";h&&(a=a.replace(/<!DOCTYPE[^>]*>/i,function(a){f.docType=l=a;return""}).replace(/<\?xml\s[^\?]*\?>/i,function(a){f.xmlDeclaration=a;return""}));a=f.dataProcessor.toHtml(a);h?(/<body[\s|>]/.test(a)||(a="\x3cbody\x3e"+a),/<html[\s|>]/.test(a)||(a="\x3chtml\x3e"+a+"\x3c/html\x3e"),/<head[\s|>]/.test(a)?/<title[\s|>]/.test(a)||(a=a.replace(/<head[^>]*>/,"$\x26\x3ctitle\x3e\x3c/title\x3e")):a=a.replace(/<html[^>]*>/,"$\x26\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e"),
n&&(a=a.replace(/<head[^>]*?>/,"$\x26"+n)),a=a.replace(/<\/head\s*>/,g+"$\x26"),a=l+a):a=d.docType+'\x3chtml dir\x3d"'+d.contentsLangDirection+'" lang\x3d"'+(d.contentsLanguage||f.langCode)+'"\x3e\x3chead\x3e\x3ctitle\x3e'+this._.docTitle+"\x3c/title\x3e"+n+g+"\x3c/head\x3e\x3cbody"+(d.bodyId?' id\x3d"'+d.bodyId+'"':"")+(d.bodyClass?' class\x3d"'+d.bodyClass+'"':"")+"\x3e"+a+"\x3c/body\x3e\x3c/html\x3e";CKEDITOR.env.gecko&&(a=a.replace(/<body/,'\x3cbody contenteditable\x3d"true" '),2E4>CKEDITOR.env.version&&
(a=a.replace(/<body[^>]*>/,"$\x26\x3c!-- cke-content-start --\x3e")));d='\x3cscript id\x3d"cke_actscrpt" type\x3d"text/javascript"'+(CKEDITOR.env.ie?' defer\x3d"defer" ':"")+"\x3evar wasLoaded\x3d0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction("+this._.frameLoadedHandler+",window);wasLoaded\x3d1;}"+(CKEDITOR.env.ie?"onload();":'document.addEventListener("DOMContentLoaded", onload, false );')+"\x3c/script\x3e";CKEDITOR.env.ie&&9>CKEDITOR.env.version&&(d+='\x3cscript id\x3d"cke_shimscrpt"\x3ewindow.parent.CKEDITOR.tools.enableHtml5Elements(document)\x3c/script\x3e');
n&&CKEDITOR.env.ie&&10>CKEDITOR.env.version&&(d+='\x3cscript id\x3d"cke_basetagscrpt"\x3evar baseTag \x3d document.querySelector( "base" );baseTag.href \x3d baseTag.href;\x3c/script\x3e');a=a.replace(/(?=\s*<\/(:?head)>)/,d);this.clearCustomData();this.clearListeners();f.fire("contentDomUnload");var p=this.getDocument();try{p.write(a)}catch(u){setTimeout(function(){p.write(a)},0)}}},getData:function(a){if(a)return this.getHtml();a=this.editor;var b=a.config,c=b.fullPage,d=c&&a.docType,f=c&&a.xmlDeclaration,
l=this.getDocument(),c=c?l.getDocumentElement().getOuterHtml():l.getBody().getHtml();CKEDITOR.env.gecko&&b.enterMode!=CKEDITOR.ENTER_BR&&(c=c.replace(/<br>(?=\s*(:?$|<\/body>))/,""));c=a.dataProcessor.toDataFormat(c);f&&(c=f+"\n"+c);d&&(c=d+"\n"+c);return c},focus:function(){this._.isLoadingData?this._.isPendingFocus=!0:c.baseProto.focus.call(this)},detach:function(){var a=this.editor,b=a.document,f;try{f=a.window.getFrame()}catch(d){}c.baseProto.detach.call(this);this.clearCustomData();b.getDocumentElement().clearCustomData();
CKEDITOR.tools.removeFunction(this._.frameLoadedHandler);f&&f.getParent()?(f.clearCustomData(),(a=f.removeCustomData("onResize"))&&a.removeListener(),f.remove()):CKEDITOR.warn("editor-destroy-iframe")}}})}(),CKEDITOR.config.disableObjectResizing=!1,CKEDITOR.config.disableNativeTableHandles=!0,CKEDITOR.config.disableNativeSpellChecker=!0,CKEDITOR.config.plugins="dialogui,dialog,a11yhelp,about,basicstyles,blockquote,notification,button,toolbar,clipboard,panel,floatpanel,menu,contextmenu,elementspath,indent,indentlist,list,enterkey,entities,popup,filebrowser,floatingspace,listblock,richcombo,format,horizontalrule,htmlwriter,image,fakeobjects,link,magicline,maximize,pastefromword,pastetext,removeformat,resize,menubutton,scayt,showborders,sourcearea,specialchar,stylescombo,tab,table,tabletools,tableselection,undo,wsc,wysiwygarea",
CKEDITOR.config.skin="moono-lisa",function(){var a=function(a,b){var c=CKEDITOR.getUrl("plugins/"+b);a=a.split(",");for(var e=0;e<a.length;e++)CKEDITOR.skin.icons[a[e]]={path:c,offset:-a[++e],bgsize:a[++e]}};CKEDITOR.env.hidpi?a("about,0,,bold,24,,italic,48,,strike,72,,subscript,96,,superscript,120,,underline,144,,bidiltr,168,,bidirtl,192,,blockquote,216,,copy-rtl,240,,copy,264,,cut-rtl,288,,cut,312,,paste-rtl,336,,paste,360,,codesnippet,384,,bgcolor,408,,textcolor,432,,copyformatting,456,,creatediv,480,,docprops-rtl,504,,docprops,528,,embed,552,,embedsemantic,576,,find-rtl,600,,find,624,,replace,648,,flash,672,,button,696,,checkbox,720,,form,744,,hiddenfield,768,,imagebutton,792,,radio,816,,select-rtl,840,,select,864,,textarea-rtl,888,,textarea,912,,textfield-rtl,936,,textfield,960,,horizontalrule,984,,iframe,1008,,image,1032,,indent-rtl,1056,,indent,1080,,outdent-rtl,1104,,outdent,1128,,justifyblock,1152,,justifycenter,1176,,justifyleft,1200,,justifyright,1224,,language,1248,,anchor-rtl,1272,,anchor,1296,,link,1320,,unlink,1344,,bulletedlist-rtl,1368,,bulletedlist,1392,,numberedlist-rtl,1416,,numberedlist,1440,,mathjax,1464,,maximize,1488,,newpage-rtl,1512,,newpage,1536,,pagebreak-rtl,1560,,pagebreak,1584,,pastefromword-rtl,1608,,pastefromword,1632,,pastetext-rtl,1656,,pastetext,1680,,placeholder,1704,,preview-rtl,1728,,preview,1752,,print,1776,,removeformat,1800,,save,1824,,scayt,1848,,selectall,1872,,showblocks-rtl,1896,,showblocks,1920,,smiley,1944,,source-rtl,1968,,source,1992,,sourcedialog-rtl,2016,,sourcedialog,2040,,specialchar,2064,,table,2088,,templates-rtl,2112,,templates,2136,,uicolor,2160,,redo-rtl,2184,,redo,2208,,undo-rtl,2232,,undo,2256,,simplebox,4560,auto,spellchecker,2304,",
"icons_hidpi.png"):a("about,0,auto,bold,24,auto,italic,48,auto,strike,72,auto,subscript,96,auto,superscript,120,auto,underline,144,auto,bidiltr,168,auto,bidirtl,192,auto,blockquote,216,auto,copy-rtl,240,auto,copy,264,auto,cut-rtl,288,auto,cut,312,auto,paste-rtl,336,auto,paste,360,auto,codesnippet,384,auto,bgcolor,408,auto,textcolor,432,auto,copyformatting,456,auto,creatediv,480,auto,docprops-rtl,504,auto,docprops,528,auto,embed,552,auto,embedsemantic,576,auto,find-rtl,600,auto,find,624,auto,replace,648,auto,flash,672,auto,button,696,auto,checkbox,720,auto,form,744,auto,hiddenfield,768,auto,imagebutton,792,auto,radio,816,auto,select-rtl,840,auto,select,864,auto,textarea-rtl,888,auto,textarea,912,auto,textfield-rtl,936,auto,textfield,960,auto,horizontalrule,984,auto,iframe,1008,auto,image,1032,auto,indent-rtl,1056,auto,indent,1080,auto,outdent-rtl,1104,auto,outdent,1128,auto,justifyblock,1152,auto,justifycenter,1176,auto,justifyleft,1200,auto,justifyright,1224,auto,language,1248,auto,anchor-rtl,1272,auto,anchor,1296,auto,link,1320,auto,unlink,1344,auto,bulletedlist-rtl,1368,auto,bulletedlist,1392,auto,numberedlist-rtl,1416,auto,numberedlist,1440,auto,mathjax,1464,auto,maximize,1488,auto,newpage-rtl,1512,auto,newpage,1536,auto,pagebreak-rtl,1560,auto,pagebreak,1584,auto,pastefromword-rtl,1608,auto,pastefromword,1632,auto,pastetext-rtl,1656,auto,pastetext,1680,auto,placeholder,1704,auto,preview-rtl,1728,auto,preview,1752,auto,print,1776,auto,removeformat,1800,auto,save,1824,auto,scayt,1848,auto,selectall,1872,auto,showblocks-rtl,1896,auto,showblocks,1920,auto,smiley,1944,auto,source-rtl,1968,auto,source,1992,auto,sourcedialog-rtl,2016,auto,sourcedialog,2040,auto,specialchar,2064,auto,table,2088,auto,templates-rtl,2112,auto,templates,2136,auto,uicolor,2160,auto,redo-rtl,2184,auto,redo,2208,auto,undo-rtl,2232,auto,undo,2256,auto,simplebox,2280,auto,spellchecker,2304,auto",
"icons.png")}())})();
},{}],15:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

var doccy;

if (typeof document !== 'undefined') {
    doccy = document;
} else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }
}

module.exports = doccy;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":13}],16:[function(require,module,exports){
(function (global){
var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],17:[function(require,module,exports){
module.exports = attributeToProperty

var transform = {
  'class': 'className',
  'for': 'htmlFor',
  'http-equiv': 'httpEquiv'
}

function attributeToProperty (h) {
  return function (tagName, attrs, children) {
    for (var attr in attrs) {
      if (attr in transform) {
        attrs[transform[attr]] = attrs[attr]
        delete attrs[attr]
      }
    }
    return h(tagName, attrs, children)
  }
}

},{}],18:[function(require,module,exports){
var attrToProp = require('hyperscript-attribute-to-property')

var VAR = 0, TEXT = 1, OPEN = 2, CLOSE = 3, ATTR = 4
var ATTR_KEY = 5, ATTR_KEY_W = 6
var ATTR_VALUE_W = 7, ATTR_VALUE = 8
var ATTR_VALUE_SQ = 9, ATTR_VALUE_DQ = 10
var ATTR_EQ = 11, ATTR_BREAK = 12
var COMMENT = 13

module.exports = function (h, opts) {
  if (!opts) opts = {}
  var concat = opts.concat || function (a, b) {
    return String(a) + String(b)
  }
  if (opts.attrToProp !== false) {
    h = attrToProp(h)
  }

  return function (strings) {
    var state = TEXT, reg = ''
    var arglen = arguments.length
    var parts = []

    for (var i = 0; i < strings.length; i++) {
      if (i < arglen - 1) {
        var arg = arguments[i+1]
        var p = parse(strings[i])
        var xstate = state
        if (xstate === ATTR_VALUE_DQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_SQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_W) xstate = ATTR_VALUE
        if (xstate === ATTR) xstate = ATTR_KEY
        p.push([ VAR, xstate, arg ])
        parts.push.apply(parts, p)
      } else parts.push.apply(parts, parse(strings[i]))
    }

    var tree = [null,{},[]]
    var stack = [[tree,-1]]
    for (var i = 0; i < parts.length; i++) {
      var cur = stack[stack.length-1][0]
      var p = parts[i], s = p[0]
      if (s === OPEN && /^\//.test(p[1])) {
        var ix = stack[stack.length-1][1]
        if (stack.length > 1) {
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === OPEN) {
        var c = [p[1],{},[]]
        cur[2].push(c)
        stack.push([c,cur[2].length-1])
      } else if (s === ATTR_KEY || (s === VAR && p[1] === ATTR_KEY)) {
        var key = ''
        var copyKey
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_KEY) {
            key = concat(key, parts[i][1])
          } else if (parts[i][0] === VAR && parts[i][1] === ATTR_KEY) {
            if (typeof parts[i][2] === 'object' && !key) {
              for (copyKey in parts[i][2]) {
                if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey]) {
                  cur[1][copyKey] = parts[i][2][copyKey]
                }
              }
            } else {
              key = concat(key, parts[i][2])
            }
          } else break
        }
        if (parts[i][0] === ATTR_EQ) i++
        var j = i
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_VALUE || parts[i][0] === ATTR_KEY) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][1])
            else cur[1][key] = concat(cur[1][key], parts[i][1])
          } else if (parts[i][0] === VAR
          && (parts[i][1] === ATTR_VALUE || parts[i][1] === ATTR_KEY)) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][2])
            else cur[1][key] = concat(cur[1][key], parts[i][2])
          } else {
            if (key.length && !cur[1][key] && i === j
            && (parts[i][0] === CLOSE || parts[i][0] === ATTR_BREAK)) {
              // https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attributes
              // empty string is falsy, not well behaved value in browser
              cur[1][key] = key.toLowerCase()
            }
            if (parts[i][0] === CLOSE) {
              i--
            }
            break
          }
        }
      } else if (s === ATTR_KEY) {
        cur[1][p[1]] = true
      } else if (s === VAR && p[1] === ATTR_KEY) {
        cur[1][p[2]] = true
      } else if (s === CLOSE) {
        if (selfClosing(cur[0]) && stack.length) {
          var ix = stack[stack.length-1][1]
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === VAR && p[1] === TEXT) {
        if (p[2] === undefined || p[2] === null) p[2] = ''
        else if (!p[2]) p[2] = concat('', p[2])
        if (Array.isArray(p[2][0])) {
          cur[2].push.apply(cur[2], p[2])
        } else {
          cur[2].push(p[2])
        }
      } else if (s === TEXT) {
        cur[2].push(p[1])
      } else if (s === ATTR_EQ || s === ATTR_BREAK) {
        // no-op
      } else {
        throw new Error('unhandled: ' + s)
      }
    }

    if (tree[2].length > 1 && /^\s*$/.test(tree[2][0])) {
      tree[2].shift()
    }

    if (tree[2].length > 2
    || (tree[2].length === 2 && /\S/.test(tree[2][1]))) {
      throw new Error(
        'multiple root elements must be wrapped in an enclosing tag'
      )
    }
    if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === 'string'
    && Array.isArray(tree[2][0][2])) {
      tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2])
    }
    return tree[2][0]

    function parse (str) {
      var res = []
      if (state === ATTR_VALUE_W) state = ATTR
      for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i)
        if (state === TEXT && c === '<') {
          if (reg.length) res.push([TEXT, reg])
          reg = ''
          state = OPEN
        } else if (c === '>' && !quot(state) && state !== COMMENT) {
          if (state === OPEN) {
            res.push([OPEN,reg])
          } else if (state === ATTR_KEY) {
            res.push([ATTR_KEY,reg])
          } else if (state === ATTR_VALUE && reg.length) {
            res.push([ATTR_VALUE,reg])
          }
          res.push([CLOSE])
          reg = ''
          state = TEXT
        } else if (state === COMMENT && /-$/.test(reg) && c === '-') {
          if (opts.comments) {
            res.push([ATTR_VALUE,reg.substr(0, reg.length - 1)],[CLOSE])
          }
          reg = ''
          state = TEXT
        } else if (state === OPEN && /^!--$/.test(reg)) {
          if (opts.comments) {
            res.push([OPEN, reg],[ATTR_KEY,'comment'],[ATTR_EQ])
          }
          reg = c
          state = COMMENT
        } else if (state === TEXT || state === COMMENT) {
          reg += c
        } else if (state === OPEN && /\s/.test(c)) {
          res.push([OPEN, reg])
          reg = ''
          state = ATTR
        } else if (state === OPEN) {
          reg += c
        } else if (state === ATTR && /[^\s"'=/]/.test(c)) {
          state = ATTR_KEY
          reg = c
        } else if (state === ATTR && /\s/.test(c)) {
          if (reg.length) res.push([ATTR_KEY,reg])
          res.push([ATTR_BREAK])
        } else if (state === ATTR_KEY && /\s/.test(c)) {
          res.push([ATTR_KEY,reg])
          reg = ''
          state = ATTR_KEY_W
        } else if (state === ATTR_KEY && c === '=') {
          res.push([ATTR_KEY,reg],[ATTR_EQ])
          reg = ''
          state = ATTR_VALUE_W
        } else if (state === ATTR_KEY) {
          reg += c
        } else if ((state === ATTR_KEY_W || state === ATTR) && c === '=') {
          res.push([ATTR_EQ])
          state = ATTR_VALUE_W
        } else if ((state === ATTR_KEY_W || state === ATTR) && !/\s/.test(c)) {
          res.push([ATTR_BREAK])
          if (/[\w-]/.test(c)) {
            reg += c
            state = ATTR_KEY
          } else state = ATTR
        } else if (state === ATTR_VALUE_W && c === '"') {
          state = ATTR_VALUE_DQ
        } else if (state === ATTR_VALUE_W && c === "'") {
          state = ATTR_VALUE_SQ
        } else if (state === ATTR_VALUE_DQ && c === '"') {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_SQ && c === "'") {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_W && !/\s/.test(c)) {
          state = ATTR_VALUE
          i--
        } else if (state === ATTR_VALUE && /\s/.test(c)) {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ
        || state === ATTR_VALUE_DQ) {
          reg += c
        }
      }
      if (state === TEXT && reg.length) {
        res.push([TEXT,reg])
        reg = ''
      } else if (state === ATTR_VALUE && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_DQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_SQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_KEY) {
        res.push([ATTR_KEY,reg])
        reg = ''
      }
      return res
    }
  }

  function strfn (x) {
    if (typeof x === 'function') return x
    else if (typeof x === 'string') return x
    else if (x && typeof x === 'object') return x
    else return concat('', x)
  }
}

function quot (state) {
  return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ
}

var hasOwn = Object.prototype.hasOwnProperty
function has (obj, key) { return hasOwn.call(obj, key) }

var closeRE = RegExp('^(' + [
  'area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed',
  'frame', 'hr', 'img', 'input', 'isindex', 'keygen', 'link', 'meta', 'param',
  'source', 'track', 'wbr', '!--',
  // SVG TAGS
  'animate', 'animateTransform', 'circle', 'cursor', 'desc', 'ellipse',
  'feBlend', 'feColorMatrix', 'feComposite',
  'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
  'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
  'feGaussianBlur', 'feImage', 'feMergeNode', 'feMorphology',
  'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile',
  'feTurbulence', 'font-face-format', 'font-face-name', 'font-face-uri',
  'glyph', 'glyphRef', 'hkern', 'image', 'line', 'missing-glyph', 'mpath',
  'path', 'polygon', 'polyline', 'rect', 'set', 'stop', 'tref', 'use', 'view',
  'vkern'
].join('|') + ')(?:[\.#][a-zA-Z0-9\u007F-\uFFFF_:-]+)*$')
function selfClosing (tag) { return closeRE.test(tag) }

},{"hyperscript-attribute-to-property":17}],19:[function(require,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}],20:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.2.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with computed style
	var valueIsBorderBox,
		styles = getStyles( elem ),
		val = curCSS( elem, name, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = isBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ name ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
	}

	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var doc, docElem, rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		doc = elem.ownerDocument;
		docElem = doc.documentElement;
		win = doc.defaultView;

		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( jQuery.isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

},{}],21:[function(require,module,exports){
'use strict';

var range; // Create a range object for efficently rendering strings to elements.
var NS_XHTML = 'http://www.w3.org/1999/xhtml';

var doc = typeof document === 'undefined' ? undefined : document;

var testEl = doc ?
    doc.body || doc.createElement('div') :
    {};

// Fixes <https://github.com/patrick-steele-idem/morphdom/issues/32>
// (IE7+ support) <=IE7 does not support el.hasAttribute(name)
var actualHasAttributeNS;

if (testEl.hasAttributeNS) {
    actualHasAttributeNS = function(el, namespaceURI, name) {
        return el.hasAttributeNS(namespaceURI, name);
    };
} else if (testEl.hasAttribute) {
    actualHasAttributeNS = function(el, namespaceURI, name) {
        return el.hasAttribute(name);
    };
} else {
    actualHasAttributeNS = function(el, namespaceURI, name) {
        return el.getAttributeNode(namespaceURI, name) != null;
    };
}

var hasAttributeNS = actualHasAttributeNS;


function toElement(str) {
    if (!range && doc.createRange) {
        range = doc.createRange();
        range.selectNode(doc.body);
    }

    var fragment;
    if (range && range.createContextualFragment) {
        fragment = range.createContextualFragment(str);
    } else {
        fragment = doc.createElement('body');
        fragment.innerHTML = str;
    }
    return fragment.childNodes[0];
}

/**
 * Returns true if two node's names are the same.
 *
 * NOTE: We don't bother checking `namespaceURI` because you will never find two HTML elements with the same
 *       nodeName and different namespace URIs.
 *
 * @param {Element} a
 * @param {Element} b The target element
 * @return {boolean}
 */
function compareNodeNames(fromEl, toEl) {
    var fromNodeName = fromEl.nodeName;
    var toNodeName = toEl.nodeName;

    if (fromNodeName === toNodeName) {
        return true;
    }

    if (toEl.actualize &&
        fromNodeName.charCodeAt(0) < 91 && /* from tag name is upper case */
        toNodeName.charCodeAt(0) > 90 /* target tag name is lower case */) {
        // If the target element is a virtual DOM node then we may need to normalize the tag name
        // before comparing. Normal HTML elements that are in the "http://www.w3.org/1999/xhtml"
        // are converted to upper case
        return fromNodeName === toNodeName.toUpperCase();
    } else {
        return false;
    }
}

/**
 * Create an element, optionally with a known namespace URI.
 *
 * @param {string} name the element name, e.g. 'div' or 'svg'
 * @param {string} [namespaceURI] the element's namespace URI, i.e. the value of
 * its `xmlns` attribute or its inferred namespace.
 *
 * @return {Element}
 */
function createElementNS(name, namespaceURI) {
    return !namespaceURI || namespaceURI === NS_XHTML ?
        doc.createElement(name) :
        doc.createElementNS(namespaceURI, name);
}

/**
 * Copies the children of one DOM element to another DOM element
 */
function moveChildren(fromEl, toEl) {
    var curChild = fromEl.firstChild;
    while (curChild) {
        var nextChild = curChild.nextSibling;
        toEl.appendChild(curChild);
        curChild = nextChild;
    }
    return toEl;
}

function morphAttrs(fromNode, toNode) {
    var attrs = toNode.attributes;
    var i;
    var attr;
    var attrName;
    var attrNamespaceURI;
    var attrValue;
    var fromValue;

    for (i = attrs.length - 1; i >= 0; --i) {
        attr = attrs[i];
        attrName = attr.name;
        attrNamespaceURI = attr.namespaceURI;
        attrValue = attr.value;

        if (attrNamespaceURI) {
            attrName = attr.localName || attrName;
            fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);

            if (fromValue !== attrValue) {
                fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
            }
        } else {
            fromValue = fromNode.getAttribute(attrName);

            if (fromValue !== attrValue) {
                fromNode.setAttribute(attrName, attrValue);
            }
        }
    }

    // Remove any extra attributes found on the original DOM element that
    // weren't found on the target element.
    attrs = fromNode.attributes;

    for (i = attrs.length - 1; i >= 0; --i) {
        attr = attrs[i];
        if (attr.specified !== false) {
            attrName = attr.name;
            attrNamespaceURI = attr.namespaceURI;

            if (attrNamespaceURI) {
                attrName = attr.localName || attrName;

                if (!hasAttributeNS(toNode, attrNamespaceURI, attrName)) {
                    fromNode.removeAttributeNS(attrNamespaceURI, attrName);
                }
            } else {
                if (!hasAttributeNS(toNode, null, attrName)) {
                    fromNode.removeAttribute(attrName);
                }
            }
        }
    }
}

function syncBooleanAttrProp(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
        fromEl[name] = toEl[name];
        if (fromEl[name]) {
            fromEl.setAttribute(name, '');
        } else {
            fromEl.removeAttribute(name, '');
        }
    }
}

var specialElHandlers = {
    /**
     * Needed for IE. Apparently IE doesn't think that "selected" is an
     * attribute when reading over the attributes using selectEl.attributes
     */
    OPTION: function(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'selected');
    },
    /**
     * The "value" attribute is special for the <input> element since it sets
     * the initial value. Changing the "value" attribute without changing the
     * "value" property will have no effect since it is only used to the set the
     * initial value.  Similar for the "checked" attribute, and "disabled".
     */
    INPUT: function(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'checked');
        syncBooleanAttrProp(fromEl, toEl, 'disabled');

        if (fromEl.value !== toEl.value) {
            fromEl.value = toEl.value;
        }

        if (!hasAttributeNS(toEl, null, 'value')) {
            fromEl.removeAttribute('value');
        }
    },

    TEXTAREA: function(fromEl, toEl) {
        var newValue = toEl.value;
        if (fromEl.value !== newValue) {
            fromEl.value = newValue;
        }

        var firstChild = fromEl.firstChild;
        if (firstChild) {
            // Needed for IE. Apparently IE sets the placeholder as the
            // node value and vise versa. This ignores an empty update.
            var oldValue = firstChild.nodeValue;

            if (oldValue == newValue || (!newValue && oldValue == fromEl.placeholder)) {
                return;
            }

            firstChild.nodeValue = newValue;
        }
    },
    SELECT: function(fromEl, toEl) {
        if (!hasAttributeNS(toEl, null, 'multiple')) {
            var selectedIndex = -1;
            var i = 0;
            var curChild = toEl.firstChild;
            while(curChild) {
                var nodeName = curChild.nodeName;
                if (nodeName && nodeName.toUpperCase() === 'OPTION') {
                    if (hasAttributeNS(curChild, null, 'selected')) {
                        selectedIndex = i;
                        break;
                    }
                    i++;
                }
                curChild = curChild.nextSibling;
            }

            fromEl.selectedIndex = i;
        }
    }
};

var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;

function noop() {}

function defaultGetNodeKey(node) {
    return node.id;
}

function morphdomFactory(morphAttrs) {

    return function morphdom(fromNode, toNode, options) {
        if (!options) {
            options = {};
        }

        if (typeof toNode === 'string') {
            if (fromNode.nodeName === '#document' || fromNode.nodeName === 'HTML') {
                var toNodeHtml = toNode;
                toNode = doc.createElement('html');
                toNode.innerHTML = toNodeHtml;
            } else {
                toNode = toElement(toNode);
            }
        }

        var getNodeKey = options.getNodeKey || defaultGetNodeKey;
        var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
        var onNodeAdded = options.onNodeAdded || noop;
        var onBeforeElUpdated = options.onBeforeElUpdated || noop;
        var onElUpdated = options.onElUpdated || noop;
        var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
        var onNodeDiscarded = options.onNodeDiscarded || noop;
        var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop;
        var childrenOnly = options.childrenOnly === true;

        // This object is used as a lookup to quickly find all keyed elements in the original DOM tree.
        var fromNodesLookup = {};
        var keyedRemovalList;

        function addKeyedRemoval(key) {
            if (keyedRemovalList) {
                keyedRemovalList.push(key);
            } else {
                keyedRemovalList = [key];
            }
        }

        function walkDiscardedChildNodes(node, skipKeyedNodes) {
            if (node.nodeType === ELEMENT_NODE) {
                var curChild = node.firstChild;
                while (curChild) {

                    var key = undefined;

                    if (skipKeyedNodes && (key = getNodeKey(curChild))) {
                        // If we are skipping keyed nodes then we add the key
                        // to a list so that it can be handled at the very end.
                        addKeyedRemoval(key);
                    } else {
                        // Only report the node as discarded if it is not keyed. We do this because
                        // at the end we loop through all keyed elements that were unmatched
                        // and then discard them in one final pass.
                        onNodeDiscarded(curChild);
                        if (curChild.firstChild) {
                            walkDiscardedChildNodes(curChild, skipKeyedNodes);
                        }
                    }

                    curChild = curChild.nextSibling;
                }
            }
        }

        /**
         * Removes a DOM node out of the original DOM
         *
         * @param  {Node} node The node to remove
         * @param  {Node} parentNode The nodes parent
         * @param  {Boolean} skipKeyedNodes If true then elements with keys will be skipped and not discarded.
         * @return {undefined}
         */
        function removeNode(node, parentNode, skipKeyedNodes) {
            if (onBeforeNodeDiscarded(node) === false) {
                return;
            }

            if (parentNode) {
                parentNode.removeChild(node);
            }

            onNodeDiscarded(node);
            walkDiscardedChildNodes(node, skipKeyedNodes);
        }

        // // TreeWalker implementation is no faster, but keeping this around in case this changes in the future
        // function indexTree(root) {
        //     var treeWalker = document.createTreeWalker(
        //         root,
        //         NodeFilter.SHOW_ELEMENT);
        //
        //     var el;
        //     while((el = treeWalker.nextNode())) {
        //         var key = getNodeKey(el);
        //         if (key) {
        //             fromNodesLookup[key] = el;
        //         }
        //     }
        // }

        // // NodeIterator implementation is no faster, but keeping this around in case this changes in the future
        //
        // function indexTree(node) {
        //     var nodeIterator = document.createNodeIterator(node, NodeFilter.SHOW_ELEMENT);
        //     var el;
        //     while((el = nodeIterator.nextNode())) {
        //         var key = getNodeKey(el);
        //         if (key) {
        //             fromNodesLookup[key] = el;
        //         }
        //     }
        // }

        function indexTree(node) {
            if (node.nodeType === ELEMENT_NODE) {
                var curChild = node.firstChild;
                while (curChild) {
                    var key = getNodeKey(curChild);
                    if (key) {
                        fromNodesLookup[key] = curChild;
                    }

                    // Walk recursively
                    indexTree(curChild);

                    curChild = curChild.nextSibling;
                }
            }
        }

        indexTree(fromNode);

        function handleNodeAdded(el) {
            onNodeAdded(el);

            var curChild = el.firstChild;
            while (curChild) {
                var nextSibling = curChild.nextSibling;

                var key = getNodeKey(curChild);
                if (key) {
                    var unmatchedFromEl = fromNodesLookup[key];
                    if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
                        curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
                        morphEl(unmatchedFromEl, curChild);
                    }
                }

                handleNodeAdded(curChild);
                curChild = nextSibling;
            }
        }

        function morphEl(fromEl, toEl, childrenOnly) {
            var toElKey = getNodeKey(toEl);
            var curFromNodeKey;

            if (toElKey) {
                // If an element with an ID is being morphed then it is will be in the final
                // DOM so clear it out of the saved elements collection
                delete fromNodesLookup[toElKey];
            }

            if (toNode.isSameNode && toNode.isSameNode(fromNode)) {
                return;
            }

            if (!childrenOnly) {
                if (onBeforeElUpdated(fromEl, toEl) === false) {
                    return;
                }

                morphAttrs(fromEl, toEl);
                onElUpdated(fromEl);

                if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
                    return;
                }
            }

            if (fromEl.nodeName !== 'TEXTAREA') {
                var curToNodeChild = toEl.firstChild;
                var curFromNodeChild = fromEl.firstChild;
                var curToNodeKey;

                var fromNextSibling;
                var toNextSibling;
                var matchingFromEl;

                outer: while (curToNodeChild) {
                    toNextSibling = curToNodeChild.nextSibling;
                    curToNodeKey = getNodeKey(curToNodeChild);

                    while (curFromNodeChild) {
                        fromNextSibling = curFromNodeChild.nextSibling;

                        if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
                            curToNodeChild = toNextSibling;
                            curFromNodeChild = fromNextSibling;
                            continue outer;
                        }

                        curFromNodeKey = getNodeKey(curFromNodeChild);

                        var curFromNodeType = curFromNodeChild.nodeType;

                        var isCompatible = undefined;

                        if (curFromNodeType === curToNodeChild.nodeType) {
                            if (curFromNodeType === ELEMENT_NODE) {
                                // Both nodes being compared are Element nodes

                                if (curToNodeKey) {
                                    // The target node has a key so we want to match it up with the correct element
                                    // in the original DOM tree
                                    if (curToNodeKey !== curFromNodeKey) {
                                        // The current element in the original DOM tree does not have a matching key so
                                        // let's check our lookup to see if there is a matching element in the original
                                        // DOM tree
                                        if ((matchingFromEl = fromNodesLookup[curToNodeKey])) {
                                            if (curFromNodeChild.nextSibling === matchingFromEl) {
                                                // Special case for single element removals. To avoid removing the original
                                                // DOM node out of the tree (since that can break CSS transitions, etc.),
                                                // we will instead discard the current node and wait until the next
                                                // iteration to properly match up the keyed target element with its matching
                                                // element in the original tree
                                                isCompatible = false;
                                            } else {
                                                // We found a matching keyed element somewhere in the original DOM tree.
                                                // Let's moving the original DOM node into the current position and morph
                                                // it.

                                                // NOTE: We use insertBefore instead of replaceChild because we want to go through
                                                // the `removeNode()` function for the node that is being discarded so that
                                                // all lifecycle hooks are correctly invoked
                                                fromEl.insertBefore(matchingFromEl, curFromNodeChild);

                                                fromNextSibling = curFromNodeChild.nextSibling;

                                                if (curFromNodeKey) {
                                                    // Since the node is keyed it might be matched up later so we defer
                                                    // the actual removal to later
                                                    addKeyedRemoval(curFromNodeKey);
                                                } else {
                                                    // NOTE: we skip nested keyed nodes from being removed since there is
                                                    //       still a chance they will be matched up later
                                                    removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                                                }

                                                curFromNodeChild = matchingFromEl;
                                            }
                                        } else {
                                            // The nodes are not compatible since the "to" node has a key and there
                                            // is no matching keyed node in the source tree
                                            isCompatible = false;
                                        }
                                    }
                                } else if (curFromNodeKey) {
                                    // The original has a key
                                    isCompatible = false;
                                }

                                isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild);
                                if (isCompatible) {
                                    // We found compatible DOM elements so transform
                                    // the current "from" node to match the current
                                    // target DOM node.
                                    morphEl(curFromNodeChild, curToNodeChild);
                                }

                            } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                                // Both nodes being compared are Text or Comment nodes
                                isCompatible = true;
                                // Simply update nodeValue on the original node to
                                // change the text value
                                if (curFromNodeChild.nodeValue !== curToNodeChild.nodeValue) {
                                    curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                                }

                            }
                        }

                        if (isCompatible) {
                            // Advance both the "to" child and the "from" child since we found a match
                            curToNodeChild = toNextSibling;
                            curFromNodeChild = fromNextSibling;
                            continue outer;
                        }

                        // No compatible match so remove the old node from the DOM and continue trying to find a
                        // match in the original DOM. However, we only do this if the from node is not keyed
                        // since it is possible that a keyed node might match up with a node somewhere else in the
                        // target tree and we don't want to discard it just yet since it still might find a
                        // home in the final DOM tree. After everything is done we will remove any keyed nodes
                        // that didn't find a home
                        if (curFromNodeKey) {
                            // Since the node is keyed it might be matched up later so we defer
                            // the actual removal to later
                            addKeyedRemoval(curFromNodeKey);
                        } else {
                            // NOTE: we skip nested keyed nodes from being removed since there is
                            //       still a chance they will be matched up later
                            removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                        }

                        curFromNodeChild = fromNextSibling;
                    }

                    // If we got this far then we did not find a candidate match for
                    // our "to node" and we exhausted all of the children "from"
                    // nodes. Therefore, we will just append the current "to" node
                    // to the end
                    if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
                        fromEl.appendChild(matchingFromEl);
                        morphEl(matchingFromEl, curToNodeChild);
                    } else {
                        var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
                        if (onBeforeNodeAddedResult !== false) {
                            if (onBeforeNodeAddedResult) {
                                curToNodeChild = onBeforeNodeAddedResult;
                            }

                            if (curToNodeChild.actualize) {
                                curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
                            }
                            fromEl.appendChild(curToNodeChild);
                            handleNodeAdded(curToNodeChild);
                        }
                    }

                    curToNodeChild = toNextSibling;
                    curFromNodeChild = fromNextSibling;
                }

                // We have processed all of the "to nodes". If curFromNodeChild is
                // non-null then we still have some from nodes left over that need
                // to be removed
                while (curFromNodeChild) {
                    fromNextSibling = curFromNodeChild.nextSibling;
                    if ((curFromNodeKey = getNodeKey(curFromNodeChild))) {
                        // Since the node is keyed it might be matched up later so we defer
                        // the actual removal to later
                        addKeyedRemoval(curFromNodeKey);
                    } else {
                        // NOTE: we skip nested keyed nodes from being removed since there is
                        //       still a chance they will be matched up later
                        removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                    }
                    curFromNodeChild = fromNextSibling;
                }
            }

            var specialElHandler = specialElHandlers[fromEl.nodeName];
            if (specialElHandler) {
                specialElHandler(fromEl, toEl);
            }
        } // END: morphEl(...)

        var morphedNode = fromNode;
        var morphedNodeType = morphedNode.nodeType;
        var toNodeType = toNode.nodeType;

        if (!childrenOnly) {
            // Handle the case where we are given two DOM nodes that are not
            // compatible (e.g. <div> --> <span> or <div> --> TEXT)
            if (morphedNodeType === ELEMENT_NODE) {
                if (toNodeType === ELEMENT_NODE) {
                    if (!compareNodeNames(fromNode, toNode)) {
                        onNodeDiscarded(fromNode);
                        morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
                    }
                } else {
                    // Going from an element node to a text node
                    morphedNode = toNode;
                }
            } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) { // Text or comment node
                if (toNodeType === morphedNodeType) {
                    if (morphedNode.nodeValue !== toNode.nodeValue) {
                        morphedNode.nodeValue = toNode.nodeValue;
                    }

                    return morphedNode;
                } else {
                    // Text node to something else
                    morphedNode = toNode;
                }
            }
        }

        if (morphedNode === toNode) {
            // The "to node" was not compatible with the "from node" so we had to
            // toss out the "from node" and use the "to node"
            onNodeDiscarded(fromNode);
        } else {
            morphEl(morphedNode, toNode, childrenOnly);

            // We now need to loop over any keyed nodes that might need to be
            // removed. We only do the removal if we know that the keyed node
            // never found a match. When a keyed node is matched up we remove
            // it out of fromNodesLookup and we use fromNodesLookup to determine
            // if a keyed node has been matched up or not
            if (keyedRemovalList) {
                for (var i=0, len=keyedRemovalList.length; i<len; i++) {
                    var elToRemove = fromNodesLookup[keyedRemovalList[i]];
                    if (elToRemove) {
                        removeNode(elToRemove, elToRemove.parentNode, false);
                    }
                }
            }
        }

        if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
            if (morphedNode.actualize) {
                morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc);
            }
            // If we had to swap out the from node with a new node because the old
            // node was not compatible with the target node then we need to
            // replace the old DOM node in the original DOM tree. This is only
            // possible if the original DOM node was part of a DOM tree which
            // we know is the case if it has a parent node.
            fromNode.parentNode.replaceChild(morphedNode, fromNode);
        }

        return morphedNode;
    };
}

var morphdom = morphdomFactory(morphAttrs);

module.exports = morphdom;

},{}],22:[function(require,module,exports){
assert.notEqual = notEqual
assert.notOk = notOk
assert.equal = equal
assert.ok = assert

module.exports = assert

function equal (a, b, m) {
  assert(a == b, m) // eslint-disable-line eqeqeq
}

function notEqual (a, b, m) {
  assert(a != b, m) // eslint-disable-line eqeqeq
}

function notOk (t, m) {
  assert(!t, m)
}

function assert (t, m) {
  if (!t) throw new Error(m || 'AssertionError')
}

},{}],23:[function(require,module,exports){
/* global MutationObserver */
var document = require('global/document')
var window = require('global/window')
var assert = require('assert')
var watch = Object.create(null)
var KEY_ID = 'onloadid' + (new Date() % 9e6).toString(36)
var KEY_ATTR = 'data-' + KEY_ID
var INDEX = 0

if (window && window.MutationObserver) {
  var observer = new MutationObserver(function (mutations) {
    if (Object.keys(watch).length < 1) return
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].attributeName === KEY_ATTR) {
        eachAttr(mutations[i], turnon, turnoff)
        continue
      }
      eachMutation(mutations[i].removedNodes, turnoff)
      eachMutation(mutations[i].addedNodes, turnon)
    }
  })
  if (document.body) {
    beginObserve(observer)
  } else {
    document.addEventListener('DOMContentLoaded', function (event) {
      beginObserve(observer)
    })
  }
}

function beginObserve (observer) {
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: [KEY_ATTR]
  })
}

module.exports = function onload (el, on, off, caller) {
  assert(document.body, 'on-load: will not work prior to DOMContentLoaded')
  on = on || function () {}
  off = off || function () {}
  el.setAttribute(KEY_ATTR, 'o' + INDEX)
  watch['o' + INDEX] = [on, off, 0, caller || onload.caller]
  INDEX += 1
  return el
}

module.exports.KEY_ATTR = KEY_ATTR
module.exports.KEY_ID = KEY_ID

function turnon (index, el) {
  if (watch[index][0] && watch[index][2] === 0) {
    watch[index][0](el)
    watch[index][2] = 1
  }
}

function turnoff (index, el) {
  if (watch[index][1] && watch[index][2] === 1) {
    watch[index][1](el)
    watch[index][2] = 0
  }
}

function eachAttr (mutation, on, off) {
  var newValue = mutation.target.getAttribute(KEY_ATTR)
  if (sameOrigin(mutation.oldValue, newValue)) {
    watch[newValue] = watch[mutation.oldValue]
    return
  }
  if (watch[mutation.oldValue]) {
    off(mutation.oldValue, mutation.target)
  }
  if (watch[newValue]) {
    on(newValue, mutation.target)
  }
}

function sameOrigin (oldValue, newValue) {
  if (!oldValue || !newValue) return false
  return watch[oldValue][3] === watch[newValue][3]
}

function eachMutation (nodes, fn) {
  var keys = Object.keys(watch)
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] && nodes[i].getAttribute && nodes[i].getAttribute(KEY_ATTR)) {
      var onloadid = nodes[i].getAttribute(KEY_ATTR)
      keys.forEach(function (k) {
        if (onloadid === k) {
          fn(k, nodes[i])
        }
      })
    }
    if (nodes[i].childNodes.length > 0) {
      eachMutation(nodes[i].childNodes, fn)
    }
  }
}

},{"assert":22,"global/document":15,"global/window":16}],24:[function(require,module,exports){
(function (process){
  /* globals require, module */

  'use strict';

  /**
   * Module dependencies.
   */

  var pathtoRegexp = require('path-to-regexp');

  /**
   * Module exports.
   */

  module.exports = page;

  /**
   * Detect click event
   */
  var clickEvent = ('undefined' !== typeof document) && document.ontouchstart ? 'touchstart' : 'click';

  /**
   * To work properly with the URL
   * history.location generated polyfill in https://github.com/devote/HTML5-History-API
   */

  var location = ('undefined' !== typeof window) && (window.history.location || window.location);

  /**
   * Perform initial dispatch.
   */

  var dispatch = true;


  /**
   * Decode URL components (query string, pathname, hash).
   * Accommodates both regular percent encoding and x-www-form-urlencoded format.
   */
  var decodeURLComponents = true;

  /**
   * Base path.
   */

  var base = '';

  /**
   * Running flag.
   */

  var running;

  /**
   * HashBang option
   */

  var hashbang = false;

  /**
   * Previous context, for capturing
   * page exit events.
   */

  var prevContext;

  /**
   * Register `path` with callback `fn()`,
   * or route `path`, or redirection,
   * or `page.start()`.
   *
   *   page(fn);
   *   page('*', fn);
   *   page('/user/:id', load, user);
   *   page('/user/' + user.id, { some: 'thing' });
   *   page('/user/' + user.id);
   *   page('/from', '/to')
   *   page();
   *
   * @param {string|!Function|!Object} path
   * @param {Function=} fn
   * @api public
   */

  function page(path, fn) {
    // <callback>
    if ('function' === typeof path) {
      return page('*', path);
    }

    // route <path> to <callback ...>
    if ('function' === typeof fn) {
      var route = new Route(/** @type {string} */ (path));
      for (var i = 1; i < arguments.length; ++i) {
        page.callbacks.push(route.middleware(arguments[i]));
      }
      // show <path> with [state]
    } else if ('string' === typeof path) {
      page['string' === typeof fn ? 'redirect' : 'show'](path, fn);
      // start [options]
    } else {
      page.start(path);
    }
  }

  /**
   * Callback functions.
   */

  page.callbacks = [];
  page.exits = [];

  /**
   * Current path being processed
   * @type {string}
   */
  page.current = '';

  /**
   * Number of pages navigated to.
   * @type {number}
   *
   *     page.len == 0;
   *     page('/login');
   *     page.len == 1;
   */

  page.len = 0;

  /**
   * Get or set basepath to `path`.
   *
   * @param {string} path
   * @api public
   */

  page.base = function(path) {
    if (0 === arguments.length) return base;
    base = path;
  };

  /**
   * Bind with the given `options`.
   *
   * Options:
   *
   *    - `click` bind to click events [true]
   *    - `popstate` bind to popstate [true]
   *    - `dispatch` perform initial dispatch [true]
   *
   * @param {Object} options
   * @api public
   */

  page.start = function(options) {
    options = options || {};
    if (running) return;
    running = true;
    if (false === options.dispatch) dispatch = false;
    if (false === options.decodeURLComponents) decodeURLComponents = false;
    if (false !== options.popstate) window.addEventListener('popstate', onpopstate, false);
    if (false !== options.click) {
      document.addEventListener(clickEvent, onclick, false);
    }
    if (true === options.hashbang) hashbang = true;
    if (!dispatch) return;
    var url = (hashbang && ~location.hash.indexOf('#!')) ? location.hash.substr(2) + location.search : location.pathname + location.search + location.hash;
    page.replace(url, null, true, dispatch);
  };

  /**
   * Unbind click and popstate event handlers.
   *
   * @api public
   */

  page.stop = function() {
    if (!running) return;
    page.current = '';
    page.len = 0;
    running = false;
    document.removeEventListener(clickEvent, onclick, false);
    window.removeEventListener('popstate', onpopstate, false);
  };

  /**
   * Show `path` with optional `state` object.
   *
   * @param {string} path
   * @param {Object=} state
   * @param {boolean=} dispatch
   * @param {boolean=} push
   * @return {!Context}
   * @api public
   */

  page.show = function(path, state, dispatch, push) {
    var ctx = new Context(path, state);
    page.current = ctx.path;
    if (false !== dispatch) page.dispatch(ctx);
    if (false !== ctx.handled && false !== push) ctx.pushState();
    return ctx;
  };

  /**
   * Goes back in the history
   * Back should always let the current route push state and then go back.
   *
   * @param {string} path - fallback path to go back if no more history exists, if undefined defaults to page.base
   * @param {Object=} state
   * @api public
   */

  page.back = function(path, state) {
    if (page.len > 0) {
      // this may need more testing to see if all browsers
      // wait for the next tick to go back in history
      history.back();
      page.len--;
    } else if (path) {
      setTimeout(function() {
        page.show(path, state);
      });
    }else{
      setTimeout(function() {
        page.show(base, state);
      });
    }
  };


  /**
   * Register route to redirect from one path to other
   * or just redirect to another route
   *
   * @param {string} from - if param 'to' is undefined redirects to 'from'
   * @param {string=} to
   * @api public
   */
  page.redirect = function(from, to) {
    // Define route from a path to another
    if ('string' === typeof from && 'string' === typeof to) {
      page(from, function(e) {
        setTimeout(function() {
          page.replace(/** @type {!string} */ (to));
        }, 0);
      });
    }

    // Wait for the push state and replace it with another
    if ('string' === typeof from && 'undefined' === typeof to) {
      setTimeout(function() {
        page.replace(from);
      }, 0);
    }
  };

  /**
   * Replace `path` with optional `state` object.
   *
   * @param {string} path
   * @param {Object=} state
   * @param {boolean=} init
   * @param {boolean=} dispatch
   * @return {!Context}
   * @api public
   */


  page.replace = function(path, state, init, dispatch) {
    var ctx = new Context(path, state);
    page.current = ctx.path;
    ctx.init = init;
    ctx.save(); // save before dispatching, which may redirect
    if (false !== dispatch) page.dispatch(ctx);
    return ctx;
  };

  /**
   * Dispatch the given `ctx`.
   *
   * @param {Context} ctx
   * @api private
   */
  page.dispatch = function(ctx) {
    var prev = prevContext,
      i = 0,
      j = 0;

    prevContext = ctx;

    function nextExit() {
      var fn = page.exits[j++];
      if (!fn) return nextEnter();
      fn(prev, nextExit);
    }

    function nextEnter() {
      var fn = page.callbacks[i++];

      if (ctx.path !== page.current) {
        ctx.handled = false;
        return;
      }
      if (!fn) return unhandled(ctx);
      fn(ctx, nextEnter);
    }

    if (prev) {
      nextExit();
    } else {
      nextEnter();
    }
  };

  /**
   * Unhandled `ctx`. When it's not the initial
   * popstate then redirect. If you wish to handle
   * 404s on your own use `page('*', callback)`.
   *
   * @param {Context} ctx
   * @api private
   */
  function unhandled(ctx) {
    if (ctx.handled) return;
    var current;

    if (hashbang) {
      current = base + location.hash.replace('#!', '');
    } else {
      current = location.pathname + location.search;
    }

    if (current === ctx.canonicalPath) return;
    page.stop();
    ctx.handled = false;
    location.href = ctx.canonicalPath;
  }

  /**
   * Register an exit route on `path` with
   * callback `fn()`, which will be called
   * on the previous context when a new
   * page is visited.
   */
  page.exit = function(path, fn) {
    if (typeof path === 'function') {
      return page.exit('*', path);
    }

    var route = new Route(path);
    for (var i = 1; i < arguments.length; ++i) {
      page.exits.push(route.middleware(arguments[i]));
    }
  };

  /**
   * Remove URL encoding from the given `str`.
   * Accommodates whitespace in both x-www-form-urlencoded
   * and regular percent-encoded form.
   *
   * @param {string} val - URL component to decode
   */
  function decodeURLEncodedURIComponent(val) {
    if (typeof val !== 'string') { return val; }
    return decodeURLComponents ? decodeURIComponent(val.replace(/\+/g, ' ')) : val;
  }

  /**
   * Initialize a new "request" `Context`
   * with the given `path` and optional initial `state`.
   *
   * @constructor
   * @param {string} path
   * @param {Object=} state
   * @api public
   */

  function Context(path, state) {
    if ('/' === path[0] && 0 !== path.indexOf(base)) path = base + (hashbang ? '#!' : '') + path;
    var i = path.indexOf('?');

    this.canonicalPath = path;
    this.path = path.replace(base, '') || '/';
    if (hashbang) this.path = this.path.replace('#!', '') || '/';

    this.title = document.title;
    this.state = state || {};
    this.state.path = path;
    this.querystring = ~i ? decodeURLEncodedURIComponent(path.slice(i + 1)) : '';
    this.pathname = decodeURLEncodedURIComponent(~i ? path.slice(0, i) : path);
    this.params = {};

    // fragment
    this.hash = '';
    if (!hashbang) {
      if (!~this.path.indexOf('#')) return;
      var parts = this.path.split('#');
      this.path = parts[0];
      this.hash = decodeURLEncodedURIComponent(parts[1]) || '';
      this.querystring = this.querystring.split('#')[0];
    }
  }

  /**
   * Expose `Context`.
   */

  page.Context = Context;

  /**
   * Push state.
   *
   * @api private
   */

  Context.prototype.pushState = function() {
    page.len++;
    history.pushState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
  };

  /**
   * Save the context state.
   *
   * @api public
   */

  Context.prototype.save = function() {
    history.replaceState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
  };

  /**
   * Initialize `Route` with the given HTTP `path`,
   * and an array of `callbacks` and `options`.
   *
   * Options:
   *
   *   - `sensitive`    enable case-sensitive routes
   *   - `strict`       enable strict matching for trailing slashes
   *
   * @constructor
   * @param {string} path
   * @param {Object=} options
   * @api private
   */

  function Route(path, options) {
    options = options || {};
    this.path = (path === '*') ? '(.*)' : path;
    this.method = 'GET';
    this.regexp = pathtoRegexp(this.path,
      this.keys = [],
      options);
  }

  /**
   * Expose `Route`.
   */

  page.Route = Route;

  /**
   * Return route middleware with
   * the given callback `fn()`.
   *
   * @param {Function} fn
   * @return {Function}
   * @api public
   */

  Route.prototype.middleware = function(fn) {
    var self = this;
    return function(ctx, next) {
      if (self.match(ctx.path, ctx.params)) return fn(ctx, next);
      next();
    };
  };

  /**
   * Check if this route matches `path`, if so
   * populate `params`.
   *
   * @param {string} path
   * @param {Object} params
   * @return {boolean}
   * @api private
   */

  Route.prototype.match = function(path, params) {
    var keys = this.keys,
      qsIndex = path.indexOf('?'),
      pathname = ~qsIndex ? path.slice(0, qsIndex) : path,
      m = this.regexp.exec(decodeURIComponent(pathname));

    if (!m) return false;

    for (var i = 1, len = m.length; i < len; ++i) {
      var key = keys[i - 1];
      var val = decodeURLEncodedURIComponent(m[i]);
      if (val !== undefined || !(hasOwnProperty.call(params, key.name))) {
        params[key.name] = val;
      }
    }

    return true;
  };


  /**
   * Handle "populate" events.
   */

  var onpopstate = (function () {
    var loaded = false;
    if ('undefined' === typeof window) {
      return;
    }
    if (document.readyState === 'complete') {
      loaded = true;
    } else {
      window.addEventListener('load', function() {
        setTimeout(function() {
          loaded = true;
        }, 0);
      });
    }
    return function onpopstate(e) {
      if (!loaded) return;
      if (e.state) {
        var path = e.state.path;
        page.replace(path, e.state);
      } else {
        page.show(location.pathname + location.hash, undefined, undefined, false);
      }
    };
  })();
  /**
   * Handle "click" events.
   */

  function onclick(e) {

    if (1 !== which(e)) return;

    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    if (e.defaultPrevented) return;



    // ensure link
    // use shadow dom when available
    var el = e.path ? e.path[0] : e.target;
    while (el && 'A' !== el.nodeName) el = el.parentNode;
    if (!el || 'A' !== el.nodeName) return;



    // Ignore if tag has
    // 1. "download" attribute
    // 2. rel="external" attribute
    if (el.hasAttribute('download') || el.getAttribute('rel') === 'external') return;

    // ensure non-hash for the same path
    var link = el.getAttribute('href');
    if (!hashbang && el.pathname === location.pathname && (el.hash || '#' === link)) return;



    // Check for mailto: in the href
    if (link && link.indexOf('mailto:') > -1) return;

    // check target
    if (el.target) return;

    // x-origin
    if (!sameOrigin(el.href)) return;



    // rebuild path
    var path = el.pathname + el.search + (el.hash || '');

    // strip leading "/[drive letter]:" on NW.js on Windows
    if (typeof process !== 'undefined' && path.match(/^\/[a-zA-Z]:\//)) {
      path = path.replace(/^\/[a-zA-Z]:\//, '/');
    }

    // same page
    var orig = path;

    if (path.indexOf(base) === 0) {
      path = path.substr(base.length);
    }

    if (hashbang) path = path.replace('#!', '');

    if (base && orig === path) return;

    e.preventDefault();
    page.show(orig);
  }

  /**
   * Event button.
   */

  function which(e) {
    e = e || window.event;
    return null === e.which ? e.button : e.which;
  }

  /**
   * Check if `href` is the same origin.
   */

  function sameOrigin(href) {
    var origin = location.protocol + '//' + location.hostname;
    if (location.port) origin += ':' + location.port;
    return (href && (0 === href.indexOf(origin)));
  }

  page.sameOrigin = sameOrigin;

}).call(this,require('_process'))
},{"_process":26,"path-to-regexp":25}],25:[function(require,module,exports){
var isarray = require('isarray')

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {String} str
 * @return {Array}
 */
function parse (str) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var res

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      continue
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
    }

    var prefix = res[2]
    var name = res[3]
    var capture = res[4]
    var group = res[5]
    var suffix = res[6]
    var asterisk = res[7]

    var repeat = suffix === '+' || suffix === '*'
    var optional = suffix === '?' || suffix === '*'
    var delimiter = prefix || '/'
    var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      pattern: escapeGroup(pattern)
    })
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index)
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path)
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {String}   str
 * @return {Function}
 */
function compile (str) {
  return tokensToFunction(parse(str))
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^' + tokens[i].pattern + '$')
    }
  }

  return function (obj) {
    var path = ''
    var data = obj || {}

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token

        continue
      }

      var value = data[token.name]
      var segment

      if (value == null) {
        if (token.optional) {
          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encodeURIComponent(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      segment = encodeURIComponent(value)

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {String} str
 * @return {String}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {String} group
 * @return {String}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {RegExp} re
 * @param  {Array}  keys
 * @return {RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {String}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {RegExp} path
 * @param  {Array}  keys
 * @return {RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        pattern: null
      })
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {Array}  path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {String} path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function stringToRegexp (path, keys, options) {
  var tokens = parse(path)
  var re = tokensToRegExp(tokens, options)

  // Attach keys back to the regexp.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] !== 'string') {
      keys.push(tokens[i])
    }
  }

  return attachKeys(re, keys)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {Array}  tokens
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function tokensToRegExp (tokens, options) {
  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var route = ''
  var lastToken = tokens[tokens.length - 1]
  var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      var prefix = escapeString(token.prefix)
      var capture = token.pattern

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*'
      }

      if (token.optional) {
        if (prefix) {
          capture = '(?:' + prefix + '(' + capture + '))?'
        } else {
          capture = '(' + capture + ')?'
        }
      } else {
        capture = prefix + '(' + capture + ')'
      }

      route += capture
    }
  }

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
  }

  if (end) {
    route += '$'
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithSlash ? '' : '(?=\\/|$)'
  }

  return new RegExp('^' + route, flags(options))
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(String|RegExp|Array)} path
 * @param  {Array}                 [keys]
 * @param  {Object}                [options]
 * @return {RegExp}
 */
function pathToRegexp (path, keys, options) {
  keys = keys || []

  if (!isarray(keys)) {
    options = keys
    keys = []
  } else if (!options) {
    options = {}
  }

  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys, options)
  }

  if (isarray(path)) {
    return arrayToRegexp(path, keys, options)
  }

  return stringToRegexp(path, keys, options)
}

},{"isarray":19}],26:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],27:[function(require,module,exports){
var bel = require('bel') // turns template tag into DOM elements
var morphdom = require('morphdom') // efficiently diffs + morphs two DOM elements
var defaultEvents = require('./update-events.js') // default events to be copied when dom elements update

module.exports = bel

// TODO move this + defaultEvents to a new module once we receive more feedback
module.exports.update = function (fromNode, toNode, opts) {
  if (!opts) opts = {}
  if (opts.events !== false) {
    if (!opts.onBeforeElUpdated) opts.onBeforeElUpdated = copier
  }

  return morphdom(fromNode, toNode, opts)

  // morphdom only copies attributes. we decided we also wanted to copy events
  // that can be set via attributes
  function copier (f, t) {
    // copy events:
    var events = opts.events || defaultEvents
    for (var i = 0; i < events.length; i++) {
      var ev = events[i]
      if (t[ev]) { // if new element has a whitelisted attribute
        f[ev] = t[ev] // update existing element
      } else if (f[ev]) { // if existing element has it and new one doesnt
        f[ev] = undefined // remove it from existing element
      }
    }
    var oldValue = f.value
    var newValue = t.value
    // copy values for form elements
    if ((f.nodeName === 'INPUT' && f.type !== 'file') || f.nodeName === 'SELECT') {
      if (!newValue && !t.hasAttribute('value')) {
        t.value = f.value
      } else if (newValue !== oldValue) {
        f.value = newValue
      }
    } else if (f.nodeName === 'TEXTAREA') {
      if (t.getAttribute('value') === null) f.value = t.value
    }
  }
}

},{"./update-events.js":28,"bel":12,"morphdom":21}],28:[function(require,module,exports){
module.exports = [
  // attribute events (can be set with attributes)
  'onclick',
  'ondblclick',
  'onmousedown',
  'onmouseup',
  'onmouseover',
  'onmousemove',
  'onmouseout',
  'ondragstart',
  'ondrag',
  'ondragenter',
  'ondragleave',
  'ondragover',
  'ondrop',
  'ondragend',
  'onkeydown',
  'onkeypress',
  'onkeyup',
  'onunload',
  'onabort',
  'onerror',
  'onresize',
  'onscroll',
  'onselect',
  'onchange',
  'onsubmit',
  'onreset',
  'onfocus',
  'onblur',
  'oninput',
  // other common events
  'oncontextmenu',
  'onfocusin',
  'onfocusout'
]

},{}]},{},[1]);
