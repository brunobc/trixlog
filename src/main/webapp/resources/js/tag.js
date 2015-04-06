var crudTag = (function () {
  'use strict';

  function iniciaListaDeTags() {
    $.ajax({
      url: 'tags',
      success : function(tags) {
        $.each(tags, function(key, tag) {
          var elementoAdicionado = $('<li class="list-group-item itemtag">:last');
          configuraCheckboxTag(elementoAdicionado, tag.id);
          adicionaBotaoEditarEDeletar(tag, elementoAdicionado);
        });
      },
      error:function(){
        $.notify('Erro ao iniciar lista de Tags.',{ type: 'warning' });
      }
    });
  }

  function adicionaTag(textoDigitado, ultimoElementoAdicionado) {
    var tagEnviadaParaServidor = {
      'name': textoDigitado
    };
    $.ajax({
      url: 'tag/add',
      type: 'POST',
      data: JSON.stringify(tagEnviadaParaServidor),
      cache:false,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
      },
      success:function(tag){
        adicionaBotaoEditarEDeletar(tag, ultimoElementoAdicionado);
        crudTag.configuraCheckboxTag(ultimoElementoAdicionado, tag.id);
        $.notify('Tag ' + tag.name + ' adicionada com sucesso!',{ type: 'success' });
      },
      error:function(){
        $.notify('Erro ao adicionar a Tag.',{ type: 'warning' });
      }
    });
  }

  $('#botao-adiciona-tag').on('click', function(evento) {
    evento.preventDefault();
    var textoDigitado = $('#nova-tag').val();
    var ultimoElementoAdicionado = $('<li class="list-group-item itemtag">:last');
    adicionaTag(textoDigitado, ultimoElementoAdicionado);
  });

  function editaTag(id, name) {
    $('#div-add-tag').css('display', 'none');
    $('#div-edita-tag').css('display', 'inline');
    $('#edita-tag').val(name);

    $('#botao-edita-tag').on('click', function(evento) {
      evento.preventDefault();
      var textoDigitado = $('#edita-tag').val();
      $.ajax({
        url: 'tag/edit',
        type: 'POST',
        data: JSON.stringify({'id': id, 'name': textoDigitado}),
        cache:false,
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Accept', 'application/json');
          xhr.setRequestHeader('Content-Type', 'application/json');
        },
        success:function() {
          $('#div-edita-tag').css('display', 'none');
          $('#div-add-tag').css('display', 'inline');
          $('#lista-de-tags').empty();
          iniciaListaDeTags();
          $.notify('Tag ' + name + ' editada com sucesso!',{ type: 'success' });
        },
        error:function(){
          $('#lista-de-tags').empty();
          $.notify('Erro ao editar a Tag ' + name + '.',{ type: 'warning' });
        }
      });
      return true;

    });
  }

  function deletaTag(id) {
    $.ajax({
      url: 'tag/delete',
      type: 'DELETE',
      data: JSON.stringify({'id': id}),
      cache:false,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
      },
      success:function(){
        $('#lista-de-tags').empty();
        iniciaListaDeTags();
        $.notify('Tag removida com sucesso!',{ type: 'success' });
      },
      error:function(){
        $.notify('Erro ao remover a Tag.',{ type: 'warning' });
      }
    });
    return true;
  }

  function adicionaBotaoEditarEDeletar(tag, elementoAdicionado) {
    $.ajax({
      url: 'partials/botoesTag.html',
      type: 'GET',
      success:function(paginaHTML) {
        var compiladorHTML = _.template(paginaHTML);
        var html = compiladorHTML({id: tag.id, name: tag.name});
        elementoAdicionado.append(html);
        elementoAdicionado.append(tag.name).appendTo('#lista-de-tags');
      },
      error:function(){
        $.notify('Erro ao adicionar botões da Tag.',{ type: 'warning' });
      }
    });
  }

  function configuraCheckboxTag(elemento, id) {
    var $widget = $(elemento),
    $checkbox = $('<input type="checkbox" class="hidden" name="' + id + '"/>'),
    color = ($widget.data('color') ? $widget.data('color') : 'primary'),
    style = ($widget.data('style') === 'button' ? 'btn-' : 'list-group-item-'),
    settings = {
      on: {
        icon: 'glyphicon glyphicon-check'
      },
      off: {
        icon: 'glyphicon glyphicon-unchecked'
      }
    };

    $widget.append($checkbox);

    $widget.on('click', function () {
      $checkbox.prop('checked', !$checkbox.is(':checked'));
      $checkbox.triggerHandler('change');
      updateDisplay();
    });
    $checkbox.on('change', function () {
      updateDisplay();
    });

    function updateDisplay() {
      var isChecked = $checkbox.is(':checked');

      $widget.data('state', (isChecked) ? 'on' : 'off');

      $widget.find('.state-icon')
      .removeClass()
      .addClass('state-icon ' + settings[$widget.data('state')].icon);

      if (isChecked) {
        $widget.addClass(style + color + ' active');
      } else {
        $widget.removeClass(style + color + ' active');
      }
    }

    function init() {
      if ($widget.data('checked') === true) {
        $checkbox.prop('checked', !$checkbox.is(':checked'));
      }

      updateDisplay();

      if ($widget.find('.state-icon').length === 0) {
        $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
      }
    }
    init();
  }

  return {
    iniciaListaDeTags: iniciaListaDeTags,
    adicionaTag: adicionaTag,
    editaTag: editaTag,
    deletaTag: deletaTag,
    configuraCheckboxTag: configuraCheckboxTag,
    adicionaBotaoEditarEDeletar: adicionaBotaoEditarEDeletar
  };

})();

crudTag.iniciaListaDeTags();
