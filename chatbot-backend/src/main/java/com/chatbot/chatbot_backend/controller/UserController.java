package com.chatbot.chatbot_backend.controller;

import com.chatbot.chatbot_backend.model.User;
import com.chatbot.chatbot_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    // Register API
    @PostMapping("/api/user/register")
    public ResponseEntity<String> addUser(@RequestBody User user) {
        userService.addUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("success");
    }

    // Login API
    @PostMapping("/api/user/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User loginRequest) {
        // Authenticate the user with the provided email and password
        String token = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());

        if (token != null) {
            User userDetail = userService.getUserRoleByEmail(loginRequest.getEmail());

            // Create a response with the token
            Map<String, String> response = new HashMap<>();
            response.put("token", token); // Store the token in the response map
            response.put("role", userDetail.getRole());
            response.put("firstname", userDetail.getFirstName());
            response.put("lastname", userDetail.getLastName());
            // Return the response with HTTP status 200 (OK)
            return ResponseEntity.ok(response);
        } else {
            // If authentication fails, return an error message with HTTP status 401 (Unauthorized)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("message", "Invalid email or password"));
        }
    }
}
