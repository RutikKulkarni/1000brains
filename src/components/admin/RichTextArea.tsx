"use client";

import { Bold, Italic, Link as LinkIcon, CornerDownLeft, Eye } from "lucide-react";
import { useState } from "react";

interface RichTextAreaProps {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

export default function RichTextArea({
  id,
  label,
  value,
  onChange,
  placeholder = "",
  required = false,
  rows = 4,
}: RichTextAreaProps) {
  const [showPreview, setShowPreview] = useState(false);

  const insertTag = (tag: "b" | "i" | "br" | "a") => {
    const textarea = document.getElementById(id) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);

    let replacement = "";
    if (tag === "b") {
      replacement = `<b>${selected || "bold text"}</b>`;
    } else if (tag === "i") {
      replacement = `<i>${selected || "italic text"}</i>`;
    } else if (tag === "br") {
      replacement = "<br/>";
    } else if (tag === "a") {
      const url = prompt("Enter URL:", "https://");
      if (url === null) return; // Prompt cancelled
      replacement = `<a href="${url}" class="text-accent hover:underline">${selected || "link text"}</a>`;
    }

    const newValue = text.substring(0, start) + replacement + text.substring(end);
    onChange(newValue);

    // Set selection back to the textarea
    setTimeout(() => {
      textarea.focus();
      const newPos = start + replacement.length;
      textarea.setSelectionRange(newPos, newPos);
    }, 0);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="block text-xs font-semibold text-muted">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        
        {/* Formatting Toolbar */}
        <div className="flex items-center gap-1.5 bg-[var(--surface-alt)] border border-[var(--border)] rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => insertTag("b")}
            title="Bold"
            className="p-1 hover:bg-[var(--surface)] hover:text-accent rounded transition-colors text-muted cursor-pointer"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertTag("i")}
            title="Italic"
            className="p-1 hover:bg-[var(--surface)] hover:text-accent rounded transition-colors text-muted cursor-pointer"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertTag("br")}
            title="Line Break"
            className="p-1 hover:bg-[var(--surface)] hover:text-accent rounded transition-colors text-muted cursor-pointer"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertTag("a")}
            title="Insert Link"
            className="p-1 hover:bg-[var(--surface)] hover:text-accent rounded transition-colors text-muted cursor-pointer"
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </button>
          <div className="w-[1px] h-3 bg-[var(--border)] mx-0.5" />
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            title="Toggle Live Preview"
            className={`p-1 rounded transition-colors cursor-pointer flex items-center gap-1 text-[10px] font-mono px-1.5 ${
              showPreview 
                ? "bg-accent/10 text-accent font-semibold" 
                : "hover:bg-[var(--surface)] text-muted"
            }`}
          >
            <Eye className="w-3 h-3" />
            {showPreview ? "Previewing" : "Preview"}
          </button>
        </div>
      </div>

      <textarea
        id={id}
        required={required}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 resize-none font-body text-foreground"
      />

      {/* Live Preview Panel */}
      {showPreview && (
        <div className="p-3 rounded-xl border border-accent/20 bg-accent/2 max-h-40 overflow-y-auto mt-1">
          <span className="text-[10px] text-accent/75 font-mono uppercase tracking-wider block mb-1">Live HTML Rendering Preview</span>
          {value ? (
            <div 
              className="text-sm text-foreground/80 font-body leading-relaxed prose prose-sm dark:prose-invert break-words"
              dangerouslySetInnerHTML={{ __html: value }}
            />
          ) : (
            <span className="text-xs text-muted font-body italic">Type or format text to see preview...</span>
          )}
        </div>
      )}
    </div>
  );
}
