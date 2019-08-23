jQuery(document).ready(function(){
        
    $('#idProvincia').change(function(){
        
        v = $(this).val();
        
        if(v <= 0){
            $(' #idLocalidad option').remove();
            $(' #idLocalidad').attr('disabled','disabled');
        
            return false;
        }
        
        $(' #idLocalidad option').remove();
        $(' #idLocalidad').attr('disabled','disabled');
        $('.ajax-cargar-localidades').fadeIn('slow');
        
        $.ajax({
        type: "GET",
        url: '/',
        data: {PeticionAjaxPublico: 'localidades', v:v},
        dataType: 'json'
        }).done(function(datos) {
            
            $('.ajax-cargar-localidades').fadeOut('slow');
            $(' #idLocalidad').removeAttr('disabled');
            
            $(' #idLocalidad').append($('<option>', {
                value: '',
                text: 'Seleccionar'
            }));
                
            $.each( datos.localidades, function(idLocalidad){
                $(' #idLocalidad').append($('<option>', {
                    value: datos.localidades[idLocalidad]['idLocalidad'],
                    text: datos.localidades[idLocalidad]['nombre']
                }));
            }); 
            
            
        });        
    });
    
    $('.form-control, .campoSelect').focus(function(){
        $(this).parent().parent().find('.textoErrorFormulario').fadeOut('slow');
        
    });
    
    $('.bEnviar').click(function(){
        $(this).css('display','none');        
        $('.envuelveObjetoSubmit').prepend('<i class="fa fa-spinner fa-spin"></i> Enviado datos...');
    });
    
    $('#fRegistroUsuario').submit(function(){
        var c = $('#clave').val();
        var c2 = $('#claveRepetir').val();
        
        $('#clave').val('');
        $('#claveRepetir').val('');
        
        if(c != '' && c2 != ''){
            $('#clave_hidden').val(hex_sha1(c));
            $('#claveRepetir_hidden').val(hex_sha1(c2));
        }    
        
    });
    
});
