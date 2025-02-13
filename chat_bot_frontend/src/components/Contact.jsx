
const Contact = () => {

    return (
        <>
          <div className="contact-page mt-5">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="card shadow p-3">
                    <div className="card-body">
                      <h2 className="text-center text-primary mb-3">Contact Us</h2>
                      <p className="text-center mb-4">We would love to hear from you! Please use the form below to get in touch with us.</p>
                      <form action="submit_form.php" method="POST">
                        <div className="form-group mb-4">
                          <label for="name">Full Name</label>
                          <input type="text" className="form-control" id="name" name="name" placeholder="Your Name" />
                        </div>
                        <div className="form-group mb-4">
                          <label for="email">Email Address</label>
                          <input type="email" className="form-control" id="email" name="email" placeholder="Your Email" />
                        </div>
                        <div className="form-group mb-4">
                          <label for="message">Your Message</label>
                          <textarea className="form-control" id="message" name="message" rows="5" placeholder="Your Message" required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mt-2"><i className="fa fa-arrow-circle-right me-1"></i> Send Message</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
    );
}

export default Contact;