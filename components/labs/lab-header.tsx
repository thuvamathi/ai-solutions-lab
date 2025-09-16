import { Lab } from '@/lib/labs-data'

interface LabHeaderProps {
  lab: Lab
}

export function LabHeader({ lab }: LabHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{lab.title}</h1>
      <p className="text-lg text-gray-600 mb-6">{lab.description}</p>
      
      <div className="grid grid-cols-3 gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="text-center">
          <div className="text-lg font-semibold text-blue-900">{lab.duration}</div>
          <div className="text-sm text-blue-700">Duration</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-blue-900">{lab.level}</div>
          <div className="text-sm text-blue-700">Level</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-blue-900">{lab.technology}</div>
          <div className="text-sm text-blue-700">Technology</div>
        </div>
      </div>
    </div>
  )
}