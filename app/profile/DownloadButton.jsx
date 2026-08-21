"use client";

import { useEffect, useState, useRef } from "react";
import { Download } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://toptrainer-backend-production.up.railway.app/api";

export default function DownloadButton({ trainer, reviews = [] }) {
  const [mounted, setMounted] = useState(false);
  const [PDFDownloadLink, setPDFDownloadLink] = useState(null);
  const [TrainerPDFDocument, setTrainerPDFDocument] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [articles, setArticles] = useState([]);
  const trainerIdRef = useRef(null);

  const trainerId = trainer?._id || trainer?.trainerId;

  useEffect(() => {
    setIsMobile(/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent));
    Promise.all([
      import("@react-pdf/renderer"),
      import("./TrainerProfilePdf"),
    ]).then(([pdfRenderer, pdfDoc]) => {
      setPDFDownloadLink(() => pdfRenderer.PDFDownloadLink);
      setTrainerPDFDocument(() => pdfDoc.TrainerPDFDocument);
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    if (!trainerId || trainerIdRef.current === trainerId) return;
    trainerIdRef.current = trainerId;

    const fetchArticles = async () => {
      try {
        const res = await fetch(`${API_BASE}/articles/trainer/${trainerId}/published`);
        const data = await res.json();
        if (res.ok && data.success) {
          setArticles(data.articles || []);
        }
      } catch (err) {
        console.error("Failed to fetch trainer articles:", err);
      }
    };

    fetchArticles();
  }, [trainerId]);

  const buttonClass =
    "w-9 h-9 rounded-full bg-white/10 backdrop-blur border border-white/50 flex items-center justify-center text-white hover:bg-blue-800 transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95";

  if (!mounted || !PDFDownloadLink || !TrainerPDFDocument) {
    return (
      <button disabled className={`${buttonClass} opacity-50 cursor-not-allowed`}>
        <Download size={15} />
      </button>
    );
  }

  const displayName = trainer?.fullName || "Trainer";
  const fileName = `${displayName.replace(/\s+/g, "_")}_Profile.pdf`;
  const documentProps = { trainer, reviews, articles };

  if (isMobile && typeof navigator !== "undefined" && navigator.share) {
    const handleShare = async () => {
      try {
        const { pdf } = await import("@react-pdf/renderer");
        const blob = await pdf(<TrainerPDFDocument {...documentProps} />).toBlob();
        const file = new File([blob], fileName, { type: "application/pdf" });
        await navigator.share({ title: `${displayName} Profile`, files: [file] });
      } catch (err) {
        console.error("Share failed:", err);
      }
    };

    return (
      <button onClick={handleShare} className={buttonClass}>
        <Download size={15} />
      </button>
    );
  }

  return (
    <PDFDownloadLink
      document={<TrainerPDFDocument {...documentProps} />}
      fileName={fileName}
      className={buttonClass}
    >
      {({ loading }) =>
        loading ? (
          <span className="text-xs text-white">...</span>
        ) : (
          <Download size={15} />
        )
      }
    </PDFDownloadLink>
  );
}