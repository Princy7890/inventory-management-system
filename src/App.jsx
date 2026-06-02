import { useState, useEffect } from "react";

function App() {
  // Product States
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [products, setProducts] = useState([]);

  // Customer States
  const [customer, setCustomer] = useState("");
  const [customers, setCustomers] = useState([]);

  // Dashboard
  const [dashboard, setDashboard] = useState({});

  // ---------------- PRODUCTS ----------------

  const fetchProducts = async () => {
    const response = await fetch("http://127.0.0.1:8000/products");
    const data = await response.json();
    setProducts(data);
  };

  const addProduct = async () => {
    const response = await fetch("http://127.0.0.1:8000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: product,
        quantity: Number(quantity),
      }),
    });

    const data = await response.json();

    alert(data.message);

    setProduct("");
    setQuantity("");

    fetchProducts();
    fetchDashboard();
  };

  const deleteProduct = async (id) => {
    await fetch(`http://127.0.0.1:8000/products/${id}`, {
      method: "DELETE",
    });

    fetchProducts();
    fetchDashboard();
  };

  // ---------------- CUSTOMERS ----------------

  const fetchCustomers = async () => {
    const response = await fetch("http://127.0.0.1:8000/customers");
    const data = await response.json();
    setCustomers(data);
  };

  const addCustomer = async () => {
    await fetch("http://127.0.0.1:8000/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: customer,
      }),
    });

    alert("Customer Added");

    setCustomer("");

    fetchCustomers();
    fetchDashboard();
  };

  // ---------------- ORDERS ----------------

  const createOrder = async () => {
    await fetch("http://127.0.0.1:8000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: "Demo Product",
        quantity: 1,
      }),
    });

    alert("Order Created");

    fetchDashboard();
  };

  // ---------------- DASHBOARD ----------------

  const fetchDashboard = async () => {
    const response = await fetch("http://127.0.0.1:8000/dashboard");
    const data = await response.json();
    setDashboard(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCustomers();
    fetchDashboard();
  }, []);

  return (
    <div className="container">
      <h1>Inventory Management System</h1>

      <hr />

      <h2>Dashboard</h2>

<div className="dashboard">
  <div className="card">
    <h3>{dashboard.total_products || 0}</h3>
    <p>Products</p>
  </div>

  <div className="card">
    <h3>{dashboard.total_customers || 0}</h3>
    <p>Customers</p>
  </div>

  <div className="card">
    <h3>{dashboard.total_orders || 0}</h3>
    <p>Orders</p>
  </div>
</div>

      <hr />

      <h2>Add Product</h2>

      <input
        type="text"
        placeholder="Product Name"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <br />
      <br />

      <button onClick={addProduct}>
        Add Product
      </button>

      <h2>Products List</h2>

      <ul style={{ listStyle: "none" }}>
        {products.map((item, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            {item.name} - {item.quantity}

            <button
              onClick={() => deleteProduct(index)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <hr />

      <h2>Add Customer</h2>

      <input
        type="text"
        placeholder="Customer Name"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
      />

      <br />
      <br />

      <button onClick={addCustomer}>
        Add Customer
      </button>

      <h2>Customers List</h2>

      <ul style={{ listStyle: "none" }}>
        {customers.map((item, index) => (
          <li key={index}>
            {item.name}
          </li>
        ))}
      </ul>

      <hr />

      <h2>Orders</h2>

      <button onClick={createOrder}>
        Create Demo Order
      </button>
    </div>
  );
}

export default App;
