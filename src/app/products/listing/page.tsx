"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SubProduct {
  name: string;
  slug: string;
  short_description: string;
  image: string;
}

interface Product {
  product_name: string;
  slug: string;
  subproducts: SubProduct[];
}

export default function ProductListing() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/data/product-details.json") // Load product data
      .then((res) => res.json())
      .then((data) => setProducts(Object.values(data)))
      .catch((error) => console.error("Error loading products:", error));
  }, []);

  // Handle Checkbox Change
  const handleCheckboxChange = (slug: string) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(slug)
        ? prevSelected.filter((item) => item !== slug) // Remove if already selected
        : [...prevSelected, slug] // Add if not selected
    );
  };

  // Filtered Products: Show only selected parent products or all if none selected
  const filteredProducts =
    selectedProducts.length > 0
      ? products.filter((product) => selectedProducts.includes(product.slug))
      : products;

  return (
    <div>
      <h1>Product Listing</h1>

      {/* Checkbox Filter Section */}
      <div className="filter-section">
        <h3>Filter by Product</h3>
        {products.map((product) => (
          <label key={product.slug} className="checkbox-label">
            <input
              type="checkbox"
              value={product.slug}
              checked={selectedProducts.includes(product.slug)}
              onChange={() => handleCheckboxChange(product.slug)}
            />
            {product.product_name}
          </label>
        ))}
      </div>

      {/* Display Products */}
      {filteredProducts.map((product) => (
        <div key={product.slug} className="product-group">
          <h2>{product.product_name}</h2>
          <div className="subproducts-grid">
            {product.subproducts.map((sub) => (
              <div
                key={sub.slug}
                className="subproduct-card"
                onClick={() => router.push(`/products/${product.slug}/${sub.slug}`)}
              >
                <img src={sub.image} alt={sub.name} />
                <h3>{sub.name}</h3>
                <p>{sub.short_description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
