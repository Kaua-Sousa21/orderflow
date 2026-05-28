package com.orderflow.orderflow.dtos;

import lombok.Data;

import java.util.List;

@Data
public class CreateOrderRequest {

    private String customerName;

    private String address;

    private List<OrderItemRequest> items;
}