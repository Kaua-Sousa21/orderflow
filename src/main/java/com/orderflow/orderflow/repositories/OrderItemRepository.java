package com.orderflow.orderflow.repositories;

import com.orderflow.orderflow.entities.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository
        extends JpaRepository<OrderItem, Long> {
}