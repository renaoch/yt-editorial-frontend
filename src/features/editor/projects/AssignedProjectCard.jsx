import { Button } from "../../../components/ui/button";
import { Eye } from "lucide-react";

const AssignedProjectCard = ({ project, onClick }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm flex justify-between items-start bg-white">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="text-sm text-muted-foreground">{project.description}</p>
        <p className="text-sm text-gray-500">Deadline: {project.deadline}</p>
      </div>
      <Button size="sm" className="ml-4" onClick={() => onClick(project)}>
        <Eye className="w-4 h-4 mr-1" />
        View
      </Button>
    </div>
  );
};

export default AssignedProjectCard;
