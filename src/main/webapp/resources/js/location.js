var crudLocation = (function () {
  'use strict';

  function iniciaListaDeLocations() {
    $.ajax({
      url: 'locations',
      success : function(locations) {
        $.each(locations, function(key, location) {
          adicionaLocationNaLista(location);
        });
      },
      error:function(){
        $.notify('Erro ao iniciar lista de Locations.',{ type: 'warning' });
      }
    });
  }

  function adicionaLocationNaLista(location) {
    var nomeDoLocation = location.name;
    var elementoAdicionado = $('<li class="list-group-item">:last');
    elementoAdicionado.append(nomeDoLocation);

    $.ajax({
      url: 'partials/botaoVerLocationNoMapa.html',
      type: 'GET',
      success:function(paginaHTML) {
        var compiladorHTML = _.template(paginaHTML);
        var html = compiladorHTML({
          id: location.id,
          name: location.name,
          latitude: location.latitude,
          longitude: location.longitude
        });
        elementoAdicionado.append(html);
        elementoAdicionado.appendTo('#lista-de-locations');
      },
      error:function(){
        $.notify('Erro ao adicionar o Location.',{ type: 'warning' });
      }
    });
  }

  function editaLocation(id, latitude, longitude) {
    var tagsSelecionadas = [];

    var selecionarTags = $('#lista-de-tags input:checked').each(function(key, elemento) {
      tagsSelecionadas.push(elemento.name);
    });

    $.when(selecionarTags).done(function() {
      var name = $('#nomeLocation').val();
      var locationParaEdicao = {
        'id': id,
        'name' : name,
        'latitude': latitude,
        'longitude': longitude,
        'tag': tagsSelecionadas.toString()
      };

      $.ajax({
        url: 'location/add',
        type: 'POST',
        data: JSON.stringify(locationParaEdicao),
        cache:false,
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Accept', 'application/json');
          xhr.setRequestHeader('Content-Type', 'application/json');
        },
        success:function() {
          $('#lista-de-locations').empty();
          crudLocation.iniciaListaDeLocations();
          $.notify('Location ' + name + ' editada com sucesso!',{ type: 'success' });
        },
        error:function(){
          $.notify('Erro ao editar a location ' + name + '.',{ type: 'warning' });
        }
      });
    });
  }

  function deletaLocation(id, latitude, longitude) {
    var name = $('#divLocationNoMapaDeleta').val();
    var locationParaDelecao = {
      'id': id,
      'name' : name,
      'latitude': latitude,
      'longitude': longitude
    };
    mapTrix.deletaLocationDoMapa(latitude, longitude);

    $.ajax({
      url: 'location/del',
      type: 'DELETE',
      data: JSON.stringify(locationParaDelecao),
      cache:false,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
      },
      success:function() {
        $('#lista-de-locations').empty();
        crudLocation.iniciaListaDeLocations();
        $.notify('Location removida com sucesso!',{ type: 'success' });
      },
      error:function(){
        $.notify('Erro ao remover o Location.',{ type: 'warning' });
      }
    });
  }

  return {
    iniciaListaDeLocations: iniciaListaDeLocations,
    editaLocation: editaLocation,
    deletaLocation: deletaLocation
  };

})();

crudLocation.iniciaListaDeLocations();
