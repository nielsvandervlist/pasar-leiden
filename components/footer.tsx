import Container from './container'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFacebook, faInstagram} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (
        <footer className="bg-primary py-10">
            <Container>
              <div className={'flex items-center justify-center'}>
                <h3 className={'text-text 3xl font-semibold tracking-wider'}>Pasar Leiden 2024</h3>
                <ul className={'ml-auto flex'}>
                    <li className={'mr-4'}>
                        <a href={'https://www.facebook.com/pasarleiden'}>
                            <FontAwesomeIcon className={'text-2xl text-text'} icon={faFacebook}/>
                        </a>
                    </li>
                    <li>
                        <a href={'https://www.instagram.com/pasarleiden'}>
                            <FontAwesomeIcon className={'text-2xl text-text'} icon={faInstagram}/>
                        </a>
                    </li>
                </ul>
              </div>
            </Container>
        </footer>
    )
}
