import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormProvider, { useForm } from './FormControl';
import { FormInput } from '..';
import { act } from '@testing-library/react';

describe('FormProvider', () => {
   it('renders children and submit button', () => {
      render(
         <FormProvider>
            <span>Child</span>
         </FormProvider>
      );
      expect(screen.getByText('Child')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
   });

   it('calls onSubmit with values and errors', async () => {
      const handleSubmit = jest.fn().mockReturnValue(Promise.resolve({ error: true }));
      render(
         <FormProvider initialValues={{ name: 'John' }} onSubmit={handleSubmit} submitLabel="Save">
            <FormInput fieldName='test1' type='text' />
         </FormProvider>
      );
      await act(async () => {
         fireEvent.click(screen.getByRole('button', { name: /save/i }));
      });
      expect(handleSubmit).toHaveBeenCalledWith({ name: 'John' }, {}, expect.any(Object));
   });

   it('updates values and errors, and resets form', () => {
      render(
         <FormProvider initialValues={{ name: 'John' }} onSubmit={jest.fn()}>
            <FormInput fieldName='test1' type='text' data-testid='test-input' />
         </FormProvider>
      );
      const input = screen.getByTestId('test-input');
      fireEvent.change(input, { target: { value: 'Jane' } });
      expect(input.value).toBe('Jane');
   });

   it('throws if useForm is used outside FormProvider', () => {
      function BrokenComponent() {
         useForm();
         return null;
      }
      expect(() => render(<BrokenComponent />)).toThrow('useForm must be used within a FormProvider');
   });
});
