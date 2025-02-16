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
import "./TrendingProducts.css";
import TrendingCard from "../TrendingCard/TrendingCard";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const TrendingdProducts = () => {
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
    <section className="section trending-products">
      <div className="container">
        <div className="row heading-row">
          <div className="col-lg-12 text-center">
            <h2 className="heading-2">Trending Products</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="embla trending-carousel">
              <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                  <TrendingCard />
                </div>
              </div>
              <div className="embla__controls embla__controls-trending-prod">
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
              <div className="embla__dots embla__dot-trending-prod">
                {scrollSnaps.map((_, index) => (
                  <DotButton
                    key={index}
                    onClick={() => onDotButtonClick(index)}
                    className={`embla__dot${
                      index === selectedIndex ? " embla__dot--selected" : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingdProducts;
