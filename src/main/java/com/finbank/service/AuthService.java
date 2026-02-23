package com.finbank.service;

import com.finbank.config.JwtConfig;
import com.finbank.model.User;
import com.finbank.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Random;

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

        String username = user.getUsername();
        String role;

        if (username.startsWith("cus")) {
            role = "CUSTOMER";
            user.setAccountBalance(100000.0);
            user.setOriginalBalance(100000.0);
            user.setTotalLoanedAmount(0.0);
        } else {
            throw new RuntimeException("Registration is only allowed for customers. Username must start with 'cus'");
        }

        user.setRole(role);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User saved = userRepository.save(user);

        String token = jwtConfig.generateToken(saved.getUsername(), role);
        return Map.of("token", token, "role", role,
                "username", saved.getUsername(), "fullName", saved.getFullName());
    }

    public Map<String, Object> login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        if ("CUSTOMER".equals(user.getRole())) {
            double randomBalance = 50000 + (new Random().nextDouble() * 150000);
            double roundedBalance = Math.round(randomBalance / 100.0) * 100.0;
            user.setAccountBalance(roundedBalance);
            user.setOriginalBalance(roundedBalance);
            userRepository.save(user);
        }

        String token = jwtConfig.generateToken(username, user.getRole());
        return Map.of("token", token, "role", user.getRole(),
                "username", username, "fullName", user.getFullName());
    }
}