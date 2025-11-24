import React, { ReactNode } from "react";
import BackButton from "./BackButton";

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  backButtonTo?: string;
}

/**
 * حاوية عامة للصفحات الداخلية مع زر العودة وعنوان اختياري
 */
const PageContainer = ({
  children,
  title,
  showBackButton = true,
  backButtonTo
}: PageContainerProps) => {
  return (
    <div className="container mx-auto px-4 py-4 max-w-6xl">
      <div className="relative">
        {/* زر العودة */}
        {showBackButton && (
          <div className="absolute top-0 right-0 z-10">
            <BackButton to={backButtonTo} />
          </div>
        )}

        {/* عنوان الصفحة (اختياري) */}
        {title && (
          <div className="text-center mb-6 pt-10">
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
        )}

        {/* محتوى الصفحة */}
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageContainer;