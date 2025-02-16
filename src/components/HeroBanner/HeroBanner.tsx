"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Image from "next/image";
import "./HeroBanner.css";

function HomeBanner() {
  return (
    <>
      <Container fluid className="home-banner">
        <Row>
          <Col md={6} className="banner-content">
            <h1 className="heading-1">
              SOIL COMPOSITION
            </h1>
            <p>
              The soil test analyzes pH levels, nutrient content (N, P, K), moisture retention, and organic matter. These factors determine soil quality and its suitability for plant growth. Based on the results, appropriate fertilization and irrigation practices can be implemented to improve crop yield and sustainability.
            </p>
            <a href="#" className="btn-text-icon">
              <span className="btn-text">Explore</span>
              <span className="btn-icon"></span>
            </a>
          </Col>
          <Col md={6} className="banner-slider">
            <Carousel>
              <Carousel.Item>
                <Image
                  src="/720.jpg"
                  alt="Sliderimg 1"
                  width={720}
                  height={400}
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  src="/722.png"
                  alt="Sliderimg 2"
                  width={720}
                  height={400}
                />
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomeBanner;
