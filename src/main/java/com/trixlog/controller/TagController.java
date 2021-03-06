package com.trixlog.controller;

import java.io.IOException;
import java.util.List;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.trixlog.model.Tag;
import com.trixlog.service.TagService;
import com.trixlog.utils.Utils;

@Controller
public class TagController {

	@Autowired
	private TagService tagService;

	@RequestMapping("/partials/botoesTag")
	public String botoesTag() {
		return "partials/botoesTag";
	}

	@ResponseBody
	@RequestMapping(value = "/tag/add", method = RequestMethod.POST)
	public String addTag(@RequestBody String json) throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		Tag requesValue = mapper.readValue(json, Tag.class);
		Tag tag = new Tag();
		tag.setName(requesValue.getName());

		this.tagService.adiciona(tag);

		return Utils.toJson(tag);
	}

	@ResponseBody
	@RequestMapping(value = "/tag/edit", method = RequestMethod.POST)
	public void editTag(@RequestBody String json) throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		Tag requesValue = mapper.readValue(json, Tag.class);

		Tag tag = new Tag();
		tag = this.tagService.getTagById(requesValue.getId());
		
		tag.setName(requesValue.getName());
		this.tagService.altera(tag);
	}

	@ResponseBody
	@RequestMapping(value = "/tag/delete", method = RequestMethod.DELETE)
	public void deleteTag(@RequestBody String json) throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		Tag requesValue = mapper.readValue(json, Tag.class);

		this.tagService.remove(requesValue.getId());
	}

	@RequestMapping(value = "/tags", method = RequestMethod.GET)
	public @ResponseBody List<Tag> getTags() {
		return this.tagService.lista();
	}

}
