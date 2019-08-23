jQuery(document).ready(function() {

    $('#boton-generar-token').click(function(){
        generar = true;
        url = location;
        if (/editar/i.test(url)){
            if(!confirm('Está seguro que desea generar nuevamente el Token. Tendrá que modificar el cron en el servidor.')){
            generar = false;
            }
        }
                
        if(generar){
            var fecha = new Date();
            token = fecha.getYear() + '-' + fecha.getMonth() + '-' + fecha.getDay() + '-' + fecha.getHours() + '-' + fecha.getMinutes() + '-' + fecha.getSeconds();
            token = hex_sha1(token);
            $('#token').val(token);
        }
        return false;
    });
    
    
    $('#nombre').keyup(function(){
        $('#archivo').val($(this).val());
    });
    
    $('#archivo').keyup(function(){
        $('#nombre').val($(this).val());
    });
    
});