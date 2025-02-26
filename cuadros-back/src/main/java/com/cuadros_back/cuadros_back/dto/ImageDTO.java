package com.cuadros_back.cuadros_back.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImageDTO {


    private Long id;

    private Boolean available;
    private String technique;
    private String description;
    private String size;
    private String imageUrl;
}
