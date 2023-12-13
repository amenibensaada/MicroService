package tn.esprit.myfirstproject.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tn.esprit.myfirstproject.entities.Universite;
@Repository

public interface IUniversiteRepository extends JpaRepository<Universite, Long>  {
 


    Universite findUniversiteByNomUniversite (String nom) ;

}
