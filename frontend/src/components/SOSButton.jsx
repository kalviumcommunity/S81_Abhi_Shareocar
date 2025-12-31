import { useState } from 'react';
import { api } from '../lib/api.js';

export default function SOSButton() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [contactInput, setContactInput] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);

  const getLocation = () => new Promise((resolve) => {
    if (!navigator.geolocation) return resolve({ lat: null, lng: null });
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => resolve({ lat: null, lng: null })
    );
  });

  const send = async (type, contactPhone) => {
    setSending(true); setError('');
    const { lat, lng } = await getLocation();
    try {
      await api.post('/sos', { type, lat, lng, contactPhone });
      setOpen(false);
      setShowContactForm(false);
      setContactInput('');
      alert('SOS sent');
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to send SOS');
    } finally { setSending(false); }
  };

  const handleShareLocation = () => {
    if (showContactForm && contactInput) {
      send('contact', contactInput);
    } else {
      setShowContactForm(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setShowContactForm(false);
    setContactInput('');
    setError('');
  };

  return (
    <>
      {/* Floating SOS Button with pulse animation */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 group z-40"
        aria-label="Emergency SOS"
      >
        <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75"></span>
        <span className="relative flex items-center justify-center bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold px-6 py-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          SOS
        </span>
      </button>

      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all animate-slideUp">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-700 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-full p-2">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Emergency SOS</h3>
                  <p className="text-red-100 text-sm">Get help immediately</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              <div className="space-y-3">
                {/* Call Police */}
                <a
                  href="tel:100"
                  className="flex items-center gap-4 w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 px-5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <div className="bg-white/20 rounded-full p-2.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-lg">Call Police</span>
                    <p className="text-red-100 text-sm">Dial 100</p>
                  </div>
                  <svg className="w-5 h-5 text-red-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                {/* Call Ambulance */}
                <a
                  href="tel:102"
                  className="flex items-center gap-4 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 px-5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <div className="bg-white/20 rounded-full p-2.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-lg">Call Ambulance</span>
                    <p className="text-orange-100 text-sm">Dial 102</p>
                  </div>
                  <svg className="w-5 h-5 text-orange-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                {/* Share Location */}
                <div className="space-y-2">
                  {showContactForm && (
                    <input
                      type="tel"
                      placeholder="Enter emergency contact number"
                      value={contactInput}
                      onChange={(e) => setContactInput(e.target.value)}
                      className="w-full border-2 border-blue-200 focus:border-blue-500 px-4 py-3 rounded-xl outline-none transition-colors text-gray-700 placeholder-gray-400"
                      autoFocus
                    />
                  )}
                  <button
                    disabled={sending || (showContactForm && !contactInput)}
                    onClick={handleShareLocation}
                    className="flex items-center gap-4 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-blue-300 disabled:to-blue-400 text-white py-4 px-5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:cursor-not-allowed"
                  >
                    <div className="bg-white/20 rounded-full p-2.5">
                      {sending ? (
                        <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <span className="font-semibold text-lg">
                        {sending ? 'Sending...' : showContactForm ? 'Send Location' : 'Share Live Location'}
                      </span>
                      <p className="text-blue-100 text-sm">
                        {showContactForm ? 'Send your location to contact' : 'Alert emergency contact'}
                      </p>
                    </div>
                    <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6">
              <button
                onClick={handleClose}
                className="w-full border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600 font-medium py-3 px-4 rounded-xl transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
