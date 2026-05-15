import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const getPaginationRange = (currentPage: number, totalPages: number) => {
  const range: (number | "ellipsis")[] = [];

  // Always show Page 1
  range.push(1);

  // Add Left Ellipsis if current page is far from start
  if (currentPage > 3) {
    range.push("ellipsis");
  }

  // Calculate the 3-page "Window" around the current page
  // Ensures we don't go out of bounds (min 2, max total-1)
  const start = Math.max(2, Math.min(currentPage - 1, totalPages - 2));
  const end = Math.min(totalPages - 1, Math.max(currentPage + 1, 3));

  for (let i = start; i <= end; i++) {
    if (i > 1 && i < totalPages) {
      // Avoid duplicating first/last page
      range.push(i);
    }
  }

  // Add Right Ellipsis if current page is far from end
  if (currentPage < totalPages - 2) {
    range.push("ellipsis");
  }

  // Always show Last Page (if it exists)
  if (totalPages > 1) {
    range.push(totalPages);
  }

  return range;
};

export const generatePaginationLinks = (
  pageNumber: number,
  pathname: string,
  searchParams: URLSearchParams
) => {
  const params = new URLSearchParams(searchParams);
  params.set("page", pageNumber.toString());
  return `${pathname}?${params.toString()}`;
};

interface PaginationFields {
  meta?: {
    currentPage: number;
    pageLength: number;
    totalItems: number;
    totalPages: number;
    from: number;
    to: number;
  };
  direction: "next" | "prev";
  isLoading: boolean;
  pathname: string;
  searchParams: URLSearchParams;
  router: AppRouterInstance;
}

export const handleNextPrevPagination = ({
  direction,
  isLoading,
  meta,
  pathname,
  searchParams,
  router,
}: PaginationFields) => {
  if (isLoading) return;
  if (
    direction === "next" &&
    (meta?.currentPage ?? 0) >= (meta?.totalPages ?? 0)
  )
    return;
  if (direction === "prev" && (meta?.currentPage ?? 0) <= 1) return;
  let pageNumber;
  if (direction === "next") {
    pageNumber = (meta?.currentPage ?? 1) + 1;
  } else {
    pageNumber = (meta?.currentPage ?? 1) - 1;
  }
  const paginationLink = generatePaginationLinks(
    pageNumber,
    pathname,
    searchParams
  );
  router.push(paginationLink, { scroll: false });
};
