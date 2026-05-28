package com.orderflow.orderflow.dtos;

import lombok.Data;

@Data
public class OrderItemRequest {

    private Long productId;

    private Integer quantity;
}