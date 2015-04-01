var poly;

var map;
var geocoder;
var infowindow = new google.maps.InfoWindow();
var markers = [];

function initialize() {
  geocoder = new google.maps.Geocoder();
  var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(-3.734502, -38.469420)
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  google.maps.event.addListener(map, 'click', addLatLng);
}

function addLatLng(event) {
  var marker = new google.maps.Marker({
    position: event.latLng,
    map: map
  });
  markers.push(marker);

  janelaMarker(marker);
}

function janelaMarker(marker, name, id) {
  if (id === undefined) {
    id = 0;
  }
  infowindow.close();
  infowindow = new google.maps.InfoWindow();
  google.maps.event.addListener(marker, 'click', function() {
    var latlng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());

    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          var contentString = getContent(marker.position, results[1].formatted_address, name, id);
          infowindow.setContent(contentString);
          infowindow.open(map, marker);

          var myEl = document.getElementById('divLoc');

          myEl.addEventListener('click', function() {
            var selected = [];
            var run = $('#checkboxes input:checked').each(function(key) {
              selected.push($(this).attr('name'));
            });

            $.when(run).done(function() {
              var nameVal = $('#nomeLoc').val();
              var json = {
                'id': id,
                'name' : nameVal,
                'latitude': marker.position.lat(),
                'longitude': marker.position.lng(),
                'tag': selected.toString()
              };

              $.ajax({
                url: "location/add",
                type: 'POST',
                data: JSON.stringify(json),
                cache:false,
                beforeSend: function(xhr) {
                  xhr.setRequestHeader("Accept", "application/json");
                  xhr.setRequestHeader("Content-Type", "application/json");
                },
                success:function(response){
                  updateLocationsAjax();
                },
                error:function(jqXhr, textStatus, errorThrown){
                  console.log(textStatus);
                }
              });
            });

          }, false);
          
          var myElDel = document.getElementById('divLocDel');

          myElDel.addEventListener('click', function() {

              var nameVal = $('#divLocDel').val();
              var json = {
                'id': id,
                'name' : nameVal,
                'latitude': marker.position.lat(),
                'longitude': marker.position.lng()
              };

              $.ajax({
                url: "location/del",
                type: 'DELETE',
                data: JSON.stringify(json),
                cache:false,
                beforeSend: function(xhr) {
                  xhr.setRequestHeader("Accept", "application/json");
                  xhr.setRequestHeader("Content-Type", "application/json");
                },
                success:function(response){
                  infowindow.close();
                  marker.setMap(null);
                  updateLocationsAjax();
                  markers = jQuery.grep(markers, function(value) {
                	  return value !== marker;
                  });
                },
                error:function(jqXhr, textStatus, errorThrown){
                  console.log(textStatus);
                }
              });

          }, false);
          

        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  });
}

function putInMap(id, name, lat, lng) {
  if (isLocationFree(lat, lng)) {
    var latlng = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
      position: latlng,
      map: map
    });
    markers.push(marker);
    janelaMarker(marker, name, id);
  }
};

function isLocationFree(lat, lng) {
  for (var i= 0; i < markers.length; i++) {
    if (markers[i].position.lat() === lat && markers[i].position.lng() === lng) {
      return false;
    }
  }
  return true;
}

function getContent(p, endereco, name, id) {
  var nomeBotao = 'Edit';
  if (name === undefined) {
    name = '';
    nomeBotao = 'Add';
  }

  return '<div class="winbox">'+
    '<h3 id="firstHeading" class="firstHeading">' +
      'Location' +
    '</h3>'+
    '<input type="text" id="nomeLoc" class="form-control" placeholder="Name" value="' + name + '">' +
    '<div id="bodyContent">'+
      '<div class="latlng">'+
        '<b>Latitude: </b>' + p.lat() +
        '</br>' +
        '<b>Longitude: </b>' + p.lng() +
      '</div>'+
    '</div>'+
    '<div id="bodyContent">'+
      endereco +
    '</div>'+
    '<div class="submitLocation" id="divLocDel">'+
      '<button type="submit" class="btn btn-default">Delete</button>' +
    '</div>'+
    '<div class="submitLocation" id="divLoc">'+
      '<button type="submit" class="btn btn-default">' + nomeBotao + '</button>' +
    '</div>'+
  '</div>';
};

