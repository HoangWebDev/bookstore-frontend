import React, { useState, useRef, useCallback } from "react";

const WatermarkApp: React.FC = () => {
  const [watermarkImage, setWatermarkImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const [scale, setScale] = useState<number>(1);
  const [scaleUnder300, setScaleUnder300] = useState<number>(500);
  const [maxSize, setMaxSize] = useState<number>(500);
  const [minSize, setMinSize] = useState<number>(300);

  const [position, setPosition] = useState<string>("center");
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleWatermarkChange = useCallback((file?: File) => {
    if (!file) {
      setWatermarkImage(null);
      setPreviewUrl("");
      return;
    }
    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn file ảnh (.png, .jpg).");
      return;
    }
    setWatermarkImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  }, []);

  const handlePositionClick = (pos: string) => {
    setPosition(pos);
  };

  const getPositionStyle = (): React.CSSProperties => {
    switch (position) {
      case "topleft":
        return { top: 0, left: 0 };
      case "top":
        return { top: 0, left: "50%", transform: "translateX(-50%)" };
      case "topright":
        return { top: 0, right: 0 };
      case "left":
        return { top: "50%", left: 0, transform: "translateY(-50%)" };
      case "center":
        return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
      case "right":
        return { top: "50%", right: 0, transform: "translateY(-50%)" };
      case "bottomleft":
        return { bottom: 0, left: 0 };
      case "bottom":
        return { bottom: 0, left: "50%", transform: "translateX(-50%)" };
      case "bottomright":
        return { bottom: 0, right: 0 };
      default:
        return {};
    }
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Chi tiết Watermark</h2>

      {/* Upload */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <label className="block font-semibold mb-2">Upload hình ảnh:</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleWatermarkChange(e.target.files?.[0] ?? undefined)}
            className="block text-sm bg-[#2b7fff] rounded-sm px-2 py-2 text-white cursor-pointer duration-300 hover:bg-[#0666f5]"
          />
        </div>

        {previewUrl && (
          <div className="col-span-2 mt-4">
            <p className="text-sm text-gray-600">
              {watermarkImage?.name} – Width: {maxSize}px, Height: {maxSize}px (.png|.jpg)
            </p>
            <img
              src={previewUrl}
              alt="preview watermark"
              className="mt-2 max-h-20 rounded-lg border border-gray-200 shadow"
            />
          </div>
        )}
      </div>

      {/* Cấu hình */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Vị trí preview */}
        <div className="col-span-1">
          <p className="font-semibold mb-2">Vị trí đóng dấu (click để chọn):</p>
          <div className="relative w-[300px] h-[300px] border border-gray-300 bg-gray-50 rounded-lg overflow-hidden grid grid-cols-3 grid-rows-3">
            {["topleft", "top", "topright", "left", "center", "right", "bottomleft", "bottom", "bottomright"].map(
              (pos) => (
                <div
                  key={pos}
                  className="flex items-center justify-center cursor-pointer hover:bg-gray-200"
                  onClick={() => handlePositionClick(pos)}
                >
                  {position === pos && previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="watermark preview"
                      className="absolute opacity-80"
                      style={{
                        maxWidth: `${scale * 100}px`,
                        maxHeight: `${scale * 100}px`,
                        ...getPositionStyle(),
                      }}
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{pos}</p>
                  )}
                </div>
              )
            )}
          </div>
        </div>

        {/* Thông số */}
        <div className="col-span-2 space-y-4">
          <div>
            <label className="block text-sm font-medium">Tỉ lệ:</label>
            <input
              type="number"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="h-11 w-full rounded-md border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-xs outline-none placeholder:text-gray-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Tỉ lệ &lt; 300px:</label>
            <input
              type="number"
              value={scaleUnder300}
              onChange={(e) => setScaleUnder300(Number(e.target.value))}
              className="h-11 w-full rounded-md border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-xs outline-none placeholder:text-gray-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Kích thước tối đa:</label>
            <input
              type="number"
              value={maxSize}
              onChange={(e) => setMaxSize(Number(e.target.value))}
              className="h-11 w-full rounded-md border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-xs outline-none placeholder:text-gray-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Kích thước tối thiểu:</label>
            <input
              type="number"
              value={minSize}
              onChange={(e) => setMinSize(Number(e.target.value))}
              className="h-11 w-full rounded-md border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-xs outline-none placeholder:text-gray-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
            />
          </div>
        </div>
      </div>

      {/* Nút preview */}
      <div className="mt-6">
        <button
          onClick={() => setShowPreview(true)}
          className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          Preview
        </button>
      </div>

      {/* Overlay Preview */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white w-[320px] h-[320px] flex items-center justify-center rounded-lg shadow-lg overflow-hidden">
            {/* nền trắng + watermark */}
            {previewUrl && (
              <img
                src={previewUrl}
                alt="watermark final"
                className="absolute opacity-80"
                style={{
                  maxWidth: `${scale * 100}px`,
                  maxHeight: `${scale * 100}px`,
                  ...getPositionStyle(),
                }}
              />
            )}
            {/* nút đóng */}
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default WatermarkApp;
