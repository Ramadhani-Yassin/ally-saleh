/**
 * Copy text with Clipboard API, falling back to execCommand for older / non-secure contexts.
 */
export async function copyTextRobust(text: string): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* try fallback */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    ta.style.top = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

function isAbortError(e: unknown): boolean {
  return (
    typeof e === "object" &&
    e !== null &&
    "name" in e &&
    (e as { name: string }).name === "AbortError"
  );
}

/**
 * Uses Web Share API when available; otherwise copies the URL to the clipboard.
 * Shows clear feedback via alert / prompt so the action always has a visible outcome.
 */
export async function shareOrCopyLink(title: string, url: string): Promise<void> {
  const text = `${title}\n${url}`;

  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    const tryShare = async (data: ShareData) => {
      await navigator.share(data);
    };

    try {
      const withUrl: ShareData = { title, text, url };
      if (!navigator.canShare || navigator.canShare(withUrl)) {
        await tryShare(withUrl);
        return;
      }
    } catch (e) {
      if (isAbortError(e)) return;
    }

    try {
      await tryShare({ title, text });
      return;
    } catch (e) {
      if (isAbortError(e)) return;
    }
  }

  const copied = await copyTextRobust(url);
  if (copied) {
    window.alert(`Link copied — you can paste it anywhere:\n\n${url}`);
    return;
  }

  window.prompt(`Copy this link for “${title}”:`, url);
}
