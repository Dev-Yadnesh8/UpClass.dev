function Button({ text, type = "button", variant = "solid", onClick ,className=""}) {
  const baseClasses =
    "px-5 py-2 rounded-full font-medium transition duration-300 cursor-pointer";

  const variants = {
    gradient: `bg-gradient-to-r from-purple to-blue text-white hover:opacity-90`,
    solid: `bg-footer-Bg  text-white hover:opacity-90`,
    outline:
      "bg-transparent text-white border-2 border-footer-Bg/40 hover:border-footer-Bg",
    ghost: `bg-transparent text-white hover:bg-purple/10`,
    text: `bg-transparent text-purple hover:underline`,
  };

  return (
    <button
      type={type}
      onClick={onClick && onClick}
      className={`${baseClasses} ${variants[variant] || variants.solid} ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;
