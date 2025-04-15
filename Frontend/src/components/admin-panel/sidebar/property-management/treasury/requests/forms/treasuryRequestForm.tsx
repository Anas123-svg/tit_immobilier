import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Uploader from "@/components/common/uploader";
import { useEffect } from "react";
import axios from "axios";
import useAuthStore from "@/store/authStore";
import { toast } from "react-toastify";

const TreasuryRequestSchema = z.object({
  treasury_id: z.string().nonempty({ message: "Treasury is required" }),
  pattern: z.string().nonempty({ message: "Reason is required" }),
  date: z.string().nonempty({ message: "Date is required" }),
  priority: z.string().nonempty({ message: "Priority is required" }),
  amount: z.string().nonempty({ message: "Amount is required" }),
  details: z.string().optional(),
  documents: z.array(z.string()).optional(),
});

const priorities = [
  { label: "High", value: "High" },
  { label: "Medium", value: "Medium" },
  { label: "Low", value: "Low" },
];

const patterns = [
  { label: "Monthly Expense", value: "Monthly Expense" },
  { label: "One-time Payment", value: "One-time Payment" },
  { label: "Emergency Fund", value: "Emergency Fund" },
  { label: "Project Expense", value: "Project Expense" },
];

const TreasuryRequestForm = () => {
  const [open, setOpen] = useState(false);
  const [treasuries, setTreasuries] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();

  const openChange = () => {
    setOpen(!open);
    form.reset();
  };

  const form = useForm<z.infer<typeof TreasuryRequestSchema>>({
    resolver: zodResolver(TreasuryRequestSchema),
    defaultValues: {
      treasury_id: "",
      pattern: "",
      date: new Date().toISOString().split("T")[0],
      priority: "",
      amount: "",
      details: "",
      documents: [],
    },
  });

  useEffect(() => {
    if (open) {
      fetchTreasuries();
    }
  }, [open]);

  const fetchTreasuries = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/public/api/treasury/add`
      );
      setTreasuries(response.data);
    } catch (error) {
      console.error("Error fetching treasuries:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof TreasuryRequestSchema>) => {
    try {
      setLoading(true);
      const requestData = {
        ...data,
        user_id: user?.id,
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/treasury/request`,
        requestData
      );
      toast.success("Treasury request submitted successfully!");
      openChange();
    } catch (error) {
      console.error("Error submitting treasury request:", error);
      alert("Failed to submit treasury request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogTrigger className="px-4 py-2 text-white rounded-md bg-blue-500">
        New Treasury Request
      </DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[900px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle className="text-lg md:text-xl font-bold text-center bg-blue-500 text-white p-2 mb-4">
          INFORMATION ON THE SUBSTANTIAL APPLICATION
        </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <FormField
                  control={form.control}
                  name="treasury_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        Treasury <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={loading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a treasury" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {treasuries.map((treasury: any) => (
                            <SelectItem
                              key={treasury.id}
                              value={treasury.id.toString()}
                            >
                              {treasury.label} ({treasury.cash_type})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="pattern"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        Reason <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select reason" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {patterns.map((pattern) => (
                            <SelectItem
                              key={pattern.value}
                              value={pattern.value}
                            >
                              {pattern.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        Date <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        Priority <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {priorities.map((priority) => (
                            <SelectItem
                              key={priority.value}
                              value={priority.value}
                            >
                              {priority.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter request details"
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        Amount <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <h2 className="font-medium mb-2">
                Exhibits and documents to be attached
              </h2>
              <div className="border border-dashed border-gray-300 p-4 rounded-md">
                <p className="text-center text-gray-600 mb-4">
                  FORMATS AND SIZE ACCEPTED: JPEG, JPG, PNG, PDF, DOCS, DOCX,
                  XLS, XLM for a maximum size of 2 Megabits
                </p>
                <FormField
                  control={form.control}
                  name="documents"
                  render={({ field }) => (
                    <Uploader
                      onChange={(files) => form.setValue("documents", files)}
                      maxFiles={5}
                      addedFiles={form.watch("documents") || []}
                    />
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                className="bg-gray-500 text-white"
                onClick={openChange}
                disabled={loading}
              >
                CLOSE
              </Button>
              <Button
                type="button"
                variant="outline"
                className="bg-yellow-400 text-white"
                onClick={() => form.reset()}
                disabled={loading}
              >
                Empty
              </Button>
              <Button
                type="submit"
                className="bg-blue-500 text-white"
                disabled={loading}
              >
                Register
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TreasuryRequestForm;
