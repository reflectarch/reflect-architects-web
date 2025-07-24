'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ContentBlockRenderer } from './ContentBlockRenderers';
import { SanityContentBlock } from '@/lib/sanity';

// Interface for the transformed project data
interface Project {
  id: string;
  title: string;
  slug: string;
  date: string;
  location: string;
  client: string;
  typology: string;
  status: string;
  size?: string;
  heroImage: {
    url: string;
    alt: string;
  };
  iconSvgUrl: string;
  contentBlocks: SanityContentBlock[];
}

// Project Card Component
function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-card flex-shrink-0 bg-white pt-8">
      <div className="flex max-h-[400px]">
        <div className="w-40 p-2 pr-6 flex flex-col justify-start items-end text-right">
          <div className="mb-4">
            {project.iconSvgUrl ? (
              <Image src={project.iconSvgUrl} alt="Project icon" width={24} height={24} className="w-6 h-6" />
            ) : (
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
            )}
          </div>
          <h3 className="text-sm font-medium text-gray-900 tracking-wide uppercase mb-2">{project.title}</h3>
          <p className="text-xs text-gray-600 uppercase tracking-wider">{project.location}</p>
        </div>
        <div className="relative max-h-[400px]">
          {project.heroImage.url ? (
            <Image 
              src={project.heroImage.url} 
              alt={project.heroImage.alt} 
              width={400} 
              height={300} 
              className="object-contain max-h-[300px] w-auto transition-opacity duration-300" 
            />
          ) : (
            <div className="w-[400px] h-[300px] bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No image</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Project Detail Component (Desktop)
function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const projectYear = new Date(project.date).getFullYear();
  
  return (
    <div className="flex h-full w-full bg-white gap-8">
      <div className="w-40 flex-shrink-0 flex flex-col text-right p-2">
        <div className="flex-grow pt-8">
          <div className="mb-4 flex justify-end">
            {project.iconSvgUrl ? (
              <Image src={project.iconSvgUrl} alt="Project icon" width={24} height={24} />
            ) : (
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
            )}
          </div>
          <h2 className="text-sm font-medium text-gray-900 tracking-wide uppercase mb-2">{project.title}</h2>
          <p className="text-xs text-gray-600 uppercase tracking-wider">{project.location}</p>
          <p className="text-xs text-gray-600 uppercase tracking-wider mb-8">{projectYear}</p>
          <div className="space-y-3 text-xs uppercase">
            <div><p className="font-semibold text-gray-800">Client</p><p className="text-gray-500">{project.client}</p></div>
            <div><p className="font-semibold text-gray-800">Typology</p><p className="text-gray-500">{project.typology}</p></div>
            {project.size && <div><p className="font-semibold text-gray-800">Size</p><p className="text-gray-500">{project.size}</p></div>}
            <div><p className="font-semibold text-gray-800">Status</p><p className="text-gray-500">{project.status}</p></div>
          </div>
        </div>
        <div className="flex-shrink-0 pb-4">
          <button onClick={onClose} className="text-xs uppercase text-gray-500 hover:text-black">Close</button>
        </div>
      </div>
      <div className="flex-grow h-full overflow-y-auto scrollbar-hide max-w-[600px] py-4">
        <div className="relative w-full mb-6">
          {project.heroImage.url ? (
            <Image 
              src={project.heroImage.url} 
              alt={project.heroImage.alt} 
              width={1200} 
              height={800} 
              className="w-full h-auto object-cover" 
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No hero image</span>
            </div>
          )}
        </div>
        {project.contentBlocks.map((block, index) => (
          <ContentBlockRenderer key={block._key || index} block={block} />
        ))}
      </div>
    </div>
  );
}

// Mobile Project Detail Component
function MobileProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
    const projectYear = new Date(project.date).getFullYear();
    
    return (
        <div className="flex flex-col h-full w-full bg-white p-4">
            <div className="flex-shrink-0 pb-4 border-b border-gray-200">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        {project.iconSvgUrl ? (
                          <Image src={project.iconSvgUrl} alt="Project icon" width={24} height={24} />
                        ) : (
                          <div className="w-6 h-6 bg-gray-300 rounded"></div>
                        )}
                        <div>
                            <h2 className="text-sm font-medium text-gray-900 tracking-wide uppercase">{project.title}</h2>
                            <p className="text-xs text-gray-600 uppercase tracking-wider">{project.location}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-xs uppercase text-gray-500 hover:text-black pt-1">Close</button>
                </div>
            </div>
            <div className="flex-grow h-full overflow-y-auto scrollbar-hide pt-4">
                <div className="relative w-full mb-6">
                    {project.heroImage.url ? (
                      <Image 
                        src={project.heroImage.url} 
                        alt={project.heroImage.alt} 
                        width={800} 
                        height={600} 
                        className="w-full h-auto object-cover" 
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No hero image</span>
                      </div>
                    )}
                </div>
                {project.contentBlocks.map((block, index) => (
                  <ContentBlockRenderer key={block._key || index} block={block} />
                ))}
                <div className="space-y-3 text-xs uppercase text-gray-500 mt-6 pt-4 border-t border-gray-100">
                    <p><span className="font-semibold text-gray-800">Client:</span> {project.client}</p>
                    <p><span className="font-semibold text-gray-800">Typology:</span> {project.typology}</p>
                    {project.size && <p><span className="font-semibold text-gray-800">Size:</span> {project.size}</p>}
                    <p><span className="font-semibold text-gray-800">Status:</span> {project.status}</p>
                    <p><span className="font-semibold text-gray-800">Year:</span> {projectYear}</p>
                </div>
            </div>
        </div>
    );
}

