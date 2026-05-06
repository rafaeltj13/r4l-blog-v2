import { ref, type Ref } from "vue";

export interface UseDialogReturn {
  /** Template ref to bind to the underlying `<dialog>` element. */
  dialogRef: Ref<HTMLDialogElement | null>;
  /** Whether the dialog is currently open. Tracked manually since native
   *  dialogs don't expose a reactive `open` getter Vue can watch. */
  isOpen: Ref<boolean>;
  /** Open the dialog as a modal, blurring the previously focused element
   *  first so it doesn't steal focus once the dialog mounts its own. */
  open: () => void;
  /** Close the dialog if it's currently open. Safe to call when closed. */
  close: () => void;
}

/**
 * Thin wrapper around the native `<dialog>` element API.
 *
 * Standardizes the open/close lifecycle used by every modal in the app:
 *   - blurs `document.activeElement` before opening so the originating
 *     button (e.g. a "Generate" trigger) doesn't keep visible focus
 *     underneath the modal,
 *   - exposes `isOpen` as a reactive ref so templates can branch on it,
 *   - guards `close()` against being called on an already-closed dialog.
 *
 * @example
 *   const { dialogRef, open, close } = useDialog();
 *   defineExpose({ open, close });
 *   // template: <dialog ref="dialogRef">…</dialog>
 */
export function useDialog(): UseDialogReturn {
  const dialogRef = ref<HTMLDialogElement | null>(null);
  const isOpen = ref(false);

  function open() {
    const dialog = dialogRef.value;
    if (!dialog) return;
    if (dialog.open) {
      isOpen.value = true;
      return;
    }
    // Blur whatever triggered the open so the focus ring on a button
    // doesn't bleed through the backdrop.
    if (
      typeof document !== "undefined" &&
      document.activeElement instanceof HTMLElement
    ) {
      document.activeElement.blur();
    }
    dialog.showModal();
    isOpen.value = true;
  }

  function close() {
    const dialog = dialogRef.value;
    if (!dialog) {
      isOpen.value = false;
      return;
    }
    if (dialog.open) {
      dialog.close();
    }
    isOpen.value = false;
  }

  return { dialogRef, isOpen, open, close };
}
