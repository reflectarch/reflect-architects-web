import { getAllProjects } from '@/lib/queries';
import { urlFor, SanityProject } from '@/lib/sanity';
import ProjectsClient from '@/components/ProjectsClient';

// Transform Sanity data to match our component interface
function transformProjectForClient(sanityProject: SanityProject) {
  return {
    id: sanityProject._id.replace('drafts.', ''),
    title: sanityProject.title,
    slug: sanityProject.slug.current,
    date: sanityProject.date,
    location: sanityProject.location,
    client: sanityProject.client,
    typology: sanityProject.typology,
    status: sanityProject.status,
    size: sanityProject.size,
    heroImage: {
      url: sanityProject.heroImage?.asset?._ref ? urlFor(sanityProject.heroImage).url() : '',
      alt: sanityProject.heroImage?.alt || sanityProject.title
    },
    iconSvgUrl: sanityProject.iconSvg?.asset?._ref ? urlFor(sanityProject.iconSvg).url() : '',
    contentBlocks: sanityProject.contentBlocks || []
  };
}

export default async function Projects() {
  // Fetch projects from Sanity
  const sanityProjects = await getAllProjects();
  
  // Transform for client components
  const projects = sanityProjects.map(transformProjectForClient);

  // If no projects, show loading or empty state
  if (!projects.length) {
    return (
      <div className="bg-white h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-900 mb-2">No Projects Found</h2>
          <p className="text-gray-600">Projects will appear here once they&apos;re added to your Sanity CMS.</p>
        </div>
      </div>
    );
  }

  return <ProjectsClient projects={projects} />;
}