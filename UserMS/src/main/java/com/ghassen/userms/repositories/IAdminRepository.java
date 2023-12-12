package com.ghassen.userms.repositories;

import com.ghassen.userms.entities.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAdminRepository extends JpaRepository<Admin, Long> {
}
