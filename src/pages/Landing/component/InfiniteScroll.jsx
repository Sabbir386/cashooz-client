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
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
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

  // const duplicatedItems = [...items, ...items]; // Duplicate the items for seamless scrolling
  const duplicatedItems = [
    {
      name: "PayPal",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
    },
   
    {
      name: "Stripe",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
    },
    {
      name: "Apple Pay",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg",
    },
    {
      name: "Google Pay",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg",
    },
    {
      name: "Bitcoin",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg",
    },
    {
      name: "Litecoin",
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Litecoin_Logo.jpg",
    },
    {
      name: "Ethereum",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/01/Ethereum_logo_translucent.svg",
    },
    {
      name: "PayPal",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
    },
   
    {
      name: "Dogecoin",
      logo: "https://upload.wikimedia.org/wikipedia/en/d/d0/Dogecoin_Logo.png",
    },
   
    {
      name: "Stripe",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
    },
    {
      name: "Apple Pay",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg",
    },
    {
      name: "Google Pay",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg",
    },
    {
      name: "Bitcoin",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg",
    },
    {
      name: "Litecoin",
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Litecoin_Logo.jpg",
    },
    {
      name: "Ethereum",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/01/Ethereum_logo_translucent.svg",
    },
   
  ]; // Duplicate the items for seamless scrolling
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
    <div className="bg-secondaryColor py-5">
      <div
        ref={scrollContainerRef}
        className="overflow-x-hidden whitespace-nowrap scrollbar-hide -skew-y-2 w-full p-4 bg-primaryColor"
        style={{
          height: "200px",
          display: "flex",
          alignItems: "center",
          gap: "50px",
        }}
      >
        {duplicatedItems.map((item, index) => (
          // <div
          //   key={index}
          //   className="inline-block text-6xl font-bold text-white rounded px-4 py-2 m-2 "
          // >
          //   {/* {item.name} */}
            
          // </div>
          <img key={index} src={item.logo} alt="" className="inline-block w-20 h-20 object-scale-down"/>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScroll;
