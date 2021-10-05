import SecondsTimePicker from '@components/ui/time-picker/time-picker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockData = {
  changeValueTimer: () => {},
};

describe('Timepicker', () => {
  it('should display default value', () => {
    const { getByText, getByDisplayValue } = render(
      <SecondsTimePicker changeValueTimer={mockData.changeValueTimer} />
    );
    screen.debug();
    const labelTimer = getByText(/Set min, sec/i);
    const inputTimer = getByDisplayValue(/02:20/i);
    expect(labelTimer).toBeVisible();
    expect(inputTimer).toBeInTheDocument();
  });

  it('should change view of timer', async () => {
    const { findByText, getByDisplayValue } = render(
      <SecondsTimePicker changeValueTimer={mockData.changeValueTimer} />
    );
    const lablTimer = getByDisplayValue(/02:20/i);
    userEvent.type(lablTimer, '06:30');
    const btnCancel = await findByText(/CANCEL/i);
    expect(btnCancel).toBeInTheDocument();
  });
});
