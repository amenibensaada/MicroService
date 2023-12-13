package com.example.microo.services;

import com.example.microo.entities.Bloc;
import com.example.microo.repositories.BlocRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@AllArgsConstructor
public class BlocServiceImpl implements IBlocService {
    BlocRepo blocRepo;

    @Override
    public List<Bloc> retrieveBlocs() {
        return blocRepo.findAll();
    }

    @Override
    public Bloc updateBloc(Bloc bloc) {
        return blocRepo.save(bloc);
    }

    @Override
    public Bloc addBloc(Bloc bloc) {
        bloc.setSature(false);
        return blocRepo.save(bloc);
    }

    @Override
    public Bloc retrieveBloc(long idBloc) {
        return blocRepo.findById(idBloc).orElse(null);
    }


    @Override
    public void removeBloc(long idBloc) {
        blocRepo.deleteById(idBloc);
    }

    @Override
    public Bloc updateBloc2(Long idBloc, Bloc bloc) {
        Bloc bloc1 = blocRepo.findById(idBloc).get();
        bloc1.setNomBloc(bloc.getNomBloc());
        bloc1.setCapaciteBloc(bloc.getCapaciteBloc());

        return blocRepo.save(bloc1);
    }
    /*:public Bloc affecterChaabmresABloc(List<Long> numchambre, String nomBloc){
        Bloc bloc = blocRepo.findBlocByNomBloc(nomBloc);
        List<Chambre> chambres = new ArrayList<>();

        for (long num : numchambre) {
            Chambre chambre = chambreRepo.findChambreByNumeroChambre(num);
            Bloc ancienBloc = chambre.getBloc(); // Enregistrer le bloc d'origine

            if (bloc.getCapaciteBloc() > 0 ) { // Vérifier si la capacité est supérieure à zéro
                chambre.setBloc(bloc);
                chambres.add(chambre);
                if (ancienBloc != null) {
                    ancienBloc.setCapaciteBloc(ancienBloc.getCapaciteBloc() + 1); // Incrémenter la capacité de l'ancien bloc
                    if (ancienBloc != null && (ancienBloc.getSature() == null || ancienBloc.getSature())) {
                        ancienBloc.setSature(false); // Mettre à jour l'état de saturation de l'ancien bloc si nécessaire
                    }
                }
                bloc.setCapaciteBloc(bloc.getCapaciteBloc() - 1);

                if (bloc.getCapaciteBloc() == 0) {
                    bloc.setSature(true);
                }else{
                    System.out.println("Désolé, le bloc est saturé. Aucune chambre n'a été ajoutée.");

                }

            }
        }

        chambreRepo.saveAll(chambres);
        return bloc;
    }*/

    @Override
    public List<Bloc> rechercheParNomBloc(String nomBloc) {
        return blocRepo.findByNomBlocContainingIgnoreCase(nomBloc);
    }
}

