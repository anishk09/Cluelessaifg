import React, { useEffect, useState } from "react";

interface TrendItem {
  name: string;
  views: string;
  image: string;
}

const TrendingNow: React.FC = () => {
  const [trends, setTrends] = useState<TrendItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/trends")
      .then((res) => res.json())
      .then((data) => setTrends(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Trending Now</h3>
      <div className="flex space-x-4 overflow-x-auto">
        {trends.map((trend, index) => (
          <div key={index} className="min-w-[150px]">
            <img
              src={trend.image}
              alt={trend.name}
              className="rounded-xl object-cover w-36 h-48 shadow"
            />
            <p className="mt-2 font-medium">{trend.name}</p>
            <p className="text-sm text-gray-500">{trend.views} views</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingNow;
