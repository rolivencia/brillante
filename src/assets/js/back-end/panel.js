jQuery(document).ready(function() {
       
    var t = $('#panel-token-seccion').attr('data-token-panel');
    var s = $('#panel-token-seccion').attr('data-seccion-completa');
    
    $('body').magnificPopup({
        delegate: 'a[rel=magnific-popup]', 
        type: 'image',
        gallery:{
          enabled:true
        }
    });
    
    var handleSelectpicker = function() {
        $('.selectpicker').selectpicker('render');
    };
    
    $('.ts-helper').click(function(){
        
        v = $(this).attr('data-v');
        c = $(this).attr('data-c');
        r = $(this).attr('data-r');
        
        if(v == 'si'){
            $(this).attr('data-v','no');
        }else{
            $(this).attr('data-v','si');
        }
        
        $.ajax({
            type: "GET",
            url: s + '?panel-token=' + t,
            data: {PeticionAjax: 'checkbox', t: 1, v: v, c: c,  r: r}
            }).done(function(msg) {
                
        });
                
    });
    

    $('.boton-borrar').live('click',function(){

        var c = $(this).attr('data-concepto');
  
        $('#concepto-eliminacion').html(c);
        $('#boton-borrar-enlace').attr('href',$(this).attr('data-enlace'));
        $('#boton-borrar-enlace').attr('data-id',$(this).attr('data-id'));
        
        $('#ventana-modal-ajax .modal-title').html('Borrar Registro');
        $('#ventana-modal-ajax .modal-body').html($('#ventana-borrar-registro').html());

    });
    
    $('.boton-borrar-cancelar').live('click',function(){
        $('#ventana-modal-ajax').modal('hide');
        
        return false;
    });
        
    $('.boton-borrar-imagen').live('click',function(){

        var c = $(this).attr('data-concepto');
  
        $('#concepto-eliminacion').html(c);
        $('#boton-borrar-enlace-interno').attr('href',$(this).attr('data-enlace'));
        $('#boton-borrar-enlace-interno').attr('data-id',$(this).attr('data-id'));
        
        $('#ventana-modal-ajax .modal-title').html('Borrar Registro');
        $('#ventana-modal-ajax .modal-body').html($('#ventana-borrar-registro').html());

    });
    
    
    /*
     * Formularios
     */
    $('input').focus(function(){
        $(this).select();
    });
    
    $('.boton-examinar, .campo-falso, .boton-examinar-archivo').live('click',function(){       
        id = $(this).attr('t');
        $('#' + id).trigger('click');
        return false;
    });
    
    $('.form-control-archivo').live('change',function(){       
        id = $(this).attr('id');
        $('#' + id + '_falso').val($(this).val());
        
        return false;
    });    
    
    
    $('.boton-guardar, .boton-guardar-cambios, .boton-enviar-panel ').click(function(){
        
        $('#formulario-alta').submit();
        
        return false;
        
    });
    
    /*
     * Claves
     */
    $('input[type="password"]').keyup(function(){
        $('#' + $(this).attr(('name')) + '_hidden').val(hex_sha1($(this).val()));    
    });
    
    /*
     * Seguridad
     */
    $('.usuario-seguridad').click(function(){
        t = $(this).attr('t');
        u = $(this).attr('id');
        
        $('.usuario-seguridad').css('visibility','hidden');
        
        $('.preloader').fadeIn('slow');
        $('.tr-usuarios').removeClass('boton-flotado');
        $('.tr-usuarios').css('display','none');
        $('#tr-' + u).css('display','block');
        $('#tr-' + u).addClass('boton-flotado');        
        $('#tr-' + u +' .boton-ver-todos').fadeIn();
        
        $.ajax({
            type: "GET",
            url: '/panel/seguridad/?panel-token=' + t,
            data: {PeticionAjax: 'usuario-seguridad', u:u}
            }).done(function(msg) {
                $('.preloader').fadeOut('fast');
                $('#seguridad-respuesta').html(msg);
        });
        
        return false;
        
    });
    
    $('.boton-ver-todos').click(function(){
        
        $(this).css('display','none');
        $('#seguridad-respuesta').html('');
        $('.tr-usuarios').removeClass('boton-flotado');
        $('.tr-usuarios').css('width','100%');
        $('.tr-usuarios').css('display','table-row');
        $('.usuario-seguridad').css('visibility','visible');
        
        return false;
    });
    
    $('.usuario-seguridad-accion').live('click',function(){
        t = $(this).attr('t');
        u = $(this).attr('id');
        s = $(this).attr('s');
        
        if($(this).hasClass('btn-success')){
            a = 'd';
            $(this).removeClass('btn-success');
            $(this).addClass('btn-danger');
        }else{
            a = 'h';
            $(this).removeClass('btn-danger');
            $(this).addClass('btn-success');
        }
        
        $.ajax({
            type: "GET",
            url: '/panel/seguridad/?panel-token=' + t,
            data: {PeticionAjax: 'usuario-seguridad-accion', u:u, a:a, s:s}
            }).done(function(msg) {
                
        });
        
        return false;
        
    });
    
    $('.boton-borrar-fecha').click(function(){
        var i = $(this).attr('data-id');
        
        $('#' + i).val('');
        
        return false;
    });
    
    $('#youtube').blur(function(){
        var url = $('#youtube').val(); 
         //http://www.youtube.com/watch?v=SNfYz6Yw0W8&feature=g-all-esi would work also
        var a = url.split("v=")[1];
        a = a != undefined ? a : url.split("youtu.be/")[1];
        b = a.split("&")[0];
        
        $('.youtube-enlace').attr('href','http://img.youtube.com/vi/' + a + '/0.jpg');
    });
    
    /*
     * Checkbox Relacionales
     */
    $('a.boton-relacional').click(function(){
        
        var v = parseInt($(this).attr('v'));
        var c = $('#' + $(this).attr('c'));
        
        cambios = true;
        
        var t = c.val();
        
        if($(this).hasClass('btn-primary')){
            $(this).removeClass('btn-primary');
            $(this).addClass('bgm-gray ');
            t  = t.replace(';' + v + ';',';');
        }else{
            $(this).removeClass('bgm-gray ');
            $(this).addClass('btn-primary');
            t  = t + v + ';';
        }
        
        c.val(t);
        
        return false;
        
    });
    
    /*
     * Contactos
     */
    $('#boton-importar-contactos').click(function(){
      
       // i = $('#idLista').val();
       v = $('#cadena').val();
       a = $('#archivo').val();
       
       if(v != ''){
            $('.ajax-cargando-contactos').fadeIn('slow');
            $('.respuesta-importador').css('display','none');
       
            $.ajax({
                type: "GET",
                url: s + '?panel-token=' + t,
                data: {PeticionAjax: 'importarContactos', v: v}
                }).done(function(msg) {
                    $('.respuesta-importador').html(msg);
                    $('.ajax-cargando-contactos').fadeOut('fast');
                    $('.respuesta-importador').fadeIn('slow');
                    
                    $('#cadena').val('');
            });
            
            return false;
        }
        
        if(a != ''){
           $('#formulario-alta-contactos').submit();
           
           return false;
        }
        
        alert('Debe ingresar la cadea a importar');        
       
       return false;
    });
    
    
    /*
     * Productos
     */
    $('#boton-importar-productos').click(function(){
      
       a = $('#archivo').val();
       
        if(a !== ''){
           $('#formulario-importar-productos').submit();
           
           return false;
        }
        
        alert('Debe cargar un archivo a importar');        
       
       return false;
    });

});

var correoValido = function(cadena){
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if(!emailReg.test(cadena) ){
      return false;
    }else{
      return true;
    }
};