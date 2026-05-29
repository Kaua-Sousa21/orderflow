package com.orderflow.orderflow.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DashboardSummaryDTO {

    private Long totalOrders;

    private Long activeOrders;

    private Long pendingOrders;

    private Long preparingOrders;

    private Long readyOrders;

    private Long deliveredOrders;

    private Long canceledOrders;

    private Double totalRevenue;
}