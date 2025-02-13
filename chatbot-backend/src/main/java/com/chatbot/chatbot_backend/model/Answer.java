package com.chatbot.chatbot_backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "answer")
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Corresponds to BIGINT(20) and is AUTO_INCREMENT

    @Column(name = "answer_text", columnDefinition = "TEXT", nullable = true)
    private String answerText; // Corresponds to TEXT, nullable

    @Column(name = "created_date", columnDefinition = "DATETIME(6)", nullable = true)
    private LocalDateTime createdDate; // Corresponds to DATETIME(6), nullable

    @Column(name = "licence_id", columnDefinition = "BIGINT(20)", nullable = true)
    private Long licenceId; // Corresponds to BIGINT(20), nullable

    @Column(name = "question_id", columnDefinition = "BIGINT(20)", nullable = true)
    private Long questionId; // Corresponds to BIGINT(20), nullable

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAnswerText() {
        return answerText;
    }

    public void setAnswerText(String answerText) {
        this.answerText = answerText;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public Long getLicenceId() {
        return licenceId;
    }

    public void setLicenceId(Long licenceId) {
        this.licenceId = licenceId;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    @Override
    public String toString() {
        return "Answer{" +
                "id=" + id +
                ", answerText='" + answerText + '\'' +
                ", createdDate=" + createdDate +
                ", licenceId=" + licenceId +
                ", questionId=" + questionId +
                '}';
    }


}
