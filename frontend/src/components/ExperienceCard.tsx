import { Link } from 'react-router-dom';
import type { Experience } from '../types';

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const minPrice = experience.min_price || experience.base_price;

  return (
    <Link
      to={`/experience/${experience.id}`}
      className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 border border-gray-100"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={experience.image_url}
          alt={experience.title}
          className="w-full h-full object-cover"
        />
        {/* Category Tag */}
        <div className="absolute top-2.5 left-2.5 bg-white px-2.5 py-1 rounded shadow-sm">
          <span className="text-gray-900 font-medium text-xs">{experience.category}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900 mb-1.5">
          {experience.title}
        </h3>
        
        <p className="text-gray-500 text-xs mb-3">{experience.location}</p>

        <p className="text-gray-600 text-xs mb-4 line-clamp-2 leading-relaxed">
          {experience.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-1">From</p>
            <p className="text-lg font-bold text-gray-900">
              ₹{minPrice.toLocaleString('en-IN')}
            </p>
          </div>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-sm px-4 py-2 rounded-md transition-colors whitespace-nowrap">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}
