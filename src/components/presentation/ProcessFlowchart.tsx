
import React from "react";
import { 
  Calendar, 
  Users, 
  Map, 
  Cloud, 
  MessageSquare, 
  Share2, 
  Wifi, 
  RefreshCw,
  ArrowRight
} from "lucide-react";

const ProcessFlowchart = () => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[768px] flex flex-col items-center">
        {/* Flowchart steps */}
        <div className="w-full flex justify-between items-start mb-16">
          {/* Step 1: User Input */}
          <FlowchartNode 
            icon={<Users className="h-6 w-6" />}
            title="User Input"
            description="User inputs travel details, preferences, budget and interests"
            color="bg-blue-100"
            borderColor="border-blue-300"
            iconColor="text-blue-500"
            number={1}
          />
          
          {/* Step 2: AI Processing */}
          <FlowchartNode 
            icon={<Cloud className="h-6 w-6" />}
            title="AI Processing"
            description="ML-based prediction of weather, crowds, and optimal scheduling"
            color="bg-purple-100"
            borderColor="border-purple-300"
            iconColor="text-purple-500"
            number={2}
          />
          
          {/* Step 3: Real-time Updates */}
          <FlowchartNode 
            icon={<RefreshCw className="h-6 w-6" />}
            title="Real-time Updates"
            description="Live adjustments for weather, traffic, venue closures"
            color="bg-green-100"
            borderColor="border-green-300"
            iconColor="text-green-500"
            number={3}
          />
          
          {/* Step 4: Exploration */}
          <FlowchartNode 
            icon={<Share2 className="h-6 w-6" />}
            title="Community Sharing"
            description="Users browse and share itineraries on the explore board"
            color="bg-amber-100"
            borderColor="border-amber-300"
            iconColor="text-amber-500"
            number={4}
          />
          
          {/* Step 5: Offline Access */}
          <FlowchartNode 
            icon={<Wifi className="h-6 w-6" />}
            title="Offline Access"
            description="Travelers access their plans without internet connection"
            color="bg-red-100"
            borderColor="border-red-300"
            iconColor="text-red-500"
            number={5}
          />
        </div>
        
        {/* Connection arrows */}
        <div className="w-full relative flex justify-between px-12 -mt-20">
          <ArrowConnection />
          <ArrowConnection />
          <ArrowConnection />
          <ArrowConnection />
        </div>
        
        {/* Core features */}
        <div className="w-full grid grid-cols-3 gap-8 mt-8">
          <FeatureBox 
            icon={<Calendar className="h-5 w-5" />}
            title="Smart Planning"
            description="Predictive AI analyzes patterns to create optimal daily schedules"
          />
          
          <FeatureBox 
            icon={<MessageSquare className="h-5 w-5" />}
            title="AI Assistant"
            description="24/7 chatbot providing travel advice and itinerary adjustments"
          />
          
          <FeatureBox 
            icon={<Map className="h-5 w-5" />}
            title="Interactive Maps"
            description="Visual representation of daily activities with directions"
          />
        </div>
      </div>
    </div>
  );
};

const FlowchartNode = ({ 
  icon, 
  title, 
  description, 
  color, 
  borderColor, 
  iconColor,
  number
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  color: string; 
  borderColor: string;
  iconColor: string;
  number: number;
}) => (
  <div className="flex flex-col items-center w-48">
    <div className={`relative w-16 h-16 rounded-full ${color} border ${borderColor} flex items-center justify-center mb-3`}>
      <div className={`${iconColor}`}>{icon}</div>
      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
        {number}
      </div>
    </div>
    <h3 className="text-center font-semibold mb-2">{title}</h3>
    <p className="text-center text-xs text-muted-foreground">{description}</p>
  </div>
);

const ArrowConnection = () => (
  <div className="flex-1 flex items-center justify-center">
    <div className="h-0.5 w-full bg-gray-300 relative">
      <ArrowRight className="text-gray-300 absolute -right-3 -top-2 h-5 w-5" />
    </div>
  </div>
);

const FeatureBox = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => (
  <div className="border border-border rounded-lg p-4 bg-card hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 rounded-md bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="font-medium">{title}</h3>
    </div>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default ProcessFlowchart;
