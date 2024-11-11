import React, { useState, useMemo, ReactElement } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Image } from 'astro:assets';

interface SearchResult {
  slug: string;
  title: string;
  content: string;
  date: Date;
  image: string;
}

interface SearchComponentProps {
  searchData: SearchResult[];
}

export default function SearchComponent({ searchData }: SearchComponentProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    
    const query = searchQuery.toLowerCase();
    return searchData.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(query);
      const contentMatch = item.content.toLowerCase().includes(query);
      return titleMatch || contentMatch;
    }).map(result => ({
      ...result,
      preview: getPreviewText(result.content, query),
    }));
  }, [searchQuery, searchData]);

  function getPreviewText(content: string, query: string): string {
    const index = content.toLowerCase().indexOf(query);
    if (index === -1) return content.slice(0, 150) + '...';
    
    const start = Math.max(0, index - 50);
    const end = Math.min(content.length, index + 100);
    return (start > 0 ? '...' : '') + content.slice(start, end) + (end < content.length ? '...' : '');
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600 w-5 h-5" />
        <input
          type="search"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {searchQuery && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Found {searchResults.length} results for "{searchQuery}"
          </p>
          
          {searchResults.map((result: SearchResult) => (
            <a
              key={result.slug}
              href={`/blog/${result.slug}`}
              className="block p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div className="flex gap-4">
                <Image
                  src={result.image}
                  alt=""
                  width={100}
                  height={100}
                  class="rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{result.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {result.preview}
                  </p>
                  <time className="text-sm text-gray-500 dark:text-gray-500">
                    {new Date(result.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}