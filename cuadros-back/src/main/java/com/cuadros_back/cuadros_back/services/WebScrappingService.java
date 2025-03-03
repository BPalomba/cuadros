package com.cuadros_back.cuadros_back.services;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@Service
public class WebScrappingService {

    // hard coded to get the images in google photos album
    // https://photos.app.goo.gl/FgYsf6pmpRYLSVDH7
    public Set<String> scrapeWebsite(String url) {


        try {
            //  Connect to the website
            Document doc = Jsoup.connect(url).get();
            // Container has all the "a" with the images
            Elements container = doc.select("a.p137Zd");

            if (container.isEmpty()) {
                throw new RuntimeException("Container is empty");
            }

            // Set to store the image URLs
            Set<String> imageUrls = new HashSet<>();

            // loop through all the images
            for (Element a : container) {
                // get the html of the image
                Element imgHtml = a.selectFirst("img");

                // if the image html is not null, add to imageUrls the true URL of the image
                if (imgHtml != null) {
                    String lowCualityUrl = imgHtml.attr("src");

                    // Remove everything after the "="
                    int index = lowCualityUrl.indexOf("=");
                    if (index != -1) {
                        String highCualityUrl = lowCualityUrl.substring(0, index);
                        imageUrls.add(highCualityUrl);
                    }
                }
            }
            return imageUrls;
        }
        catch (IOException e) {
            throw new RuntimeException(e);}
    }
}
