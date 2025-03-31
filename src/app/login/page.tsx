import type { NextPage } from "next";
import Head from "next/head";
import Loginform from "./loginform";
import { Inter, Playfair_Display_SC } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
});

const playFair = Playfair_Display_SC({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});
const Login: NextPage = () => {
  return (
    <div className={inter.className}>
      <Head>
        <title>Notelnsight - Login</title>
        <meta name="description" content="Login to Notelnsight" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen overflow-hidden bg-gray-50 flex items-center  max-sm:items-start justify-center max-sm:bg-gray-100 max-sm:p-0 p-4">
        <div className="bg-gray-100 rounded-lg sm:shadow-lg py-[60px] max-sm:py-[20vh] h-auto max-sm:pt-[15vh] min-w-sm px-8 max-sm:w-full min-h-[500px] max-sm:gap-24 max-sm:h-full flex flex-col justify-between">
          {/* Title */}
          <h1 className={`text-3xl max-sm:text-[40px] ${playFair.className} font-[800] text-black text-center`}>
            NoteInsight
          </h1>

          <Loginform />

          {/* Sign Up Link */}
          <p className="text-center text-gray-400 text-sm max-sm:mt-[-5vh]">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="text-green-500 hover:text-green-600 font-medium"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
