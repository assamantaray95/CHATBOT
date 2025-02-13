import { Link } from "react-router-dom";

const About = () => {
      return (
        <>
          <div className="about-page mt-5">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="card shadow p-4">
                    <div className="card-body">
                      <h2 className="text-center text-primary mb-4">About Our Chatbot</h2>
                      <p className="text-center mb-4">
                        <strong>Welcome to our AI-powered chatbot!</strong> Our chatbot is designed to assist you with a variety of tasks,
                        from answering questions to providing personalized suggestions. It leverages natural language processing to ensure
                        smooth and interactive conversations.
                      </p>
                      <p className="mb-4">
                        The chatbot is always evolving and learning, which means it gets smarter over time. Whether you're looking for help,
                        need quick answers, or simply want to chat, our bot is here to support you 24/7.
                      </p>
                      <p className="mb-4">
                        If you have any questions or feedback, don't hesitate to <Link to="/about/contact" className="btn btn-primary">Contact Us <i className="fa fa-arrow-circle-right ms-1"></i></Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
}

export default About;