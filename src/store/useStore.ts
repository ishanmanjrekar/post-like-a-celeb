import { create } from 'zustand';
import { TOPICS, generatePost } from '../utils/topics';
import type { GeneratedPost } from '../utils/topics';

interface AppState {
  selectedTopicId: string;
  currentPost: GeneratedPost | null;
  platform: 'x' | 'instagram';
  isExporting: boolean;
  
  setSelectedTopicId: (id: string) => void;
  setPlatform: (platform: 'x' | 'instagram') => void;
  setIsExporting: (isExporting: boolean) => void;
  generateNewPost: () => void;
  randomizeTopic: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  selectedTopicId: TOPICS[0].id,
  currentPost: null,
  platform: 'x',
  isExporting: false,

  setSelectedTopicId: (id) => set({ selectedTopicId: id }),
  setPlatform: (platform) => set({ platform }),
  setIsExporting: (isExporting) => set({ isExporting }),

  generateNewPost: () => {
    const { selectedTopicId } = get();
    const post = generatePost(selectedTopicId);
    set({ currentPost: post });
  },

  randomizeTopic: () => {
    const randomTopic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    const post = generatePost(randomTopic.id);
    
    set({
      selectedTopicId: randomTopic.id,
      currentPost: post,
    });
  },
}));
