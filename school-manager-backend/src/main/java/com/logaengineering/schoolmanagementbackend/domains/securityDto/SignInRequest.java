package com.logaengineering.schoolmanagementbackend.domains.securityDto;

import lombok.Data;

@Data
public class SignInRequest {
    private String username;
    private String password;
}
