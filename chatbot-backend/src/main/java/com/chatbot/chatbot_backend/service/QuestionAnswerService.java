package com.chatbot.chatbot_backend.service;

import com.chatbot.chatbot_backend.model.Answer;
import com.chatbot.chatbot_backend.model.Question;
import com.chatbot.chatbot_backend.repository.AnswerRepository;
import com.chatbot.chatbot_backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class QuestionAnswerService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AnswerRepository answerRepository;

    // Combine questions with their corresponding answers
    public List<Map<String, Object>> getQuestionsWithAnswers() {
        // Get all questions from the database
        List<Question> questions = questionRepository.findAll(Sort.by(Sort.Order.desc("id")));

        // Create a list to hold the combined data
        List<Map<String, Object>> questionAnswerList = new ArrayList<>();

        // Loop through each question and fetch answers for each one
        for (Question question : questions) {
            List<Answer> answers = answerRepository.findByQuestionId(question.getId());
            List<String> answerTexts = new ArrayList<>();
            List<String> answerIds = new ArrayList<>();

            // Extract the answer texts from the answers list
            for (Answer answer : answers) {
                answerTexts.add(answer.getAnswerText());
                answerIds.add(String.valueOf(answer.getId()));
            }

            // Create a Map to store the question and answers
            Map<String, Object> questionAnswerMap = new HashMap<>();
            questionAnswerMap.put("questionId", question.getId());
            questionAnswerMap.put("questionName", question.getQuestionName());
            questionAnswerMap.put("answerId", answerIds);
            questionAnswerMap.put("answerTexts", answerTexts);

            // Add the map to the result list
            questionAnswerList.add(questionAnswerMap);
        }

        return questionAnswerList;
    }

    public List<Map<String, Object>> getSuggestions(String query) {
        List<Question> questions = questionRepository.findByQuestionNameContainingIgnoreCase(query);

        // Create a list to hold the combined data
        List<Map<String, Object>> questionAnswerList = new ArrayList<>();
        for (Question question : questions) {
            List<Answer> answers = answerRepository.findByQuestionId(question.getId());
            List<String> answerTexts = new ArrayList<>();

            // Extract the answer texts from the answers list
            for (Answer answer : answers) {
                answerTexts.add(answer.getAnswerText());
            }

            // Create a Map to store the question and answers
            Map<String, Object> questionAnswerMap = new HashMap<>();
            questionAnswerMap.put("id", question.getId());
            questionAnswerMap.put("questionName", question.getQuestionName());
            questionAnswerMap.put("answerTexts", answerTexts);
            // Add the map to the result list
            questionAnswerList.add(questionAnswerMap);
        }

        // Fetch questions based on the query
        return questionAnswerList;
    }


    public void addQuestionData(Question question) {
        question.setCreatedDate(LocalDateTime.now());
        question.setLicenceId(2L);
        questionRepository.save(question);
    }

    public Long getLastInsertedQuestionId() {
        Optional<Question> lastInserted = questionRepository.findTopByOrderByIdDesc();
        return lastInserted.map(Question::getId).orElse(null);
    }

    public void addAnswerData(Answer answer) {
        Long questionId = getLastInsertedQuestionId();
        answer.setCreatedDate(LocalDateTime.now());
        answer.setLicenceId(2L);
        answer.setQuestionId(questionId);
        answerRepository.save(answer);
    }

    public void deleteQuestion(Long qid) {
        if (questionRepository.existsById(qid)) {
            questionRepository.deleteById(qid);
        }
    }

    public void deleteAnswer(Long aid) {
        if (answerRepository.existsById(aid)) {
            answerRepository.deleteById(aid);
        }
    }
}
