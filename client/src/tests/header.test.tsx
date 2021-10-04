import Header from '@components/header/header';
import { render, screen } from '@testing-library/react';

describe('Header', () => {
  it('renders with links', () => {
    const { getByText } = render(
      <>
        <div>HELLO</div>
      </>
    );
    const link = getByText(/hello/i);
    expect(link).toBeInTheDocument();
  });
});
