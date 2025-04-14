import type { CollectionEntry } from 'astro:content';

/**
 * Valid options for sorting blog posts
 * @typedef {string} SortOption
 */
export type SortOption = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc' | 'updated';

/**
 * Valid options for filtering blog posts
 * Can be a string constant or a filter function
 * @typedef {string | Function} PostFilterOption
 */
export type PostFilterOption = 'all' | 'featured' | ((post: CollectionEntry<'blog'>) => boolean);

/**
 * Options for querying posts
 * @interface PostQueryOptions
 */
export interface PostQueryOptions {
  /** Sort method to apply */
  sortBy?: SortOption;
  /** Filter to apply */
  filter?: PostFilterOption;
  /** Maximum number of posts to return */
  limit?: number;
  /** Tags to filter by */
  tags?: string[];
}

/**
 * Common query patterns as constants
 * Use these for consistent filtering and sorting across components
 */
export const PostQueries = {
  // Sort options
  SORT: {
    /** Sort by publish date, newest first (default) */
    NEWEST_FIRST: 'date-desc' as SortOption,
    /** Sort by publish date, oldest first */
    OLDEST_FIRST: 'date-asc' as SortOption,
    /** Sort alphabetically by title, A-Z */
    ALPHABETICAL: 'title-asc' as SortOption,
    /** Sort alphabetically by title, Z-A */
    REVERSE_ALPHA: 'title-desc' as SortOption,
    /** Sort by update date, most recently updated first */
    RECENTLY_UPDATED: 'updated' as SortOption
  },

  // Filter presets
  FILTER: {
    /** No filtering, return all posts */
    ALL: 'all' as PostFilterOption,
    /** Only posts marked as featured */
    FEATURED: 'featured' as PostFilterOption,
    /** Only posts with hero images */
    HAS_IMAGE: ((post: CollectionEntry<'blog'>) => !!post.data.heroImage) as PostFilterOption,
    /** Only posts published in the current year */
    PUBLISHED_THIS_YEAR: ((post: CollectionEntry<'blog'>) => {
      const now = new Date();
      return post.data.pubDate.getFullYear() === now.getFullYear();
    }) as PostFilterOption
  },

  // Common limits
  LIMIT: {
    /** Limit to 3 posts */
    THREE: 3,
    /** Limit to 5 posts */
    FIVE: 5,
    /** Limit to 10 posts */
    TEN: 10
  }
};

/**
 * A utility class for querying and manipulating blog posts.
 * Provides a fluent API for filtering, sorting and limiting posts.
 *
 * @example
 * // Get featured posts sorted alphabetically
 * const posts = new PostsManager(allPosts)
 *   .filter(PostQueries.FILTER.FEATURED)
 *   .sort(PostQueries.SORT.ALPHABETICAL)
 *   .get();
 */
export class PostsManager {
  /** The internal array of posts */
  private posts: CollectionEntry<'blog'>[];

  /**
   * Creates a new PostsManager instance
   * @param posts The collection of blog posts to manage
   */
  constructor(posts: CollectionEntry<'blog'>[]) {
    this.posts = posts;
  }

  /**
   * Filter posts based on criteria
   * @param filterOption The filter to apply - can be a string constant or a filter function
   * @returns A new PostsManager instance with filtered posts
   *
   * @example
   * // Filter to only featured posts
   * manager.filter('featured')
   *
   * @example
   * // Filter with a custom function
   * manager.filter(post => post.data.wordCount > 1000)
   */
  filter(filterOption: PostFilterOption = 'all'): this {
    if (filterOption === 'all') {
      return this;
    }

    let filteredPosts: CollectionEntry<'blog'>[];

    if (filterOption === 'featured') {
      filteredPosts = this.posts.filter(post => post.data.featured === true);
    } else if (typeof filterOption === 'function') {
      filteredPosts = this.posts.filter(filterOption);
    } else {
      filteredPosts = this.posts;
    }

    // Create a new instance of the same class
    const result = new PostsManager(filteredPosts) as this;
    return result;
  }

  /**
   * Filter posts by tag
   * @param tags Array of tags to filter by (posts matching ANY tag will be included)
   * @returns A new PostsManager instance with filtered posts
   *
   * @example
   * // Get posts with either javascript or typescript tags
   * manager.filterByTags(['javascript', 'typescript'])
   */
  filterByTags(tags: string[]): this {
    if (!tags || tags.length === 0) {
      return this;
    }

    const filteredPosts = this.posts.filter(post => {
      const postTags = post.data.tags || [];
      return tags.some(tag => postTags.includes(tag));
    });

    // Create a new instance of the same class
    const result = new PostsManager(filteredPosts) as this;
    return result;
  }

