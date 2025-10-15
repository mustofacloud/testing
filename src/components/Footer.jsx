const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 shadow-inner mt-10 py-4 text-center text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-slate-700">
      <p>
        © {new Date().getFullYear()} Portal JKT48 — Made by MasThopa
      </p>
    </footer>
  );
};

export default Footer;
