import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [
    'https://glasse.es/imagen/manofrutojos.jpeg',
    'https://glasse.es/imagen/ttkinderbueno.jpg',
    'https://glasse.es/imagen/selva.jpg',
    'https://glasse.es/imagen/tartasanmarcos.jpg',
  ];

  const goToPreviousSlide = () => {
    const index = (activeIndex - 1 + images.length) % images.length;
    setActiveIndex(index);
  };

  const goToNextSlide = () => {
    const index = (activeIndex + 1) % images.length;
    setActiveIndex(index);
  };

  return (
    <div className="home-container">
      <div className="background-container">
        <header>
          <img src="/932fc0720c1a47398c69cb7b727de4d1.png" alt="Pasteleria" />
        </header>
      </div>

      <div className="carousel">
        <button className="carousel-btn prev" onClick={goToPreviousSlide}>
          &larr;
        </button>


        <img src={images[activeIndex]} alt={`Slide ${activeIndex + 1}`} />

        <button className="carousel-btn next" onClick={goToNextSlide}>
          &rarr;
        </button>
      </div>
      <div className="card-container">
        <div className="card">
          
          <img src="http://photos.wikimapia.org/p/00/04/93/65/63_1280.jpg" alt="Pastel New York Roll" />
          <p>Nuestro equipo de expertos pasteleros trabaja 
            con dedicación y pasión para crear auténticas obras de arte comestibles.
            Utilizamos ingredientes frescos y de primera calidad 
            para garantizar que cada producto que sale de nuestro obrador 
            sea una experiencia inigualable para tu paladar.</p>
        </div>
        <div className="card">

          <img src="https://madriddiferente.com/wp-content/uploads/2023/02/MAISON-KAYSER-NY-rolls-01-770x466.jpg" alt="Pastel New York Roll" />
          <p>
            La fiebre de New York ha llegado a nuestra Pasteleria,
            Estos pasteles se caracterizan por tener una masa de cruasán ligera y esponjosa,
            rellena de una suave y cremosa mezcla de crema pastelera y mermelada (Entre otros sabores).
            Cada bocado de un New York Roll es una experiencia única,
            donde se fusionan los sabores dulces y los contrastes de texturas.
            
          </p>
        </div>

        <div className="card">

          <img src="https://cdn.shopify.com/s/files/1/0512/4784/1450/products/DSC_0712_edit_503x.jpg?v=1647451451" alt="Bandeja pasteles" />
          <p>En nuestra pastelería, nos enorgullece ofrecerte
            productos frescos y deliciosos que deleitarán tus sentidos.
            Cada detalle es importante para nosotros,
            desde la selección de los ingredientes
            hasta la presentación final de nuestros productos.
            Nos esforzamos por superar tus expectativas y crear momentos dulces inolvidables.
          </p>
        </div>
      </div>
    </div>

  );
};

export default Home;
