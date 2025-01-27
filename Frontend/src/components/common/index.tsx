import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  list: string[];
  onChange: (list: string[]) => void;
  selectedList: string[];
}

const Selection = ({ list, onChange, selectedList }: Props) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleAdd = () => {
    if (activeItem && !selectedList.includes(activeItem)) {
      onChange([...selectedList, activeItem]);
    }
    setActiveItem(null);
  };

  const handleDelete = () => {
    if (activeItem) {
      onChange(selectedList.filter((p) => p !== activeItem));
      setActiveItem(null);
    }
  };

  const handleItemClick = (item: string) => {
    setActiveItem((prev) => (prev === item ? null : item));
  };

  return (
    <div className="my-4">
      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          className={cn(
            "w-full transition",
            activeItem && !selectedList.includes(activeItem)
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-300 cursor-not-allowed"
          )}
          onClick={handleAdd}
          disabled={!activeItem || selectedList.includes(activeItem)}
        >
          Add
        </Button>
        <Button
          className={cn(
            "w-full transition",
            activeItem && selectedList.includes(activeItem)
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gray-300 cursor-not-allowed"
          )}
          onClick={handleDelete}
          disabled={!activeItem || !selectedList.includes(activeItem)}
        >
          Delete
        </Button>
      </div>

      <div className="flex gap-4 mt-4">
        <ul className="border rounded-md w-full h-[30vh] overflow-auto">
          {list.length > 0 ? (
            list
              .filter((p) => !selectedList.includes(p))
              .map((item, index) => (
                <li
                  key={index}
                  className={cn(
                    "w-full py-2 px-3 border-b cursor-pointer transition hover:bg-gray-200",
                    activeItem === item && "bg-blue-100"
                  )}
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </li>
              ))
          ) : (
            <li className="text-gray-500 text-center py-2 mt-20">
              No items available
            </li>
          )}
        </ul>

        <ul className="border rounded-md w-full h-[30vh] overflow-auto">
          {selectedList.length > 0 ? (
            selectedList.map((item, index) => (
              <li
                key={index}
                className={cn(
                  "w-full py-2 px-3 border-b cursor-pointer transition hover:bg-gray-200",
                  activeItem === item && "bg-blue-100"
                )}
                onClick={() => handleItemClick(item)}
              >
                {item}
              </li>
            ))
          ) : (
            <li className="text-gray-500 text-center py-2 mt-20">
              No items selected
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Selection;
