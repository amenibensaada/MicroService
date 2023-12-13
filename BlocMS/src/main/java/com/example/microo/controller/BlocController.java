package com.example.microo.controller;



import com.example.microo.entities.Bloc;
import com.example.microo.services.IBlocService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/bloc")

public class BlocController {
    IBlocService iBlocService;
    @GetMapping("/AllBlocs")
    public List<Bloc> retrieveBlocs() {
        return iBlocService.retrieveBlocs();
    }

    //@PutMapping(" /updateBloc/{idBloc}")
    //public Bloc updateBloc(@PathVariable("idBloc") Long idBloc, @RequestBody Bloc bloc) {
    // Logique de mise à jour du bloc
    //   return iBlocService.updateBloc(bloc);
    //}
    @PostMapping("/addBloc")
    public Bloc addBloc(@RequestBody Bloc bloc) {
        return iBlocService.addBloc(bloc);

    }

    @PutMapping("/update2/{idBloc}")
    public ResponseEntity<String> updateUser(@PathVariable("idBloc") Long idBloc, @RequestBody Bloc bloc) {
        iBlocService.updateBloc2(idBloc, bloc);
        return ResponseEntity.ok("{\"message\": \"Bloc Updated Successfully\"}");
    }
    @GetMapping("/recherche")
    public List<Bloc> rechercheParNomBloc(@RequestParam("nomBloc") String nomBloc) {
        return iBlocService.rechercheParNomBloc(nomBloc);
    }


    @GetMapping("/getBloc/{idBloc}")
    public Bloc retrieveBloc(@PathVariable ("idBloc") long idBloc ) {
        return iBlocService.retrieveBloc(idBloc);
    }

    @DeleteMapping("/removeBloc/{idBloc}")
    public void removeBloc(@PathVariable long idBloc) {
        iBlocService.removeBloc(idBloc);
    }

    /*@PostMapping("/affecterChambresABloc")
    public Bloc affecterChaabmresABloc(@RequestParam List<Long> numchambre, @RequestParam String nomBloc) {
        return iBlocService.affecterChaabmresABloc(numchambre,nomBloc) ;
        //IBlocService.affecterChaabmresABloc(numchambre, nomBloc);
        //}*/

}

