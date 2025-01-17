import React, { ReactNode } from "react";

interface GradientWrapperProps {
  children: ReactNode;
  graditientStyles: string
}

const GradientWrapper: React.FC<GradientWrapperProps> = ({
  graditientStyles,
  children,
}) => {
  // Build gradient style object dynamically
  

  return (
    <div className={`h-full overflow-y-auto  ${graditientStyles}`}>
      {children}
    </div>
  );
};

export default GradientWrapper;
