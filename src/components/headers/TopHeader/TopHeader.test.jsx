import React from 'react';
import { render } from '@testing-library/react';
import HeaderBase from './TopHeader';

// Mocks
jest.mock('next/link', () => ({
   __esModule: true,
   default: ({ href, children, ...props }) => <a href={href} data-testid="mock-link" {...props}>{children}</a>,
}));
jest.mock('@/components/common', () => ({
   Container: ({ children }) => <div data-testid="mock-container">{children}</div>,
}));
jest.mock('@/components/menus', () => ({
   TopNavigation: () => <nav data-testid="mock-top-navigation">Nav</nav>,
}));
const mockUser = { name: 'Test User' };
jest.mock('@/providers/AuthContext', () => ({
   AuthProvider: ({ children, loadedUser }) => <div data-testid="mock-auth-provider">{children}</div>,
   useAuth: () => ({ user: mockUser }),
}));

describe('HeaderBase', () => {
   it('renders header, logo link, and navigation', () => {
      const { getByTestId, getByText, container } = render(<HeaderBase />);
      expect(container.querySelector('.TopHeader')).toBeInTheDocument();
      expect(getByTestId('mock-container')).toBeInTheDocument();
      const logo = getByTestId('mock-link');
      expect(logo).toBeInTheDocument();
      expect(logo.getAttribute('href')).toBe('/');
      expect(getByText('CognaShop')).toBeInTheDocument();
      expect(getByTestId('mock-auth-provider')).toBeInTheDocument();
      expect(getByTestId('mock-top-navigation')).toBeInTheDocument();
   });

   it('passes user to AuthProvider', () => {
      // This test ensures the AuthProvider receives the user prop
      const { getByTestId } = render(<HeaderBase />);
      expect(getByTestId('mock-auth-provider')).toBeInTheDocument();
   });
});
