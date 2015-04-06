var mapTrix = (function () {
  'use strict';
  var mapa;
  var geocoder;
  var infowindow = new google.maps.InfoWindow();
  var marcadores = [];

  function iniciaMapa() {
    geocoder = new google.maps.Geocoder();
    var mapOptions = {
      zoom: 16,
      center: new google.maps.LatLng(-3.734502, -38.469420)
    };

    mapa = new google.maps.Map($('#map-canvas')[0], mapOptions);

    google.maps.event.addListener(mapa, 'click', addLatLng);
  }

  function addLatLng(event) {
    var marker = new google.maps.Marker({
      position: event.latLng,
      map: mapa
    });
    marcadores.push(marker);

    janelaDeVisualizacaoDoMarcador(marker);
  }

  function janelaDeVisualizacaoDoMarcador(marker, name, id) {
    if (id === undefined) {
      id = 0;
    }
    infowindow.close();
    infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(marker, 'click', function() {
      var latlng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());

      geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            /*jshint camelcase: false */
            getConteudoDaJanelaDoMarcador(marker, results[1].formatted_address, name, id);
          } else {
            $.notify('Nenhum endereço encontrado.',{ type: 'warning' });
          }
        } else {
          $.notify('Falha a buscar o endereço.',{ type: 'warning' });
        }
      });
    });
  }

  function deletaLocationDoMapa(latitude, longitude) {
    infowindow.close();
    var marker;
    for (var i= 0; i < marcadores.length; i++) {
      if (marcadores[i].position.lat() === latitude && marcadores[i].position.lng() === longitude) {
        marcadores[i].setMap(null);
        marker = marcadores[i];
      }
    }
    marcadores = $.grep(marcadores, function(value) {
      return value !== marker;
    });
  }

  function incluiNoMapa(id, name, lat, lng) {
    if (ehLocationExistente(lat, lng)) {
      var latlng = new google.maps.LatLng(lat, lng);
      var marker = new google.maps.Marker({
        position: latlng,
        map: mapa
      });
      marcadores.push(marker);
      janelaDeVisualizacaoDoMarcador(marker, name, id);
    }
  }

  function ehLocationExistente(lat, lng) {
    for (var i= 0; i < marcadores.length; i++) {
      if (marcadores[i].position.lat() === lat && marcadores[i].position.lng() === lng) {
        return false;
      }
    }
    return true;
  }

  function getConteudoDaJanelaDoMarcador(marker, endereco, name, id) {
    var nomeBotao = 'Editar';
    if (name === undefined) {
      name = '';
      nomeBotao = 'Adicionar';
    }

    $.ajax({
      url: 'partials/infoWindowMarker.html',
      type: 'GET',
      cache:false,
      success:function(paginaHTML) {
        var compiladorHTML = _.template(paginaHTML);
        var html = compiladorHTML({
          id: id,
          name: name,
          latitude: marker.position.lat(),
          longitude: marker.position.lng(),
          endereco: endereco,
          nomeBotao: nomeBotao
        });
        infowindow.setContent(html);
        infowindow.open(mapa, marker);
      },
      error:function(){
        $.notify('Falha ao gerar a janela do marcador.',{ type: 'warning' });
      }
    });
  }

  function alterarMarcadores(mapa) {
    for (var i = 0; i < marcadores.length; i++) {
      marcadores[i].setMap(mapa);
    }
  }

  $('#esconderMarcadores').on('click', function() {
    alterarMarcadores(null);
  });

  $('#mostrarMarcadores').on('click', function() {
    alterarMarcadores(mapa);
  });

  $('#removerMarcadores').on('click', function() {
    alterarMarcadores(null);
    marcadores = [];
  });

  google.maps.event.addDomListener(window, 'load', iniciaMapa);

  return {
    incluiNoMapa: incluiNoMapa,
    deletaLocationDoMapa: deletaLocationDoMapa
  };

})();
