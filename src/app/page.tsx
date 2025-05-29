import { FC } from "react";
import Link from "next/link";
import { Open_Sans, Playfair_Display_SC } from "next/font/google";

import LandingContent from "./page_content";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const playFair = Playfair_Display_SC({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const LandingPage: FC = () => {
  return (
    <div
      className={`${openSans.className} bg-[#f9f8f6] text-[#1b140e] min-h-screen`}
    >
      {/* Header */}
      <LandingContent fontStyle={playFair.className} />

      {/* Footer */}
      <footer className="py-6 px-6 bg-[#f9f8f6]/15 backdrop-blur-lg text-center">
        <div className="flex justify-center gap-6 mb-4">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
        <p>© 2023 NoteInsight. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
