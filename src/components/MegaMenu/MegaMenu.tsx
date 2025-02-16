"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "./megaMenu.css";

interface SubProduct {
  name: string;
  slug: string;
}

interface ProductCategory {
  product_id: string;
  product_name: string;
  slug: string;
  subproducts: SubProduct[];
}

export default function MegaMenu() {
  const [menuData, setMenuData] = useState<ProductCategory[]>([]);

  useEffect(() => {
    fetch("/data/mega-menu.json") // Fetching MegaMenu JSON
      .then((res) => res.json())
      .then((data: ProductCategory[]) => setMenuData(data))
      .catch((error) => console.error("Error fetching MegaMenu data:", error));
  }, []);

  return (
    <div className="mega-menu">
      {menuData.map((category) => (
        <div key={category.product_id} className="mega-menu-category">
          <h4>{category.product_name}</h4>
          <ul>
            {category.subproducts.map((sub) => (
              <li key={sub.name}>
                <Link href={`/products/${category.slug}/${sub.slug}`}>
                  {sub.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
