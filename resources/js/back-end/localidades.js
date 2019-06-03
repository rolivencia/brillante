jQuery(document).ready(function(){
        
        
    $('#idPais').live('change',function(){
        
        var t = $('#panel-token-seccion').attr('data-token-panel');
        var s = $('#panel-token-seccion').attr('data-seccion-completa');
        
        var v = $(this).val();
        
        if(v <= 0){
            $(' #idProvincia option').remove();
            $(' #idProvincia').attr('disabled','disabled');
        
            return false;
        }
        
        $(' #idProvinciaoption').remove();
        $(' #idProvincia').attr('disabled','disabled');
        $('.envuelveObjetoIdLocalidad .cAutocompletar').fadeIn('slow');
        
        $.ajax({
        type: "GET",
        url: s + '?panel-token=' + t,
        data: {PeticionAjax: 'provincias', v:v},
        dataType: 'json'
        }).done(function(datos) {
            
            $('.envuelveObjetoIdLocalidad .cAutocompletar').fadeOut('slow');
            $(' #idProvincia').removeAttr('disabled');
            
            $('#idProvincia').empty();
            $('#idProvincia').append($('<option>', {
                value: '',
                text: ' - Seleccione una opción -'
            }));
                
            $.each( datos.provincias, function(idProvincia){

                $(' #idProvincia').append($('<option>', {
                    value: datos.provincias[idProvincia]['idProvincia'],
                    text: datos.provincias[idProvincia]['nombre']
                }));
            });     
            
        });        
    });    
        
    $('#idProvincia').live('change',function(){
        
        var t = $('#panel-token-seccion').attr('data-token-panel');
        var s = $('#panel-token-seccion').attr('data-seccion-completa');
        
        var v = $(this).val();
        
        if(v <= 0){
            $(' #idLocalidad option').remove();
            $(' #idLocalidad').attr('disabled','disabled');
        
            return false;
        }
        
        $(' #idLocalidad option').remove();
        $(' #idLocalidad').attr('disabled','disabled');
       
        $('#idLocalidad').empty();
                        
        $.ajax({
        type: "GET",
        url: s + '?panel-token=' + t,
        data: {PeticionAjax: 'localidades', v:v},
        dataType: 'json'
        }).done(function(datos) {
            
            $('#idLocalidad').removeAttr('disabled');
        
            $('#idLocalidad').append($('<option>', {
                value: '',
                text: ' - Seleccione una opción -'
            }));
                
            $.each( datos.localidades, function(idLocalidad){
                
                $('#idLocalidad').append($('<option>', {
                    value: datos.localidades[idLocalidad]['idLocalidad'],
                    text: datos.localidades[idLocalidad]['nombre']
                }));
                
            }); 
            
            $('#idLocalidad').attr('data-live-search','true');
            $('#idLocalidad').attr('data-size','8');
            $('#idLocalidad').selectpicker('render');
            $('#idLocalidad').selectpicker('refresh');
                        
        }); 
        
    });
    
    $('#idLocalidad').attr('data-size','10');
    $('#idLocalidad').attr('data-live-search','true');
    $('#idLocalidad').attr('data-style','btn-white');
    $('#idLocalidad').selectpicker('render');
    
});
