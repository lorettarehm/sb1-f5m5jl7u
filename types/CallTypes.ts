export type CallStatus = 'idle' | 'connecting' | 'active' | 'ending';

export type Language = 'pt-BR' | 'en-GB';

export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isUser: boolean;
  language: Language;
}

export interface CallRecord {
  id: string;
  startTime: Date;
  endTime?: Date;
  transcript: Message[];
  language: Language;
}