import { useEffect, useState } from "react";
import Card from './component/Card';
import "./App.css"

function App() {

  const [profiles, setProfile] = useState([]);
  const [filter, setFilter] = useState();
  const [search, setSearch] = useState("");

  const status = [
    {
      value: "Select Status",
      text: "Select Status",
    },
    {
      value: "Working",
      text: "Working",
    },
    {
      value: "On Vacation",
      text: "On Vacation",
    },
    {
      value: "Lunch Time",
      text: "Lunch Time",
    },
    {
      value: "Business Trip",
      text: "Business Trip",
    },
  ]

  const onChange = (e) => {
    const response = fetch(
      `http://localhost:3001/users/${e.target.id}`,
      {
        method: "POST",
        body: JSON.stringify({
          status: e.target.value
        }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "*",
          "Access-Control-Allow-Credentials": true
        }
      }
    )
  }

  const onChangeFilter = (e) => {
    const val = profiles?.filter(item => item.status === e.target.value);
    setFilter(val);
  }

  const onChangeSearch = (e) => {
    if (e.target.value !== "") {
      const val = profiles?.filter(item => item.name === e.target.value);
      setSearch(val);
    } else {
      setSearch(profiles);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/users",
          {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': "*",
              "Access-Control-Allow-Credentials": true
            }
          }
        )
        const json = await response.json();
        setProfile(json);
      } catch (error) {
        console.log("error ****************", error);
      }
    };

    fetchData();
  }, []);

  return (

    <>
      <div style={{ display: "flex", flexFlow: "wrap", justifyContent: "flex-end", margin: "5%" }}>
        <div className="filter">
          <label for={"filter"}>Filter: </label>
          <select
            id="filter"
            onChange={(e) => onChangeFilter(e)}
          >
            {
              status?.map((item, index) => (
                <option value={item.value} key={index}>
                  {item.value}
                </option>
              ))
            }
          </select>
        </div>
        <div className="search">
          <label for={"search"}>Search: </label>
          <input type={"text"} name={"search"} id={"search"} onChange={(e) => onChangeSearch(e)} />
        </div>
      </div>
      <div style={{ display: "flex", flexFlow: "wrap" }}>
        {
          search ? search?.map((item, index) => (
            <Card
              id={item.id}
              status={item.status}
              key={index}
              name={item.name}
              img={item.img}
              onChange={(e) => onChange(e)}
            />
          )) :
            filter ? filter?.map((item, index) => (
              <Card
                id={item.id}
                status={item.status}
                key={index}
                name={item.name}
                img={item.img}
                onChange={(e) => onChange(e)}
              />
            )) :
              profiles?.map((item, index) => (
                <Card
                  id={item.id}
                  status={item.status}
                  key={index}
                  name={item.name}
                  img={item.img}
                  onChange={(e) => onChange(e)}
                />
              ))
        }
      </div>
    </>
  );
}

export default App;
