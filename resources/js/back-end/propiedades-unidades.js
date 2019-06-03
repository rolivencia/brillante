
jQuery(document).ready(function() {
   
   // Desactivamos el editor
   /*CKEDITOR.inline = false;*/
   
    t = $('#panel-token-seccion').attr('data-token-panel');
    s = $('#panel-token-seccion').attr('data-seccion-cargar');
    p = $('#unidades-idPropiedad').val();
    
    $('.divCheckboxRelacional a').click(function(){
        var a = $(this).attr('class');
        var v = $(this).attr('v');
        
        if(a === 'activado' && v != 17){            
            
            $('#unidad-tipo-crear').val(v);
            $('#unidad-tipo-crear').change();
            $('.boton-unidad-crear').trigger('click');
        }
        
    });
    
    $('#unidad-tipo-crear').live('change',function(){
        var tipo = $('#unidad-tipo-crear option:selected').val();
        
        $('.unidad-base').css('display','none');
        $('.boton-unidad-crear').css('display','none');
        
        if(tipo > 0){
            $('.unidad-tipo-' + tipo).css('display','block');
            $('.boton-unidad-crear').css('display','block');
        }
    });
            
    $('.boton-unidad-crear, .boton-unidad-guardar').live('click',function(){
        
        var ti = $('#unidad-tipo-crear').val();
        var no = $('#unidad-nombre-crear').val();
        var dor = $('#unidad-dormitorios-crear').val();
        var pi = $('#unidad-piso-crear').val();
        var su = $('#unidad-superficie-crear').val();
        var suH = $('#unidad-superficie-hasta-crear').val();
        var tr = $('#unidad-terreno-crear').val();
        var trH = $('#unidad-terreno-hasta-crear').val();
        var pa = $('#unidad-patio-crear').val();
        var paH = $('#unidad-patio-hasta-crear').val();
        var te = $('#unidad-terraza-crear').val();
        var teH = $('#unidad-terraza-hasta-crear').val();
        var fe = $('#unidad-frente-crear').val();
        var feH = $('#unidad-frente-hasta-crear').val();
        var fo = $('#unidad-fondo-crear').val();
        var foH = $('#unidad-fondo-hasta-crear').val();
        var ba = $('#unidad-banios-crear').val();
        var mo = $('#unidad-moneda-crear').val();
        var pr = $('#unidad-precio-crear').val();
        var prH = $('#unidad-precio-hasta-crear').val();
        var an = $('#unidad-anticipo-crear').val();
        var cu = $('#unidad-cuotas-crear').val();        
        
        var i = $(this).attr('data-idUnidad');
               
        $('.unidades-ajax').fadeIn('slow');
        
        $.ajax({
            type: "GET",
            url: s + '?panel-token=' + t,
            data: {PeticionAjax: 'f', f: 'unidades', p:p, i:i, ti:ti, no:no, dor:dor, pi:pi, su:su, suH:suH, tr:tr, trH:trH, pa:pa, paH:paH, te:te, teH:teH, fe:fe, feH:feH, fo:fo, foH:foH, ba:ba, mo:mo, pr:pr, prH:prH, an:an, cu:cu},
            dataType: 'json'
            }).done(function(datos) {
                $('.unidades-ajax').fadeOut('slow');
                $('#div-unidades').html(datos.unidades);
                $(".unidad-precio input").number(true, 2);    
                ordernar_ul();
        }); 
        
        return false;
    });
    
     $(".unidad-precio input").number(true, 0);
    
    $('.ul-unidades li input').live('keypress', function(event) {
        
        if(event.which === 13) {
            event.preventDefault();
            
            $(this).trigger({
                type: 'keypress',
                which: 9
            });
        }        
        
   });
    
    $('.editable').live('change',function(){
        
        var v = $(this).val();                
        var i = $(this).attr('data-idUnidad');
        var c = $(this).attr('data-c');
        
        var a = 'u';
                            
        $.ajax({
            type: "GET",
            url: s + '?panel-token=' + t,
            data: {PeticionAjax: 'f', f:'unidades-editar', p:p, i:i, a:a, v:v, c:c},
            dataType: 'json'
            }).done(function(datos) {
                
                $('#div-unidades').html(datos.unidades);
                
        }); 
        
        return false;
    });


    $(".unidad-precio input").number(true, 0);
    
    $('.boton-unidad-borrar').live('click',function(){

        var i = $(this).attr('data-idUnidad');
                
        if(confirm('¿Está seguro que desea eliminar la unidad?')){
            
            $('#li-unidades-' + i).slideUp('slow');
            $('#li-unidades-' + i).html('');
            
            $.ajax({
               type: "GET",
               url: s + '?panel-token=' + t,
               data: {PeticionAjax: 'f', f: 'unidades-borrar', i:i},
               dataType: 'json'
               }).done(function(msg) {

           });
        }

        return false;
    });

    
    $('.mover').live('click',function(){
       return false; 
    });
    
    var ordernar_ul = function(){
        
        $(function() {
            $('#ul-unidades').sortable({
            });
        });

    };
    
    ordernar_ul();
    
    $('#ul-unidades').live('sortupdate', function(event, ui) {
        
        var l = $(this).sortable('toArray');
                
        $.ajax({
            type: "GET",
            url: s + '?panel-token=' + t,
            data: {PeticionAjax: 'f', f: 'unidades-ordenar', l:l}
            }).done(function(datos) {
        });
    });
    
    $('.divCheckboxRelacional a').click(function(){
        var a = 'activar';
        
        if($(this).hasClass('desactivado')){
            a = 'desactivar';
        }
        
        if(a === 'activar'){
            $('#funcionalidad-unidades').modal('show');
        }
        
    });
    
    $('#ul-unidades input[type=text]').live('focus',function(){
        var id = $(this).attr('data-idUnidad');
        $('#ul-unidades input[data-idUnidad=' + id + ']').css('background','#fff');
    });
   
    $('#fAlta').submit(function(){
        var e = true;
        var id = '';
        var aux = '';
        
        $('#ul-unidades input[type=text]').each(function(){
            if(aux != $(this).attr('data-idUnidad')){
                aux = $(this).attr('data-idUnidad');
                e = false;
            }
            
            if(id != ''){
                $('#ul-unidades input[data-idUnidad=' + id + ']').css('background','#fff');
            }
            
            if($(this).val() !== ''){    
                e = true;
                id = $(this).attr('data-idUnidad');
            }
            
            $(this).css('background','#ffb1b1');
            
        });
        
        if(e === false){
            alert('Hay registros relacionados con los "Tipos Adicionales" que no tienen datos. Complete los datos antes de seguir.');
        }
        
        return e;
    });
   
});