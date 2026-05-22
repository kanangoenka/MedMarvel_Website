import { Plus } from "lucide-react";

type WorklistToolbarProps = {
  onAddCase: () => void;
};

export default function WorklistToolbar({
  onAddCase,
}: WorklistToolbarProps) {
  return (
    <div className="flex items-center justify-start">
      <button
        onClick={onAddCase}
        className="flex items-center gap-2 bg-[#071739] hover:bg-[#0b2559] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition"
      >
        <Plus size={17} />

        Add New Case
      </button>
    </div>
  );
}