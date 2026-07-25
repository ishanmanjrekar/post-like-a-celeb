import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.postlikeaceleb.game',
  appName: 'post-like-a-celeb',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
