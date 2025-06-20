import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';

// Mocks
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({ useRouter: () => ({ push: mockPush }) }));
const mockPost = jest.fn();
jest.mock('@/services/AJAX', () => () => ({ post: mockPost }));
jest.mock('@/components/common', () => ({
   FormControl: ({ children, submitLabel, onSubmit }) => (
      <form
         data-testid="mock-form"
         onSubmit={e => {
            e.preventDefault();
            // Simulate form data extraction
            const data = { email: 'test@email.com', password: '123456' };
            onSubmit && onSubmit(data);
         }}
      >
         {children}
         <button type="submit">{submitLabel}</button>
      </form>
   ),
   FormInput: ({ fieldName, ...props }) => <input data-testid={`mock-input-${fieldName}`} name={fieldName} {...props} />,
}));

describe('LoginForm', () => {
   beforeEach(() => {
      mockPost.mockReset();
      mockPush.mockReset();
   });

   it('renders form and inputs', () => {
      const { getByTestId, getByText } = render(<LoginForm />);
      expect(getByTestId('mock-form')).toBeInTheDocument();
      expect(getByTestId('mock-input-email')).toBeInTheDocument();
      expect(getByTestId('mock-input-password')).toBeInTheDocument();
      expect(getByText('Entrar')).toBeInTheDocument();
   });

   it('submits form and redirects on success', async () => {
      mockPost.mockResolvedValueOnce({ data: { success: true } });
      const { getByTestId } = render(<LoginForm />);
      fireEvent.submit(getByTestId('mock-form'));
      await waitFor(() => {
         expect(mockPost).toHaveBeenCalledWith('/auth/login', { email: 'test@email.com', password: '123456' });
         expect(mockPush).toHaveBeenCalledWith('/');
      });
   });

   it('handles failed login and logs error', async () => {
      const error = { response: { data: { error: 'fail' } } };
      mockPost.mockResolvedValueOnce({ data: { success: false } });
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
      const { getByTestId } = render(<LoginForm />);
      fireEvent.submit(getByTestId('mock-form'));
      await waitFor(() => {
         expect(mockPost).toHaveBeenCalled();
         expect(consoleSpy).toHaveBeenCalled();
      });
      consoleSpy.mockRestore();
   });

   it('handles thrown error and logs error', async () => {
      const error = { response: { data: { error: 'fail' } } };
      mockPost.mockRejectedValueOnce(error);
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
      const { getByTestId } = render(<LoginForm />);
      fireEvent.submit(getByTestId('mock-form'));
      await waitFor(() => {
         expect(mockPost).toHaveBeenCalled();
         expect(consoleSpy).toHaveBeenCalledWith(error.response.data);
      });
      consoleSpy.mockRestore();
   });
});
