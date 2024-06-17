package org.example.controller;


import org.example.dto.ChatRequest;
import org.example.service.LexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.HashMap;
import java.util.Map;

import static org.example.utils.Constants.*;


@RestController
@EnableWebMvc
public class Controller {

    private final LexService lexService;

    @Autowired
    public Controller(LexService lexService) {
        this.lexService = lexService;
    }

    @PostMapping("/recognize")
    public String recognize(@RequestBody ChatRequest chatRequest) {
        Map<String, String> pong = new HashMap<>();
        return lexService.welcomeRequest(BOT_ID, BOT_ALIAS_ID, LOCAL_ID, chatRequest.getSessionId(), chatRequest.getRequestText());
    }
}
