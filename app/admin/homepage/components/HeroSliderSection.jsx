import React from "react";
import { Upload, Trash2, Plus } from "lucide-react";
import { Card, Button, Toggle } from "../../../components/ui";
import { cn, wordCount } from "../../../lib/api";

export default function HeroSliderSection({
  images,
  updateCaption,
  toggleActive,
  removeImage,
  saveHero,
  settings,
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
      <div className="p-4 space-y-3">
        {images.map((img) => {
          const wc = wordCount(img.caption);
          const over = wc > 20;
          return (
            <div
              key={img.id}
              className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-3"
            >
              {/* Drag handle */}
              <div
                className="mt-3 text-slate-300 cursor-grab select-none flex-shrink-0"
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
              <div className="flex-shrink-0">
                <div className="relative w-28 h-20 rounded-lg overflow-hidden bg-slate-100 group cursor-pointer upload-zone">
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="upload-overlay absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Upload size={14} className="text-white" />
                    <span className="text-white text-[10px] font-medium">
                      Upload
                    </span>
                  </div>
                </div>
                <button className="mt-1.5 text-xs text-blue-600 hover:text-blue-800 font-medium w-full text-left">
                  Change Image
                </button>
              </div>

              {/* Caption */}
              <div className="flex-1 min-w-0">
                <label className="text-xs font-medium text-slate-600 mb-1 block">
                  Caption Text
                </label>
                <input
                  type="text"
                  value={img.caption}
                  onChange={(e) => updateCaption(img.id, e.target.value)}
                  placeholder="Enter caption..."
                  className={cn(
                    "w-full text-sm text-slate-700 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400",
                    over ? "border-red-300 bg-red-50" : "border-slate-200",
                  )}
                />
                {over && (
                  <p className="text-[11px] text-red-500 mt-1">
                    {wc}/20 words — too long
                  </p>
                )}
              </div>

              {/* Active toggle + delete */}
              <div className="flex flex-col items-end gap-3 flex-shrink-0 pt-1">
                <div className="flex items-center gap-2">
                  <Toggle
                    checked={img.active}
                    onChange={() => toggleActive(img.id)}
                  />
                  <span className="text-xs font-medium text-slate-600">
                    Active
                  </span>
                </div>
                <button
                  onClick={() => removeImage(img.id)}
                  className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all"
                  title="Remove slide"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          );
        })}

        {/* Add Another Slide */}
        {images.length < 4 && (
          <button className="w-full border-2 border-dashed border-slate-200 rounded-xl py-3.5 flex items-center justify-center gap-2 text-sm font-medium text-slate-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/40 transition-all">
            <Plus size={16} />
            Add Another Slide
          </button>
        )}
      </div>

      {/* Footer save */}
      <div className="px-4 pb-4 flex items-center justify-between">
        {images.length < 4 && (
          <p className="text-xs text-slate-400">
            Slides loop every{" "}
            <b className="text-slate-600">{settings.heroSliderInterval}s</b>
          </p>
        )}
        <div className="ml-auto">
          <Button onClick={saveHero} size="sm">
            Save Changes
          </Button>
        </div>
      </div>
    </Card>
  );
}
