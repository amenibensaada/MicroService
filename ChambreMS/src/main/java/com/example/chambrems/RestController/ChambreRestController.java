package com.example.chambrems.RestController;

import com.example.chambrems.Services.IChambreService;
import com.example.chambrems.entities.Chambre;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@AllArgsConstructor
@RequestMapping("/chambre")
public class ChambreRestController {
    IChambreService iChambreService;

    @GetMapping("/afficherchambres")
    List<Chambre> retrieveAllChambres() {
        return iChambreService.retrieveAllChambres();
    }

    @PostMapping("/ajouterchambre")
    Chambre addChambre(@RequestBody Chambre c) {
        return iChambreService.addChambre(c);
    }

    @PutMapping("/modifierchambre")
    Chambre updateChambre(@RequestBody Chambre c) {
        return iChambreService.updateChambre(c);
    }

    @GetMapping("/afficherchambre/{idchambre}")
    Chambre retrieveChambre(@PathVariable("idchambre") long idChambre) {
        return iChambreService.retrieveChambre(idChambre);
    }

    @DeleteMapping("/supprimerchambre/{idchambre}")
    String removeChambre(@PathVariable("idchambre") long idChambre) {
        iChambreService.removeChambre(idChambre);
        return ("Chambre est supprimer");
    }


}
