import { createSearchParamsCache, parseAsInteger, parseAsString } from "nuqs/server";
// Note: import from 'nuqs/server' to avoid the "use client" directive

export const searchParamsCache = createSearchParamsCache({
  postId: parseAsString,
});
