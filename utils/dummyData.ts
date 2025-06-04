import { Message } from '../types/CallTypes';

export const dummyTranscript: Message[] = [
  {
    id: '1',
    text: 'Hello, how can I help you today?',
    timestamp: new Date('2024-01-10T10:00:00Z'),
    speaker: 'agent',
  },
  {
    id: '2',
    text: 'I need help with my account settings.',
    timestamp: new Date('2024-01-10T10:00:15Z'),
    speaker: 'customer',
  },
  {
    id: '3',
    text: 'I can definitely help you with that. Which specific settings would you like to review?',
    timestamp: new Date('2024-01-10T10:00:30Z'),
    speaker: 'agent',
  }
];