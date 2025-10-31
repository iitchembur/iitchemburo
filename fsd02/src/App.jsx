import React, { useState, useEffect, useRef } from 'react';

// --- Inline SVG Icons ---

// NOTE: IconSun and IconMoon have been removed as they are no longer needed.

const IconEdit = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 20h9"></path>
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
  </svg>
);

const IconBook = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const IconStar = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);


// --- Our NEW Custom Hook ---
// This hook stores and returns the previous value of a state or prop.
function usePrevious(value) {
  // 1. The `ref` object is a generic container whose `.current` property is mutable
  //    and doesn't re-trigger a render when it changes.
  const ref = useRef();

  // 2. We use `useEffect` to update the ref's current value *after* every render.
  //    This means it will hold the value from the *previous* render.
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // 3. We return the ref's current value (which is the value *before* the effect ran)
  return ref.current;
}


// --- Main App Component ---
export default function App() {
  // --- 1. useState Demo ---
  // A simple state for our text input
  const [text, setText] = useState('');

  // --- 2. Custom Hook Demo (`usePrevious`) ---
  // We use our custom hook to track the previous value of `text`
  const prevText = usePrevious(text);

  // --- 3. useEffect Demo ---
  // This effect updates the browser tab's title
  useEffect(() => {
    if (text.trim()) {
      document.title = `Typing: ${text}`;
    } else {
      document.title = 'React Hooks Showcase';
    }
  }, [text]); // The "dependency array" - this effect only runs when text changes

  // --- Helper Functions ---
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // --- JSX (The UI) ---
  return (
    // Main container with a subtle gradient background (no dark mode)
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-4 font-sans transition-colors duration-300 sm:p-8">
      
      {/* Main content card with upgraded shadow and border */}
      <div className="w-full max-w-2xl rounded-2xl bg-white/70 p-6 shadow-2xl backdrop-blur-lg transition-all duration-300 sm:p-10 border border-gray-200">
        
        {/* Header Section (Dark mode button removed) */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            React Hooks Showcase
          </h1>
        </div>

        {/* Grid for the demo sections */}
        <div className="space-y-6">
          
          {/* 1. useState Demo Card */}
          <DemoCard
            icon={<IconEdit className="text-blue-600" />}
            iconBg="bg-gradient-to-br from-blue-100 to-blue-200"
            title="useState Demo"
            description="Manages component state. Type here to see it in action."
          >
            <input
              type="text"
              value={text}
              onChange={handleTextChange}
              placeholder="Type something..."
              className="w-full rounded-lg border border-gray-300 bg-white/50 p-3 text-gray-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-600"
            />
            <p className="mt-3 rounded-lg bg-blue-50 p-3 text-sm text-blue-700 border border-blue-200">
                <span className="font-medium">Current State:</span> {text || '...'}
              </p>
          </DemoCard>

          {/* 2. useEffect Demo Card */}
          <DemoCard
            icon={<IconBook className="text-green-600" />}
            iconBg="bg-gradient-to-br from-green-100 to-green-200"
            title="useEffect Demo"
            description="Performs side effects. As you type in the box above, this hook updates your browser tab's title."
          >
            <p className="text-sm rounded-lg bg-green-50 p-3 text-green-700 border border-green-200">
              Check your browser tab right now!
            </p>
          </DemoCard>

          {/* 3. Custom Hook Demo Card (NEW) */}
          <DemoCard
            icon={<IconStar className="text-purple-600" />}
            iconBg="bg-gradient-to-br from-purple-100 to-purple-200"
            title="Custom Hook: usePrevious"
            description="This hook (using useRef and useEffect) remembers the last value from the input box above."
          >
            {/* Display area for the hook's output */}
            <div className="space-y-2 rounded-lg bg-purple-50 p-4 border border-purple-200">
              <p className="text-sm text-purple-800">
                <span className="font-medium">Current Value:</span> {text || '...'}
              </p>
              <p className="text-sm text-purple-600">
                <span className="font-medium">Previous Value:</span> {prevText || '...'}
              </p>
            </div>

            {/* Explanation of the hook */}
            <code className="mt-4 block w-full rounded-lg bg-gray-100 p-4 text-left text-sm text-gray-800 shadow-inner">
              <pre className="overflow-x-auto">
                {`// Our custom hook's signature
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

// How we use it:
const prevText = usePrevious(text);`}
              </pre>
            </code>
          </DemoCard>

        </div>
      </div>
    </div>
  );
}

// A reusable component to make the demo cards look nice (no dark mode classes)
function DemoCard({ icon, iconBg, title, description, children }) {
  return (
    <div className="rounded-xl border border-gray-200/50 bg-white/50 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      <div className="mb-4 flex items-center space-x-4">
        <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${iconBg} shadow-md`}>
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-gray-900">
          {title}
        </h2>
      </div>
      <p className="mb-4 text-gray-600">{description}</p>
      <div>
        {children}
      </div>
    </div>
  );
}

