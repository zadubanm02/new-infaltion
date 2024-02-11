import { CrossIcon, XCircle } from "lucide-react";
import React from "react";

type BadgeProps = {
  label: string;
  onDelete: () => void;
};

const ProductBadge = ({ label, onDelete }: BadgeProps) => {
  return (
    <span className="flex-1 flex-row inline-flex items-center px-2 py-1 m-1 bg-secondary rounded-lg w-auto">
      {label}
      <XCircle
        className="ml-1 cursor-pointer text-slate-700 hover:text-black"
        size={20}
        onClick={onDelete}
      />
    </span>
  );
};

export default ProductBadge;
