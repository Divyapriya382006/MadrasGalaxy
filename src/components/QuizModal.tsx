import React, { useState } from 'react';
import { X, Zap, DollarSign, Flame, Heart, MapPin, Utensils, Camera, Gamepad2 } from 'lucide-react';

interface UserPreferences {
  interest: 'food' | 'attractions' | 'both';
  budget: 'fancy' | 'budget';
  taste?: 'spicy' | 'sweet';
  cuisine?: string;
  activityType?: 'adventure' | 'cultural' | 'relaxation' | 'shopping';
  groupType?: 'solo' | 'family' | 'friends' | 'couple';
}

interface QuizModalProps {
  onComplete: (preferences: UserPreferences) => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState<Partial<UserPreferences>>({});

  const questions = [
    {
      title: "Choose Your Path, Young Padawan",
      question: "What brings you to the Chennai Galaxy?",
      options: [
        { 
          key: 'food', 
          label: 'Food Adventure', 
          description: 'Explore the culinary force',
          icon: <Utensils className="w-6 h-6" />
        },
        { 
          key: 'attractions', 
          label: 'Sightseeing Quest', 
          description: 'Discover places and experiences',
          icon: <Camera className="w-6 h-6" />
        },
        { 
          key: 'both', 
          label: 'Complete Journey', 
          description: 'Food and attractions combined',
          icon: <MapPin className="w-6 h-6" />
        }
      ]
    },
    {
      title: "The Credits in Your Wallet",
      question: "What is your budget preference?",
      options: [
        { 
          key: 'fancy', 
          label: 'Premium Experience', 
          description: 'The way of the Jedi Master',
          icon: <Zap className="w-6 h-6" />
        },
        { 
          key: 'budget', 
          label: 'Budget Friendly', 
          description: 'The path of the wise Padawan',
          icon: <DollarSign className="w-6 h-6" />
        }
      ]
    }
  ];

  // Dynamic questions based on interest
  const getFoodQuestions = () => [
    {
      title: "Feel the Force of Flavors",
      question: "What awakens your taste buds?",
      options: [
        { 
          key: 'spicy', 
          label: 'Spicy & Bold', 
          description: 'Channel the fire of the Sith',
          icon: <Flame className="w-6 h-6" />
        },
        { 
          key: 'sweet', 
          label: 'Sweet & Delicate', 
          description: 'Embrace the light side',
          icon: <Heart className="w-6 h-6" />
        }
      ]
    },
    {
      title: "Complete Your Culinary Destiny",
      question: "What cuisine calls to you?",
      options: [
        { key: 'south-indian', label: 'South Indian', description: 'The ancient ways' },
        { key: 'north-indian', label: 'North Indian', description: 'The royal path' },
        { key: 'chinese', label: 'Chinese', description: 'The eastern force' },
        { key: 'continental', label: 'Continental', description: 'The western journey' },
        { key: 'street-food', label: 'Street Food', description: 'The rebel alliance' }
      ]
    }
  ];

  const getAttractionQuestions = () => [
    {
      title: "Choose Your Adventure Style",
      question: "What type of experience excites you?",
      options: [
        { 
          key: 'adventure', 
          label: 'Adventure & Thrills', 
          description: 'Like a daring rebel pilot',
          icon: <Gamepad2 className="w-6 h-6" />
        },
        { 
          key: 'cultural', 
          label: 'Culture & Heritage', 
          description: 'The wisdom of ancient Jedi',
          icon: <MapPin className="w-6 h-6" />
        },
        { 
          key: 'relaxation', 
          label: 'Peace & Relaxation', 
          description: 'Find balance like a Jedi Master',
          icon: <Heart className="w-6 h-6" />
        },
        { 
          key: 'shopping', 
          label: 'Shopping & Entertainment', 
          description: 'Gather resources for your journey',
          icon: <Zap className="w-6 h-6" />
        }
      ]
    },
    {
      title: "Your Travel Companions",
      question: "Who accompanies you on this journey?",
      options: [
        { key: 'solo', label: 'Solo Journey', description: 'Like a lone Jedi' },
        { key: 'family', label: 'Family Adventure', description: 'The Skywalker clan' },
        { key: 'friends', label: 'Friends Squad', description: 'The rebel alliance' },
        { key: 'couple', label: 'Romantic Quest', description: 'Like Han and Leia' }
      ]
    }
  ];

  const getAllQuestions = () => {
    let allQuestions = [...questions];
    
    if (preferences.interest === 'food') {
      allQuestions = [...allQuestions, ...getFoodQuestions()];
    } else if (preferences.interest === 'attractions') {
      allQuestions = [...allQuestions, ...getAttractionQuestions()];
    } else if (preferences.interest === 'both') {
      allQuestions = [...allQuestions, ...getFoodQuestions(), ...getAttractionQuestions()];
    }
    
    return allQuestions;
  };

  const currentQuestions = getAllQuestions();
  const currentQuestion = currentQuestions[step];

  const handleAnswer = (answer: string) => {
    let newPreferences = { ...preferences };

    if (step === 0) {
      newPreferences.interest = answer as 'food' | 'attractions' | 'both';
    } else if (step === 1) {
      newPreferences.budget = answer as 'fancy' | 'budget';
    } else {
      // Handle dynamic questions based on interest
      if (preferences.interest === 'food' || preferences.interest === 'both') {
        if (step === 2) {
          newPreferences.taste = answer as 'spicy' | 'sweet';
        } else if (step === 3 && preferences.interest === 'food') {
          newPreferences.cuisine = answer;
        } else if (step === 3 && preferences.interest === 'both') {
          newPreferences.cuisine = answer;
        } else if (step === 4 && preferences.interest === 'both') {
          newPreferences.activityType = answer as 'adventure' | 'cultural' | 'relaxation' | 'shopping';
        } else if (step === 5 && preferences.interest === 'both') {
          newPreferences.groupType = answer as 'solo' | 'family' | 'friends' | 'couple';
        }
      }
      
      if (preferences.interest === 'attractions') {
        if (step === 2) {
          newPreferences.activityType = answer as 'adventure' | 'cultural' | 'relaxation' | 'shopping';
        } else if (step === 3) {
          newPreferences.groupType = answer as 'solo' | 'family' | 'friends' | 'couple';
        }
      }
    }

    setPreferences(newPreferences);

    if (step < currentQuestions.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(newPreferences as UserPreferences);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 max-w-md w-full border border-yellow-400 shadow-2xl transform animate-pulse">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-yellow-400 rounded-full mb-4">
            <Zap className="w-8 h-8 text-gray-900" />
          </div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">
            {currentQuestion.title}
          </h2>
          <p className="text-blue-200 text-lg">
            {currentQuestion.question}
          </p>
        </div>

        <div className="space-y-4">
          {currentQuestion.options.map((option) => (
            <button
              key={option.key}
              onClick={() => handleAnswer(option.key)}
              className="w-full p-4 bg-gray-700 hover:bg-gray-600 border border-blue-500 rounded-lg text-left transition-all duration-300 hover:border-yellow-400 hover:shadow-lg group"
            >
              <div className="flex items-center">
                {option.icon && (
                  <div className="mr-3 text-yellow-400 group-hover:text-yellow-300">
                    {option.icon}
                  </div>
                )}
                <div>
                  <div className="text-white font-semibold text-lg">
                    {option.label}
                  </div>
                  <div className="text-blue-200 text-sm">
                    {option.description}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            {currentQuestions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === step ? 'bg-yellow-400' : 
                  index < step ? 'bg-blue-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;