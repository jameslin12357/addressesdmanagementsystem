package com.example.addressesdmanagementsystem;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AddressController {

    @GetMapping("/indexPaginated")
    // ArrayList<ArrayList<String>>
    public HashMap<String, Object> indexPaginated(@RequestParam("page") String page, @RequestParam("rows") String rows) {
        String offset = Integer.toString((Integer.parseInt(page) - 1) * Integer.parseInt(rows));
        ArrayList<HashMap<String, Object>> Rows = MySQL.Query("select * from addresses order by addressId desc limit " + rows + " offset " + offset);
        ArrayList<HashMap<String, Object>> total = MySQL.Query("select count(*) as total from addresses");
        HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("rows", Rows);
        map.put("total", total.get(0).get("total"));
        //String json = "{\"total\":" + count.get(0).get(0) + ",\"rows\":" + data + "}";
        //return json;
        return map;
    }

    @GetMapping("/searchAddress")
    // ArrayList<ArrayList<String>>
    public HashMap<String, Object> indexPaginated(@RequestParam("page") String page, @RequestParam("rows") String rows, @RequestParam("term") String term) {
        String offset = Integer.toString((Integer.parseInt(page) - 1) * Integer.parseInt(rows));
        String sql = "select * from addresses";
        String sql2 = "select count(*) as total from addresses";
        if (term != ""){
            sql += " where streetName like '%" + term + "%'";
            sql2 += " where streetName like '%" + term + "%'";
        }
        sql += String.format(" order by addressId desc limit %s offset %s",rows,offset);
        ArrayList<HashMap<String, Object>> Rows = MySQL.Query(sql);
        ArrayList<HashMap<String, Object>> total = MySQL.Query(sql2);
        HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("rows", Rows);
        map.put("total", total.get(0).get("total"));
        //String json = "{\"total\":" + count.get(0).get(0) + ",\"rows\":" + data + "}";
        //return json;
        return map;
    }

    @PostMapping("/addresses")
    // ArrayList<ArrayList<String>>
    public Object createAddress(@RequestBody String address) {
        String[] body = address.split("&");
        String streetName = body[0].split("=")[1];
        String streetAddress = body[1].split("=")[1];
        String city = body[2].split("=")[1];
        String country = body[3].split("=")[1];
        String zipCode = body[4].split("=")[1];
        String latitude = body[5].split("=")[1];
        String longitude = body[5].split("=")[1];
        String sql = String.format("insert into addresses (streetName, streetAddress, city, country, zipCode, latitude,longitude) values ('%s','%s','%s','%s','%s','%s','%s')",
                streetName,streetAddress,city,country,zipCode,latitude,longitude);
//        String sql = "update students set firstName=" + firstName + ",lastName=" + lastName +
//                ",major=" + major + ",bio=" + bio + ",age=" + age + ",grade=" + grade +
//                ",gpa=" + gpa + ",gender=" + gender + " where studentId=" + studentId;
        int Rows = MySQL.Update(sql);
        return Rows;
    }

    @PostMapping("/addresses/{addressId}")
    // ArrayList<ArrayList<String>>
    public Object editAddress(@PathVariable String addressId, @RequestBody String address) {
        String[] body = address.split("&");
        String streetName = body[0].split("=")[1];
        String streetAddress = body[1].split("=")[1];
        String city = body[2].split("=")[1];
        String country = body[3].split("=")[1];
        String zipCode = body[4].split("=")[1];
        String latitude = body[5].split("=")[1];
        String longitude = body[5].split("=")[1];
        String sql = String.format("update addresses set streetName='%s', streetAddress='%s', city='%s', country='%s', zipCode='%s', latitude='%s', longitude='%s' where addressId=%s",
                streetName,streetAddress,city,country,zipCode,latitude,longitude,addressId);
//        String sql = "update students set firstName=" + firstName + ",lastName=" + lastName +
//                ",major=" + major + ",bio=" + bio + ",age=" + age + ",grade=" + grade +
//                ",gpa=" + gpa + ",gender=" + gender + " where studentId=" + studentId;
        int Rows = MySQL.Update(sql);
        return Rows;
    }

    @GetMapping("/deleteAddress/{addressId}")
    // ArrayList<ArrayList<String>>
    public Object deleteAddress(@PathVariable String addressId) {
        String sql = String.format("delete from addresses where addressId=%s",addressId);
        int Rows = MySQL.Update(sql);
        return Rows;
    }
}
