import os

from routes.helper import app

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))  
    app.run(host="0.0.0.0",port=port)
    # port = int(os.environ.get('PORT', 5000))  
    # app.run(port=port)