import React from "react";
import { GlassCard, ProjectCard, Section, Navigation } from "../components";

const Home = () => {
  const projects = [
    {
      title: "Machine Learning model to translate MRI to CT images using GANs",
      description:
        "Developed a machine learning model using Pix2PixHD GAN to translate MRI scans into corresponding CT images. The model was trained on a custom dataset of 2,500 matched MRI-CT image pairs, enabling high-fidelity translation with strong performance (PSNR ~31, SSIM ~0.85). Built and preprocessed the dataset locally to improve accuracy beyond public alternatives.",
      technologies: ["Python", "TensorFlow", "Keras", "PyTorch"],
      variant: "purple" as const,
      liveUrl: "#",
      githubUrl: "https://github.com/Basimhussain?tab=repositories",
    },
    {
      title: "TaskFlow",
      description:
        "A modern, full-stack task management web application that helps users organize and track their daily tasks. Built with React and TypeScript, it features user authentication, intuitive task creation with due dates and priorities, and smart filtering to view tasks by categories (Today, Upcoming, All, Completed). Users can create, edit, delete, and mark tasks as complete.",
      technologies: [
        "React",
        "Vite",
        "Tailwind CSS",
        "Node.js with Express.js",
        "TypeScript",
        "PostgreSQL",
      ],
      variant: "pink" as const,
      liveUrl: "#",
      githubUrl: "https://github.com/Basimhussain?tab=repositories",
    },
    {
      title: "AI Hand Gesture Based Virtual Mouse for the Visually Impaired",
      description:
        "Developed a hand-gesture-based virtual mouse with real-time audio feedback to enable non-visual desktop interaction. Used Python, OpenCV, and MediaPipe for gesture recognition, along with pyttsx3 for text-to-speech integration. The system provided intuitive control through gestures like click, drag, and scroll—making computing more accessible for visually impaired users.",
      technologies: ["Python", "OpenCV", "MediaPipe", "pyttsx3"],
      variant: "blue" as const,
      liveUrl: "#",
      githubUrl: "https://github.com/Basimhussain?tab=repositories",
    },
    {
      title: "Thinkboard",
      description:
        "A full-stack MERN notes application that lets you create, view, and manage personal notes with rate limiting protection to prevent spam requests.",
      technologies: [
        "React",
        "Tailwind CSS",
        "Express.js API with Upstash Redis",
        "MongoDB",
      ],
      variant: "pink" as const,
      liveUrl: "#",
      githubUrl: "https://github.com/Basimhussain?tab=repositories",
    },
    {
      title: "Product Management System",
      description:
        "This project is a comprehensive product management system that allows for storing, retrieving, updating, and deleting products. It features both a sleek, modern web interface using Thymeleaf templates and a RESTful API for programmatic access.",
      technologies: [
        "HTML/CSS",
        "Thymeleaf",
        "JavaScript",
        "Spring Boot",
        "Hibernate",
        "H2 Database",
      ],
      variant: "purple" as const,
      liveUrl: "#",
      githubUrl: "https://github.com/Basimhussain?tab=repositories",
    },
  ];

  const skills = [
    {
      category: "Frontend",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Vue.js",
        "HTML/CSS",
      ],
    },
    {
      category: "Backend",
      items: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Spring Boot"],
    },
    {
      category: "Tools",
      items: ["Git", "Adobe Lightroom", "Figma", "Upstash Redis", "JIRA"],
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Galaxy Background */}
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      {/* Animated Stars */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-purple-200 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-blue-200 rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation */}
        <Navigation />

        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center px-6 pt-24"
        >
          <div className="text-center max-w-4xl">
            {/* Glass Card Container */}
            <GlassCard className="p-12 mb-8">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                Hi, I&apos;m Basim Hussain
              </h1>
              <h2 className="text-6xl md:text-7xl font-bold mb-6">🧑🏻‍💻</h2>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Software Engineer skilled in Mern Stack, Spring Boot, Python,
                and Machine Learning. Experienced in building full-stack
                applications, scalable APIs, and AI-driven solutions.
              </p>

              {/* Floating Action Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() =>
                    document
                      .querySelector("#projects")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="group backdrop-blur-md bg-gradient-to-r from-purple-500/30 to-blue-500/30 border border-white/30 rounded-full px-8 py-4 text-white font-semibold hover:from-purple-500/50 hover:to-blue-500/50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <span className="group-hover:text-white transition-colors">
                    View My Work
                  </span>
                </button>
                <button
                  onClick={() =>
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="group backdrop-blur-md bg-gradient-to-r from-pink-500/30 to-purple-500/30 border border-white/30 rounded-full px-8 py-4 text-white font-semibold hover:from-pink-500/50 hover:to-purple-500/50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <span className="group-hover:text-white transition-colors">
                    Get In Touch
                  </span>
                </button>
              </div>
            </GlassCard>

            {/* Skills Pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "Vue.js",
                "Node.js",
                "Python",
                "Spring Boot",
                "MongoDB",
                "Machine Learning",
                "OpenCV",
                "TensorFlow",
              ].map((skill, index) => (
                <div
                  key={skill}
                  className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white/80 text-sm font-medium hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <Section
          id="about"
          title="About Me"
          subtitle="Building intelligent, user-focused software that solves real-world problems. Passionate about merging full-stack development with AI to drive meaningful impact.
"
          background="stars"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <GlassCard variant="purple" className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">My Journey</h3>
              <p className="text-white/80 leading-relaxed mb-6">
                I&apos;m a full-stack developer passionate about building
                scalable, AI-powered applications that solve real-world
                problems. From intuitive user interfaces to robust backend
                systems, I enjoy crafting solutions that are both efficient and
                impactful. When I’m not coding, I’m exploring emerging
                technologies in AI/ML, fine-tuning side projects, or
                collaborating on tools that make a difference.
              </p>
              <p className="text-white/80 leading-relaxed">
                When I&apos;m not coding, you can find me exploring new
                technologies, contributing to open-source projects, or enjoying
                a good cup of coffee while planning my next creative project.
              </p>
            </GlassCard>

            <div className="space-y-6">
              {skills.map((skillGroup, index) => (
                <GlassCard
                  key={skillGroup.category}
                  variant={index % 2 === 0 ? "blue" : "pink"}
                  className="p-6"
                >
                  <h4 className="text-lg font-semibold text-white mb-4">
                    {skillGroup.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <span
                        key={skill}
                        className="text-sm px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </Section>

        {/* Projects Section */}
        <Section
          id="projects"
          title="Featured Projects"
          subtitle="A showcase of my recent work and creative solutions"
          background="nebula"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </Section>

        {/* Contact Section */}
        <Section
          id="contact"
          title="Let's Connect"
          subtitle="Ready to bring your ideas to life? Let's start a conversation"
          background="stars"
        >
          <div className="max-w-2xl mx-auto">
            <GlassCard className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-lg bg-gradient-to-r from-purple-500/30 to-blue-500/30 border border-white/30 text-white font-semibold hover:from-purple-500/50 hover:to-blue-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </GlassCard>
          </div>
        </Section>

        {/* Footer */}
        <footer className="py-12 px-6">
          <GlassCard className="p-6" hover={false}>
            <div className="text-center">
              <p className="text-white/60">
                © 2024 Basim Hussain. Built with Next.js, TypeScript, and
                Tailwind CSS
              </p>
              <div className="flex justify-center space-x-6 mt-4">
                <a
                  href="https://github.com/Basimhussain?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/basim-hussain-097702354/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://twitter.com/huzayn03"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Twitter
                </a>
              </div>
            </div>
          </GlassCard>
        </footer>

        {/* Floating Orbs */}
        <div className="fixed top-1/4 left-10 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse pointer-events-none"></div>
        <div className="fixed bottom-1/4 right-10 w-40 h-40 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse delay-1000 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Home;
