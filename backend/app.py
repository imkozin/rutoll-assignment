from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from flask_migrate import Migrate
from sqlalchemy import text, func
from sqlalchemy.exc import IntegrityError
from dotenv import load_dotenv
import os
import re
import datetime

load_dotenv()

app = Flask(__name__)
CORS(app)

# CORS(app, resources={r"/api/*": {"origins": "https://imkozin.github.io"}})
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['JWT_SECRET_KEY'] = os.environ.get('SECRET_KEY')


db = SQLAlchemy(app)

@app.route('/test_db_connection')
def test_db_connection():
    try:
        result = db.session.execute(text("SELECT 1"))
        return "Database connection is working."
    except Exception as e:
        return f"Error: {str(e)}"


migrate = Migrate(app, db)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(1000), nullable=False)


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    description = db.Column(db.String(1500), nullable=False)
    price = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now)

jwt = JWTManager(app)

regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    user_exists = User.query.filter_by(email=data['email']).first()

    if user_exists:
        return jsonify({'error': 'User with this login already exists'}), 400

    if not re.fullmatch(regex, data['email']):
        return jsonify({"error": "Email should be a valid Email address"}), 400
    
    if len(data['password']) < 6:
        return jsonify({"error": "Password is too short, minimum 6 symbols"}), 400
    
    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
    new_user = User(email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 200

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Both email and password are required'}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({'error': 'Invalid email or password'}), 401
    elif not check_password_hash(user.password, password):
        return jsonify({'error': 'Invalid email or password'}), 401

    access_token = create_access_token(identity=user.email)
    return jsonify({'access_token': access_token, 'email': email}), 200

@app.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all()

    product_list = []
    for product in products:
        product_data = {
            'id': product.id,
            'name': product.name,
            'description': product.description,
            'price': product.price,
            'created': product.created_at
        }

        product_list.append(product_data)

    return jsonify({'products': product_list})

@app.route('/api/add-product', methods=['POST'])
def add_product():
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    price = data.get('price')

    if not name or not description:
        return jsonify({'error': 'All fields are required'}), 400
    
    if int(price) > 99999 or int(price) < 0:
        return jsonify({'error': 'Price must be a positive number lower than 99999'}), 400

    if len(name) > 20:
        return jsonify({'error': 'Product name can contain till 20 symbols'}), 400

    existing_product = Product.query.filter(func.lower(Product.name) == func.lower(name)).first()
    if existing_product:
        return jsonify({'error': 'A product with this name already exists'}), 400

    new_product = Product(name=name, description=description, price=price)
    db.session.add(new_product)
    try:
        db.session.commit()
        return jsonify({"message": "Product added successfully"}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Failed to add product due to database integrity error'}), 500


@app.route('/api/edit-product/<int:id>', methods=['PUT'])
def edit_product(id):
    # current_user = get_jwt_identity()
    product = Product.query.get(id)
    
    if product:
        try:
            data = request.get_json()
            new_name = data.get('name', product.name)
            new_description = data.get('description', product.description)
            new_price = data.get('price', product.price)

            if not new_name or not new_description:
                return jsonify({'error': 'All fields are required'}), 400
            
            if int(new_price) > 99999 or int(new_price) < 0:
                return jsonify({'error': 'Price must be a positive number lower than 99999'}), 400

            if len(new_name) > 20:
                return jsonify({'error': 'Product name can contain till 20 symbols'}), 400
            
            product.name = new_name
            product.description = new_description
            product.price = new_price
            
            db.session.commit()

            return jsonify({"message": "Product details updated successfully"}), 200
        except IntegrityError:
            db.session.rollback()
            return jsonify({"error": "Product with this name already exists"}), 500
    else:
        return jsonify({"message": "Product not found"}), 404
    

@app.route('/api/delete-product/<int:id>', methods=['DELETE'])
# @jwt_required()
def delete_product(id):
    # current_user = get_jwt_identity()
    # print(current_user)
    product = Product.query.get(id)

    if product is not None:
        db.session.delete(product)
        db.session.commit()
        return jsonify({"message": "Product deleted successfully!"}), 200
    else:
        return jsonify({"message": "Product not found or unauthorized"}), 404
    

@app.route('/api/get-product/<int:id>', methods=['GET'])
def get_product_data(id):
    # current_user = get_jwt_identity()
    product = Product.query.get(id)

    if product is not None:
        product_data = {
            'id': product.id,
            'name': product.name,
            'description': product.description,
            'price': product.price,
            'created': product.created_at
        }

        return jsonify({'product': product_data})
    else:
        return jsonify({'error': 'Product not found'}), 404

if __name__ == '__main__':
    app.run(debug=True, port=8000)