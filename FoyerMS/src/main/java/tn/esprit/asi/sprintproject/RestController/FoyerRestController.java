package tn.esprit.asi.sprintproject.RestController;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.asi.sprintproject.entities.Foyer;
import tn.esprit.asi.sprintproject.repository.FoyerRepository;
import tn.esprit.asi.sprintproject.service.IFoyerService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/foyer")
@CrossOrigin(origins = "*")
public class FoyerRestController {

    IFoyerService foyerService;

    @GetMapping("/")

    List<Foyer> retrieveAllFoyers(){
        return  foyerService.retrieveAllFoyers();
    }
    @PostMapping("/ajouterfoyer")

    Foyer addFoyer (@RequestBody Foyer f){
      return foyerService.addFoyer(f);
    }
    @PutMapping("/modifierfoyer/{id}")

    Foyer updateFoyer (@RequestBody Foyer f, @PathVariable("id") long id){
     return  foyerService.updateFoyer(f,id);
    }

    @GetMapping("/afficherfoyer/{id}")

    Foyer retrieveFoyer (@PathVariable("id") long  idFoyer){
   return  foyerService.retrieveFoyer(idFoyer);
    }

    @DeleteMapping ("/deletefoyer/{id}")

    void removeFoyer (@PathVariable("id") long idFoyer){
       foyerService.removeFoyer(idFoyer);
    }

    // service avancer page 16

    @GetMapping ("findFoyerByNomFoyer/{nom}")

    public Foyer findFoyerByNomFoyer( @PathVariable("nom") String nom) {
        return foyerService.findFoyerByNomFoyer(nom);

    }
}
