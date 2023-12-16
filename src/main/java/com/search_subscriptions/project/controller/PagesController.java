package com.search_subscriptions.project.controller;


import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class PagesController {


    @GetMapping("/login")
    public String getLoginPage(){
   
        return "login/home";
    }



    @GetMapping("/profile")
     public String getProfilePage(@RequestParam("userID") String userID,HttpServletRequest request){
        
                return "login/profile";
            }

     @GetMapping("/logout")
     public String getLogOutPage(){
      
        return "redirect:/login";
     }

    @GetMapping("/signup")
    public String getSignUpPage(){
        return "login/signup";
    }

    @GetMapping("/reset")
    public String getResetPage(){
        return "login/reset";
    }

    @GetMapping("/error")
    public String getErrorPage(){
        return "login/404";
    }

   
}



