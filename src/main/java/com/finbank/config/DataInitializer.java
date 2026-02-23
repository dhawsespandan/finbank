package com.finbank.config;

import com.finbank.model.User;
import com.finbank.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (!userRepository.existsByUsername("man123456")) {
            User manager = new User();
            manager.setUsername("man123456");
            manager.setPassword(passwordEncoder.encode("pass123"));
            manager.setFullName("Test Manager");
            manager.setRole("MANAGER");
            userRepository.save(manager);
            System.out.println("Manager account created.");
        } else {
            System.out.println("Manager account already exists.");
        }
    }
}