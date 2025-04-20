import { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import CreateProjectDialog from "./CreateProjectDialogue";
import ProjectList from "./ProjectList";
import ProjectDetailDrawer from "./ProjectDetailDrawer";
import useSelectedUserStore from "../../../store/useSelectedUserStore"; // Importing the store
import { getTasks } from "../../../lib/api/CreateTask";
import { Spinner } from "../../../components/ui/Spinner"; // Assuming you have a Spinner component

export default function ProjectsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]); // State to store fetched projects
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // Error state
  const { selectedCreator, setSelectedCreator } = useSelectedUserStore(); // Accessing the selected creator

  const handleSelectProject = (project) => {
    setSelectedProject(project);
  };

  // Fetch projects when component is mounted
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await getTasks(); // Fetch the tasks from the backend
        setProjects(fetchedProjects); // Set the tasks into the state
      } catch (err) {
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* Loading Spinner */}
        <Spinner className="text-blue-600" />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Filter projects based on selected creator
  const filteredProjects = selectedCreator
    ? projects.filter((project) => project.creator === selectedCreator.id)
    : projects;

  return (
    <>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Projects</h2>
          <Button onClick={() => setShowCreate(true)} className="flex gap-2">
            <Plus size={18} />
            Create Project
          </Button>
        </div>

        <ProjectList
          onSelectProject={handleSelectProject}
          projects={filteredProjects} // Pass the filtered projects here
        />

        <CreateProjectDialog open={showCreate} onOpenChange={setShowCreate} />
      </div>

      {/* 👇 Drawer OUTSIDE of layout container */}
      {selectedProject && (
        <ProjectDetailDrawer
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
