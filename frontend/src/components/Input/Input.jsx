import clsx from "clsx";

const variantClasses = {
  solid: `

    bg-footer-Bg/20
    border border-footer-Bg/50 
    focus:border-footer-Bg focus:ring-footer-Bg
    placeholder:text-gray-400
  `,
  outlined: `
    bg-transparent 
    border-2 border-purple/40 
    text-white 
    hover:border-purple 
    focus:border-purple focus:ring-2 focus:ring-purple
    placeholder:text-purple-200
  `,
  ghost: `
    bg-transparent 
    border-0 border-b-2 border-gray-600 
    rounded-none 
    focus:border-purple 
    focus:ring-0 
    placeholder:text-gray-500
  `,
};

function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = false,
  variant = "solid",
  multiline = false,
  rows = 4,
  leftIcon,
  rightIcon,
  inputRef, // normal prop, NOT actual `ref`
  className = "",
  ...rest
}) {
  const inputStyles = clsx(
    "w-full px-4 py-2 text-white placeholder:text-sm transition-all duration-200 focus:outline-none",
    "focus:ring-2 rounded-lg",
    variantClasses[variant],
    leftIcon && "pl-10",
    rightIcon && "pr-10",
    className
  );

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-200">
          {label}
        </label>
      )}

      <div className="relative w-full">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">
            {leftIcon}
          </span>
        )}

        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
            {rightIcon}
          </span>
        )}

        {multiline ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            rows={rows}
            placeholder={placeholder}
            required={required}
            ref={inputRef}
            className={inputStyles}
            {...rest}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            ref={inputRef}
            className={inputStyles}
            {...rest}
          />
        )}
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export default Input;
