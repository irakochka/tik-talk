import type { Directive } from "vue";

type DndEl = HTMLElement & {
    __dndHandlers?: {
        onDragOver: (e: DragEvent) => void;
        onDragLeave: (e: DragEvent) => void;
        onDrop: (e: DragEvent) => void;
    };
};

export const vDnd: Directive<HTMLElement, (file: File | undefined) => void> = {
    mounted(el: DndEl, binding) {
        const setOver = (isOver: boolean) => el.classList.toggle("fileover", isOver);

        const onDragOver = (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setOver(true);
        };

        const onDragLeave = (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setOver(false);
        };

        const onDrop = (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setOver(false);

            const file = e.dataTransfer?.files?.[0];
            binding.value?.(file);
        };

        el.addEventListener("dragover", onDragOver);
        el.addEventListener("dragleave", onDragLeave);
        el.addEventListener("drop", onDrop);

        el.__dndHandlers = { onDragOver, onDragLeave, onDrop };
    },

    unmounted(el: DndEl) {
        const h = el.__dndHandlers;
        if (!h) return;

        el.removeEventListener("dragover", h.onDragOver);
        el.removeEventListener("dragleave", h.onDragLeave);
        el.removeEventListener("drop", h.onDrop);

        delete el.__dndHandlers;
    },
};