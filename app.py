import os

from routes.helper import app

if __name__ == '__main__':
    app.run(os.environ.get('PORT', 8080))