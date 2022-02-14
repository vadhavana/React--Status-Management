function Card(props) {

  const status = [
    {
      value:"Working",
      text:"Working",
    },
    {
      value:"On Vacation",
      text:"On Vacation",
    },
    {
      value:"Lunch Time",
      text:"Lunch Time",
    },
    {
      value:"Business Trip",
      text:"Business Trip",
    },
  ]

  return (
    <div className="Card">
      <div className="Card-Img" style={{background: `url(${props.img})`, backgroundSize: "contain"}}></div>
      <div className="Card-Name">
        <p>{props.name}</p>
        <select 
          id={props.id}
          className="Card-Select"
          onChange={props.onChange}
        >
          {
            status?.map((item)=>(
              <option value={item.value} selected={props.status === item.value}>
                 {item.value}
              </option>
            ))
          }
        </select>
      </div>
    </div>
  );
}

export default Card;
