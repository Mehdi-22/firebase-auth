package com.search_subscriptions.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.search_subscriptions.project.model.UserDto;
import com.search_subscriptions.project.service.UserService;

@RestController
public class UserController {
    
    @Autowired
    private UserService userService;
    
      
    @PostMapping("/saveUser")
    public ResponseEntity<String> createUser(@RequestBody UserDto user) {
        // Save the user and get the ID
         String userId = userService.registerUser(user);
        // Return the ID in the response
        return ResponseEntity.ok(userId);
    }
}
