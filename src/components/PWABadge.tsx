import React from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

function PWABadge() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needUpdate: [needUpdate, setNeedUpdate],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r)
    },
    onRegisterError(error) {
      console.log('SW registration error', error)
    },
  })

  const close = () => {
    setOfflineReady(false)
    setNeedUpdate(false)
  }

  return (
    <div className="fixed bottom-24 left-4 right-4 z-[9999] pointer-events-none flex justify-center">
      {(offlineReady || needUpdate) && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-2xl border border-orange-100 dark:border-gray-700 pointer-events-auto flex flex-col gap-3 max-w-sm w-full animate-in slide-in-from-bottom-4">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {offlineReady ? '앱을 오프라인에서 사용할 수 있습니다.' : '새로운 업데이트가 있습니다!'}
            </span>
            <span className="text-xs text-gray-500">
              {offlineReady ? '인터넷 연결 없이도 맛집 일기를 기록하세요.' : '새로운 기능을 사용하려면 새로고침 하세요.'}
            </span>
          </div>
          <div className="flex gap-2">
            {needUpdate && (
              <button 
                className="flex-1 py-2 bg-orange-500 text-white text-xs font-bold rounded-lg"
                onClick={() => updateServiceWorker(true)}
              >
                업데이트하기
              </button>
            )}
            <button 
              className="flex-1 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold rounded-lg"
              onClick={() => close()}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PWABadge
