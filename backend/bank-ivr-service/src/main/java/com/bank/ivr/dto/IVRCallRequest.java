package com.bank.ivr.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IVRCallRequest {
    private Integer customerId;
    private Integer accountId;
    private String serviceType;
    private Integer duration;
}