import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Cards from "./Cards";
import { enqueueSnackbar } from "notistack";
import { FaSearch } from "react-icons/fa";

const Dashboard = () => {
  const [items, setItems] = useState();
  const [item, setItem] = useState("");
  const [type, setType] = useState("title");

  const searchit = () => {
    if (item === "") {
      enqueueSnackbar("Please enter item", { variant: "error" });
      return;
    }
    if (isFinite(parseInt(item))) {
      setType("isbn");
    }

    fetch(`http://localhost:3000/library/retrive/${type}/${item}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.totalItems === 0) {
          enqueueSnackbar("Oops, Sorry Item not found", { variant: "error" });
          return;
        }

        let items = response.items.map((item) => {
          return <Cards key={item.id} item={item} />;
        });

        setItems(items);

        enqueueSnackbar(`Item found total ${response.totalItems}`, {
          variant: "success",
        });
      })
      .catch(() => {
        enqueueSnackbar("Something went wrong", { variant: "error" });
      });
  };

  const handleKey = (e) => {
    setItem(e.target.value);
    if (e.key === "Enter") {
      searchit();
    }
  };

  useEffect(() => {
    fetch("http://localhost:3000/library/retriveAll", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        let items = response.items.map((item) => {
          return <Cards key={item.id} item={item} />;
        });

        setItems(items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Navbar />
      <label className=" input input-bordered flex items-center mx-auto mt-20 gap- w-1/2 border-2 border-orange-500 ">
        {"Title or ISBN 10: "}
        <input
          type="text"
          className="grow p-3"
          placeholder="Search"
          value={item}
          onChange={(e) => {
            setItem(e.target.value);
          }}
          onKeyDown={handleKey}
        />
        {<FaSearch className="h-5 w-5" onClick={searchit} />}
      </label>
      <div className="container-fluid my-5 mt-40 flex justify-center items-center">
        {items && <div className="grid grid-cols-4 gap-10"> {items}</div>}
      </div>
    </>
  );
};

export default Dashboard;
