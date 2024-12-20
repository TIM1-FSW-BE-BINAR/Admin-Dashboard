import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationNextLast,
  PaginationPrevious,
  PaginationPreviousLast
} from '@/components/ui/pagination';

type TPaginationSectionProps = {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};
export default function PaginationSection({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage
}: TPaginationSectionProps) {
  if (!totalPosts || totalPosts <= 0 || !postsPerPage || postsPerPage <= 0) {
    return null;
  }

  const totalPages = Math.max(1, Math.ceil(totalPosts / postsPerPage));

  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const maxPageNum = 5;
  const pageNumLimit = Math.floor(maxPageNum / 2);

  const activePages = pageNumbers.slice(
    Math.max(0, validCurrentPage - 1 - pageNumLimit),
    Math.min(validCurrentPage - 1 + pageNumLimit + 1, pageNumbers.length)
  );

  const handleNextPage = () => {
    if (validCurrentPage < totalPages) {
      setCurrentPage(validCurrentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (validCurrentPage > 1) {
      setCurrentPage(validCurrentPage - 1);
    }
  };

  const handlePrevPageLast = () => {
    if (validCurrentPage > 1) {
      setCurrentPage(1);
    }
  };

  const handleNextPageLast = () => {
    if (validCurrentPage < totalPages) {
      setCurrentPage(totalPages);
    }
  };

  const renderPages = () => {
    const renderedPages = activePages.map((page, idx) => (
      <PaginationItem
        key={idx}
        className={validCurrentPage === page ? 'rounded-md bg-primary' : ''}
      >
        <PaginationLink onClick={() => setCurrentPage(page)}>
          {page}
        </PaginationLink>
      </PaginationItem>
    ));

    if (activePages[0] > 1) {
      renderedPages.unshift(
        <PaginationEllipsis
          key="ellipsis-start"
          onClick={() => setCurrentPage(activePages[0] - 1)}
        />
      );
    }

    if (activePages[activePages.length - 1] < totalPages) {
      renderedPages.push(
        <PaginationEllipsis
          key="ellipsis-end"
          onClick={() =>
            setCurrentPage(activePages[activePages.length - 1] + 1)
          }
        />
      );
    }

    return renderedPages;
  };

  return (
    <div className="p-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPreviousLast
              onClick={handlePrevPageLast}
              className={
                validCurrentPage <= 1 ? 'cursor-not-allowed opacity-50' : ''
              }
            />
            <PaginationPrevious
              onClick={handlePrevPage}
              className={
                validCurrentPage <= 1 ? 'cursor-not-allowed opacity-50' : ''
              }
            />
          </PaginationItem>

          {renderPages()}

          <PaginationItem>
            <PaginationNext
              onClick={handleNextPage}
              className={
                validCurrentPage >= totalPages
                  ? 'cursor-not-allowed opacity-50'
                  : ''
              }
            />
            <PaginationNextLast
              onClick={handleNextPageLast}
              className={
                validCurrentPage >= totalPages
                  ? 'cursor-not-allowed opacity-50'
                  : ''
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
