from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

products = []
customers = []
orders = []

@app.get("/")
def home():
    return {"message": "Inventory Management System"}

# ---------------- PRODUCTS ----------------

@app.get("/products")
def get_products():
    return products

@app.post("/products")
def add_product(product: dict):
    products.append(product)
    return {"message": "Product Added"}

@app.delete("/products/{id}")
def delete_product(id: int):
    if id < len(products):
        products.pop(id)
        return {"message": "Product Deleted"}
    return {"message": "Product Not Found"}

# ---------------- CUSTOMERS ----------------

@app.get("/customers")
def get_customers():
    return customers

@app.post("/customers")
def add_customer(customer: dict):
    customers.append(customer)
    return {"message": "Customer Added"}

@app.delete("/customers/{id}")
def delete_customer(id: int):
    if id < len(customers):
        customers.pop(id)
        return {"message": "Customer Deleted"}
    return {"message": "Customer Not Found"}

# ---------------- ORDERS ----------------

@app.get("/orders")
def get_orders():
    return orders

@app.post("/orders")
def create_order(order: dict):
    orders.append(order)
    return {"message": "Order Created"}

# ---------------- DASHBOARD ----------------

@app.get("/dashboard")
def dashboard():
    return {
        "total_products": len(products),
        "total_customers": len(customers),
        "total_orders": len(orders)
    }