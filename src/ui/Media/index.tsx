import { cva, type VariantProps } from "class-variance-authority";
import { Pause, Play } from "lucide-react";
import * as React from "react";

import { cn } from "@/utils";
import IconButton from "@/ui/IconButton";

export interface MediaProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof mediaVariants> {
  src: string;
  alt?: string;
  type?: "image" | "video";
  aspectRatio?: "1:1" | "16:9" | "9:16" | "4:3" | "3:4";
  showPlayButton?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  isPlaying?: boolean;
  loading?: "lazy" | "eager";
  objectFit?: "cover" | "contain" | "fill" | "scale-down" | "none";
}

const mediaVariants = cva(
  "relative overflow-hidden bg-gray-100 dark:bg-gray-800",
  {
    variants: {
      aspectRatio: {
        "1:1": "aspect-square",
        "16:9": "aspect-video",
        "9:16": "aspect-[9/16]",
        "4:3": "aspect-[4/3]",
        "3:4": "aspect-[3/4]",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      aspectRatio: "16:9",
      rounded: "md",
    },
  },
);

const Media = React.forwardRef<HTMLDivElement, MediaProps>(
  (
    {
      className,
      src,
      alt = "",
      type = "image",
      aspectRatio,
      showPlayButton = true,
      onPlay,
      onPause,
      isPlaying = false,
      loading = "lazy",
      objectFit = "cover",
      rounded,
      ...props
    },
    ref,
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [imageError, setImageError] = React.useState(false);
    const [videoPlaying, setVideoPlaying] = React.useState(false);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    const handlePlay = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (videoRef.current) {
        videoRef.current.play();
        setVideoPlaying(true);
      }
      if (onPlay) {
        onPlay();
      }
    };

    const handlePause = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (videoRef.current) {
        videoRef.current.pause();
        setVideoPlaying(false);
      }
      if (onPause) {
        onPause();
      }
    };

    const handleVideoPlay = () => {
      setVideoPlaying(true);
      if (onPlay) {
        onPlay();
      }
    };

    const handleVideoPause = () => {
      setVideoPlaying(false);
      if (onPause) {
        onPause();
      }
    };

    // Sync external isPlaying prop with internal state
    React.useEffect(() => {
      if (type === "video" && videoRef.current) {
        if (isPlaying && videoRef.current.paused) {
          videoRef.current.play();
        } else if (!isPlaying && !videoRef.current.paused) {
          videoRef.current.pause();
        }
      }
    }, [isPlaying, type]);

    const handleImageLoad = () => {
      setImageLoaded(true);
    };

    const handleImageError = () => {
      setImageError(true);
    };

    return (
      <div
        ref={ref}
        className={cn(mediaVariants({ aspectRatio, rounded }), className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {type === "image" ? (
          <>
            <img
              src={src}
              alt={alt}
              loading={loading}
              onLoad={handleImageLoad}
              onError={handleImageError}
              className={cn(
                "block h-full w-full transition-opacity duration-300",
                {
                  "opacity-0": !imageLoaded && !imageError,
                  "opacity-100": imageLoaded,
                },
              )}
              style={{ objectFit }}
            />
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
              </div>
            )}
            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <div className="text-center text-gray-500">
                  <div className="text-2xl">📷</div>
                  <div className="text-sm">Failed to load</div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <video
              ref={videoRef}
              src={src}
              className="block h-full w-full"
              style={{ objectFit }}
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
              onEnded={() => setVideoPlaying(false)}
              preload="metadata"
            />
            {showPlayButton && (
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center bg-black/20 transition-all duration-200 hover:bg-black/30",
                  {
                    "opacity-100": isHovered || videoPlaying,
                    "opacity-0": !isHovered && !videoPlaying,
                  },
                )}
              >
                <IconButton
                  icon={
                    videoPlaying ? (
                      <Pause className="text-gray-900" />
                    ) : (
                      <Play className="ml-1 text-gray-900" />
                    )
                  }
                  onClick={videoPlaying ? handlePause : handlePlay}
                  varient="outline"
                  size="md"
                  rounded={true}
                  aria-label={videoPlaying ? "Pause video" : "Play video"}
                  className="!h-16 !w-16 !bg-white !shadow-lg transition-all duration-200 hover:!scale-110 hover:!shadow-xl"
                />
              </div>
            )}
          </>
        )}
      </div>
    );
  },
);

Media.displayName = "Media";

export { Media, mediaVariants };
