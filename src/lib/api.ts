
interface GenerateItineraryParams {
  city: string;
  interests: string[];
  budget: string;
  people: string;
  from_date: string;
  to_date: string;
  comments?: string;
}

export async function generateItinerary(params: GenerateItineraryParams) {
  try {
    // Convert budget from INR to USD for backend if needed
    // This is just for API compatibility if your backend expects USD
    const response = await fetch('http://127.0.0.1:5000/api/generate-itinerary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...params,
        currency: 'INR', // Let the backend know we're sending INR
      }),
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    
    // Process the response to ensure all currency values are in INR format
    if (data.itinerary) {
      // This is a simple string replacement approach
      // More complex apps would use proper currency formatting
      data.itinerary = data.itinerary
        .replace(/\$(\d+)/g, '₹$1')
        .replace(/USD/g, 'INR');
    }
    
    return data;
  } catch (error) {
    console.error('Error generating itinerary:', error);
    throw error;
  }
}

export async function chatWithAssistant(message: string, itinerary: string) {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        message, 
        itinerary,
        preferences: {
          currency: 'INR',
          country: 'India'
        }
      }),
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error chatting with assistant:', error);
    throw error;
  }
}
