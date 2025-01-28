import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Type definition for an Invoice Item
type InvoiceItem = {
  designation: string;
  unitPrice: number;
  quantity: number;
  vat: number;
  discount: number;
  total: number;
};

const InvoiceOptionsForm = () => {
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      designation: "",
      unitPrice: 0,
      quantity: 1,
      vat: 0,
      discount: 0,
      total: 0,
    },
  ]);

  // Function to calculate totals for each row
  const calculateTotal = (item: InvoiceItem): number => {
    return (
      (parseFloat(item.unitPrice.toString()) || 0) *
        (parseInt(item.quantity.toString()) || 1) +
      (parseFloat(item.vat.toString()) || 0) -
      (parseFloat(item.discount.toString()) || 0)
    );
  };

  // Handle change in form fields
  const handleChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [field]: field === "designation" ? value : parseFloat(value.toString()) || 0,
    };

    newItems[index].total = calculateTotal(newItems[index]);
    setItems(newItems);
  };

  // Function to add a new row dynamically
  const addRow = () => {
    setItems([
      ...items,
      { designation: "", unitPrice: 0, quantity: 1, vat: 0, discount: 0, total: 0 },
    ]);
  };

  // Function to delete a row
  const deleteRow = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  // Compute summary totals
  const totalHT = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const totalDiscount = items.reduce((sum, item) => sum + item.discount, 0);
  const totalVAT = items.reduce((sum, item) => sum + item.vat, 0);
  const grandTotal = totalHT + totalVAT - totalDiscount;

  return (
    <div className="p-4 border rounded-md shadow-md">
      <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
        ADD OPTIONS TO THIS INVOICE
      </h2>
      <Table className="w-full mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Designation *</TableHead>
            <TableHead>Unit Price *</TableHead>
            <TableHead>Qty *</TableHead>
            <TableHead>VAT</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <Input
                  type="text"
                  value={item.designation}
                  placeholder="Designation"
                  onChange={(e) => handleChange(index, "designation", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={item.unitPrice}
                  placeholder="0"
                  min="0"
                  onChange={(e) => handleChange(index, "unitPrice", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={item.quantity}
                  placeholder="1"
                  min="1"
                  onChange={(e) => handleChange(index, "quantity", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={item.vat}
                  placeholder="0"
                  min="0"
                  onChange={(e) => handleChange(index, "vat", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={item.discount}
                  placeholder="0"
                  min="0"
                  onChange={(e) => handleChange(index, "discount", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={item.total}
                  disabled
                  className="bg-gray-200"
                />
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => deleteRow(index)}
                  className="bg-red-500 text-white px-2 py-1"
                  disabled={items.length === 1}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Button */}
      <div className="flex justify-end mt-4">
        <Button onClick={addRow} className="bg-secondary text-white">
          Add+
        </Button>
      </div>

      {/* Summary Section */}
      <div className="bg-gray-100 p-4 mt-6 rounded-md">
        <div className="text-right text-gray-600 text-sm">
          <p>NUMBER OF HOURS : {items.length}</p>
          <p>TOTAL HT : {totalHT.toFixed(2)}</p>
          <p>TOTAL DISCOUNT : {totalDiscount.toFixed(2)}</p>
          <p>TOTAL VAT : {totalVAT.toFixed(2)}</p>
        </div>
        <h2 className="text-blue-600 text-lg font-bold text-right mt-2">
          TOTAL : <span className="text-green-500">{grandTotal.toFixed(2)}</span>
        </h2>
      </div>
    </div>
  );
};

export default InvoiceOptionsForm;
