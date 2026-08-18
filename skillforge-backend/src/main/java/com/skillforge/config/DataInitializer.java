package com.skillforge.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.skillforge.entity.Role;
import com.skillforge.entity.User;
import com.skillforge.enums.AccountStatus;
import com.skillforge.enums.ProfileType;
import com.skillforge.repository.RoleRepository;
import com.skillforge.repository.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(
            UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        if (roleRepository.findByRoleName("USER").isEmpty()) {
        	roleRepository.save(new Role("USER"));
        }
        
        Role adminRole = roleRepository.findByRoleName("ADMIN")
        		.orElseGet(() -> roleRepository.save(new Role("ADMIN")));
        
        String adminEmail = "admin@skillforge.com";
        
        if (!userRepository.existsByEmail(adminEmail)) {
        	
        	User admin = new User();

            admin.setFullName("SkillForge Admin");
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode("Admin@123"));
            admin.setProfileType(ProfileType.ADMIN);
            admin.setAccountStatus(AccountStatus.ACTIVE);
            admin.setRole(adminRole);
            
            userRepository.save(admin);
        }
    }
}