import getHoursAndMinutesFormatted from '@/utils/getHoursAndMinutesFormatted';
import { create } from 'zustand';

interface Message {
  content: string;
  isUser: boolean;
  hour?: string;
  forceEnd?:boolean
}

interface Store {
  messages: Message[];
  hasUserSentMessage: boolean;
  counterUserMessages: number;
  hasUserEndedChat: boolean;
  hasUserNeedsToChooseContinueOrNot: boolean;
  openRatingModal: boolean;
  showFollowUp: boolean;
  userExit: boolean;
  forceChatByUser: boolean;
  addMessage: (message: Message) => void;
  setUserEndedChat: () => void;
  sethasUserNeedsToChooseContinueOrNot: (flag: boolean) => void;
  setOpenRatingModal: (flag: boolean) => void;
  resetStore: () => void;
  setShowFollowUp: (flag: boolean) => void;
  setForceChatByUser: (flag: boolean) => void; 
  setUserExit: (flag: boolean) => void; 
  setCounterUserMessages : (c:number) => void

}

const useStore = create<Store>((set) => ({
  messages: [],
  hasUserSentMessage: false,
  counterUserMessages: 0,
  hasUserEndedChat: false,
  hasUserNeedsToChooseContinueOrNot: false,
  openRatingModal: false,
  showFollowUp: false,
  forceChatByUser: false,
  userExit:false,
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
  setShowFollowUp: (flag) => set(() => ({ showFollowUp: flag })),  
  setUserEndedChat: () => set(() => ({ hasUserEndedChat: true })),
  setOpenRatingModal: (flag) => set(() => ({ openRatingModal: flag })),
  sethasUserNeedsToChooseContinueOrNot: (flag) => 
    set(() => ({ hasUserNeedsToChooseContinueOrNot: flag })),
  setForceChatByUser: (flag) => set(() => ({ forceChatByUser: flag })), 
  setUserExit: (flag) => set(() => ({ userExit: flag })), 
  setCounterUserMessages : (c) => set(()=> ({counterUserMessages:c})),
  resetStore: () =>  
    set(() => ({
      messages: [],
      hasUserSentMessage: false,
      counterUserMessages: 0,
      hasUserEndedChat: false, 
      hasUserNeedsToChooseContinueOrNot: false,
      openRatingModal: false,
      showFollowUp: false,
      forceChatByUser: false,
      userExit:false,

    })),
}));

export default useStore;