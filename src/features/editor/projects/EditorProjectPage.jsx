import { useState, useEffect, useMemo } from "react";
import { getTasks } from "../../../lib/api/CreateTask";
import AssignedProjectCard from "./AssignedProjectCard";
import NoteSection from "./NoteSection";
import ProjectTabs from "./ProjectTabs";
import { Button } from "../../../components/ui/button";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "../../../components/ui/dialog";

import useSelectedUserStore from "../../../store/useSelectedUserStore";

export default function EditorProjectsPage() {
  const [assignedProjects, setAssignedProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [tags, setTags] = useState("");
  const [comments, setComments] = useState("");
  const [newNote, setNewNote] = useState("");
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");

  // Select user from Zustand store
  const { selectedUser } = useSelectedUserStore();
  console.log("selecetd user: ", selectedUser);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getTasks();
        setAssignedProjects(data);
      } catch (error) {
        console.error("❌ Error fetching tasks:", error.message);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const updatedProject = {
        ...selectedProject,
        notes: [
          ...(selectedProject.notes || []),
          {
            text: newNote,
            role: "Editor",
            timestamp: new Date().toISOString(),
          },
        ],
      };
      setSelectedProject(updatedProject);
      setNewNote("");
    }
  };

  const handleUpload = () => {
    const version =
      selectedProject.videoVersions?.length > 0
        ? selectedProject.videoVersions.length + 1
        : 1;

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("tags", tags);
    formData.append("comments", comments);
    formData.append("version", version);

    console.log("Uploading version", formData.get("video"));
    // You can implement API POST here
  };

  // Filter projects based on selectedUser
  const filteredProjects = useMemo(() => {
    if (!selectedUser) return assignedProjects;

    return assignedProjects.filter((project) => {
      console.log("selectedUser._id", selectedUser._id);
      console.log("project.creator_id", project.creator_id);

      // Ensure both selectedUser._id and project.creator_id are compared correctly
      const matchesId = project.creator_id === selectedUser._id;

      console.log(`Filtering project ${project.title}: ${matchesId}`); // Check if they match
      return matchesId;
    });
  }, [assignedProjects, selectedUser]);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">
        {selectedUser?.name
          ? `Projects Assigned to ${selectedUser.name}`
          : "Your Assigned Projects"}
      </h2>

      <div className="flex flex-col space-y-4">
        {filteredProjects.length === 0 ? (
          <p className="text-muted-foreground">No projects assigned.</p>
        ) : (
          filteredProjects.map((project) => (
            <AssignedProjectCard
              key={project._id}
              project={project}
              onClick={handleProjectClick}
            />
          ))
        )}
      </div>

      {selectedProject && (
        <Dialog open={true} onOpenChange={() => setSelectedProject(null)}>
          <DialogTrigger />
          <DialogContent className="h-[600px] bg-secondary p-0 flex flex-col">
            <div className="px-6 pt-2 pb-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold">
                  {selectedProject.name}
                </h3>
                <Button
                  variant="outline"
                  onClick={() => setSelectedProject(null)}
                  className="ml-auto"
                >
                  Close
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <ProjectTabs
                selectedProject={selectedProject}
                handleUpload={handleUpload}
                videoFile={videoFile}
                tags={tags}
                comments={comments}
                setTags={setTags}
                setComments={setComments}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                setVideoFile={setVideoFile}
              />
              {selectedTab === "overview" && (
                <NoteSection
                  notes={selectedProject.notes}
                  newNote={newNote}
                  setNewNote={setNewNote}
                  handleAddNote={handleAddNote}
                  isAddNoteOpen={isAddNoteOpen}
                  setIsAddNoteOpen={setIsAddNoteOpen}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
