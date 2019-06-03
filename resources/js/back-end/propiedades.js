jQuery(document).ready(function() {
    
    $('.eAccionPropiedad, #divAlta .pBloque h4, #divEditar .pBloque h4').click(function(){        
        /*id = $(this).attr('id').replace('accion-','');  
        //$('#' + id).slideToggle('slow');
        
        if($(this).hasClass('activado')){
            $(this).removeClass('activado');
            $(this).addClass('desactivado');
        }else{
            $(this).removeClass('desactivado');
            $(this).addClass('activado');
        }*/
        return false;
    });
    
    $('#c-1').css('display','none');
    $('#c-59').css('display','none');
    
    $('.dormitorios').keyup(function(){
        
        $('.monoambiente').removeAttr('checked');
        $('.1Dormitorio').removeAttr('checked');
        $('.2Dormitorios').removeAttr('checked');
        $('.3Dormitorios').removeAttr('checked');
        $('.4Dormitorios').removeAttr('checked');
        $('.5DormitoriosMas').removeAttr('checked');
        cantidad = parseInt($(this).val());
        console.log(cantidad);
        switch(cantidad){
            case '':
            case 0:
                $('.monoambiente').attr('checked','checked');
            break;
            case 1:
                $('.1Dormitorio').attr('checked','checked');
            break;
            case 2:
                $('.2Dormitorios').attr('checked','checked');
            break;
            case 3:
                $('.3Dormitorios').attr('checked','checked');
            break;
            case 4:
                $('.4Dormitorios').attr('checked','checked');
            break;
            case 5:
                $('.5DormitoriosMas').attr('checked','checked');
            break;
        }
        
        if(cantidad > 5){
            $('.5DormitoriosMas').attr('checked','checked');
        }
        
    });
    
    var selector = $('#idBarrio')[0];
    var localidad = $(selector.options[selector.selectedIndex]).closest('optgroup').prop('label');
        
    /*$('#numero').blur(function(){
        var selector = $('#idBarrio')[0];
        var localidad = $(selector.options[selector.selectedIndex]).closest('optgroup').prop('label');
    
        if(localidad != undefined && $('#calle').val() != ''){
            codeAddress($('#calle').val() + ' ' + $('#numero').val() + ', ' + localidad);
        }
        
        if(localidad == undefined){
            //alert('Debe seleccionar el barrio de la propiedad');
        }
    });
    */
    $('.boton-posicionar-mapa').click(function(){
        
        var selector = $('#idLocalidad')[0];
        var localidad = $(selector.options[selector.selectedIndex]).prop('label');
    
        if(localidad !== undefined && $('#calle').val() !== ''){
            codeAddress($('#calle').val() + ' ' + $('#numero').val() + ', ' + localidad);
        }
        
        $('html,body').animate({scrollTop: $('.form-group-piso').offset().top},'slow');
        
        return false;
    });
    
   /* $('#idBarrio').change(function(){
       var localidad = $(this.options[this.selectedIndex]).closest('optgroup').prop('label');
       codeAddress($('#calle').val() + ' ' + $('#numero').val() + ', ' + localidad);
    });*/
    
    // $('#bMapaGoogle').slideToggle();
    
    // configuration
    var myZoom = 12;
    var myMarkerIsDraggable = true;
    var myCoordsLenght = 6;
    var defaultLat = -32.950631;
    var defaultLng = -60.644903;

    // creates the map
    // zooms
    // centers the map
    // sets the map’s type
    var locacion = new google.maps.LatLng(defaultLat, defaultLng);
    
    var map = new google.maps.Map(document.getElementById('google-mapa'), {
        zoom: myZoom,
        center: locacion,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    
    var heading = 1;
    var pitch = 1;
    
    if($('#streetViewHeading').val() != ''){
        heading = $('#streetViewHeading').val() * 1;
    }
    
    if($('#streetViewPitch').val() != ''){
        pitch = $('#streetViewPitch').val() * 1;
    }
    
    
    var panoramaOptions = {
      position: locacion,
      pov: {
        heading: heading,
        pitch: pitch
      },
      panControl: false,
      zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE,
                position: google.maps.ControlPosition.LEFT_CENTER
            }
    };
    
    var panorama = new google.maps.StreetViewPanorama(document.getElementById('street-view'), panoramaOptions);
    
    map.setStreetView(panorama);
  
    google.maps.event.addListener(panorama, 'position_changed', function() {
        var positionCell = document.getElementById('streetViewPosicion');
       positionCell.value = panorama.getPosition();
    });

    google.maps.event.addListener(panorama, 'pov_changed', function() {
        var headingCell = document.getElementById('streetViewHeading');
        var pitchCell = document.getElementById('streetViewPitch');
        headingCell.value= panorama.getPov().heading;
        pitchCell.value = panorama.getPov().pitch;
    });


    // creates a draggable marker to the given coords    
    var myMarker = new google.maps.Marker({
        position: new google.maps.LatLng(defaultLat, defaultLng),
        draggable: myMarkerIsDraggable
    });
    
    if($('#latitud').val() != '' && $('#longitud').val() != ''){
        myMarker.setPosition(new google.maps.LatLng($('#latitud').val(),$('#longitud').val()));
    }

    // adds a listener to the marker
    // gets the coords when drag event ends
    // then updates the input with the new coords
    google.maps.event.addListener(myMarker, 'dragend', function(evt){
        document.getElementById('latitud').value = evt.latLng.lat().toFixed(myCoordsLenght);
        document.getElementById('longitud').value = evt.latLng.lng().toFixed(myCoordsLenght);
    });

    // centers the map on markers coords
    map.setCenter(myMarker.position);
    panorama.setPosition(myMarker.position);

    // adds the marker on the map
    myMarker.setMap(map);

    function codeAddress(address) {
        geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
                map.setCenter(results[0].geometry.location);
                /*var myMarker = new google.maps.Marker({
                    map: map, 
                    position: results[0].geometry.location,
                    draggable: myMarkerIsDraggable
                });*/
                myMarker.setPosition(results[0].geometry.location);
                panorama.setPosition(results[0].geometry.location);
                document.getElementById('latitud').value = results[0].geometry.location.lat();
                document.getElementById('longitud').value = results[0].geometry.location.lng();
            }else{
               // alert("Hubo problemas al cargar la dirección, status: " + status);
            }
          });
      }
      
    google.maps.event.addListener(map, "click", function(event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        document.getElementById('latitud').value = lat;
        document.getElementById('longitud').value = lng;
        myMarker.setPosition(new google.maps.LatLng(lat,lng));
        panorama.setPosition(new google.maps.LatLng(lat,lng));

    });
         
  
});