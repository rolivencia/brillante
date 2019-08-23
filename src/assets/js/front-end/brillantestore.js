jQuery(document).ready(function() {
  $("body").magnificPopup({
    delegate: "a[rel=magnific-popup]",
    type: "image",
    gallery: {
      enabled: true
    }
  });

  var clic = "";
  $(".etiqueta-forma-pago").click(function() {
    $("#formaPago").val($(this).attr("data-id"));

    if (clic != $(this).attr("data-id")) {
      clic = $(this).attr("data-id");

      $(".formas-de-pago ul ul").slideUp();

      if (
        !$(this)
          .next()
          .is(":visible")
      ) {
        $(this)
          .next()
          .slideDown();
      }
    }
  });

  $(".boton-cambiar-clave").click(function() {
    $(".campos-clave").slideDown();

    return false;
  });

  $(".boton-cerrar").click(function() {
    var d = $(this).attr("data-cerrar");
    $("." + d).fadeOut();

    return false;
  });

  $("#usuario-login").submit(function() {
    var co = $("#correo-ajax").val();
    var cl = hex_sha1($("#clave-ajax").val());
    $("#clave").val("");

    if (!correoValido(co)) {
      if ($(".mensaje-error").css("display") === "none") {
        $(".mensaje-error").html("Correo no válido");
        $(".mensaje-error").slideToggle();
      }

      return false;
    }

    if (co === "" || cl === "da39a3ee5e6b4b0d3255bfef95601890afd80709") {
      if ($(".mensaje-error").css("display") === "none") {
        $(".mensaje-error").slideToggle();
      }

      return false;
    }

    $(".boton-login").css("display", "none");
    $(".ajax-login").fadeIn("slow");
    $(".mensaje-error").css("display", "none");

    $.ajax({
      type: "GET",
      url: "/",
      data: { PeticionAjaxPublico: "f", f: "usuario-login", co: co, cl: cl },
      dataType: "json"
    }).done(function(datos) {
      if (datos.error) {
        $(".mensaje-error").html(datos.error.mensaje);
        $(".mensaje-error").slideToggle();
        $(".ajax-login").css("display", "none");
        $(".boton-login").fadeIn("slow");

        return false;
      }

      location.reload();
    });

    return false;
  });

  $("#usuario-registro").submit(function() {
    var n = $.trim($("#reg-nombre").val());
    var a = $.trim($("#reg-apellido").val());
    var d = $.trim($("#reg-dni").val());
    var co = $.trim($("#reg-correo").val());
    var cl = hex_sha1($.trim($("#reg-clave").val()));
    $("#reg-clave").val("");

    if (!correoValido(co)) {
      if ($(".registro-mensaje-error").css("display") === "none") {
        $(".registro-mensaje-error").html("Correo no válido");
        $(".registro-mensaje-error").css("display", "block");
      }

      return false;
    }

    console.log(n);
    console.log(a);
    console.log(co);
    console.log(cl);

    if (
      n === "" ||
      a === "" ||
      co === "" ||
      cl === "da39a3ee5e6b4b0d3255bfef95601890afd80709"
    ) {
      if ($(".registro-mensaje-error").css("display") === "none") {
        $(".registro-mensaje-error").html("Todos los campos son obligatorios");
        $(".registro-mensaje-error").css("display", "block");
      }

      return false;
    }

    $(".boton-crear-cuenta").css("display", "none");
    $(".ajax-login").fadeIn("slow");
    $(".registro-mensaje-error").css("display", "none");

    $.ajax({
      type: "GET",
      url: "/",
      data: {
        PeticionAjaxPublico: "f",
        f: "usuario-registro",
        n: n,
        a: a,
        d: d,
        co: co,
        cl: cl
      },
      dataType: "json"
    }).done(function(datos) {
      if (datos.error) {
        $(".registro-mensaje-error").html(datos.mensaje);
        $(".registro-mensaje-error").css("display", "block");
        $(".ajax-login").css("display", "none");
        $(".boton-crear-cuenta").css("display", "block");

        return false;
      }

      separador = "?";
      if (location.href.indexOf("?") >= 0) {
        separador = "&";
      }

      location.href = location.href + separador + "registro-ok";
    });

    return false;
  });

  var boton = "";
  var cerrado = true;

  $(".boton-envio-domicilio").click(function() {
    boton = 1;

    $(".h2-envio").slideDown();

    if (tp === "PL") {
      $(".mensaje-alerta-retiro-local").css("display", "none");
      $(".mensaje-alerta-envio-domicilio").css("display", "block");
      $("#myModal").modal("show");
      // $('#r_mercadopago').trigger('click');
      $("#r_pagotransferencia").trigger("click");
    }

    $("#tipoEnvio").val("ED");

    $(".boton-envio-domicilio").removeClass("boton-inactivo");
    $(".boton-retiro-local").removeClass("boton-inactivo");

    $(this).addClass("boton-activo");
    $(".boton-retiro-local").addClass("boton-inactivo");

    $(".h6-retiro-local").slideUp();
    $(".h6-envio-domicilio").slideDown();

    if (
      cerrado &&
      $("#form-carrito-datos-de-envio").css("display") === "none"
    ) {
      $("#form-carrito-datos-de-envio").slideToggle();
      cerrado = false;
    }

    return false;
  });

  $(".boton-retiro-local").click(function() {
    boton = 2;
    $(".h2-envio").slideUp();
    $("#tipoEnvio").val("RL");

    $(".boton-envio-domicilio").removeClass("boton-inactivo");
    $(".boton-retiro-local").removeClass("boton-inactivo");

    $(this).addClass("boton-activo");
    $(".boton-envio-domicilio").addClass("boton-inactivo");

    $(".h6-envio-domicilio").slideUp();
    $(".h6-retiro-local").slideDown();

    if (
      cerrado &&
      $("#form-carrito-datos-de-envio").css("display") === "none"
    ) {
      $("#form-carrito-datos-de-envio").slideToggle();
      cerrado = false;
    }

    return false;
  });

  $("#facturacion").click(function() {
    if ($(".direccion-factura").css("display") === "none") {
      $(".direccion-factura").fadeIn();
      $(".check-facturacion").css("opacity", "0.5");
    } else {
      $(".check-facturacion").css("opacity", "1");
      $("#direccion").val("");
      $("#nombre2").val("");
      $("#apellido2").val("");
      $("#provincia").val("");
      $("#ciudad").val("");
      $("#codigoPostal2").val("");
      $(".direccion-factura").fadeOut();
    }

    $(this).blur();
  });

  var tp = "MP";
  $("#r_mercadopago").click(function() {
    tp = "MP";
    // $('.h2-envio').slideDown();
  });

  $("#r_pagolocal").click(function() {
    tp = "PL";

    if ($("#tipoEnvio").val() == "ED") {
      $("#myModal").modal("show");
    }

    // $('.h2-envio').slideUp();
    $(".boton-retiro-local").trigger("click");
    $(".mensaje-alerta-envio-domicilio").css("display", "none");
    $(".mensaje-alerta-retiro-local").css("display", "block");
  });

  $("#r_pagotransferencia").click(function() {
    tp = "PT";
    // $('.h2-envio').slideDown();
  });

  $(".boton-enviar-compra").click(function() {
    $(".boton-enviar-formulario-datos-de-envio").trigger("click");

    return false;
  });

  /*$('.boton-cambiar-opcion').click(function(){
        
        
        $('.boton-envio-domicilio').attr('href','#');
        $('.boton-envio-domicilio').css('opacity','1');

        $('.boton-retiro-local').css('background-color','transparent');
        $('.boton-retiro-local').css('border-color','#fff');
        
        $(this).css('visibility','hidden');
        
        if(boton === 1){
            $('.contenedor-opciones-envio').slideDown();
            $('#form-carrito-datos-de-envio').slideToggle();
        }
        
        envioRetiro = false;
        
        return false; 
    });*/

  $(".boton-carrito-agregar, .boton-carrito-agregar-2").click(function() {
    var p = $(this).attr("data-idProducto");
    var c = 1;

    if ($("#producto-cantidad").val() > 0) {
      c = $("#producto-cantidad").val();
    }

    $("#ajax-" + p).fadeIn("slow");

    $.ajax({
      type: "GET",
      url: "/",
      data: { PeticionAjaxPublico: "f", f: "carrito", p: p, c: c, a: "a" },
      dataType: "json"
    }).done(function(datos) {
      $("#ajax-" + p).fadeOut();
      $(".dropdown-menu-shipping-cart").html(datos.productos);
      $(".carrito-cantidad").html(datos.carritoCantidad);

      $("#carrito-mensaje").modal("show");
    });

    return false;
  });

  $(".campo-carrito-cantidad").blur(function() {
    var i = $(this).attr("data-idProductoCarrito");
    var c = $(this).val();

    if ($("#producto-cantidad").val() > 0) {
      c = $("#producto-cantidad").val();
    }

    $("#ajax-" + i).fadeIn("slow");

    $.ajax({
      type: "GET",
      url: "/",
      data: { PeticionAjaxPublico: "f", f: "carrito", i: i, c: c, a: "m" },
      dataType: "json"
    }).done(function(datos) {
      $(".dropdown-menu-shipping-cart-total").html("$ " + datos.carritoTotal);
      $("#carrito-monto-total").html("$ " + datos.carritoTotal);
      $(".carrito-cantidad").html(datos.carritoCantidad);
      if (datos.carritoCantidad == 0) {
        $(".dropdown-menu-shipping-cart-checkout").fadeOut();
      }
    });

    return false;
  });

  $(".boton-carrito-quitar").on("click", function() {
    var i = $(this).attr("data-idProducto");

    $("#carrito-" + i).fadeOut();
    $("#carrito-2-" + i).fadeOut();

    $.ajax({
      type: "GET",
      url: "/",
      data: { PeticionAjaxPublico: "f", f: "carrito", i: i, c: 0, a: "q" },
      dataType: "json"
    }).done(function(datos) {
      $(".dropdown-menu-shipping-cart-total").html("$ " + datos.carritoTotal);
      $("#carrito-monto-total").html("$ " + datos.carritoTotal);
      $(".carrito-cantidad").html(datos.carritoCantidad);
      if (datos.carritoCantidad == 0) {
        $(".dropdown-menu-shipping-cart-checkout").fadeOut();
      }
    });

    return false;
  });

  $(".contenedor-producto")
    .on("mouseenter", function() {
      var i = $(this).attr("data-idProducto");
      $("#boton-carrito-agregar-" + i).css("display", "block");
    })
    .on("mouseleave", function() {
      var i = $(this).attr("data-idProducto");
      $("#boton-carrito-agregar-" + i).css("display", "none");
    });

  $(".boton-cambiar-imagen").click(function() {
    var i = $(this).attr("data-imagen");
    $("#imagen-principal").attr("src", i);

    return false;
  });

  var nav = $(".menu-navegacion");

  $(window).scroll(function() {
    if ($(this).scrollTop() > 250) {
      nav.addClass("f-nav");
      $("a.logo-chico").removeClass("logo-no-mostrar");
      //$('.menu-secciones').addClass('mostrar-submenu');
      $(".menu-navegacion-buscador").addClass("f-nav-2");
      $(".global-wrapper").css("padding-top", "100px");
    } else {
      nav.removeClass("f-nav");
      $("a.logo-chico").addClass("logo-no-mostrar");
      $(".menu-navegacion-buscador").removeClass("f-nav-2");
      $(".global-wrapper").css("padding-top", "0");
      //$('.menu-secciones').removeClass('mostrar-submenu');
    }
  });

  if ($(".cateogry-filters-list-2").length > 0) {
    $(".cateogry-filters-list-2").slideToggle(1);
    //$('.cateogry-filters-list-2').css('height','1px');
  }

  $(".opcion-toggle").click(function() {
    var i = $(this).attr("data-id");
    $("#" + i).slideToggle();

    return false;
  });

  $("#form-newsletter-home").submit(function(e) {
    e.preventDefault();

    $(".boton-registro-newsletter").trigger("click");

    return false;
  });

  $(".boton-registro-newsletter").click(function() {
    c = $("#newsletter-correo-home").val();

    $(".newsletter-estado-home-exito").fadeOut("slow");
    $(".newsletter-estado-home-error").fadeOut("slow");

    if (c === "") {
      $(".newsletter-estado-home-error").html(
        "Es obligatorio ingresar el correo"
      );
      $(".newsletter-estado-home-error").fadeIn("slow");
      return false;
    }

    if (!correoValido(c)) {
      $(".newsletter-estado-home-error").html("El correo no es válido");
      $(".newsletter-estado-home-error").fadeIn("slow");
      return false;
    }

    $(".boton-registro-newsletter").css("display", "none");
    $(".newsletter-cargando-home").fadeIn("slow");

    $.ajax({
      type: "GET",
      url: "/",
      data: { PeticionAjaxPublico: "f", f: "registro-newsletter", c: c }
    }).done(function(datos) {
      $(".newsletter-cargando-home").fadeOut("slow");
      $(".boton-registro-newsletter").fadeOut("slow");
      $(".newsletter-estado-home-exito").fadeIn("slow");
      $("#newsletter-correo-home").val("");
    });

    return false;
  });

  $("#dni").change(function() {
    $("#dni2").val($(this).val());
  });

  var correoValido = function(cadena) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test(cadena)) {
      return false;
    } else {
      return true;
    }
  };

  $(".js_buscar_codigo").click(function() {
    $(".status_result").hide();
    $(".status_form").show();
  });

  $(".js_getrepairbyid").click(function() {
    var settings = {
      async: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: "http://brillante.brillantestore.com/api/fix/reparacion.php",
      data: {
        action: "getById",
        repairId: $(".js_getrepairbyid_value")
          .first()
          .val()
      },
      method: "GET"
    };

    $.ajax(settings).done(function(response) {
      response = JSON.parse(response);
      $(".status_result")
        .find(".js_res_modelo")
        .first()
        .html(response.modelo);
      $(".status_result")
        .find(".js_res_marca")
        .first()
        .html(response.marca);
      $(".status_result")
        .find(".js_res_ingreso")
        .first()
        .html(response.fechaIngreso);
      //$('.status_result').find('.js_res_entrega').first().html(response.fechaIngreso);
      $(".status_result")
        .find(".js_res_estado")
        .first()
        .html(response.estado);
      $(".status_result")
        .find(".js_res_precio")
        .first()
        .html(response.precioReparacion);
      $(".status_result")
        .find(".js_res_nota")
        .first()
        .html(response.nota);
      $(".status_result").show();
      $(".status_form").hide();
    });
  });

  // Lighbox gallery
  $("#popup-gallery").each(function() {
    $(this).magnificPopup({
      delegate: "a.popup-gallery-image",
      type: "image",
      gallery: {
        enabled: true
      }
    });
  });

  // Lighbox image
  $(".popup-image").magnificPopup({
    type: "image"
  });

  // Lighbox text
  $(".popup-text").magnificPopup({
    removalDelay: 500,
    closeBtnInside: true,
    callbacks: {
      beforeOpen: function() {
        this.st.mainClass = this.st.el.attr("data-effect");
      }
    },
    midClick: true
  });
});
