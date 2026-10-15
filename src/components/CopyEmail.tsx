import React, { useState } from "react";

// mailto only works when the visitor has a mail app set up, so offer a copy too.
const CopyEmail = ({ email }: { email: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked: the address is still on screen to select by hand
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="text-sm text-muted hover:text-ink border border-line hover:border-ink/40 rounded px-3 py-1.5 transition-colors"
      aria-live="polite"
    >
      {copied ? "Copied" : "Copy address"}
    </button>
  );
};

export default CopyEmail;
