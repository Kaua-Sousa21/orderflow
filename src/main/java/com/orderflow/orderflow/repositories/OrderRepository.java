package com.orderflow.orderflow.repositories;

import com.orderflow.orderflow.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}