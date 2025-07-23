import React from "react";

type LoadingProps = {
    fullscreen?: boolean; // true: chiếm toàn bộ màn hình, false: inline
    message?: string;
};

const Loading: React.FC<LoadingProps> = ({ fullscreen = false, message }) => {
    const containerClasses = fullscreen
        ? "fixed inset-0 z-50 flex items-center justify-center bg-white/70"
        : "flex items-center justify-center";

    return (
        <div className={containerClasses}>
            <div className="flex flex-col items-center space-y-3">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                {message && <p className="text-sm text-gray-600">{message}</p>}
            </div>
        </div>
    );
};

export default Loading;