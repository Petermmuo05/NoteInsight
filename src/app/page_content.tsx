"use client";
import React, { JSX } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/noteInsight_logo.png"; // Adjust path as needed
import Placeholder from "../../public/workflow.png";
import {
  FaBook,
  FaGraduationCap,
  FaLightbulb,
  FaRegFileAlt,
  FaRegLightbulb,
  FaRegUser,
  FaChartBar,
  FaPencilAlt,
} from "react-icons/fa";
import {
  MdQuiz,
  MdOutlineSlideshow,
  MdOutlineQuestionMark,
} from "react-icons/md";
import { BsFillGearFill } from "react-icons/bs";

type Feature = {
  title: string;
  desc: string;
  icon: JSX.Element;
};

type Testimonial = {
  quote: string;
  name: string;
};

type UserGroup = {
  title: string;
  icon: JSX.Element;
  description: string;
  features: { icon: JSX.Element; text: string }[];
};

const features: Feature[] = [
  {
    title: "AI Summarization",
    desc: "Get concise summaries of your notes instantly. Our advanced AI reads through your uploaded content and distills the most important points, saving you hours of manual review. Perfect for quick revision before exams or meetings, and for ensuring you never miss a key detail.",
    icon: <FaLightbulb className="text-yellow-400 text-2xl mr-2" />,
  },
  {
    title: "Quiz Generation",
    desc: "Test your knowledge with auto-generated quizzes. Instantly create practice questions from your notes to reinforce learning and identify gaps in your understanding. Great for self-study, group sessions, or preparing for upcoming assessments.",
    icon: <MdQuiz className="text-blue-400 text-2xl mr-2" />,
  },
  {
    title: "Note Organization",
    desc: "Keep your notes structured and accessible. Effortlessly categorize, tag, and search through your materials, making it easy to find what you need when you need it. Stay organized whether you’re managing class notes, research, or professional documents.",
    icon: <FaBook className="text-green-500 text-2xl mr-2" />,
  },
];

const testimonials: Testimonial[] = [
  { quote: "NoteInsight transformed my study routine!", name: "Alex S." },
  { quote: "The quizzes are a game-changer for retention.", name: "Priya M." },
  {
    quote: "I love how quickly I can organize and review my research notes.",
    name: "Jordan R.",
  },
  {
    quote: "The AI summaries save me so much time before meetings.",
    name: "Morgan T.",
  },
];

const workflowSteps: string[] = [
  "Upload your notes to NoteInsight. Supported formats include PDFs, Word documents, and plain text, so you can bring in content from anywhere.🧐",
  "AI generates summaries and quizzes. The platform intelligently analyzes your material, extracting key points and crafting personalized questions for deeper understanding.👌",
  "Review and master your content. Instantly access your summarized notes and quizzes, making it easy to reinforce learning and track your progress over time.🙌",
];

const userGroups: UserGroup[] = [
  {
    title: "Students",
    icon: <FaGraduationCap className="text-[#d8f999] text-4xl" />,
    description:
      "NoteInsight empowers students to excel academically by streamlining their study routines. It transforms complex lectures into concise, digestible notes, generates interactive flashcards for quick revision, and provides real-time writing feedback to polish essays and presentations.",
    features: [
      {
        icon: <FaBook className="text-[#d8f999]" />,
        text: "AI-generated notes",
      },
      {
        icon: <MdQuiz className="text-[#d8f999]" />,
        text: "Interactive quizzes",
      },
      {
        icon: <FaPencilAlt className="text-[#d8f999]" />,
        text: "Writing feedback",
      },
    ],
  },
  {
    title: "Researchers",
    icon: <FaRegLightbulb className="text-[#d8f999] text-4xl" />,
    description:
      "NoteInsight simplifies handling vast academic resources for researchers. It swiftly summarizes lengthy papers, organizes complex data into structured outlines, and assists in drafting polished proposals with AI-driven analysis.",
    features: [
      {
        icon: <FaRegFileAlt className="text-[#d8f999]" />,
        text: "Paper summaries",
      },
      {
        icon: <FaChartBar className="text-[#d8f999]" />,
        text: "Structured outlines",
      },
      { icon: <FaLightbulb className="text-[#d8f999]" />, text: "AI insights" },
    ],
  },
  {
    title: "Educators",
    icon: <FaRegUser className="text-[#d8f999] text-4xl" />,
    description:
      "NoteInsight supports educators in crafting impactful teaching experiences. It extracts key concepts from texts, generates engaging slides and handouts, and builds tailored lesson plans to enhance classroom engagement.",
    features: [
      {
        icon: <FaLightbulb className="text-[#d8f999]" />,
        text: "Key point extraction",
      },
      {
        icon: <MdOutlineSlideshow className="text-[#d8f999]" />,
        text: "Slide creation",
      },
      {
        icon: <MdOutlineQuestionMark className="text-[#d8f999]" />,
        text: "Custom questions",
      },
    ],
  },
  {
    title: "Professionals",
    icon: <FaRegUser className="text-[#d8f999] text-4xl" />,
    description:
      "NoteInsight equips professionals to stay ahead in fast-paced environments. It simplifies reviewing detailed reports, creates dynamic visual aids like graphs, and delivers actionable insights for strategic decisions.",
    features: [
      { icon: <FaBook className="text-[#d8f999]" />, text: "Report summaries" },
      {
        icon: <FaChartBar className="text-[#d8f999]" />,
        text: "Data visualization",
      },
      {
        icon: <FaRegFileAlt className="text-[#d8f999]" />,
        text: "Actionable insights",
      },
    ],
  },
  {
    title: "Creators",
    icon: <FaLightbulb className="text-[#d8f999] text-4xl" />,
    description:
      "NoteInsight fuels creativity by turning inspiration into actionable ideas. It summarizes diverse content into concise prompts, transforms concepts into visual storyboards, and enhances workflows with AI-generated outlines.",
    features: [
      {
        icon: <FaBook className="text-[#d8f999]" />,
        text: "Content summaries",
      },
      {
        icon: <FaRegFileAlt className="text-[#d8f999]" />,
        text: "Visual storyboards",
      },
      {
        icon: <BsFillGearFill className="text-[#d8f999]" />,
        text: "Workflow tools",
      },
    ],
  },
];

