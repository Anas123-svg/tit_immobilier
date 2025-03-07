// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// type InventoryItem = {
//   partConcerned: string;
//   equipment: string;
//   state: string;
//   comment: string;
// };

// const InventoryForm = () => {
//   const [items, setItems] = useState<InventoryItem[]>([
//     { partConcerned: "", equipment: "", state: "", comment: "" },
//   ]);

//   // Add a new row to the form
//   const addRow = () => {
//     setItems([
//       ...items,
//       { partConcerned: "", equipment: "", state: "", comment: "" },
//     ]);
//   };

//   // Remove a row
//   const removeRow = (index: number) => {
//     setItems(items.filter((_, i) => i !== index));
//   };

//   // Handle form field changes
//   const handleChange = (
//     index: number,
//     field: keyof InventoryItem,
//     value: string
//   ) => {
//     const updatedItems = [...items];
//     updatedItems[index][field] = value;
//     setItems(updatedItems);
//   };

//   // Handle save action
//   const handleSave = () => {
//     console.log("Saved Items: ", items);
//     // Implement save logic (e.g., API call)
//   };

//   const InventoryItemSchema = z.object({
//     partConcerned: z.string().min(1, "Part concerned is required"),
//     equipment: z.string().min(1, "Equipment is required"),
//     state: z.string().min(1, "State is required"),
//     comment: z.string().optional(), // Optional field
//   });
//   const form = useForm({
//     resolver: zodResolver(InventoryItemSchema),
//   });

//   return (
//     <div className="p-4 border rounded-md shadow-md">
//       <h2 className="bg-blue-500 text-white text-center p-2 text-sm md:text-base">
//         INVENTORY OF ELEMENTS PRESENT
//       </h2>

//       <div className="space-y-4 mt-6">
//         {items.map((_, index) => (
//           <div key={index} className="grid grid-cols-4 gap-4">
//             {/* Part Concerned */}
//             <FormField
//               control={form.control}
//               name={`items.${index}.partConcerned`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Part Concerned *</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       value={items[index].partConcerned}
//                       onChange={(e) =>
//                         handleChange(index, "partConcerned", e.target.value)
//                       }
//                       placeholder="Part concerned"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Equipment */}
//             <FormField
//               control={form.control}
//               name={`items.${index}.equipment`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Equipment *</FormLabel>
//                   <FormControl>
//                     <Select
//                       value={items[index].equipment}
//                       onChange={(e) =>
//                         handleChange(index, "equipment", e.target.value)
//                       }
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select an item" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="Item 1">Item 1</SelectItem>
//                         <SelectItem value="Item 2">Item 2</SelectItem>
//                         <SelectItem value="Item 3">Item 3</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* State */}
//             <FormField
//               control={form.control}
//               name={`items.${index}.state`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>State *</FormLabel>
//                   <FormControl>
//                     <Select
//                       value={items[index].state}
//                       onChange={(e) => handleChange(index, "state", e.target.value)}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select state" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="New">New</SelectItem>
//                         <SelectItem value="Used">Used</SelectItem>
//                         <SelectItem value="Defective">Defective</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Comment */}
//             <FormField
//               control={form.control}
//               name={`items.${index}.comment`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Comment</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       value={items[index].comment}
//                       onChange={(e) =>
//                         handleChange(index, "comment", e.target.value)
//                       }
//                       placeholder="Comment"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Remove Button */}
//             <Button
//               onClick={() => removeRow(index)}
//               className="bg-red-500 text-white w-fit self-end"
//             >
//               Delete the part
//             </Button>
//           </div>
//         ))}
//         {/* Add Button */}
//         <Button onClick={addRow} className="bg-blue-500 text-white w-fit self-end">
//           Add+
//         </Button>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-between mt-4">
//         <Button className="bg-green-500 text-white" onClick={handleSave}>
//           Save the part
//         </Button>
//         <Button
//           className="bg-blue-500 text-white"
//           onClick={() => {
//             const firstItem = items[0];
//             setItems([...items, { ...firstItem }]); // Duplicating first item
//           }}
//         >
//           Duplicate the part
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default InventoryForm;
