function Avatar({ username = "", size = "md", className = "" }) {
  const getInitial = (name) => name?.charAt(0)?.toUpperCase() || "?";

  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-md",
    lg: "w-12 h-12 text-lg",
    xl: "w-14 h-14 text-xl",
  };

  return (
    <div
      className={`
        flex items-center justify-center 
        rounded-full bg-footer-Bg/50 text-white font-semibold 
        ${sizeClasses[size]} ${className}
      `}
    >
      {getInitial(username)}
    </div>
  );
}

export default Avatar;
