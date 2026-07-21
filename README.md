# 🛒 GoCart — Full-Stack E-Commerce Platform

GoCart is a full-stack e-commerce web application built from the ground up — covering product management, cart & checkout, order processing, and seller tools. Built to practice real-world full-stack architecture, from database design to authentication to deployment.

🔗 **Live Demo:** [hasnainfullstackecommerce.vercel.app](https://hasnainfullstackecommerce.vercel.app)

---

## ✨ Features

### For Buyers
- Browse all products with a clean, responsive UI
- Add items to cart and manage quantities
- Add and manage delivery addresses
- Place orders and view order history (My Orders)
- Secure user authentication and account management

### For Sellers
- Dedicated seller dashboard
- Create, edit, update, and delete product listings
- Manage incoming orders

### System
- Event-driven background jobs for order processing workflows
- Fully responsive design across devices

---

## 🛠️ Tech Stack
 
| Layer | Technology |
|---|---|
| Framework | Next.js |
| Styling | Tailwind CSS |
| Database | MongoDB (via Mongoose) |
| Authentication | Clerk |
| Image Hosting | Cloudinary |
| Background Jobs | Inngest |
| Deployment | Vercel |

---

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── cart/
│   │   ├── inngest/
│   │   ├── order/
│   │   ├── product/
│   │   └── user/
│   ├── add-address/
│   ├── all-products/
│   ├── cart/
│   ├── my-orders/
│   ├── order-placed/
│   ├── product/
│   └── seller/
├── assets/
├── components/
├── config/
│   ├── db.js
│   └── inngest.js
├── context/
│   └── AppContext.jsx
└── public/
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB database (local or Atlas)
- Clerk account for authentication keys

### Installation

```bash
# Clone the repository
git clone https://github.com/hasnainDevX/full-stack-ecommerce.git
cd full-stack-ecommerce

# Install dependencies
npm install

# Set up environment variables
# Create a .env.local file with your MongoDB URI, Clerk keys, etc.

# Run the development server
npm run dev
```

Visit `http://localhost:3000` to view the app.

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory with the following:

```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
INNGEST_EVENT_KEY=your_inngest_event_key
```

---

## 📌 Roadmap / Future Improvements

- Payment gateway integration (Stripe)
- Product search and filtering
- Order status tracking for buyers
- Admin analytics dashboard

---

## 👤 Author

**Muhammad Hasnain**
Software Engineering Student @ SSUET | MERN Stack Developer

- GitHub: [@hasnainDevX](https://github.com/hasnainDevX)
- LinkedIn: [muhammadhasnain79](https://linkedin.com/in/muhammadhasnain79)
- Portfolio: [hasnainwebworks.vercel.app](https://hasnainwebworks.vercel.app)

---

## 📄 License

This project is open for learning purposes. Feel free to explore the code.