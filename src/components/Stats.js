export default function Stats({items}) {
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
