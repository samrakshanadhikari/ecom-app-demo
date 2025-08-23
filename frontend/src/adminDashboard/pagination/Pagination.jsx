const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages === 0) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className="flex justify-center space-x-2 mt-6">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 bg-blue-100 text-blue-700 rounded disabled:opacity-50 hover:bg-blue-200"
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded ${
            page === currentPage ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 bg-blue-100 text-blue-700 rounded disabled:opacity-50 hover:bg-blue-200"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
