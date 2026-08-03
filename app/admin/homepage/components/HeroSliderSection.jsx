import React from "react";
import { Upload, Trash2, Plus } from "lucide-react";
import { Card, Button, Toggle } from "../../../components/ui";


export default function HeroSliderSection({
  images,
  addHeroImage,
  toggleActive,
  updateCaption,
  removeImage,
}) {
  return (
    <Card>
      {/* Card header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            Hero Slider Images
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            Up to 4 images. These rotate at the top of the homepage.
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
          {images.filter((i) => i.active).length} / 4 Used
        </span>
      </div>

      {/* Slide rows */}
      <div className="p-4 grid grid-cols-1 gap-4">
        {images.map((img) => {
          return (
            <div
              key={img._id}
              className="flex justify-between items-center gap-3 bg-white border border-slate-200 rounded-xl p-3"
            >
              {/* Drag handle */}

              <div className="flex flex-1 gap-3 items-center">
                <div
                  className="mt-1 text-slate-300 cursor-grab select-none shrink-0"
                  title="Drag to reorder"
                >
                  <svg
                    width="10"
                    height="16"
                    viewBox="0 0 10 16"
                    fill="currentColor"
                  >
                    <circle cx="2" cy="2" r="1.5" />
                    <circle cx="8" cy="2" r="1.5" />
                    <circle cx="2" cy="8" r="1.5" />
                    <circle cx="8" cy="8" r="1.5" />
                    <circle cx="2" cy="14" r="1.5" />
                    <circle cx="8" cy="14" r="1.5" />
                  </svg>
                </div>

                {/* Thumbnail + change image */}
                <div className="shrink-0">
                  <div className="relative w-28 md:w-32 h-20 rounded-lg overflow-hidden bg-slate-100 group cursor-pointer upload-zone">
                    <img
                      src={img.url}
                      alt="Hero slide"
                      className="h-full w-full object-cover"
                    />
                    <label className="upload-overlay absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Upload size={14} className="text-white" />
                      <span className="text-white text-[10px] font-medium">
                        Upload
                      </span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            addHeroImage(e.target.files[0]);
                            removeImage(img._id); // Delete the old image
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                {/* Caption Input */}
                <div className="flex-1 px-2">
                  <input
                    type="text"
                    placeholder="Enter caption for this slide..."
                    defaultValue={img.caption || ""}
                    onBlur={(e) => {
                      if (e.target.value !== img.caption) {
                        updateCaption(img._id, e.target.value);
                      }
                    }}
                    className="w-full text-sm border-b border-slate-200 focus:border-blue-500 focus:outline-none bg-transparent py-2 transition-colors placeholder:text-slate-400"
                  />
                </div>
              </div>

              
              {/* Active toggle + delete */}
              <div className="flex flex-col gap-3 shrink-0 items-end">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-600">
                    Active
                  </span>
                  <Toggle
                    checked={img.active}
                    onChange={() => toggleActive(img._id)}
                  />
                </div>
                <button
                  onClick={() => removeImage(img._id)}
                  className="text-slate-400 hover:text-red-500 transition-colors p-1 bg-slate-50 hover:bg-red-50 rounded-md"
                  title="Remove Image"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}

        {/* Add Another Slide */}
        {images.length < 4 && (
          <label className="w-full border-2 border-dashed border-slate-200 rounded-xl py-3.5 flex items-center justify-center gap-2 text-sm font-medium text-slate-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/40 transition-all cursor-pointer">
            <Plus size={16} />
            Add Another Slide
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  addHeroImage(e.target.files[0]);
                }
              }}
            />
          </label>
        )}
      </div>
    </Card>
  );
}