export default function Dropdown({
  items = [],
  value = "",
  placeholder = "Select",
  onChange,
  disabled = false,
  className = "",
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={className}
    >
      <option value="" disabled hidden>
        {placeholder}
      </option>
      {items &&
        items.length > 0 &&
        items.map((ele) => (
          <option key={ele.key} value={ele.value}>
            {ele.label}
          </option>
        ))}
    </select>
  );
}
