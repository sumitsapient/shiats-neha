"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Get dynamic route params
import InquiryForm from "@/components/InquiryForm/InquiryForm";

interface SubProduct {
  name: string;
  slug: string;
  short_description: string;
  image: string;
  tag: string;
}

interface Product {
  product_name: string;
  slug: string;
  description: string;
  image: string;
  subproducts: SubProduct[];
}

export default function ProductDetailsPage() {
  const { product, subproduct } = useParams() || {}; // Ensure it never crashes
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  const [productData, setProductData] = useState<Product | null>(null);
  const [selectedSubproduct, setSelectedSubproduct] = useState<SubProduct | null>(null);

  useEffect(() => {
    fetch("/data/product-details.json")
      .then((res) => res.json())
      .then((data) => {
        if (!product) return; // Prevent running on undefined params

        // Find the product using the slug
        const productEntry = Object.values(data).find(
          (item) => (item as Product).slug === product
        ) as Product | undefined;

        if (productEntry) {
          setProductData(productEntry);

          // Find the subproduct if it's provided in the URL
          const selectedSubproduct = subproduct
            ? productEntry.subproducts.find((sub) => sub.slug === subproduct)
            : null;

          setSelectedSubproduct(selectedSubproduct || null);
        }
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, [product, subproduct]);

  if (!productData) return <p>Loading...</p>;

  return (
    <div>
      <h1>{selectedSubproduct ? selectedSubproduct.name : productData.product_name}</h1>
      <img
        src={selectedSubproduct ? selectedSubproduct.image : productData.image}
        alt={selectedSubproduct ? selectedSubproduct.name : productData.product_name}
      />
      <p>
        {selectedSubproduct ? selectedSubproduct.short_description : productData.description}
      </p>
      <button onClick={() => setShowInquiryForm(true)}>Request a Quote</button>
       {showInquiryForm && (
              <InquiryForm productName={product} onClose={() => setShowInquiryForm(false)} />
            )}
      {/* Display related subproducts if a subproduct is selected */}
      {selectedSubproduct && (
        <div>
          <h2>Related Subproducts</h2>
          <ul>
            {productData.subproducts
              .filter((sub) => sub.slug !== subproduct)
              .map((sub) => (
                <li key={sub.slug}>
                  <a href={`/products/${product}/${sub.slug}`}>{sub.name}</a>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
