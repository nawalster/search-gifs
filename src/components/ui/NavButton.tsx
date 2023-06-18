import React from "react";

const NavButton = ({ label }: { label: string }) => {
  return (
    <button className="relative block group">
      <span className="absolute inset-0 bg-indigo-500 rounded-lg"></span>
      <div className="transition bg-black relative border-2 rounded-lg -translate-x-2 -translate-y-2">
        <div className="p-2">
          <p className="text-xl font-outerSans font-medium uppercase">
            {label}
          </p>
        </div>
      </div>
    </button>
  );
};

export default NavButton;
