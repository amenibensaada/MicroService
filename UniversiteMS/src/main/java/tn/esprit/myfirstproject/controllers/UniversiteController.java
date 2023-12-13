package tn.esprit.myfirstproject.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.myfirstproject.entities.Universite;
import tn.esprit.myfirstproject.repositories.IUniversiteRepository;
import tn.esprit.myfirstproject.services.IUniversiteServices;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/universite")
@RequiredArgsConstructor
public class UniversiteController {
    private final   IUniversiteServices iUniversiteService ;
    // private GoogleMapsService googleMapsService ;
    private final   IUniversiteRepository universiteRepo ;
    @GetMapping("/afficheruniversites")
    List<Universite> retrieveAllUniversites() {
        return iUniversiteService.retrieveAllUniversites();
    }

    @PostMapping("/ajouteruniversite")
    Universite addUniversite(@RequestBody Universite c){return iUniversiteService.addUniversite(c);}
    @PutMapping("/modifieruniversite")
    Universite updateUniversite (@RequestBody Universite c){return iUniversiteService.updateUniversite(c);}
    @DeleteMapping("/deleteUniversite")
    public String deleteUniversite(@RequestParam long idUniversite ) {
        iUniversiteService.deleteUniversite(idUniversite);
        return "universite supprimee";
    }


    @GetMapping("/afficheruniversite/{iduniversite}")
    Universite retrieveUniversite(@PathVariable("iduniversite") long idUniversite){return iUniversiteService.retrieveUniversite(idUniversite);}


    @GetMapping("/afficheruniversite/{nom}")
    Universite getuniversiteparnom(@PathVariable("nom") String nom){return iUniversiteService.getUniversiteparnom(nom);}


}
