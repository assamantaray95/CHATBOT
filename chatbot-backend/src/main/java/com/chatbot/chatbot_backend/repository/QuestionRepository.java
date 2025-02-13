package com.chatbot.chatbot_backend.repository;

import com.chatbot.chatbot_backend.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByQuestionNameContainingIgnoreCase(String query);

    Optional<Question> findTopByOrderByIdDesc();
}
