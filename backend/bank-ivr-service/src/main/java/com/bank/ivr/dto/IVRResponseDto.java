package com.bank.ivr.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IVRResponseDto {
    private boolean success;
    private String message;
    private String twimlXml;
    private Object data;
}