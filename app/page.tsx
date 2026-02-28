import MobileHome from "../components/MobileHome";
import DesktopHome from "../components/DesktopHome";

export default function Page() {
  return (
    <>
      <div className="block lg:hidden">
        <MobileHome />
      </div>
      <div className="hidden lg:block">
        <DesktopHome />
      </div>
    </>
  );
}
