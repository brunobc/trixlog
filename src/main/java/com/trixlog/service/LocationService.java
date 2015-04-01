package com.trixlog.service;

import java.util.List;

import com.trixlog.model.Location;

public interface LocationService {
	
	List<Location> lista();
	void adiciona(Location location);
    void altera(Location location);
	void remove(int id);
	Location getLocationById(int id);

}
