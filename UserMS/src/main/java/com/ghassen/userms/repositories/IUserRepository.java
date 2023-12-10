package com.ghassen.userms.repositories;

import com.ghassen.userms.entities.Role;
import com.ghassen.userms.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IUserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    Optional<User> findByPasswordResetToken(String passwordResetToken);
    User findByRole(Role role);
}

