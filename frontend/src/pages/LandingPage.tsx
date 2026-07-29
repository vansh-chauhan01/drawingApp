import { useState } from 'react';
import DrawRoundedIcon from '@mui/icons-material/DrawRounded';
import {Link} from "react-router-dom"

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#F3F5F8] text-[#0B1220]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;800;900&family=Caveat:wght@600;700&display=swap');
        .font-heading { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-hand { font-family: 'Caveat', cursive; }
      `}</style>

      {/* navbar */}
      <div className="flex justify-between items-center h-16 sm:h-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-heading font-extrabold text-lg sm:text-xl text-blue-600">
          <DrawRoundedIcon />
          Excalidraw
        </div>

        <ul className="flex items-center gap-2 sm:gap-3">
            <Link to="/auth">
            
            <li>
                <button className="font-heading text-xs sm:text-sm font-semibold px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
                Sign up
                </button>
            </li>
            </Link>
            <Link to="/auth">
          <li>
            <button className="font-heading text-xs sm:text-sm font-semibold px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#0B1220] text-white hover:bg-black transition-colors">
              Sign in
            </button>
          </li>
          </Link>
        </ul>
      </div>

      {/* hero */}
      <div className="flex flex-col items-center text-center px-4 sm:px-6 pt-10 sm:pt-16 pb-14 sm:pb-20">
        <h1
          className="font-heading leading-[1.1] sm:leading-[1.05] text-3xl xs:text-4xl sm:text-5xl md:text-6xl max-w-xs sm:max-w-xl md:max-w-3xl"
          style={{ fontWeight: 700 }}
        >
          The digital whiteboarding tool for{' '}
          <span className="font-hand text-blue-600" style={{ fontWeight: 700 }}>
            <span className="border-b-4 border-blue-300">messy thinkers.</span>
          </span>
        </h1>

        <p className="mt-5 sm:mt-6 max-w-xs sm:max-w-md md:max-w-xl text-gray-500 text-base sm:text-lg">
          Draftflow gives you the speed of a pen and paper with the power of
          infinite digital space. Zero friction, total expression.
        </p>

        <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none">
          <button className="font-heading w-full sm:w-auto bg-blue-600 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
            Start Sketching
          </button>
          <button className="font-heading w-full sm:w-auto bg-white text-gray-900 font-semibold px-7 py-3.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
            View Examples
          </button>
        </div>
      </div>
      {/* image */}
      <div className="bg-[#F3F5F8] p-6 sm:p-10 rounded-3xl">
        <img
            className="w-full max-w-6xl mx-auto rounded-2xl border border-gray-200 shadow-xl"
            src="canvas-preview-C0PCDgm4.jpg"
            alt="canvas image"
        />
        </div>

        {/* footer */}
        <div className="bg-[#0B1220] px-6 sm:px-16 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
          <div>
            <div className="w-11 h-11 rounded-xl bg-blue-950 border border-blue-800 text-blue-400 flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="8" />
              </svg>
            </div>
            <h3 className="font-heading text-white font-bold text-lg mb-2">End-to-End Encryption</h3>
            <p className="text-gray-400 text-[15px] leading-relaxed max-w-sm">
              Your ideas are yours alone. All drawings are encrypted locally before they ever touch our servers.
            </p>
          </div>

          <div>
            <div className="w-11 h-11 rounded-xl bg-blue-950 border border-blue-800 text-blue-400 flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3l9 9-9 9-9-9z" />
              </svg>
            </div>
            <h3 className="font-heading text-white font-bold text-lg mb-2">Live Collaboration</h3>
            <p className="text-gray-400 text-[15px] leading-relaxed max-w-sm">
              Invite your team with a simple link. See cursors move in real-time as you brainstorm together.
            </p>
          </div>

          


        <div>
            <div className="w-11 h-11 rounded-xl bg-blue-950 border border-blue-800 text-blue-400 flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3">
                <circle cx="12" cy="12" r="8" />
                </svg>
            </div>
            <h3 className="font-heading text-white font-bold text-lg mb-2">Get In Touch</h3>
            <p className="text-gray-400 text-[15px] leading-relaxed max-w-sm mb-3">
                Have a question or want to collaborate? Reach out directly.
            </p>
            <div className="flex flex-col gap-2">
                <a
                href="https://www.linkedin.com/in/vansh-chauhan-aa9227204/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
                </svg>
                LinkedIn
                </a>
                <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=98vansh98@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                Email
                </a>
            </div>
        </div>


        </div>
      </div>
    </div>
  );
};

export default LandingPage;