function IconButton({ icon, onClick, tooltip,className="" }) {
  return (
    <button
      onClick={onClick}
      title={tooltip}
      className={`p-1.5 transition cursor-pointer ${className }`}
    >
      {icon}
    </button>
  );
}

export default IconButton;