import os

from routes.helper import app

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))  
    app.run(port=port)