
import { Card } from "../../../components/ui/card";

import useSelectedUserStore from "../../../store/useSelectedUserStore"; // Importing store for filtering
export default function ProjectList({ onSelectProject, projects }) {
  const { selectedCreator } = useSelectedUserStore(); // Access selected creator

  // Filter projects based on selected creator
  const filteredProjects = selectedCreator
    ? projects.filter((project) => project.creator === selectedCreator.id)
    : projects;

  return (
    <div className="space-y-3">
      {filteredProjects.length > 0 ? (
        filteredProjects.map((project) => (
          <Card
            key={project.id}
            className="p-4 cursor-pointer hover:bg-muted transition-all"
            onClick={() => onSelectProject(project)}
          >
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="text-muted-foreground text-sm">
              {project.description}
            </p>
            <p className="text-xs text-muted-foreground">
              Deadline: {project.deadline}
            </p>
          </Card>
        ))
      ) : (
        <p>No projects available</p>
      )}
    </div>
  );
}
