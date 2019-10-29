package com.example.addressesdmanagementsystem;

public class Address {

    private String streetName;
    private String streetAddress;
    private String city;
    private String country;
    private String zipCode;
    private String latitude;
    private String longitude;

    public Address(String streetName, String streetAddress, String city, String country, String zipCode, String latitude, String longitude) {
        this.streetName = streetName;
        this.streetAddress = streetAddress;
        this.city = city;
        this.country = country;
        this.zipCode = zipCode;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getStreetName() {
        return this.streetName;
    }

    public String getStreetAddress() {
        return this.streetAddress;
    }

    public String getCity() {
        return this.city;
    }

    public String getCountry() {
        return this.country;
    }

    public String getZipCode() {
        return this.zipCode;
    }

    public String getLatitude() {
        return this.latitude;
    }

    public String getLongitude() {
        return this.longitude;
    }

    public String getInfo() {
        return this.streetName + "" + this.streetAddress + "" + this.city + "" + this.country + "" + this.zipCode + "" + this.latitude + "" + this.longitude;
    }

}
