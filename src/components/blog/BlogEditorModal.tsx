"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  HiOutlineCheck,
  HiOutlineCode,
  HiOutlineLink,
  HiOutlinePencilAlt,
  HiOutlineRefresh,
  HiOutlineReply,
  HiOutlineSave,
  HiOutlineTable,
  HiOutlineX,
} from "react-icons/hi";
import { useAuth } from "@/components/AuthContext";
import type { BlogPost } from "@/lib/blogData";

function splitTags(tags: string) {
  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function BlogEditorModal({
  post,
  onClose,
}: {
  post: BlogPost;
  onClose: () => void;
}) {
  const router = useRouter();
  const { user } = useAuth();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [date, setDate] = useState(post.date);
  const [author, setAuthor] = useState(post.author);
  const [tags, setTags] = useState(post.tags.join(", "));
  const initialContent = post.content.trim();
  const [content, setContent] = useState(initialContent);
  const [history, setHistory] = useState([initialContent]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, []);

  function updateContent(next: string, saveHistory = true) {
    setContent(next);
    if (!saveHistory) return;

    setHistory((current) => {
      const trimmed = current.slice(0, historyIndex + 1);
      if (trimmed[trimmed.length - 1] === next) return current;
      const nextHistory = [...trimmed, next].slice(-80);
      setHistoryIndex(nextHistory.length - 1);
      return nextHistory;
    });
  }

  function undoContent() {
    setHistoryIndex((current) => {
      const nextIndex = Math.max(0, current - 1);
      setContent(history[nextIndex] ?? content);
      return nextIndex;
    });
  }

  function redoContent() {
    setHistoryIndex((current) => {
      const nextIndex = Math.min(history.length - 1, current + 1);
      setContent(history[nextIndex] ?? content);
      return nextIndex;
    });
  }

  function insertMarkdown(before: string, after = "", placeholder = "text") {
    const textarea = textareaRef.current;
    if (!textarea) {
      updateContent(`${content}\n${before}${placeholder}${after}`);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.slice(start, end) || placeholder;
    const next = `${content.slice(0, start)}${before}${selected}${after}${content.slice(end)}`;
    updateContent(next);

    window.requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  }

  async function handleSave() {
    setError("");
    setStatus("");
    setSaving(true);

    try {
      const token = await user?.getIdToken();
      if (!token) {
        setError("Please login as admin again.");
        return;
      }

      const response = await fetch(`/api/blog-posts/${post.slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          date,
          author,
          image: post.image,
          tags: splitTags(tags),
          content,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Failed to save blog post.");
        return;
      }

      setStatus("Saved. Refreshing article...");
      router.refresh();
      window.setTimeout(onClose, 700);
    } catch {
      setError("Network error while saving blog post.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[120] bg-[#071D2E]/55 p-0 backdrop-blur-sm sm:p-5"
      data-lenis-prevent
    >
      <div className="mx-auto flex h-[100dvh] max-w-7xl flex-col overflow-hidden rounded-none border border-[#DCE8F5] bg-white shadow-[0_34px_120px_rgba(7,29,46,0.28)] sm:h-[94vh] sm:rounded-[26px]">
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-[#DCE8F5] bg-[#F5FAFF] px-3 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1d9bf0]">Blog editor</p>
            <h2 className="mt-1 truncate font-heading text-lg font-semibold text-[#0c2847] sm:text-2xl">
              Edit article content
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setMode("write")}
              className={`inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold transition sm:gap-2 sm:px-4 ${
                mode === "write" ? "bg-[#0c2847] text-white" : "bg-white text-[#334155] hover:bg-[#EAF4FF]"
              }`}
            >
              <HiOutlinePencilAlt className="size-4" />
              <span className="hidden sm:inline">Write</span>
            </button>
            <button
              type="button"
              onClick={() => setMode("preview")}
              className={`inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold transition sm:gap-2 sm:px-4 ${
                mode === "preview" ? "bg-[#0c2847] text-white" : "bg-white text-[#334155] hover:bg-[#EAF4FF]"
              }`}
            >
              <HiOutlineCheck className="size-4" />
              <span className="hidden sm:inline">Preview</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex size-10 items-center justify-center rounded-full bg-white text-[#334155] transition hover:bg-red-50 hover:text-red-600"
              aria-label="Close editor"
            >
              <HiOutlineX className="size-5" />
            </button>
          </div>
        </header>

        <div className="grid min-h-0 flex-1 grid-rows-[minmax(170px,34dvh)_minmax(0,1fr)] lg:grid-cols-[360px_1fr] lg:grid-rows-1">
          <aside className="min-h-0 overflow-y-auto overscroll-contain border-b border-[#DCE8F5] bg-white p-4 sm:p-5 lg:border-b-0 lg:border-r">
            <div className="grid gap-4 sm:grid-cols-2 lg:block lg:space-y-4">
              <label className="block">
                <span className="text-sm font-semibold text-[#0F172A]">Title</span>
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="mt-1.5 h-11 w-full rounded-xl border border-[#DCE8F5] bg-[#F8FCFF] px-3 text-[15px] outline-none transition focus:border-[#1d9bf0] focus:ring-3 focus:ring-[#1d9bf0]/10"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[#0F172A]">Description</span>
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={4}
                  className="mt-1.5 w-full resize-none rounded-xl border border-[#DCE8F5] bg-[#F8FCFF] px-3 py-2.5 text-[15px] leading-6 outline-none transition focus:border-[#1d9bf0] focus:ring-3 focus:ring-[#1d9bf0]/10"
                />
              </label>
              <div className="grid gap-3">
                <label className="block">
                  <span className="text-sm font-semibold text-[#0F172A]">Date</span>
                  <input
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    type="date"
                    className="mt-1.5 h-11 w-full rounded-xl border border-[#DCE8F5] bg-[#F8FCFF] px-3 text-[15px] outline-none transition focus:border-[#1d9bf0] focus:ring-3 focus:ring-[#1d9bf0]/10"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-[#0F172A]">Author</span>
                  <input
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                    className="mt-1.5 h-11 w-full rounded-xl border border-[#DCE8F5] bg-[#F8FCFF] px-3 text-[15px] outline-none transition focus:border-[#1d9bf0] focus:ring-3 focus:ring-[#1d9bf0]/10"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-sm font-semibold text-[#0F172A]">Tags</span>
                <input
                  value={tags}
                  onChange={(event) => setTags(event.target.value)}
                  placeholder="German, Career, Chennai"
                  className="mt-1.5 h-11 w-full rounded-xl border border-[#DCE8F5] bg-[#F8FCFF] px-3 text-[15px] outline-none transition focus:border-[#1d9bf0] focus:ring-3 focus:ring-[#1d9bf0]/10"
                />
              </label>
            </div>
          </aside>

          <section className="flex min-h-0 flex-col">
            <div className="flex shrink-0 gap-2 overflow-x-auto overscroll-x-contain border-b border-[#DCE8F5] bg-[#F8FCFF] px-3 py-3 sm:flex-wrap sm:px-4">
              <button type="button" disabled={historyIndex === 0} onClick={undoContent} className="inline-flex min-h-10 shrink-0 items-center gap-1 rounded-full bg-white px-3 py-2 text-sm font-semibold text-[#334155] hover:bg-[#EAF4FF] disabled:cursor-not-allowed disabled:opacity-40" title="Undo Ctrl+Z"><HiOutlineReply className="size-4" />Undo</button>
              <button type="button" disabled={historyIndex >= history.length - 1} onClick={redoContent} className="inline-flex min-h-10 shrink-0 items-center gap-1 rounded-full bg-white px-3 py-2 text-sm font-semibold text-[#334155] hover:bg-[#EAF4FF] disabled:cursor-not-allowed disabled:opacity-40" title="Redo Ctrl+Y"><HiOutlineRefresh className="size-4" />Redo</button>
              <button type="button" onClick={() => insertMarkdown("# ", "", "Heading")} className="min-h-10 shrink-0 rounded-full bg-white px-3 py-2 text-sm font-semibold text-[#334155] hover:bg-[#EAF4FF]">H1</button>
              <button type="button" onClick={() => insertMarkdown("## ", "", "Section heading")} className="min-h-10 shrink-0 rounded-full bg-white px-3 py-2 text-sm font-semibold text-[#334155] hover:bg-[#EAF4FF]">H2</button>
              <button type="button" onClick={() => insertMarkdown("**", "**", "bold text")} className="min-h-10 shrink-0 rounded-full bg-white px-3 py-2 text-sm font-semibold text-[#334155] hover:bg-[#EAF4FF]">B</button>
              <button type="button" onClick={() => insertMarkdown("*", "*", "italic text")} className="min-h-10 shrink-0 rounded-full bg-white px-3 py-2 text-sm font-semibold text-[#334155] hover:bg-[#EAF4FF]">I</button>
              <button type="button" onClick={() => insertMarkdown("- ", "", "List item")} className="min-h-10 shrink-0 rounded-full bg-white px-3 py-2 text-sm font-semibold text-[#334155] hover:bg-[#EAF4FF]">List</button>
              <button type="button" onClick={() => insertMarkdown("> ", "", "Quote")} className="min-h-10 shrink-0 rounded-full bg-white px-3 py-2 text-sm font-semibold text-[#334155] hover:bg-[#EAF4FF]">Quote</button>
              <button type="button" onClick={() => insertMarkdown("[", "](https://example.com)", "link text")} className="inline-flex min-h-10 shrink-0 items-center gap-1 rounded-full bg-white px-3 py-2 text-sm font-semibold text-[#334155] hover:bg-[#EAF4FF]"><HiOutlineLink className="size-4" />Link</button>
              <button type="button" onClick={() => insertMarkdown("`", "`", "code")} className="inline-flex min-h-10 shrink-0 items-center gap-1 rounded-full bg-white px-3 py-2 text-sm font-semibold text-[#334155] hover:bg-[#EAF4FF]"><HiOutlineCode className="size-4" />Code</button>
              <button
                type="button"
                onClick={() => insertMarkdown("\n| Column | Column |\n| --- | --- |\n| ", " | Value |\n", "Value")}
                className="inline-flex min-h-10 shrink-0 items-center gap-1 rounded-full bg-white px-3 py-2 text-sm font-semibold text-[#334155] hover:bg-[#EAF4FF]"
              >
                <HiOutlineTable className="size-4" />
                Table
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              {mode === "write" ? (
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(event) => updateContent(event.target.value)}
                  onKeyDown={(event) => {
                    const isMod = event.ctrlKey || event.metaKey;
                    if (!isMod) return;
                    const key = event.key.toLowerCase();
                    if (key === "z" && !event.shiftKey) {
                      event.preventDefault();
                      undoContent();
                    }
                    if (key === "y" || (key === "z" && event.shiftKey)) {
                      event.preventDefault();
                      redoContent();
                    }
                  }}
                  spellCheck
                  className="min-h-full w-full resize-none bg-white px-4 py-5 font-mono text-[15px] leading-7 text-[#0F172A] outline-none sm:px-6"
                />
              ) : (
                <div className="prose-fl mx-auto max-w-3xl px-5 py-8">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                </div>
              )}
            </div>
          </section>
        </div>

        <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-[#DCE8F5] bg-white px-3 py-3 sm:px-6">
          <div className="min-w-0">
            {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
            {status && <p className="text-sm font-semibold text-emerald-600">{status}</p>}
            {!error && !status && (
              <p className="truncate text-xs text-[#536471] sm:text-sm">Markdown supported. Ctrl+Z undo, Ctrl+Y redo.</p>
            )}
          </div>
          <button
            type="button"
            disabled={saving}
            onClick={handleSave}
            className="blue-cta inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 sm:px-6"
          >
            <HiOutlineSave className="size-4" />
            {saving ? "Saving..." : "Save changes"}
          </button>
        </footer>
      </div>
    </div>
  );
}
