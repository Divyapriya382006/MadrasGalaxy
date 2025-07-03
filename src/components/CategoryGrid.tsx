import React from 'react';
import { MapPin, Star, Clock, Users, Zap, ShoppingBag, Camera, TreePine, Building, Waves, Mountain, Gamepad2 } from 'lucide-react';

interface UserPreferences {
  interest: 'food' | 'attractions' | 'both';
  budget: 'fancy' | 'budget';
  taste?: 'spicy' | 'sweet';
  cuisine?: string;
  activityType?: 'adventure' | 'cultural' | 'relaxation' | 'shopping';
  groupType?: 'solo' | 'family' | 'friends' | 'couple';
}

interface CategoryGridProps {
  preferences: UserPreferences | null;
  onCategorySelect: (category: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ preferences, onCategorySelect }) => {
  const categories = [
    {
      id: 'food-areas',
      name: 'Food Galaxy',
      description: 'Discover the culinary force across Chennai\'s diverse areas',
      icon: <MapPin className="w-8 h-8" />,
      color: 'from-orange-500 to-red-600',
      specialties: ['Traditional Cuisine', 'Street Food', 'Fine Dining', 'Local Flavors'],
      isRecommended: preferences?.interest === 'food' || preferences?.interest === 'both'
    },
    {
      id: 'malls',
      name: 'Shopping Stations',
      description: 'Massive shopping complexes where commerce and entertainment unite',
      icon: <ShoppingBag className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-600',
      specialties: ['Shopping', 'Entertainment', 'Food Courts', 'Cinema'],
      isRecommended: preferences?.activityType === 'shopping'
    },
    {
      id: 'temples',
      name: 'Sacred Temples',
      description: 'Ancient Jedi temples where spiritual force flows strongest',
      icon: <Building className="w-8 h-8" />,
      color: 'from-yellow-500 to-orange-600',
      specialties: ['Spiritual Energy', 'Architecture', 'Heritage', 'Peace'],
      isRecommended: preferences?.activityType === 'cultural'
    },
    {
      id: 'beaches',
      name: 'Coastal Worlds',
      description: 'Where the ocean meets the shore in perfect harmony',
      icon: <Waves className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-600',
      specialties: ['Ocean Views', 'Relaxation', 'Water Sports', 'Sunset'],
      isRecommended: preferences?.activityType === 'relaxation'
    },
    {
      id: 'parks',
      name: 'Nature Sanctuaries',
      description: 'Green oases where the force of nature creates balance',
      icon: <TreePine className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-600',
      specialties: ['Nature', 'Wildlife', 'Peace', 'Fresh Air'],
      isRecommended: preferences?.activityType === 'relaxation'
    },
    {
      id: 'adventure',
      name: 'Adventure Zones',
      description: 'Thrilling experiences for the brave rebel spirits',
      icon: <Mountain className="w-8 h-8" />,
      color: 'from-red-500 to-orange-600',
      specialties: ['Adrenaline', 'Sports', 'Challenges', 'Excitement'],
      isRecommended: preferences?.activityType === 'adventure'
    },
    {
      id: 'theme-parks',
      name: 'Entertainment Galaxies',
      description: 'Amusement worlds where fun and excitement rule supreme',
      icon: <Gamepad2 className="w-8 h-8" />,
      color: 'from-pink-500 to-purple-600',
      specialties: ['Rides', 'Entertainment', 'Family Fun', 'Thrills'],
      isRecommended: preferences?.groupType === 'family' || preferences?.activityType === 'adventure'
    },
    {
      id: 'museums',
      name: 'Knowledge Archives',
      description: 'Repositories of wisdom and ancient artifacts',
      icon: <Camera className="w-8 h-8" />,
      color: 'from-indigo-500 to-blue-600',
      specialties: ['History', 'Culture', 'Learning', 'Heritage'],
      isRecommended: preferences?.activityType === 'cultural'
    }
  ];

  const sortedCategories = [...categories].sort((a, b) => {
    if (a.isRecommended && !b.isRecommended) return -1;
    if (!a.isRecommended && b.isRecommended) return 1;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-yellow-400 mb-4">
          Choose Your Destination
        </h2>
        <p className="text-blue-200 text-lg">
          {preferences ? 
            `The Force guides you to these experiences based on your preferences...` :
            `Explore the diverse galaxies of Chennai`
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedCategories.map((category) => (
          <div
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:transform hover:scale-105 border-2 ${
              category.isRecommended 
                ? 'border-yellow-400 shadow-lg shadow-yellow-400/20' 
                : 'border-blue-500 hover:border-yellow-400'
            }`}
          >
            {category.isRecommended && (
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold flex items-center">
                  <Star className="w-3 h-3 mr-1" />
                  Recommended
                </div>
              </div>
            )}
            
            <div className={`bg-gradient-to-br ${category.color} p-6 h-full`}>
              <div className="flex items-center mb-4">
                <div className="text-white mr-3">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{category.name}</h3>
              </div>
              
              <p className="text-white/90 mb-4 text-sm">{category.description}</p>
              
              <div className="flex flex-wrap gap-1">
                {category.specialties.slice(0, 2).map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-white/20 text-white px-2 py-1 rounded-full text-xs"
                  >
                    {specialty}
                  </span>
                ))}
                {category.specialties.length > 2 && (
                  <span className="bg-white/20 text-white px-2 py-1 rounded-full text-xs">
                    +{category.specialties.length - 2} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;