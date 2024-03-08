import { MdOutlineFavoriteBorder } from "react-icons/md";

/* eslint-disable react/prop-types */
const Cards = ({ item }) => {
  return (
    <div
      id={item.id}
      className="w-full bg-stone-800 max-w-[20rem] shadow-lg shadow-orange-400 rounded-xl ring-1 ring-orange-500"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          console.log(item);
        }}
        className="btn btn-ghost btn-circle right-2 top-2 z-10 text-orange-500 "
      >
        <div className="lg:tooltip tooltip-left" data-tip="Add to favorites">
          <MdOutlineFavoriteBorder className="h-5 w-5 on:hover:bg-orange-500" />
        </div>
      </button>
      <figure>
        <img
          className="p-5 mx-auto"
          src={
            item.volumeInfo.imageLinks?.thumbnail
              ? item.volumeInfo.imageLinks.thumbnail
              : "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          }
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {item.volumeInfo.title}
          {/* <div className="badge ">NEW</div> */}
        </h2>
        <p>{item.volumeInfo.subtitle}</p>
      </div>
    </div>
  );
};

export default Cards;
