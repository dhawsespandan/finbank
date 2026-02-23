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

    public LoanApplication applyForLoan(String customerUsername, Double amount, String purpose) {
        User customer = userRepository.findByUsername(customerUsername)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        double originalBalance = customer.getAccountBalance(); // changed from getOriginalBalance()
        double threshold = originalBalance * 0.10;
        double currentTotal = customer.getTotalLoanedAmount();
        double projectedTotal = currentTotal + amount;

        LoanApplication loan = new LoanApplication();
        loan.setCustomerId(customer.getId());
        loan.setCustomerUsername(customerUsername);
        loan.setCustomerName(customer.getFullName());
        loan.setAmount(amount);
        loan.setPurpose(purpose);
        loan.setAppliedAt(LocalDateTime.now());

        if (projectedTotal < threshold) {
            loan.setStatus("APPROVED");
            loan.setApprovedBy("AUTO");
            loan.setReviewedAt(LocalDateTime.now());
            customer.setTotalLoanedAmount(projectedTotal);
            userRepository.save(customer);
        } else {
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

    public LoanApplication markAsPaid(String loanId) {
        LoanApplication loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found"));

        if (!"APPROVED".equals(loan.getStatus())) {
            throw new RuntimeException("Only approved loans can be marked as paid");
        }
        if (loan.isPaid()) {
            throw new RuntimeException("Loan already marked as paid");
        }

        loan.setPaid(true);
        loan.setPaidAt(LocalDateTime.now().toString());

        User customer = userRepository.findById(loan.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        double newTotal = Math.max(0, customer.getTotalLoanedAmount() - loan.getAmount());
        customer.setTotalLoanedAmount(newTotal);
        userRepository.save(customer);

        return loanRepository.save(loan);
    }

    public List<LoanApplication> getAllApprovedLoans() {
        return loanRepository.findAll().stream()
                .filter(l -> "APPROVED".equals(l.getStatus()))
                .toList();
    }

    public Map<String, Object> getCustomerSummary(String customerUsername) {
        User customer = userRepository.findByUsername(customerUsername)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        double threshold = customer.getAccountBalance() * 0.10;
        double remaining = threshold - customer.getTotalLoanedAmount();
        return Map.of(
                "accountBalance", customer.getAccountBalance(),
                "totalLoanedAmount", customer.getTotalLoanedAmount(),
                "autoApproveThreshold", threshold,
                "remainingAutoApproveLimit", Math.max(0, remaining)
        );
    }
}