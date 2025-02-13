package com.chatbot.chatbot_backend.controller;

import com.chatbot.chatbot_backend.model.Answer;
import com.chatbot.chatbot_backend.model.Question;
import com.chatbot.chatbot_backend.service.QuestionAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class QuestionAnswerController {

    @Autowired
    private QuestionAnswerService questionAnswerService;

    @GetMapping("/api/chat/questions-with-answers")
    public List<Map<String, Object>> getQuestionsWithAnswers() {
        // Call service to get combined data
        return questionAnswerService.getQuestionsWithAnswers();
    }

    @GetMapping("/api/question/suggestions")
    public List<Map<String, Object>> getQuestionSuggestions(@RequestParam(defaultValue = "") String query) {
        // If query is empty, return an empty list
        if (query == null || query.trim().isEmpty()) {
            return Collections.emptyList();
        }
        return questionAnswerService.getSuggestions(query); // Fetch suggestions from the service
    }

    @PostMapping("/api/question/add")
    public void addQuestion(@RequestBody Question question) {
        questionAnswerService.addQuestionData(question);
    }

    @PostMapping("/api/answer/add")
    public void addAnswer(@RequestBody Answer answer) {
        questionAnswerService.addAnswerData(answer);
    }

    @DeleteMapping("/api/del/{qid}/{aid}")
    public String deleteStudent(@PathVariable Long qid ,@PathVariable Long aid) {
        questionAnswerService.deleteQuestion(qid);  // Call the service method to delete the student
        questionAnswerService.deleteAnswer(aid);
        return "deleted.";
    }
}
