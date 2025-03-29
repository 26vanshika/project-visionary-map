import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ItineraryResult from "./ItineraryResult";

const ItineraryGenerator = () => {
  const [itinerary, setItinerary] = useState(null);
  const { toast } = useToast();

  const generateItinerary = async () => {
    try {
      const response = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ /* user inputs */ }),
      });
      const data = await response.json();
      setItinerary(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate itinerary.",
      });
    }
  };

  return (
    <div>
      <Button onClick={generateItinerary} className="mt-4">
        Generate Itinerary
      </Button>
      {itinerary && <ItineraryResult itinerary={itinerary} />}
    </div>
  );
};

export default ItineraryGenerator;
