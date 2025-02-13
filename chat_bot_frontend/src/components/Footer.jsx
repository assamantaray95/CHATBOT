

const Footer = () => {
    return (
        <>
        <footer className="footer bg-secondary mt-5 text-center text-light">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} My Company. All rights reserved.</p>
                <p>ChatBot Using spring and React</p>
            </div>
        </footer>
        </>
    );
}

export default Footer