export interface LabSection {
  id: string;
  title: string;
  content: string;
}

export interface Lab {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  technology: string;
  sections: LabSection[];
}

// Available lab IDs
const availableLabIds = ['lab1', 'lab2'];

// Load lab data from JSON files
export async function loadLabData(labId: string): Promise<Lab | null> {
  try {
    const response = await fetch(`/data/labs/${labId}.json`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error(`Failed to load lab data for ${labId}:`, error);
    return null;
  }
}

// Get all available labs (summary data)
export function getAllLabsSummary(): Array<Pick<Lab, 'id' | 'title' | 'description' | 'duration' | 'level' | 'technology'>> {
  return [
    {
      id: 'lab1',
      title: 'Lab 1: Environment Setup & Project Introduction',
      description: 'Create accounts for the services we need, install coding tools on your computer, and get the AI receptionist app running on your machine.',
      duration: '2-3 hours',
      level: 'Foundation',
      technology: 'Next.js + Setup'
    },
    {
      id: 'lab2',
      title: 'Lab 2: AI Lifecycle & MLOps Integration',
      description: 'Build a Flask MLOps service to track AI performance, integrate Prometheus for metrics monitoring, and implement comprehensive metrics collection for your AI receptionist.',
      duration: '3-4 hours',
      level: 'Intermediate',
      technology: 'Flask + Prometheus'
    }
  ];
}

export function getLabById(id: string): Promise<Lab | null> {
  return loadLabData(id);
}

export function getAllLabs(): Promise<Lab[]> {
  return Promise.all(
    availableLabIds.map(id => loadLabData(id))
  ).then(labs => labs.filter(Boolean) as Lab[]);
}