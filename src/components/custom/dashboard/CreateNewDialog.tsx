import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/toast"
import axios from "axios"
import { Loader2, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const CreateNewDialog = () => {

  const [workspaceName, setWorkspaceName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dialog, setDialog] = useState(false);
  const route = useRouter();

  const handleCreatedBoard = async () => {

    try {
      if (workspaceName.length < 3 || workspaceName.trim() === "") {
        toast.add({
          type: "error",
          title: "Invalid Workspace Name",
          description: "Please enter a valid workspace name"
        })
        return;
      }

      const projectId = crypto.randomUUID();
      setIsLoading(true);
      const result = await axios.post("/api/boards", {
        projectName: workspaceName,
        projectId: projectId
      });
  
      console.log(result.data)
  
      toast.add({
        type: "success",
        title: "New Workspace created"
      })
      
      setTimeout(() => {
        route.push(`/workspace-${projectId}`)
      }, 1000)
    
    } catch (error) {
      console.error("Error occured while creating workspace", error)
    } finally {
      setIsLoading(false);
      setDialog(false);
    }
  }

  return (
    <>
      <Dialog open={dialog} onOpenChange={setDialog} >
        <form>
          <DialogTrigger render={
            <Button size={"lg"} className={"w-full"} >
              <Plus /> Create New Board
            </Button>} />
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>

              <DialogTitle className={"text-xl font-bold"}>Whiteboard Workspace Title</DialogTitle>

            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="name-1" className="text-gray-600">Enter Whiteboard Workspace Name</Label>
                <Input id="name-1" name="name" placeholder="eg. My Workspace" onChange={(e) => setWorkspaceName(e.target.value)} />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <Button
                disabled={workspaceName.trim() === "" || workspaceName.length === 0}
                type="submit"
                onClick={handleCreatedBoard}
              >
                {isLoading && <Loader2 className="animate-spin" />}
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  )
}

export default CreateNewDialog
