import { useState, createContext, useContext, useEffect } from "react";
import Loading from "../components/Utilities/Loading";

const DatabaseContext = createContext();

export const useDatabase = () => {
  return useContext(DatabaseContext);
};

export const DatabaseProvider = ({ children }) => {
  const [data, setData] = useState();
  const [fullData, setFullData] = useState();
  const [singleProduct, setSingleProduct] = useState();
  const [model, setModel] = useState();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const FetchInfo = async () => {
    try {
      const response = await fetch("https://e-commerce-platform-1trn.onrender.com/api/get/allProducts");
      if (!response.ok) {
        throw new Error("Failed to fetch data!");
      }
      let database = await response.json();
      setFullData(database);
      console.log(database);
      let electronics = database.electronics;
      let jewels = database.jewels;
      let clothings = database.clothing;
      database = [...electronics, ...jewels, ...clothings]
      console.log(database);
      setData(database);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const FetchSingleProduct = async (id) => {
    try {
      const response = await fetch(`https://e-commerce-platform-1trn.onrender.com/Model/get/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch data!");
      }
      const database = await response.json();
      setSingleProduct(database.data[0]);
      setModel(database.model);
      console.log((database.data)[0]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchInfo();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <DatabaseContext.Provider
      value={{ data, fullData, singleProduct, FetchSingleProduct }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
