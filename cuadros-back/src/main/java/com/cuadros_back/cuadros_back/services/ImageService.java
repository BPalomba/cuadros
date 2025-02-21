package com.cuadros_back.cuadros_back.services;


import com.cuadros_back.cuadros_back.dto.ImageDTO;
import com.cuadros_back.cuadros_back.entities.Image;
import com.cuadros_back.cuadros_back.respositories.ImageRepository;
import jakarta.persistence.Id;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;




    public Image saveImage(Image image){
        return imageRepository.save(image);
    }

    public Optional<Image> findById(Long id) {
        return imageRepository.findById(id);
    }

    public void deleteImage(Long id){
        imageRepository.deleteById(id);
    }

    public List<ImageDTO> getAllImages(){
        List<Image> images = imageRepository.findAll();

        return images.stream()
                .map(image -> ImageDTO.builder()
                        .id(image.getId())
                        .title(image.getTitle())
                        .description(image.getDescription())
                        .author(image.getAuthor())
                        .imageUrl(image.getImageUrl())
                        .build())
                .collect(Collectors.toList());
    }

    public ImageDTO updateImage(Long id, ImageDTO imageDTO){
        Optional<Image> persistedImage = findById(id);

        if (persistedImage.isPresent()){
            Image existingImage = persistedImage.get();
            existingImage.setImageUrl(imageDTO.getImageUrl());
            existingImage.setAuthor(imageDTO.getAuthor());
            existingImage.setTitle(imageDTO.getTitle());
            existingImage.setDescription(imageDTO.getDescription());

            Image updatedImage = saveImage(existingImage);
            return convertToDTO(updatedImage);
        } else {
            throw new RuntimeException("Image not found with ID: " + id);
        }
    }

    public ImageDTO createImage(ImageDTO imageDTO){

        Image image = Image.builder()
                .imageUrl(imageDTO.getImageUrl())
                .author(imageDTO.getAuthor())
                .description(imageDTO.getDescription())
                .title(imageDTO.getTitle())
                .build();

        Image savedImage = saveImage(image);

        return convertToDTO(savedImage);

    }

    public ImageDTO convertToDTO(Image image){
        return ImageDTO.builder()
                .id(image.getId())
                .author(image.getAuthor())
                .imageUrl(image.getImageUrl())
                .title(image.getTitle())
                .description(image.getDescription())
                .build();
    }

}
