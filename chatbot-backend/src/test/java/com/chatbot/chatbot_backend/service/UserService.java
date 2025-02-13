package com.chatbot.chatbot_backend.service;

import com.chatbot.chatbot_backend.model.User;
import com.chatbot.chatbot_backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Method to hash the password using bcrypt
    private String hashPasswordBcrypt(String password) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.encode(password);
    }

    public User addUser(User user) {
        return userRepository.save(user);  // This saves the student object into the database
    }
}
