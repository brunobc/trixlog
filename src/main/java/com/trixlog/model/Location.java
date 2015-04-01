package com.trixlog.model;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.codehaus.jackson.annotate.JsonIgnore;

@Entity
@Table(name="LOCATION")
public class Location {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private BigDecimal latitude;

	private BigDecimal longitude;

	private String name;

	@Temporal(TemporalType.TIMESTAMP)
	private Calendar created;

	@ManyToMany
    @JoinTable(
            name = "LOCATIONSTAG",
            joinColumns = @JoinColumn(name = "LOCATION_ID"),
            inverseJoinColumns = @JoinColumn(name = "TAG_ID")
    )
	
	@JsonIgnore
	private List<Tag> tag;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public BigDecimal getLatitude() {
		return latitude;
	}

	public void setLatitude(BigDecimal latitude) {
		this.latitude = latitude;
	}

	public BigDecimal getLongitude() {
		return longitude;
	}

	public void setLongitude(BigDecimal longitude) {
		this.longitude = longitude;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Calendar getCreated() {
		return created;
	}

	public void setCreated(Calendar created) {
		this.created = created;
	}

	public List<Tag> getTag() {
		return tag;
	}

	public void setTag(List<Tag> tag) {
		this.tag = tag;
	}

	@Override
	public String toString() {
		return "id=" + id + ", name=" + name + ", latitude=" + latitude
				+ ", longitude=" + longitude;
	}

}
