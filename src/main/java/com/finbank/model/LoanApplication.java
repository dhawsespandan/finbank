package com.finbank.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@Document(collection = "loan_applications")
public class LoanApplication {

    @Id
    private String id;

    private String customerId;
    private String customerUsername;
    private String customerName;

    private Double amount;
    private String purpose;
    private String status;         // PENDING, APPROVED, REJECTED

    private String approvedBy;     // employeeUsername or "AUTO"
    private String rejectedBy;

    private LocalDateTime appliedAt;
    private LocalDateTime reviewedAt;
}