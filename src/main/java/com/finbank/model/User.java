package com.finbank.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

@Data
@Document(collection = "users")
public class User {

    @Id
    private String id;

    @Indexed(unique = true)
    private String username;       // cus000001 or emp000001

    private String password;       // BCrypt hashed
    private String fullName;
    private String role;           // CUSTOMER or EMPLOYEE

    // Customer-specific fields
    private Double accountBalance; // e.g. 100000.0
    private Double originalBalance;// stored at account creation — used for 10% calc
    private Double totalLoanedAmount; // running total of approved loans

    // e.g. cus000001 → CUSTOMER, emp000001 → EMPLOYEE
    public boolean isCustomer() {
        return username != null && username.startsWith("cus");
    }

    public boolean isEmployee() {
        return username != null && username.startsWith("emp");
    }
}