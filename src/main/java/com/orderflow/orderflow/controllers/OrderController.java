package com.orderflow.orderflow.controllers;

import com.orderflow.orderflow.dtos.CreateOrderRequest;
import com.orderflow.orderflow.dtos.OrderItemRequest;
import com.orderflow.orderflow.entities.Order;
import com.orderflow.orderflow.entities.OrderItem;
import com.orderflow.orderflow.entities.Product;
import com.orderflow.orderflow.enums.OrderStatus;
import com.orderflow.orderflow.repositories.OrderRepository;
import com.orderflow.orderflow.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor

public class OrderController {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    @PostMapping
    public Order createOrder(
            @RequestBody CreateOrderRequest request
    ) {

        Order order = new Order();

        order.setCustomerName(request.getCustomerName());

        order.setStatus(OrderStatus.PENDING);

        order.setCreatedAt(LocalDateTime.now());

        List<OrderItem> orderItems = new ArrayList<>();

        double total = 0;

        for (OrderItemRequest itemRequest : request.getItems()) {

            Product product = productRepository
                    .findById(itemRequest.getProductId())
                    .orElseThrow(() ->
                            new RuntimeException("Produto não encontrado")
                    );

            OrderItem item = new OrderItem();

            item.setProduct(product);

            item.setQuantity(itemRequest.getQuantity());

            item.setPrice(product.getPrice());

            item.setOrder(order);

            orderItems.add(item);

            total += product.getPrice()
                    * itemRequest.getQuantity();
        }

        order.setItems(orderItems);

        order.setTotal(total);

        return orderRepository.save(order);
    }
    @GetMapping("/{id}")
    public Order getOrderById(
            @PathVariable Long id
    ) {

        return orderRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Pedido não encontrado")
                );
    }
    @PutMapping("/{id}/status")
    public Order updateStatus(
            @PathVariable Long id,
            @RequestParam OrderStatus status
    ) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Pedido não encontrado")
                );

        order.setStatus(status);

        return orderRepository.save(order);
    }



    @GetMapping
    public List<Order> listOrders() {
        return orderRepository.findAll();
    }
}