package lk.ijse.backend.service;

import lk.ijse.backend.dto.AuthDTO;
import lk.ijse.backend.dto.AuthResponseDTO;
import lk.ijse.backend.dto.RegisterDTO;
import lk.ijse.backend.entity.Role;
import lk.ijse.backend.entity.User;
import lk.ijse.backend.repository.UserRepository;
import lk.ijse.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponseDTO authenticate(AuthDTO authDTO) {
        //find user from db
        User user = userRepository.findByUsername(authDTO.getUsername()).orElseThrow(
                () -> new UsernameNotFoundException(authDTO.getUsername()));
        //match passwords (db and request pass)
        if (!passwordEncoder.matches(authDTO.getPassword(),user.getPassword())){
            throw new BadCredentialsException(authDTO.getUsername());
        }
        //generate new token
        String token = jwtUtil.generateToken(authDTO.getUsername());
        return new AuthResponseDTO(token, user.getRole().name());
    }

    public AuthResponseDTO register(RegisterDTO registerDTO){
        if (userRepository.findByUsername(registerDTO.getUsername()).isPresent()){
            throw new RuntimeException("Username is already in use");
        }
        String code = registerDTO.getCode();
        Role role;
        if ("Admin".equalsIgnoreCase(code)) {
            role = Role.ADMIN;
        } else if ("Lecturer".equalsIgnoreCase(code)) {
            role = Role.LECTURER;
        } else if ("User".equalsIgnoreCase(code)) {
            role = Role.USER;
        } else {
            role = Role.STUDENT;
        }
        User user = User.builder()
                .username(registerDTO.getUsername())
                .password(passwordEncoder.encode(registerDTO.getPassword()))
                .role(role)
                .build();
        userRepository.save(user);
        // Generate token
        String token = jwtUtil.generateToken(user.getUsername());
        // Return token + role
        return new AuthResponseDTO(token, role.name());
    }
}
