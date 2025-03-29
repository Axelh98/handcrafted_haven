import React from 'react';
import style from './LandingPage.module.scss'

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const NextArrow: React.FC<ArrowProps> = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow custom-next`}
      style={{ ...style }}
      onClick={onClick}
    >
      Next
    </div>
  );
};

const PrevArrow: React.FC<ArrowProps> = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow custom-prev`}
      style={{ ...style }}
      onClick={onClick}
    >
      Prev
    </div>
  );
};

export { NextArrow, PrevArrow };

