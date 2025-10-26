import React, { useEffect, useState } from "react";

interface OutfitSuggestion {
  name: string;
  description: string;
  imageHint: string;
}

const OutfitSuggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<OutfitSuggestion[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/suggest")
      .then((res) => res.json())
      .then((data) => setSuggestions(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">AI Outfit Picks</h3>
      <div className="grid grid-cols-2 gap-4">
        {suggestions.map((item, index) => (
          <div key={index} className="bg-white rounded-xl p-3 shadow">
            <h4 className="font-medium">{item.name}</h4>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutfitSuggestions;
