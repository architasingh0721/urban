<?php
require_once 'config.php';
require_once 'destination-class.php';

class DestinationSeeder {
    private $destinations = [];

    public function __construct() {
        $this->generateDestinations();
    }

    private function generateDestinations() {
        $categories = [
            'historical' => ['Ancient Forts', 'Temples', 'Palaces'],
            'beach' => ['Coastal Paradises', 'Island Retreats', 'Marine Destinations'],
            'hill' => ['Mountain Escapes', 'Scenic Highlands', 'Alpine Regions'],
            'wildlife' => ['National Parks', 'Sanctuaries', 'Forest Reserves'],
            'religious' => ['Pilgrimage Sites', 'Spiritual Destinations']
        ];

        $states = [
            'Maharashtra', 'Karnataka', 'Kerala', 'Tamil Nadu', 'Rajasthan', 
            'Gujarat', 'Himachal Pradesh', 'Uttarakhand', 'Delhi', 'Uttar Pradesh'
        ];

        for ($i = 1; $i <= 1000; $i++) {
            $category = array_rand($categories);
            $destination = [
                'name' => $categories[$category][array_rand($categories[$category])] . " $i",
                'category' => $category,
                'description' => "A beautiful destination showcasing the essence of " . $states[array_rand($states)],
                'location' => $states[array_rand($states)],
                'rating' => round(rand(30, 50) / 10, 1),
                'tickets_available' => rand(50, 500),
                'price' => rand(500, 5000),
                'tags' => json_encode([
                    'Adventure', 'Photography', 'Culture', 'Nature'
                ]),
                'images' => json_encode([
                    "placeholder-image-1.jpg",
                    "placeholder-image-2.jpg"
                ])
            ];

            $this->destinations[] = $destination;
        }
    }

    public function seedDestinations() {
        $destination = new Destination();
        
        foreach ($this->destinations as $dest) {
            $destination->createDestination($dest);
        }

        echo "Seeded " . count($this->destinations) . " destinations successfully!";
    }
}

// Run the seeder
$seeder = new DestinationSeeder();
$seeder->seedDestinations();
Last edited 9 hours ago


