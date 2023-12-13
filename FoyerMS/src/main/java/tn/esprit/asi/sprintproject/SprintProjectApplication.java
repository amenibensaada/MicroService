package tn.esprit.asi.sprintproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;


@SpringBootApplication
@EnableDiscoveryClient

public class SprintProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(SprintProjectApplication.class, args);
    }

}
