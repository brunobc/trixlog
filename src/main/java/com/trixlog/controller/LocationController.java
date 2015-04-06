package com.trixlog.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.trixlog.model.Location;
import com.trixlog.model.Tag;
import com.trixlog.service.LocationService;

@Controller
public class LocationController {

	private LocationService locationService;

	@Autowired(required = true)
	@Qualifier(value = "locationService")
	public void setLocationService(LocationService locationService) {
		this.locationService = locationService;
	}
	
	@RequestMapping("/index")
	public String formulario() {
		return "index";
	}
	
	@RequestMapping("/partials/infoWindowMarker")
	public String infoWindowMarker() {
		return "partials/infoWindowMarker";
	}
	
	@RequestMapping("/partials/botaoVerLocationNoMapa")
	public String botoesTag() {
		return "partials/botaoVerLocationNoMapa";
	}

	@ResponseBody
	@RequestMapping(value = "/location/del", method = RequestMethod.DELETE)
	public void removeLocation(@RequestBody String json) throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		Location requesValue = mapper.readValue(json, Location.class);
		this.locationService.remove(requesValue.getId());
	}

	@ResponseBody
	@RequestMapping(value = "/location/add", method = RequestMethod.POST)
	public void addLocation(@RequestBody String json) throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		Location requesValue = mapper.readValue(json, Location.class);
		Location location = new Location();

		List<Tag> tags = new ArrayList<Tag>();
		tags = getTagsIds(json);
		location.setTag(tags);

		if (requesValue.getId() == 0) {
			location.setName(requesValue.getName());
			location.setLatitude(requesValue.getLatitude());
			location.setLongitude(requesValue.getLongitude());
			this.locationService.adiciona(location);
		} else {
			location = this.locationService.getLocationById(requesValue.getId());
			location.setName(requesValue.getName());
			this.locationService.altera(location);
		}
	}

	private List<Tag> getTagsIds(String tagsIds) {
		System.out.println("tagsIds");
		System.out.println(tagsIds);
		tagsIds = tagsIds.substring(tagsIds.indexOf("tag") + 6, tagsIds.indexOf("\"}"));
		System.out.println("tagsIds");
		System.out.println(tagsIds);

		List<Tag> tags = new ArrayList<Tag>();
		if (tagsIds != null && !tagsIds.isEmpty()) {
			String[] parts = tagsIds.split(",");
			for (int i = 0; i < parts.length; i++) {
				int id = Integer.parseInt(parts[i]);
				Tag tag = new Tag();
				tag.setId(id);
				tags.add(tag);
			}
		}
		return tags;
	}

	@RequestMapping(value = "/locations", method = RequestMethod.GET)
	public @ResponseBody List<Location> getLocationsAjax() {
		return this.locationService.lista();
	}

}
