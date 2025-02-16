"use client";
import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "./Certification.css";

function Certification() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <section className="section section-certification">
      <div className="container">
        <div className="row heading-row">
          <div className="col-lg-12">
            <h2 className="heading-2">CERTIFICATION</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="embla" ref={emblaRef}>
              <div className="embla__container">
                <div className="embla__slide">
                  <img src="logo-1.jpg" alt="logo1" />
                </div>
                <div className="embla__slide">
                  <img src="logo-2.png" alt="logo1" />
                </div>
                <div className="embla__slide">
                  <img src="logo-4.png" alt="logo1" />
                </div>
                <div className="embla__slide">
                  <img src="logo-1.jpg" alt="logo1" />
                </div>
                <div className="embla__slide">
                  <img src="logo-2.png" alt="logo1" />
                </div>
                <div className="embla__slide">
                  <img src="logo-4.png" alt="logo1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Certification;
