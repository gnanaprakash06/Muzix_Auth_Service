package com.muzix.auth.exception;

import com.muzix.auth.entity.User;

public class UserAlreadyExistsException extends RuntimeException{
    public UserAlreadyExistsException(String message) {
        super(message);
    }
}
