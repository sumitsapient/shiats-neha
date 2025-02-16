"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "../CarouselDots/carousel-dots";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "../CarouselArrow/carousel-arrow";
import { EmblaOptionsType } from "embla-carousel";
import ProductCard from "../ProductCard/ProductCard";
import "./FeaturedProducts.css";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const FeaturedProducts = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="section featured-products">
      <div className="container">
        <div className="row heading-row">
          <div className="col-lg-12">
            <h2 className="heading-2">FEATURED PRODUCTS</h2>
            <p>Meet Our Handpicked Favorites</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 embla">
            <div className="embla__controls">
              <div className="embla__buttons">
                <PrevButton
                  onClick={onPrevButtonClick}
                  disabled={prevBtnDisabled}
                />
                <NextButton
                  onClick={onNextButtonClick}
                  disabled={nextBtnDisabled}
                />
              </div>
            </div>
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                <ProductCard />
              </div>
              {/* <div className="embla__dots">
                {scrollSnaps.map((_, index) => (
                  <DotButton
                    key={index}
                    onClick={() => onDotButtonClick(index)}
                    className={`embla__dot${
                      index === selectedIndex ? " embla__dot--selected" : ""
                    }`}
                  />
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
