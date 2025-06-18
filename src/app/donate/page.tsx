import { PayButton } from "./PayButton";
import { auth } from "../_lib/auth";
import { ModalProvider } from "../dashboard/modal_context";
import Header from "../_components/header_bar";
import LoadingScreen from "../note/[id]/LoadingScreen";
import { getAllTags } from "../_lib/actions/dashboard/action";
import { Open_Sans } from "next/font/google";
import HowDonationsHelp from "./_components/HowDonationsHelp";
import Testimonials from "./_components/Testimonials";
import FAQ from "./_components/FAQ";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

export default async function Page() {
  const session = await auth();
  const tags = await getAllTags(session?.accessToken);

  return (
    session && (
      <ModalProvider>
        <div
          className={`flex ${openSans.className} flex-col bg-[#f9f8f6] text-[#1b140e] min-h-screen`}
        >
          <Header session={session} tags={tags} />
          <main className="pt-12 sm:pt-8 pb-12">
            {/* Hero Section */}
            <section className="px-4 py-16 md:py-24 bg-gradient-to-br ">
              <div className="max-w-6xl mx-auto text-center">
                <div className=" w-[400px] md:w-[500px] lg:w-[600px] mx-auto ">
                  <h1 className="text-[40px] md:text-[45px] lg:text-[52px] font-bold leading-[110%] mb-6">
                    Support NoteInsight&apos;s Future🎁
                  </h1>
                  <p className="text-[18px] md:text-[21px] max-w-3xl sm:mx-auto mb-8 ">
                    Help us keep the app free and accessible for everyone. Your
                    donation powers innovation and ensures quality for all
                    users.
                  </p>
                </div>
                <div className="mt-10">
                  <PayButton session={session} />
                </div>
              </div>
            </section>

            {/* Why Donate Section */}
            <section className="py-16 px-4 bg-white">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-4">
                    Why Your Support Matters
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    NoteInsight is completely free to use, but running it
                    isn&apos;t free. Your donation helps cover costs and fund
                    improvements.
                  </p>
                </div>

                <HowDonationsHelp />
              </div>
            </section>

            {/* Testimonials */}
            <Testimonials />

            {/* FAQ */}
            <FAQ />
          </main>

          <footer className="bg-[#1b140e] text-white py-8 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <p>
                NoteInsight &copy; {new Date().getFullYear()} | Made with ❤️ for
                the community
              </p>
              <p className="mt-2 text-gray-300">
                Questions?{" "}
                <a href="mailto:support@noteinsight.com" className="underline">
                  support@noteinsight.com
                </a>
              </p>
            </div>
          </footer>
        </div>
        <LoadingScreen />
      </ModalProvider>
    )
  );
}
