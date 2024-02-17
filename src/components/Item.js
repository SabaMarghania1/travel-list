export default function Item({item, onDeleteItem, onToggleItem}) {
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
