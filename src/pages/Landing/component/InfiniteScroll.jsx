import React, { useEffect, useRef, useState } from "react";

const InfiniteScroll = () => {
    const scrollContainerRef = useRef(null);
    const scrollSpeed = 1; // Adjust this to control scrolling speed
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data from a free API (JSONPlaceholder in this case)
        const fetchData = async () => {
          try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const data = await response.json();
            setItems(data);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
    
      const duplicatedItems = [...items, ...items]; // Duplicate the items for seamless scrolling
    
      useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
    
        const scrollStep = () => {
          if (scrollContainer) {
            scrollContainer.scrollLeft += scrollSpeed;
    
            // Reset scroll position when reaching the end
            if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
              scrollContainer.scrollLeft = 0;
            }
          }
        };
    
        const interval = setInterval(scrollStep, 20); // Adjust interval for smoothness
    
        return () => clearInterval(interval);
      }, [scrollSpeed, items]);

  return (
    <div className="bg-white my-10">
      <div
        ref={scrollContainerRef}
        className="overflow-x-hidden whitespace-nowrap scrollbar-hide -skew-y-2 w-full p-4 bg-gray-800"
        style={{
          height: "200px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className="inline-block text-6xl font-bold text-white rounded px-4 py-2 m-2 "
          >
             {item.title.slice(0, 4)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScroll;