function checkAjaxCallTag(){
  var json = {
    "name": $('#name').val()
  };
  $.ajax({
    url: "tag/add",
    type: 'POST',
    data: JSON.stringify(json),
    cache:false,
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
    },
    success:function(response){
      updateTagsAjax();
    },
    error:function(jqXhr, textStatus, errorThrown){
      console.log(textStatus);
    }
  });
  return true;
};

function deleteTag(id, name) {
  var json = {
	"id": id,
	"name": name
  };
  $.ajax({
    url: "tag/delete",
    type: 'DELETE',
    data: JSON.stringify(json),
    cache:false,
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
    },
    success:function(response){
      updateTagsAjax();
    },
    error:function(jqXhr, textStatus, errorThrown){
      console.log(textStatus);
    }
  });
  return true;
};

function checkAjaxCallTagEdit(id, name){
  var json = {
	"id": id,
	"name": name
  };
  $('#editaddtag').empty();
  $('#editaddtag').append('<input type="text" class="form-control" placeholder="Add Tag" id="name" value="' +
	name + '">' +
    '<span class="input-group-btn">' +
      '<button class="btn btn-default" type="button" onclick="checkAjaxCallTag();">Edit</button>' +
    '</span>');
  $.ajax({
    url: "tag/edit",
    type: 'POST',
    data: JSON.stringify(json),
    cache:false,
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
    },
    success:function(response){
      updateTagsAjax();
    },
    error:function(jqXhr, textStatus, errorThrown){
      console.log(textStatus);
    }
  });
  return true;
};

function updateTagsAjax() {
  $.ajax({
    url : 'gettags',
    success : function(response) {
      $('#table_grid_tag').empty();
      $.each(response, function(key, tag) {
        var htmlrow =
        "<tr><td>" +
          '<div class="input-group">' +
            '<input type="checkbox" name="' + tag.id + '" id="checkbox' + tag.id + '">' +
            '<label for="checkbox' + tag.id + '" class="toggles"> ' + tag.name + '</label>' +
            '<span class="input-group-btn">' +
              '<button class="btn btn-default" type="button" onclick="deleteTag(' +
              tag.id +
              ', \'' +
              tag.name +
              '\')">' +
              'Delete' + 
              '</button>' +
              '<button class="btn btn-default" type="button" onclick="checkAjaxCallTagEdit(' + 
              	tag.id + 
              	', \'' +
                tag.name +
                '\')">' +
                'Edit' +
                '</button>' +
            '</span>' +
          '</div>' +
        "</td></tr>";
        $('#table_grid_tag').append(htmlrow);
      });
    }
  });
};

function updateLocationsAjax() {
  $.ajax({
    url : 'getlocations',
    success : function(response) {
      $('#table_grid_location').empty();
      $.each(response, function(key, location) {
        var htmlrow =
        '<tr>' +
        '<td>' + location.name + '</td>' +
        '<td>' +
        '<button type="button" class="btn btn-default submitLocation" onclick="putInMap(' +
          location.id +
          ', \'' +
          location.name +
          '\', ' +
          location.latitude +
          ', ' +
          location.longitude +
          ')">' +
        'View in Map' +
        '</button>' +
        '</td>' +
        '</tr>';
      $('#table_grid_location').append(htmlrow);
    });
    }
  });
};

function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function clearMarkers() {
  setAllMap(null);
}

function showMarkers() {
  setAllMap(map);
}

function deleteMarkers() {
  clearMarkers();
  markers = [];
}

google.maps.event.addDomListener(window, 'load', initialize);