export default function LandingContent({ fontStyle }: { fontStyle: string }) {
  return (
    <>
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-full bg-[#f9f8f6]/15 backdrop-blur-lg shadow-md z-10 py-4 px-6 flex justify-between items-center"
      >
        <Link href="/" className="flex items-center gap-2">
          <Image src={Logo} alt="NoteInsight Logo" className="w-6" />
          <h2 className={`text-2xl font-[800] ${fontStyle} text-[#1C2526]`}>
            NoteInsight
          </h2>
        </Link>
        <nav className="flex gap-6 items-center">
          <div className="hidden gap-6 items-center lg:flex">
            <Link href="#features" className="hover:underline ">
              Features
            </Link>
            <Link href="#designed-for-you" className="hover:underline">
              Who It&apos;s For
            </Link>
            <Link href="#workflow" className="hover:underline">
              How It Works
            </Link>
            <Link href="#testimonials" className="hover:underline">
              Testimonials
            </Link>
          </div>
          <button className="px-4 py-2 bg-[#d8f999] text-dark-gray font-semibold rounded-lg transition-all duration-200 ease-in-out cursor-pointer active:scale-90 hover:scale-102">
            <Link href={"/login"}>Get Started</Link>
          </button>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold mt-6 md:mt-3 md:px-[250px]"
        >
          Revolutionize Your Study Routine with AI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-4 text-xl"
        >
          Summarize, Quiz, and Master Your Notes Effortlessly
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-6 py-3 bg-[#d8f999] text-dark-gray font-semibold rounded-lg"
        >
          <Link href={"/login"}>Use For Free👌</Link>
        </motion.button>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 "
        >
          <Image
            src={Placeholder}
            alt="Workflow"
            width={800}
            height={400}
            className="mx-auto"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-md"
            >
              <div className="flex items-center gap-2 mb-3">
                {feature.icon}
                <h3 className="text-xl font-bold">{feature.title}</h3>
              </div>
              <p className="mt-2">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Designed for You Section */}
      <section id="designed-for-you" className="py-20 px-6 bg-[#f9f8f6]/50">
        <h2 className="text-4xl font-bold text-center mb-12">
          Designed for You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {userGroups.map((group, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="p-8 bg-white/10 backdrop-blur-md rounded-lg shadow-md flex flex-col gap-6"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.2 }}
                >
                  {group.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {group.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {group.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Workflow Showcase */}
      <section id="workflow" className="py-20 px-6 bg-[#f9f8f6]/50">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="max-w-4xl mx-auto space-y-12">
          {workflowSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex items-center gap-6"
            >
              <div className="w-1/3">
                <Image
                  src={Placeholder}
                  alt={`Step ${index + 1}`}
                  width={200}
                  height={150}
                />
              </div>
              <p className="w-2/3 text-lg">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">What Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-md"
            >
              <p className="italic">&quot;{testimonial.quote}&quot;</p>
              <p className="mt-2 font-bold">{testimonial.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold"
        >
          Ready to Get Started?
        </motion.h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-6 py-3 bg-[#d8f999] text-dark-gray font-semibold rounded-lg"
        >
          <Link href={"/login"}>Just Start - It&apos;s Free</Link>
        </motion.button>
      </section>
    </>
  );
}
