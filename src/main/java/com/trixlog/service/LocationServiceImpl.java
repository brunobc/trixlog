package com.trixlog.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.trixlog.dao.LocationDAO;
import com.trixlog.model.Location;

@Service
@Transactional
public class LocationServiceImpl implements LocationService {
	
	private LocationDAO locationDAO;
	
	public void setLocationDAO(LocationDAO locationDAO) {
		this.locationDAO = locationDAO;
	}

	@Override
	public List<Location> lista() {
		return this.locationDAO.lista();
	}

	@Override
	public void adiciona(Location location) {
		this.locationDAO.adiciona(location);
	}

	@Override
	public void altera(Location location) {
		this.locationDAO.altera(location);
	}

	@Override
	public void remove(int id) {
		this.locationDAO.remove(id);
	}

	@Override
	public Location getLocationById(int id) {
		return this.locationDAO.getLocationById(id);
	}

}
