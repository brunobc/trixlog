package com.trixlog.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.trixlog.model.Tag;

@Repository
public class TagDAOImpl implements TagDAO {
	
	private static final Logger logger = LoggerFactory.getLogger(TagDAOImpl.class);

	private SessionFactory sessionFactory;
	
	public void setSessionFactory(SessionFactory sessionFactory){
		this.sessionFactory = sessionFactory;
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<Tag> lista() {
		Session session = this.sessionFactory.getCurrentSession();
		List<Tag> tagsList = session.createQuery("from Tag").list();
		for(Tag tag : tagsList){
			logger.info("Tag List::" + tag);
		}
		return tagsList;
	}

	@Override
	public void adiciona(Tag tag) {
		Session session = this.sessionFactory.getCurrentSession();
		session.persist(tag);
		logger.info("Tag saved successfully, Tag Details=" + tag);
	}

	@Override
	public void altera(Tag tag) {
		Session session = this.sessionFactory.getCurrentSession();
		session.update(tag);
		logger.info("Tag updated successfully, Tag Details=" + tag);
	}

	@Override
	public void remove(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		Tag tag = (Tag) session.load(Tag.class, new Integer(id));
		if(null != tag){
			session.delete(tag);
		}
		logger.info("Tag deleted successfully, Tag details=" + tag);
	}

	@Override
	public Tag getTagById(int id) {
		Session session = this.sessionFactory.getCurrentSession();		
		Tag tag = (Tag) session.load(Tag.class, new Integer(id));
		logger.info("Tag loaded successfully, Tag details=" + tag);
		return tag;
	}

}
