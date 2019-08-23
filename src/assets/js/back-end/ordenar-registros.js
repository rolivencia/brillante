jQuery(document).ready(function() {

    var s = $('#s').val();
    var t = $('#t').val();
    
    $("#ordenar-registros").sortable({

	}).disableSelection();
    

    $('#ordenar-registros').live('sortstart',function(event,ui){
        
        
    });
    
    $('#ordenar-registros' ).bind('sortstop',function(event,ui){
        
    });
       
   
    $( "#ordenar-registros" ).live( "sortupdate", function(event, ui) {
        
        var lista = $(this).sortable('toArray');
        
        cC = $('#cC').val();
        
        $.ajax({
            type: "POST",
            url: s + '?panel-token=' + t,
            data: {PeticionAjax: 'ordenarRegistros', lista: lista, cC: cC}
            }).done(function(datos) {
        });
    });   

});