// Data for the places
const placesData = [
    {
        name: "Taj Mahal",
        category: "historical",
        images: ["agra.jpg"],
        rating: 4.8,
        ticketsAvailable: 120,
        price: 500,
        description: "A symbol of love and an architectural wonder of the world.",
    },
    {
        name: "Goa Beaches",
        category: "beach",
        images: ["15984870-goa-beach-goa.jpg"],
        rating: 4.5,
        ticketsAvailable: 300,
        price: 700,
        description: "Beautiful beaches and vibrant nightlife.",
    },
    {
        name: "Manali",
        category: "hill",
        images: ["manali.jpg"],
        rating: 4.7,
        ticketsAvailable: 50,
        price: 5000,
        description: "A popular hill station in Himachal Pradesh, known for its scenic beauty.",
    },
    {
        name: "Mumbai Bollywood Film City Tour",
        category: "park",
        images: ["145.jpg"],
        rating: 3.7,
        ticketsAvailable: 300,
        price: 2500,
        description: "know the bollywood Mumbai Film City to learn more about the Bollywood industry. Experience the live filming of Bollywood films",
    },
    {
        name: "Bangalore: Indoor Mini Golf Madness Ticket",
        category: "sport",
        images: ["bangalore.jpg"],
        rating: 3.9,
        ticketsAvailable: 5088,
        price: 650,
        description: "India's first indoor mini golf, that offers a unique golfing experience inspired by board games from the 90s. The arena is fully indoor, providing a comfortable and fun environment for all.",
    },
    {
        name: "Hyderabad: 9-hour Full Day Ramoji Film City Tour with Lunch",
        category: "park",
        images: ["hyderabad.jpg"],
        rating: 4.5,
        ticketsAvailable: 890,
        price: 9000,
        description: "Enjoy a memorable time in the world's largest integrated studio complex as well as India's biggest film studio, Ramoji Film City",
    },
    {
        name: "Scenic Wonders & Cultural Treasures of Kerala",
        category: "hill",
        images: ["kerala.jpg"],
        rating: 4.8,
        ticketsAvailable: 350,
        price: 90000,
        description: "A popular hill station in Himachal Pradesh, known for its scenic beauty.",
    },
    {
        name: "Jaipur: Private Full-Day City Tour",
        category: "city",
        images: ["jaipur.jpg"],
        rating: 4.8,
        ticketsAvailable: 950,
        price: 1500,
        description: "Explore Jaipur with a private driver. Travel in comfort and learn about the history of the city with your guide. as you visit highlights including the Hawa Mahal Palace, Amber Fort, and Jal Mahal.",

    },
    {
        name: "Mumbai: Elephanta Caves Half-Day Guided Tour",
        category: "park",
        images: ["mumbai.jpg"],
        rating: 4.3,
        ticketsAvailable: 700,
        price: 2450,
        description: "Discover the ancient culture and architecture surrounding the unmissable Elephanta Caves, a UNESCO World Heritage Site, on this tour. Learn about the history and stories from your guide",
    },
    {
        name: "Delhi: Old & New Delhi Private Full- or Half-Day Guided Tour",
        category: "city",
        images: ["delhi.jpg"],
        rating: 4.8,
        ticketsAvailable: 650,
        price: 600,
        description: "Embark on a full-day tour of New and Old Delhi to discover the highlights of India's capital city. Amble down the city's most bustling streets. Gaze at buildings with untold religious significance.",
    },
    {
        name: "Varanasi: Private City Highlights Day Tour & Ganges Cruise",
        category: "cruise",
        images: ["varanasi.jpg"],
        rating: 4.9,
        ticketsAvailable: 5560,
        price: 4500,
        description: "Visit Varanasi's sacred temples and university grounds on a private day tour. Immerse yourself in the city's rituals and culture as you cruise down the Ganges River and watch a Ganga Aarti ceremony.",
    },
    {
        name: "Udaipur: Full Day Private City Tour with Optional Boat Ride",
        category: "city",
        images: ["udaipur.jpg"],
        rating: 4.5,
        ticketsAvailable: 5770,
        price: 4000,
        description: "This tour is perfect for anyone who wants to see all Udaipur’s highlights in a single day. Explore the City Palace, the views of Monsoon Palace, the serenity of Fatehsagar Lake, Jagdish Temple, and Lake Pichola.",
    },
];


function renderPlaces(filteredData) {
    const container = document.getElementById("placesContainer");
    const noResults = document.getElementById("noResults");
    container.innerHTML = ""; // Clear content

    if (filteredData.length === 0) {
        noResults.style.display = "block";
        return;
    }

    noResults.style.display = "none";

    filteredData.forEach((place, index) => {
        const placeCard = document.createElement("div");
        placeCard.classList.add("place-card");

        placeCard.innerHTML = `
            <div class="place-images">
                <img src="${place.images[0]}" alt="${place.name}">
            </div>
            <div class="content">
                <h3>${place.name}</h3>
                <p>${place.description}</p>
                <div class="rating">
                    ${"★".repeat(Math.floor(place.rating))} ${place.rating}
                </div>
                <div class="availability">
                    ${place.ticketsAvailable > 0 ? 
                        `Tickets Available: ${place.ticketsAvailable}` : 
                        "<span style='color:red;'>Sold Out</span>"}
                </div>
                <p class="price">Price: ₹${place.price}</p>
                <button onclick="bookTicket(${index})" 
                    ${place.ticketsAvailable === 0 ? "disabled" : ""}>
                    Book Ticket
                </button>
            </div>
        `;
        container.appendChild(placeCard);
    });
}

// Book Ticket Functionality
function bookTicket(index) {
    const place = placesData[index];

    // Check if tickets are available
    if (place.ticketsAvailable === 0) {
        alert("Sorry, tickets are sold out.");
        return;
    }

    // Payment process via Razorpay
    const options = {
        key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay Key
        amount: place.price * 100, // Razorpay accepts amount in paise
        currency: "INR",
        name: "Explore India Ticket Booking",
        description: `Booking for ${place.name}`,
        handler: function (response) {
            // On successful payment
            alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
            place.ticketsAvailable--; // Reduce ticket count
            renderPlaces(placesData); // Re-render updated data
        },
        prefill: {
            name: "Your Na",
            email: "your-email@example.com",
            contact: "9999999999"
        },
        theme: {
            color: "#ff4d4d"
        }
    };

    const rzp = new Razorpay(options);
    rzp.open();
}

// Search functionality
function searchPlaces() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filteredData = placesData.filter(place =>
        place.name.toLowerCase().includes(query)
    );
    renderPlaces(filteredData);
}

// Filter functionality
function filterPlaces() {
    const selectedCategory = document.getElementById("filterSelect").value;
    const filteredData = selectedCategory === "all" 
        ? placesData 
        : placesData.filter(place => place.category === selectedCategory);

    renderPlaces(filteredData);
}

// Initial render of places
window.onload = () => {
    renderPlaces(placesData);
};

