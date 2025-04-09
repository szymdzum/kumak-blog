// Get theme from local storage or system preference
const getTheme = () => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
  }
  if (globalThis.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

// Initialize theme
const theme = getTheme();

if (theme === 'light') {
  document.documentElement.removeAttribute('data-theme');
} else {
  document.documentElement.setAttribute('data-theme', 'dark');
}

globalThis.localStorage.setItem('theme', theme);

// Handle theme toggle
export const handleToggleClick = () => {
  const element = document.documentElement;
  const isDark = element.getAttribute('data-theme') === 'dark';

  localStorage.setItem('theme', isDark ? 'light' : 'dark');
  element.setAttribute('data-theme', isDark ? 'light' : 'dark');
};
