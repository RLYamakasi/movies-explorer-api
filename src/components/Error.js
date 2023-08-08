import { React } from "react";
import { useNavigate } from "react-router-dom";
const Error = () => {
  const navigate = useNavigate();
  function goBack() {
    navigate(-1);
  }
  return (
    <section className="error">
      <header></header>
      <main>
        <p className="error__title">404</p>
        <p className="error__subtitle">Страница не найдена</p>
        <p
          className="error__exit"
          onClick={() => {
            goBack();
          }}
        >
          Назад
        </p>
      </main>
      <footer></footer>
    </section>
  );
};

export default Error;
