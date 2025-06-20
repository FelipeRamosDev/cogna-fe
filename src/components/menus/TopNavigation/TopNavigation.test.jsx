import React from 'react';
import { render } from '@testing-library/react';
import TopNavigation from './TopNavigation';

jest.mock('next/link', () => ({
   __esModule: true,
   default: ({ href, children, ...props }) => <a href={href} data-testid="mock-link" {...props}>{children}</a>,
}));
jest.mock('@/components/common', () => ({
   Button: ({ children, ...props }) => <button data-testid="mock-button" {...props}>{children}</button>,
}));

const mockUseAuth = jest.fn();
jest.mock('@/providers/AuthContext', () => ({
   useAuth: () => mockUseAuth(),
}));

describe('TopNavigation', () => {
   beforeEach(() => {
      mockUseAuth.mockReset();
   });

   it('renders Home link always', () => {
      mockUseAuth.mockReturnValue({ user: null });
      const { getAllByTestId, getByText } = render(<TopNavigation />);
      const links = getAllByTestId('mock-link');
      expect(links[0].getAttribute('href')).toBe('/');
      expect(getByText('Home')).toBeInTheDocument();
   });

   it('renders Importar link if user is present', () => {
      mockUseAuth.mockReturnValue({ user: { name: 'Test' } });
      const { getAllByTestId, getByText } = render(<TopNavigation />);
      expect(getByText('Importar')).toBeInTheDocument();
      const links = getAllByTestId('mock-link');
      expect(links.some(link => link.getAttribute('href') === '/produto/importar')).toBe(true);
   });

   it('renders Login button if user is not present', () => {
      mockUseAuth.mockReturnValue({ user: null });
      const { getAllByTestId, getByTestId, getByText } = render(<TopNavigation />);
      expect(getByTestId('mock-button')).toBeInTheDocument();
      expect(getByText('Login')).toBeInTheDocument();
      const links = getAllByTestId('mock-link');
      expect(links.some(link => link.getAttribute('href') === '/login')).toBe(true);
   });
});
