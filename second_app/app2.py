from flask import Flask, render_template_string

app = Flask(__name__)

@app.route('/')
def index():
    return render_template_string('''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Second App - Port 5001</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f0f0f0; }
            .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #2c3e50; }
            .port-info { background: #3498db; color: white; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 Second Flask Application</h1>
            <div class="port-info">
                <h2>Running on Port 5001</h2>
                <p>This is a separate Flask application running simultaneously with your main app!</p>
            </div>
            <h3>Available Ports:</h3>
            <ul>
                <li><strong>Port 5000:</strong> <a href="http://localhost:5000">Main Woodworking Store</a></li>
                <li><strong>Port 5001:</strong> <a href="http://localhost:5001">This Second App</a></li>
            </ul>
            <p>You can run multiple Flask applications on different ports at the same time!</p>
        </div>
    </body>
    </html>
    ''')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001) 