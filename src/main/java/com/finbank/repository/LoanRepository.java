package com.finbank.repository;

import com.finbank.model.LoanApplication;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface LoanRepository extends MongoRepository<LoanApplication, String> {
    List<LoanApplication> findByCustomerId(String customerId);
    List<LoanApplication> findByStatus(String status);
    List<LoanApplication> findByCustomerIdAndStatus(String customerId, String status);
}