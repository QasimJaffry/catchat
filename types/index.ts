// types/index.ts
export interface User {
  uid: string;
  email: string;
  displayName?: string;
}

export interface Message {
  text: string;
  createdAt: Date;
  senderId: string;
}

export interface Chat {
  id: string;
  name: string;
  messages: Message[];
}

export interface Character {
  id: string;
  name: string;
  scenario: string;
}
