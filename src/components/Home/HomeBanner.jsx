import { Accordion, Card, useAccordionButton } from "react-bootstrap";
import bannerImg from "../../img/pizza-removebg-preview.png";

function HomeBanner() {
	function CustomToggle({ children, eventKey }) {
		const decoratedOnClick = useAccordionButton(eventKey);

		return (
			<button
				type="button"
				className="home-banner__btn rounded-pill px-3 py-2 w-100"
				onClick={decoratedOnClick}
			>
				{children}
			</button>
		);
	}

	return (
    <div className="home-banner">
      <Accordion>
        <Card className="border-0 p-3">
          <Card.Header className="home-banner__header border-0 d-flex align-items-center flex-md-row flex-column">
            <div className="home-banner__img me-4">
              <img src={bannerImg} alt="banner img" />
            </div>
            <div>
              <h2>Доставка піци Pizza-Shop</h2>
              <p>
                Планова та швидка доставка найсмачнішої піци від Pizza-Shop по
                всій Україні, унікальний асортимент піц власного виготовлення,
                найкраща якість та гарантія неймовірного смаку.
              </p>
            </div>
          </Card.Header>
          <Accordion.Collapse
            eventKey="0"
            className="home-banner__body border-0"
          >
            <Card.Body className="row gap-3">
              <div className="col-md col-12">
                <h3>Шалена швидкість доставки від Pizza-Shop!</h3>
                <p>
                  Обирайте швидку доставку, щоб ви могли не лише розгорнуто
                  оглянути наше безмежно смачне меню, але і додати до свого
                  замовлення більше ароматних смаколиків. Захопливою перевагою
                  нашої шаленої доставки є можливість насолоджуватися піцею вже
                  тут і зараз!
                </p>
              </div>
              <div className="col-md col-12">
                <h3>Pizza-Shop — це не просто їжа.</h3>
                <p>
                  Ми гарантуємо вам подорож в кулінарний рай, де кожен шматочок
                  піци — це танець відчуттів. Дозвольте собі це задоволення і на
                  вас чекає справжня симфонія смаку та вражень!
                </p>
              </div>
            </Card.Body>
          </Accordion.Collapse>
          <Card.Footer className="home-banner__footer border-0">
            <CustomToggle eventKey="0">Читати все</CustomToggle>
          </Card.Footer>
        </Card>
      </Accordion>
    </div>
  );
}

export default HomeBanner;