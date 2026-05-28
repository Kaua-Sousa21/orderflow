package com.orderflow.orderflow.repositories;

import com.orderflow.orderflow.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository
        extends JpaRepository<Product, Long> {
}