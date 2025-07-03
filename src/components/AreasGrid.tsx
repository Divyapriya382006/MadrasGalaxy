import React from 'react';
import { ArrowLeft, MapPin, Star, Utensils, Clock } from 'lucide-react';
import { chennaiAreas } from '../data/chennaiAreas';

interface UserPreferences {
  interest: 'food' | 'attractions' | 'both';
  budget: 'fancy' | 'budget';
  taste?: 'spicy' | 'sweet';
  cuisine?: string;
  activityType?: 'adventure' | 'cultural' | 'relaxation' | 'shopping';
  groupType?: 'solo' | 'family' | 'friends' | 'couple';
}

interface AreasGridProps {
  preferences: UserPreferences | null;
  onAreaSelect: (area: string) => void;
  onBack: () => void;
}

const AreasGrid: React.FC<AreasGridProps> = ({ preferences, onAreaSelect, onBack }) => {
  const getRecommendationScore = (area: typeof chennaiAreas[0]) => {
    if (!preferences) return 0;
    
    let score = 0;
    const spots = area.foodSpots;
    
    // Check budget preferences
    const budgetMatches = spots.filter(spot => 
      (preferences.budget === 'fancy' && spot.priceRange === 'expensive') ||
      (preferences.budget === 'budget' && spot.priceRange === 'budget')
    );
    score += budgetMatches.length;
    
    // Check taste preferences
    if (preferences.taste) {
      const tasteMatches = spots.filter(spot => 
        (preferences.taste === 'spicy' && spot.spiceLevel === 'high') ||
        (preferences.taste === 'sweet' && spot.spiceLevel === 'low')
      );
      score += tasteMatches.length;
    }
    
    // Check cuisine preferences
    if (preferences.cuisine) {
      const cuisineMatches = spots.filter(spot => 
        spot.cuisine.toLowerCase().includes(preferences.cuisine!.toLowerCase())
      );
      score += cuisineMatches.length * 2;
    }
    
    return score;
  };

  const sortedAreas = [...chennaiAreas].sort((a, b) => {
    if (!preferences) return a.name.localeCompare(b.name);
    return getRecommendationScore(b) - getRecommendationScore(a);
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-yellow-400 hover:text-yellow-300 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Categories
        </button>
        
        <div className="text-center">
          <h2 className="text-4xl font-bold text-yellow-400 mb-4">
            Food Galaxy Areas
          </h2>
          <p className="text-blue-200 text-lg">
            {preferences ? 
              `Based on your preferences, these areas call to you through the Force...` :
              `Explore the diverse food galaxies of Chennai`
            }
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedAreas.map((area) => {
          const score = getRecommendationScore(area);
          const isRecommended = preferences && score > 0;
          
          return (
            <div
              key={area.name}
              onClick={() => onAreaSelect(area.name)}
              className={`bg-gray-800 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:transform hover:scale-105 border-2 ${
                isRecommended 
                  ? 'border-yellow-400 shadow-lg shadow-yellow-400/20' 
                  : 'border-blue-500 hover:border-yellow-400'
              }`}
            >
              {isRecommended && (
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Force Recommended
                  </div>
                </div>
              )}
              
              <div className="flex items-center mb-4">
                <MapPin className="text-blue-400 w-6 h-6 mr-3" />
                <h3 className="text-xl font-bold text-white">{area.name}</h3>
              </div>
              
              <p className="text-blue-200 mb-4">{area.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center">
                  <Utensils className="w-4 h-4 mr-1" />
                  <span>{area.foodSpots.length} spots</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{area.averageTime}</span>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-1">
                {area.specialties.slice(0, 3).map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs"
                  >
                    {specialty}
                  </span>
                ))}
                {area.specialties.length > 3 && (
                  <span className="bg-gray-600 text-white px-2 py-1 rounded-full text-xs">
                    +{area.specialties.length - 3} more
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AreasGrid;