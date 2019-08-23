jQuery(document).ready(function() {
        
    var ubicacion = [];
    
    $('.boton-relacional').click(function(){
        
        var v = parseInt($(this).attr('v'));
        var c = $('#' + $(this).attr('c'));

        if(c.val() == ';'){
            ubicacion = [];
            c.attr('e','inicial');
            $('#banner-medidas').fadeOut('slow');
            $('#banner-medidas').html('');
            $('#banner-campo-medidas').val();
        }
        
        
        /*if(c.val().indexOf(v) < 0){
            return false;
        }*/
        
        var info = $(this).html().split('|',1);
        info[0] = info[0].trim();
        var medidas = info[0].split('x');
        
        medidas[0] = medidas[0].trim();
        medidas[1] = medidas[1].trim();
        
        if(ubicacion[0] == undefined){
            
            ubicacion[0] = medidas[0];
            ubicacion[1] = medidas[1];
            $('#banner-medidas').html(ubicacion[0] + ' x ' + ubicacion[1] + ' px');
            $('#banner-campo-medidas').val('Medida Seleccionada' + ubicacion[0] + ';' + ubicacion[1]);
            $('#banner-medidas').fadeIn('slow');
            
            if(c.attr('e') == 'precargado'){
                auxiliar = c.val();
                auxiliar = auxiliar.split(';',2);
                info = $('#boton-checkbox-relacional-' + auxiliar[1]).html().split('|',1);
                info[0] = info[0].trim();
                var auxiliar2 = info[0].split('x');
                
                ubicacion[0] = auxiliar2[0].trim();
                ubicacion[1] = auxiliar2[1].trim();
                
                $('#banner-medidas').html(ubicacion[0] + ' x ' + ubicacion[1] + ' px');
                $('#banner-campo-medidas').val('Medida Seleccionada' + ubicacion[0] + ';' + ubicacion[1]);
                $('#banner-medidas').fadeIn('slow');
            }
        }
        
        if(ubicacion[0] != medidas[0] || ubicacion[1] != medidas[1]){
            
            $(this).removeClass('btn-primary');
            $(this).addClass('btn-default');
            c.val(c.val().replace(';' + v + ';',';'));

            alert('Operación no permitida. Está seleccionando ubicaciones de distintas medidas.');
        }
        
        return false;
    });
    
    
    
    var comprobarMedidas = function(){
        
        auxiliar = $('#checkboxRelacional_idUbicacion').val();
        auxiliar = auxiliar.split(';',2);
        if(auxiliar[0] == ''){
            return false;
        }
        var info = $('#boton-checkbox-relacional-' + auxiliar[1]).html().split('|',1);
        info[0] = info[0].trim();
        var auxiliar2 = info[0].split('x');
        
        ubicacion[0] = auxiliar2[0].trim();
        ubicacion[1] = auxiliar2[1].trim();
                
        $('#banner-medidas').html('Medida Seleccionada' +ubicacion[0] + ' x ' + ubicacion[1] + ' px');
        $('#banner-campo-medidas').val(ubicacion[0] + ';' + ubicacion[1]);
        $('#banner-medidas').fadeIn('slow');
    };
    
    if($('#formulario-alta').length > 0){
        comprobarMedidas();
    }    
    
});