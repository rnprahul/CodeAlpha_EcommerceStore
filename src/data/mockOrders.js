export const initialOrders = [
  {
    id: 'QK-98241',
    date: '2026-08-10',
    status: 'Delivered',
    statusStep: 4, // 1: Placed, 2: Processing, 3: Shipped, 4: Delivered
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    total: 235.98,
    shippingAddress: {
      fullName: 'Alex Morgan',
      address: '742 Evergreen Terrace',
      city: 'Springfield',
      state: 'IL',
      pinCode: '62704',
      phone: '+1 (555) 234-5678'
    },
    items: [
      {
        id: 'prod-elec-1',
        name: 'AcousticPro Wireless ANC Headphones',
        price: 189.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        color: '#0f172a'
      },
      {
        id: 'prod-home-1',
        name: 'Lumina Touch Dimmable LED Desk Lamp',
        price: 45.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=800&q=80',
        color: '#ffffff'
      }
    ]
  },
  {
    id: 'QK-97510',
    date: '2026-08-14',
    status: 'Shipped',
    statusStep: 3,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    total: 119.99,
    shippingAddress: {
      fullName: 'Alex Morgan',
      address: '742 Evergreen Terrace',
      city: 'Springfield',
      state: 'IL',
      pinCode: '62704',
      phone: '+1 (555) 234-5678'
    },
    items: [
      {
        id: 'prod-fash-4',
        name: 'RetroStrider Leather Streetwear Sneakers',
        price: 119.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
        size: '10',
        color: '#ffffff'
      }
    ]
  }
];
