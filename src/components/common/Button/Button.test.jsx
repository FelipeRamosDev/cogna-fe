import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

// Mock the parse helpers to return their input for easier className assertions
jest.mock('@/helpers/parse', () => ({
   parseCSS: (...args) => args.filter(Boolean).join(' '),
   parsePadding: (p) => `padding-${p}`,
   parseRadius: (r) => `radius-${r}`,
}));

describe('Button component', () => {
   it('renders with default props', () => {
      render(<Button>Click me</Button>);
      const btn = screen.getByRole('button', { name: /click me/i });
      expect(btn).toBeInTheDocument();
      expect(btn.className).toMatch(/Button/);
      expect(btn.className).toMatch(/filled/);
      expect(btn.className).toMatch(/primary/);
      expect(btn.className).toMatch(/padding-s/);
      expect(btn.className).toMatch(/radius-s/);
   });

   it('applies custom className', () => {
      render(<Button className="my-custom-class">Test</Button>);
      const btn = screen.getByRole('button', { name: /test/i });
      expect(btn.className).toMatch(/my-custom-class/);
   });

   it('applies fullwidth class when fullwidth is true', () => {
      render(<Button fullwidth>Full</Button>);
      const btn = screen.getByRole('button', { name: /full/i });
      expect(btn.className).toMatch(/fullwidth/);
   });

   it('applies variant and color classes', () => {
      render(<Button variant="outlined" color="secondary">Outlined</Button>);
      const btn = screen.getByRole('button', { name: /outlined/i });
      expect(btn.className).toMatch(/outlined/);
      expect(btn.className).toMatch(/secondary/);
   });

   it('applies custom padding and radius', () => {
      render(<Button padding="l" radius="full">Custom</Button>);
      const btn = screen.getByRole('button', { name: /custom/i });
      expect(btn.className).toMatch(/padding-l/);
      expect(btn.className).toMatch(/radius-full/);
   });

   it('calls onClick when clicked', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click</Button>);
      const btn = screen.getByRole('button', { name: /click/i });
      fireEvent.click(btn);
      expect(handleClick).toHaveBeenCalledTimes(1);
   });

   it('renders children', () => {
      render(<Button><span>Child</span></Button>);
      expect(screen.getByText('Child')).toBeInTheDocument();
   });
});