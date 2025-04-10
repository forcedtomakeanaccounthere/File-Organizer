"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, File, Folder, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sampleDocuments } from "@/lib/data";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const searchDocuments = useCallback((searchQuery) => {
    setIsLoading(true);
    const lowercaseQuery = searchQuery.toLowerCase();
    const filteredResults = sampleDocuments
      .filter(
        (doc) =>
          doc.name.toLowerCase().includes(lowercaseQuery) ||
          doc.folder.toLowerCase().includes(lowercaseQuery) ||
          doc.author.toLowerCase().includes(lowercaseQuery)
      )
      .slice(0, 5); // Limit to 5 results for better UI

    setResults(filteredResults);
    setIsLoading(false);
  }, []);

  const debouncedSearch = useCallback(debounce(searchDocuments, 300), []);

  useEffect(() => {
    if (query) {
      debouncedSearch(query);
    } else {
      setResults([]);
    }
  }, [query, debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClear = () => {
    setQuery("");
    setResults([]);
  };

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-20" />
        <Input
          type="text"
          placeholder="Search documents, folders, or authors..."
          className="pl-10 pr-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
        <AnimatePresence>
          {query && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20"
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5"
                onClick={handleClear}
              >
                <X className="h-3 w-3" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isFocused && (query || results.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 z-50 mt-1 rounded-md border bg-popover shadow-lg"
            style={{ maxHeight: "60vh", overflowY: "auto" }}
          >
            {isLoading ? (
              <div className="p-4 text-sm text-muted-foreground">
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary"></div>
                  <span>Searching...</span>
                </div>
              </div>
            ) : results.length > 0 ? (
              <ul className="py-2">
                {results.map((result) => (
                  <li key={result.id}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left hover:bg-muted"
                    >
                      <div className="flex items-center space-x-3 px-2 py-1">
                        {result.type === "folder" ? (
                          <Folder className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <File className="h-5 w-5 text-muted-foreground" />
                        )}
                        <div className="flex-grow">
                          <div className="font-medium truncate">
                            {result.name}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center space-x-2">
                            <span>{result.folder}</span>
                            <span>•</span>
                            <span className="flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              {result.author}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Button>
                  </li>
                ))}
              </ul>
            ) : query ? (
              <div className="p-4 text-sm text-muted-foreground text-center">
                No results found
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
