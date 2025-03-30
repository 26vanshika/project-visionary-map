
import React, { useState } from 'react';
import { Bookmark, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import WeatherInfo from './WeatherInfo';
import { chatWithAssistant } from '../api';

interface ItineraryDisplayProps {
  city: string;
  itinerary: string;
  itinerarySummary?: string | null;
  weatherInfo: string | null;
  onCreatePin: () => void;
  onNewPlan: () => void;
}

const ItineraryDisplay = ({ 
  city, 
  itinerary, 
  itinerarySummary,
  weatherInfo, 
  onCreatePin, 
  onNewPlan 
}: ItineraryDisplayProps) => {
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{user: string, bot: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const formatItinerary = (text: string) => {
    // Convert markdown-style bold to HTML
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />');
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const newMessages = [...chatMessages, { user: chatInput, bot: '' }];
    setChatMessages(newMessages);
    setChatInput('');
    setIsLoading(true);
    
    try {
      const response = await chatWithAssistant(chatInput, itinerary);
      setChatMessages(
        newMessages.map((msg, index) => 
          index === newMessages.length - 1 ? { ...msg, bot: response.response } : msg
        )
      );
    } catch (error) {
      console.error("Error fetching response", error);
      setChatMessages(
        newMessages.map((msg, index) => 
          index === newMessages.length - 1 ? { ...msg, bot: "Error fetching response." } : msg
        )
      );
    }
    
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Trip to {city}</h2>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={onCreatePin}
          >
            <Bookmark className="mr-2 h-4 w-4" />
            Create Pin
          </Button>
          <Button 
            variant="outline" 
            onClick={onNewPlan}
          >
            New Plan
          </Button>
        </div>
      </div>
      
      {itinerarySummary && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Trip Summary</h3>
            <p className="text-muted-foreground">{itinerarySummary}</p>
          </CardContent>
        </Card>
      )}
      
      {weatherInfo && <WeatherInfo weatherInfo={weatherInfo} />}
      
      <Card>
        <CardContent className="p-6">
          <div 
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: formatItinerary(itinerary) }}
          />
        </CardContent>
      </Card>
      
      {!showChat ? (
        <Button onClick={() => setShowChat(true)} className="w-full">
          <MessageSquare className="mr-2 h-4 w-4" />
          Ask questions about your trip
        </Button>
      ) : (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Chat with AI Assistant</h3>
            <div className="h-48 overflow-y-auto border rounded p-2 mb-4">
              {chatMessages.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center p-4">
                  Ask any questions about your trip!
                </p>
              ) : (
                chatMessages.map((msg, idx) => (
                  <div key={idx} className="mb-2">
                    <p><strong>You:</strong> {msg.user}</p>
                    <p><strong>AI:</strong> {msg.bot || 'Typing...'}</p>
                  </div>
                ))
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 p-2 border rounded"
                placeholder="Ask about your itinerary..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} disabled={isLoading || !chatInput.trim()}>
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ItineraryDisplay;
