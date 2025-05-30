import sipan from '../../assets/Logos_Header.svg';

const Header = () => {
  return (
    <header className="bg-gradient-to-b from-white to-[#eeeeee] shadow-md border-b">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2 px-4 py-2">

        {/* Logo */}
        <img
          src={sipan}
          alt="Sipan Logo"
          className="h-[35px] md:h-[54px]"
        />

        {/* Navegación */}
        <nav className="flex flex-col md:flex-row items-center gap-1 text-sm md:text-base font-semibold w-full md:w-auto">
          <a
            href="#home"
            className="w-full text-center md:w-auto px-4 py-3 bg-gradient-to-b from-[#66c7e0] to-[#059fd1] text-white no-underline hover:brightness-110 transition"
          >
            Home
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
