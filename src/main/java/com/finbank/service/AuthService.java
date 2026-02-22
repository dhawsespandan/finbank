package com.finbank.service;

import com.finbank.config.JwtConfig;
import com.finbank.model.User;
import com.finbank.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtConfig jwtConfig;

    public Map<String, Object> register(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        // Determine role from username prefix
        String role;
        if (user.getUsername().startsWith("cus")) {
            role = "CUSTOMER";
            user.setAccountBalance(100000.0);   // Default starting balance
            user.setOriginalBalance(100000.0);  // Fixed reference for 10% calc
            user.setTotalLoanedAmount(0.0);
        } else if (user.getUsername().startsWith("emp")) {
            role = "EMPLOYEE";
        } else {
            throw new RuntimeException("Username must start with 'cus' or 'emp'");
        }

        user.setRole(role);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User saved = userRepository.save(user);

        String token = jwtConfig.generateToken(saved.getUsername(), role);
        return Map.of("token", token, "role", role, "username", saved.getUsername(),
                "fullName", saved.getFullName());
    }

    public Map<String, Object> login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtConfig.generateToken(username, user.getRole());
        return Map.of("token", token, "role", user.getRole(),
                "username", username, "fullName", user.getFullName());
    }
}