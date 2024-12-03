import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mic, Settings2, RotateCw } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const DecisionMaker = () => {
  // ... previous state declarations remain the same ...
  const [input, setInput] = useState("");
  const [decision, setDecision] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [season, setSeason] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [lastQuery, setLastQuery] = useState("");

  // ... previous useEffects remain the same ...
  useEffect(() => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) setSeason("spring");
    else if (month >= 5 && month <= 7) setSeason("summer");
    else if (month >= 8 && month <= 10) setSeason("fall");
    else setSeason("winter");
  }, []);

  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) setTimeOfDay("morning");
      else if (hour >= 12 && hour < 17) setTimeOfDay("afternoon");
      else if (hour >= 17 && hour < 22) setTimeOfDay("evening");
      else setTimeOfDay("night");
    };
    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000);
    return () => clearInterval(interval);
  }, []);

  const recipes = {
    morning: {
      spring: [
        "Lemon Ricotta Pancakes",
        "Asparagus and Goat Cheese Frittata",
        "Spring Pea and Mint Omelet",
        "Rhubarb Breakfast Cake",
        "Fresh Herb Garden Quiche"
      ],
      summer: [
        "Berry Stuffed French Toast",
        "Summer Vegetable Shakshuka",
        "Peach Dutch Baby Pancake",
        "Garden Tomato Breakfast Sandwich",
        "Fresh Fruit Breakfast Pizza"
      ],
      fall: [
        "Pumpkin Spice Waffles",
        "Apple Cinnamon Dutch Baby",
        "Maple Pecan French Toast",
        "Butternut Squash Breakfast Hash",
        "Spiced Pear Oatmeal Bake"
      ],
      winter: [
        "Gingerbread Pancakes",
        "Cranberry Orange Scones",
        "Chocolate Chip Bread Pudding",
        "Eggnog French Toast",
        "Winter Spice Breakfast Strata"
      ]
    },
    afternoon: {
      spring: [
        "Spring Vegetable Pasta Primavera",
        "Herb-Crusted Rack of Lamb",
        "Lemon Asparagus Risotto",
        "Green Pea and Mint Soup",
        "Strawberry Spinach Salad"
      ],
      summer: [
        "Grilled Peach and Burrata Salad",
        "Heirloom Tomato Tart",
        "Summer Corn Chowder",
        "Watermelon Gazpacho",
        "Mediterranean Quinoa Bowl"
      ],
      fall: [
        "Butternut Squash Ravioli",
        "Apple and Sage Pork Chops",
        "Harvest Vegetable Soup",
        "Mushroom Wild Rice Pilaf",
        "Roasted Root Vegetable Salad"
      ],
      winter: [
        "Braised Short Ribs",
        "White Bean and Kale Soup",
        "Truffle Mac and Cheese",
        "Winter Citrus Salad",
        "Roasted Vegetable Grain Bowl"
      ]
    },
    evening: {
      spring: [
        "Spring Lamb with Fresh Herbs",
        "Lemon Garlic Shrimp Pasta",
        "Roasted Salmon with Asparagus",
        "Spring Pea Risotto",
        "Herb-Crusted Chicken"
      ],
      summer: [
        "Grilled Fish Tacos",
        "Summer Vegetable Ratatouille",
        "Caprese Stuffed Chicken",
        "Seafood Paella",
        "Garden Fresh Pizza"
      ],
      fall: [
        "Maple Glazed Salmon",
        "Mushroom Wellington",
        "Harvest Chicken Skillet",
        "Pumpkin Sage Pasta",
        "Apple Cider Braised Pork"
      ],
      winter: [
        "Coq au Vin",
        "Beef Bourguignon",
        "Wild Mushroom Risotto",
        "Roasted Duck with Cherry Sauce",
        "Winter Vegetable Lasagna"
      ]
    },
    night: {
      spring: [
        "Light Spring Vegetable Soup",
        "Herb-Baked Fish",
        "Spring Green Frittata",
        "Lemon Chicken with Asparagus",
        "Simple Pea and Mint Pasta"
      ],
      summer: [
        "Chilled Cucumber Soup",
        "Summer Night Salad",
        "Light Seafood Pasta",
        "Grilled Vegetable Plate",
        "Cold Noodle Bowl"
      ],
      fall: [
        "Roasted Squash Soup",
        "Warm Grain Bowl",
        "Mushroom Toast",
        "Fall Harvest Salad",
        "Simple Potato Leek Soup"
      ],
      winter: [
        "French Onion Soup",
        "Creamy Mushroom Pasta",
        "Winter Minestrone",
        "Roasted Root Vegetables",
        "Warm Lentil Salad"
      ]
    }
  };

  const generateDecision = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    // Handle recipe suggestions
    if (lowerInput.includes("recipe")) {
      const suggestions = recipes[timeOfDay][season];
      return suggestions[Math.floor(Math.random() * suggestions.length)];
    }
    
    // ... rest of the previous decision logic remains the same ...
    if (lowerInput.includes("dinner")) {
      const suggestions = dinnerSuggestions[season];
      return suggestions[Math.floor(Math.random() * suggestions.length)];
    }
    
    if (lowerInput.includes("food") || lowerInput.includes("eat")) {
      const suggestions = foodSuggestions[timeOfDay][season];
      return suggestions[Math.floor(Math.random() * suggestions.length)];
    }
    
    if (userInput.includes(" or ")) {
      const options = userInput.split(" or ");
      return options[Math.floor(Math.random() * options.length)].trim();
    }

    return "Please ask about food, dinner, recipes, or provide choices!";
  };

  // ... rest of the component remains the same ...
  const handleSubmit = (regenerate = false) => {
    const queryToUse = regenerate ? lastQuery : input;
    
    if (!queryToUse.trim()) return;
    
    setIsSpinning(true);
    setTimeout(() => {
      setDecision(generateDecision(queryToUse));
      setIsSpinning(false);
    }, 1000);

    if (!regenerate) {
      setLastQuery(input);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(false);
    }
  };

  const handleRegenerate = () => {
    handleSubmit(true);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500">
      <div className="max-w-md mx-auto space-y-6">
        <Card className="p-6 backdrop-blur-lg bg-white/10">
          <div className="flex gap-2 mb-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about recipes, food, dinner, or provide choices..."
              className="flex-1"
            />
            <Button variant="outline" size="icon">
              <Mic className="h-4 w-4" />
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings2 className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Settings</SheetTitle>
                  <SheetDescription>
                    Current Time: {timeOfDay}
                    <br />
                    Current Season: {season}
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>

          <div className="relative h-64 w-64 mx-auto perspective-1000">
            <div 
              className={`relative w-full h-full transition-transform duration-1000 transform-style-preserve-3d ${
                isSpinning ? 'animate-spin' : ''
              }`}
            >
              <div className="absolute w-0 h-0 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-0 h-0 border-l-[128px] border-r-[128px] border-b-[220px] border-l-transparent border-r-transparent border-b-white/20" />
                <div className="w-0 h-0 border-l-[128px] border-r-[128px] border-t-[220px] absolute top-0 left-0 transform -translate-x-full rotate-60 origin-top-right border-l-transparent border-r-transparent border-t-white/15" />
                <div className="w-0 h-0 border-l-[128px] border-r-[128px] border-t-[220px] absolute top-0 right-0 transform translate-x-full -rotate-60 origin-top-left border-l-transparent border-r-transparent border-t-white/10" />
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center text-center p-4 z-10">
                <div className="bg-black/40 p-4 rounded-lg backdrop-blur-sm">
                  <p className="text-white font-medium">{decision}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4 gap-2">
            <Button 
              onClick={() => handleSubmit(false)}
              className="gap-2"
            >
              Generate Decision
            </Button>
            {decision && (
              <Button 
                onClick={handleRegenerate}
                variant="outline"
                className="gap-2"
              >
                <RotateCw className="h-4 w-4" />
                New Option
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DecisionMaker;
