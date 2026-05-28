package com.orderflow.orderflow.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class ProductRequestDTO {

    private String name;

    private String description;

    private Double price;

    private String imageUrl;

    private Boolean available;
}