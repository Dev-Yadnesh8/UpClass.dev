import GradientBtn from "../Buttons/GradientBtn";

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full h-20   bg-darkerBg/90 backdrop-blur shadow-md text-white">
      <div className=" mx-auto px-6 py-7 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold tracking-wide">UpClass.dev</div>

        <div className="flex gap-4">
          <GradientBtn text={"SignIn"} />
          <GradientBtn text={"SignUp"} />
        </div>
      </div>
    </header>
  );
}
export default Header;
