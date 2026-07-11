"use client";

import type { ComponentType, MouseEvent } from "react";
import { useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useAuth } from "@/components/AuthContext";
import type { BlogPost } from "@/lib/blogData";

type BlogEditorModalComponent = ComponentType<{
  post: BlogPost;
  onClose: () => void;
}>;

export function BlogAdminEditButton({
  post,
  compact = false,
}: {
  post: BlogPost;
  compact?: boolean;
}) {
  const { isAdmin, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const [EditorModal, setEditorModal] = useState<BlogEditorModalComponent | null>(null);

  if (loading || !isAdmin) return null;

  async function openEditor(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (!EditorModal) {
      const mod = await import("@/components/blog/BlogEditorModal");
      setEditorModal(() => mod.BlogEditorModal);
    }

    setOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={openEditor}
        className={
          compact
            ? "inline-flex min-h-10 items-center gap-2 rounded-full border border-[#0c2847]/15 bg-white px-4 text-sm font-semibold text-[#0c2847] shadow-[0_10px_30px_rgba(12,40,71,0.08)] transition hover:bg-[#EAF4FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1d9bf0]"
            : "absolute right-4 top-4 z-20 flex size-11 items-center justify-center rounded-full border border-white/35 bg-white/92 text-[#0c2847] shadow-[0_12px_34px_rgba(12,40,71,0.22)] backdrop-blur transition hover:scale-105 hover:bg-[#EAF4FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1d9bf0]"
        }
        aria-label={`Edit ${post.title}`}
        title={`Edit ${post.title}`}
      >
        <HiOutlinePencilAlt className="size-5" />
        {compact && <span>Edit article</span>}
      </button>

      {open && EditorModal && (
        <EditorModal
          post={post}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
