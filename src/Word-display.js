import { useRef, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

const WordDisplay = ({ finalData }) => {
  const navigate = useNavigate();

  //   const sliced = data.slice(0, 10);
  //   const [newData, setData] = useState(sliced);
  //   const [randomData, setRandomData] = useState(
  //     newData[Math.floor(Math.random() * newData.length)]
  //   );
  const [answer, setAnswer] = useState("");
  const [clicked, setClicked] = useState(false);
  const correctAnswer = useRef(0);
  const queNum = useRef(1);
  let score = correctAnswer.current
    ? Math.floor((correctAnswer.current / finalData.length) * 100)
    : 0;
  const [index, setIndex] = useState(0);
  const handleClick = (e) => {
    // const dataFiltered = newData.filter((newdata) => {
    //   return newdata.id !== randomData.id;
    // });
    // setData(dataFiltered);

    if (e.target.value === finalData[index].pos) {
      setAnswer(`this is correct answer`);
      setClicked(true);
      correctAnswer.current = correctAnswer.current + 1;
      e.target.className = "btn btn-correct";
    } else {
      setAnswer(`sorry,this is wrong answer`);
      setClicked(true);
      e.target.className = "btn btn-wrong";
    }
  };
  const nextQ = () => {
    setAnswer("");
    setClicked(false);
    setIndex(index + 1);
    queNum.current = queNum.current + 1;
    let btns = document.querySelectorAll(`.btn`);
    btns.forEach((btn) => {
      btn.className = "btn";
      //   if (newData) {
      //     setRandomData(newData[Math.floor(Math.random() * newData.length)]);
      //   }
    });
    if (index == 9) {
      navigate("/rank", { state: { score } });
    }
  };
  return (
    <div className="cover">
      <div className="wrapper">
        <h1 className="header">QUIZ APP</h1>
        <div className="question">
        <div className="queNum" style={{ width: 100, height: 100 }}>
          <CircularProgressbar
            value={queNum.current}
            text={queNum.current + "/" + finalData.length}
            maxValue={finalData.length}
          />
        </div>
        <div className="word-card">
          <div>{finalData[index].word}</div>
        </div>
        </div>

        <div className="buttons">
          <button
            value="verb"
            className="btn"
            onClick={handleClick}
            disabled={clicked}
          >
            verb
          </button>

          <button
            value="adverb"
            className="btn"
            onClick={handleClick}
            disabled={clicked}
          >
            adverb
          </button>

          <button
            value="noun"
            className="btn"
            onClick={handleClick}
            disabled={clicked}
          >
            noun
          </button>

          <button
            value="adjective"
            className="btn"
            onClick={handleClick}
            disabled={clicked}
          >
            adjective
          </button>
        </div>
        {answer && (
        <div className="answer">
          <h2> {answer}</h2>
          <button className="btn" onClick={nextQ}>
            next
          </button>
        </div>
      )}
      </div>

      
    </div>
  );
};

export default WordDisplay;
