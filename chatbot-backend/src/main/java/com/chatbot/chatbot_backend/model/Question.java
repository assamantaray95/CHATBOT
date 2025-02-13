package com.chatbot.chatbot_backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "question")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Corresponds to BIGINT(20) and is AUTO_INCREMENT

    @Column(name = "created_date", columnDefinition = "DATETIME(6)", nullable = true)
    private LocalDateTime createdDate; // Corresponds to DATETIME(6), nullable

    @Column(name = "question_name", columnDefinition = "VARCHAR(255)", nullable = true)
    private String questionName; // Corresponds to VARCHAR(255), nullable

    @Column(name = "licence_id", columnDefinition = "BIGINT(20)", nullable = true)
    private Long licenceId; // Corresponds to BIGINT(20), nullable

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public String getQuestionName() {
        return questionName;
    }

    public void setQuestionName(String questionName) {
        this.questionName = questionName;
    }

    public Long getLicenceId() {
        return licenceId;
    }

    public void setLicenceId(Long licenceId) {
        this.licenceId = licenceId;
    }

    @Override
    public String toString() {
        return "Question{" +
                "id=" + id +
                ", createdDate=" + createdDate +
                ", questionName='" + questionName + '\'' +
                ", licenceId=" + licenceId +
                '}';
    }
}
