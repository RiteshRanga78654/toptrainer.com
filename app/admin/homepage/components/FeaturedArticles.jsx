import React from "react";
import { Search } from "lucide-react";
import { Card } from "../../../components/ui/index.js";
import { cn } from "../../../lib/api.js";

export default function FeaturedArticles({
  articleTabs,
  featuredArticles,
  articleSearchQuery,
  articleSearchResults,
  activeArticleTab,
  isSearchingArticle,
  articleSearchCurrentPage,
  articleSearchTotalPages,
  setActiveArticleTab,
  setArticleSearchQuery,
  handleArticleSearch,
  toggleFeaturedArticle,
}) {
  return (
    <Card>
      <div className="flex items-center justify-between px-5 py-4 border-b">
        <div>
          <p className="text-sm font-semibold">Featured Articles</p>
          <p className="text-xs text-slate-500">
            Select articles to feature on the homepage
          </p>
        </div>
        <span className="text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full font-medium">
          {featuredArticles.length} total featured
        </span>
      </div>

      <div className="p-5">
        {/* Creator Tabs */}
        <div className="flex flex-wrap gap-2 mb-5 border-b border-slate-100 pb-4">
          {articleTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveArticleTab(tab.key);
                handleArticleSearch(1); // Trigger search when tab changes
              }}
              className={cn(
                "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border",
                activeArticleTab === tab.key
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* featured article list */}

        {featuredArticles.length > 0 && (
          <div className="border border-slate-200 rounded-xl overflow-hidden mt-4">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-center w-24">
                    Featured
                  </th>
                </tr>
              </thead>
              <tbody>
                {featuredArticles.map((article) => {
                  const isFeatured = featuredArticles.some(item => item?._id===article._id);
                  return (
                    <tr
                      key={article._id}
                      className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <p className="text-xs font-semibold text-slate-900 line-clamp-1">
                          {article.title}
                        </p>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {article.shortDescription}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-xs text-slate-700">
                          {article.author || "—"}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                          {article.category || "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={isFeatured}
                          onChange={() => toggleFeaturedArticle(article._id)}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}


        {/* Search Bar */}
        <div className="pt-2 border-slate-100">
          <p className="text-xs font-semibold text-slate-600 mb-2">
            Search Articles
          </p>
          <div className="flex gap-2 mb-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search articles by title..."
                value={articleSearchQuery}
                onChange={(e) => setArticleSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleArticleSearch(1)}
                className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-slate-50/50"
              />
            </div>
            <button
              onClick={() => handleArticleSearch(1)}
              disabled={isSearchingArticle || !articleSearchQuery.trim()}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-semibold transition-colors",
                isSearchingArticle || !articleSearchQuery.trim()
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              )}
            >
              <Search size={14} className="inline-block mr-1.5 -mt-0.5" />
              Search
            </button>
          </div>

          {/* Search Results Table */}

          {articleSearchResults.length > 0 && (
            <div className="border border-slate-200 rounded-xl overflow-hidden mt-4">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-center w-24">
                      Featured
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {articleSearchResults.map((article) => {
                    const isFeatured = featuredArticles.some(item => item?._id===article._id);
                    return (
                      <tr
                        key={article._id}
                        className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <p className="text-xs font-semibold text-slate-900 line-clamp-1">
                            {article.title}
                          </p>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                            {article.shortDescription}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-xs text-slate-700">
                            {article.author || "—"}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                            {article.category || "—"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="checkbox"
                            checked={isFeatured}
                            onChange={() => toggleFeaturedArticle(article._id)}
                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Empty State */}
          {!isSearchingArticle && articleSearchQuery.trim() !== "" && articleSearchResults.length === 0 && (
            <div className="text-center py-8 border border-slate-100 rounded-xl bg-slate-50/50 mt-4">
              <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-600">
                No articles found
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Try a different search term
              </p>
            </div>
          )}
          
          {/* Default Load State */}
          {!isSearchingArticle && articleSearchQuery.trim() === "" && articleSearchResults.length === 0 && (
             <div className="text-center py-8 border border-slate-100 rounded-xl bg-slate-50/50 mt-4">
               <p className="text-sm font-semibold text-slate-600">
                 Search for an article to begin
               </p>
             </div>
          )}

          {/* Pagination Controls */}
          {articleSearchTotalPages > 0 && articleSearchResults.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => handleArticleSearch(articleSearchCurrentPage - 1)}
                disabled={articleSearchCurrentPage === 1 || isSearchingArticle}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <span className="text-xs font-medium text-slate-500">
                Page {articleSearchCurrentPage} of {articleSearchTotalPages}
              </span>
              <button
                onClick={() => handleArticleSearch(articleSearchCurrentPage + 1)}
                disabled={
                  articleSearchCurrentPage === articleSearchTotalPages ||
                  isSearchingArticle
                }
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
