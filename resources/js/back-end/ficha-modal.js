jQuery(document).ready(function() {
    
    var t = $('#panel-token-seccion').attr('data-token-panel');
    var s = $('#panel-token-seccion').attr('data-seccion-completa');
    
    $('.boton-ficha-modal').click(function(){

        var e = $(this).attr('data-id');
        var tipo = $(this).attr('data-tipo');
        
        $('#ventana-modal-ajax .modal-title').html('&nbsp;');
        $('#ventana-modal-ajax .modal-body').html('<p><i class="fa fa-spinner fa-spin"></i> Cargando datos...</p>');

        $.ajax({
        type: "GET",
        url: s + '?panel-token=' + t,
        data: {PeticionAjax: 'ficha-modal', e:e, tipo:tipo},
        dataType: 'json'
        }).done(function(datos) {
            
            $('#ventana-modal-ajax .modal-title').html(datos.titulo);
            $('#ventana-modal-ajax .modal-body').html(datos.contenido);

            $('.eX-editable').editable({
                params: {PeticionAjax: 'campoEdicion'},
                url: s + '?panel-token=' + t,
                success: function(respuesta, valor) {
                    var obj = jQuery.parseJSON(respuesta);
                    
                    if(obj.campo === 'habilitado' && obj.valor === 'si'){
                        $('.x-editable-' + obj.campo).removeClass('usuario-no-habilitado');
                        $('.x-editable-' + obj.campo).addClass('usuario-habilitado');
                        $('.boton-enviar-correo').removeClass('oculto');
                    }else if(obj.campo === 'habilitado' && obj.valor === 'no'){
                        $('.x-editable-' + obj.campo).removeClass('usuario-habilitado');
                        $('.x-editable-' + obj.campo).addClass('usuario-no-habilitado');
                        $('.boton-enviar-correo').addClass('oculto');
                    }                    
                }

            });
        });
    });
    
    $('.boton-enviar-correo').live('click',function(){
        
        var i = $(this).attr('data-id');
        
        $(this).fadeOut('slow');
        $('#ajax-cubre-2').fadeIn('slow');
        
        $.ajax({
            type: "GET",
            url: s + '?panel-token=' + t,
            data: {PeticionAjax: 'usuario-enviar-correo', i:i},
            dataType: 'json'
        }).done(function(datos) {
            
            $('#ajax-cubre-2').fadeOut('slow');
            $('.boton-crear-usuario').removeAttr('disabled');
            
            if(datos.error){
                $('#ajax-estado').addClass('alert alert-danger');
                $('#ajax-estado').html(datos.mensaje);
                $('#ajax-estado').fadeIn('slow');
            }else{
                $('.boton-enviar-correo').addClass('oculto');
                $('#ajax-estado').removeClass('flotado');
                $('#ajax-estado').removeClass('alert-danger');
                $('#ajax-estado').addClass('alert-success');
                $('#ajax-estado').html(datos.mensaje);
                $('#ajax-estado').fadeIn('slow');
            }
            
        });
        
        
        return false;
    });
    
    $('#ajax-correo').live('focus',function(){
        $('#ajax-estado').fadeOut('slow');
    });
    
    $('.boton-crear-usuario').live('click',function(){
        
        var c = $('#ajax-correo').val();
        var n = $('#ajax-nick').val();
        var i = $(this).attr('data-id');
        
        $('#ajax-cubre').fadeIn('slow');
        $(this).attr('disabled','disabled');
        
        if(!correoValido(c) || c === ''){
            $('#ajax-estado').addClass('alert alert-danger');
            $('#ajax-estado').html('El correo ingresado no es válido');
            $('#ajax-estado').fadeIn('slow');
        }
        
        $.ajax({
            type: "GET",
            url: s + '?panel-token=' + t,
            data: {PeticionAjax: 'usuarioCrear', c:c, n:n, i:i},
            dataType: 'json'
        }).done(function(datos) {
            
            $('#ajax-cubre').fadeOut('slow');
            $('.boton-crear-usuario').removeAttr('disabled');
            
            if(datos.error){
                $('#ajax-estado').addClass('alert alert-danger');
                $('#ajax-estado').html(datos.mensaje);
                $('#ajax-estado').fadeIn('slow');
            }else{
                $('#frCrearUsuario').slideToggle();
                $('#ajax-estado').removeClass('flotado');
                $('#ajax-estado').removeClass('alert-danger');
                $('#ajax-estado').addClass('alert-success');
                $('#ajax-estado').html(datos.mensaje);
                $('#ajax-estado').fadeIn('slow');
            }
            
        });
        
        return false;
    });
    
});