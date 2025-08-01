# 🪵 Artisan Woodworks E-commerce

A modern, professional e-commerce website for selling handcrafted woodworking items.

## 🚀 Quick Start

### Option 1: Using the Start Script (Recommended)
1. Double-click `start.bat` to launch the site
2. Open your browser and go to: **http://localhost:5000**

### Option 2: Manual Start
1. Install Python dependencies: `pip install -r requirements.txt`
2. Run the application: `python app.py`
3. Open your browser and go to: **http://localhost:5000**

## 🛍️ Store Features

### Customer Experience
- **Modern, responsive design** with Tailwind CSS
- **Product catalog** with detailed product pages
- **Shopping cart** functionality
- **Secure checkout** process
- **Order tracking** and history

### Admin Panel
- **URL:** http://localhost:5000/admin/login
- **Username:** `admin`
- **Password:** `admin123`

### Admin Features
- **Dashboard** with sales statistics and inventory alerts
- **Product management** - add, edit, delete products
- **Inventory tracking** - monitor stock levels
- **Order management** - view and process customer orders
- **Image upload** - add product photos with drag-and-drop
- **Pricing control** - adjust prices and descriptions

## 🛠️ Technical Stack

- **Backend:** Flask (Python)
- **Database:** SQLite (easily upgradeable to PostgreSQL)
- **Frontend:** HTML, Tailwind CSS, JavaScript
- **Authentication:** Flask-Login
- **File Uploads:** Pillow for image processing

## 📁 Project Structure

```
├── app.py              # Main Flask application
├── requirements.txt    # Python dependencies
├── start.bat          # Windows startup script
├── templates/         # HTML templates
│   ├── base.html      # Base template for public site
│   ├── index.html     # Homepage
│   ├── product_detail.html
│   ├── cart.html
│   ├── checkout.html
│   └── admin/         # Admin panel templates
└── static/            # CSS, JS, and image files
```

## 🎨 Customization

### Changing the Look and Feel
- Edit `templates/base.html` for global styling
- Modify `templates/index.html` for homepage layout
- Update `static/` files for custom CSS and images

### Adding Products
1. Login to admin panel: http://localhost:5000/admin/login
2. Go to "Products" section
3. Click "Add New Product"
4. Fill in details and upload images
5. Save and publish

### Database Management
- The SQLite database is automatically created on first run
- For production, consider upgrading to PostgreSQL
- Backup the `instance/` folder for data safety

## 🔧 Development

### Running in Development Mode
The app runs in debug mode by default, which provides:
- Automatic reloading on code changes
- Detailed error messages
- Debug toolbar

### Production Deployment
For production use:
1. Set `FLASK_ENV=production`
2. Use a production WSGI server (Gunicorn, uWSGI)
3. Upgrade to PostgreSQL database
4. Configure proper security settings

## 📞 Support

This e-commerce platform is designed to be:
- **Easy to use** - Simple admin interface
- **Customizable** - Full control over design and functionality
- **Scalable** - Ready for growth and additional features
- **Secure** - Built with security best practices

---

**Ready to start selling your handcrafted woodworking items!** 🪵✨ 