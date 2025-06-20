import React from 'react';
import { render } from '@testing-library/react';
import ProductTile from './ProductTile';

jest.mock('@/components/common', () => ({
   Card: ({ children, ...props }) => <div data-testid="mock-card" {...props}>{children}</div>,
   ImagePlaceholder: () => <div data-testid="mock-image-placeholder">Image</div>,
}));
jest.mock('@/helpers/parse', () => ({
   parseCSS: (...args) => args.filter(Boolean).join(' '),
   parseMoney: (value) => `R$ ${value}`,
}));

describe('ProductTile', () => {
   const product = {
      name: 'Produto Teste',
      price: 99.99,
      category: 'Categoria X',
      description: 'Descrição do produto.'
   };

   it('renders nothing if no product is provided', () => {
      const { container } = render(<ProductTile />);
      expect(container.firstChild).toBeNull();
   });

   it('renders product info correctly', () => {
      const { getByTestId, getByText } = render(<ProductTile product={product} className="custom" />);
      expect(getByTestId('mock-card')).toBeInTheDocument();
      expect(getByTestId('mock-image-placeholder')).toBeInTheDocument();
      expect(getByText('Produto Teste')).toBeInTheDocument();
      expect(getByText('R$ 99.99')).toBeInTheDocument();
      expect(getByText('Categoria X')).toBeInTheDocument();
      expect(getByText('Descrição do produto.')).toBeInTheDocument();
      expect(getByTestId('mock-card').className).toContain('ProductTile');
      expect(getByTestId('mock-card').className).toContain('custom');
   });
});
