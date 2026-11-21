import type { CapacitorConfig } from '@capacitor/cli'

// 웹 빌드 결과(dist)를 앱 안에 넣어 실행한다. 앱 이름과 ID 는 팀 이름이 정해지면 바꾼다.
const config: CapacitorConfig = {
  appId: 'com.neordinary.hackathon',
  appName: 'NEORDINARY',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 1000,
      backgroundColor: '#ffffff',
    },
  },
}

export default config
