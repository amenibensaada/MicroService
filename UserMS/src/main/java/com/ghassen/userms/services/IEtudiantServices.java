package com.ghassen.userms.services;

import com.ghassen.userms.entities.Etudiant;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IEtudiantServices {
    Etudiant addEtudiant(Etudiant etudiant);
    Etudiant updateEtudiant(Etudiant etudiant);
    List<Etudiant> getAllEtudiants();
    Etudiant getEtudiantById(Long idEtudiant);
    void deleteEtudiant(Long idEtudiant);

    public Etudiant updatePassword (Long idEtudiant, String  password);
    public Etudiant updateImage (Long idEtudiant, MultipartFile file) throws IOException;
}
