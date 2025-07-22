import { useEffect } from "react";
import { getUniqueCategory } from "../../redux/apiMovie";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export const Category = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.movie?.category?.dataCategory);

  useEffect(() => {
    getUniqueCategory(dispatch);
  }, [dispatch]);
  const bgColors = [
    "bg-[rgba(62,79,191,0.879)]",
    "bg-[rgba(191,62,77,0.879)]",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
  ];
  return (
    <div className="flex gap-4 flex-wrap h-full w-full px-4 py-2">
      {category.map((category, index) => (
        <Link
          key={index}
          to={`/category/${category.slug}`}
          className={`rounded-xl shadow-md w-40 h-32 lg:w-52 lg:h-32
        ${bgColors[index % bgColors.length]} hover:opacity-80`}
        >
          <h1 className="text-white px-4 py-2 pt-10 text-2xl font-bold ">
            {category.title}
          </h1>
          <div className="flex space-x-1 text-white px-4 py-2">
            <p className="text-sm flex justify-start ">Xem chủ để</p>
            <ArrowRightIcon className="w-5 h-5" />
          </div>
        </Link>
      ))}
    </div>
  );
};
