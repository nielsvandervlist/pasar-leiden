import Link from 'next/link'
import Image from "next/image";
import Logo from '../public/logo.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";


export default function Header() {

    const [open, setOpen] = useState(false)

    const nav = <nav className={'ml-auto'}>
        <ul className={'flex-col flex md:flex-row gap-8'}>
            <li><Link className={'font-semibold text-lg tracking-wider'} href={'/'}>Home</Link></li>
            <li><Link className={'font-semibold text-lg tracking-wider'} href={'/programma'}>Programma</Link></li>
            <li><Link className={'font-semibold text-lg tracking-wider'} href={'/fotos'}>Foto's</Link></li>
            <li><Link className={'font-semibold text-lg tracking-wider'} href={'/contact'}>Contact</Link></li>
        </ul>
    </nav>

    return (
        <header className={'flex bg-primary items-center px-4 md:px-20'}>
            <Link href="/" className={'mr-auto'}>
                <Image className={'relative md:top-10 top-0 logo'} width={100} height={100} src={Logo} alt={'logo'}/>
            </Link>
            <div className={'md:hidden block'}>
                <FontAwesomeIcon className={'text-3xl mr-4'} icon={faBars} onClick={() => setOpen(!open)}/>
            </div>
            {
                open &&
                <div className={'fixed inset-0 bg-primary z-20 p-20 text-center'}>
                    <Link href="/" className={'absolute left-4 top-4'}>
                        <Image width={60} height={60} src={Logo} alt={'logo'}/>
                    </Link>
                    <div className={'flex h-full justify-center items-center'}>
                        {
                            nav
                        }
                    </div>
                </div>
            }
            <nav className={'ml-auto hidden md:block'}>
                <ul className={'flex-col flex md:flex-row gap-8'}>
                    <li><Link className={'font-semibold text-lg tracking-wider'} href={'/'}>Home</Link></li>
                    <li><Link className={'font-semibold text-lg tracking-wider'} href={'/programma'}>Programma</Link></li>
                    <li><Link className={'font-semibold text-lg tracking-wider'} href={'/fotos'}>Foto's</Link></li>
                    <li><Link className={'font-semibold text-lg tracking-wider'} href={'/contact'}>Contact</Link></li>
                </ul>
            </nav>
        </header>
    )
}
