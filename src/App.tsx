import React, { useState, useEffect } from 'react';
import { Star, Sparkles, MapPin, Utensils } from 'lucide-react';
import QuizModal from './components/QuizModal';
import CategoryGrid from './components/CategoryGrid';
import AreasGrid from './components/AreasGrid';
import FoodSpots from './components/FoodSpots';
import AttractionsGrid from './components/AttractionsGrid';
import Lightsaber from './components/Lightsaber';
import AIAssistant from './components/AIAssistant';
import EnhancedBackground from './components/EnhancedBackground';
import ForceField from './components/ForceField';

interface UserPreferences {
  interest: 'food' | 'attractions' | 'both';
  budget: 'fancy' | 'budget';
  taste?: 'spicy' | 'sweet';
  cuisine?: string;
  activityType?: 'adventure' | 'cultural' | 'relaxation' | 'shopping';
  groupType?: 'solo' | 'family' | 'friends' | 'couple';
}

function App() {
  const [showQuiz, setShowQuiz] = useState(true);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [currentView, setCurrentView] = useState<'categories' | 'food-areas' | 'food-spots' | 'attractions'>('categories');
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleQuizComplete = (prefs: UserPreferences) => {
    setPreferences(prefs);
    setShowQuiz(false);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (category === 'food-areas') {
      setCurrentView('food-areas');
    } else {
      setCurrentView('attractions');
    }
  };

  const handleAreaSelect = (area: string) => {
    setSelectedArea(area);
    setCurrentView('food-spots');
  };

  const handleBackToCategories = () => {
    setCurrentView('categories');
    setSelectedCategory(null);
    setSelectedArea(null);
  };

  const handleBackToAreas = () => {
    setCurrentView('food-areas');
    setSelectedArea(null);
  };

  const handleBackToAttractions = () => {
    setCurrentView('attractions');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden perspective-wrapper">
  <div className="parallax-layer"></div>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center relative overflow-hidden">
        <EnhancedBackground />
        <div className="text-center relative z-10">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-yellow-400 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-yellow-400 mb-4 animate-pulse tracking-wider">
            INITIALIZING HYPERDRIVE...
          </h1>
          <p className="text-blue-200 text-lg mb-4">Connecting to the Chennai Galaxy</p>
          <div className="flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const renderMainContent = () => {
    switch (currentView) {
      case 'food-areas':
        return (
          <AreasGrid 
            preferences={preferences} 
            onAreaSelect={handleAreaSelect}
            onBack={handleBackToCategories}
          />
        );
      case 'food-spots':
        return (
          <FoodSpots 
            area={selectedArea!} 
            preferences={preferences} 
            onBack={handleBackToAreas}
          />
        );
      case 'attractions':
        return (
          <AttractionsGrid 
            category={selectedCategory!}
            preferences={preferences}
            onBack={handleBackToCategories}
          />
        );
      default:
        return (
          <CategoryGrid 
            preferences={preferences} 
            onCategorySelect={handleCategorySelect}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Enhanced Background */}
      <EnhancedBackground />

      {/* Floating Lightsabers */}
      <Lightsaber side="left" />
      <Lightsaber side="right" />

      {/* Header */}
      <header className="relative z-10 text-center py-8 px-4">
        <ForceField className="max-w-4xl mx-auto p-8">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="text-yellow-400 w-10 h-10 mr-4 animate-pulse" />
            <h1 className="text-6xl md:text-7xl font-bold text-yellow-400 tracking-wider">
              CHENNAI FORCE
            </h1>
            <Sparkles className="text-yellow-400 w-10 h-10 ml-4 animate-pulse" />
          </div>
          <div className="relative">
            <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
              A long time ago in a galaxy far, far away... there was incredible food and amazing places in Chennai.
              Use the Force to discover your perfect experience.
            </p>
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-75" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-75" />
          </div>
        </ForceField>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4">
        <ForceField className="max-w-7xl mx-auto">
          {renderMainContent()}
        </ForceField>
      </main>

      {/* Quiz Modal */}
      {showQuiz && (
        <QuizModal onComplete={handleQuizComplete} />
      )}

      {/* AI Assistant */}
      <AIAssistant preferences={preferences} />

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 mt-16">
        <ForceField className="max-w-2xl mx-auto p-6">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="text-blue-400 w-6 h-6 mr-3" />
            <p className="text-blue-200 text-lg">May the Force be with you, always.</p>
            <Utensils className="text-blue-400 w-6 h-6 ml-3" />
          </div>
          <p className="text-sm text-gray-400 mb-2">
            Chennai Force Galaxy © 2025 - Powered by the Force
          </p>
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
            <span>🤖 AI Assistant Active</span>
            <span>•</span>
            <span>🌤️ Real-time Weather</span>
            <span>•</span>
            <span>⭐ Force-guided Recommendations</span>
          </div>
        </ForceField>
      </footer>
    </div>
        </div>
  );
}

export default App;
