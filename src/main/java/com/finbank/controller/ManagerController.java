package com.finbank.controller;

import com.finbank.model.User;
import com.finbank.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/manager")
@RequiredArgsConstructor
public class ManagerController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/create-employee")
    public ResponseEntity<?> createEmployee(
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal String username) {

        User manager = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        if (!"MANAGER".equals(manager.getRole())) {
            return ResponseEntity.status(403).body(Map.of("error", "Access denied"));
        }

        String empUsername = body.get("username");
        String empPassword = body.get("password");
        String empFullName = body.get("fullName");

        if (!empUsername.startsWith("emp")) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Employee username must start with 'emp'"));
        }
        if (userRepository.existsByUsername(empUsername)) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Username already exists"));
        }

        User emp = new User();
        emp.setUsername(empUsername);
        emp.setPassword(passwordEncoder.encode(empPassword));
        emp.setFullName(empFullName);
        emp.setRole("EMPLOYEE");
        userRepository.save(emp);

        return ResponseEntity.ok(Map.of(
                "message", "Employee created successfully",
                "username", empUsername));
    }

    @GetMapping("/employees")
    public ResponseEntity<?> listEmployees(@AuthenticationPrincipal String username) {
        User manager = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        if (!"MANAGER".equals(manager.getRole())) {
            return ResponseEntity.status(403).body(Map.of("error", "Access denied"));
        }

        List<User> employees = userRepository.findByRole("EMPLOYEE");
        employees.forEach(u -> u.setPassword(null));
        return ResponseEntity.ok(employees);
    }
}