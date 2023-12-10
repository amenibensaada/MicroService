package com.ghassen.userms.services;

import com.ghassen.userms.entities.AuthenticationResponse;
import com.ghassen.userms.entities.Etudiant;
import com.ghassen.userms.entities.RefreshTokenRequest;

import java.util.HashMap;

public interface IAuthenticationServices {
    Etudiant registerEtudiant(Etudiant etudiant);
    AuthenticationResponse login(String email, String password);
    AuthenticationResponse refreshToken(RefreshTokenRequest refreshToken);
    HashMap<String,String> forgetPassword(String email);
    HashMap<String,String> resetPassword(String passwordResetToken, String newPassword);
}
