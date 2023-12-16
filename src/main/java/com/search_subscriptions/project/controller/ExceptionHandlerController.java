package com.search_subscriptions.project.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.google.firebase.auth.FirebaseAuthException;


@ControllerAdvice
public class ExceptionHandlerController  {
     
    @ExceptionHandler({RuntimeException.class})
    public String handleRuntimeException(RuntimeException ex,HttpServletRequest request,
    HttpServletResponse response) {
    
        // Log the URL or perform further actions based on your requirements

        return "redirect:/login"; 
    }

    
@ExceptionHandler(FirebaseAuthException.class)
public String handleFirebaseAuthException(FirebaseAuthException e) {

   return "redirect:/login"; 
}


}