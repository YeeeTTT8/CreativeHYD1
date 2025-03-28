import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface MascotContextType {
  isMascotVisible: boolean;
  setMascotVisible: (visible: boolean) => void;
  mascotMessage: string;
  setMascotMessage: (message: string) => void;
  showMessage: (message: string, duration?: number) => void;
}

const MascotContext = createContext<MascotContextType | undefined>(undefined);

interface MascotProviderProps {
  children: ReactNode;
}

export const MascotProvider: React.FC<MascotProviderProps> = ({ children }) => {
  const [isMascotVisible, setMascotVisible] = useState(true);
  const [mascotMessage, setMascotMessage] = useState('');
  
  // Function to show a message for a specific duration
  const showMessage = (message: string, duration = 5000) => {
    setMascotMessage(message);
    
    // Auto-hide after duration
    if (duration > 0) {
      setTimeout(() => {
        // Only clear if the message hasn't changed
        setMascotMessage((currentMessage) => 
          currentMessage === message ? '' : currentMessage
        );
      }, duration);
    }
  };

  // Save mascot visibility preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mascotVisible', isMascotVisible.toString());
    }
  }, [isMascotVisible]);

  // Load mascot visibility preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedVisibility = localStorage.getItem('mascotVisible');
      if (savedVisibility !== null) {
        setMascotVisible(savedVisibility === 'true');
      }
    }
  }, []);

  return (
    <MascotContext.Provider 
      value={{ 
        isMascotVisible, 
        setMascotVisible, 
        mascotMessage, 
        setMascotMessage,
        showMessage
      }}
    >
      {children}
    </MascotContext.Provider>
  );
};

// Custom hook to use the mascot context
export const useMascot = (): MascotContextType => {
  const context = useContext(MascotContext);
  if (context === undefined) {
    throw new Error('useMascot must be used within a MascotProvider');
  }
  return context;
};

export default MascotContext;