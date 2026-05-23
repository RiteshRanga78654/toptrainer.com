"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

export default function DownloadButton() {
  const [mounted, setMounted] = useState(false);
  const [PDFDownloadLink, setPDFDownloadLink] = useState(null);
  const [TrainerPDFDocument, setTrainerPDFDocument] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

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

  const buttonClass =
    "w-9 h-9 rounded-full bg-white/10 backdrop-blur border border-white/50 flex items-center justify-center text-white hover:bg-blue-800 transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95";

  if (!mounted || !PDFDownloadLink || !TrainerPDFDocument) {
    return (
      <button disabled className={`${buttonClass} opacity-50 cursor-not-allowed`}>
        <Download size={15} />
      </button>
    );
  }

  if (isMobile && typeof navigator !== "undefined" && navigator.share) {
    const handleShare = async () => {
      try {
        const { pdf } = await import("@react-pdf/renderer");
        const blob = await pdf(<TrainerPDFDocument />).toBlob();
        const file = new File([blob], "Karan_Malhotra_Profile.pdf", {
          type: "application/pdf",
        });
        await navigator.share({ title: "Karan Malhotra Profile", files: [file] });
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
      document={<TrainerPDFDocument />}
      fileName="Karan_Malhotra_Profile.pdf"
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