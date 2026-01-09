import React, { useState, useEffect } from 'react';
import { Mail, Wifi } from 'lucide-react';

interface BottomBarProps {
  onWiiClick: () => void;
  onMailClick: () => void;
}

const BottomBar: React.FC<BottomBarProps> = ({ onWiiClick, onMailClick }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimeParts = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strMinutes = minutes < 10 ? '0' + minutes : minutes;
    return { hours, strMinutes, ampm };
  };

  const formatDate = (date: Date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = days[date.getDay()];
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${dayName} ${month}/${day}`;
  };

  const { hours, strMinutes, ampm } = formatTimeParts(time);

  return (
    <div className="absolute bottom-[2.5%] left-0 right-0 h-[12%] md:h-[15%] min-h-[90px] flex justify-center z-50 pointer-events-none">
      
      {/* Container for the Bar Content & Background */}
      <div className="relative w-full h-full pointer-events-auto">
        
        {/* SVG Background Shape */}
        <div className="absolute inset-0 w-full h-full drop-shadow-[0_-5px_15px_rgba(0,0,0,0.1)]">
           <svg 
             className="w-full h-full overflow-visible" 
             viewBox="0 0 1920 310" 
             fill="none" 
             xmlns="http://www.w3.org/2000/svg"
             preserveAspectRatio="none"
           >
            <g filter="url(#filter0_i_4_208)">
                <path d="M295.646 2.5C343.136 2.50003 401.436 2.49982 471.46 62.0107C519.455 102.8 564.418 128.491 651.819 128.491H1268.68C1356.08 128.491 1401.05 102.8 1449.04 62.0107C1519.06 2.49981 1577.36 2.50003 1624.85 2.5H1930V321.5H-9.5V2.5H295.646Z" fill="#E1E2E6"/>
            </g>
            <path d="M-6 2.5H295.646C343.136 2.50003 401.436 2.49982 471.46 62.0107C519.455 102.8 564.418 128.491 651.819 128.491H1268.68C1356.08 128.491 1401.05 102.8 1449.04 62.0107C1519.06 2.49981 1577.36 2.50003 1624.85 2.5H1926" stroke="#36BFED" strokeWidth="5" strokeMiterlimit="10"/>
            <defs>
            <filter id="filter0_i_4_208" x="-12" y="0" width="1944.5" height="358" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="34"/>
            <feGaussianBlur stdDeviation="20"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"/>
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_4_208"/>
            </filter>
            </defs>
           </svg>
        </div>

        {/* Content Layer */}
        <div className="relative h-full flex items-center justify-between px-8 md:px-16 pb-2">
          
          {/* Left: Wii Button */}
          <div className="flex-1 flex justify-start items-center">
            <button
              onClick={onWiiClick}
              className="group relative w-16 h-16 md:w-[7vh] md:h-[7vh] aspect-square rounded-full border-[4px] md:border-[5px] border-gray-300 bg-white shadow-lg flex items-center justify-center transition-all transform hover:scale-105 active:scale-95"
            >
               <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent to-black/5 opacity-50" />
               <span className="text-gray-400 font-bold text-lg md:text-[2.5vh] group-hover:text-blue-500 transition-colors z-10 leading-none">Wii</span>
               {/* Hover Glow */}
               <div className="absolute inset-0 rounded-full border-4 border-blue-300 opacity-0 group-hover:opacity-100 animate-pulse" />
            </button>
          </div>

          {/* Center: Date & Time */}
          <div className="flex-1 flex flex-col items-center justify-center pointer-events-none select-none pt-10 md:pt-[6vh]">
            <div className="flex items-baseline text-[#8a8a8a] leading-none">
                <span className="text-3xl md:text-[4.5vh] font-medium tracking-widest drop-shadow-sm font-['M_PLUS_Rounded_1c']">
                    {hours}<span className="animate-pulse opacity-50 mx-[1px]">:</span>{strMinutes}
                </span>
                <span className="text-sm md:text-[2vh] font-bold ml-1.5 uppercase tracking-wider">{ampm}</span>
            </div>
            <div className="text-lg md:text-[2.5vh] font-medium text-[#9a9a9a] tracking-wide mt-1 md:mt-2">
                {formatDate(time)}
            </div>
          </div>

          {/* Right: Mail / Messages */}
          <div className="flex-1 flex justify-end items-center gap-4 md:gap-8">
            <Wifi className="hidden sm:block w-6 h-6 md:w-[4vh] md:h-[4vh] text-gray-400/80 animate-pulse" />
            <button 
              onClick={onMailClick}
              className="relative group p-1 transition-transform hover:scale-110"
            >
              <div className="w-14 h-10 md:w-[7vh] md:h-[5vh] bg-white border-[3px] border-gray-300 rounded-lg flex items-center justify-center shadow-md group-hover:border-blue-400 group-hover:shadow-blue-200 transition-colors">
                <Mail className="w-6 h-6 md:w-[3vh] md:h-[3vh] text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-bounce shadow-sm border border-white" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BottomBar;