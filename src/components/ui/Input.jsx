export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        w-full
        rounded-xl
        border
        border-gray-300
        px-4
        py-3
        outline-none
        focus:border-orange-500
      "
      required={required ? required : false}
    />
  );
}
