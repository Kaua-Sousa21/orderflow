package com.orderflow.orderflow.dtos;

import lombok.Data;

@Data
public class CreateOrderRequest {

    private String customerName;
    private String address;

}