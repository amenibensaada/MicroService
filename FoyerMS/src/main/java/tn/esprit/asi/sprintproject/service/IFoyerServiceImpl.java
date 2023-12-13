package tn.esprit.asi.sprintproject.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.asi.sprintproject.entities.Foyer;
import tn.esprit.asi.sprintproject.repository.FoyerRepository;

import java.util.List;
@Service
@AllArgsConstructor

public class IFoyerServiceImpl implements  IFoyerService{

    private FoyerRepository foyerRepository;

    @Override
    public List<Foyer> retrieveAllFoyers() {
        return foyerRepository.findAll();
    }

    @Override
    public Foyer addFoyer(Foyer f) {
        return foyerRepository.save(f);
    }

    @Override
    public Foyer updateFoyer(Foyer f,long id) {
         Foyer fo=foyerRepository.findById(id).orElse(null);
        if (fo != null) {
            fo.setNomFoyer(f.getNomFoyer());
            fo.setCapaciteFoyer(f.getCapaciteFoyer());
            fo.setGerants(f.getGerants());
            fo.setAdresse(f.getAdresse());
            fo.setFillesougarcons(f.getFillesougarcons());
            fo.setPhoto(f.getPhoto());
            fo.setContact(f.getContact());
            fo.setPointgoogle(f.getPointgoogle());
            return foyerRepository.save(fo);
        } else {
            // Foyer with the specified ID not found
            return null;
        }

    }

    @Override
    public Foyer retrieveFoyer(long idFoyer) {
        return foyerRepository.findById(idFoyer).get();
    }

    @Override
    public void removeFoyer(long idFoyer) {
     foyerRepository.deleteById(idFoyer);
    }
    // service avancer page 16


    @Override
    public Foyer findFoyerByNomFoyer(String nom) {
        return foyerRepository.findFoyerByNomFoyer(nom);
    }
}
