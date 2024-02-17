import {useState} from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems(items => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems(items => items.map(item => (item.id === id ? {...item, packed: !item.packed} : item)));
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far away 💼</h1>;
}

function Form({onAddItems}) {
  const [description, setDescription] = useState("");
  const [qty, setQty] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = {description, qty, packed: false, id: Date.now()};

    onAddItems(newItem);
    setDescription("");

    setQty(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={qty} onChange={e => setQty(+e.target.value)}>
        {Array.from({length: 20}, (_, i) => i + 1).map(num => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({items, onDeleteItem, onToggleItem}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description") {
    sortedItems = items.slice(0).sort((a, b) => a.description.localeCompare(b.description));
  }

  if (sortBy === "packed") {
    sortedItems = items.slice(0).sort((a, b) => Number(b.packed) - Number(a.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map(item => (
          <Item item={item} onToggleItem={onToggleItem} onDeleteItem={onDeleteItem} key={item.id} />
        ))}
      </ul>

      <div className="actions">
        <select
          value={sortBy}
          onChange={e => {
            setSortBy(e.target.value);
          }}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
    </div>
  );
}

function Item({item, onDeleteItem, onToggleItem}) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          console.log(item);
          onToggleItem(item.id);
        }}
      />
      <span style={item.packed ? {textDecoration: "line-through"} : {}}>
        {item.qty} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({items}) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your list</em>
      </p>
    );
  const numItems = items.length;
  const packedItems = items.filter(item => item.packed).length;
  const percent = Math.round((packedItems / numItems) * 100);

  return (
    <footer className="stats">
      {" "}
      <em>
        {percent === 100
          ? "You got everything! Ready to go ✈️ "
          : `  💼You have ${numItems} items on yout list, and you already packed ${packedItems} (${
              isNaN(percent) ? "Your list is empty" : percent + "%"
            })`}
      </em>
    </footer>
  );
}
