import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.beerbeer.app',
  appName: 'beer',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
