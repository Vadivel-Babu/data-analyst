import { useState } from "react";
import "./App.css";
import CropProduction from "./components/CropProduction";
import "@mantine/core/styles.css";
import AverageYield from "./components/AverageYield";

function App() {
  const [tab, setTab] = useState("Crop Production");
  return (
    <div className="App">
      <div className="btns">
        <button
          onClick={() => setTab("Crop Production")}
          className={tab === "Crop Production" ? "active" : ""}
        >
          Crop Production
        </button>
        <button
          onClick={() => setTab("Average Crop Yield")}
          className={tab === "Average Crop Yield" ? "active" : ""}
        >
          Average Crop Yield
        </button>
      </div>
      {tab === "Crop Production" ? <CropProduction /> : <AverageYield />}
    </div>
  );
}

export default App;
