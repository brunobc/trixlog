package com.trixlog.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.trixlog.model.Location;

@Repository
public class LocationDAOImpl implements LocationDAO {

	private static final Logger logger = LoggerFactory.getLogger(LocationDAOImpl.class);

	private SessionFactory sessionFactory;
	
	public void setSessionFactory(SessionFactory sessionFactory){
		this.sessionFactory = sessionFactory;
	}
	
	@Override
	@SuppressWarnings("unchecked")
	public List<Location> lista() {
		Session session = this.sessionFactory.getCurrentSession();
		List<Location> locationsList = session.createQuery("from Location").list();
		for(Location location : locationsList){
			logger.info("Location List::" + location);
		}
		return locationsList;
	}

	@Override
	public void adiciona(Location location) {
		Session session = this.sessionFactory.getCurrentSession();
		session.persist(location);
		logger.info("Location saved successfully, Location Details=" + location);
	}

	@Override
	public void altera(Location location) {
		Session session = this.sessionFactory.getCurrentSession();
		session.update(location);
		logger.info("Location updated successfully, Location Details=" + location);
	}

	@Override
	public void remove(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		Location location = (Location) session.load(Location.class, new Integer(id));
		if(location != null){
			session.delete(location);
		}
		logger.info("Location deleted successfully, Location details=" + location);
	}

	@Override
	public Location getLocationById(int id) {
		Session session = this.sessionFactory.getCurrentSession();		
		Location location = (Location) session.load(Location.class, new Integer(id));
		logger.info("Location loaded successfully, Location details=" + location);
		return location;
	}

}
