jQuery(document).ready(function(){
    
    $('.sistema-login #loginPanel, .sistema-login-panel #loginPanel').submit(function(){
        var c = $('#clave').val();
        
        $('#clave').val('');
        
        if(c != ''){
            $('#clave_hidden').val(hex_sha1(c));
        }      
        
    });
    
    $('.sistema-login-panel #correo-recordar').focus(function(){
        $('.mensaje-recuperar').fadeOut(1000);
    });
    
    $('.sistema-login-panel .boton-recuperar').click(function(){
        var c = $('#correo-recordar').val().trim();
        var a = 'b';
        
        if(!correoValido(c) || c === ''){
            $('.mensaje-error').html('El correo ingresado no es válido');
            $('.mensaje-error').fadeIn(1000);
            
            return false;
        }
        
        $('.preloader').fadeIn('slow');
        
        $.ajax({
            type: "GET",
            url: '/',
            data: {PeticionAjaxPublico: 'recuperarClave', c: c, a:a},
            dataType: 'json'
            }).done(function(datos) {               
                $('.preloader').fadeOut('slow');
                if(!datos.error){               
                    $('#correo-recordar').val('');
                    $('.mensaje-ok').html(datos.mensaje);
                    $('.mensaje-ok').fadeIn('slow');
                }else{
                    $('.mensaje-error').html(datos.mensaje);
                    $('.mensaje-error').fadeIn('slow');
                }                
                
                
            });
        
        return false;
    });
    
    $('.sistema-login-panel .boton-resetear').click(function(){
        
        var t = $('#token').val();
        var a = 'b';
        var control = $('#clave').val();
        
        $('#clave_hidden').val(hex_sha1($('#clave').val()));
        $('#claveRepetir_hidden').val(hex_sha1($('#claveRepetir').val()));
        
        $('#clave').val('');
        $('#claveRepetir').val('');
        
        var c = $('#clave_hidden').val();
        var c2 = $('#claveRepetir_hidden').val();
        
        
        if(c != c2 || control == ''){
            $('.mensaje-error').html('Las claves deben ser iguales');
            $('.mensaje-error').fadeIn(1000);
            
            return false;
        }
        
        $('.preloader').fadeIn('slow');
        $('.mensaje-error').fadeOut();
        
        $.ajax({
            type: "GET",
            url: '/',
            data: {PeticionAjaxPublico: 'resetearClave', c: c, c2:c2, t:t, a:a},
            dataType: 'json'
            }).done(function(datos) {               
                $('.preloader').fadeOut('slow');
                if(!datos.error){               
                    $('.mensaje-ok').html(datos.mensaje);
                    $('.mensaje-ok').fadeIn('slow');
                }else{
                    $('.mensaje-error').html(datos.mensaje);
                    $('.mensaje-error').fadeIn('slow');
                }                
                
                
            });
        
        return false;
    });
    
    $('#correo, #clave, #correo-recordar').focus(function(){
        
        $('.alert-danger').fadeOut('slow');
    });
    
    
    var correoValido = function(cadena){
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if(!emailReg.test(cadena) ){
          return false;
        }else{
          return true;
        }
    };
    
});