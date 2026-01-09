import React, { useState, useEffect, useRef } from 'react';
import { Send, ArrowLeft, Check, Mail } from 'lucide-react';
import WiiButton from '../components/WiiButton';

interface MailAppProps {
  onClose: () => void;
  visible: boolean;
}

const MailApp: React.FC<MailAppProps> = ({ onClose, visible }) => {
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle focus after animation completes to prevent layout jumping
  useEffect(() => {
    if (visible && !sent) {
      const timer = setTimeout(() => {
        textareaRef.current?.focus();
      }, 600); // Wait slightly longer than the 500ms transition
      return () => clearTimeout(timer);
    }
  }, [visible, sent]);

  const handleSend = () => {
    if (!text.trim()) return;
    setSending(true);
    
    // Simulate network delay
    setTimeout(() => {
      setSending(false);
      setSent(true);
      
      // Close after success message
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="absolute inset-0 z-[200]">
      {/* Backdrop - Separated to handle opacity independently */}
      <div 
        className={`
            absolute inset-0 bg-black/40 backdrop-blur-sm 
            transition-opacity duration-500 ease-in-out
            ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
      />
      
      {/* Container for centering the modal - pointer-events-none to let clicks pass to backdrop if needed, though modal needs auto */}
      <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
        <div 
            className={`
                relative w-full max-w-2xl bg-[#f0f0f0] rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.3)] overflow-hidden border-[6px] border-[#dcdcdc] flex flex-col pointer-events-auto
                transition-transform duration-500
                ${visible ? 'ease-out translate-y-0' : 'ease-in-out translate-y-[120vh]'}
            `}
            style={{ height: 'min(600px, 90vh)' }}
        >
            {/* Header (Wii Message Board Style) */}
            <div className="bg-[#e6e6e6] border-b-2 border-white p-4 flex items-center justify-between shadow-sm z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center shadow-inner border-2 border-green-300">
                        <Mail className="text-white w-6 h-6" />
                    </div>
                    <span className="text-gray-600 font-bold text-xl tracking-tight">Create Message</span>
                </div>
                <div className="text-gray-400 font-bold text-sm tracking-widest uppercase">
                    {new Date().toLocaleDateString()}
                </div>
            </div>

            {/* Content Area - Lined Paper Look */}
            <div className="flex-1 relative bg-white p-8 overflow-hidden group">
                {/* Lined Paper Background */}
                <div className="absolute inset-0 pointer-events-none" 
                    style={{
                        backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px)',
                        backgroundSize: '100% 2rem',
                        marginTop: '2rem'
                    }} 
                />
                
                {!sent ? (
                    <div className="relative h-full flex flex-col">
                        <textarea
                            ref={textareaRef}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Tap here to write a message..."
                            className="w-full h-full bg-transparent resize-none border-none focus:ring-0 text-xl md:text-2xl leading-[2rem] text-gray-700 font-medium placeholder:text-gray-300 p-0 outline-none"
                            style={{ fontFamily: "'Nunito', sans-serif" }}
                        />
                        
                        {/* Character Count */}
                        <div className="absolute bottom-0 right-0 text-gray-400 text-sm font-bold bg-white/80 px-2 rounded">
                            {text.length} chars
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center space-y-6 animate-[scaleIn_0.4s_cubic-bezier(0.34,1.56,0.64,1)]">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center border-4 border-blue-200">
                            <Check className="w-12 h-12 text-blue-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-600">Message Sent!</h3>
                        <p className="text-gray-400">Thanks for reaching out.</p>
                    </div>
                )}
            </div>

            {/* Footer Controls */}
            <div className="bg-[#e6e6e6] border-t-2 border-white p-4 flex justify-between items-center z-10">
                <WiiButton onClick={onClose} className="px-6 py-2 rounded-full text-base">
                    <ArrowLeft size={20} className="mr-1" /> Back
                </WiiButton>

                {!sent && (
                    <WiiButton 
                        onClick={handleSend} 
                        active={!!text.trim()}
                        className={`px-8 py-2 rounded-full text-lg flex items-center gap-2 ${!text.trim() ? 'opacity-50 pointer-events-none grayscale' : ''}`}
                    >
                        {sending ? (
                            <span className="animate-pulse">Sending...</span>
                        ) : (
                            <>Send <Send size={20} /></>
                        )}
                    </WiiButton>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default MailApp;