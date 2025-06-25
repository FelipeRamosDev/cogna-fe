import React from 'react';
import { render } from '@testing-library/react';
import ProductContent from './ProductContent';

// Mocks
jest.mock('@/components/common', () => ({
   Container: ({ children }) => <div data-testid="mock-container">{children}</div>,
   Card: ({ children, ...props }) => <div data-testid="mock-card" {...props}>{children}</div>,
   ImagePlaceholder: () => <div data-testid="mock-image-placeholder">Image</div>,
   Button: ({ children, fullwidth, ...props }) => (
      <button data-testid="mock-button" data-fullwidth={!!fullwidth} {...props}>{children}</button>
   ),
}));
jest.mock('@/helpers/parse', () => ({
   parseMoney: (value) => `R$ ${value}`
}));
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() })
}));

describe('ProductContent', () => {
   const product = {
      name: 'Produto Teste',
      category: 'Categoria X',
      price: 123.45,
      description: 'Descrição do produto teste.'
   };

   it('renders all product details', () => {
      const { getByTestId, getByText } = render(<ProductContent product={product} />);
      expect(getByTestId('mock-container')).toBeInTheDocument();
      expect(getByTestId('mock-card')).toBeInTheDocument();
      expect(getByTestId('mock-image-placeholder')).toBeInTheDocument();
      expect(getByText('Categoria X / Produto Teste')).toBeInTheDocument();
      expect(getByText('Produto Teste')).toBeInTheDocument();
      expect(getByText('Preço:')).toBeInTheDocument();
      expect(getByText('R$ 123.45')).toBeInTheDocument();
      expect(getByTestId('mock-button')).toBeInTheDocument();
      expect(getByText('Adicionar ao Carrinho')).toBeInTheDocument();
      expect(getByText('Descrição:')).toBeInTheDocument();
      expect(getByText('Descrição do produto teste.')).toBeInTheDocument();
   });

   it('Button has fullwidth attribute', () => {
      const { getByTestId } = render(<ProductContent product={product} />);
      expect(getByTestId('mock-button').getAttribute('data-fullwidth')).toBe('true');
   });
});
