package tn.esprit.asi.sprintproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.asi.sprintproject.entities.Foyer;
@Repository
public interface FoyerRepository extends JpaRepository<Foyer,Long> {
    Foyer findFoyerByNomFoyer(String nom);
    Foyer findFoyerByIdFoyer(long id);


}
