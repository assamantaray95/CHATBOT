import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello, how can I help you today?' }
  ]); // Initial greeting message
  const [userInput, setUserInput] = useState(''); // User input state
  const [isBotTyping, setIsBotTyping] = useState(false); // Bot typing state
  const [questionSuggestions, setQuestionSuggestions] = useState([]); // To hold the question suggestions
  const [currentPage, setCurrentPage] = useState(0); // To track the page or offset for loading questions
  const [questionsPerPage] = useState(3); // Number of questions to load at a time
  const [questionSearch, setQuestionSearch] = useState([]); // To store search suggestions

  // Function to fetch questions and answers from the API
  const fetchQuestionsAndAnswers = () => {
    fetch('http://localhost:8080/api/chat/questions-with-answers')
      .then((response) => response.json())
      .then((data) => {
        setQuestionSuggestions(data); // Save question suggestions
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  // Function to handle "Load More" functionality
  const loadMoreQuestions = () => {
    setCurrentPage(currentPage + 1); // Increment the current page to load next set of questions
  };

  // Function to get questions to display based on pagination
  const getQuestionsToDisplay = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    return questionSuggestions.slice(startIndex, endIndex);
  };

  // Handle user message sending
  const handleSendMessage = () => {
    if (!userInput) return;

    // Add user's message to the chat
    const newMessages = [...messages, { sender: 'user', text: userInput }];
    
    // Set bot typing to true to show the typing indicator
    setIsBotTyping(true);

    // Simulate bot response after a delay (e.g., 1.5 seconds)
    setTimeout(() => {
      let botResponse = '';
      if (userInput.toLowerCase() === 'hello') {
        botResponse = 'Hello! I\'m here to assist you with the questions listed below.';
      } else if (userInput.toLowerCase() === 'hii' || userInput.toLowerCase() === 'hi') {
        botResponse = 'Hii! I can assist you with the questions mentioned below.';
      } else {
        botResponse = 'I\'m sorry, I didn\'t quite understand that. Can you please ask me from below questions?';
      }

      // Add bot's response to the chat
      setMessages([...newMessages, { sender: 'bot', text: botResponse }]);
      setIsBotTyping(false); // Set bot typing to false to hide the typing indicator

      // Fetch questions and answers after user message is processed
      fetchQuestionsAndAnswers();

    }, 3000); // 1.5 seconds delay for the bot's response
    setUserInput(''); // Clear input field
  };

  const handleSugQuestionClick = (quetionId , question , answer) => {
    const questionData = {
      quetionId : quetionId,
      question : question,
      answer : answer
    };
    
    if (questionData) {
      setMessages([ 
        ...messages, 
        { sender: 'user', text: questionData.question }, // Add clicked question
        { sender: 'bot', text: questionData.answer } // Add corresponding answer
      ]);
      setQuestionSearch([]); // Clear search suggestions after selecting a question
    }
  }

  // Handle question click to display answer
  const handleQuestionClick = (questionId) => {
    const questionData = questionSuggestions.find(
      (question) => question.questionId === questionId
    );
    //alert(questionData);
    //console.log(questionData);
    if (questionData) {
      setMessages([ 
        ...messages, 
        { sender: 'user', text: questionData.questionName }, // Add clicked question
        { sender: 'bot', text: questionData.answerTexts[0] } // Add corresponding answer
      ]);
      setQuestionSearch([]); // Clear search suggestions after selecting a question
    }
  };

  // Fetch question suggestions from the API when the user types
  const fetchQuestionSearch = (query) => {
    if (!query || query.trim().length === 0) {
      setQuestionSearch([]); // Clear suggestions if the input is empty
      return;
    } else {
    fetch(`http://localhost:8080/api/question/suggestions?query=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setQuestionSearch(data); // Set the question suggestions
      })
      .catch((error) => console.error('Error fetching suggestions:', error));
    }
  };

  // Trigger fetching suggestions as the user types
  useEffect(() => {
    if (userInput.trim() === '') {
      setQuestionSearch([]); // Clear suggestions if input is empty
    } else {
      fetchQuestionSearch(userInput); // Fetch suggestions if input is not empty
    }
  }, [userInput]);
  

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card" style={{ width: '40rem' }}>
            <div style={{ marginTop: '-1rem', backgroundColor: '#0a294f', padding: '1rem', color: '#fff' }}>
              <img src={logo} style={{ width: '40px', height: '40px', borderRadius: '10px', float: 'left' }} />
              <div className="mt-2" style={{ marginRight: '1.5rem' }}>STATE TRANSPORT AUTHORITY</div>
            </div>

            <div className="card-body" style={{ maxHeight: '300px', overflowY: 'auto', padding: '10px', height: '400px', flexDirection: 'column' }}>
              {/* Render Chatbot messages */}
              {messages.map((msg, index) => (
                <div key={index} className={`d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'} mb-3`}>
                  <div className={msg.sender === 'user' ? 'bg-primary text-white p-3 rounded' : 'bg-light text-container p-3 rounded'}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Show typing indicator if the bot is typing */}
              {isBotTyping && (
                <div className="d-flex justify-content-start mb-3">
                  <div className="bg-light p-3 rounded" style={{ maxWidth: '100%' }}>
                    <span className="typing-effect">Bot is typing...</span>
                  </div>
                </div>
              )}

              {/* Render paginated questions */}
              {questionSuggestions.length > 0 && !isBotTyping && (
                <div>
                  {getQuestionsToDisplay().map((qa) => (
                    <div key={qa.questionId} className="d-flex justify-content-start mb-3">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => handleQuestionClick(qa.questionId)}
                      >
                        {qa.questionName}
                      </button>
                    </div>
                  ))}

                  {/* Load More and Previous Buttons */}
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-sm btn-primary" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage <= 0}>
                      <i className="fa fa-arrow-left"></i>
                    </button>
                    <button
                      className="btn mx-2 btn-sm btn-primary"
                      onClick={loadMoreQuestions} 
                      disabled={questionSuggestions.length <= (currentPage + 1) * questionsPerPage}
                    >
                      <i className="fa fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="card-footer">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type your message..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)} // Update user input
                  aria-label="Type your message..."
                  aria-describedby="send-button"
                />
                <button className="btn btn-primary" id="send-button" onClick={handleSendMessage}>
                  <i className="fa fa-paper-plane"></i>
                </button>
              </div>
              {/* Display search suggestions below the input field */}
              {questionSearch.length > 0 && (
                <div className="suggestions-dropdown">
                  {questionSearch.map((qa) => (
                    <div key={qa.questionId} className="suggestion-item">
                      <button
                        className="btn btn-outline-secondary my-2"
                        onClick={() => handleSugQuestionClick(qa.id , qa.questionName , qa.answerTexts)}
                      >
                        {qa.questionName}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
