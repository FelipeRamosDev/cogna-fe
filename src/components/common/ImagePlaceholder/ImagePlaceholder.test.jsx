import React from 'react';
import { render, screen } from '@testing-library/react';
import ImagePlaceholder from './ImagePlaceholder';

jest.mock('..', () => ({
   Button: ({ fullwidth, ...props }) => <button {...props}>{props.children}</button>
}));

describe('ImagePlaceholder component', () => {
   beforeAll(() => {
      jest.spyOn(console, 'error').mockImplementation((msg) => {
         if (msg.includes('fullwidth')) return;
         // @ts-ignore
         console._errorOriginal(msg);
      });
   });

   it('renders the placeholder image', () => {
      render(<ImagePlaceholder />);
      const img = screen.getByRole('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('alt', 'Image Placeholder');
   });

   it('applies the ImagePlaceholder class to the wrapper', () => {
      render(<ImagePlaceholder />);
      const wrapper = document.querySelector('.ImagePlaceholder');
      expect(wrapper).toBeInTheDocument();
   });

   it('img uses objectFit and objectPosition styles', () => {
      render(<ImagePlaceholder />);
      const img = screen.getByRole('img');
      expect(img.style.objectFit).toBe('cover');
      expect(img.style.objectPosition).toBe('center');
   });
});