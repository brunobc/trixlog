<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
<html>
<link rel="stylesheet" type="text/css" href="resources/css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="resources/css/mapa.css">
<link rel="stylesheet" type="text/css" href="resources/css/toggle.css">

<script
  src="http://maps.googleapis.com/maps/api/js?libraries=geometry&sensor=true"></script>
<script  type="text/javascript" src="resources/js/jquery.js"></script>
<script  type="text/javascript" src="resources/js/bootstrap.js"></script>
<script  type="text/javascript" src="resources/js/mapa.js"></script>

<body>
  <div class="row">
    <div class="col-md-3 lateral">

      <h2>Trixlog</h2>

      <div class="panel panel-success">
        <div class="panel-heading">Tags</div>
        <div class="alturamax">
        <div id="checkboxes">
          <c:if test="${!empty listTags}">
            <table id="table_grid_tag" class="table">
              <c:forEach items="${listTags}" var="tag" varStatus="varCount">
                <tr>
                  <td>
                      <div class="input-group">
                        <input type="checkbox" name="${tag.id}" id="checkbox${tag.id}">
                        <label for="checkbox${tag.id}" class="toggles"> ${tag.name}</label>

                        <span class="input-group-btn">
                          <button class="btn btn-default" type="button" onclick="deleteTag(${tag.id}, '${tag.name}');">Delete</button>
                          <button class="btn btn-default" type="button" onclick="checkAjaxCallTagEdit(${tag.id}, '${tag.name}');">Edit</button>
                        </span>
                      </div>
                  </td>
                </tr>
              </c:forEach>
            </table>
          </c:if>
        </div>
        </div>
      </div>

      <div class="input-group" id="editaddtag">
          <input type="text" class="form-control" placeholder="Add Tag" id="name">
          <span class="input-group-btn">
            <button class="btn btn-default" type="button" onclick="checkAjaxCallTag();">Add</button>
          </span>
        </div>


      <br>

      <div class="panel panel-info">
        <div class="panel-heading">Locations List</div>
        <div class="alturamax">
        <c:if test="${!empty listLocations}">
          <div>
          <table id="table_grid_location" class="table">
            <c:forEach items="${listLocations}" var="location">
              <tr>
                <td>${location.name}</td>
                <td>
                  <button id="idputinmap" type="button" class="btn btn-default submitLocation" onclick="putInMap(${location.id}, '${location.name}', ${location.latitude}, ${location.longitude})">
                  View in Map
                  </button>
                </td>
              </tr>
            </c:forEach>
          </table>
          </div>
        </c:if>
        </div>
      </div>
    </div>
    <div class="col-md-9">
      <div id="panelMarkers">
	    <input onclick="clearMarkers();" class="btn btn-default" type=button value="Hide Markers">
	    <input onclick="showMarkers();" class="btn btn-default" type=button value="Show All Markers">
	    <input onclick="deleteMarkers();" class="btn btn-default" type=button value="Delete Markers">
	  </div>
      <div id="map-canvas"></div>
    </div>
  </div>
</body>
</html>
