import React, { useState } from 'react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Button from '../components/atoms/Button';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const menuItems = [
    {
      id: 1,
      name: "Seared Wagyu Tenderloin",
      description: "Premium A5 Wagyu with truffle reduction and seasonal vegetables",
      price: 125,
      category: "main",
      image: "https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      dietary: ["gluten-free"]
    },
    {
      id: 2,
      name: "Mediterranean Sea Bass",
      description: "Fresh catch with olive tapenade, roasted tomatoes, and herb oil",
      price: 85,
      category: "main",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      dietary: ["pescatarian", "gluten-free"]
    },
    {
      id: 3,
      name: "Truffle Risotto",
      description: "Creamy arborio rice with black truffle shavings and parmesan",
      price: 65,
      category: "starter",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      dietary: ["vegetarian"]
    },
    {
      id: 4,
      name: "Chocolate Soufflé",
      description: "Dark chocolate soufflé with vanilla bean ice cream and gold leaf",
      price: 45,
      category: "dessert",
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      dietary: ["vegetarian"]
    },
    {
      id: 5,
      name: "Oysters Rockefeller",
      description: "Fresh Blue Point oysters with spinach, herbs, and hollandaise",
      price: 35,
      category: "starter",
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      dietary: ["pescatarian", "gluten-free"]
    },
    {
      id: 6,
      name: "Vintage Wine Selection",
      description: "Curated selection of premium wines from our cellar",
      price: 25,
      category: "drinks",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      dietary: ["vegan"]
    },
    {
      id: 7,
      name: "Lobster Bisque",
      description: "Rich and creamy lobster bisque with cognac and fresh herbs",
      price: 28,
      category: "starter",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      dietary: ["pescatarian"]
    },
    {
      id: 8,
      name: "Duck Confit",
      description: "Slow-cooked duck leg with cherry gastrique and roasted potatoes",
      price: 95,
      category: "main",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      dietary: ["gluten-free"]
    },
    {
      id: 9,
      name: "Seared Scallops",
      description: "Pan-seared scallops with cauliflower purée and pancetta",
      price: 75,
      category: "main",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      dietary: ["pescatarian", "gluten-free"]
    },
    {
      id: 10,
      name: "Beef Tartare",
      description: "Hand-cut prime beef with quail egg and traditional accompaniments",
      price: 42,
      category: "starter",
      image: "https://images.unsplash.com/photo-1432139509613-5c4255815697?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      dietary: ["gluten-free"]
    },
    {
      id: 11,
      name: "Tiramisu",
      description: "Classic Italian dessert with espresso-soaked ladyfingers",
      price: 18,
      category: "dessert",
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      dietary: ["vegetarian"]
    },
    {
      id: 12,
      name: "Crème Brûlée",
      description: "Vanilla bean custard with caramelized sugar crust",
      price: 22,
      category: "dessert",
      image: "https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      dietary: ["vegetarian", "gluten-free"]
    },
    {
      id: 13,
      name: "Craft Cocktails",
      description: "Artisanal cocktails crafted by our master mixologist",
      price: 18,
      category: "drinks",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      dietary: ["vegan"]
    },
    {
      id: 14,
      name: "Fresh Artisan Coffee",
      description: "Single-origin coffee beans roasted to perfection",
      price: 8,
      category: "drinks",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      dietary: ["vegan"]
    },
    {
      id: 15,
      name: "Lamb Rack",
      description: "Herb-crusted rack of lamb with rosemary jus and ratatouille",
      price: 110,
      category: "main",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      dietary: ["gluten-free"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'starter', name: 'Starters' },
    { id: 'main', name: 'Main Course' },
    { id: 'dessert', name: 'Desserts' },
    { id: 'drinks', name: 'Beverages' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const handleAddToCart = (item: any) => {
    console.log('Adding to cart:', item);
    // TODO: Implement cart functionality
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl lg:text-7xl font-serif font-light mb-6">
            Our <span className="text-amber-400">Menu</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our carefully crafted dishes, each a masterpiece of flavor and artistry
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-800 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-500 hover:shadow-2xl group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-amber-500 text-black px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.dietary.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-amber-400">${item.price}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Menu;
