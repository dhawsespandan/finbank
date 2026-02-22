package com.finbank.controller;

import com.finbank.service.LoanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/loans")
@RequiredArgsConstructor
public class LoanController {

    private final LoanService loanService;

    // Customer applies for a loan
    @PostMapping("/apply")
    public ResponseEntity<?> apply(@RequestBody Map<String, Object> body,
                                   @AuthenticationPrincipal String username) {
        try {
            Double amount = Double.parseDouble(body.get("amount").toString());
            String purpose = body.get("purpose").toString();
            return ResponseEntity.ok(loanService.applyForLoan(username, amount, purpose));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Customer views their own loans
    @GetMapping("/my-loans")
    public ResponseEntity<?> myLoans(@AuthenticationPrincipal String username) {
        return ResponseEntity.ok(loanService.getCustomerLoans(username));
    }

    // Customer views their account summary
    @GetMapping("/my-summary")
    public ResponseEntity<?> mySummary(@AuthenticationPrincipal String username) {
        return ResponseEntity.ok(loanService.getCustomerSummary(username));
    }

    // Employee views pending loans
    @GetMapping("/pending")
    public ResponseEntity<?> pendingLoans() {
        return ResponseEntity.ok(loanService.getPendingLoans());
    }

    // Employee approves or rejects a loan
    @PostMapping("/review/{loanId}")
    public ResponseEntity<?> review(@PathVariable String loanId,
                                    @RequestBody Map<String, String> body,
                                    @AuthenticationPrincipal String username) {
        try {
            return ResponseEntity.ok(loanService.reviewLoan(loanId, body.get("decision"), username));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}