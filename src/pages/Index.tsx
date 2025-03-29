
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/layout/Footer";
import ItineraryGenerator from "@/components/itinerary/ItineraryGenerator";
import ExploreBoard from "@/components/explore/ExploreBoard";
import FeaturesSection from "@/components/sections/FeaturesSection";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>("generate");
  const { toast } = useToast();

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
          <div className="text-center mb-8">
            <Link to="/travel-planner">
              <Button size="lg" className="mx-auto">
                Try Our New AI Travel Planner
              </Button>
            </Link>
          </div>

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
