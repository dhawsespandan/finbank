package com.finbank.service;

import com.finbank.model.LoanApplication;
import com.finbank.model.User;
import com.finbank.repository.LoanRepository;
import com.finbank.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class LoanService {

    private final LoanRepository loanRepository;
    private final UserRepository userRepository;

    /**
     * Core business logic:
     * Auto-approve if (existingTotalLoans + newAmount) < 10% of originalBalance
     * Otherwise mark PENDING for employee review.
     */
    public LoanApplication applyForLoan(String customerUsername, Double amount, String purpose) {
        User customer = userRepository.findByUsername(customerUsername)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        double originalBalance = customer.getOriginalBalance();  // e.g. 100000
        double threshold = originalBalance * 0.10;               // e.g. 10000
        double currentTotal = customer.getTotalLoanedAmount();   // e.g. 9000
        double projectedTotal = currentTotal + amount;           // e.g. 11000

        LoanApplication loan = new LoanApplication();
        loan.setCustomerId(customer.getId());
        loan.setCustomerUsername(customerUsername);
        loan.setCustomerName(customer.getFullName());
        loan.setAmount(amount);
        loan.setPurpose(purpose);
        loan.setAppliedAt(LocalDateTime.now());

        if (projectedTotal < threshold) {
            // AUTO-APPROVE
            loan.setStatus("APPROVED");
            loan.setApprovedBy("AUTO");
            loan.setReviewedAt(LocalDateTime.now());

            // Update customer's running loan total
            customer.setTotalLoanedAmount(projectedTotal);
            userRepository.save(customer);
        } else {
            // Needs employee review
            loan.setStatus("PENDING");
        }

        return loanRepository.save(loan);
    }

    public List<LoanApplication> getCustomerLoans(String customerUsername) {
        User customer = userRepository.findByUsername(customerUsername)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        return loanRepository.findByCustomerId(customer.getId());
    }

    public List<LoanApplication> getPendingLoans() {
        return loanRepository.findByStatus("PENDING");
    }

    public LoanApplication reviewLoan(String loanId, String decision, String employeeUsername) {
        LoanApplication loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found"));

        if (!"PENDING".equals(loan.getStatus())) {
            throw new RuntimeException("Loan already reviewed");
        }

        loan.setReviewedAt(LocalDateTime.now());

        if ("APPROVE".equalsIgnoreCase(decision)) {
            loan.setStatus("APPROVED");
            loan.setApprovedBy(employeeUsername);

            // Update customer's total loaned amount
            User customer = userRepository.findById(loan.getCustomerId())
                    .orElseThrow(() -> new RuntimeException("Customer not found"));
            customer.setTotalLoanedAmount(customer.getTotalLoanedAmount() + loan.getAmount());
            userRepository.save(customer);

        } else if ("REJECT".equalsIgnoreCase(decision)) {
            loan.setStatus("REJECTED");
            loan.setRejectedBy(employeeUsername);
        }

        return loanRepository.save(loan);
    }

    public Map<String, Object> getCustomerSummary(String customerUsername) {
        User customer = userRepository.findByUsername(customerUsername)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        double threshold = customer.getOriginalBalance() * 0.10;
        double remaining = threshold - customer.getTotalLoanedAmount();
        return Map.of(
                "accountBalance", customer.getAccountBalance(),
                "originalBalance", customer.getOriginalBalance(),
                "totalLoanedAmount", customer.getTotalLoanedAmount(),
                "autoApproveThreshold", threshold,
                "remainingAutoApproveLimit", Math.max(0, remaining)
        );
    }
}