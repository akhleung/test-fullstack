import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState('')
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/data');
        const data = await res.json();
        setMessage(data.message + " Bleah!");
      } catch (err) {
        console.error(err);
      }
    })();
    // fetch('/api/data')
    //   .then((res) => res.json())
    //   .then((data) => setMessage(data.message))
    //   .catch((err) => console.error(err));
  }, [])

  function Button({clicker}) {
    function handler() {
      setClickCount(clickCount + 1);
      alert("Clicked by " + clicker + ".");
    }
    return <button onClick={handler}>Button for {clicker}</button>
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>React + Express Integration</h1>
      <p>{message ? message : "Loading data from backend..."}</p>
      <Button clicker="Alice" />
      <Button clicker="Bob" />
      <Button clicker="Chuck" />
      <h2>Buttons clicked {clickCount} times.</h2>
    </div>
  )
}

export default App
