
import React, { useState } from 'react';
import { Toaster } from './ui/toaster';
import { useToast } from './hooks/use-toast';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { generateItinerary } from './api';
import { 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  Heart, 
  Send,
  Loader2,
  Bookmark
} from 'lucide-react';

const StandaloneExploreApp = () => {
  const [city, setCity] = useState('');
  const [interests, setInterests] = useState('');
  const [budget, setBudget] = useState('');
  const [people, setPeople] = useState('2');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [comments, setComments] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<string | null>(null);
  const [weatherInfo, setWeatherInfo] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!city || !fromDate || !toDate || !budget) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await generateItinerary({
        city,
        interests: interests.split(',').map(i => i.trim()),
        budget,
        people,
        from_date: fromDate,
        to_date: toDate,
        comments
      });
      
      setGeneratedItinerary(result.itinerary);
      setWeatherInfo(result.weather);
      
      toast({
        title: "Itinerary generated!",
        description: `Your trip to ${city} has been planned.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate itinerary. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePin = () => {
    if (!generatedItinerary) return;
    
    // Here you would save the pin to your system
    toast({
      title: "Pin created!",
      description: `Your itinerary for ${city} has been saved.`,
    });
  };

  const formatItinerary = (text: string) => {
    // Convert markdown-style bold to HTML
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Travel Explorer</h1>
          <p className="text-muted-foreground">Generate personalized travel itineraries and save your favorite destinations</p>
        </div>
        
        {!generatedItinerary ? (
          <Card>
            <CardHeader>
              <CardTitle>Create Your Travel Plan</CardTitle>
              <CardDescription>
                Tell us about your trip and our AI will generate a personalized itinerary
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Destination</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="City, Country"
                        className="w-full pl-10 py-2 px-3 border rounded-md"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Start Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <input
                          type="date"
                          className="w-full pl-10 py-2 px-3 border rounded-md"
                          value={fromDate}
                          onChange={(e) => setFromDate(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">End Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <input
                          type="date"
                          className="w-full pl-10 py-2 px-3 border rounded-md"
                          value={toDate}
                          onChange={(e) => setToDate(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Budget per Person (INR)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <input
                        type="number"
                        placeholder="30000"
                        className="w-full pl-10 py-2 px-3 border rounded-md"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Number of Travelers</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <input
                        type="number"
                        placeholder="2"
                        min="1"
                        className="w-full pl-10 py-2 px-3 border rounded-md"
                        value={people}
                        onChange={(e) => setPeople(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Interests</label>
                  <div className="relative">
                    <Heart className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Nature, History, Food, Adventure..."
                      className="w-full pl-10 py-2 px-3 border rounded-md"
                      value={interests}
                      onChange={(e) => setInterests(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Separate interests with commas</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Additional Information</label>
                  <textarea
                    placeholder="Any specific preferences, dietary restrictions, accessibility needs, or special occasions?"
                    className="w-full min-h-24 py-2 px-3 border rounded-md resize-none"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating your itinerary...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Generate Itinerary
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Your Trip to {city}</h2>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={handleCreatePin}
                >
                  <Bookmark className="mr-2 h-4 w-4" />
                  Create Pin
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setGeneratedItinerary(null)}
                >
                  New Plan
                </Button>
              </div>
            </div>
            
            {weatherInfo && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="mr-2 p-2 bg-blue-100 rounded-full">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-800">Weather Forecast</h3>
                      <p className="text-sm text-blue-600">{weatherInfo}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <Card>
              <CardContent className="p-6">
                <div 
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: formatItinerary(generatedItinerary) }}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default StandaloneExploreApp;
