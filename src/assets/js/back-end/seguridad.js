jQuery(document).ready(function() {
    
    var suma = 0;
    
    
    $('.boton-marcar-todos').click(function(){
        suma = $('#contenedor-usuarios input[type=checkbox]').length;
        $('#contenedor-usuarios input[type=checkbox]').prop('checked',true);    
    });
        
    $('.boton-desmarcar-todos').click(function(){
        suma = 0;
        $('#contenedor-usuarios input[type=checkbox]').prop('checked',false); 
    });
    
    $('.boton-procesar-seguridad').click(function(){
        
        $('#formulario-plantilla').submit();
        return false;
        
    });
    
});