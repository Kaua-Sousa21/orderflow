package com.orderflow.orderflow.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DashboardSummaryDTO {

    private Long totalOrders;
    private Long pendingOrders;
    private Double totalRevenue;
}