// Main Client Component
export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const lastScrollPos = useRef<number | undefined>(undefined);
  const lastScrollTime = useRef<number | undefined>(undefined);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Scroll animation effect
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const wrapper = wrapperRef.current;
    if (!scrollContainer || !wrapper) return;
    
    const handleScroll = () => {
      if (lastScrollTime.current === undefined) { 
        lastScrollPos.current = scrollContainer.scrollLeft; 
        lastScrollTime.current = performance.now(); 
        return; 
      }
      const currentScrollPos = scrollContainer.scrollLeft;
      const dp = Math.abs(currentScrollPos - (lastScrollPos.current || 0));
      const dt = performance.now() - lastScrollTime.current;
      lastScrollTime.current = performance.now();
      lastScrollPos.current = currentScrollPos;
      const speed = Math.min(dp / dt / 30, 1);
      wrapper.style.setProperty("--speed", speed.toString());
      wrapper.style.setProperty("--scroll", currentScrollPos.toString());
    };
    
    const handleScrollEnd = () => { 
      lastScrollTime.current = undefined; 
      if (wrapper) wrapper.style.setProperty("--speed", "0"); 
    };
    
    scrollContainer.addEventListener('scroll', handleScroll);
    scrollContainer.addEventListener('scrollend', handleScrollEnd);
    
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      scrollContainer.removeEventListener('scrollend', handleScrollEnd);
    };
  }, []);

  const scrollToProject = (projectId: string) => {
    const container = scrollContainerRef.current;
    const projectEl = projectRefs.current.get(projectId);

    if (!container || !projectEl) return;

    const containerWidth = container.clientWidth;
    const projectLeft = projectEl.offsetLeft;
    const projectWidth = projectEl.clientWidth;

    const scrollTarget = projectLeft - (containerWidth / 2) + (projectWidth / 2);

    container.scrollTo({
      left: scrollTarget,
      behavior: 'smooth',
    });
  };

  const handleProjectClick = (projectId: string) => {
    const newSelectedId = selectedProjectId === projectId ? null : projectId;
    setSelectedProjectId(newSelectedId);

    if (newSelectedId !== null) {
      setTimeout(() => {
        scrollToProject(newSelectedId);
      }, 100);
    }
  };

  return (
    <div className="bg-white h-full">
      <div 
        ref={scrollContainerRef}
        className="horizontal-scroll-container h-full"
      >
        <div 
          ref={wrapperRef}
          className="horizontal-scroll-wrapper"
        >
          {projects.map((project) => {
            const isSelected = selectedProjectId === project.id;
            
            return (
              <div
                key={project.id}
                ref={(el) => {
                  if (el) {
                    projectRefs.current.set(project.id, el);
                  } else {
                    projectRefs.current.delete(project.id);
                  }
                }}
                className={`relative flex-shrink-0 overflow-hidden transition-all duration-700 ease-in-out ${
                  isSelected 
                    ? 'w-[90vw] md:w-[900px] h-full'
                    : 'w-auto h-auto'
                }`}
              >
                <div
                  onClick={() => handleProjectClick(project.id)}
                  className={`transition-opacity duration-300 cursor-pointer ${
                    isSelected ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <ProjectCard project={project} />
                </div>

                <div
                  className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out transform-origin-left ${
                    isSelected 
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  {isSelected && (
                    <>
                      <div className="hidden md:flex h-full">
                        <ProjectDetail project={project} onClose={() => setSelectedProjectId(null)} />
                      </div>
                      <div className="flex md:hidden h-full">
                        <MobileProjectDetail project={project} onClose={() => setSelectedProjectId(null)} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 