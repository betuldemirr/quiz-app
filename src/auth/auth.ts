const USER_STORAGE_KEY = 'user';
const IS_LOGGED_IN_KEY = 'isLoggedIn';

export const login = (username: string): boolean => {
     const existingUser = localStorage.getItem(USER_STORAGE_KEY);

     if (!existingUser) {
          console.error('No user found. Please register first.');
          return false;
     }

     const user = JSON.parse(existingUser);

     if (user.username === username) {
          localStorage.setItem(IS_LOGGED_IN_KEY, 'true');
          return true;
     } else {
          console.error('Invalid credentials. Username does not match.');
          return false;
     }
};

export const logout = (): void => {
     localStorage.removeItem(IS_LOGGED_IN_KEY);
};