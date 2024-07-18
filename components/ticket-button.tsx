import React, {useEffect, useRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import Button from "./button";
import classNames from "classnames";

const TicketButton = () => {
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const buttonRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth <= 768) {
                const scrollPosition = window.innerHeight + window.scrollY;
                const documentHeight = document.documentElement.scrollHeight;

                if (documentHeight - scrollPosition <= 100) {
                    setIsButtonVisible(false);
                } else {
                    setIsButtonVisible(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Button
            href={'/payments'}
            variant={'primaryFilled'}
            ref={buttonRef}
            className={classNames('fixed-btn items-center flex gap-2 md:hidden', {
                'hidden': !isButtonVisible
            })}
        >
            Tickets <FontAwesomeIcon className={'text-[20px]'} icon={faTicket}/>
        </Button>
    );
};

export default TicketButton;
