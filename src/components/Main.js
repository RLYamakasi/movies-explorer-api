import logo from "../images/logo.svg"
import link from "../images/link.svg"
import me from "../images/me.jpg"
const Main = (props) => {
    return(
        <main>
            <nav className="navbar">
                <div className="navbar__avatar">
                    <img src={logo} className="profile__avatar-img"/>
                </div>
                <a className="navbar__registration">Регистрация</a>
                <button className="navbar__login">Войти</button>
            </nav>
            <section className="info">
                <h1 className="info__title">Учебный проект студента факультета Веб-разработки.</h1>
                <div className="info__links">
                    <button className="info__link">О проекте</button>
                    <button className="info__link">Технологии</button>
                    <button className="info__link">Студент</button>
                    {/* <a >О проекте</a>
                    <a className="info__link">Технологии</a>
                    <a className="info__link">Студент</a> */}
                </div>
            </section>
            <section className="time-info">
                <h2 className="time-info__title">О проекте</h2>
                <div className="time-info__block-for-text">
                    <div className="time-info__text">
                        <h3 className="time-info__text_title">Дипломный проект включал 5 этапов</h3>
                        <p className="time-info__text_subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </div>
                    <div className="time-info__text">
                        <h3 className="time-info__text_title">На выполнение диплома ушло 5 недель</h3>
                        <p className="time-info__text_subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </div>
                </div>
                <div className="time-info__time-line">
                    <h4 className="time-info__backend-part">1 неделя</h4>
                    <p className="time-info__backend-part_text">Back-end</p>
                    <h4 className="time-info__frontend-part">4 недели</h4>
                    <p className="time-info__frontend-part_text">Front-end</p>
                </div>
            </section>
            <section className="technologies">
                <p className="technologies__title">Технологии</p>
                <div className="technologies__main-text">7 технологий</div>
                <div className="technologies__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</div>
                <div className="technologies__links">
                    <a className="technologies__link">HTML</a>
                    <a className="technologies__link">CSS</a>
                    <a className="technologies__link">JS</a>
                    <a className="technologies__link">React</a>
                    <a className="technologies__link">Git</a>
                    <a className="technologies__link">Express.js</a>
                    <a className="technologies__link">mongoDB</a>
                </div>
            </section>
            <section className="student">
                <p className="student__title">Студент</p>
                <div className="student__about-me">
                    <h5 className="student__name">Алексей</h5>
                    <p className="student__age-and-profession">будущий фронтенд-разработчик, 17 лет</p>
                    <p className="student__main-info">Я родился и живу в Волгограле, учусь в 11 классе. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. После того, как прошёл курс по веб-разработке, решил, что хочу стать веб-разработчиком.</p> 
                    <p className="student__git-link">Github</p>
                    <img className="student__image" src={me}/>
                </div>
            </section>
            <section className="portfolio">
                <p className="portfolio__title">Портфолио</p>
                <div className="portfolio__links">
                    <div className="portfolio__link"><p className="portfolio__link_text">Статичный сайт</p><img className="portfolio__link_img" src={link}/></div>
                    <div className="portfolio__link"><p className="portfolio__link_text">Адаптивный сайт</p><img className="portfolio__link_img" src={link}/></div>
                    <div className="portfolio__link"><p className="portfolio__link_text">Одностраничное приложение</p><img className="portfolio__link_img" src={link}/></div>
                </div>
            </section>
            <footer className="footer">
                <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                <div className="footer__info">
                    <div className="footer__info-year"><p>© 2023</p></div>
                    <div className="footer__info-other"><p>Яндекс.Практикум</p>
                    <p>Github</p></div>
                </div>
            </footer>
        </main>
    );
};

export default Main;