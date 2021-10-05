import { render } from '@testing-library/react';

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
