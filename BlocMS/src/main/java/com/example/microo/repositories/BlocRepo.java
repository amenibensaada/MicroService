package com.example.microo.repositories;


import com.example.microo.entities.Bloc;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlocRepo extends JpaRepository<Bloc,Long> {
    Bloc findBlocByNomBloc(String nom);
    List<Bloc> findByNomBlocContainingIgnoreCase(String nomBloc);

}

