// Selector to get authentication status
const getIsAuthenticated = state => state.auth.isAuthenticated;

// // Selectors to get user info
const getUserName = state => state.auth.user.name;
const getUserEmail = state => state.auth.user.email;

export { getIsAuthenticated, getUserName, getUserEmail };
