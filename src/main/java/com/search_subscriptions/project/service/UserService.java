package com.search_subscriptions.project.service;


import com.search_subscriptions.project.model.UserDto;

public interface UserService {

    public String registerUser(UserDto user); 

    public UserDto findById(String userId);

    public UserDto findByEmail(String email);

     public UserDto findByFbId(String fbId);
}

