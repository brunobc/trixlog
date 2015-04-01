package com.trixlog.utils;

import java.io.IOException;

import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.ObjectMapper;

public class Utils {
	
	public static String toJson(Object entidade) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(entidade);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

}
