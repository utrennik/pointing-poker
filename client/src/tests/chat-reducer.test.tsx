import { setMessages } from '@src/redux/actions';
import { chatReducer } from '@src/redux/reducers/chat-reducer';

describe('Chat-reducer', () => {
  const mockState = {
    messages: [],
  };
  const mockData = [
    {
      messageID: '1',
      messageTime: '---',
      room: 'room',
      userID: 'id1',
      message: 'Hello',
    },
    {
      messageID: '2',
      messageTime: '---',
      room: 'room',
      userID: 'id2',
      message: 'Hello',
    },
  ];

  it('should change state', () => {
    const messages = chatReducer(mockState, setMessages(mockData));
    expect(messages).not.toBe(mockState);
  });
});
