import { FC, useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

type ReadingProgressProps = {
  targetRef: React.RefObject<HTMLDivElement | null>;
};

export const ReadingProgress: FC<ReadingProgressProps> = ({ targetRef }) => {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!targetRef.current) return;

      const element = targetRef.current;
      const totalHeight = element.clientHeight - window.innerHeight;
      const windowScrollTop =
        window.scrollY || document.documentElement.scrollTop;

      if (windowScrollTop === 0) {
        setReadingProgress(0);
      } else if (windowScrollTop >= totalHeight) {
        setReadingProgress(100);
      } else {
        const percentScrolled = (windowScrollTop / totalHeight) * 100;
        setReadingProgress(percentScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [targetRef]);

  return (
    <Progress
      value={readingProgress}
      className="fixed top-0 left-0 w-full rounded-none z-50 h-1 [&>div]:bg-blue-500"
    />
  );
};
