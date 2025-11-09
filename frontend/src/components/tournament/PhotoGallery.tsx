
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { StaticImageData } from "next/image";

type Photo = {
  id: number;
  url: StaticImageData;
  caption?: string;
};

type Props = {
  photos: Photo[];
};

export const PhotoGallery: React.FC<Props> = ({ photos }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const openGallery = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeGallery = () => {
    setSelectedPhotoIndex(null);
  };

  const goToPrevious = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex < photos.length - 1) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLImageElement>) => {
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "Escape") closeGallery();
  };

  if (!photos.length) return null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="aspect-square overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => openGallery(index)}
          >
            <img
              src={photo.url.src}
              alt={photo.caption || `Фото ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      <Dialog open={selectedPhotoIndex !== null} onOpenChange={closeGallery}>
        <DialogContent className="max-w-6xl w-full h-[90vh] p-0 bg-black/90">
          {selectedPhotoIndex !== null && (
            <div className="relative w-full h-full flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                onClick={closeGallery}
              >
                <X className="h-6 w-6" />
              </Button>

              {selectedPhotoIndex > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
              )}

              {selectedPhotoIndex < photos.length - 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                  onClick={goToNext}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              )}

              <img
                src={photos[selectedPhotoIndex].url.src}
                alt={photos[selectedPhotoIndex].caption || `Фото ${selectedPhotoIndex + 1}`}
                className="max-w-full max-h-full object-contain"
                onKeyDown={handleKeyDown}
              />

              {photos[selectedPhotoIndex].caption && (
                <div className="absolute bottom-4 left-4 right-4 text-white text-center bg-black/50 rounded-lg p-2">
                  {photos[selectedPhotoIndex].caption}
                </div>
              )}

              <div className="absolute bottom-4 right-4 text-white text-sm bg-black/50 rounded-lg px-3 py-1">
                {selectedPhotoIndex + 1} / {photos.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
