import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMovieByCategory } from "../../redux/apiMovie";
import { Link } from "react-router-dom";

export const SliderMovieCategory = ({ axiosJWT }) => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state) => state.movie?.category?.dataCategory
  );
  const moviesByCategory = useSelector(
    (state) => state.movie?.movieByCategory?.dataMovieByCategory
  );

  const [isDragging, setIsDragging] = useState(false);
  const handleMouseDown = () => setIsDragging(false);
  const handleMouseMove = () => setIsDragging(true);

  const handleClick = (e) => {
    if (isDragging) {
      e.preventDefault();
    }
  };
  useEffect(() => {
    if (categories?.length > 0) {
      categories.forEach((cat) => {
        getMovieByCategory(cat.slug, dispatch);
      });
    }
  }, [categories, dispatch]);

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="absolute -left-2 z-10 bg-white bg-opacity-50 p-2 rounded-full cursor-pointer top-1/2 -translate-y-1/2 hover:bg-opacity-80"
        onClick={onClick}
      >
        <svg
          className="w-5 h-5 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>
    );
  };

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="absolute -right-2 z-10 bg-white bg-opacity-50 p-2 rounded-full cursor-pointer top-1/2 -translate-y-1/2 hover:bg-opacity-80"
        onClick={onClick}
      >
        <svg
          className="w-5 h-5 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    );
  };

  return (
    <div className="space-y-10 pb-10">
      {categories?.map((cat, index) => (
        <div key={`${cat._id}-${index}`} className="text-white px-5">
          <h2 className="text-xl font-bold mb-2">{cat.title}</h2>
          {Array.isArray(moviesByCategory?.result?.[cat.slug]) &&
            moviesByCategory.result[cat.slug].length >= 1 && (
              <Slider
                className="w-full h-[220px]"
                slidesToShow={3}
                slidesToScroll={1}
                infinite={false}
                nextArrow={<NextArrow />}
                prevArrow={<PrevArrow />}
              >
                {moviesByCategory.result[cat.slug].map((movie, index) => (
                  <div
                    key={`${cat.slug}-${movie._id}-${index}`}
                    className="p-2"
                  >
                    <Link
                      to={`movie/${movie._id}`}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onClick={handleClick}
                    >
                      <img
                        src={movie.posterUrl2}
                        alt={movie.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </Link>
                    <p className="mt-1 text-sm text-center">{movie.title}</p>
                  </div>
                ))}
              </Slider>
            )}
        </div>
      ))}
    </div>
  );
};
