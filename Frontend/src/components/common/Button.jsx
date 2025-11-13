// frontend/src/components/common/Button.jsx

export const Button = ({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center
        px-4 py-2
        bg-primary-600 hover:bg-primary-700
        dark:bg-primary-500 dark:hover:bg-primary-600
        text-white
        font-medium
        rounded-lg
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
        ${className}
      `}
    >
      {children}
    </button>
  );
};
