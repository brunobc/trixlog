package com.trixlog.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.trixlog.dao.TagDAO;
import com.trixlog.model.Tag;

@Service
@Transactional
public class TagServiceImpl implements TagService {
	
	private TagDAO tagDAO;
	
	public void setTagDAO(TagDAO tagDAO) {
		this.tagDAO = tagDAO;
	}

	@Override
	public List<Tag> lista() {
		return this.tagDAO.lista();
	}

	@Override
	public void adiciona(Tag tag) {
		this.tagDAO.adiciona(tag);
	}

	@Override
	public void altera(Tag tag) {
		this.tagDAO.altera(tag);
	}

	@Override
	public void remove(int id) {
		this.tagDAO.remove(id);
	}

	@Override
	public Tag getTagById(int id) {
		return this.tagDAO.getTagById(id);
	}

}
