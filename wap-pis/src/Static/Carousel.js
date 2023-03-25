import Carousel from 'react-bootstrap/Carousel';
const hotel = require('../pictures/hotel.jpg');
const restaurant = require('../pictures/restaurant.jpg');
const wellnes = require('../pictures/wellnes.jpg');

function SlideShow() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={String(wellnes)}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Najlepší Wellness v okolí</h3>
          <p>Ponorte sa s nami do wellnesu plného zážitkov.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={String(hotel)}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Objavujte čaro Royal Palms hotela</h3>
          <p>Doprajte si tú najlepšiu dovolenku priamo u nás.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={String(restaurant)}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Vychutnajte si čato našej kuchyne</h3>
          <p>
            Domáca aj zahraničná kuchyňa plná tých najlepších kuchárov.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default SlideShow;