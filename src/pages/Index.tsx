
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/layout/Footer";
import ItineraryGenerator from "@/components/itinerary/ItineraryGenerator";
import ExploreBoard from "@/components/explore/ExploreBoard";
import FeaturesSection from "@/components/sections/FeaturesSection";
import { useToast } from "@/hooks/use-toast";
import ProcessFlowchart from "@/components/presentation/ProcessFlowchart";

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>("generate");
  const { toast } = useToast();
  const [showFlowchart, setShowFlowchart] = useState(false);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    toast({
      title: value === "generate" ? "Generate New Itinerary" : "Explore Community Itineraries",
      description: value === "generate" 
        ? "Create your personalized travel plan" 
        : "Discover travel plans from our community",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <Hero />
        <FeaturesSection />
        
        <section className="container mx-auto px-4 py-12">
          <div className="mb-8 flex justify-end">
            <button 
              onClick={() => setShowFlowchart(!showFlowchart)}
              className="text-sm px-4 py-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              {showFlowchart ? "Hide Process Flow" : "Show Process Flow"}
            </button>
          </div>
          
          {showFlowchart && (
            <div className="mb-12 p-6 border border-border rounded-lg shadow-sm bg-card">
              <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
              <ProcessFlowchart />
            </div>
          )}
          
          <Tabs defaultValue="generate" className="w-full" onValueChange={handleTabChange}>
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="generate">Generate</TabsTrigger>
              <TabsTrigger value="explore">Explore</TabsTrigger>
            </TabsList>
            
            <TabsContent value="generate" className="mt-6">
              <ItineraryGenerator />
            </TabsContent>
            
            <TabsContent value="explore" className="mt-6">
              <ExploreBoard />
            </TabsContent>
          </Tabs>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
