
import React, { useState } from 'react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Button from '../components/atoms/Button';
import { useMenu } from '../hooks/useMenu';
import { preOrderService } from '../services/preOrderService';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, CreditCard, MapPin, Phone, User, Mail, ShoppingCart, Plus, Minus } from 'lucide-react';

const PreOrder = () => {
  const { menuItems } = useMenu();
  const { toast } = useToast();
  
  const [selectedItems, setSelectedItems] = useState<Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>>([]);
  
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    pickupDate: '',
    pickupTime: '',
    specialInstructions: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('card');

  const addToPreOrder = (item: any) => {
    const existingItem = selectedItems.find(selected => selected.id === item.id);
    if (existingItem) {
      setSelectedItems(prev => prev.map(selected => 
        selected.id === item.id 
          ? { ...selected, quantity: selected.quantity + 1 }
          : selected
      ));
    } else {
      setSelectedItems(prev => [...prev, {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1
      }]);
    }
  };

  const updateQuantity = (id: number, change: number) => {
    setSelectedItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + change);
        return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean) as Array<{ id: number; name: string; price: number; quantity: number; }>);
  };

  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedItems.length === 0) {
      toast({
        title: "No Items Selected",
        description: "Please select at least one item for your pre-order",
        variant: "destructive",
      });
      return;
    }

    const preOrder = {
      customerInfo,
      items: selectedItems,
      total: calculateTotal(),
      paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    preOrderService.addPreOrder(preOrder);
    
    toast({
      title: "Pre-Order Submitted",
      description: "Your pre-order has been submitted successfully! We'll contact you for confirmation.",
    });

    // Reset form
    setSelectedItems([]);
    setCustomerInfo({
      name: '',
      email: '',
      phone: '',
      address: '',
      pickupDate: '',
      pickupTime: '',
      specialInstructions: ''
    });
  };

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
  ];

  const categorizedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof menuItems>);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl lg:text-7xl font-serif font-light mb-6">
            <span className="text-amber-400">Pre-Order</span> Your Meal
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Order ahead and skip the wait. Pick up your gourmet meal at your convenience.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Menu Selection */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-serif text-white mb-8">Select Your Items</h2>
              
              {Object.entries(categorizedItems).map(([category, items]) => (
                <div key={category} className="mb-12">
                  <h3 className="text-2xl font-serif text-amber-400 mb-6 capitalize">
                    {category}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {items.map((item) => (
                      <div key={item.id} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h4 className="text-xl font-semibold text-white mb-2">{item.name}</h4>
                            <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                            <div className="flex items-center space-x-2 mb-3">
                              {item.dietary.map((diet) => (
                                <span key={diet} className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                                  {diet}
                                </span>
                              ))}
                            </div>
                            <p className="text-2xl font-bold text-amber-400">${item.price}</p>
                          </div>
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg ml-4"
                          />
                        </div>
                        <Button onClick={() => addToPreOrder(item)} className="w-full">
                          <Plus className="w-4 h-4 mr-2" />
                          Add to Pre-Order
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary & Customer Info */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-xl p-6 sticky top-6">
                <h3 className="text-2xl font-serif text-white mb-6">
                  <ShoppingCart className="inline w-6 h-6 mr-2" />
                  Your Pre-Order
                </h3>

                {/* Selected Items */}
                <div className="mb-6">
                  {selectedItems.length === 0 ? (
                    <p className="text-gray-400 text-center py-4">No items selected</p>
                  ) : (
                    <div className="space-y-3 max-h-40 overflow-y-auto">
                      {selectedItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center bg-gray-700 p-3 rounded-lg">
                          <div className="flex-1">
                            <p className="text-white font-medium">{item.name}</p>
                            <p className="text-amber-400">${item.price} each</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-white px-2">{item.quantity}</span>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-700 pt-4 mb-6">
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total:</span>
                    <span className="text-amber-400">${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                {/* Customer Information Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h4 className="text-lg font-semibold text-white mb-4">Customer Information</h4>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="flex items-center text-white font-medium mb-2">
                        <User className="w-4 h-4 mr-2" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="flex items-center text-white font-medium mb-2">
                        <Mail className="w-4 h-4 mr-2" />
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="flex items-center text-white font-medium mb-2">
                        <Phone className="w-4 h-4 mr-2" />
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div>
                      <label className="flex items-center text-white font-medium mb-2">
                        <MapPin className="w-4 h-4 mr-2" />
                        Address
                      </label>
                      <input
                        type="text"
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
                        placeholder="Your address (optional)"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center text-white font-medium mb-2">
                          <Calendar className="w-4 h-4 mr-2" />
                          Pickup Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={customerInfo.pickupDate}
                          onChange={(e) => setCustomerInfo({...customerInfo, pickupDate: e.target.value})}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="flex items-center text-white font-medium mb-2">
                          <Clock className="w-4 h-4 mr-2" />
                          Pickup Time *
                        </label>
                        <select
                          required
                          value={customerInfo.pickupTime}
                          onChange={(e) => setCustomerInfo({...customerInfo, pickupTime: e.target.value})}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                        >
                          <option value="">Select time</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center text-white font-medium mb-2">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Payment Method *
                      </label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="card">Credit/Debit Card</option>
                        <option value="cash">Cash on Pickup</option>
                        <option value="digital">Digital Wallet</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-white font-medium mb-2 block">
                        Special Instructions
                      </label>
                      <textarea
                        value={customerInfo.specialInstructions}
                        onChange={(e) => setCustomerInfo({...customerInfo, specialInstructions: e.target.value})}
                        rows={3}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 resize-none"
                        placeholder="Any special requests or dietary requirements..."
                      />
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Submit Pre-Order
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PreOrder;
