import { useEffect, useState, useMemo } from 'react';

interface Section {
  id: string;
  offsetTop: number;
  height: number;
}

export const useSectionTransition = (sectionIds: string[], threshold: number = 0.5) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Build section data
  useEffect(() => {
    const updateSectionData = () => {
      const sectionsData = sectionIds.map(id => {
        const element = document.getElementById(id);
        if (!element) return null;
        
        const rect = element.getBoundingClientRect();
        return {
          id,
          offsetTop: rect.top + window.pageYOffset,
          height: rect.height,
        };
      }).filter(Boolean) as Section[];
      
      setSections(sectionsData);
    };
    
    // Set initial sections
    updateSectionData();
    
    // Update on resize
    window.addEventListener('resize', updateSectionData);
    return () => window.removeEventListener('resize', updateSectionData);
  }, [sectionIds]);
  
  // Handle scroll changes
  useEffect(() => {
    const handleScroll = () => {
      if (!sections.length) return;
      
      setIsScrolling(true);
      
      const viewportHeight = window.innerHeight;
      const scrollTop = window.pageYOffset;
      const scrollMiddle = scrollTop + viewportHeight * threshold;
      
      // Find which section is most visible in the viewport
      let currentSection: string | null = null;
      let maxVisibility = 0;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.height;
        
        // Calculate how much of the section is visible
        const sectionStart = Math.max(scrollTop, sectionTop);
        const sectionEnd = Math.min(scrollTop + viewportHeight, sectionBottom);
        const visibleHeight = Math.max(0, sectionEnd - sectionStart);
        const visibilityPercentage = visibleHeight / section.height;
        
        // Alternative: Check if scroll middle point is within this section
        const isMiddleInSection = scrollMiddle >= sectionTop && scrollMiddle < sectionBottom;
        
        if (isMiddleInSection || visibilityPercentage > maxVisibility) {
          maxVisibility = visibilityPercentage;
          currentSection = section.id;
        }
      });
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
      
      // Reset scrolling state after a short delay
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };
    
    let scrollTimeout: NodeJS.Timeout;
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [sections, activeSection, threshold]);
  
  // Calculate progress for each section (0 to 1)
  const sectionProgress = useMemo(() => {
    if (!sections.length) return {};
    
    const viewportHeight = window.innerHeight;
    const scrollTop = window.pageYOffset;
    
    return sections.reduce((acc, section) => {
      const sectionTop = section.offsetTop;
      const triggerPoint = sectionTop - viewportHeight * 0.8;
      const endPoint = sectionTop - viewportHeight * 0.2;
      
      let progress = 0;
      
      if (scrollTop >= endPoint) {
        progress = 1;
      } else if (scrollTop > triggerPoint) {
        progress = (scrollTop - triggerPoint) / (endPoint - triggerPoint);
      }
      
      return {
        ...acc,
        [section.id]: progress,
      };
    }, {});
  }, [sections]);
  
  return {
    activeSection,
    isScrolling,
    sectionProgress,
    scrollToSection: (id: string) => {
      const section = sections.find(s => s.id === id);
      if (section) {
        window.scrollTo({
          top: section.offsetTop,
          behavior: 'smooth',
        });
      }
    },
  };
};