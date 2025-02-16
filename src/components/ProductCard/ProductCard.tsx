"use client";
import React, { useState, useEffect } from "react";
import "./ProductCard.css";

interface ProductCategory {
  product_id: string;
  product_name: string;
  image?: string; // Optional in case an image is missing
}

function ProductCard() {
  const [data, setData] = useState<ProductCategory[]>([]);

  const getData = async () => {
    try {
      const response = await fetch("products-listing.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }

      const myjson: ProductCategory[] = await response.json();
      setData(myjson);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {data.length > 0 ? (
        data.map((prod) => (
          <div className="embla__slide" key={prod.product_id}>
            <div className="product-card">
              <div className="product-image">
                <img src="coffee-beans-levitate-white-background.png" />
              </div>
              <div className="product-title">
                <h3>{prod.product_name ?? "Unnamed Product"}</h3>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading products...</p>
      )}
    </>
  );
}

export default ProductCard;
