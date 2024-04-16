from flask import Flask, jsonify, request, make_response
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from flask_migrate import Migrate
from sqlalchemy import text, func
from sqlalchemy.exc import IntegrityError
from dotenv import load_dotenv
import os
import re
from db import db, init_db
from models import User, Product

load_dotenv()

app = Flask(__name__)

CORS(app, origins='https://imkozin.github.io', methods=['GET', 'POST', 'PUT', 'DELETE'], allow_headers=['Content-Type', "Authorization"])

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['JWT_SECRET_KEY'] = os.environ.get('SECRET_KEY')


init_db(app)

@app.route('/test_db_connection')
def test_db_connection():
    try:
        result = db.session.execute(text("SELECT 1"))
        return "Database connection is working."
    except Exception as e:
        return f"Error: {str(e)}"


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
    
    response = make_response(jsonify({'message': 'Login successful', 'access_token': access_token, 'email': email}), 200)

    response.set_cookie('access_token', access_token)

    return response

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
@jwt_required()
def add_product():
    current_user = get_jwt_identity()

    data = request.get_json()

    name = data.get('name')
    description = data.get('description')
    price = data.get('price')


    if not name or not description or not price:
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
@jwt_required()
def edit_product(id):
    current_user = get_jwt_identity()
    product = Product.query.get(id)
    
    if product:
        try:
            data = request.get_json()
            new_name = data.get('name', product.name)
            new_description = data.get('description', product.description)
            new_price = data.get('price', product.price)

            if not new_name or not new_description or not new_price:
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
@jwt_required()
def delete_product(id):
    current_user = get_jwt_identity()
    
    product = Product.query.get(id)

    if product is not None:
        db.session.delete(product)
        db.session.commit()
        return jsonify({"message": "Product deleted successfully!"}), 200
    else:
        return jsonify({"message": "Product not found or unauthorized"}), 404
    

@app.route('/api/get-product/<int:id>', methods=['GET'])
def get_product_data(id):
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