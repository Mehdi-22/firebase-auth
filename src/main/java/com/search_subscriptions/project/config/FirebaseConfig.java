package com.search_subscriptions.project.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;


import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;

import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfig {

    @PostConstruct
    public void initializeFirebase() throws IOException {
        if (FirebaseApp.getApps() == null || FirebaseApp.getApps().isEmpty()) {
        FileInputStream serviceAccount =
   new FileInputStream("./serviceAccountKey.json");

         FirebaseOptions options = FirebaseOptions.builder()
                 .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                 .build();

         FirebaseApp.initializeApp(options);
    }}


}
