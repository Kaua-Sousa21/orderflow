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
    @GetMapping("/{id}")
    public Product getProductById(
            @PathVariable Long id
    ) {

        return productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Produto não encontrado")
                );
    }

    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestBody ProductRequestDTO request
    ) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Produto não encontrado")
                );

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setImageUrl(request.getImageUrl());
        product.setAvailable(request.getAvailable());

        return productRepository.save(product);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(
            @PathVariable Long id
    ) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Produto não encontrado")
                );

        productRepository.delete(product);
    }
}