import { useState, useEffect } from "react";
import axios from "axios";

// Same shape/behaviour as the homepage hero-image state (see
// app/admin/homepage/hooks/useHomepageState.js), but scoped to the
// workshops page via `scope=workshops` so the two sliders never mix.
export default function useWorkshopHeroImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroSaved, setHeroSaved] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/hero-images?scope=workshops")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setImages(data.data);
        }
      })
      .catch((err) => console.error("Failed to fetch workshop hero images", err))
      .finally(() => setLoading(false));
  }, []);

  const toggleActive = async (id) => {
    const imgToUpdate = images.find((img) => img._id === id);
    if (!imgToUpdate) return;

    setImages((prev) =>
      prev.map((img) => (img._id === id ? { ...img, active: !img.active } : img))
    );

    try {
      await axios.put(
        `http://localhost:5000/api/hero-images/${id}`,
        { active: !imgToUpdate.active },
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Failed to toggle active", err);
      setImages((prev) =>
        prev.map((img) => (img._id === id ? { ...img, active: imgToUpdate.active } : img))
      );
    }
  };

  const updateCaption = async (id, newCaption) => {
    const originalImage = images.find((img) => img._id === id);
    if (!originalImage) return;

    setImages((prev) =>
      prev.map((img) => (img._id === id ? { ...img, caption: newCaption } : img))
    );

    try {
      await axios.put(
        `http://localhost:5000/api/hero-images/${id}`,
        { caption: newCaption },
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Failed to update caption", err);
      setImages((prev) =>
        prev.map((img) =>
          img._id === id ? { ...img, caption: originalImage.caption } : img
        )
      );
    }
  };

  const removeImage = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/hero-images/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setImages((prev) => prev.filter((img) => img._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete workshop hero image", err);
    }
  };

  const addHeroImage = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    formData.append("scope", "workshops");

    try {
      const res = await axios.post("http://localhost:5000/api/hero-images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        setImages((prev) => [...prev, res.data.data]);
        setHeroSaved(true);
        setTimeout(() => setHeroSaved(false), 3000);
      }
    } catch (err) {
      console.error("Failed to upload workshop hero image", err);
    }
  };

  return {
    images,
    loading,
    heroSaved,
    addHeroImage,
    toggleActive,
    updateCaption,
    removeImage,
  };
}
