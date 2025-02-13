
// Function to check if the user is authenticated
const isAuthenticated = () => {
    return localStorage.getItem('authToken');  // Modify this as per your auth logic
};

export default isAuthenticated;