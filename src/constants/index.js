const categories = [
    "All",
    "Fantasy",
    "NFT",
    "Abstra",
    "Anime",
    "Games",
    "Technology",
];
const blogPosts = [
    {
        id: 1,
        category: "Games",
        title: "Simon Lizotte Take A Big Advance In The Last Tournament",
        description:
            "Back in 2019, Gucci brought video games to its app with a new section called Gucci Arcade, inspired by creative...",
        author: "Albert Orion",
        date: "Jun 21, 2021",
        authorImg:
            "https://images.unsplash.com/photo-1704272788764-d9bac602c300?q=80&w=1923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        image:
            "https://images.unsplash.com/photo-1704189125621-55e8c6cfd166?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 2,
        category: "NFT",
        title: "NVidia Release New Way Of Producing NFT’s",
        description:
            "Back in 2019, Gucci brought video games to its app with a new section called Gucci Arcade, inspired by creative...",
        author: "Angelika Johnson",
        date: "Jul 16, 2021",
        authorImg:
            "https://images.unsplash.com/photo-1668661626448-c355986efe99?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        image:
            "https://images.unsplash.com/photo-1695916296205-345c24595a92?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 3,
        category: "Fantasy",
        title: "Score Of DGPT Gran Prix 2022 Has Been Already Shared",
        description:
            "Back in 2019, Gucci brought video games to its app with a new section called Gucci Arcade, inspired by creative...",
        author: "Amanda Bjornson",
        date: "Jun 31, 2021",
        authorImg:
            "https://images.unsplash.com/photo-1696835939874-eab6eadc070e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        image:
            "https://images.unsplash.com/photo-1654792393225-3e8a53d124d2?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 4,
        category: "Technology",
        title: "Apple Launches Next Gen AR Glasses",
        description:
            "Apple enters the augmented reality market with a sleek new device that blends tech and style seamlessly...",
        author: "Jasmine Lee",
        date: "Aug 12, 2021",
        authorImg:
            "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
        image:
            "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
        id: 5,
        category: "Anime",
        title: "Top 10 Anime Series to Watch in 2025",
        description:
            "From action-packed thrillers to heartwarming tales, here’s your ultimate anime watchlist for 2025...",
        author: "Riku Tanaka",
        date: "Mar 03, 2025",
        authorImg:
            "https://images.unsplash.com/photo-1584999734482-0361aecad844?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        image:
            "https://images.unsplash.com/photo-1726065235188-20092754fc29?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 6,
        category: "Abstra",
        title: "New Age of Abstract Digital Art Emerging",
        description:
            "Digital artists are pushing the boundaries of creativity with new tools and inspirations...",
        author: "Sara Valdez",
        date: "Nov 11, 2022",
        authorImg:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
        image:
            "https://images.unsplash.com/photo-1655266351972-6c5dca79faee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 7,
        category: "Fantasy",
        title: "Legends Reborn: New Fantasy Series Announced",
        description:
            "The world of fantasy literature is expanding with an epic tale set to release this fall...",
        author: "Ella Moore",
        date: "Sep 10, 2024",
        authorImg:
            "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
        image:
            "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
        id: 8,
        category: "Games",
        title: "eSports Championship Sets New Record Viewership",
        description:
            "With millions tuning in worldwide, the recent eSports championship smashed previous streaming records...",
        author: "Carlos Ramirez",
        date: "Jan 07, 2023",
        authorImg:
            "https://images.unsplash.com/photo-1658981370004-6d64bf8e7d7e?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        image:
            "https://images.unsplash.com/photo-1744949528901-bf3121b6ef58?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 9,
        category: "Technology",
        title: "Quantum Computing Breakthrough Stuns Scientists",
        description:
            "A team of researchers has achieved a new milestone in quantum computing power and efficiency...",
        author: "Dr. Naveen Patel",
        date: "Feb 28, 2025",
        authorImg:
            "https://images.unsplash.com/photo-1599566147214-ce487862ea4f?q=80&w=2147&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        image:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
];

export {categories,blogPosts}