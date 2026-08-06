import YoutubeVideo from "../models/youtubeVideo.js";
import asyncHandler from "../middleware/asyncMiddlewire.js";

const ALLOWED_SCOPE = ["home", "entity"];
const ALLOWED_ENTITY_TYPES = ["Industry", "Department", "Competency"];

const extractYoutubeVideoId = (url = "") => {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))([^"&?/\s]{11})/
  );
  return match ? match[1] : null;
};

// @desc    Add a new YouTube video
// @route   POST /api/youtube-videos
// @access  Admin
export const addVideo = asyncHandler(async (req, res) => {
  const { url, scope = "home", entityType = null, entityId = null } = req.body;

  if (!url) {
    return res.status(400).json({
      success: false,
      message: "URL is required",
    });
  }

  if (!ALLOWED_SCOPE.includes(scope)) {
    return res.status(400).json({
      success: false,
      message: "Invalid scope. Allowed values: home, entity",
    });
  }

  if (scope === "entity") {
    if (!entityType || !ALLOWED_ENTITY_TYPES.includes(entityType)) {
      return res.status(400).json({
        success: false,
        message: "Valid entityType is required for entity scope",
      });
    }

    if (!entityId) {
      return res.status(400).json({
        success: false,
        message: "entityId is required for entity scope",
      });
    }
  }

  const videoId = extractYoutubeVideoId(url);

  if (!videoId) {
    return res.status(400).json({
      success: false,
      message: "Invalid YouTube URL",
    });
  }

  const duplicateFilter =
    scope === "home"
      ? { videoId, scope: "home" }
      : { videoId, scope: "entity", entityType, entityId };

  const existing = await YoutubeVideo.findOne(duplicateFilter);

  if (existing) {
    return res.status(400).json({
      success: false,
      message:
        scope === "home"
          ? "Video already exists on homepage"
          : `Video already exists for this ${entityType?.toLowerCase()}`,
    });
  }

  let title = "YouTube Video";

  try {
    const oembedResponse = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    );

    if (oembedResponse.ok) {
      const data = await oembedResponse.json();
      title = data.title || title;
    }
  } catch (error) {
    console.error("Failed to fetch YouTube title via oEmbed:", error.message);
  }

  const video = await YoutubeVideo.create({
    videoId,
    title,
    url,
    thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    scope,
    entityType: scope === "entity" ? entityType : null,
    entityId: scope === "entity" ? entityId : null,
  });

  res.status(201).json({
    success: true,
    message: "Video added successfully",
    data: video,
  });
});

// @desc    Get YouTube videos
// @route   GET /api/youtube-videos
// @access  Public / Admin
export const getVideos = asyncHandler(async (req, res) => {
  const { scope, entityType, entityId, limit } = req.query;

  const filter = {};

  if (scope) {
    if (!ALLOWED_SCOPE.includes(scope)) {
      return res.status(400).json({
        success: false,
        message: "Invalid scope filter",
      });
    }
    filter.scope = scope;
  }

  if (entityType) {
    if (!ALLOWED_ENTITY_TYPES.includes(entityType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid entityType filter",
      });
    }
    filter.entityType = entityType;
  }

  if (entityId) {
    filter.entityId = entityId;
  }

  const parsedLimit = Number(limit) || 8;

  const videos = await YoutubeVideo.find(filter)
    .sort({ createdAt: -1 })
    .limit(parsedLimit);

  res.status(200).json({
    success: true,
    count: videos.length,
    data: videos,
  });
});

// @desc    Delete a YouTube video
// @route   DELETE /api/youtube-videos/:id
// @access  Admin
export const deleteVideo = asyncHandler(async (req, res) => {
  const video = await YoutubeVideo.findById(req.params.id);

  if (!video) {
    return res.status(404).json({
      success: false,
      message: "Video not found",
    });
  }

  await video.deleteOne();

  res.status(200).json({
    success: true,
    message: "Video deleted successfully",
    data: {},
  });
});