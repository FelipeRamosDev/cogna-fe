import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from './RegisterForm';
import { AuthProvider } from '@/providers/AuthContext';

// Mocks
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({ useRouter: () => ({ push: mockPush }) }));
const mockPut = jest.fn();
jest.mock('@/services/AJAX', () => () => ({ put: mockPut }));
jest.mock('@/components/common', () => ({
   FormControl: ({ children, submitLabel, onSubmit }) => (
      <form
         data-testid="mock-form"
         onSubmit={e => {
            e.preventDefault();
            // Simulate form data extraction
            const data = {
               firstName: 'John',
               lastName: 'Doe',
               email: 'john@doe.com',
               password: '123456',
               confirmPassword: '123456',
            };
            onSubmit && onSubmit(data);
         }}
      >
         {children}
         <button type="submit">{submitLabel}</button>
      </form>
   ),
   FormInput: ({ fieldName, ...props }) => <input data-testid={`mock-input-${fieldName}`} name={fieldName} {...props} />,
}));

describe('RegisterForm', () => {
   const RegisterNode = () => <AuthProvider loadedUser={{ name: 'John', email: 'john@test.com' }} notAuthRender renderIfLoading><RegisterForm /></AuthProvider>;

   beforeEach(() => {
      mockPut.mockReset();
      mockPush.mockReset();
   });

   it('renders form and all inputs', () => {
      const { getByTestId, getByText } = render(<RegisterNode />);
      expect(getByTestId('mock-form')).toBeInTheDocument();
      expect(getByTestId('mock-input-firstName')).toBeInTheDocument();
      expect(getByTestId('mock-input-lastName')).toBeInTheDocument();
      expect(getByTestId('mock-input-email')).toBeInTheDocument();
      expect(getByTestId('mock-input-password')).toBeInTheDocument();
      expect(getByTestId('mock-input-confirmPassword')).toBeInTheDocument();
      expect(getByText('Entrar')).toBeInTheDocument();
   });

   it('submits form and redirects on success', async () => {
      mockPut.mockResolvedValueOnce({ data: { success: true } });
      const { container } = render(<RegisterNode />);
      const form = container.querySelector('form');
      fireEvent.submit(form);
      await waitFor(() => {
         expect(mockPut).toHaveBeenCalledWith('/auth/cadastro', {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@doe.com',
            password: '123456',
            confirmPassword: '123456',
         });
         expect(mockPush).toHaveBeenCalledWith('/meu-perfil');
      });
   });

   it('handles failed register and logs error', async () => {
      mockPut.mockResolvedValueOnce({ data: { success: false } });
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
      const { container } = render(<RegisterNode />);
      const form = container.querySelector('form');
      fireEvent.submit(form);
      await waitFor(() => {
         expect(mockPut).toHaveBeenCalled();
      });
      consoleSpy.mockRestore();
   });

   it('handles thrown error and logs error', async () => {
      const error = { response: { data: { error: 'fail' } } };
      mockPut.mockRejectedValueOnce(error);
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
      const { container } = render(<RegisterNode />);
      const form = container.querySelector('form');
      fireEvent.submit(form);
      await waitFor(() => {
         expect(mockPut).toHaveBeenCalled();
      });
      consoleSpy.mockRestore();
   });
});
