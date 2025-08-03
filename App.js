import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function App() {
  const [data, setData] = useState([]);
  const [time, setTime] = useState("");

  const generateData = () => {
    const now = new Date();
    const newData = Array.from({ length: 20 }, (_, i) => {
      const t = new Date(now.getTime() - (19 - i) * 5000);
      return {
        time: t.toLocaleTimeString(),
        price: 0.85 + Math.random() * 0.01,
      };
    });
    setData(newData);
  };

  useEffect(() => {
    generateData();
    const interval = setInterval(generateData, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      now.setMinutes(now.getMinutes() + 2);
      setTime(now.toLocaleTimeString());
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>EUR/GBP OTC - Demo Trading</h1>
      <p style={{ textAlign: "center" }}>Live Clock (2 min ahead): {time}</p>
      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="time" />
            <YAxis domain={[0.85, 0.86]} />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#4f46e5" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <button style={{ marginRight: 10, padding: "10px 20px", backgroundColor: "green", color: "white" }}>Buy</button>
        <button style={{ padding: "10px 20px", backgroundColor: "red", color: "white" }}>Sell</button>
      </div>
    </div>
  );
}

export default App;