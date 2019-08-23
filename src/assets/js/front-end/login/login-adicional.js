jQuery(document).ready(function(){
    
    $('#formulario-usuario-editar, #formulario-recuperar-clave').submit(function(){
        
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
