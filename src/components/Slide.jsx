import React, { useState, useEffect } from 'react';

const images = [
  { url: 'image1.jpg', text: 'Slide 1' },
  { url: 'image2.jpg', text: 'Slide 2' },
  { url: 'image3.jpg', text: 'Slide 3' },
];

function ImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Function to automatically advance to the next slide
  const autoAdvance = () => {
    nextSlide();
  };

  // Use useEffect to set up automatic slide transition
  useEffect(() => {
    const interval = setInterval(autoAdvance, 3000); // Change slide every 3 seconds (adjust as needed)
    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  return (
    <div className="slider-container">
      <div className="slider">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image.url})` }}
          >
            <div className="slide-text">{image.text}</div>
          </div>
        ))}
      </div>
      <div className="indicators">
        {images.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
      <button className="prev-button" onClick={prevSlide}>
        Previous
      </button>
      <button className="next-button" onClick={nextSlide}>
        Next
      </button>
    </div>
  );
}

export default ImageSlider;
