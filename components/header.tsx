import Link from 'next/link'
import Image from "next/image";
import Logo from '../public/logo.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {useRouter} from 'next/router'
import classNames from "classnames";


export default function Header() {

    const [open, setOpen] = useState(false)
    const router = useRouter();

    const links = [
        {
            name: 'Home',
            href: '/',
        },
        {
            name: 'Programma',
            href: '/programma'
        },
        {
            name: 'Fotos',
            href: '/fotos'
        },
        {
            name: 'Contact',
            href: '/contact',
        }
    ]

    const nav = <nav className={'lg:ml-auto'}>
        <ul className={'flex-col flex md:flex-row gap-8'}>
            {
                links.map((link, index) => {
                    return <li key={index}><Link className={classNames('font-semibold text-lg tracking-wider',
                        {'border-b-[3px] border-secondary': router.asPath === link.href}
                    )} href={link.href}>{link.name}</Link></li>
                })
            }
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
                    {
                        nav
                    }
                </ul>
            </nav>
        </header>
    )
}
