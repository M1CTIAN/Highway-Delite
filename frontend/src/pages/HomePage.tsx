import { useState, useEffect } from 'react';
import ExperienceCard from '../components/ExperienceCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { experienceService } from '../services/api';
import type { Experience } from '../types';

interface HomePageProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function HomePage({ searchQuery, setSearchQuery }: HomePageProps) {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadExperiences();
  }, []);

  useEffect(() => {
    filterExperiences();
  }, [searchQuery, experiences]);

  const loadExperiences = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await experienceService.getAllExperiences();
      setExperiences(data);
      setFilteredExperiences(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load experiences');
    } finally {
      setLoading(false);
    }
  };

  const filterExperiences = () => {
    let filtered = [...experiences];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (exp) =>
          exp.title.toLowerCase().includes(query) ||
          exp.location.toLowerCase().includes(query) ||
          exp.description.toLowerCase().includes(query)
      );
    }

    setFilteredExperiences(filtered);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Content */}
      <section className="container py-6">

        {/* Loading State */}
        {loading && <LoadingSpinner message="Loading experiences..." />}

        {/* Error State */}
        {error && <ErrorMessage message={error} onRetry={loadExperiences} />}

        {/* Experiences Grid */}
        {!loading && !error && (
          <>
            {filteredExperiences.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No experiences found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                  }}
                  className="mt-4 btn btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredExperiences.map((experience) => (
                  <ExperienceCard key={experience.id} experience={experience} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
