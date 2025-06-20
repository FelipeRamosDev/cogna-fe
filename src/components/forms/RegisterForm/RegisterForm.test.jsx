import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from './RegisterForm';

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
   beforeEach(() => {
      mockPut.mockReset();
      mockPush.mockReset();
   });

   it('renders form and all inputs', () => {
      const { getByTestId, getByText } = render(<RegisterForm />);
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
      const { getByTestId } = render(<RegisterForm />);
      fireEvent.submit(getByTestId('mock-form'));
      await waitFor(() => {
         expect(mockPut).toHaveBeenCalledWith('/auth/cadastro', {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@doe.com',
            password: '123456',
            confirmPassword: '123456',
         });
         expect(mockPush).toHaveBeenCalledWith('/');
      });
   });

   it('handles failed register and logs error', async () => {
      mockPut.mockResolvedValueOnce({ data: { success: false } });
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
      const { getByTestId } = render(<RegisterForm />);
      fireEvent.submit(getByTestId('mock-form'));
      await waitFor(() => {
         expect(mockPut).toHaveBeenCalled();
         expect(consoleSpy).toHaveBeenCalled();
      });
      consoleSpy.mockRestore();
   });

   it('handles thrown error and logs error', async () => {
      const error = { response: { data: { error: 'fail' } } };
      mockPut.mockRejectedValueOnce(error);
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
      const { getByTestId } = render(<RegisterForm />);
      fireEvent.submit(getByTestId('mock-form'));
      await waitFor(() => {
         expect(mockPut).toHaveBeenCalled();
         expect(consoleSpy).toHaveBeenCalledWith(error.response.data);
      });
      consoleSpy.mockRestore();
   });
});
