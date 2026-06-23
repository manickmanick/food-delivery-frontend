export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        rounded-xl
        bg-orange-500
        px-5
        py-3
        font-semibold
        text-white
        transition
        hover:bg-orange-600
        ${className}
      `}
    >
      {children}
    </button>
  );
}