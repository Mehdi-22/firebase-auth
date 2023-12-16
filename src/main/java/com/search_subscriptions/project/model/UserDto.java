package com.search_subscriptions.project.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Document(collection = "users")
@NoArgsConstructor
@Getter
@Setter
public class UserDto {

    @Id   
    private String idUser;
  
    private String email;
    
    private String phoneNumber;

    private String fbId; 

    @CreatedDate
    private LocalDateTime createTime; 

    @LastModifiedDate
    private LocalDateTime latestUpdate;

    private String role;

    public UserDto(String email, String phoneNumber, String fbId, LocalDateTime createTime,
            LocalDateTime latestUpdate, String role) {
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.fbId = fbId;
        this.createTime = createTime;
        this.latestUpdate = latestUpdate;
        this.role = role;
    }

    

}

