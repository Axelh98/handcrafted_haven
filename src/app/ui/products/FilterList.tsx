'use client';

/* Import Styles*/
import "./ProductListPage.css";

export default function FilterList() {

    return (
        <div className="filters">
        <div className="filter-group">
          <label className="filter-label" htmlFor="category">
            Category
          </label>
          <select className="filter-select" id="category">
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home</option>
          </select>
        </div>
        <div className="filter-group">
          <label className="filter-label" htmlFor="price-range">
            Price Range
          </label>
          <select className="filter-select" id="price-range">
            <option value="all">All</option>
            <option value="0-50">$0 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-200">$100 - $200</option>
          </select>
        </div>
        <div className="filter-group">
          <label className="filter-label">Availability</label>
          <div className="filter-checkbox">
            <input type="checkbox" id="in-stock" />
            <label htmlFor="in-stock">In Stock</label>
          </div>
          <div className="filter-checkbox">
            <input type="checkbox" id="out-of-stock" />
            <label htmlFor="out-of-stock">Out of Stock</label>
          </div>
        </div>
      </div>
    )
} 