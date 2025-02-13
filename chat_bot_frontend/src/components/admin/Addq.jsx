import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Addq = () => {
    const navigate = useNavigate();

    // State variables for inputs
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    // State variables for error messages
    const [questionError, setQuestionError] = useState('');
    const [answerError, setAnswerError] = useState('');
    //const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Reset errors
        setQuestionError('');
        setAnswerError('');
    
        // Validation checks
        if (!question) {
            setQuestionError('Question is required');
        }
        if (!answer) {
            setAnswerError('Answer is required');
        }
    
        // If either question or answer is empty, do not proceed
        if (!question || !answer) return;
    
        try {
            const questionResponse = await axios.post('http://localhost:8080/api/question/add', {
                questionName: question
            });
            
            const answerResponse = await axios.post('http://localhost:8080/api/answer/add', {
                answerText: answer
            });
    
            navigate('/admin/dashboard');
    
            setQuestion('');
            setAnswer('');
    
            alert('Question and Answer added successfully!');
        } catch (error) {
            console.error('Error during submission:', error);
            alert('There was an error submitting your question and answer.');
        }
    };
    

    return (
        <>
        <div className="d-flex justify-content-center mt-4">
            <div style= {{ fontWeight: 'bold' }}>ADD NEW QUESTION AND ANSWER </div>
        </div>
        <div className="row justify-content-center">
            <div className="col-md-6">
                <form onSubmit={handleSubmit}>
                    <div className="card">
                        <div className='col-md-12'>
                            <label htmlFor='question' className='form-label'>Question</label>
                            <input type="text" className='form-control' id="question" value={question} onChange = {(e) => setQuestion(e.target.value)}></input>
                            {questionError && <div className='text-danger'>{questionError}</div>}
                        </div>
                        <div className='col-md-12 mt-3'>
                            <label htmlFor='answer' className='form-label'>Answer</label>
                            <textarea className='form-control' rows="5" id="answer" value={answer} onChange={(e) => setAnswer(e.target.value)}></textarea>
                            {answerError && <div className="text-danger">{answerError}</div>}
                        </div>
                        <div className='col-md-12 mt-4'>
                            <button type="submit" className='btn btn-sm mt-2 btn-outline-primary'><i className='fa fa-arrow-circle-right me-1'></i> Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default Addq;