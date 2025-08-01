from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import os
from datetime import datetime
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-change-this-in-production'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///woodworking.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'static/uploads'

# Ensure upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'admin_login'

# Database Models
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, default=0)
    image_url = db.Column(db.String(200))
    category = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(100), nullable=False)
    customer_email = db.Column(db.String(120), nullable=False)
    customer_phone = db.Column(db.String(20))
    customer_address = db.Column(db.Text, nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default='pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    items = db.relationship('OrderItem', backref='order', lazy=True)

class OrderItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    product = db.relationship('Product')

class SiteContent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(100), unique=True, nullable=False)
    value = db.Column(db.Text, nullable=False)
    description = db.Column(db.String(200))
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Public Routes (E-commerce Frontend)
@app.route('/')
def index():
    products = Product.query.filter_by(is_active=True).all()
    
    # Get site content
    site_content = {}
    content_items = SiteContent.query.all()
    for item in content_items:
        site_content[item.key] = item.value
    
    return render_template('index.html', products=products, site_content=site_content)

@app.route('/product/<int:product_id>')
def product_detail(product_id):
    product = Product.query.get_or_404(product_id)
    return render_template('product_detail.html', product=product)

@app.route('/cart')
def cart():
    cart_items = session.get('cart', {})
    products = []
    total = 0
    
    for product_id, quantity in cart_items.items():
        product = Product.query.get(product_id)
        if product:
            products.append({
                'product': product,
                'quantity': quantity,
                'subtotal': product.price * quantity
            })
            total += product.price * quantity
    
    return render_template('cart.html', products=products, total=total)

@app.route('/add_to_cart/<int:product_id>', methods=['POST'])
def add_to_cart(product_id):
    quantity = int(request.form.get('quantity', 1))
    cart = session.get('cart', {})
    
    if str(product_id) in cart:
        cart[str(product_id)] += quantity
    else:
        cart[str(product_id)] = quantity
    
    session['cart'] = cart
    flash('Item added to cart!', 'success')
    return redirect(url_for('cart'))

@app.route('/remove_from_cart/<int:product_id>')
def remove_from_cart(product_id):
    cart = session.get('cart', {})
    cart.pop(str(product_id), None)
    session['cart'] = cart
    flash('Item removed from cart!', 'success')
    return redirect(url_for('cart'))

@app.route('/checkout', methods=['GET', 'POST'])
def checkout():
    if request.method == 'POST':
        cart_items = session.get('cart', {})
        if not cart_items:
            flash('Your cart is empty!', 'error')
            return redirect(url_for('cart'))
        
        # Create order
        order = Order(
            customer_name=request.form['name'],
            customer_email=request.form['email'],
            customer_phone=request.form['phone'],
            customer_address=request.form['address'],
            total_amount=0
        )
        
        total = 0
        for product_id, quantity in cart_items.items():
            product = Product.query.get(product_id)
            if product and product.stock >= quantity:
                order_item = OrderItem(
                    product_id=product_id,
                    quantity=quantity,
                    price=product.price
                )
                order.items.append(order_item)
                total += product.price * quantity
                
                # Update stock
                product.stock -= quantity
        
        order.total_amount = total
        db.session.add(order)
        db.session.commit()
        
        # Clear cart
        session.pop('cart', None)
        
        flash('Order placed successfully! We will contact you soon.', 'success')
        return redirect(url_for('index'))
    
    cart_items = session.get('cart', {})
    products = []
    total = 0
    
    for product_id, quantity in cart_items.items():
        product = Product.query.get(product_id)
        if product:
            products.append({
                'product': product,
                'quantity': quantity,
                'subtotal': product.price * quantity
            })
            total += product.price * quantity
    
    return render_template('checkout.html', products=products, total=total)

# Admin Routes
@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        
        if user and check_password_hash(user.password_hash, password) and user.is_admin:
            login_user(user)
            return redirect(url_for('admin_dashboard'))
        else:
            flash('Invalid credentials!', 'error')
    
    return render_template('admin/login.html')

@app.route('/admin/logout')
@login_required
def admin_logout():
    logout_user()
    return redirect(url_for('admin_login'))

@app.route('/admin/dashboard')
@login_required
def admin_dashboard():
    if not current_user.is_admin:
        return redirect(url_for('admin_login'))
    
    total_products = Product.query.count()
    total_orders = Order.query.count()
    recent_orders = Order.query.order_by(Order.created_at.desc()).limit(5).all()
    low_stock_products = Product.query.filter(Product.stock < 5).all()
    
    return render_template('admin/dashboard.html',
                         total_products=total_products,
                         total_orders=total_orders,
                         recent_orders=recent_orders,
                         low_stock_products=low_stock_products)

@app.route('/admin/products')
@login_required
def admin_products():
    if not current_user.is_admin:
        return redirect(url_for('admin_login'))
    
    products = Product.query.all()
    return render_template('admin/products.html', products=products)

