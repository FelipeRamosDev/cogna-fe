import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ImportContent from './ImportContent';

// Mocks
jest.mock('next/navigation', () => ({ useRouter: () => ({ push: jest.fn() }) }));
jest.mock('@/components/common', () => ({
   Container: ({ children, ...props }) => <div data-testid="mock-container" {...props}>{children}</div>,
   Button: ({ children, fullwidth, isLoading, ...props }) => (
      <button
         data-testid="mock-button"
         {...props}
         data-fullwidth={!!fullwidth}
         disabled={!!props.disabled || !!isLoading}
      >
         {children}
      </button>
   ),
}));
jest.mock('@/components/inputs', () => ({
   FileInput: ({ fileValue, onChange, ...props }) => (
      <input
         data-testid="mock-file-input"
         type="file"
         onChange={e => onChange && onChange(e.target.files ? e.target.files[0] : null)}
         {...props}
      />
   ),
}));

const mockPost = jest.fn();
jest.mock('@/services/AJAX', () => () => ({ post: mockPost }));

describe('ImportContent', () => {
   beforeEach(() => {
      mockPost.mockReset();
   });

   it('renders all static content', () => {
      const { getByText, getByTestId } = render(<ImportContent data-testid="mock-container" />);
      expect(getByTestId('mock-container')).toBeInTheDocument();
      expect(getByText('Importar Produtos')).toBeInTheDocument();
      expect(getByText('Carregue seus produtos em um JSON para importá-los.')).toBeInTheDocument();
      expect(getByText('Exemplo de JSON')).toBeInTheDocument();
      expect(getByTestId('mock-file-input')).toBeInTheDocument();
      expect(getByTestId('mock-button')).toBeInTheDocument();
   });

   it('calls ajax.post and router.push on successful import', async () => {
      mockPost.mockResolvedValueOnce({ data: { success: true } });
      const push = jest.fn();
      jest.spyOn(require('next/navigation'), 'useRouter').mockReturnValue({ push });
      const { getByTestId } = render(<ImportContent />);
      const file = new File(['{}'], 'products.json', { type: 'application/json' });
      // Simulate file selection
      fireEvent.change(getByTestId('mock-file-input'), { target: { files: [file] } });
      // Submit form
      fireEvent.submit(getByTestId('mock-file-input').closest('form'));
      await waitFor(() => {
         expect(mockPost).toHaveBeenCalledWith('/produto/importar', expect.any(FormData));
         expect(push).toHaveBeenCalledWith('/');
      });
   });

   it('shows loading state and disables button during import', async () => {
      let resolve;
      mockPost.mockImplementation(() => new Promise(r => { resolve = r; }));
      const { getByTestId, getByText } = render(<ImportContent />);
      const file = new File(['{}'], 'products.json', { type: 'application/json' });
      fireEvent.change(getByTestId('mock-file-input'), { target: { files: [file] } });
      fireEvent.submit(getByTestId('mock-file-input').closest('form'));
      expect(getByTestId('mock-button')).toBeDisabled();
      expect(getByText('Importando...')).toBeInTheDocument();
      resolve({ data: { success: true } });
      // Do not check for button enabled after redirect
   });

   it('handles failed import and resets file', async () => {
      mockPost.mockRejectedValueOnce({ response: { data: { error: 'fail' } } });
      const { getByTestId } = render(<ImportContent />);
      const file = new File(['{}'], 'products.json', { type: 'application/json' });
      fireEvent.change(getByTestId('mock-file-input'), { target: { files: [file] } });
      fireEvent.submit(getByTestId('mock-file-input').closest('form'));
      await waitFor(() => {
         expect(mockPost).toHaveBeenCalled();
         // FileInput resets to empty string after error
         expect(getByTestId('mock-file-input').value).toBe('');
      });
   });
});
