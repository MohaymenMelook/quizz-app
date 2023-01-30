import RankResult from "./RankResult";
import useFetch from "./useFetch";
import WordDisplay from "./Word-display";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  const data = useFetch("https://6394ddb886829c49e8291f1b.mockapi.io/wordList");
  let finalData = new Array();
  if (data) {
    let noun = 0,
      verb = 0,
      adverb = 0,
      adjective = 0;
    do {
      noun = 0;
      verb = 0;
      adverb = 0;
      adjective = 0;
      finalData = [];
      let newData = data;
      for (let i = 0; i < 10; i++) {
        let randomData = newData[Math.floor(Math.random() * newData.length)];
        finalData = [...finalData, randomData];
        newData = newData.filter((dataFiltered) => {
          return dataFiltered.id !== randomData.id;
        });
        if (finalData[i].pos === "noun") noun++;
        else if (finalData[i].pos === "verb") verb++;
        else if (finalData[i].pos === "adjective") adjective++;
        else if (finalData[i].pos === "adverb") adverb++;
      }
    } while ((noun && verb && adverb && adjective) != true);
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={data && <WordDisplay finalData={finalData} />}
          />
          <Route path="/rank" element={<RankResult />} />
        </Routes>
        {/* <h1 className="header">QUIZ APP</h1>
        {data && <WordDisplay data={data} />}
        <RankResult /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
