
from app import app
from app.config.config import DEBUG, PORT

if __name__ == '__main__':
    app.run(debug=DEBUG, port=PORT)
