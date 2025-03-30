
import { useState } from "react";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  DollarSign, 
  CloudSun,
  Share2, 
  Download, 
  MessageSquare,
  ChevronRight,
  ChevronDown,
  Info
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import ChatAssistant from "./ChatAssistant";

interface Activity {
  time: string;
  name: string;
  location: string;
  notes: string;
  cost: string;
  weatherSensitive: boolean;
}

interface Day {
  date: string;
  weather: string;
  activities: Activity[];
}

interface ItineraryProps {
  destination: string;
  dates: {
    start: string;
    end: string;
  };
  travelers: number;
  totalBudget: string;
  dailyBudget: string;
  weather: {
    forecast: string;
    rainyDays: number;
  };
  days: Day[];
}

interface ItineraryResultProps {
  itinerary: ItineraryProps;
}

const ItineraryResult = ({ itinerary }: ItineraryResultProps) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(0);
  const [chatOpen, setChatOpen] = useState(false);
  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleDownload = () => {
    toast({
      title: "Itinerary downloaded",
      description: "Your itinerary is now available offline",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share options",
      description: "Sharing functionality will be implemented soon!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              Trip Dates
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p>
              {formatDate(itinerary.dates.start)} - {formatDate(itinerary.dates.end)}
            </p>
            <p className="text-sm text-muted-foreground">
              {/* Calculate number of days */}
              {Math.ceil((new Date(itinerary.dates.end).getTime() - new Date(itinerary.dates.start).getTime()) / (1000 * 60 * 60 * 24))} days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-primary" />
              Budget
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p>Total: {itinerary.totalBudget}</p>
            <p className="text-sm text-muted-foreground">
              Daily: {itinerary.dailyBudget} per day
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium flex items-center">
              <CloudSun className="h-4 w-4 mr-2 text-primary" />
              Weather Forecast
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p>{itinerary.weather.forecast}</p>
            <p className="text-sm text-muted-foreground">
              {itinerary.weather.rainyDays} potentially rainy day(s)
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Real-time updates</AlertTitle>
        <AlertDescription>
          This itinerary will automatically update based on weather forecasts, venue availability, and traffic conditions.
        </AlertDescription>
      </Alert>
      
      <div className="space-y-4">
        {itinerary.days.map((day, dayIndex) => (
          <Card key={dayIndex} className={expandedDay === dayIndex ? "ring-2 ring-primary/50" : ""}>
            <div 
              className="flex items-center justify-between p-4 cursor-pointer"
              onClick={() => setExpandedDay(expandedDay === dayIndex ? null : dayIndex)}
            >
              <div className="flex items-center">
                {expandedDay === dayIndex ? (
                  <ChevronDown className="h-5 w-5 mr-2 text-primary" />
                ) : (
                  <ChevronRight className="h-5 w-5 mr-2" />
                )}
                <div>
                  <h3 className="font-medium">Day {dayIndex + 1}: {formatDate(day.date)}</h3>
                  <p className="text-sm text-muted-foreground">{day.weather}</p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {day.activities.length} activities
              </div>
            </div>
            
            {expandedDay === dayIndex && (
              <CardContent className="border-t pt-4">
                <div className="space-y-4">
                  {day.activities.map((activity, actIndex) => (
                    <div 
                      key={actIndex} 
                      className="flex p-3 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
                    >
                      <div className="text-sm font-medium w-20 flex-shrink-0 text-muted-foreground">
                        {activity.time}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{activity.name}</h4>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                          <span>{activity.location}</span>
                        </div>
                        {activity.notes && (
                          <p className="text-sm text-muted-foreground mt-1 italic">
                            {activity.notes}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm">{activity.cost}</span>
                          {activity.weatherSensitive && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                              Weather dependent
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        <Button variant="outline" onClick={handleShare} className="gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
        <Button variant="outline" onClick={handleDownload} className="gap-2">
          <Download className="h-4 w-4" />
          Save Offline
        </Button>
        <Button onClick={() => setChatOpen(true)} className="gap-2">
          <MessageSquare className="h-4 w-4" />
          Ask Questions
        </Button>
      </div>
      
      {chatOpen && (
        <ChatAssistant
          destination={itinerary.destination}
          onClose={() => setChatOpen(false)}
          itinerary={JSON.stringify(itinerary)}
        />
      )}
    </div>
  );
};

export default ItineraryResult;
