export function Input({ value, onChange, onKeyDown, placeholder, type = 'text', className = '', autoFocus = false }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      autoFocus={autoFocus}
      className={`w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
        placeholder-gray-400 dark:placeholder-gray-500
        focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
        text-sm min-h-[44px] ${className}`}
    />
  )
}
