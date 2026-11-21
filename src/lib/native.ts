import { App as NativeApp } from '@capacitor/app'
import { Capacitor } from '@capacitor/core'

/** 앱(Android, iOS)으로 실행 중인지. 브라우저에서는 false. */
export const isNative = Capacitor.isNativePlatform()

/** 앱에서만 필요한 동작을 연결한다. 브라우저에서는 아무 일도 하지 않는다. */
export function initNative() {
  if (!isNative) return

  // Android 하드웨어 뒤로가기. 첫 화면에서는 앱을 닫고 그 외에는 이전 화면으로 간다.
  NativeApp.addListener('backButton', ({ canGoBack }) => {
    if (canGoBack) window.history.back()
    else NativeApp.exitApp()
  })
}
