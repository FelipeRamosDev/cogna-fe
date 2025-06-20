import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginContent from './LoginContent';

// Mock child components
jest.mock('@/components/common', () => ({
   Container: ({ children }) => <div data-testid="mock-container">{children}</div>,
   Card: ({ children, className }) => <div data-testid="mock-card" className={className}>{children}</div>,
}));
jest.mock('@/components/forms', () => ({
   LoginForm: () => <div data-testid="mock-login-form">LoginForm</div>,
   RegisterForm: () => <div data-testid="mock-register-form">RegisterForm</div>,
}));

describe('LoginContent', () => {
   it('renders login form by default', () => {
      const { getByTestId, getByText } = render(<LoginContent />);
      expect(getByTestId('mock-container')).toBeInTheDocument();
      expect(getByTestId('mock-card')).toBeInTheDocument();
      expect(getByTestId('mock-login-form')).toBeInTheDocument();
      expect(getByText('Login de Usuário')).toBeInTheDocument();
      expect(getByText('Por favor, insira suas credenciais para continuar.')).toBeInTheDocument();
      expect(getByText('Não tem uma conta?')).toBeInTheDocument();
      expect(getByText('Registre-se')).toBeInTheDocument();
   });

   it('switches to register form when link is clicked', () => {
      const { getByText, getByTestId, queryByTestId } = render(<LoginContent />);
      fireEvent.click(getByText('Registre-se'));
      expect(getByTestId('mock-register-form')).toBeInTheDocument();
      expect(queryByTestId('mock-login-form')).not.toBeInTheDocument();
      expect(getByText('Já possui uma conta?')).toBeInTheDocument();
      expect(getByText('Fazer Login')).toBeInTheDocument();
   });

   it('switches back to login form when link is clicked from register', () => {
      const { getByText, getByTestId } = render(<LoginContent />);
      fireEvent.click(getByText('Registre-se'));
      fireEvent.click(getByText('Fazer Login'));
      expect(getByTestId('mock-login-form')).toBeInTheDocument();
      expect(getByText('Não tem uma conta?')).toBeInTheDocument();
   });
});
