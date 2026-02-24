import { MagickoImportCircle01 } from "magick-icons";
import { useEffect, useRef, useState } from "react";
import { ProgressIndicator } from "@/shared/components/common";
import IconContainer from "@/ui/IconContainer";

const PROGRESS_CAP = 99;
const DURATION_MS = 4000;

/** Ease-out cubic: fast start, slow toward the end */
function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

export default function GeneralLoading({
  title,
  description,
  icon,
  duration = DURATION_MS,
}: {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  duration?: number;
}) {
  const tempDuration = duration;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const tick = () => {
      const elapsed = performance.now() - start;
      const t = Math.min(elapsed / tempDuration, 1);
      setProgress(Math.round(easeOutCubic(t) * PROGRESS_CAP));
      if (t < 1) requestAnimationFrame(tick);
    };
    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="glass-effect absolute inset-0 z-30 grid h-full w-full">
      <div className="gap-y-unit-24px m-auto flex flex-col items-center">
        <IconContainer size="4xl">
          {icon || <MagickoImportCircle01 className="size-[64px]" />}
        </IconContainer>
        <div className="flex flex-col items-center gap-y-unit-8px">
          <h6 className="text-h6  text-center relative animate-pulse leading-h6 text-element-inverse-default font-bold">
            {title || "Importing data"}
          </h6>
          <p className="text-element-inverse-gray max-w-[50ch] text-body-sm leading-body-sm text-center font-medium">
            {description ||
              "Please wait a moment. If you close this step, all ongoing import processes will be stopped."}
          </p>
        </div>
        <div className="mx-auto w-full max-w-[200px] space-y-1">
          <ProgressIndicator variant="bar" value={progress} />
        </div>
      </div>
    </div>
  );
}
