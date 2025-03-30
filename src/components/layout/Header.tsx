
import { useState, useEffect } from "react";
import { Menu, X, Map, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-smooth",
      scrolled ? "bg-background/80 backdrop-blur-sm shadow-sm py-3" : "bg-transparent py-5"
    )}>
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Map className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">UnTangled</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How It Works</a>
          <Link to="/login">
            <Button variant="outline" size="sm" className="mr-2">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="sm">
              Sign Up
            </Button>
          </Link>
        </nav>
        
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border">
          <div className="container py-4 flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <div className="flex flex-col space-y-2 pt-2">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button size="sm" className="w-full">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
