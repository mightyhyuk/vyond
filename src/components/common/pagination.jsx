const Pagination = (props) => {
  const { itemCount, pageSize, onPageChange, currentPage } = props;

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount === 1) return null;

  const pages = [];
  for (let i = 1; i <= pageCount; i++) pages.push(i);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
