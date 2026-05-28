package com.orderflow.orderflow.controllers;

import com.orderflow.orderflow.dtos.CreateOrderRequest;
import com.orderflow.orderflow.entities.Order;
import com.orderflow.orderflow.enums.OrderStatus;
import com.orderflow.orderflow.repositories.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor

public class OrderController {

    private final OrderRepository orderRepository;

    @PostMapping
    public Order createOrder(
            @RequestBody CreateOrderRequest request
    ) {

        Order order = Order.builder()
                .customerName(request.getCustomerName())
                .address(request.getAddress())
                .createdAt(LocalDateTime.now())
                .status(OrderStatus.PENDING)
                .build();

        return orderRepository.save(order);
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}