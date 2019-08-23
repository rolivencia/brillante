jQuery(document).ready(function() {

    t = $('#panel-token-seccion').attr('data-token-panel');
    s = $('#panel-token-seccion').attr('data-seccion-cargar');
    p = $('#unidades-idPropiedad').val();
                    
    $('.boton-nota-guardar').live('click',function(){

        var i = $(this).attr('data-idCarrito');
        var n = $('#nota').val();
        var ti = '';
        
        if(n === ''){
            alert('El texto no puede estar vacio');
            return false;
        }
        
        $(this).css('display','none');
        $('.ajax-cargando').fadeIn();
        
        if($('#pedido-enviado').attr('checked') === 'checked'){
            ti = 'envio';
        }        
        
        if($('#pedido-retirado').attr('checked') === 'checked'){
            ti = 'retiro';
        }
        
        $.ajax({
           type: "GET",
           url: '?panel-token=' + t,
           data: {PeticionAjax: 'f', f: 'nota-guardar', i:i, n:n, ti:ti},
           dataType: 'json'
           }).done(function(datos) {
               $('#nota').val('');
               $('.ajax-cargando').css('display','none');
               $('.boton-nota-guardar').fadeIn();
               $('.contenedor-notas').html(datos.html);
               $('#pedido-enviado').removeAttr('checked');
               $('#pedido-retirado').removeAttr('checked');               
       });
       

        return false;
    });

    $('#pedido-enviado').click(function(){
        f = $.datepicker.formatDate('dd/mm/yy', new Date());
        
        $('#pedido-retirado').removeAttr('checked');
        $('#nota').val(f + ' - Producto enviado');
        
        if($('#pedido-enviado').attr('checked') !== 'checked'){
            $('#nota').val('');
        }
       
    });
    
    $('#pedido-retirado').click(function(){
        f = $.datepicker.formatDate('dd/mm/yy', new Date());
        
        $('#pedido-enviado').removeAttr('checked');
        $('#nota').val(f + ' - Producto retirado');
        
        if($('#pedido-retirado').attr('checked') !== 'checked'){
            $('#nota').val('');
        }
        
    });

    $('.boton-nota-borrar').live('click',function(){
        var i = $(this).attr('data-idNota');        
        $('.boton-nota-borrar-2').attr('data-idNota',i);
    });
    
    $('.boton-nota-borrar-2').live('click',function(){

        var i = $(this).attr('data-idNota');        
        $('#ventana-modal-ajax').modal('hide');
        $('#nota-' + i).slideToggle();
        
        $.ajax({
           type: "GET",
           url: '?panel-token=' + t,
           data: {PeticionAjax: 'f', f: 'nota-borrar', i:i},
           dataType: 'json'
           }).done(function(){});
       

        return false;
    });

   
});