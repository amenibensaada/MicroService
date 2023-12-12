package com.example.chambrems.Services;

import com.example.chambrems.entities.Chambre;
import com.example.chambrems.entities.TypeChambre;

import java.util.List;

public interface IChambreService {
    List<Chambre> retrieveAllChambres();

    Chambre addChambre(Chambre c);

    Chambre updateChambre(Chambre c);

    Chambre retrieveChambre(long idChambre);

    void removeChambre(long idChambre);


    List<Chambre> getChambreByType(TypeChambre type);
}
