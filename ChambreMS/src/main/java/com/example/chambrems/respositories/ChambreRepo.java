package com.example.chambrems.respositories;

import com.example.chambrems.entities.Chambre;
import com.example.chambrems.entities.TypeChambre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChambreRepo extends JpaRepository<Chambre, Long> {

    Chambre findChambreByIdChambre(long idChambre);

    Chambre findChambresByNumeroChambre(long num);

    List<Chambre> findByTypeC(TypeChambre type);
}
