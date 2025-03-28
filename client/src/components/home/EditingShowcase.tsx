import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Scissors, Layers, Split, Clock, Check } from 'lucide-react';

const EditingShowcase = () => {
  const { ref, controls } = useScrollAnimation();
  const [activeTab, setActiveTab] = useState('techniques');
  
  return (
    <section id="editing" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          className="text-center mb-12"
        >
          <motion.div 
            className="inline-flex items-center justify-center mb-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            <Scissors className="mr-2 text-primary" size={24} />
            <span className="text-sm uppercase tracking-widest text-primary">Video Editing</span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } }
            }}
          >
            Post-Production Excellence
          </motion.h2>
          
          <motion.p 
            className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
            }}
          >
            Our editing team transforms raw footage into compelling stories through precision, creativity, and technical expertise.
          </motion.p>
        </motion.div>
        
        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-8 border-b border-gray-200 dark:border-gray-800">
          <button
            className={`px-4 py-2 relative ${activeTab === 'techniques' ? 'text-primary' : 'text-gray-600 dark:text-gray-400'}`}
            onClick={() => setActiveTab('techniques')}
          >
            Techniques
            {activeTab === 'techniques' && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                layoutId="tabIndicator"
              />
            )}
          </button>
          <button
            className={`px-4 py-2 relative ${activeTab === 'software' ? 'text-primary' : 'text-gray-600 dark:text-gray-400'}`}
            onClick={() => setActiveTab('software')}
          >
            Software
            {activeTab === 'software' && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                layoutId="tabIndicator"
              />
            )}
          </button>
          <button
            className={`px-4 py-2 relative ${activeTab === 'process' ? 'text-primary' : 'text-gray-600 dark:text-gray-400'}`}
            onClick={() => setActiveTab('process')}
          >
            Our Process
            {activeTab === 'process' && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" 
                layoutId="tabIndicator"
              />
            )}
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6 shadow-lg">
          {activeTab === 'techniques' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <TechniqueCard 
                title="Seamless Transitions"
                description="Create fluid scene changes with creative wipes, dissolves, and match cuts that enhance storytelling flow."
                icon={<Split className="text-primary" size={24} />}
              />
              <TechniqueCard 
                title="Color Grading"
                description="Enhance mood and visual cohesion through expert color manipulation and consistent aesthetic treatment."
                icon={<Layers className="text-primary" size={24} />}
              />
              <TechniqueCard 
                title="Rhythm & Pacing"
                description="Establish emotional impact through strategic edit timing that guides audience engagement and attention."
                icon={<Clock className="text-primary" size={24} />}
              />
              <TechniqueCard 
                title="Sound Design"
                description="Integrate ambient sounds, music, and effects to create an immersive audio landscape that complements visuals."
                icon={<Scissors className="text-primary" size={24} />}
              />
              <TechniqueCard 
                title="Visual Effects"
                description="Enhance footage with subtle effects, compositing, and motion graphics that elevate production value."
                icon={<Layers className="text-primary" size={24} />}
              />
              <TechniqueCard 
                title="Narrative Structure"
                description="Craft compelling story arcs through thoughtful arrangement of scenes and emotional pacing."
                icon={<Split className="text-primary" size={24} />}
              />
            </motion.div>
          )}
          
          {activeTab === 'software' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <SoftwareCard 
                name="Adobe Premiere Pro"
                description="Our primary NLE for seamless editing workflows and comprehensive project management."
                expertise={90}
              />
              <SoftwareCard 
                name="DaVinci Resolve"
                description="Utilized for advanced color grading and professional finishing touches."
                expertise={85}
              />
              <SoftwareCard 
                name="After Effects"
                description="For motion graphics, visual effects and complex compositing needs."
                expertise={80}
              />
              <SoftwareCard 
                name="Audition"
                description="Professional audio editing, restoration, and sound design capabilities."
                expertise={75}
              />
              <SoftwareCard 
                name="Final Cut Pro"
                description="Streamlined editing for certain project types requiring quick turnaround."
                expertise={70}
              />
              <SoftwareCard 
                name="Cinema 4D"
                description="3D modeling and animation integration for high-end projects."
                expertise={65}
              />
            </motion.div>
          )}
          
          {activeTab === 'process' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <ProcessStep 
                number={1}
                title="Discovery & Planning"
                description="We analyze your footage and creative goals to develop a comprehensive editing strategy tailored to your project."
              />
              <ProcessStep 
                number={2}
                title="Assembly Cut"
                description="Creating a rough timeline that establishes the basic structure and flow of your story from raw footage."
              />
              <ProcessStep 
                number={3}
                title="Rough Cut Refinement"
                description="Tightening the edit with precise timing adjustments, scene arrangement, and narrative flow improvements."
              />
              <ProcessStep 
                number={4}
                title="Fine Cutting"
                description="Perfecting every frame transition, optimizing pacing, and ensuring visual continuity throughout."
              />
              <ProcessStep 
                number={5}
                title="Color & Sound"
                description="Applying professional color grading, sound design, and audio mixing to create a cohesive audiovisual experience."
              />
              <ProcessStep 
                number={6}
                title="Final Delivery"
                description="Exporting in optimal formats for your distribution needs with comprehensive quality control."
              />
            </motion.div>
          )}
        </div>
        
        {/* Timeline Visualization at bottom */}
        <div className="mt-16 relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 dark:bg-gray-800 transform -translate-y-1/2"></div>
          <div className="relative flex justify-between items-center">
            {['Footage Import', 'Assembly', 'Rough Cut', 'Fine Cut', 'Color/Sound', 'Export'].map((stage, index) => (
              <div 
                key={index}
                className="flex flex-col items-center relative z-10"
              >
                <div className="w-4 h-4 bg-primary rounded-full mb-2"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">{stage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Film strip decorations */}
      <div className="absolute -left-20 top-1/3 w-64 h-64 border-2 border-dashed border-primary/20 rounded-full opacity-30 -rotate-12"></div>
      <div className="absolute -right-20 bottom-1/4 w-48 h-48 border-2 border-dashed border-primary/20 rounded-full opacity-30 rotate-12"></div>
    </section>
  );
};

interface TechniqueCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const TechniqueCard: React.FC<TechniqueCardProps> = ({ title, description, icon }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700"
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

interface SoftwareCardProps {
  name: string;
  description: string;
  expertise: number;
}

const SoftwareCard: React.FC<SoftwareCardProps> = ({ name, description, expertise }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 relative overflow-hidden"
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
    >
      <h3 className="font-bold mb-1 text-gray-900 dark:text-white">{name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${expertise}%` }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>
      <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
        <span>Expertise</span>
        <span>{expertise}%</span>
      </div>
      
      {/* Film strip decoration */}
      <div className="absolute -right-2 -bottom-2 w-12 h-12 opacity-10">
        <div className="grid grid-cols-2 gap-px">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-black w-6 h-6"></div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ number, title, description }) => {
  return (
    <motion.div 
      className="flex items-start gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: number * 0.1 }}
    >
      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold">
        {number}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
          <Check size={14} className="text-primary" />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

export default EditingShowcase;