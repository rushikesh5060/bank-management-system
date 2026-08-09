package com.bank.ivr.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IVRMenuSelectionDto {
    private Integer customerId;
    private String digits;
    private String callSid;
    private String fromNumber;
}