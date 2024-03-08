import { useState } from "react";
import { enqueueSnackbar } from "notistack";
const Search = () => {
  const [item, setItem] = useState("");
  //   useEffect(() => {
  //     fetch("http://localhost:3000/library/retuive/:id", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((response) => {
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }, []);

  const searchit = () => {
    fetch(`http://localhost:3000/library/retrive/${"title"}/${item}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        enqueueSnackbar(`Item found total ${response.totalItems}`, {
          variant: "success",
        });
      })
      .catch((error) => {
        enqueueSnackbar("Something went wrong", { variant: "error" });
      });
  };

  const handleKey = (e) => {
    setItem(e.target.value);
    if (e.key === "Enter") {
      searchit();
    }
  };

  return (
    <label className="input input-bordered flex items-center mx-auto mt-20 gap- w-1/2">
      <input
        type="text"
        className="grow"
        placeholder="Search"
        value={item}
        onChange={(e) => {
          setItem(e.target.value);
        }}
        onKeyDown={handleKey}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-4 h-4 opacity-70"
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
};

export default Search;
