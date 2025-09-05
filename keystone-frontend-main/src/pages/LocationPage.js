import { MapWithMarkers } from "../components/global";
export const LocationPage = () => {
  return (
    <div className="flex flex-col w-full gap-6 md:gap-12 mb-8 md:mb-16 mt-16">
      <MapWithMarkers />
    </div>
  );
};
