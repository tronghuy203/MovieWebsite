import Slider from "react-slick";
import { useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const MovieSlider = ({ movieList }) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="relative w-full mx-auto">
      <Slider
        asNavFor={nav2}
        ref={(slider) => {
          setNav1(slider);
          slider1.current = slider;
        }}
        arrows={false}
        fade
        afterChange={(index) => setCurrentSlide(index)}
      >
        {movieList.slice(-5).map((movie, index) => (
          <div key={index} className="relative w-[1024px] h-[500px]">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-screen h-full object-cover"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 70%)`,
              }}
            />
            <div className="absolute bottom-32 lg:left-4 lg:text-left text-center w-full text-white p-4 rounded">
              <h1 className="text-center lg:text-left text-2xl font-bold">{movie.title}</h1>
             <p className="text-sm w-full lg:hidden">
                {movie.description.slice(0, 80)}...
              </p>
              <p className="text-sm w-[400px] hidden lg:block">
                {movie.description.slice(0, 300)}...
              </p>
              <div className="relative mx-auto lg:mx-0 text-white w-24 my-3">
                <div className="absolute inset-0 bg-white opacity-10 rounded-lg z-0"></div>
                <div className="relative flex z-10 p-1 justify-center">
                  <p>{movie.category.title}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <div className="absolute bottom-4 right-4 w-full max-w-[350px]">
        <Slider
          asNavFor={nav1}
          ref={(slider) => {
            setNav2(slider);
            slider2.current = slider;
          }}
          slidesToShow={5}
          swipe={false}
          draggable={false}
          arrows={false}
          infinite={false}
          focusOnSelect={true}
        >
          {movieList.slice(-5).map((movie, index) => (
            <div key={index} className="px-1">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className={`w-16 h-12 rounded-md border-2 transition-all duration-200 ${
                  index === currentSlide
                    ? "border-white"
                    : "border-transparent"
                }`}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
