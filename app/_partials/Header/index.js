import './style.css';
import Link from 'next/link';
import links from './data';

function Header() {
    return(
        <header className="app__header">
            <div>
                <h1 className='font-bold text-3xl'>Todo-List</h1>
                <small className='text-xs text-slate-500'>Simple Todo-List app</small>
            </div>
            
            <nav className='app__header__nav'>
                <ul className='app__header__nav__list'>

                    {links.map(link => {
                        return (
                            <li className='app__header__nav__list__item'>
                                <Link 
                                    href={link.path} 
                                    className='app__header__nav__list__item__link'
                                >
                                    {link.label}
                                </Link>
                            </li>
                        )
                    })}

                </ul>
            </nav>
        </header>
    )
}

export default Header;