import logo from "../images/logo.svg"
const Account=()=>{
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
            <section className="account">
                <h1 className="account__title">Привет, Алексей!</h1>
                <div className="account__block">
                    <div className="account__block-name">
                        <p className="account__block-name_text">Имя</p>
                        <p className="account__block-name_value">Алексей</p>
                    </div>
                    <div className="account__block-email">
                        <p className="account__block-email_text">E-mail</p>
                        <p className="account__block-email_value">pochta@yandex.ru</p>
                    </div>
                </div>
                <p className="account__content">Редактировать</p>
                <p className="account__content">Выйти из аккаунта</p>
            </section>
        </main>
    );
};

export default Account;