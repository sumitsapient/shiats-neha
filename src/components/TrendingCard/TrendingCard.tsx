"use client";
import React, { useState, useEffect } from "react";
import "./TrendingCard.css";

// Define the interface for the product data
interface Product {
  product_id: string;  // Adjust this type based on the actual data type
  product_name: string;
  summary: string;
  tag: string;
}

function TrendingCard() {
  const [data, setData] = useState<Product[]>([]);  // Explicitly typing the state

  const getData = () => {
    fetch("products-listing.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((myjson) => {
        console.log(myjson);
        setData(myjson);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {data &&
        data.length > 0 &&
        data.map((prod) => {
          return (
            <div className="embla__slide embla__slide-card" key={prod.product_id}>
              <div className="card trending-card">
                <div className="row no-gutters g-0 h-100">
                  <div className="col-md-5 h-100">
                    <div className="trending-prod-img">
                      <img src="coffee-beans-levitate-white-background.png" alt={prod.product_name} />
                    </div>
                  </div>
                  <div className="col-md-7 h-100">
                    <div className="card-body h-100">
                      <span className="category-badge">{prod.tag}</span>
                      <h3 className="card-title heading-3">
                        {prod.product_name ?? "Unnamed Product"}
                      </h3>
                      <p className="card-text prod-desc">{prod.summary}</p>
                      <a href="#" className="card-link">
                        Read More{" "}
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#5f6368"
                          >
                            <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
                          </svg>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default TrendingCard;
