package com.trixlog.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.trixlog.model.Location;
import com.trixlog.model.Tag;
import com.trixlog.service.LocationService;
import com.trixlog.service.TagService;
import com.trixlog.utils.Utils;

@Controller
public class LocationController {

	private LocationService locationService;
	private TagService tagService;

	@Autowired(required = true)
	@Qualifier(value = "locationService")
	public void setLocationService(LocationService locationService) {
		this.locationService = locationService;
	}

	@Autowired(required = true)
	@Qualifier(value = "tagService")
	public void setTagService(TagService tagService) {
		this.tagService = tagService;
	}

	@RequestMapping(value = "/locations", method = RequestMethod.GET)
	public String listLocations(Model model) {
		model.addAttribute("location", new Location());
		model.addAttribute("listLocations", this.locationService.lista());
		model.addAttribute("listTags", this.tagService.lista());
		return "location";
	}

	@ResponseBody
	@RequestMapping(value = "/location/del", method = RequestMethod.DELETE)
	public void removeLocation(@RequestBody String json, Model model)
			throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		Location requesValue = mapper.readValue(json, Location.class);
		this.locationService.remove(requesValue.getId());

		model.addAttribute("listLocations", this.locationService.lista());
	}

	@ResponseBody
	@RequestMapping(value = "/location/add", method = RequestMethod.POST)
	public String addLocation(@RequestBody String json, Model model)
			throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		Location requesValue = mapper.readValue(json, Location.class);
		Location location = new Location();

		List<Tag> tags = new ArrayList<Tag>();
		tags = getTagsIds(json);

		if (requesValue.getId() == 0) {
			location.setName(requesValue.getName());
			location.setLatitude(requesValue.getLatitude());
			location.setLongitude(requesValue.getLongitude());
			location.setTag(tags);

			this.locationService.adiciona(location);
		} else {
			location = this.locationService
					.getLocationById(requesValue.getId());
			location.setName(requesValue.getName());
			this.locationService.altera(location);
		}
		model.addAttribute("listLocations", this.locationService.lista());

		return Utils.toJson(location);
	}

	private List<Tag> getTagsIds(String tagsIds) {
		tagsIds = tagsIds.substring(tagsIds.indexOf("tag") + 6,
				tagsIds.indexOf("\"}"));

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

	@RequestMapping(value = "/getlocations", method = RequestMethod.GET)
	public @ResponseBody List<Location> getLocationsAjax() {
		return this.locationService.lista();
	}

}
