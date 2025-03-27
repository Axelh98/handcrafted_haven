import "./ProductListPage.css";
// import global styles
import "../../globals.css";


const products = [
    {
      id: 1,
      name: "Ceramic Vase",
      price: "$95.00",
      description:
        "Vase made of ceramic, perfect for your living room, with a beautiful design and a unique shape. Available in different colors.",
      imageUrl:
        "/objects/vase.svg",
    },
    {
      id: 2,
      name: "Container 1",
      price: "$95.00",
      description:
        "Container made of ceramic, perfect for your living room, with a beautiful design and a unique shape. Available in different colors.",
      imageUrl:
        "/objects/container1.svg",
    },
    {
      id: 3,
      name: "Container 2",
      price: "$95.00",
      description:
        "Container made of ceramic, perfect for your living room, with a beautiful design and a unique shape. Available in different colors.",
      imageUrl:
        "/objects/container2.svg",
    },
    {
      id: 4,
      name: "Plate",
      price: "$95.00",
      description:
        "Plate made of ceramic, perfect for your living room, with a beautiful design and a unique shape. Available in different colors.",
      imageUrl:
        "/objects/plate.svg",
    },
    {
      id: 5,
      name: "Apple AirPods",
      price: "$95.00",
      description:
        "With plenty of talk and listen time, voice-activated Siri access, and an available wireless charging case.",
      imageUrl:
        "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
    },
    {
      id: 6,
      name: "Apple AirPods",
      price: "$95.00",
      description:
        "With plenty of talk and listen time, voice-activated Siri access, and an available wireless charging case.",
      imageUrl:
        "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
    },
    // Agrega más productos aquí
  ];

  export default function GridProducts() {
    return (
      <div className="products">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <div className="product-image">
            <img src={product.imageUrl} alt="card-image" />
            <link rel="stylesheet" href="/productDetail" />
          </div>
          <div className="product-details">
            <div className="product-title">
              <p>{product.name}</p>
              <p className="product-price">{product.price}</p>
            </div>
            <p className="product-description">{product.description}</p>
            <button className="add-to-cart-button" type="button">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
    );
  }
  