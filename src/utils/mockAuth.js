// Mock user data for testing
const mockUsers = [
    {
      id: 'c1',
      email: 'client@test.com',
      password: 'test123',
      companyName: 'Test Company',
      type: 'client'
    },
    {
      id: 'f1',
      email: 'freelancer@test.com',
      password: 'test123',
      skillset: 'Full Stack Development',
      type: 'freelancer'
    },
    {
      id: 'a1',
      email: 'admin@test.com',
      password: 'admin123',
      type: 'admin'
    },
    {
      id: 'c2',
      email: 'test.client@test.com',
      password: 'test123',
      companyName: 'Test Client Company',
      type: 'client'
    },
    {
      id: 'f2',
      email: 'test.freelancer@test.com',
      password: 'test123',
      skillset: 'Web Development',
      type: 'freelancer'
    }
  ];
  
  // Mock authentication service
  export const mockLogin = (email, password, userType) => {
    return new Promise((resolve, reject) => {
      const user = mockUsers.find(
        u => u.email === email && u.password === password && u.type === userType
      );
  
      if (user) {
        const { password, ...userWithoutPassword } = user;
        const mockToken = btoa(JSON.stringify(userWithoutPassword));
  
        setTimeout(() => {
          resolve({
            user: userWithoutPassword,
            token: mockToken
          });
        }, 500);
      } else {
        setTimeout(() => {
          reject(new Error('Invalid credentials'));
        }, 500);
      }
    });
  };
  
  export const getMockCurrentUser = () => {
    const userStr = localStorage.getItem('mockUser');
    return userStr ? JSON.parse(userStr) : null;
  };
  
  export const setMockUser = (user) => {
    if (user) {
      localStorage.setItem('mockUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('mockUser');
    }
  };
  
  export const mockLogout = () => {
    localStorage.removeItem('mockUser');
    localStorage.removeItem('mockToken');
  };
  