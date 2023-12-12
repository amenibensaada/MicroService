package com.example.chambrems.Services;

import com.example.chambrems.entities.Chambre;
import com.example.chambrems.entities.TypeChambre;
import com.example.chambrems.respositories.ChambreRepo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
@Slf4j
@Service
@AllArgsConstructor
public class ChambreServiceImpl implements IChambreService{
    ChambreRepo chambreRepo;


    @Override
    public List<Chambre> retrieveAllChambres() {
        return chambreRepo.findAll();
    }

    @Override
    public Chambre addChambre(Chambre c) {
        return chambreRepo.save(c);
    }

    @Override
    public Chambre updateChambre(Chambre c) {
        return chambreRepo.save(c);
    }

    @Override
    public Chambre retrieveChambre(long idChambre) {
        System.out.println("get");
        return chambreRepo.findById(idChambre).orElse(null);
    }

    @Override
    public void removeChambre(long idChambre) {
        chambreRepo.deleteById(idChambre);
    }


    @Override
    public List<Chambre> getChambreByType(TypeChambre type) {
        return chambreRepo.findByTypeC(type);
    }



}
