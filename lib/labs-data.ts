// Simplified lab data interface for the main labs page
export interface LabSummary {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  technology: string;
}

// Get all available labs (summary data for main labs page)
export function getAllLabsSummary(): LabSummary[] {
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