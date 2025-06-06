package com.cuadros_back.cuadros_back.controller;


import com.cuadros_back.cuadros_back.dto.ImageDTO;
import com.cuadros_back.cuadros_back.entities.Image;
import com.cuadros_back.cuadros_back.respositories.ImageRepository;
import com.cuadros_back.cuadros_back.services.ImageService;
import com.cuadros_back.cuadros_back.services.WebScrappingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/image")
public class ImageController {
    @Autowired
    private ImageService imageService;

    @Autowired
    private WebScrappingService webScrappingService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        try{
            List <ImageDTO> productDTOS = imageService.getAllImages();
            return  ResponseEntity.ok(productDTOS);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("error obtaining images: " + e.getMessage());
        }
    }

    // Used to keep backend alive
    @GetMapping("/test")
    public ResponseEntity getTest(){
        return ResponseEntity.ok("Funcionando");
    }

    // Returns a set with imageUrl in google photos album
    // https://photos.app.goo.gl/FgYsf6pmpRYLSVDH7
    @GetMapping("/imageUrl")
    public ResponseEntity getImageUrl(){
        return ResponseEntity.ok(webScrappingService.scrapeWebsite("https://photos.app.goo.gl/FgYsf6pmpRYLSVDH7"));
    }


    @CrossOrigin(
            origins = "https://marinacuadros.duckdns.org",
            allowCredentials = "true"
    )
    @PostMapping
    public ResponseEntity<?> createImage(@RequestBody ImageDTO imageDTO) {
        try{
            ImageDTO savedImageDTO = imageService.createImage(imageDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedImageDTO);
        } catch (Exception e ){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("error creating products: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateImage(@PathVariable Long id, @RequestBody ImageDTO imageDTO ){
        try{
                ImageDTO updatedImage = imageService.updateImage(id, imageDTO);
                return ResponseEntity.ok(updatedImage);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating image: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteImage(@PathVariable Long id){
        try {
            imageService.deleteImage(id);
            return ResponseEntity.ok("Image with ID " + id + " deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting image: " + e.getMessage());
        }
    }


//    Ping to see if service is up
    @RequestMapping(value = "/ping", method = {RequestMethod.HEAD, RequestMethod.GET})
    public ResponseEntity<?> ping(){
        return ResponseEntity.ok("pong");
    }


}
