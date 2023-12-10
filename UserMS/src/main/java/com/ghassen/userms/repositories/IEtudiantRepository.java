package com.ghassen.userms.repositories;

import com.ghassen.userms.entities.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IEtudiantRepository extends JpaRepository<Etudiant, Long> {
    Etudiant findByCin(Long cin);
}
