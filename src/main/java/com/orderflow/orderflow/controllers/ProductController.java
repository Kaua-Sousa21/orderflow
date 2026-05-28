package com.orderflow.orderflow.controllers;

import com.orderflow.orderflow.dtos.ProductRequestDTO;
import com.orderflow.orderflow.entities.Product;
import com.orderflow.orderflow.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor

public class ProductController {

    private final ProductRepository productRepository;

    @PostMapping
    public Product createProduct(
            @RequestBody ProductRequestDTO request
    ) {

        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .imageUrl(request.getImageUrl())
                .available(request.getAvailable())
                .build();

        return productRepository.save(product);
    }

    @GetMapping
    public List<Product> listProducts() {

        return productRepository.findAll();
    }
}