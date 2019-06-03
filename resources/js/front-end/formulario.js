$(function() {

    $("input,select,textarea").not("[type=submit]").not("[id=cadena]").not("[id=localidad]").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
            
        },
        submitSuccess: function($form, event) {
            
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            
            var seccion = $form.attr('id');
            var prefijo = '';
            if($form.attr('data-prefijo') !== undefined && $form.attr('data-prefijo') !== ''){
               prefijo = $form.attr('data-prefijo') + '-';
            }

            var registro = $('#' + seccion + ' #' + prefijo + 'registro').val();
      
            var nombre = $('#' + seccion + ' #' + prefijo + 'nombre').val();
            var correo = $('#' + seccion + ' #' + prefijo + 'correo').val();
            var telefono = $('#' + seccion + ' #' + prefijo + 'telefono').val();
            var mensaje = $('#' + seccion + ' #' + prefijo + 'mensaje').val();

            $('.' + seccion + '-boton-enviar').attr('disabled','disabled');
            
            $('.form-info').fadeOut('fast');
            $('.' + seccion + '-enviando').fadeIn('fast');                
            
            $.ajax({
                type: "GET",
                url: '/',
                data: {PeticionAjaxPublico: 'f', f: seccion, nombre: nombre, correo: correo, telefono: telefono, mensaje: mensaje, registro: registro},
                cache: false,
                dataType: 'json',
                success: function(datos) {
                    
                    // Success message
                    if(!datos.error){
                        $('.' + seccion + '-error').fadeOut();
                        $('.' + seccion + '-exito').fadeIn();
                    }else{
                        $('.' + seccion + '-exito').fadeOut();
                        $('.' + seccion + '-error').fadeIn();
                    }
                    
                    $('.' + seccion + '-enviando').fadeOut('fast');
                    $('#' + seccion + ' #' + prefijo + 'nombre').val('');
                    $('#' + seccion + ' #' + prefijo + 'correo').val('');
                    $('#' + seccion + ' #' + prefijo + 'telefono').val('');
                    $('#' + seccion + ' #' + prefijo + 'mensaje').val('');
                    
                    
                    
                    // $('.' + seccion + '-boton-enviar').fadeIn('fast');
                },
                error: function() {
                    // Fail message
                    $('.' + seccion + '-error').fadeIn();
                    
                    $('.' + seccion + '-enviado').fadeOut('fast');
                    $('#' + seccion + ' #' + prefijo + 'nombre').val('');
                    $('#' + seccion + ' #' + prefijo + 'correo').val('');
                    $('#' + seccion + ' #' + prefijo + 'telefono').val('');
                    $('#' + seccion + ' #' + prefijo + 'mensaje').val('');
                    
                    $('.' + seccion + '-boton-enviar').fadeIn('fast');
                }
            });
        },
        filter: function() {
            return $(this).is(":visible");
        }
    });
});
