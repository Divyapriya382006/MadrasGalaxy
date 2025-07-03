import React from 'react';
import { ArrowLeft, Star, MapPin, Clock, DollarSign, Flame, Heart } from 'lucide-react';
import { chennaiAreas } from '../data/chennaiAreas';

interface UserPreferences {
  interest: 'food' | 'attractions' | 'both';
  budget: 'fancy' | 'budget';
  taste?: 'spicy' | 'sweet';
  cuisine?: string;
  activityType?: 'adventure' | 'cultural' | 'relaxation' | 'shopping';
  groupType?: 'solo' | 'family' | 'friends' | 'couple';
}

interface FoodSpotsProps {
  area: string;
  preferences: UserPreferences | null;
  onBack: () => void;
}

const FoodSpots: React.FC<FoodSpotsProps> = ({ area, preferences, onBack }) => {
  const areaData = chennaiAreas.find(a => a.name === area);
  
  if (!areaData) {
    return (
      <div className="text-center text-white">
        <p>Area not found in our galaxy...</p>
        <button onClick={onBack} className="mt-4 text-yellow-400 hover:text-yellow-300">
          Return to Areas
        </button>
      </div>
    );
  }

  const getSpotRecommendation = (spot: typeof areaData.foodSpots[0]) => {
    if (!preferences) return 0;
    
    let score = 0;
    
    // Budget match
    if ((preferences.budget === 'fancy' && spot.priceRange === 'expensive') ||
        (preferences.budget === 'budget' && spot.priceRange === 'budget')) {
      score += 2;
    }
    
    // Taste match
    if (preferences.taste) {
      if ((preferences.taste === 'spicy' && spot.spiceLevel === 'high') ||
          (preferences.taste === 'sweet' && spot.spiceLevel === 'low')) {
        score += 2;
      }
    }
    
    // Cuisine match
    if (preferences.cuisine && spot.cuisine.toLowerCase().includes(preferences.cuisine.toLowerCase())) {
      score += 3;
    }
    
    return score;
  };

  const sortedSpots = [...areaData.foodSpots].sort((a, b) => {
    if (!preferences) return b.rating - a.rating;
    return getSpotRecommendation(b) - getSpotRecommendation(a);
  });

  const getPriceIcon = (priceRange: string) => {
    switch (priceRange) {
      case 'budget':
        return <DollarSign className="w-4 h-4 text-green-400" />;
      case 'moderate':
        return <DollarSign className="w-4 h-4 text-yellow-400" />;
      case 'expensive':
        return <DollarSign className="w-4 h-4 text-red-400" />;
      default:
        return <DollarSign className="w-4 h-4 text-gray-400" />;
    }
  };

  const getSpiceIcon = (spiceLevel: string) => {
    switch (spiceLevel) {
      case 'high':
        return <Flame className="w-4 h-4 text-red-400" />;
      case 'medium':
        return <Flame className="w-4 h-4 text-orange-400" />;
      case 'low':
        return <Heart className="w-4 h-4 text-pink-400" />;
      default:
        return <Heart className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-yellow-400 hover:text-yellow-300 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Areas
        </button>
        
        <div className="text-center">
          <h2 className="text-4xl font-bold text-yellow-400 mb-4">{areaData.name}</h2>
          <p className="text-blue-200 text-lg mb-6">{areaData.description}</p>
          
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{areaData.foodSpots.length} Food Spots</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>Avg. {areaData.averageTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedSpots.map((spot, index) => {
          const recommendationScore = getSpotRecommendation(spot);
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
              
              <h3 className="text-xl font-bold text-white mb-2">{spot.name}</h3>
              <p className="text-blue-200 mb-4">{spot.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-yellow-400 font-semibold">{spot.rating}</span>
                  <span className="text-gray-400 ml-1">({spot.reviews})</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getPriceIcon(spot.priceRange)}
                  {getSpiceIcon(spot.spiceLevel)}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <span className="bg-purple-600 text-white px-2 py-1 rounded-full">
                  {spot.cuisine}
                </span>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{spot.timing}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {spot.specialties.slice(0, 3).map((specialty, specIndex) => (
                  <span
                    key={specIndex}
                    className="bg-gray-700 text-blue-200 px-2 py-1 rounded-full text-xs"
                  >
                    {specialty}
                  </span>
                ))}
                {spot.specialties.length > 3 && (
                  <span className="bg-gray-600 text-white px-2 py-1 rounded-full text-xs">
                    +{spot.specialties.length - 3}
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

export default FoodSpots;