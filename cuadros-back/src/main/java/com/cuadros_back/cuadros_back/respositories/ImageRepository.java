package com.cuadros_back.cuadros_back.respositories;

import com.cuadros_back.cuadros_back.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
}
