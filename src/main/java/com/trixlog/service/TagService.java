package com.trixlog.service;

import java.util.List;

import com.trixlog.model.Tag;

public interface TagService {

	List<Tag> lista();
	void adiciona(Tag tag);
    void altera(Tag tag);
	void remove(int id);
	Tag getTagById(int id);
	
}
