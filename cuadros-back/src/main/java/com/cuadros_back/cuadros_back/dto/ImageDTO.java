package com.cuadros_back.cuadros_back.dto;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;
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

    private String title;
    private String author;
    private String imageUrl;
    private String description;
}
