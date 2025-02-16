import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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
  const params = useParams() as Record<string, string | undefined>;
  const product = params.product;
  const subproduct = params.subproduct;

  const [productData, setProductData] = useState<Product | null>(null);
  const [selectedSubproduct, setSelectedSubproduct] = useState<SubProduct | null>(null);

  useEffect(() => {
    if (product) {
      // Fetch product details from the public folder
      fetch("/product-details.json")
        .then((res) => res.json())
        .then((data: Record<string, Product>) => { // Type the fetched data here
          // Find the product using the slug
          const productEntry = Object.values(data).find(
            (item) => item.slug === product
          );

          if (productEntry) {
            setProductData(productEntry);

            // Find the subproduct if it's provided in the URL
            const selectedSubproduct = productEntry.subproducts.find(
              (sub) => sub.slug === subproduct
            );

            setSelectedSubproduct(selectedSubproduct || null);
          }
        })
        .catch((error) => console.error("Error fetching product data:", error));
    }
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
