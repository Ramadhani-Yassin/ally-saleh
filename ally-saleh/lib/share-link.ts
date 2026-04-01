import { showArchiveModal } from "@/lib/archive-modal";

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

function toAbsoluteHref(href: string): string {
  if (typeof window === "undefined") return href;
  if (/^https?:\/\//i.test(href)) return href;
  try {
    return new URL(href, window.location.origin).href;
  } catch {
    return href;
  }
}

/** Optional copy for the in-app modal (replaces `window.alert` / `window.prompt`). */
export type ShareLinkModalLabels = {
  copiedTitle: string;
  copiedBody: string;
  manualTitle: string;
  manualBody: string;
  okLabel: string;
  copyLabel: string;
};

const defaultModalLabels: ShareLinkModalLabels = {
  copiedTitle: "Link copied",
  copiedBody:
    "The address is on your clipboard. You can paste it into a message or document.",
  manualTitle: "Copy this link",
  manualBody:
    "Automatic copy did not work. Select the link below or use the Copy button, then paste where you need it.",
  okLabel: "OK",
  copyLabel: "Copy link",
};

/**
 * Uses Web Share API when available; otherwise copies the URL to the clipboard.
 * Uses the archive modal when registered (centered, styled); falls back to `alert` / `prompt`.
 */
export async function shareOrCopyLink(
  title: string,
  url: string,
  labels?: Partial<ShareLinkModalLabels>
): Promise<void> {
  const L = { ...defaultModalLabels, ...labels };
  const absUrl = toAbsoluteHref(url);
  const text = `${title}\n${absUrl}`;

  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    const tryShare = async (data: ShareData) => {
      await navigator.share(data);
    };

    try {
      const withUrl: ShareData = { title, text, url: absUrl };
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

  const copied = await copyTextRobust(absUrl);
  if (copied) {
    await showArchiveModal({
      title: L.copiedTitle,
      body: L.copiedBody,
      okLabel: L.okLabel,
      copyLabel: L.copyLabel,
      copySuccess: true,
      /** Visible time before powder fade-out (exit adds ~0.42s). */
      autoDismissMs: 400,
    });
    return;
  }

  await showArchiveModal({
    title: L.manualTitle,
    body: L.manualBody,
    url: absUrl,
    okLabel: L.okLabel,
    copyLabel: L.copyLabel,
  });
}
