package tn.esprit.asi.sprintproject.service;

import tn.esprit.asi.sprintproject.entities.Foyer;

import java.util.List;

public interface IFoyerService {
    List<Foyer> retrieveAllFoyers();

    Foyer addFoyer (Foyer f);

    Foyer updateFoyer (Foyer f,long id);

    Foyer retrieveFoyer (long  idFoyer);

    void removeFoyer (long idFoyer);

    Foyer findFoyerByNomFoyer(String nom);

}
