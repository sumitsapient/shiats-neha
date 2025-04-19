"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/header-logo.png";
import Search from "../../../public/search.svg";
import MegaMenu from "../MegaMenu/MegaMenu";
import "./header.css";

interface SearchResult {
  name: string;
  slug: string;
  productSlug: string;
}

function Header() {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [data, setData] = useState<SearchResult[]>([]);

  // Fetching data once
  useEffect(() => {
    fetch("/data/mega-menu.json")
      .then((res) => res.json())
      .then((menuData) => {
        const allProducts: SearchResult[] = [];

        menuData.forEach((category: any) => {
          category.subproducts.forEach((sub: any) => {
            allProducts.push({
              name: sub.name,
              slug: sub.slug,
              productSlug: category.slug, // To maintain parent category
            });
          });
        });

        setData(allProducts);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Debounce function to optimize search
  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = useCallback(
    debounce((term: string) => {
      if (!term.trim()) {
        setSearchResults([]);
        return;
      }

      const filteredResults = data.filter((item) =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );

      setSearchResults(filteredResults);
    }, 300), // 300ms delay for optimization
    [data]
  );

  // Handle input change and trigger search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  // Highlight function to wrap matching text
  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <strong key={index} style={{ color: "red" }}>
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary mainnav">
      <Navbar.Brand>
        <Image src={Logo} alt="Logo" style={{height: '100px'}} />
      </Navbar.Brand>
      <div className="button-wrapper">
        <Navbar.Toggle aria-controls="navbarScroll" />
      </div>

      <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto my-2 my-lg-0 justify-content-end flex-grow-1">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>

        </Nav>

        {/* Search Bar */}
        <div className="form-block search-container">
          <Form className="d-flex position-relative">
            <Button variant="outline-success">
              <Image src={Search} alt="Search Icon" />
            </Button>
            <Form.Control
              type="search"
              placeholder="Search Location"
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={handleInputChange}
            />
            {/* Search Suggestions */}
            {searchResults.length > 0 && (
              <ul className="search-suggestions">
                {searchResults.map((result) => (
                  <li key={result.slug}>
                    <Link href={`/location/${result.slug}`}>
                      {highlightMatch(result.name, searchTerm)}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Form>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
