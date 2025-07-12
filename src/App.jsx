import { useState, useEffect, useRef } from "react";
import axios from "axios";

function App() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const effectRun = useRef(false)

  const getData = async () => {
    setLoading(true);
    setError(null)
    try {
      let data = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsersData(data?.data);
      setLoading(false);
    } catch (error) {
      setError(error.message || "Something went wrong....");
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    if(effectRun.current === false){
      getData();
      effectRun.current = true
    }
  }, []);

  console.log("res", Array.isArray(usersData));
  console.log("res", usersData);

  return (
    <>
      {error && <p>{error.status}</p>}
      {loading && <p>Loading...</p>}
      {usersData.map((item, index) => {
        return (
          <div key={index}>
            <p>{item.name}</p>
          </div>
        );
      })}
      <p>Just Practise</p>
    </>
  );
}

export default App;
// hello