from flask import Flask, render_template, request, jsonify, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'ave-musica-secret-key-2025'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ave_musica.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Database Models
class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(200))
    description = db.Column(db.Text)
    image_url = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Performance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    composer = db.Column(db.String(200))
    audio_url = db.Column(db.String(500))
    image_url = db.Column(db.String(500))
    description = db.Column(db.Text)
    category = db.Column(db.String(100))  # classical, modern, a cappella, etc.
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Newsletter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    subscribed_at = db.Column(db.DateTime, default=datetime.utcnow)

class Content(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    section = db.Column(db.String(100), nullable=False)  # about, conductor_bio, choir_bio, etc.
    title = db.Column(db.String(200))
    content = db.Column(db.Text)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# Main site routes
@app.route('/')
def index():
    events = Event.query.filter(Event.date >= datetime.now()).order_by(Event.date).limit(3).all()
    performances = Performance.query.order_by(Performance.created_at.desc()).limit(6).all()
    
    # Get content for different sections
    about_content = Content.query.filter_by(section='about').first()
    conductor_bio = Content.query.filter_by(section='conductor_bio').first()
    choir_bio = Content.query.filter_by(section='choir_bio').first()
    
    return render_template('index.html', 
                         events=events, 
                         performances=performances,
                         about_content=about_content,
                         conductor_bio=conductor_bio,
                         choir_bio=choir_bio)

# Admin routes
@app.route('/admin')
def admin_login():
    if 'admin_logged_in' in session:
        return redirect(url_for('admin_dashboard'))
    return render_template('admin/login.html')

@app.route('/admin/login', methods=['POST'])
def admin_authenticate():
    username = request.form.get('username')
    password = request.form.get('password')
    
    if username == 'admin' and password == 'avemusica2025':
        session['admin_logged_in'] = True
        return redirect(url_for('admin_dashboard'))
    else:
        flash('Invalid credentials', 'error')
        return redirect(url_for('admin_login'))

@app.route('/admin/logout')
def admin_logout():
    session.pop('admin_logged_in', None)
    return redirect(url_for('admin_login'))

@app.route('/admin/dashboard')
def admin_dashboard():
    if 'admin_logged_in' not in session:
        return redirect(url_for('admin_login'))
    
    stats = {
        'events': Event.query.count(),
        'performances': Performance.query.count(),
        'newsletter_subscribers': Newsletter.query.count(),
        'upcoming_events': Event.query.filter(Event.date >= datetime.now()).count()
    }
    
    return render_template('admin/dashboard.html', stats=stats)

@app.route('/admin/events')
def admin_events():
    if 'admin_logged_in' not in session:
        return redirect(url_for('admin_login'))
    
    events = Event.query.order_by(Event.date.desc()).all()
    return render_template('admin/events.html', events=events)

@app.route('/admin/events/add', methods=['GET', 'POST'])
def admin_add_event():
    if 'admin_logged_in' not in session:
        return redirect(url_for('admin_login'))
    
    if request.method == 'POST':
        title = request.form.get('title')
        date_str = request.form.get('date')
        location = request.form.get('location')
        description = request.form.get('description')
        image_url = request.form.get('image_url')
        
        try:
            date = datetime.strptime(date_str, '%Y-%m-%dT%H:%M')
            event = Event(title=title, date=date, location=location, 
                         description=description, image_url=image_url)
            db.session.add(event)
            db.session.commit()
            flash('Event added successfully!', 'success')
            return redirect(url_for('admin_events'))
        except Exception as e:
            flash(f'Error adding event: {str(e)}', 'error')
    
    return render_template('admin/add_event.html')

@app.route('/admin/events/edit/<int:event_id>', methods=['GET', 'POST'])
def admin_edit_event(event_id):
    if 'admin_logged_in' not in session:
        return redirect(url_for('admin_login'))
    
    event = Event.query.get_or_404(event_id)
    
    if request.method == 'POST':
        event.title = request.form.get('title')
        date_str = request.form.get('date')
        event.location = request.form.get('location')
        event.description = request.form.get('description')
        event.image_url = request.form.get('image_url')
        
        try:
            event.date = datetime.strptime(date_str, '%Y-%m-%dT%H:%M')
            db.session.commit()
            flash('Event updated successfully!', 'success')
            return redirect(url_for('admin_events'))
        except Exception as e:
            flash(f'Error updating event: {str(e)}', 'error')
    
    return render_template('admin/edit_event.html', event=event)

@app.route('/admin/events/delete/<int:event_id>')
def admin_delete_event(event_id):
    if 'admin_logged_in' not in session:
        return redirect(url_for('admin_login'))
    
    event = Event.query.get_or_404(event_id)
    db.session.delete(event)
    db.session.commit()
    flash('Event deleted successfully!', 'success')
    return redirect(url_for('admin_events'))

@app.route('/admin/performances')
def admin_performances():
    if 'admin_logged_in' not in session:
        return redirect(url_for('admin_login'))
    
    performances = Performance.query.order_by(Performance.created_at.desc()).all()
    return render_template('admin/performances.html', performances=performances)

@app.route('/admin/performances/add', methods=['GET', 'POST'])
def admin_add_performance():
    if 'admin_logged_in' not in session:
        return redirect(url_for('admin_login'))
    
    if request.method == 'POST':
        title = request.form.get('title')
        composer = request.form.get('composer')
        audio_url = request.form.get('audio_url')
        image_url = request.form.get('image_url')
        description = request.form.get('description')
        category = request.form.get('category')
        
        performance = Performance(title=title, composer=composer, audio_url=audio_url,
                                image_url=image_url, description=description, category=category)
        db.session.add(performance)
        db.session.commit()
        flash('Performance added successfully!', 'success')
        return redirect(url_for('admin_performances'))
    
    return render_template('admin/add_performance.html')

@app.route('/admin/performances/edit/<int:performance_id>', methods=['GET', 'POST'])
def admin_edit_performance(performance_id):
    if 'admin_logged_in' not in session:
        return redirect(url_for('admin_login'))
    
    performance = Performance.query.get_or_404(performance_id)
    
    if request.method == 'POST':
        performance.title = request.form.get('title')
        performance.composer = request.form.get('composer')
        performance.audio_url = request.form.get('audio_url')
        performance.image_url = request.form.get('image_url')
        performance.description = request.form.get('description')
        performance.category = request.form.get('category')
        
        db.session.commit()
        flash('Performance updated successfully!', 'success')
        return redirect(url_for('admin_performances'))
    
    return render_template('admin/edit_performance.html', performance=performance)

@app.route('/admin/performances/delete/<int:performance_id>')
def admin_delete_performance(performance_id):
    if 'admin_logged_in' not in session:
        return redirect(url_for('admin_login'))
    
    performance = Performance.query.get_or_404(performance_id)
    db.session.delete(performance)
    db.session.commit()
    flash('Performance deleted successfully!', 'success')
    return redirect(url_for('admin_performances'))

@app.route('/admin/content')
def admin_content():
    if 'admin_logged_in' not in session:
        return redirect(url_for('admin_login'))
    
    content_sections = Content.query.all()
    return render_template('admin/content.html', content_sections=content_sections)

@app.route('/admin/content/edit/<int:content_id>', methods=['GET', 'POST'])
def admin_edit_content(content_id):
    if 'admin_logged_in' not in session:
        return redirect(url_for('admin_login'))
    
    content = Content.query.get_or_404(content_id)
    
    if request.method == 'POST':
        content.title = request.form.get('title')
        content.content = request.form.get('content')
        db.session.commit()
        flash('Content updated successfully!', 'success')
        return redirect(url_for('admin_content'))
    
    return render_template('admin/edit_content.html', content=content)

@app.route('/admin/newsletter')
def admin_newsletter():
    if 'admin_logged_in' not in session:
        return redirect(url_for('admin_login'))
    
    subscribers = Newsletter.query.order_by(Newsletter.subscribed_at.desc()).all()
    return render_template('admin/newsletter.html', subscribers=subscribers)

# API routes
@app.route('/api/newsletter/subscribe', methods=['POST'])
def api_newsletter_subscribe():
    data = request.get_json()
    email = data.get('email')
    
    if not email:
        return jsonify({'success': False, 'message': 'Email is required'}), 400
    
    # Check if already subscribed
    existing = Newsletter.query.filter_by(email=email).first()
    if existing:
        return jsonify({'success': False, 'message': 'Email already subscribed'}), 400
    
    subscriber = Newsletter(email=email)
    db.session.add(subscriber)
    db.session.commit()
    
    return jsonify({'success': True, 'message': 'Successfully subscribed to newsletter!'})

@app.route('/api/events')
def api_events():
    events = Event.query.filter(Event.date >= datetime.now()).order_by(Event.date).all()
    return jsonify([{
        'id': event.id,
        'title': event.title,
        'date': event.date.isoformat(),
        'location': event.location,
        'description': event.description,
        'image_url': event.image_url
    } for event in events])

@app.route('/api/performances')
def api_performances():
    performances = Performance.query.order_by(Performance.created_at.desc()).all()
    return jsonify([{
        'id': performance.id,
        'title': performance.title,
        'composer': performance.composer,
        'audio_url': performance.audio_url,
        'image_url': performance.image_url,
        'description': performance.description,
        'category': performance.category
    } for performance in performances])

# Initialize default content
def init_default_content():
    with app.app_context():
        db.create_all()
        
        # Add default content if it doesn't exist
        if not Content.query.filter_by(section='about').first():
            about_content = Content(
                section='about',
                title='About Ave Musica',
                content='Ave Musica is a distinguished choir that brings together passionate voices to create extraordinary musical experiences. Our ensemble combines traditional choral excellence with innovative interpretations, performing a diverse repertoire that spans from classical masterpieces to contemporary compositions.'
            )
            db.session.add(about_content)
        
        if not Content.query.filter_by(section='conductor_bio').first():
            conductor_bio = Content(
                section='conductor_bio',
                title='Our Conductor',
                content='Our esteemed conductor brings years of experience and a deep passion for choral music. With a background in both classical and contemporary repertoire, they guide our ensemble to achieve the highest standards of musical excellence and artistic expression.'
            )
            db.session.add(conductor_bio)
        
        if not Content.query.filter_by(section='choir_bio').first():
            choir_bio = Content(
                section='choir_bio',
                title='Our Choir',
                content='Ave Musica consists of dedicated singers from diverse backgrounds, united by their love for choral music. Our members bring together a rich tapestry of voices, creating harmonies that resonate with audiences and touch the soul.'
            )
            db.session.add(choir_bio)
        
        db.session.commit()

if __name__ == '__main__':
    init_default_content()
    app.run(debug=True, host='0.0.0.0', port=5000) 