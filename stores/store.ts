import getHoursAndMinutesFormatted from '@/utils/getHoursAndMinutesFormatted';
import { create } from 'zustand';

interface Message {
  content: string;
  isUser: boolean;
  hour?: string
}

interface Store {
  messages: Message[];
  hasUserSentMessage: boolean;
  counterUserMessages: number;
  hasUserEndedChat: boolean;
  hasUserNeedsToChooseContinueOrNot: boolean;
  openRatingModal:boolean,
  addMessage: (message:Message) => void;
  setUserEndedChat: () => void;
  sethasUserNeedsToChooseContinueOrNot: (flag: boolean) => void;
  setOpenRatingModal: (flag: boolean) => void;
  resetStore: () => void;
}

const useStore = create<Store>((set) => ({
  messages: [],
  hasUserSentMessage: false,
  counterUserMessages: 0,
  hasUserEndedChat: false,
  hasUserNeedsToChooseContinueOrNot:false,
  openRatingModal:false,
  addMessage: ({ content, isUser }: Omit<Message, 'hour'>) =>
    set((state) => {
      const hour = getHoursAndMinutesFormatted(); 
      const newMessage = { content, isUser, hour }; 
      const newMessages = [...state.messages, newMessage]; 
      return { 
        messages: newMessages,
        hasUserSentMessage: newMessages.some(msg => msg.isUser),
        counterUserMessages: newMessages.filter(msg => msg.isUser).length
      };
    }),
  setUserEndedChat: () => 
    set(() => ({ hasUserEndedChat: true })),
  setOpenRatingModal: (flag) => 
    set(() => ({ openRatingModal: flag })),
  sethasUserNeedsToChooseContinueOrNot: (flag) => 
    set(() => ({ hasUserNeedsToChooseContinueOrNot: flag })),
  resetStore: () =>  
    set(() => ({
      messages: [],
      hasUserSentMessage: false,
      counterUserMessages: 0,
      hasUserEndedChat: false, 
      hasUserNeedsToChooseContinueOrNot:false,
      openRatingModal:false,
    })),
}));

export default useStore;
