import React from "react";
import { Youtube, Trash2 } from "lucide-react";
import { Card, Button, Input } from "../../../components/ui";

function extractYoutubeId(video = {}) {
  if (video?.videoId) return video.videoId;

  const url = video?.url || "";
  if (!url) return "";

  const regExp =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^&?/]+)/;
  const match = url.match(regExp);
  return match?.[1] || "";
}

export default function YoutubeSection({
  youtubeUrl,
  setYoutubeUrl,
  youtubeVideos = [],
  isAddingYoutube,
  addYoutubeVideo,
  deleteYoutubeVideo,
  title = "YouTube Videos",
  subtitle = "Manage the latest 8 videos displayed on the homepage carousel",
}) {
  return (
    <Card>
      <div className="flex items-center justify-between px-5 py-4 border-b">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
            <Youtube size={14} className="text-red-600" />
          </div>
          <div>
            <p className="text-sm font-semibold">{title}</p>
            <p className="text-xs text-slate-500">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex gap-2 mb-6">
          <Input
            placeholder="Paste YouTube URL here..."
            value={youtubeUrl}
            onChange={(val) => setYoutubeUrl(val)}
            className="flex-1"
          />
          <Button
            onClick={addYoutubeVideo}
            disabled={isAddingYoutube || !youtubeUrl?.trim()}
          >
            {isAddingYoutube ? "Adding..." : "Add Video"}
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {youtubeVideos.map((video) => {
            const videoId = extractYoutubeId(video);
            const imageSrc =
              video?.thumbnail ||
              (videoId
                ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
                : "");
            const videoTitle = video?.title || "Untitled Video";

            return (
              <div
                key={video?._id || videoId}
                className="relative group rounded-xl border border-slate-200 overflow-hidden bg-white"
              >
                <button
                  onClick={() => deleteYoutubeVideo(video._id)}
                  className="absolute top-2 right-2 w-7 h-7 bg-white/90 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-50"
                  title="Delete Video"
                >
                  <Trash2 size={14} />
                </button>

                <div className="relative aspect-video bg-slate-100">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={videoTitle}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                      Thumbnail unavailable
                    </div>
                  )}
                </div>

                <div className="p-3">
                  <p
                    className="text-xs font-semibold text-slate-900 line-clamp-2"
                    title={videoTitle}
                  >
                    {videoTitle}
                  </p>
                </div>
              </div>
            );
          })}

          {youtubeVideos.length === 0 && (
            <p className="text-sm text-slate-500 col-span-full py-4 text-center border border-dashed rounded-xl">
              No YouTube videos added yet.
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}