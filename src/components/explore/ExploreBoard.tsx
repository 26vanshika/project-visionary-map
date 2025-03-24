
import { useState, useEffect } from "react";
import { Search, Filter, ChevronDown, Heart, MapPin, Calendar, DollarSign, Share2, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const MOCK_ITINERARIES = [
  {
    id: 1,
    title: "Weekend in Paris",
    destination: "Paris, France",
    duration: "3 days",
    budget: "$1200",
    likes: 128,
    author: "Emma Wilson",
    authorAvatar: "https://i.pravatar.cc/150?img=1",
    coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop",
    tags: ["romantic", "culture", "food"],
  },
  {
    id: 2,
    title: "Japan Cherry Blossom Tour",
    destination: "Tokyo & Kyoto, Japan",
    duration: "10 days",
    budget: "$3000",
    likes: 347,
    author: "Alex Chen",
    authorAvatar: "https://i.pravatar.cc/150?img=2",
    coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
    tags: ["nature", "culture", "spring"],
  },
  {
    id: 3,
    title: "Iceland Adventure",
    destination: "Reykjavik, Iceland",
    duration: "7 days",
    budget: "$2200",
    likes: 93,
    author: "Marcus Johnson",
    authorAvatar: "https://i.pravatar.cc/150?img=3",
    coverImage: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=2127&auto=format&fit=crop",
    tags: ["adventure", "nature", "hiking"],
  },
  {
    id: 4,
    title: "Greek Island Hopping",
    destination: "Athens, Santorini & Mykonos",
    duration: "12 days",
    budget: "$2800",
    likes: 215,
    author: "Sofia Garcia",
    authorAvatar: "https://i.pravatar.cc/150?img=4",
    coverImage: "https://images.unsplash.com/photo-1555993539-1732b0258235?q=80&w=2070&auto=format&fit=crop",
    tags: ["beach", "relaxation", "summer"],
  },
  {
    id: 5,
    title: "New York City Weekend",
    destination: "New York, USA",
    duration: "4 days",
    budget: "$1800",
    likes: 176,
    author: "James Wilson",
    authorAvatar: "https://i.pravatar.cc/150?img=5",
    coverImage: "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?q=80&w=2070&auto=format&fit=crop",
    tags: ["city", "shopping", "food"],
  },
  {
    id: 6,
    title: "Thailand Beach Escape",
    destination: "Phuket & Krabi",
    duration: "9 days",
    budget: "$1600",
    likes: 142,
    author: "Olivia Taylor",
    authorAvatar: "https://i.pravatar.cc/150?img=6",
    coverImage: "https://images.unsplash.com/photo-1490077476659-095159692ab5?q=80&w=2033&auto=format&fit=crop",
    tags: ["beach", "relaxation", "budget"],
  },
];

const ExploreBoard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [itineraries, setItineraries] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [likedItineraries, setLikedItineraries] = useState<number[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call to fetch itineraries
    setTimeout(() => {
      setItineraries(MOCK_ITINERARIES);
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleLike = (id: number) => {
    if (likedItineraries.includes(id)) {
      setLikedItineraries(likedItineraries.filter(itineraryId => itineraryId !== id));
    } else {
      setLikedItineraries([...likedItineraries, id]);
    }
  };

  const handleShare = (title: string) => {
    toast({
      title: "Share itinerary",
      description: `${title} has been shared to clipboard.`,
    });
  };

  const filteredItineraries = itineraries.filter(itinerary => 
    itinerary.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    itinerary.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
    itinerary.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search destinations, activities, or tags..."
            className="w-full pl-9 pr-4 py-2 rounded-md border bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="md:w-auto w-full gap-2">
          <Filter className="h-4 w-4" />
          Filter
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-48 bg-muted animate-pulse"></div>
              <CardContent className="p-6">
                <div className="h-6 bg-muted rounded animate-pulse w-3/4 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse"></div>
                  <div className="h-4 bg-muted rounded animate-pulse w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredItineraries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItineraries.map((itinerary) => (
            <Card key={itinerary.id} className="overflow-hidden shadow-sm hover:shadow-elegant transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden group cursor-pointer">
                <img
                  src={itinerary.coverImage}
                  alt={itinerary.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold">{itinerary.title}</h3>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-3 w-3 mr-1" />
                    {itinerary.destination}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute top-2 right-2 bg-black/20 hover:bg-black/40 text-white ${
                    likedItineraries.includes(itinerary.id) ? "text-red-500" : ""
                  }`}
                  onClick={() => handleLike(itinerary.id)}
                >
                  <Heart
                    className={`h-4 w-4 ${likedItineraries.includes(itinerary.id) ? "fill-red-500" : ""}`}
                  />
                </Button>
              </div>
              
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {itinerary.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="text-xs bg-muted px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                    <span>{itinerary.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-3 w-3 mr-1 text-muted-foreground" />
                    <span>{itinerary.budget}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={itinerary.authorAvatar}
                    alt={itinerary.author}
                    className="h-6 w-6 rounded-full mr-2"
                  />
                  <span className="text-xs text-muted-foreground">{itinerary.author}</span>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleShare(itinerary.title)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <Clock className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-muted/50 inline-flex rounded-full p-3 mb-4">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">No itineraries found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We couldn't find any itineraries matching your search. Try different keywords or explore other destinations.
          </p>
        </div>
      )}
    </div>
  );
};

export default ExploreBoard;
