import Link from 'next/link';
import { GiCow } from 'react-icons/gi';
import { IoMaleFemaleSharp } from 'react-icons/io5';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';

export const MenuNavegation = () => {
  return (
    <footer className='fixed bottom-0 -z-10 bg-primary w-full h-24 rounded-t-3xl lg:hidden'>
      <section className='relative z-20 text-primary-foreground flex justify-between px-5 mt-2 max-w-xs mx-auto'>
        <Link href='/'>
          <div className='flex flex-col gap-1 items-center bg-primary text-black rounded-full size-16 relative -mt-4 scale-125'>
            <GiCow size={35} />
            <p>Animal</p>
          </div>
        </Link>
        <Link href='/'>
          <div className='flex flex-col gap-1 items-center rounded-full size-16 relative'>
            <IoMaleFemaleSharp size={35} />
            <p>Reprodução</p>
          </div>
        </Link>
        <Link href='/'>
          <div className='flex flex-col gap-1 items-center rounded-full size-16 relative'>
            <FaRegMoneyBillAlt size={35} />
            <p>Financeiro</p>
          </div>
        </Link>
        <Link href='/'>
          <div className='flex flex-col gap-1 items-center rounded-full size-16 relative'>
            <CgProfile size={35} />
            <p>Perfil</p>
          </div>
        </Link>
      </section>
    </footer>
  );
};
