package org.example.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.lexruntimev2.LexRuntimeV2Client;
import software.amazon.awssdk.services.lexruntimev2.model.*;

import java.util.Map;

@Service
public class LexService {

    private static final Logger logger = LoggerFactory.getLogger(LexService.class);

    private final LexRuntimeV2Client lexClient;

        @Autowired
        public LexService(LexRuntimeV2Client lexClient) {
            this.lexClient = lexClient;
        }

        public String welcomeRequest(String botId, String botAliasId, String localeId, String sessionId, String text) {
            RecognizeTextRequest recognizeTextRequest = RecognizeTextRequest.builder()
                    .botId(botId)
                    .botAliasId(botAliasId)
                    .localeId(localeId)
                    .sessionId(sessionId)
                    .text(text)
                    .build();

            RecognizeTextResponse recognizeTextResponse = lexClient.recognizeText(recognizeTextRequest);
            logger.info("AWS Lex response: {}", recognizeTextResponse);

            return recognizeTextResponse.messages().stream()
                    .map(Message::content)
                    .findFirst()
                    .orElse("I could not process your request.");
        }

}