@app.route('/admin/products/add', methods=['GET', 'POST'])
@login_required
def admin_add_product():
    if not current_user.is_admin:
        return redirect(url_for('admin_login'))
    
    if request.method == 'POST':
        name = request.form['name']
        description = request.form['description']
        price = float(request.form['price'])
        stock = int(request.form['stock'])
        category = request.form['category']
        
        # Handle image upload
        image_url = ''
        if 'image' in request.files:
            file = request.files['image']
            if file and file.filename:
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                image_url = f'uploads/{filename}'
        
        product = Product(
            name=name,
            description=description,
            price=price,
            stock=stock,
            category=category,
            image_url=image_url
        )
        
        db.session.add(product)
        db.session.commit()
        flash('Product added successfully!', 'success')
        return redirect(url_for('admin_products'))
    
    return render_template('admin/add_product.html')

@app.route('/admin/products/edit/<int:product_id>', methods=['GET', 'POST'])
@login_required
def admin_edit_product(product_id):
    if not current_user.is_admin:
        return redirect(url_for('admin_login'))
    
    product = Product.query.get_or_404(product_id)
    
    if request.method == 'POST':
        product.name = request.form['name']
        product.description = request.form['description']
        product.price = float(request.form['price'])
        product.stock = int(request.form['stock'])
        product.category = request.form['category']
        product.is_active = 'is_active' in request.form
        
        # Handle image upload
        if 'image' in request.files:
            file = request.files['image']
            if file and file.filename:
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                product.image_url = f'uploads/{filename}'
        
        db.session.commit()
        flash('Product updated successfully!', 'success')
        return redirect(url_for('admin_products'))
    
    return render_template('admin/edit_product.html', product=product)

@app.route('/admin/products/delete/<int:product_id>')
@login_required
def admin_delete_product(product_id):
    if not current_user.is_admin:
        return redirect(url_for('admin_login'))
    
    product = Product.query.get_or_404(product_id)
    db.session.delete(product)
    db.session.commit()
    flash('Product deleted successfully!', 'success')
    return redirect(url_for('admin_products'))

@app.route('/admin/orders')
@login_required
def admin_orders():
    if not current_user.is_admin:
        return redirect(url_for('admin_login'))
    
    orders = Order.query.order_by(Order.created_at.desc()).all()
    return render_template('admin/orders.html', orders=orders)

@app.route('/admin/orders/<int:order_id>')
@login_required
def admin_order_detail(order_id):
    if not current_user.is_admin:
        return redirect(url_for('admin_login'))
    
    order = Order.query.get_or_404(order_id)
    return render_template('admin/order_detail.html', order=order)

@app.route('/admin/orders/<int:order_id>/status', methods=['POST'])
@login_required
def admin_update_order_status(order_id):
    if not current_user.is_admin:
        return redirect(url_for('admin_login'))
    
    order = Order.query.get_or_404(order_id)
    order.status = request.form['status']
    db.session.commit()
    flash('Order status updated!', 'success')
    return redirect(url_for('admin_order_detail', order_id=order_id))

# Content Management Routes
@app.route('/admin/content')
@login_required
def admin_content():
    if not current_user.is_admin:
        return redirect(url_for('admin_login'))
    
    content_items = SiteContent.query.order_by(SiteContent.key).all()
    return render_template('admin/content.html', content_items=content_items)

@app.route('/admin/content/edit/<int:content_id>', methods=['GET', 'POST'])
@login_required
def admin_edit_content(content_id):
    if not current_user.is_admin:
        return redirect(url_for('admin_login'))
    
    content = SiteContent.query.get_or_404(content_id)
    
    if request.method == 'POST':
        content.value = request.form.get('value')
        content.description = request.form.get('description')
        db.session.commit()
        flash('Content updated successfully!', 'success')
        return redirect(url_for('admin_content'))
    
    return render_template('admin/edit_content.html', content=content)

@app.route('/admin/content/add', methods=['GET', 'POST'])
@login_required
def admin_add_content():
    if not current_user.is_admin:
        return redirect(url_for('admin_login'))
    
    if request.method == 'POST':
        key = request.form.get('key')
        value = request.form.get('value')
        description = request.form.get('description')
        
        if key and value:
            new_content = SiteContent(key=key, value=value, description=description)
            db.session.add(new_content)
            db.session.commit()
            flash('Content added successfully!', 'success')
            return redirect(url_for('admin_content'))
        else:
            flash('Key and value are required!', 'error')
    
    return render_template('admin/add_content.html')

@app.route('/admin/content/delete/<int:content_id>')
@login_required
def admin_delete_content(content_id):
    if not current_user.is_admin:
        return redirect(url_for('admin_login'))
    
    content = SiteContent.query.get_or_404(content_id)
    db.session.delete(content)
    db.session.commit()
    flash('Content deleted successfully!', 'success')
    return redirect(url_for('admin_content'))

# Initialize database and create admin user
def init_db():
    with app.app_context():
        db.create_all()
        
        # Create admin user if it doesn't exist
        admin_user = User.query.filter_by(username='admin').first()
        if not admin_user:
            admin_user = User(
                username='admin',
                password_hash=generate_password_hash('admin123'),
                is_admin=True
            )
            db.session.add(admin_user)
            db.session.commit()
            print("Admin user created: username='admin', password='admin123'")

if __name__ == '__main__':
    init_db()
    # Use environment variable for port, default to 5000
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port) 