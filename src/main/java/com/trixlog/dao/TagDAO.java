package com.trixlog.dao;

import java.util.List;

import com.trixlog.model.Tag;

public interface TagDAO {
	
	List<Tag> lista();
	void adiciona(Tag tag);
    void altera(Tag tag);
	void remove(int id);
	Tag getTagById(int id);

}
