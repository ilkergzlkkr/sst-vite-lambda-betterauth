import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { API_URL } from "./main";
import { authClient } from "./auth";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState("");
  console.log("API_URL", API_URL);

  useEffect(() => {
    fetch(`${API_URL}`)
      .then((res) => {
        return res.text();
      })
      .then(setData);
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h1>Data from server: {data}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button
          onClick={async () => {
            const result = await authClient.signIn.magicLink({
              email: "your@gmail.com",
            });

            if (result.error) {
              console.error(result.error);
              return;
            }
          }}
        >
          Send Magic Link
        </button>
        <button
          onClick={async () => {
            const result = await authClient.magicLink.verify({
              query: { token: "" },
            });

            if (result.error) {
              console.error(result.error);
              return;
            }

            const session = result.data;
            const token = session.token;
            console.log("Session token", token);
            console.log("result", result);
          }}
        >
          Verify
        </button>
        <button
          onClick={async () => {
            const result = await authClient.getSession({});

            if (result.error) {
              console.error(result.error);
              return;
            }

            console.log("Session", result.data);
          }}
        >
          Session
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
