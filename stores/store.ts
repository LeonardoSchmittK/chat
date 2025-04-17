import { create } from 'zustand';

interface Message {
  content: string;
  isUser: boolean;
}

interface Store {
  messages: Message[];
  hasUserSentMessage: boolean;
  counterUserMessages: number;
  hasUserEndedChat: boolean;
  hasUserNeedsToChooseContinueOrNot: boolean;
  openRatingModal:boolean,
  addMessage: (content: string, isUser: boolean) => void;
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
  addMessage: (content: string, isUser: boolean) => 
    set((state) => {
      const newMessages = [...state.messages, { content, isUser }];
      return { 
        messages: newMessages, 
        hasUserSentMessage: newMessages.length > 0,
        counterUserMessages: newMessages.length
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
