import { filterIDfromURL, truncateString } from '@utils/stringUtils';

describe('utils functions', () => {
  const mockData = {
    string: '1234567890',
    number: 3,
    URL: '123_123_link/12345678',
  };

  it('should truncate string correctly', () => {
    const trString = truncateString(mockData.string, mockData.number);
    expect(trString).toHaveLength(6);
  });

  it('should filter string correctly', () => {
    const filterStr = filterIDfromURL(mockData.URL);

    expect(filterStr).toHaveLength(8);
  });
});
