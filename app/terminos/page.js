import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Términos de Servicio — SrCloock',
};

export default function Terminos() {
  return (
    <>
      <Header />
      <section className="page-section">
        <div className="wrap legal">
          <div className="section-head">
            <span className="eyebrow">// legal</span>
            <h2>Términos de Servicio</h2>
          </div>

          <p className="legal-updated">Última actualización: julio de 2026.</p>

          <h3>1. Aceptación de los términos</h3>
          <p>
            Al acceder o usar esta web (en adelante, "el Servicio") aceptas estos Términos de Servicio. Si no
            estás de acuerdo, por favor no utilices el Servicio.
          </p>

          <h3>2. Descripción del Servicio</h3>
          <p>
            SrCloock es una web personal que muestra proyectos, una tienda de merchandising, contenido de redes
            sociales/streaming y un formulario de contacto. También ofrece integración opcional con TikTok
            (inicio de sesión y publicación de contenido) para el titular y, en su caso, usuarios autorizados.
          </p>

          <h3>3. Uso de la integración con TikTok</h3>
          <ul>
            <li>La conexión con TikTok es siempre voluntaria y requiere tu autorización explícita.</li>
            <li>Solo se publicará contenido en tu nombre cuando tú lo solicites de forma expresa.</li>
            <li>Puedes revocar el acceso en cualquier momento desde los ajustes de tu cuenta de TikTok.</li>
            <li>El uso de la API de TikTok a través de este Servicio está sujeto también a las condiciones de TikTok for Developers.</li>
          </ul>

          <h3>4. Tienda</h3>
          <p>
            Los productos mostrados en la sección de Tienda son informativos; cualquier compra se procesará a
            través de la pasarela de pago indicada en el momento de la compra, sujeta a sus propias condiciones.
          </p>

          <h3>5. Propiedad intelectual</h3>
          <p>
            El contenido de esta web (textos, diseño, marca "SrCloock" y material audiovisual propio) pertenece
            a su titular. No está permitida su reproducción sin autorización, salvo cita con enlace a la fuente.
          </p>

          <h3>6. Limitación de responsabilidad</h3>
          <p>
            El Servicio se ofrece "tal cual". No garantizamos disponibilidad ininterrumpida ni ausencia total de
            errores. No nos hacemos responsables de daños derivados del uso indebido del Servicio o de servicios
            de terceros (TikTok, pasarelas de pago, redes sociales) enlazados desde esta web.
          </p>

          <h3>7. Modificaciones</h3>
          <p>
            Podemos actualizar estos Términos en cualquier momento; los cambios se reflejarán en esta página con
            la fecha de última actualización.
          </p>

          <h3>8. Legislación aplicable</h3>
          <p>Estos Términos se rigen por la legislación española.</p>

          <h3>9. Contacto</h3>
          <p>
            Para cualquier duda sobre estos Términos, escribe a{' '}
            <a href="mailto:srcloock.info@gmail.com">srcloock.info@gmail.com</a>.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
