import { useEffect } from 'react';

declare global {
  interface Window {
    voiceflow: {
      chat: {
        load: (config: any) => void;
      };
    };
  }
}

export const ChatbotWidget = () => {
  useEffect(() => {
    // The script is already loaded in index.html and will initialize automatically
    return () => {
      // Cleanup if needed when component unmounts
      const chatWidget = document.querySelector('.vfrc-widget');
      if (chatWidget) {
        chatWidget.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
};