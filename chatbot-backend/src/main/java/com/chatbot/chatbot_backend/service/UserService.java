package com.chatbot.chatbot_backend.service;

import com.chatbot.chatbot_backend.model.User;
import com.chatbot.chatbot_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void addUser(User user) {
        user.setRole("user");
        user.setPassword(hashPassword(user.getPassword()));
        userRepository.save(user);
    }

    public String authenticateUser(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (user.getPassword().equals(hashPassword(password))) {
                return generateSessionToken();  // Authentication success message
            }
        }

        return "Invalid credentials";  // Authentication failure message
    }

    // Method to hash password using MD5 (or another hashing algorithm)
    private String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(password.getBytes());
            byte[] digest = md.digest();
            StringBuilder sb = new StringBuilder();
            for (byte b : digest) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString(); // Return the hashed password in hexadecimal format
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }

    //METHOD USED FOR GENERATING RANDOM TOKEN FOR LOGIN
    public String generateSessionToken() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[24]; // Random token of 24 bytes length
        random.nextBytes(bytes);
        return Base64.getUrlEncoder().encodeToString(bytes); // Encodes the token to a URL-safe string
    }

    public User getUserRoleByEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        // Check if the user is present
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();  // Unwrap the Optional and get the User object
            System.out.println("Fetched user: " + user);  // Log the user object for debugging
            return user;  // Return the User object
        } else {
            System.out.println("No user found with email: " + email);  // Log if no user is found
            return null;  // Return null if the user is not found
        }
    }
}
