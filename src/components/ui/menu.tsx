import Link from "next/link";
import { GiCow } from "react-icons/gi";
import { IoMaleFemaleSharp } from "react-icons/io5";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

export const MenuNavegation = () => {
  return (
    <footer className="fixed bottom-0 -z-10 h-24 w-full rounded-t-3xl bg-primary lg:hidden">
      <section className="relative z-20 mx-auto mt-2 flex max-w-xs justify-between px-5 text-primary-foreground">
        <Link href="/">
          <div className="relative -mt-4 flex size-16 scale-125 flex-col items-center gap-1 rounded-full bg-primary text-black">
            <GiCow size={35} />
            <p>Animal</p>
          </div>
        </Link>
        <Link href="/">
          <div className="relative flex size-16 flex-col items-center gap-1 rounded-full">
            <IoMaleFemaleSharp size={35} />
            <p>Reprodução</p>
          </div>
        </Link>
        <Link href="/">
          <div className="relative flex size-16 flex-col items-center gap-1 rounded-full">
            <FaRegMoneyBillAlt size={35} />
            <p>Financeiro</p>
          </div>
        </Link>
        <Link href="/">
          <div className="relative flex size-16 flex-col items-center gap-1 rounded-full">
            <CgProfile size={35} />
            <p>Perfil</p>
          </div>
        </Link>
      </section>
    </footer>
  );
};
