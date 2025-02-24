'use client';

export default function ProfilePage() {
  return (
    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
      <div className="p-6 bg-white border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Profil</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-4xl">
              👤
            </div>
            <div>
              <h3 className="text-xl font-semibold">Kullanıcı Adı</h3>
              <p className="text-gray-600">user@example.com</p>
            </div>
          </div>
          <div className="mt-8">
            <h4 className="text-lg font-semibold mb-4">Profil Bilgileri</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Ad</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Ad"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Soyad</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Soyad"
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Bilgileri Güncelle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 