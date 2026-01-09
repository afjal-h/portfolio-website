import React from 'react';
import { User, Code, Briefcase, Heart } from 'lucide-react';
import WiiButton from '../components/WiiButton';

interface AboutAppProps {
  onHome?: () => void;
}

const AboutApp: React.FC<AboutAppProps> = ({ onHome }) => {
  return (
    <div className="h-full overflow-y-auto pb-32 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8 md:space-y-12">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center gap-4 md:gap-8 border-b-2 border-blue-100 pb-6 md:pb-8 text-center md:text-left">
          <div className="w-20 h-20 md:w-32 md:h-32 bg-blue-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg shrink-0">
            <User className="w-10 h-10 md:w-16 md:h-16 text-blue-500" />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2">Hello, I'm the Developer</h1>
            <p className="text-lg md:text-xl text-gray-500">Creative Technologist & UI/UX Engineer</p>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          
          {/* Card 1: Intro */}
          <div className="md:col-span-2 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-4 flex items-center gap-2">
              <Heart className="text-red-400" /> Passion
            </h2>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              I specialize in building interactive web experiences that blend nostalgia with modern performance. 
              Inspired by the playful interfaces of the mid-2000s, I strive to make software that feels fun to use.
            </p>
          </div>

          {/* Card 2: Stats */}
          <div className="bg-blue-50 p-6 md:p-8 rounded-3xl shadow-sm border border-blue-100 flex flex-col justify-center items-center text-center">
            <div className="text-4xl md:text-5xl font-bold text-blue-500 mb-2">5+</div>
            <div className="text-gray-600 font-medium">Years Experience</div>
          </div>

          {/* Card 3: Skills */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-4 md:mb-6 flex items-center gap-2">
               <Code className="text-purple-400" /> Stack
            </h2>
            <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Node.js', 'Tailwind', 'Three.js', 'Next.js'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                        {skill}
                    </span>
                ))}
            </div>
          </div>

          {/* Card 4: Work */}
          <div className="md:col-span-2 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
             <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-4 md:mb-6 flex items-center gap-2">
               <Briefcase className="text-orange-400" /> Recent Work
            </h2>
            <ul className="space-y-4">
                <li className="flex justify-between items-center border-b border-gray-50 pb-2 flex-wrap gap-2">
                    <span className="font-semibold text-gray-800">Senior Frontend Engineer @ Tech Corp</span>
                    <span className="text-gray-400 text-sm">2021 - Present</span>
                </li>
                 <li className="flex justify-between items-center border-b border-gray-50 pb-2 flex-wrap gap-2">
                    <span className="font-semibold text-gray-800">UI Designer @ Creative Studio</span>
                    <span className="text-gray-400 text-sm">2019 - 2021</span>
                </li>
            </ul>
          </div>

        </div>

        {/* Footer Navigation */}
        <div className="mt-12 flex justify-center pb-8 border-t border-gray-100 pt-8">
            <WiiButton onClick={onHome} className="px-8 py-3 text-lg rounded-full shadow-lg border-gray-300">
                Return to Home
            </WiiButton>
        </div>

      </div>
    </div>
  );
};

export default AboutApp;