#!/usr/bin/env python3
"""
Simple test script to verify your Flask app works with gunicorn
Run this before deploying to make sure everything is set up correctly.
"""

import subprocess
import sys
import os

def test_app():
    print("🧪 Testing Flask app for deployment...")
    print("=" * 50)
    
    # Test 1: Check if all required files exist
    required_files = ['app.py', 'requirements.txt', 'Procfile']
    print("📁 Checking required files:")
    for file in required_files:
        if os.path.exists(file):
            print(f"  ✅ {file}")
        else:
            print(f"  ❌ {file} - MISSING!")
            return False
    
    # Test 2: Check if requirements can be installed
    print("\n📦 Testing requirements installation:")
    try:
        result = subprocess.run([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'], 
                              capture_output=True, text=True, timeout=60)
        if result.returncode == 0:
            print("  ✅ Requirements installed successfully")
        else:
            print(f"  ❌ Failed to install requirements: {result.stderr}")
            return False
    except Exception as e:
        print(f"  ❌ Error installing requirements: {e}")
        return False
    
    # Test 3: Test gunicorn import
    print("\n🐍 Testing gunicorn import:")
    try:
        import gunicorn
        print(f"  ✅ Gunicorn version {gunicorn.__version__}")
    except ImportError:
        print("  ❌ Gunicorn not installed!")
        return False
    
    # Test 4: Test Flask app import
    print("\n🔥 Testing Flask app import:")
    try:
        from app import app
        print("  ✅ Flask app imported successfully")
    except Exception as e:
        print(f"  ❌ Failed to import Flask app: {e}")
        return False
    
    print("\n" + "=" * 50)
    print("🎉 All tests passed! Your app is ready for deployment.")
    print("\nNext steps:")
    print("1. Push your code to GitHub")
    print("2. Choose a hosting platform (Render recommended)")
    print("3. Follow the deployment guide in DEPLOYMENT_GUIDE.md")
    return True

if __name__ == '__main__':
    success = test_app()
    sys.exit(0 if success else 1) 