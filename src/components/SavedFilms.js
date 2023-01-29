import logo from "../images/logo.svg"
import search from "../images/search.svg"
import find from "../images/find.svg"
import closeicon from "../images/closeIcon.svg"
import randomPic from "../images/randompic.png"
const SavedFilms = (props) => {
    return(
    <main>
        <nav className="navbar">
            <div className="navbar__avatar">
                <img src={logo} className="profile__avatar-img"/>
            </div>
            <a className="navbar__films">Фильмы</a>
            <a className="navbar__saved-films">Сохранённые фильмы</a>
            <a className="navbar__account">Аккаунт</a>
        </nav>
        <section className="search">
        <label className="search__label">
            <img src={search} className="search__icon"/>
            <input
            type="url"
            className="search__films"
            id="url"
            placeholder="Фильм"
            required
            />
            <img src={find} className="search__button"></img>
            <label className="search__checkbox">
                <input className="search__checkbox_input" type="checkbox"/>
                <span class="search__checkbox_slider"></span>
            </label>
            <p className="search__checkbox-text">Короткометражки</p>
        <span id="url-error" className="search__error">
        </span>
        </label>
        </section>
        <section className="films">
            <div className="films__block">
            <p className="films__text-block">33 слова о дизайне</p>
                <p className="films__time-block">1ч 47м</p>
                <div className="films__ico-block"><img className="films__ico-block_img" src={closeicon}/></div>
                <img className="films__img-block" src={randomPic}/>
            </div>
            <div className="films__block">
            <p className="films__text-block">33 слова о дизайне</p>
                <p className="films__time-block">1ч 47м</p>
                <div className="films__ico-block"><img className="films__ico-block_img" src={closeicon}/></div>
                <img className="films__img-block" src={randomPic}/>
            </div>
            <div className="films__block">
                <p className="films__text-block">33 слова о дизайне</p>
                <p className="films__time-block">1ч 47м</p>
                <div className="films__ico-block"><img className="films__ico-block_img" src={closeicon}/></div>
                <img className="films__img-block" src={randomPic}/>
            </div>
        </section>
        <footer className="footer">
                <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                <div className="footer__line"></div>
                <div className="footer__info">
                    <div className="footer__info-year"><p>© 2023</p></div>
                    <div className="footer__info-other"><p>Яндекс.Практикум</p>
                    <p>Github</p></div>
                </div>
            </footer>
    </main>
    );
};

export default SavedFilms;