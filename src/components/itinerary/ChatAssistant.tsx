
import React, { useState } from "react";
import { chatWithAssistant } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Loader2, Send, X } from "lucide-react";

interface ChatAssistantProps {
  destination: string;
  onClose: () => void;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ destination, onClose }) => {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { user: input, bot: "" }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await chatWithAssistant(input, destination);
      setMessages(
        newMessages.map((msg, index) =>
          index === newMessages.length - 1 ? { ...msg, bot: response.response } : msg
        )
      );
    } catch (error) {
      console.error("Error fetching response", error);
      setMessages(newMessages.map((msg, index) => 
        index === newMessages.length - 1 ? { ...msg, bot: "Error fetching response." } : msg
      ));
    }

    setLoading(false);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !loading) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg">
        <SheetHeader className="mb-4">
          <SheetTitle>Chat about {destination}</SheetTitle>
          <SheetClose className="absolute right-4 top-4" onClick={onClose}>
            <X className="h-4 w-4" />
          </SheetClose>
        </SheetHeader>
        
        <div className="flex flex-col h-[calc(100vh-10rem)]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 mb-4 border rounded-md bg-muted/30">
            {messages.length === 0 ? (
              <p className="text-center text-muted-foreground p-4">
                Ask questions about your trip to {destination}!
              </p>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="bg-primary text-primary-foreground p-2 rounded-lg rounded-tr-none max-w-[80%]">
                      <p>{msg.user}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 justify-end">
                    <div className="bg-muted p-2 rounded-lg rounded-tl-none max-w-[80%]">
                      <p>{msg.bot || "Typing..."}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="flex justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Input
              placeholder="Ask something about your trip..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={loading}
              className="flex-1"
            />
            <Button 
              onClick={handleSend} 
              disabled={loading || !input.trim()} 
              size="icon"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatAssistant;
