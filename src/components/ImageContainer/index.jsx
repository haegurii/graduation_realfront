import "./index.css";

import Button from "../Button";
import { useEffect, useRef } from "react";

const ImageContainer = ({ title, subTitle, noButton, onClick }) => {
  const ref = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (ref.current) {
      timeoutRef.current = setTimeout(
        () => (ref.current.style.opacity = 1),
        100
      );
    }
  }, []);

  return (
    <section className="door-image-container">
      <div className="overlay"></div>
      <div className="bg"></div>
      <div className="contents" ref={ref}>
        <h1>{title}</h1>
        <h2>{subTitle}</h2>
        {!noButton && <Button onClick={onClick} />}
      </div>
    </section>
  );
};

export default ImageContainer;
