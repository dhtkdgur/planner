export function Select({ value, onChange, options, className = '' }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
        focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
        text-sm min-h-[44px] ${className}`}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
