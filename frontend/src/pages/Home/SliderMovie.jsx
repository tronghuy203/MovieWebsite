import Slider from "react-slick";
import { useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

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
              src={`${process.env.REACT_APP_SERVERURL}/${movie.posterUrl2}`}
              alt={movie.title}
              className="w-screen h-full object-cover"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/80 via-transparent to-black/80" />
            <div className="absolute bottom-24 lg:left-4 sm:text-left text-center text-white p-4 rounded space-y-3">
              <div className="absolute sm:bg-transparent opacity-40 bg-black w-full h-full rounded-lg"></div>
              <div className="relative z-10 mt-5">
                <h1 className="text-center sm:text-left text-2xl font-bold">
                  {movie.title}
                </h1>
                <p className="text-sm w-full lg:hidden">
                  {movie.description.slice(0, 80)}...
                </p>
                <p className="text-sm w-[400px] hidden lg:block">
                  {movie.description.slice(0, 300)}...
                </p>
              </div>
              <div className="flex flex-wrap gap-2 w-[210px] sm:mx-0 mx-auto">
                {movie.category.map((cat, index) => (
                  <div
                    key={index}
                    className="relative mx-auto lg:mx-0 text-white w-24 mt-2"
                  >
                    <div className="absolute inset-0 bg-black opacity-30 rounded-lg z-0"></div>
                    <div className="relative flex z-10 p-1 justify-center">
                      <p>{cat.title}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative pt-5 z-30 ">
                <Link to={`movie/${movie._id}`}>
                  <button className="bg-gradient-to-r from-[rgb(205,171,21)] to-[rgb(240,224,150)] text-black font-bold w-28 h-10 rounded-full ">
                    Xem ngay
                  </button>
                </Link>
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
                src={`${process.env.REACT_APP_SERVERURL}/${movie.posterUrl2}`}
                alt={movie.title}
                className={`w-16 h-12 rounded-md border-2 transition-all duration-200 ${
                  index === currentSlide ? "border-white" : "border-transparent"
                }`}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
