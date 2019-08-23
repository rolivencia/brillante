jQuery(document).ready(function() {
    var i = $('#i').val();
    var s = $('#s').val();
    var t = $('#t').val();
    var activo = '';
    
    $(".ul-imagenes").sortable({
            handler: ".mover",
			items: "li:not(.no_mover)"
	});/*.disableSelection();*/
    
    /*$('.ul-imagenes li').live('mouseover',function(){
        
    });*/
    
    $('.ul-imagenes').live('sortstart',function(event,ui){
        
        $('li#' + ui.item.attr('id') + ' .cargador-temporal').css('display','block');
        /*if(activo != ''){
            id_auxiliar = activo.replace('editar-texto-imagen-','');
            $('#' + id_auxiliar + ' .cargador-temporal').css('display','block');
        }*/
    });
    
    $('.ul-imagenes' ).bind('sortstop',function(event,ui){
        $('li#' + ui.item.attr('id') + ' .cargador-temporal').fadeOut('slow');
    });
       
    //$( ".ul-imagenes").disableSelection();
    
    
    $('.campo-editar-texto-imagen').live('click',function(){
       $(this).focus();
       $(this).css('opacity','1');
       activo = $(this).attr('id');       
    });
    
    $('.campo-editar-texto-imagen').live('blur',function(){
        $(this).css('opacity','0.6');
    });
     
    $('.campo-editar-texto-imagen').live('change',function(){
        activo = '';       
        
        var tI = $(this).val();
        var iI = $(this).attr('id').replace('editar-texto-imagen-','');
        var tN = $(this).attr('data-tabla');
        
        $('li#' + iI + ' .cargador-temporal').css('display','block');
        
        $.ajax({
            type: "GET",
            url: s + '?panel-token=' + t,
            data: {PeticionAjax: 'cargarTextoImagen', tI: tI, iI: iI, tN: tN}
            }).done(function(msg) {
                $('li#' + iI + ' .cargador-temporal').fadeOut('slow');
        });
       
    });
    
    $("body").mouseup(function(e){
        if(e.target.id !== activo && activo != ''){
            $('#' + activo).blur();
        }
    });

    
    $('.ul-imagenes .editar').live('click',function(){
       var id = $(this).attr('id').replace('editar-','');
       $('li#' + id).find('.campo-editar-texto-imagen').focus();
    });
    
    $( ".ul-imagenes" ).live( "sortupdate", function(event, ui) {
        
        var lista = $(this).sortable('toArray');
        
        /*nt = $('#nt').val();
        it = $('#it').val();*/
        
        nt = $(this).attr('data-tabla');
        it = $(this).attr('data-idTabla');
        
        $.ajax({
            type: "POST",
            url: s + '?panel-token=' + t,
            data: {PeticionAjax: 'ordenarImagenes', lista: lista, i:i, nt:nt, it:it}
            }).done(function(msg) {
                $('li#' + ui.item.attr('id') + ' .cargador-temporal').fadeOut('slow');
                // $('ul-imagenes li:first').append('<li>' + msg + '</li>');
        });
    });
    
    $('.ul-imagenes li a.borrar').live('click',function(){
        var eIi = $(this).attr('data-id');
        var nt = $(this).attr('data-tabla');
        var it = $(this).attr('data-idTabla');        
        var c = $(this).attr('data-concepto');
  
        $('#concepto-eliminacion').html(c);
        
        $('#boton-borrar-enlace-interno').attr('data-id',eIi);
        $('#boton-borrar-enlace-interno').attr('data-tabla',nt);
        $('#boton-borrar-enlace-interno').attr('data-idTabla',it);
        
        $('#ventana-modal-ajax .modal-title').html('Borrar Registro');
        $('#ventana-modal-ajax .modal-body').html($('#ventana-borrar-registro').html());
        
        
        return false;
    });
    
    $('#boton-borrar-enlace-interno').live('click',function(){
        
        if($(this).attr('data-ajax') === 'no'){
            return true;
        }
        
        var eIi = $(this).attr('data-id');
        var nt = $(this).attr('data-tabla');
        var it = $(this).attr('data-idTabla');
        
        $('#orden' + nt).val(parseInt($('#orden' + nt).val()) - 1);
        $('.ul-imagenes li#' + eIi).fadeOut('2000');
        $('li#' + eIi + ' .cargador-temporal').css('display','block');
        $('#ventana-modal-ajax').modal('hide');
        
        $.ajax({
            type: "GET",
            url: s + '?panel-token=' + t,
            data: {PeticionAjax: 'borrarImagen', eIi:eIi, i:i, nt:nt, it:it}
            }).done(function(msg) {
        });

        return false;
        
    });
    
    $('.ul-imagenes li a.cortar').live('click',function(){
        window.location = $(this).attr('href');
        return true;
    });
    
    $('.ul-imagenes li').live('mouseover',function(){
        var id = $(this).attr('id');
        
        $('#borrar-' + id).css('visibility','visible');
        $('#editar-' + id).css('visibility','visible');
        $('#cortar-' + id).css('visibility','visible');
    });
    
    $('.ul-imagenes li').live('mouseout',function(){
        var id = $(this).attr('id');
        $('#borrar-' + id).css('visibility','hidden');
        $('#editar-' + id).css('visibility','hidden');
        $('#cortar-' + id).css('visibility','hidden');
    });
});