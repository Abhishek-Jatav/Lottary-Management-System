"use client";

import toast from "react-hot-toast";

export default function PortfolioButton() {
  const openPortfolio = () => {
    toast.success("Opening Portfolio 🚀");
    window.open("https://nexabuild-abhishek-jatav.netlify.app/", "_blank");
  };

  return (
    <>
      <button onClick={openPortfolio} className="portfolio-btn">
        <span className="btn-bg"></span>
        <span className="btn-shimmer"></span>

        <span className="btn-content">🚀 Explore My Portfolio</span>
      </button>

      <style jsx>{`
        /* ===============================
   MAIN BUTTON
================================*/

        .portfolio-btn {
          position: relative;
          padding: 12px 26px;
          border-radius: 14px;
          border: none;
          cursor: pointer;

          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.5px;

          color: white;
          background: transparent;

          overflow: hidden;

          transition: all 0.3s ease;

          /* Floating Glow */
          box-shadow:
            0 0 20px rgba(255, 0, 128, 0.4),
            0 0 40px rgba(128, 0, 255, 0.3);

          animation: floatGlow 3s ease-in-out infinite;
        }

        /* ===============================
   GRADIENT BACKGROUND
================================*/

        .btn-bg {
          position: absolute;
          inset: 0;

          background: linear-gradient(
            135deg,
            #7c3aed,
            #ec4899,
            #ef4444,
            #7c3aed
          );

          background-size: 300% 300%;

          border-radius: 14px;

          animation: gradientMove 6s linear infinite;

          z-index: 0;
        }

        /* ===============================
   SHIMMER SWEEP
================================*/

        .btn-shimmer {
          position: absolute;
          top: 0;
          left: -100%;

          width: 60%;
          height: 100%;

          background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.6),
            transparent
          );

          transform: skewX(-25deg);

          z-index: 1;
        }

        .portfolio-btn:hover .btn-shimmer {
          animation: shimmerMove 0.8s ease;
        }

        /* ===============================
   TEXT CONTENT
================================*/

        .btn-content {
          position: relative;
          z-index: 2;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 6px;
        }

        /* ===============================
   HOVER EFFECTS
================================*/

        .portfolio-btn:hover {
          transform: scale(1.08);

          box-shadow:
            0 0 30px rgba(255, 0, 128, 0.8),
            0 0 60px rgba(128, 0, 255, 0.7);
        }

        /* Click Effect */

        .portfolio-btn:active {
          transform: scale(0.94);
        }

        /* ===============================
   ANIMATIONS
================================*/

        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 300% 50%;
          }
        }

        @keyframes shimmerMove {
          0% {
            left: -100%;
          }
          100% {
            left: 150%;
          }
        }

        @keyframes floatGlow {
          0%,
          100% {
            box-shadow:
              0 0 20px rgba(255, 0, 128, 0.4),
              0 0 40px rgba(128, 0, 255, 0.3);
          }

          50% {
            box-shadow:
              0 0 30px rgba(255, 0, 128, 0.8),
              0 0 70px rgba(128, 0, 255, 0.6);
          }
        }
      `}</style>
    </>
  );
}
