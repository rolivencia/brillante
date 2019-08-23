jQuery(document).ready(function() {
    
    $('#contenedor #correo').attr('placeholder','Correo');
    $('#contenedor #clave').attr('placeholder','Clave');
    $('#contenedor #claveRepetir').attr('placeholder','Repetir Clave');
    
    $('.sistema-login #loginPanel, .sistema-login-panel #loginPanel').submit(function(){
        c = $('#clave').val();
        
        $('#clave').val('');
        
        if(c != ''){
            $('#clave_hidden').val(hex_sha1(c));
        }                
        
    });
    
    $('.sistema-login #recuperarClave, .sistema-login-panel #recuperarClave').submit(function(){
        
        c = $('#clave').val();
        
        $('#clave').val('');
        if(c != ''){
            $('#clave_hidden').val(hex_sha1(c));
        } 
        
        if($('#claveRepetir').length > 0){
            c = $('#claveRepetir').val();
            $('#claveRepetir').val('');
            if(c != ''){
                $('#claveRepetir_hidden').val(hex_sha1(c));
            }
            
        }
        
    });
    
    $('.sistema-login .campoTexto, .sistema-login-panel .campoTexto').focus(function(){
        $(this).addClass('campoTextoFocus');
        
    });
    
    $('.sistema-login .campoTexto, .sistema-login-panel .campoTexto').blur(function(){
        $(this).removeClass('campoTextoFocus');
        
    });
    
    $('.sistema-login-panel #correo, .sistema-login-panel #clave').focus(function(){
        $('#textoErrorLoginPanel').fadeOut('fast');
        $('#textoErrorRecuperarClave').fadeIn('fast');
    });
    
    $('.eMinimizar').click(function(){
        $('#login').slideUp('slow');
        $('.eMaximizar').css('display','block');
        $('.eMaximizar').fadeIn('slow');
        
        return false;
    });
    
    $('.eVerImagen').hover(function() {
        $('.sTooltip').fadeIn(1000);
    }, function() {
        $('.sTooltip').fadeOut(500);
    });
    
    $('.eMaximizar').click(function(){
        $('#login').slideDown('slow');
        $('.eMaximizar').css('display','block');
        $('.eMaximizar').fadeOut('slow');
        
        return false;
    });
    
    $('.sistema-login .eVolver').click(function(){
        $('.dOver').html('');
        $('#cRecordarClave').val('');
        $('.dOver').fadeOut('slow');
        $('.dRecordar').fadeOut(500, function(){
           $('.dOver').css('background-position','center center'); 
        });        
        
        return false;
    });
    
    var a = ($(document).width() - $('#login').width()) / 2;
    var l = ($(document).height() - $('#login').height()) / 4;
    $('#login').css('left',a + 'px');
    $('#login').css('top',l + 'px');
    $(window).resize(function(){
        var a = ($(document).width() - $('#login').width()) / 2;
        var l = ($(document).height() - $('#login').height()) / 4;
        $('#login').css('left',a + 'px');
        $('#login').css('top',l + 'px');
    });
    
    if($('#textoErrorLoginPanel').width() > 0){
        $('#textoErrorLoginPanel').fadeIn(1000);
    }
    
    if($('#textoErrorRecuperarClave').width() > 0){
        $('#textoErrorRecuperarClave').fadeIn(1000);        
    }
    
    $('.sistema-login-panel .eOlvidoClave').click(function(){
        
        $('#textoErrorLoginPanel').fadeOut(1000);
        $('.dRecordar').fadeIn('slow');
        
        return false;
    });
    
    $('.sistema-login-panel #correo-recordar').focus(function(){
        $('.mensaje-recuperar').fadeOut(1000);
    });
    
    $('.sistema-login-panel .boton-recuperar').click(function(){
        var c = $('#correo-recordar').val().trim();
        
        if(!correoValido(c) || c === ''){
            $('.mensaje-recuperar').html('El correo ingresado no es válido');
            $('.mensaje-recuperar').fadeIn(1000);
            
            return false;
        }
        
        $('.preloader').fadeIn('slow');
        
        $.ajax({
            type: "POST",
            url: '/',
            data: {PeticionAjaxPublico: 'recuperarClave', c: c, t:'pa'},
            dataType: 'json'
            }).done(function(datos) {               
                $('.preloader').fadeOut('slow');
                if(!datos.error){               
                    $('#correo-recordar').val('');
                    $('.mensaje-exito').html(datos.mensaje);
                    $('.mensaje-exito').fadeIn('slow');
                }else{
                    $('.mensaje-recuperar').html(datos.mensaje);
                    $('.mensaje-recuperar').fadeIn('slow');
                }                
                
                
            });
        
        return false;
    });
    
    var correoValido = function(cadena){
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if(!emailReg.test(cadena) ){
          return false;
        }else{
          return true;
        }
    };
    
    /* Magnific Popup */
    /*if($('body').hasClass('sistema-login-panel')){
        $('.sistema-login-panel').magnificPopup({
            delegate: 'a.eVerImagen', 
            type: 'image',
            gallery:{
              enabled:true
            }
          });
    }*/
});