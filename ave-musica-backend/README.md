# Ave Musica Backend

Flask backend for the Ave Musica choir website with admin panel functionality.

## Features

- **Dynamic Content Management**: Add, edit, and delete events, performances, and content
- **Admin Panel**: Secure admin interface for managing website content
- **Database Integration**: SQLite database with SQLAlchemy ORM
- **API Endpoints**: RESTful API for newsletter subscriptions and content retrieval
- **Responsive Design**: Modern admin interface matching the choir site theme

## Quick Start

### Prerequisites

- Python 3.7 or higher
- pip (Python package installer)

### Installation

1. **Clone or download the backend files**
2. **Navigate to the backend directory**:
   ```bash
   cd ave-musica-backend
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the server**:
   ```bash
   python app.py
   ```
   
   Or use the provided batch file (Windows):
   ```bash
   start_backend.bat
   ```

### Access URLs

- **Main Website**: http://localhost:5000
- **Admin Panel**: http://localhost:5000/admin

### Admin Login

- **Username**: admin
- **Password**: avemusica2025

## Database Models

### Event
- `id`: Primary key
- `title`: Event title
- `date`: Event date and time
- `location`: Event location
- `description`: Event description
- `image_url`: Event image URL
- `created_at`: Creation timestamp

### Performance
- `id`: Primary key
- `title`: Performance title
- `composer`: Composer name
- `audio_url`: Audio file URL
- `image_url`: Performance image URL
- `description`: Performance description
- `category`: Performance category (classical, modern, a cappella, etc.)
- `created_at`: Creation timestamp

### Newsletter
- `id`: Primary key
- `email`: Subscriber email (unique)
- `subscribed_at`: Subscription timestamp

### Content
- `id`: Primary key
- `section`: Content section (about, conductor_bio, choir_bio, etc.)
- `title`: Content title
- `content`: Content text
- `updated_at`: Last update timestamp

## Admin Panel Features

### Dashboard
- Overview statistics
- Quick action buttons
- Navigation to all sections

### Events Management
- View all events
- Add new events
- Edit existing events
- Delete events
- Date and time picker
- Image URL support

### Performances Management
- View all performances
- Add new performances
- Edit existing performances
- Delete performances
- Audio and image URL support
- Category classification

### Content Management
- Edit website content sections
- About section
- Conductor biography
- Choir biography
- Rich text editing

### Newsletter Management
- View all subscribers
- Export subscriber list
- Manage subscriptions

## API Endpoints

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter

### Events
- `GET /api/events` - Get upcoming events

### Performances
- `GET /api/performances` - Get all performances

## File Structure

```
ave-musica-backend/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── start_backend.bat      # Windows start script
├── README.md             # This file
├── templates/            # HTML templates
│   ├── index.html        # Main site template
│   └── admin/           # Admin templates
│       ├── login.html
│       ├── dashboard.html
│       ├── events.html
│       └── add_event.html
└── static/              # Static files
    ├── css/
    │   └── style.css
    ├── js/
    │   └── scripts.js
    └── images/
```

## Configuration

### Environment Variables

The application uses the following configuration:

- `SECRET_KEY`: Flask secret key for sessions
- `SQLALCHEMY_DATABASE_URI`: Database connection string
- `SQLALCHEMY_TRACK_MODIFICATIONS`: SQLAlchemy configuration

### Database

The application uses SQLite by default. The database file (`ave_musica.db`) will be created automatically on first run.

## Security

- Admin authentication required for all admin routes
- Session-based authentication
- CSRF protection (Flask-WTF recommended for production)
- Input validation and sanitization

## Development

### Adding New Features

1. **Database Models**: Add new models in `app.py`
2. **Routes**: Add new routes in `app.py`
3. **Templates**: Create new templates in `templates/` directory
4. **Static Files**: Add CSS/JS files in `static/` directory

### Database Migrations

For production, consider using Flask-Migrate for database migrations:

```bash
pip install Flask-Migrate
```

## Production Deployment

### Requirements

- WSGI server (Gunicorn, uWSGI)
- Reverse proxy (Nginx, Apache)
- Environment variables for configuration
- Database (PostgreSQL, MySQL for production)

### Example Gunicorn Command

```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Environment Variables

Set these in production:

```bash
export FLASK_ENV=production
export SECRET_KEY=your-secure-secret-key
export DATABASE_URL=your-database-url
```

## Troubleshooting

### Common Issues

1. **Port already in use**: Change port in `app.py` or kill existing process
2. **Database errors**: Delete `ave_musica.db` and restart
3. **Import errors**: Ensure all dependencies are installed
4. **Template errors**: Check template syntax and file paths

### Logs

Check console output for error messages and debugging information.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the code comments
3. Check Flask and SQLAlchemy documentation

## License

This project is part of the Ave Musica choir website.

---

**Ave Musica Backend** - Powering the choir's digital presence with modern web technology. 