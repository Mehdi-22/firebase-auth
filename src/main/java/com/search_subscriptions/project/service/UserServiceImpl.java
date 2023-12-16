package com.search_subscriptions.project.service;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.search_subscriptions.project.model.UserDto;
import com.search_subscriptions.project.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public String registerUser(UserDto user) {

      String userId=null;

      if(user.getEmail()!=null){
        Optional<UserDto> userPresentByEmail = userRepository.findByEmail(user.getEmail());
         if(userPresentByEmail.isPresent()){
          userId =(userPresentByEmail.get().getIdUser());
          if(userPresentByEmail.get().getFbId()==null){
            userPresentByEmail.get().setFbId(user.getFbId());
            userRepository.save(userPresentByEmail.get());
          }
         }}
      

      if(user.getPhoneNumber()!=null){
        Optional<UserDto> userPresentByPhoneNumber = userRepository.findByPhoneNumber(user.getPhoneNumber());
        if(userPresentByPhoneNumber.isPresent()){
          userId =(userPresentByPhoneNumber.get().getIdUser());
         }
      }
    
    if(userId==null  ) { 
      user.setRole("CLIENT");
      userRepository.save(user);
      userId = user.getIdUser();
  }

    return userId;
  }

    @Override
    public UserDto findById(String userId) {
   
      return userRepository.findById(userId).orElse(null);
    }

    @Override
    public UserDto findByEmail(String email) {
         return userRepository.findByEmail(email).orElse(null);  
    }

    @Override
    public UserDto findByFbId(String fbId) {
     return userRepository.findByFbId(fbId).orElse(null);
    }       
}
  



    



