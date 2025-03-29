'use client';
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './carouselCard.css';

const carouselData = [
  {
    name: "First Product",
    image: "/objects/vase.svg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
    price: "$100",
    rating: 4.5,
    reviews: 10,
  },
  {
    name: "Second Product",
    image: "/objects/container1.svg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
    price: "$200",
    rating: 4.5,
    reviews: 10,
  },
  {
    name: "Third Product",
    image: "/objects/container2.svg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
    price: "$300",
    rating: 4.5,
    reviews: 10,
  },
  {
    name: "Fourth Product",
    image: "/objects/plate.svg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
    price: "$400",
    rating: 4.5,
    reviews: 10,
  },  
  {
    name: "Fifth Product",
    image: "/objects/vase.svg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
    price: "$500",
    rating: 4.5,
    reviews: 10,
  },
];

export default function CarouselCard() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
  };

  return (
    <div className="container">
      <Slider {...settings}>
        {carouselData.map((product, index) => (
          <div key={index} className="carousel-slide">
            <div className="carousel-image-container">
              <img src={product.image} alt="product image" className="carousel-image" />
            </div>
            <div className="carousel-details">
              <p className="carousel-title">{product.name}</p>
              <p className="carousel-description">{product.description}</p>
              <p className="carousel-price">{product.price}</p>
              <button className="carousel-button">Read More</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );

}
