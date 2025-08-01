import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Calendar } from "../../../components/ui/calendar";
import { createTask } from "../../../lib/api/CreateTask";
import { toast } from "sonner";
import useSelectedUserStore from "../../../store/useSelectedUserStore";

export default function CreateProjectDialog({ open, onOpenChange, onProjectCreated }) {
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { selectedUser } = useSelectedUserStore();

  const handleDateSelect = (date) => {
    setDeadline(date);
    setPopoverOpen(false);
  };

  const handleCreate = async () => {
    if (!name) {
      toast.error("Project name is required");
      return;
    }

    if (!selectedUser) {
      toast.error("Please select an editor");
      return;
    }

    setLoading(true);
    try {
      const newTask = await createTask({
        title: name,
        description: "",
        editorId: selectedUser._id,
        deadline,
      });

      toast.success("Project created!");
      onProjectCreated?.(newTask);
      onOpenChange(false);
      setName("");
      setDeadline(null);
    } catch (err) {
      toast.error(err.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Project Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className="mt-2"
            />
          </div>

          <div>
            <Label className="mb-2">Deadline</Label>
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deadline ? format(deadline, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={deadline}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleCreate} disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
