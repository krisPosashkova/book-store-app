import { useEffect, useCallback } from "react";

export function useInfiniteScroll(
    onLoadMore: () => void,
    containerRef: React.RefObject<HTMLElement>
) {
    const handleScroll = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        const { scrollTop, scrollHeight, clientHeight } = container;
        if (scrollHeight - scrollTop - clientHeight < scrollHeight * 0.05) {
            onLoadMore();
        }
    }, [onLoadMore, containerRef]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener("scroll", handleScroll);

        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll, containerRef]);
}
