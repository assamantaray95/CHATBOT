import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ role: '', token: '', userName: '' });
  const [questionsAnswerPerPage] = useState(39); // Number of questions to load at a time
  const [questionAnswer, setQuestionAnswer] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  // Function to get questions to display based on pagination
  const getQuestionsAnswerToDisplay = () => {
    const startIndex = currentPage * questionsAnswerPerPage;
    const endIndex = startIndex + questionsAnswerPerPage;
    return questionAnswer.slice(0, endIndex);
  };

  useEffect(() => {
    // Get the role and token from localStorage
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('authToken');
    const firstName = localStorage.getItem('firstname');
    const lastName = localStorage.getItem('lastname');
    const userName = firstName+' '+lastName;
    
    if (role && token) {
      // If both role and token exist, set the user info in the state
      setUserInfo({ role, token, userName });
    } else {
      // If no role or token, redirect to login page (user is not authenticated)
      navigate('/');
    }
  }, [navigate]);

  // Logout function
  const logout = () => {
    // Remove the token and role from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    navigate('/');
  };

  // useEffect hook to fetch data when the component is mounted
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/chat/questions-with-answers")
      .then((response) => {
        setQuestionAnswer(response.data); // Store the API response in state
      })
      .catch((error) => {
        console.error("There was an error fetching the students data:", error);
      });
  }, []);
 
  // Load More function to fetch more data and append it
  const loadMore = () => {
      setCurrentPage((prevPage) => prevPage + 1);
      axios
        .get('http://localhost:8080/api/chat/questions-with-answers')
        .then((response) => {
          // Append the new data to the existing data (do not overwrite)
          setQuestionAnswer((prevData) => [...prevData, ...response.data]);
        })
        .catch((error) => {
          console.error('There was an error fetching the questions data:', error);
        });
  };

  const deleteQuestionAndAnswer = (qId , aId) => {
    axios.delete(`http://localhost:8080/api/del/${qId}/${aId}`)
      .then(response => {
        // If the delete is successful, remove the question-answer pair from the state
        setQuestionAnswer(prevData => 
          prevData.filter(item => !(item.questionId === qId && item.answerId === aId))
        );
        alert(`Question and answer with IDs ${qId} and ${aId} have been deleted.`);
      })
      .catch(error => {
        console.error('There was an error deleting the student!', error);
        alert('Failed to delete student.');
      });
  }

  return (
    <div>
      <div className='text-end mt-3'>
        { userInfo.role === 'admin' && (<Link to="/admin/add" className="btn btn-primary"><i className="fa fa-plus-circle me-1"></i> Add</Link>)}
        { userInfo.role === 'admin' && (<Link to="/user/register" className="btn mx-3 btn-success"><i className="fa fa-arrow-circle-right me-1"></i> Register</Link>)}
        <button onClick={logout} className="btn me-2 btn-danger"><i className="fa fa-sign-out me-1"></i> Log Out</button>
      </div>
      <h1 className='text-center'>{userInfo.userName}</h1>
      
      {/* Logout Button */}

      <div className="mt-4">
        <h3 style={{marginLeft: '3.4rem', marginBottom: '1rem'}}>Questions and Answers</h3>
        <div className='d-flex justify-content-center align-items-center min-vh-100'>
          <div className='col-md-11'>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Question ID</th>
                  <th>Question</th>
                  <th>Answers</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {getQuestionsAnswerToDisplay().map((item , index) => (
                  <tr key={item.questionId}>
                    <td>{index + 1}</td>
                    <td>{item.questionName}</td>
                    <td>
                      {item.answerTexts ? (
                        item.answerTexts.map((answer, index) => (
                          <div className='text-container' key={index}>{answer}</div>
                        ))
                      ) : (
                        <span>No answers available</span>
                      )}
                    </td>
                    <td>
                      <button className="btn btn-sm btn-danger" title="Delete" onClick={() => deleteQuestionAndAnswer(item.questionId, item.answerId)}><i className='fa fa-trash'></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Load More Button */}
        {questionAnswer.length > (currentPage + 1) * questionsAnswerPerPage && (
          <div className="text-center">
            <button onClick={loadMore} className="btn btn-primary">
              <i className='fa fa-arrow-circle-down me-1'></i>  Load More
            </button>
          </div>
        )}
        </div>
     
    </div>
  );
};

export default Dashboard;
