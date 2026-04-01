export type ArchiveModalPayload = {
  title: string;
  body: string;
  /** When set, shown in a read-only field with optional copy control. */
  url?: string;
  /** Label for the dismiss button (e.g. OK / Sawa). */
  okLabel: string;
  /** Label for secondary copy action when `url` is present. */
  copyLabel: string;
  /**
   * Clipboard success: green check toast that auto-dismisses (no URL row / OK).
   */
  copySuccess?: boolean;
  /** Fully visible time before powder fade-out begins (ms). Default 400. */
  autoDismissMs?: number;
};

type ModalHandler = (payload: ArchiveModalPayload) => Promise<void>;

let handler: ModalHandler | null = null;

export function registerArchiveModalHandler(h: ModalHandler | null) {
  handler = h;
}

export async function showArchiveModal(payload: ArchiveModalPayload): Promise<void> {
  if (handler) {
    return handler(payload);
  }
  if (typeof window !== "undefined") {
    window.alert([payload.title, payload.body, payload.url].filter(Boolean).join("\n\n"));
  }
}
