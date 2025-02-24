'use client';

export default function MessagesPage() {
  const messages = [
    {
      id: 1,
      sender: 'Ahmet Yılmaz',
      subject: 'Proje Toplantısı',
      message: 'Yarın saat 10:00\'da proje toplantısı var.',
      date: '10:30',
      unread: true,
    },
    {
      id: 2,
      sender: 'Mehmet Demir',
      subject: 'Rapor İncelemesi',
      message: 'Haftalık raporu inceledim, düzeltmeler gerekiyor.',
      date: 'Dün',
      unread: false,
    },
    {
      id: 3,
      sender: 'Ayşe Kaya',
      subject: 'Yeni Görev',
      message: 'Size yeni bir görev atadım, kontrol eder misiniz?',
      date: 'Pazartesi',
      unread: true,
    },
  ];

  return (
    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
      <div className="p-6 bg-white border-b border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Mesajlar</h2>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Yeni Mesaj
          </button>
        </div>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                message.unread ? 'bg-indigo-50' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{message.sender}</h3>
                  <p className="text-sm font-medium text-gray-900">{message.subject}</p>
                  <p className="text-sm text-gray-600 mt-1">{message.message}</p>
                </div>
                <div className="text-sm text-gray-500">{message.date}</div>
              </div>
              {message.unread && (
                <div className="mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    Okunmadı
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 