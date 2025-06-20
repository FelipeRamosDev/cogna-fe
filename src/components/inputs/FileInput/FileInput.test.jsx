import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FileInput from './FileInput';

jest.mock('@/helpers/parse', () => ({
   parseCSS: (...args) => args.filter(Boolean).join(' '),
   parsePadding: (p) => `p-${p}`,
   parseRadius: (r) => `r-${r}`,
}));

describe('FileInput', () => {
   it('renders with default label and description', () => {
      const { getByText, container } = render(<FileInput id="test-file" />);
      expect(getByText('Escolha um arquivo')).toBeInTheDocument();
      expect(getByText(/Arraste ou clique/)).toBeInTheDocument();
      // Find input by id since label text is not directly associated
      const input = container.querySelector('input[type="file"]#test-file');
      expect(input).toBeInTheDocument();
   });

   it('renders with file name when fileValue is provided', () => {
      const file = { name: 'products.json' };
      const { getByText } = render(<FileInput id="test-file" fileValue={file} />);
      expect(getByText('products.json')).toBeInTheDocument();
   });

   it('calls onChange with file when file is selected', () => {
      const onChange = jest.fn();
      const { container } = render(<FileInput id="test-file" onChange={onChange} />);
      const input = container.querySelector('input[type="file"]#test-file');
      const file = new File(['{}'], 'products.json', { type: 'application/json' });
      fireEvent.change(input, { target: { files: [file] } });
      expect(onChange).toHaveBeenCalledWith(file, expect.any(Object));
   });

   it('applies custom className, padding, and radius', () => {
      const { container } = render(
         <FileInput id="test-file" className="custom" padding="l" radius="xl" />
      );
      expect(container.firstChild.className).toContain('custom');
      expect(container.firstChild.className).toContain('p-l');
      expect(container.firstChild.className).toContain('r-xl');
      expect(container.firstChild.className).toContain('FileInput');
   });
});
