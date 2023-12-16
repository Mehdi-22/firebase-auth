package com.search_subscriptions.project.repository;

import java.util.Optional;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.search_subscriptions.project.model.UserDto;


public interface UserRepository extends MongoRepository<UserDto, String> {

    Optional<UserDto> findByEmail(String email);
    
    Optional<UserDto> findByPhoneNumber(String phoneNumber);

    Optional<UserDto> findByFbId(String fbId);

}
