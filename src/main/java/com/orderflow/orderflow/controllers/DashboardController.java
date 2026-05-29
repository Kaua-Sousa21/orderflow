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

        var orders = orderRepository.findAll();

        Long totalOrders = (long) orders.size();

        Long pendingOrders = orders.stream()
                .filter(order -> order.getStatus() == OrderStatus.PENDING)
                .count();

        Long preparingOrders = orders.stream()
                .filter(order -> order.getStatus() == OrderStatus.PREPARING)
                .count();

        Long readyOrders = orders.stream()
                .filter(order -> order.getStatus() == OrderStatus.READY)
                .count();

        Long deliveredOrders = orders.stream()
                .filter(order -> order.getStatus() == OrderStatus.DELIVERED)
                .count();

        Long canceledOrders = orders.stream()
                .filter(order -> order.getStatus() == OrderStatus.CANCELED)
                .count();

        Long activeOrders =
                pendingOrders +
                        preparingOrders +
                        readyOrders;

        Double totalRevenue = orders.stream()
                .filter(order -> order.getStatus() == OrderStatus.DELIVERED)
                .mapToDouble(Order::getTotal)
                .sum();

        return new DashboardSummaryDTO(
                totalOrders,
                activeOrders,
                pendingOrders,
                preparingOrders,
                readyOrders,
                deliveredOrders,
                canceledOrders,
                totalRevenue
        );
    }
}