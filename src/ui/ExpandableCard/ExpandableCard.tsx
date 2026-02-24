import type { ReactNode } from "react";
import { MagickoMaximize4 } from "magick-icons";
import { WrapperCard } from "@/ui/WrapperCard";
import IconButton from "@/ui/IconButton";
import { useExpandableCard } from "@/hooks/useExpandableCard";

interface ExpandableCardProps {
  children: ReactNode;
  collapsedWidth?: string;
  collapsedHeight?: string;
  expandedWidth?: string;
  expandedHeight?: string;
  expandedTop?: string;
  expandedLeft?: string;
  expandedRight?: string;
  expandedBottom?: string;
  hideChatOnExpand?: boolean;
  scrollContainerId?: string;
  wrapperClassName?: string;
  showToggleButton?: boolean;
}

export const ExpandableCard = ({
  children,
  collapsedWidth = "468px",
  collapsedHeight = "450px",
  expandedWidth = "920px",
  expandedHeight = "500px",
  expandedTop = "20px",
  expandedLeft,
  expandedRight,
  expandedBottom,
  hideChatOnExpand = true,
  scrollContainerId,
  wrapperClassName = "",
  showToggleButton = true,
}: ExpandableCardProps) => {
  const { absoluteExpandCardRef, expandCardRef, backdropRef, toggle } = useExpandableCard({
    collapsedWidth,
    collapsedHeight,
    expandedWidth,
    expandedHeight,
    expandedTop,
    expandedLeft,
    expandedRight,
    expandedBottom,
    hideChatOnExpand,
    scrollContainerId,
  });

  return (
    <>
      {/* Backdrop overlay - blocks interaction with background */}
      <div
        ref={backdropRef}
        className="hidden fixed inset-0 bg-black/20 transition-opacity duration-300 z-40"
        style={{ opacity: 0 }}
        onClick={toggle}
      />

      {/* Absolute positioned card (for expanded state) */}
      <div
        ref={absoluteExpandCardRef}
        className="space-y-4 hidden transition-all duration-300 z-50"
        style={{ width: collapsedWidth, height: collapsedHeight }}
      >
        <WrapperCard className={`h-full ${wrapperClassName}`}>
          <div>
            {showToggleButton && (
              <div className="flex items-center justify-end mb-2">
                <IconButton
                  varient="ghost"
                  icon={<MagickoMaximize4 />}
                  onClick={toggle}
                />
              </div>
            )}
            {children}
          </div>
        </WrapperCard>
      </div>

      {/* Normal positioned card (for collapsed state) */}
      <div
        className="space-y-4"
        ref={expandCardRef}
        style={{ width: collapsedWidth, height: collapsedHeight }}
      >
        <WrapperCard className={`h-full ${wrapperClassName}`}>
          <div>
            {showToggleButton && (
              <div className="flex items-center justify-end mb-2">
                <IconButton
                  varient="ghost"
                  icon={<MagickoMaximize4 />}
                  onClick={toggle}
                />
              </div>
            )}
            {children}
          </div>
        </WrapperCard>
      </div>
    </>
  );
};
