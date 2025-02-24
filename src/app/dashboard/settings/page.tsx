'use client';

export default function SettingsPage() {
  return (
    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
      <div className="p-6 bg-white border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Ayarlar</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Hesap Ayarları</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Email bildirimleri</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">İki faktörlü doğrulama</span>
                </label>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Gizlilik Ayarları</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Profili herkese açık yap</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Çevrimiçi durumumu göster</span>
                </label>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Ayarları Kaydet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 