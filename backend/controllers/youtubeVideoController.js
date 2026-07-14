import YoutubeVideo from "../models/youtubeVideo.js";
import asyncHandler from "../middleware/asyncMiddlewire.js";

// @desc    Add a new YouTube video
// @route   POST /api/youtube-videos
// @access  Admin
export const addVideo = asyncHandler(async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ success: false, message: "URL is required" });
  }

  // Extract video ID from common YouTube URL formats
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  const videoId = match ? match[1] : null;

  if (!videoId) {
    return res.status(400).json({ success: false, message: "Invalid YouTube URL" });
  }

  // Check if it already exists
  const existing = await YoutubeVideo.findOne({ videoId });
  if (existing) {
    return res.status(400).json({ success: false, message: "Video already exists" });
  }

  let title = "YouTube Video";
  
  // Try to fetch title using YouTube oEmbed (No API key required)
  try {
    const oembedResponse = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
    if (oembedResponse.ok) {
      const data = await oembedResponse.json();
      title = data.title;
    }
  } catch (error) {
    console.error("Failed to fetch YouTube title via oEmbed:", error.message);
    // Fallback to default title
  }

  const video = await YoutubeVideo.create({
    videoId,
    title,
    url
  });

  res.status(201).json({
    success: true,
    data: video,
  });
});

// @desc    Get top 8 latest YouTube videos
// @route   GET /api/youtube-videos
// @access  Public / Admin
export const getVideos = asyncHandler(async (req, res) => {
  // Fetch latest 8 videos
  const videos = await YoutubeVideo.find().sort({ createdAt: -1 }).limit(8);
  
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
    return res.status(404).json({ success: false, message: "Video not found" });
  }

  await video.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
