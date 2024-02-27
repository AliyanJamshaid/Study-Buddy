import React, { useEffect, useState } from "react";

const StarsComponent = () => {
  const [stars, setStars] = useState([]);

  const multipleBoxShadow = (n) => {
    let value = `${Math.floor(Math.random() * 2000)}px ${Math.floor(
      Math.random() * 2000
    )}px #FFF`;

    for (let i = 2; i <= n; i++) {
      value += `, ${Math.floor(Math.random() * 2000)}px ${Math.floor(
        Math.random() * 2000
      )}px #FFF`;
    }

    return value;
  };

  const createStar = (className) => {
    return {
      className: `star ${className}`,
      style: {
        transform: `translate(${Math.random() * 100}vw, ${
          Math.random() * 100
        }vh)`,
        boxShadow: multipleBoxShadow(5),
      },
    };
  };

  useEffect(() => {
    const stars1 = Array.from({ length: 50 }, () => createStar("stars"));
    const stars2 = Array.from({ length: 50 }, () => createStar("stars2"));
    const stars3 = Array.from({ length: 50 }, () => createStar("stars3"));

    setStars([...stars1, ...stars2, ...stars3]);
  }, []);

  return (
    <div id="stars-container">
      {stars.map((star, index) => (
        <div key={index} className={star.className} style={star.style}></div>
      ))}
    </div>
  );
};

export default StarsComponent;
