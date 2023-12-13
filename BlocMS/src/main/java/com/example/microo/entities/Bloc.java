package com.example.microo.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Bloc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idBloc;

    String nomBloc;
    Boolean sature;
    private String foyer;

    long capaciteBloc;

    public Long getIdBloc() {
        return idBloc;
    }

    public String getNomBloc() {
        return nomBloc;
    }

    public Boolean getSature() {
        return sature;
    }

    public long getCapaciteBloc() {
        return capaciteBloc;
    }

    public String getFoyer() {
        return foyer;
    }

    public void setIdBloc(Long idBloc) {
        this.idBloc = idBloc;
    }

    public void setNomBloc(String nomBloc) {
        this.nomBloc = nomBloc;
    }

    public void setSature(Boolean sature) {
        this.sature = sature;
    }

    public void setFoyer(String foyer) {
        this.foyer = foyer;
    }

    public void setCapaciteBloc(long capaciteBloc) {
        this.capaciteBloc = capaciteBloc;
    }
}

