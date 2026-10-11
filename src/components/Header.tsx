import { Link, useLocation } from "react-router-dom";
import KetLogoTitle from "../../public/images/KetLogoTitle.png"

export function Header() {
  const location = useLocation();

  return (
    <header className="backdrop-blur-md fixed w-full top-0 z-50">
      {/* Menu desktop */}
      <div className="hidden md:flex items-center justify-evenly">
        <NavLink href="/" isActive={location.pathname === "/"} className="brand-link">
          <img
            src={KetLogoTitle}
            alt="KET USP Logo"
            className="brand-logo h-auto w-full max-w-[150px] object-contain"
          />
        </NavLink>
        <NavLink href="/projetos" isActive={location.pathname === "/projetos"}>
          Projetos
        </NavLink>
        <NavLink
          href="/palestras"
          isActive={location.pathname.startsWith("/palestras")}
        >
          Palestras
        </NavLink>
        <NavLink
          href="/aulas"
          isActive={location.pathname.startsWith("/aulas")}
        >
          Aulas
        </NavLink>
        <NavLink href="/sobre" isActive={location.pathname === "/sobre"}>
          Sobre
        </NavLink>
        <NavLink href="/contato" isActive={location.pathname === "/contato"}>
          Contato
        </NavLink>
      </div>

      {/* Ações (tema, idioma e menu mobile) */}
      {/* <div className="flex items-center gap-2 md:gap-4">
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Globe size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => changeLanguage("pt")}
              className={i18n.language === "pt" ? "bg-muted" : ""}
            >
              {t("languageSelector.pt")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => changeLanguage("en")}
              className={i18n.language === "en" ? "bg-muted" : ""}
            >
              {t("languageSelector.en")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}

        {/* Menu mobile */}
        {/* <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu size={22} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/fronts">{t("navigation.fronts")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/about">{t("navigation.about")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/events">{t("navigation.events")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/learn">{t("navigation.learn")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/contact">{t("navigation.contact")}</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div> */}
    </header>
  );
}

function NavLink({href, children, isActive, className = ""}: {href: string; children: React.ReactNode; isActive: boolean; className?: string;}) {
  return (
    <Link
      to={href}
      className={`h-[70px] w-full flex items-center justify-center border-[1px]
        text-2xl font-semibold
        ${isActive ? "bg-black" : ""} ${className}`}
    >
      {children}
    </Link>
  );
}
