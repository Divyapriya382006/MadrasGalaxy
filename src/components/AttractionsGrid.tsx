import React from 'react';
import { ArrowLeft, Star, MapPin, Clock, Users, DollarSign } from 'lucide-react';
import { chennaiAttractions } from '../data/chennaiAttractions';

interface UserPreferences {
  interest: 'food' | 'attractions' | 'both';
  budget: 'fancy' | 'budget';
  taste?: 'spicy' | 'sweet';
  cuisine?: string;
  activityType?: 'adventure' | 'cultural' | 'relaxation' | 'shopping';
  groupType?: 'solo' | 'family' | 'friends' | 'couple';
}

interface AttractionsGridProps {
  category: string;
  preferences: UserPreferences | null;
  onBack: () => void;
}

const AttractionsGrid: React.FC<AttractionsGridProps> = ({ category, preferences, onBack }) => {
  const getCategoryData = () => {
    switch (category) {
      case 'malls':
        return { title: 'Shopping Stations', data: chennaiAttractions.malls };
      case 'temples':
        return { title: 'Sacred Temples', data: chennaiAttractions.temples };
      case 'beaches':
        return { title: 'Coastal Worlds', data: chennaiAttractions.beaches };
      case 'shopping':
        return { title: 'Shopping Districts', data: chennaiAttractions.shopping };
      case 'parks':
        return { title: 'Nature Sanctuaries', data: chennaiAttractions.parks };
      case 'adventure':
        return { title: 'Adventure Zones', data: chennaiAttractions.adventure };
      case 'theme-parks':
        return { title: 'Entertainment Galaxies', data: chennaiAttractions.themeParks };
      case 'museums':
        return { title: 'Knowledge Archives', data: chennaiAttractions.museums };
      default:
        return { title: 'Attractions', data: [] };
    }
  };

  const { title, data } = getCategoryData();

  const getRecommendationScore = (attraction: any) => {
    if (!preferences) return 0;
    
    let score = 0;
    
    // Budget preferences
    if (preferences.budget === 'fancy' && attraction.category?.includes('Premium')) {
      score += 2;
    }
    if (preferences.budget === 'budget' && !attraction.category?.includes('Premium')) {
      score += 1;
    }
    
    // Activity type preferences
    if (preferences.activityType === 'adventure' && 
        (attraction.specialties?.includes('Adventure') || 
         attraction.specialties?.includes('Water Sports') ||
         attraction.specialties?.includes('Thrills'))) {
      score += 3;
    }
    
    if (preferences.activityType === 'cultural' && 
        (attraction.specialties?.includes('Heritage') || 
         attraction.specialties?.includes('Architecture') ||
         attraction.specialties?.includes('History'))) {
      score += 3;
    }
    
    if (preferences.activityType === 'relaxation' && 
        (attraction.specialties?.includes('Peaceful') || 
         attraction.specialties?.includes('Nature') ||
         attraction.specialties?.includes('Serenity'))) {
      score += 3;
    }
    
    if (preferences.activityType === 'shopping' && 
        (attraction.specialties?.includes('Shopping') || 
         attraction.specialties?.includes('Fashion'))) {
      score += 3;
    }
    
    // Group type preferences
    if (preferences.groupType === 'family' && 
        attraction.specialties?.includes('Family Fun')) {
      score += 2;
    }
    
    return score;
  };

  const sortedAttractions = [...data].sort((a, b) => {
    if (!preferences) return b.rating - a.rating;
    return getRecommendationScore(b) - getRecommendationScore(a);
  });

  const getBudgetIcon = (category: string) => {
    if (category?.includes('Premium') || category?.includes('Luxury')) {
      return <DollarSign className="w-4 h-4 text-red-400" />;
    }
    return <DollarSign className="w-4 h-4 text-green-400" />;
  };

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
          <h2 className="text-4xl font-bold text-yellow-400 mb-4">{title}</h2>
          <p className="text-blue-200 text-lg mb-6">
            {preferences ? 
              `Discover these ${title.toLowerCase()} chosen by the Force for your journey` :
              `Explore the finest ${title.toLowerCase()} in Chennai`
            }
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedAttractions.map((attraction, index) => {
          const recommendationScore = getRecommendationScore(attraction);
          const isHighlyRecommended = preferences && recommendationScore >= 5;
          const isRecommended = preferences && recommendationScore >= 2;
          
          return (
            <div
              key={index}
              className={`bg-gray-800 rounded-lg p-6 border-2 transition-all duration-300 hover:transform hover:scale-105 ${
                isHighlyRecommended 
                  ? 'border-yellow-400 shadow-lg shadow-yellow-400/20' 
                  : isRecommended
                  ? 'border-blue-400 shadow-lg shadow-blue-400/10'
                  : 'border-gray-600 hover:border-blue-400'
              }`}
            >
              {isHighlyRecommended && (
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Perfect Match
                  </div>
                </div>
              )}
              
              {isRecommended && !isHighlyRecommended && (
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-blue-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Recommended
                  </div>
                </div>
              )}
              
              <h3 className="text-xl font-bold text-white mb-2">{attraction.name}</h3>
              <p className="text-blue-200 mb-4">{attraction.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-yellow-400 font-semibold">{attraction.rating}</span>
                  <span className="text-gray-400 ml-1">({attraction.reviews})</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getBudgetIcon(attraction.category)}
                  <MapPin className="w-4 h-4 text-blue-400" />
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <span className="bg-purple-600 text-white px-2 py-1 rounded-full">
                  {attraction.category}
                </span>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{attraction.timing}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center text-sm text-gray-400 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{attraction.location}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {attraction.specialties?.slice(0, 3).map((specialty: string, specIndex: number) => (
                  <span
                    key={specIndex}
                    className="bg-gray-700 text-blue-200 px-2 py-1 rounded-full text-xs"
                  >
                    {specialty}
                  </span>
                ))}
                {attraction.specialties?.length > 3 && (
                  <span className="bg-gray-600 text-white px-2 py-1 rounded-full text-xs">
                    +{attraction.specialties.length - 3}
                  </span>
                )}
              </div>
              
              {attraction.highlights && (
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <p className="text-xs text-gray-400 mb-1">Highlights:</p>
                  <div className="flex flex-wrap gap-1">
                    {attraction.highlights.slice(0, 2).map((highlight: string, hIndex: number) => (
                      <span
                        key={hIndex}
                        className="bg-yellow-600 text-white px-2 py-1 rounded-full text-xs"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttractionsGrid;