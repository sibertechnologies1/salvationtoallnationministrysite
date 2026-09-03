export default function SermonSearchBar({ searchTerm, setSearchTerm, clearSearch }) {
  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto mb-4">
      <div className="relative flex items-center">
        <svg
          className="absolute left-4 w-5 h-5 text-stone-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="7" strokeWidth="2" />
          <path strokeLinecap="round" strokeWidth="2" d="M21 21l-4.35-4.35" />
        </svg>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search sermons by title..."
          aria-label="Search sermons by title"
          className="w-full rounded-full border border-stone-200 bg-stone-50 pl-12 pr-24 py-3.5 text-stone-700 placeholder:text-stone-400 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition"
        />

        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label="Clear search"
            className="absolute right-24 w-6 h-6 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-600 hover:bg-stone-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <button
          type="submit"
          className="absolute right-1.5 bg-green-950 text-stone-50 text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-green-900 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}