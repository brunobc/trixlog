package com.trixlog.dao;

import java.util.List;

import com.trixlog.model.Location;

public interface LocationDAO {
	
	List<Location> lista();
	void adiciona(Location location);
    void altera(Location location);
	void remove(int id);
	Location getLocationById(int id);

}
