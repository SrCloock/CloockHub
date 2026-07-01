import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Política de Privacidad — SrCloock',
};

export default function Privacidad() {
  return (
    <>
      <Header />
      <section className="page-section">
        <div className="wrap legal">
          <div className="section-head">
            <span className="eyebrow">// legal</span>
            <h2>Política de Privacidad</h2>
          </div>

          <p className="legal-updated">Última actualización: julio de 2026.</p>

          <h3>1. Responsable del tratamiento</h3>
          <p>
            El responsable de esta web es SrCloock (en adelante, "nosotros" o "el titular"). Para cualquier
            cuestión relacionada con tus datos personales puedes escribir a{' '}
            <a href="mailto:srcloock.info@gmail.com">srcloock.info@gmail.com</a>.
          </p>

          <h3>2. Qué datos recogemos</h3>
          <p>Recogemos únicamente los datos que nos facilitas de forma voluntaria:</p>
          <ul>
            <li><strong>Formulario de contacto:</strong> nombre, email y el contenido del mensaje.</li>
            <li>
              <strong>Inicio de sesión con TikTok (Login Kit):</strong> si eliges conectar tu cuenta de TikTok,
              recibimos los datos básicos de perfil que tú autorizas (nombre de usuario, foto de perfil) y un
              token de acceso limitado al alcance que hayas aprobado.
            </li>
            <li>
              <strong>Publicación de contenido (Content Posting API):</strong> si autorizas la conexión, podemos
              publicar contenido en tu nombre en TikTok, únicamente cuando tú lo solicites explícitamente.
            </li>
          </ul>

          <h3>3. Para qué usamos tus datos</h3>
          <ul>
            <li>Responder a tus mensajes de contacto.</li>
            <li>Permitirte iniciar sesión o vincular tu cuenta de TikTok, si lo activas.</li>
            <li>Publicar contenido en TikTok en tu nombre, solo cuando tú lo pidas.</li>
          </ul>
          <p>No usamos tus datos con fines publicitarios ni los vendemos a terceros.</p>

          <h3>4. Dónde se almacenan tus datos</h3>
          <p>
            Los datos del formulario de contacto se almacenan en Supabase (base de datos gestionada, alojada en
            la UE/UK según región del proyecto). La web está desplegada en Vercel. Ambos proveedores actúan como
            encargados del tratamiento y cumplen con el RGPD.
          </p>

          <h3>5. Conservación</h3>
          <p>
            Conservamos los mensajes de contacto el tiempo necesario para atender tu consulta y, como máximo,
            12 meses, salvo obligación legal de conservarlos más tiempo.
          </p>

          <h3>6. Tus derechos</h3>
          <p>
            Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad
            escribiendo a <a href="mailto:srcloock.info@gmail.com">srcloock.info@gmail.com</a>. También puedes
            revocar en cualquier momento el permiso de acceso a tu cuenta de TikTok desde los ajustes de tu
            cuenta de TikTok.
          </p>

          <h3>7. Cookies</h3>
          <p>
            Esta web no utiliza cookies de analítica ni de publicidad. Si en el futuro se incorporan, se
            actualizará esta política y se pedirá tu consentimiento cuando sea necesario.
          </p>

          <h3>8. Cambios en esta política</h3>
          <p>
            Podemos actualizar esta política para reflejar cambios legales o del servicio. La fecha de última
            actualización aparece al principio de esta página.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
