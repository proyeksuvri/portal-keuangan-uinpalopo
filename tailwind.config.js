/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#4F46E5',   // Indigo 600
        secondary: '#6366F1', // Indigo 500
        accent: '#8B5CF6',    // Violet 500
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      boxShadow: {
        sm: '0 2px 10px rgba(0,0,0,0.04)',
        lg: '0 10px 30px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        DEFAULT: '8px',
      },
    },
  },
  // Safelist warna dinamis yang digunakan di AdminDashboard (bg-indigo-50, text-blue-600, dll.)
  safelist: [
    { pattern: /^(bg|text|border)-(indigo|blue|purple|emerald|red)-(50|100|500|600)$/ },
    { pattern: /^(hover:bg)-(indigo|blue|purple)-(500|600)$/ },
  ],
  plugins: [],
}
