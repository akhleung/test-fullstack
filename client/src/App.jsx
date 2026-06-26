import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState('')
  const [clickCount, setClickCount] = useState(0);
  const [items, setItems] = useState([]);
  const [checked, setChecked] = useState({});
  const [inputText, setInputText] = useState("");

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

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const entries = Object.fromEntries(data.entries());
    const itemInput = entries["itemInput"];
    setItems([...items, itemInput]);
    setInputText("");
  }

  function handleReset(e) {
    e.preventDefault();
    setItems([]);
  }

  function ShoppingListItems() {
    const listItems = items.map((item, ix) => {
      function handleCheck(e) {
        if (e.target.checked) {
          setChecked({ ...checked, [ix] : true });
          console.log(item + " checked");
        } else {
          const { [ix] : _, ...newChecked } = checked;
          setChecked(newChecked);
          console.log(item + " unchecked");
        }
      }
      return <li key={ix} style={{textDecoration: checked[ix] ? "line-through" : "normal"}}>{item}<input type="checkbox" key={ix} onChange={handleCheck} checked={checked[ix]}></input></li>;
    });

    return (<ol>{listItems}</ol>);
  }

  return (
    <div style={{ textAlign: 'left', margin: '30px' }}>
      <h1>React + Express Integration</h1>
      <p>{message ? message : "Loading data from backend..."}</p>
      <Button clicker="Alice" />
      <Button clicker="Bob" />
      <Button clicker="Chuck" />
      <h2>Buttons clicked {clickCount} times.</h2>
      <form method="post" onSubmit={handleSubmit} onReset={handleReset}>
        <label>
          Input:
          <input 
            type="text" 
            name="itemInput" 
            value={inputText} 
            onChange={(e) => setInputText(e.target.value)}>
          </input>
        </label>
        <button type="submit">Submit</button>
        <button type="reset">Clear All</button>
      </form>
      <ShoppingListItems />
    </div>
  )
}

export default App
