import Container from './container'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFacebook, faInstagram} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (
        <footer className="bg-primary py-10">
            <Container>
              <div className={'flex items-center justify-center'}>
                <h3 className={'text-text 3xl font-semibold tracking-wider'}>Pasar Leiden 2023</h3>
                <ul className={'ml-auto flex'}>
                    <li className={'mr-4'}>
                        <a href={'/'}>
                            <FontAwesomeIcon className={'text-2xl text-text'} icon={faFacebook}/>
                        </a>
                    </li>
                    <li>
                        <a href={'/'}>
                            <FontAwesomeIcon className={'text-2xl text-text'} icon={faInstagram}/>
                        </a>
                    </li>
                </ul>
              </div>
            </Container>
        </footer>
    )
}
