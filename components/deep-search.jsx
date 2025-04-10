"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { searchDocuments } from "@/lib/data";

export function DeepSearch() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = { type: "user", content: query };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://intelligent-document-management-production.up.railway.app/deepsearch",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: query }),
        }
      );
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to fetch deep search results");
      }

      // Expecting response as a plain text string
      const result = await response.json();

      const aiResponse = {
        type: "ai",
        content: result?.results,
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      setMessages((prev) => [...prev, { type: "ai", content: error.message }]);
    } finally {
      setIsLoading(false);
    }

    setQuery("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <Card className="flex-grow overflow-hidden flex flex-col">
        <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${
                    message.type === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary"
                    }`}
                  >
                    {message.type === "user" ? (
                      <User className="h-6 w-6" />
                    ) : (
                      <Bot className="h-6 w-6" />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary"
                    }`}
                  >
                    <p>{message.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-secondary p-3 rounded-lg">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <form onSubmit={handleSubmit} className="mt-4 flex space-x-2">
        <Input
          type="text"
          placeholder="Ask about your documents..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit" disabled={isLoading}>
          <Send className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  );
}
