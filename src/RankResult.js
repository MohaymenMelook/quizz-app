import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";

const RankResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let score = location.state.score;
  const data = useFetch(
    "https://6394ddb886829c49e8291f1b.mockapi.io/scoresList"
  );
  let counter = 0;
  let rank = 0;
  let output = 0;
  if (data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i] < score) {
        counter++;
      }
    }

    rank = Math.floor((counter / data.length) * 100);
console.log(rank)
    const timer = setInterval(() => {
      document.querySelector(".rankResult").textContent = `this is your rank ${output} %`;
      if (output === rank) {
        clearInterval(timer);
      } else {
        output++;
      }
    }, 10);
  }
  const handleClick = () => {
    counter = 0;
    rank = 0;
    output = 0;
    navigate("/");
  };
  return (
    <div className="cover">
      <div className="wrapper">
        <div className="rankResult"></div>
        <div className="btn-container">
          <button className="btn btn-refresh" onClick={handleClick}>
            try again
          </button>
        </div>
      </div>
    </div>
  );
};

export default RankResult;
