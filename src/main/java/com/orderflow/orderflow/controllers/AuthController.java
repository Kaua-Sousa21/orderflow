package com.orderflow.orderflow.controllers;

import com.orderflow.orderflow.dtos.AuthResponse;
import com.orderflow.orderflow.dtos.LoginRequest;
import com.orderflow.orderflow.dtos.RegisterRequest;
import com.orderflow.orderflow.entities.User;
import com.orderflow.orderflow.repositories.UserRepository;
import com.orderflow.orderflow.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("CLIENT")
                .build();

        userRepository.save(user);

        return "Usuário cadastrado com sucesso!";
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Usuário não encontrado"));

        boolean passwordMatches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if (!passwordMatches) {
            throw new RuntimeException("Senha inválida");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(token, user.getRole());
    }
}