  /**
   * Sort posts by the specified criteria
   * @param sortBy The sort method to use
   * @returns A new PostsManager instance with sorted posts
   *
   * @example
   * // Sort posts alphabetically
   * manager.sort('title-asc')
   */
  sort(sortBy: SortOption = 'date-desc'): this {
    // Create a copy to avoid mutating the original array
    const sortedPosts = [...this.posts];

    switch (sortBy) {
      case 'date-desc': // Newest first (default)
        sortedPosts.sort((a, b) =>
          b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
        );
        break;

      case 'date-asc': // Oldest first
        sortedPosts.sort((a, b) =>
          a.data.pubDate.valueOf() - b.data.pubDate.valueOf()
        );
        break;

      case 'title-asc': // Alphabetical A-Z
        sortedPosts.sort((a, b) =>
          a.data.title.localeCompare(b.data.title)
        );
        break;

      case 'title-desc': // Alphabetical Z-A
        sortedPosts.sort((a, b) =>
          b.data.title.localeCompare(a.data.title)
        );
        break;

      case 'updated': // Recently updated first
        sortedPosts.sort((a, b) => {
          // Use updatedDate if available, otherwise fall back to pubDate
          const aDate = a.data.updatedDate || a.data.pubDate;
          const bDate = b.data.updatedDate || b.data.pubDate;
          return bDate.valueOf() - aDate.valueOf();
        });
        break;
    }

    // Create a new instance of the same class
    const result = new PostsManager(sortedPosts) as this;
    return result;
  }

  /**
   * Limit the number of posts
   * @param count Maximum number of posts to include
   * @returns A new PostsManager instance with limited posts
   *
   * @example
   * // Get only the first 5 posts
   * manager.limit(5)
   */
  limit(count: number): this {
    if (!count || count >= this.posts.length) {
      return this;
    }

    // Create a new instance of the same class
    const result = new PostsManager(this.posts.slice(0, count)) as this;
    return result;
  }

  /**
   * Get the final posts array
   * @returns Array of blog posts after all operations
   *
   * @example
   * const posts = manager.filter('featured').sort('title-asc').get();
   */
  get(): CollectionEntry<'blog'>[] {
    return this.posts;
  }

  /**
   * Convenience method to apply multiple operations in one call
   * @param options Query options including filter, sort, limit, and tags
   * @returns Array of blog posts after all operations
   *
   * @example
   * const posts = manager.query({
   *   filter: 'featured',
   *   sortBy: 'title-asc',
   *   limit: 5,
   *   tags: ['javascript']
   * });
   */
  query(options: PostQueryOptions = {}): CollectionEntry<'blog'>[] {
    let manager = this;

    if (options.filter) {
      manager = manager.filter(options.filter);
    }

    if (options.tags) {
      manager = manager.filterByTags(options.tags);
    }

    if (options.sortBy) {
      manager = manager.sort(options.sortBy);
    }

    if (options.limit) {
      manager = manager.limit(options.limit);
    }

    return manager.get();
  }

  /**
   * Static utility method to create and query posts in one step
   * @param posts The collection of blog posts to manage
   * @param options Query options including filter, sort, limit, and tags
   * @returns Array of blog posts after all operations
   *
   * @example
   * const posts = PostsManager.query(allPosts, {
   *   filter: 'featured',
   *   sortBy: 'title-asc',
   *   limit: 5
   * });
   */
  static query(
    posts: CollectionEntry<'blog'>[],
    options: PostQueryOptions = {}
  ): CollectionEntry<'blog'>[] {
    return new PostsManager(posts).query(options);
  }

  /**
   * Get the latest posts by publish date
   * @param posts The collection of blog posts
   * @param count Maximum number of posts to return (default: 3)
   * @returns Array of the most recent blog posts
   */
  static getLatest(posts: CollectionEntry<'blog'>[], count: number = 3): CollectionEntry<'blog'>[] {
    return PostsManager.query(posts, {
      sortBy: PostQueries.SORT.NEWEST_FIRST,
      limit: count
    });
  }

  /**
   * Get posts marked as featured
   * @param posts The collection of blog posts
   * @param count Optional maximum number of posts to return
   * @returns Array of featured blog posts
   */
  static getFeatured(posts: CollectionEntry<'blog'>[], count?: number): CollectionEntry<'blog'>[] {
    return PostsManager.query(posts, {
      filter: PostQueries.FILTER.FEATURED,
      sortBy: PostQueries.SORT.NEWEST_FIRST,
      limit: count
    });
  }

  /**
   * Get posts with a specific tag
   * @param posts The collection of blog posts
   * @param tag Tag to filter by
   * @param count Optional maximum number of posts to return
   * @returns Array of posts with the specified tag
   */
  static getByTag(posts: CollectionEntry<'blog'>[], tag: string, count?: number): CollectionEntry<'blog'>[] {
    return PostsManager.query(posts, {
      tags: [tag],
      sortBy: PostQueries.SORT.NEWEST_FIRST,
      limit: count
    });
  }

  /**
   * Get posts sorted by most recently updated
   * @param posts The collection of blog posts
   * @param count Maximum number of posts to return (default: 5)
   * @returns Array of most recently updated blog posts
   */
  static getRecentlyUpdated(posts: CollectionEntry<'blog'>[], count: number = 5): CollectionEntry<'blog'>[] {
    return PostsManager.query(posts, {
      sortBy: PostQueries.SORT.RECENTLY_UPDATED,
      limit: count
    });
  }
}