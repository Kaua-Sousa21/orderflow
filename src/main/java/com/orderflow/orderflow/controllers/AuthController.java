package com.orderflow.orderflow.controllers;

import com.orderflow.orderflow.dtos.AuthResponse;
import com.orderflow.orderflow.dtos.LoginRequest;
import com.orderflow.orderflow.dtos.RegisterRequest;
import com.orderflow.orderflow.entities.User;
import com.orderflow.orderflow.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor

public class AuthController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

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
    public String login(@RequestBody LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        boolean passwordMatches =
                passwordEncoder.matches(request.getPassword(), user.getPassword());

        if (!passwordMatches) {
            throw new RuntimeException("Senha inválida");
        }

        return "Login realizado com sucesso!";
    }
}