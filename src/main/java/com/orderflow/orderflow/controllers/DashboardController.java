package com.orderflow.orderflow.controllers;

import com.orderflow.orderflow.dtos.DashboardSummaryDTO;
import com.orderflow.orderflow.entities.Order;
import com.orderflow.orderflow.enums.OrderStatus;
import com.orderflow.orderflow.repositories.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final OrderRepository orderRepository;

    @GetMapping("/summary")
    public DashboardSummaryDTO getSummary() {

        Long totalOrders = orderRepository.count();

        Long pendingOrders = orderRepository.findAll()
                .stream()
                .filter(order -> order.getStatus() == OrderStatus.PENDING)
                .count();

        Double totalRevenue = orderRepository.findAll()
                .stream()
                .mapToDouble(Order::getTotal)
                .sum();

        return new DashboardSummaryDTO(
                totalOrders,
                pendingOrders,
                totalRevenue
        );
    }
}