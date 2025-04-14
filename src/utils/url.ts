type PathnameResult = {
  pathname: string;
  subpath: string[] | null;
};

/**
 * Extracts the pathname and subpath from a URL
 * @param url - The URL to extract pathname from
 */
export const getPathname = (url: URL): PathnameResult => {
  const pathname = url.pathname.replace(import.meta.env.BASE_URL, '');
  const subpath = pathname.match(/[^\/]+/g);

  return { pathname, subpath };
};
