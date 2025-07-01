import React from "react";
import GlassCard from "./GlassCard";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  variant?: "default" | "purple" | "blue" | "pink";
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  technologies,
  liveUrl,
  githubUrl,
  variant = "default",
}) => {
  return (
    <GlassCard variant={variant} className="p-6 group">
      {/* Project Image */}
      {image && (
        <div className="relative overflow-hidden rounded-xl mb-4">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
      )}

      {/* Project Content */}
      <div className="flex flex-col h-full">
        <div className="flex-1 space-y-4">
          <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
            {title}
          </h3>

          <p className="text-white/80 text-sm leading-relaxed">{description}</p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={tech}
                className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/70 border border-white/20"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Live Demo Button */}
          {liveUrl && liveUrl !== "#" && (
            <div className="pt-2">
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-block py-2 px-4 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 border border-white/30 text-white text-sm font-medium hover:from-purple-500/50 hover:to-blue-500/50 transition-all duration-300 text-center"
              >
                Live Demo
              </a>
            </div>
          )}
        </div>

        {/* GitHub Button - Always at Bottom */}
        {githubUrl && githubUrl !== "#" && (
          <div className="mt-4 pt-2">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-block py-2 px-4 rounded-full bg-gradient-to-r from-gray-500/30 to-gray-700/30 border border-white/30 text-white text-sm font-medium hover:from-gray-500/50 hover:to-gray-700/50 transition-all duration-300 text-center"
            >
              GitHub
            </a>
          </div>
        )}
      </div>
    </GlassCard>
  );
};

export default ProjectCard;
