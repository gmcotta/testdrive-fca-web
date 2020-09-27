import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  Container,
  Wrapper,
  SlideButton,
  Slider,
  Item,
  Image,
  Nav,
  NavIndicator,
  Caption,
} from './styles';

type CarouselProps = {
  photos: string[];
  captions?: string[];
  hasNav?: boolean;
  optionValues?: string[];
  setFormValue?(car: string): void;
};

const Carousel: React.FC<CarouselProps> = ({
  photos,
  captions,
  hasNav,
  optionValues,
  setFormValue,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const trackRef = useRef<HTMLUListElement>(null);

  const previousSlide = useCallback(() => {
    setCurrentSlide(oldSlide => oldSlide - 1);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide(oldSlide => oldSlide + 1);
  }, []);

  const selectSlide = useCallback(slideNumber => {
    setCurrentSlide(slideNumber);
  }, []);

  const selectSlideUsingTouch = useCallback(() => {
    setTimeout(() => {
      if (trackRef.current !== null) {
        trackRef.current.click();
        const slideNumber = Math.round(
          trackRef.current.scrollLeft / trackRef.current.offsetWidth,
        );
        setCurrentSlide(slideNumber);
      }
    }, 300);
  }, []);

  useEffect(() => {
    if (trackRef.current !== null) {
      const slideWidth = trackRef.current.offsetWidth;
      console.log('slideWidth', slideWidth);
      return trackRef.current.scrollTo(currentSlide * slideWidth, 0);
    }
    return undefined;
  }, [currentSlide, trackRef]);

  useEffect(() => {
    if (optionValues !== undefined && setFormValue !== undefined) {
      setFormValue(optionValues[currentSlide]);
    }
  }, [currentSlide, setFormValue]);

  return (
    <Container>
      <Wrapper>
        <SlideButton
          className="left"
          type="button"
          aria-label="previous slide"
          onClick={() => previousSlide()}
          disabled={currentSlide === 0}
        >
          &#10094;
        </SlideButton>
        <SlideButton
          className="right"
          type="button"
          aria-label="next slide"
          onClick={() => nextSlide()}
          disabled={currentSlide === photos.length - 1}
        >
          &#10095;
        </SlideButton>
        <Slider ref={trackRef} onTouchEnd={() => selectSlideUsingTouch()}>
          {photos.map((photo, index) => (
            <Item key={`photo-${photo}`}>
              <Image
                src={photo}
                alt={captions ? captions[currentSlide] : `photo ${index + 1}`}
              />
            </Item>
          ))}
          {hasNav && (
            <Nav>
              {photos.map((photo, index) => (
                <NavIndicator
                  key={`button-${photo}`}
                  type="button"
                  aria-label={`nav button ${index + 1}`}
                  className={currentSlide === index ? 'active' : ''}
                  onClick={() => selectSlide(index)}
                />
              ))}
            </Nav>
          )}
        </Slider>
      </Wrapper>
      {captions && <Caption>{captions[currentSlide]}</Caption>}
    </Container>
  );
};

export default Carousel;
