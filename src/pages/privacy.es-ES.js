import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout from '../components/Layout';

const IndexPage = props => {
  const {
    pageContext: { langKey },
    location: { pathname },
  } = props;
  return (
    <Layout lang={langKey}>
      <Header lang={langKey} pathname={pathname} />
      <div
        style={{
          paddingTop: '60px',
          marginRight: '20px',
          marginLeft: '20px',
          marginBottom: '40px',
        }}
      >
        <h2>Política de Privacidad </h2>
        <p>
          <code>Fundación Alicia Alonso</code> te informa sobre su Política de
          Privacidad respecto del tratamiento y protección de los datos de
          carácter personal de los usuarios y clientes que puedan ser recabados
          por la navegación o contratación de servicios a través del sitio Web{' '}
          <code>alicialonso.org</code>.
        </p>
        <p>
          En este sentido, Fundación Alicia Alonso garantiza el cumplimiento de
          la normativa vigente en materia de protección de datos personales,
          reflejada en la Ley Orgánica 15⁄1999, de 13 de diciembre, de
          Protección de Datos de Carácter Personal (LOPD), y al Real Decreto
          1720⁄2007, de 21 de diciembre, conocido como el Reglamento de
          desarrollo de la LOPD. Cumple también con el Reglamento (UE) 2016⁄679
          del Parlamento Europeo y del Consejo de 27 de abril de 2016 relativo a
          la protección de las personas físicas (RGPD).
        </p>
        <p>
          El uso de sitio Web implica la aceptación de esta Política de
          Privacidad así como las condiciones incluidas en el Aviso Legal.
        </p>
        <h3>Identidad del responsable</h3>
        <ul>
          <li>
            Titular: <code>Fundación Alicia Alonso</code>
          </li>
          <li>
            NIF/CIF: <code>G-81731705</code>
          </li>
          <li>
            Domicilio:{' '}
            <code>Camino del Molino SN, 28943 Fuenlabrada Madrid</code>.
          </li>
          <li>
            Correo electrónico: <code>admin@alicialonso.org</code>
          </li>
          <li>
            Dominio: <code>alicialonso.org</code>
          </li>
        </ul>
        <h3>Principios aplicados en el tratamiento de datos</h3>
        <p>
          En el tratamiento de tus datos personales, Fundación Alicia Alonso
          aplicará los siguientes principios que se ajustan a las exigencias del
          nuevo reglamento europeo de protección de datos:
        </p>
        <ul>
          <li>
            <strong>Principio de licitud, lealtad y transparencia:</strong>{' '}
            Fundación Alicia Alonso siempre requerirá el consentimiento para el
            tratamiento de tus datos personales que puede ser para uno o varios
            fines específicos sobre los que te informará previamente con
            absoluta transparencia.
          </li>
          <li>
            <strong>Principio de minimización de datos:</strong> Fundación
            Alicia Alonso te solicitará solo los datos estrictamente necesarios
            para el fin o los fines que los solicita.
          </li>
          <li>
            <strong>Principio de limitación del plazo de conservación:</strong>{' '}
            Los datos se mantendrán durante el tiempo estrictamente necesario
            para el fin o los fines del tratamiento. Fundación Alicia Alonso te
            informará del plazo de conservación correspondiente según la
            finalidad. En el caso de suscripciones, Fundación Alicia Alonso
            revisará periódicamente las listas y eliminará aquellos registros
            inactivos durante un tiempo considerable.
          </li>
          <li>
            <strong>Principio de integridad y confidencialidad:</strong> Tus
            datos serán tratados de tal manera que su seguridad,
            confidencialidad e integridad esté garantizada. Debes saber que
            Fundación Alicia Alonso toma las precauciones necesarias para evitar
            el acceso no autorizado o uso indebido de los datos de sus usuarios
            por parte de terceros.
          </li>
        </ul>
        <h3>Obtención de datos personales</h3>
        <p>
          Para navegar por <code>alicialonso.org</code> o para hacer uso de
          cualquiera de sus aplicaciones no es necesario que facilites ningún
          dato personal. Los casos en los que sí proporcionas tus datos
          personales son los siguientes:
        </p>
        <ul>
          <li>
            Al contactar a través de los formularios de contacto o enviar un
            correo electrónico.
          </li>
          <li>Al realizar un comentario en un artículo o página.</li>
          <li>
            Al inscribirte en un formulario de suscripción o un boletín que
            Fundación Alicia Alonso gestiona con MailChimp.
          </li>
          <li>
            Al inscribirte en un formulario de suscripción o un boletín que
            Fundación Alicia Alonso gestiona con MailRelay.
          </li>
          <li>
            Al inscribirte en un formulario de suscripción o un boletín que
            Fundación Alicia Alonso gestiona con SendinBlue.
          </li>
        </ul>
        <h3>Tus derechos</h3>
        <p>
          Fundación Alicia Alonso te informa que sobre tus datos personales
          tienes derecho a:
        </p>
        <ul>
          <li>Solicitar el acceso a los datos almacenados.</li>
          <li>Solicitar una rectificación o la cancelación.</li>
          <li>Solicitar la limitación de su tratamiento.</li>
          <li>Oponerte al tratamiento.</li>
          <li>Solicitar la portabilidad de tus datos.</li>
        </ul>
        <p>
          El ejercicio de estos derechos es personal y por tanto debe ser
          ejercido directamente por el interesado, solicitándolo directamente al
          Titular, lo que significa que cualquier cliente, suscriptor o
          colaborador que haya facilitado sus datos en algún momento puede
          dirigirse al Titular y pedir información sobre los datos que tiene
          almacenados y cómo los ha obtenido, solicitar la rectificación de los
          mismos, solicitar la portabilidad de sus datos personales, oponerse al
          tratamiento, limitar su uso o solicitar la cancelación de esos datos
          en los ficheros dFundación Alicia Alonso.
        </p>
        <p>
          Para ejercitar tus derechos de acceso, rectificación, cancelación,
          portabilidad y oposición tienes que enviar un correo electrónico a{' '}
          <code>admin@alicialonso.org</code> junto con la prueba válida en
          derecho como una fotocopia del D.N.I. o equivalente.
        </p>
        <p>
          Tienes derecho a la tutela judicial efectiva y a presentar una
          reclamación ante la autoridad de control, en este caso, la Agencia
          Española de Protección de Datos, si consideras que el tratamiento de
          datos personales que te conciernen infringe el Reglamento.
        </p>
        <h3>Finalidad del tratamiento de datos personales</h3>
        <p>
          Cuando te conectas al sitio Web para mandar un correo al Titular, te
          suscribes a su boletín o realizas una contratación, estás facilitando
          información de carácter personal de la que el responsable es Fundación
          Alicia Alonso. Esta información puede incluir datos de carácter
          personal como pueden ser tu dirección IP, nombre y apellidos,
          dirección física, dirección de correo electrónico, número de teléfono,
          y otra información. Al facilitar esta información, das tu
          consentimiento para que tu información sea recopilada, utilizada,
          gestionada y almacenada por superadmin.es , sólo como se describe en
          el Aviso Legal y en la presente Política de Privacidad.
        </p>
        <p>
          Los datos personales y la finalidad del tratamiento por parte de
          Fundación Alicia Alonso es diferente según el sistema de captura de
          información:
        </p>
        <ul>
          <li>
            <strong>Formularios de contacto:</strong> Fundación Alicia Alonso
            solicita datos personales entre los que pueden estar: Nombre y
            apellidos, dirección de correo electrónico, número de teléfono y
            dirección de tu sitio Web con la finalidad de responder a tus
            consultas. Por ejemplo, Fundación Alicia Alonso utiliza esos datos
            para dar respuesta a tus mensajes, dudas, quejas, comentarios o
            inquietudes que puedas tener relativas a la información incluida en
            el sitio Web, los servicios que se prestan a través del sitio Web,
            el tratamiento de tus datos personales, cuestiones referentes a los
            textos legales incluidos en el sitio Web, así como cualquier otra
            consulta que puedas tener y que no esté sujeta a las condiciones del
            sitio Web o de la contratación.
          </li>
          <li>
            <strong>Formularios de suscripción a contenidos:</strong> Fundación
            Alicia Alonso solicita los siguientes datos personales: Nombre y
            apellidos, dirección de correo electrónico, número de teléfono y
            dirección de tu sitio web para gestionar la lista de suscripciones,
            enviar boletines, promociones y ofertas especiales. Los datos que
            facilites al Titular estarán ubicados en los servidores de The
            Rocket Science Group LLC d/b/a, con domicilio en EEUU. (Mailchimp).
          </li>
        </ul>
        <p>
          Existen otras finalidades por las que Fundación Alicia Alonso trata
          tus datos personales:
        </p>
        <ul>
          <li>
            Para garantizar el cumplimiento de las condiciones recogidas en el
            Aviso Legal y en la ley aplicable. Esto puede incluir el desarrollo
            de herramientas y algoritmos que ayuden a este sitio Web a
            garantizar la confidencialidad de los datos personales que recoge.
          </li>
          <li>
            Para apoyar y mejorar los servicios que ofrece este sitio Web.
          </li>
          <li>
            Para analizar la navegación. Fundación Alicia Alonso recoge otros
            datos no identificativos que se obtienen mediante el uso de cookies
            que se descargan en tu ordenador cuando navegas por el sitio Web
            cuyas caracterísiticas y finalidad están detalladas en la Política
            de Cookies .
          </li>
          <li>
            Para gestionar las redes sociales. Fundación Alicia Alonso tiene
            presencia en redes sociales. Si te haces seguidor en las redes
            sociales dFundación Alicia Alonso el tratamiento de los datos
            personales se regirá por este apartado, así como por aquellas
            condiciones de uso, políticas de privacidad y normativas de acceso
            que pertenezcan a la red social que proceda en cada caso y que has
            aceptado previamente.
          </li>
        </ul>
        <p>
          Fundación Alicia Alonso tratará tus datos personales con la finalidad
          de administrar correctamente su presencia en la red social, informarte
          de sus actividades, productos o servicios, así como para cualquier
          otra finalidad que las normativas de las redes sociales permitan.
        </p>
        <p>
          En ningún caso Fundación Alicia Alonso utilizará los perfiles de
          seguidores en redes sociales para enviar publicidad de manera
          individual.
        </p>
        <h3>Seguridad de los datos personales</h3>
        <p>
          Para proteger tus datos personales, Fundación Alicia Alonso toma todas
          las precauciones razonables y sigue las mejores prácticas de la
          industria para evitar su pérdida, mal uso, acceso indebido,
          divulgación, alteración o destrucción de los mismos.
        </p>
        <p>
          El sitio Web está alojado en <code>Netlify</code>. La seguridad de tus
          datos está garantizada, ya que toman todas las medidas de seguridad
          necesarias para ello. Puedes consultar su política de privacidad para
          tener más información.
        </p>
        <h3>Contenido de otros sitios web</h3>
        <p>
          Las páginas de este sitio Web pueden incluir contenido incrustado (por
          ejemplo, vídeos, imágenes, artículos, etc.). El contenido incrustado
          de otras web se comporta exactamente de la misma manera que si
          hubieras visitado la otra web.
        </p>
        <p>
          Estos sitios Web pueden recopilar datos sobre ti, utilizar cookies,
          incrustar un código de seguimiento adicional de terceros, y supervisar
          tu interacción usando este código.
        </p>
        <h3>Política de Cookies</h3>
        <p>
          Para que este sitio Web funcione correctamente necesita utilizar
          cookies, que es una información que se almacena en tu navegador web.
        </p>
        <p>
          En la página Política de Cookies puedes consultar toda la información
          relativa a la política de recogida, la finalidad y el tratamiento de
          las cookies.
        </p>
        <h3>Legitimación para el tratamiento de datos</h3>
        <p>
          La base legal para el tratamiento de tus datos es: el consentimiento.
        </p>
        <p>
          Para contactar con Fundación Alicia Alonso, suscribirte a un boletín o
          realizar comentarios en este sitio Web tienes que aceptar la presente
          Política de Privacidad.
        </p>
        <h3>Categorías de datos personales</h3>
        <p>
          Las categorías de datos personales que trata Fundación Alicia Alonso
          son:
        </p>
        <ul>
          <li>Datos identificativos.</li>
        </ul>
        <h3>Conservación de datos personales</h3>
        <p>
          Los datos personales que proporciones al Titular se conservarán hasta
          que solicites su supresión.
        </p>
        <h3>Destinatarios de datos personales</h3>
        <ul>
          <li>
            <strong>Google Analytics</strong> es un servicio de analítica web
            prestado por Google, Inc., una compañía de Delaware cuya oficina
            principal está en 1600 Amphitheatre Parkway, Mountain View
            (California), CA 94043, Estados Unidos (“Google”). Encontrarás más
            información en:{' '}
            <strong>
              <a
                href="https://analytics.google.com"
                target="_blank"
                class="url"
              >
                https://analytics.google.com
              </a>
            </strong>{' '}
            Google Analytics utiliza “cookies”, que son archivos de texto
            ubicados en tu ordenador, para ayudar al Titular a analizar el uso
            que hacen los usuarios del sitio Web. La información que genera la
            cookie acerca del uso del sitio Web (incluyendo tu dirección IP)
            será directamente transmitida y archivada por Google en los
            servidores de Estados Unidos.
          </li>
        </ul>
        <p>
          También puedes ver una lista de los tipos de cookies que utiliza
          Google y sus colaboradores y toda la información relativa al uso que
          hacen de cookies publicitarias.
        </p>
        <h3>Navegación Web</h3>
        <p>
          Al navegar por <code>alicialonso.org</code> se pueden recoger datos no
          identificativos, que pueden incluir, la dirección IP, geolocalización,
          un registro de cómo se utilizan los servicios y sitios, hábitos de
          navegación y otros datos que no pueden ser utilizados para
          identificarte.
        </p>
        <p>
          El sitio Web utiliza los siguientes servicios de análisis de terceros:
        </p>
        <ul>
          <li>Google Analytics</li>
        </ul>
        <p>
          Fundación Alicia Alonso utiliza la información obtenida para obtener
          datos estadísticos, analizar tendencias, administrar el sitio,
          estudiar patrones de navegación y para recopilar información
          demográfica.
        </p>
        <h3>Exactitud y veracidad de los datos personales</h3>
        <p>
          Te comprometes a que los datos facilitados a Fundación Alicia Alonso
          sean correctos, completos, exactos y vigentes, así como a mantenerlos
          debidamente actualizados.
        </p>
        <p>
          Como Usuario del sitio Web eres el único responsable de la veracidad y
          corrección de los datos que remitas al sitio exonerando a Fundación
          Alicia Alonso de cualquier responsabilidad al respecto.
        </p>
        <h3>Aceptación y consentimiento</h3>
        <p>
          Como Usuario del sitio Web declaras haber sido informado de las
          condiciones sobre protección de datos de carácter personal, aceptas y
          consientes el tratamiento de los mismos por parte de Fundación Alicia
          Alonso en la forma y para las finalidades indicadas en esta Política
          de Privacidad.
        </p>
        <h3>Revocabilidad</h3>
        <p>
          Para ejercitar tus derechos de acceso, rectificación, cancelación,
          portabilidad y oposición tienes que enviar un correo electrónico a{' '}
          <code>admin@alicialonso.org</code> junto con la prueba válida en
          derecho como una fotocopia del D.N.I. o equivalente.
        </p>
        <p>
          El ejercicio de tus derechos no incluye ningún dato que Fundación
          Alicia Alonso esté obligado a conservar con fines administrativos,
          legales o de seguridad.
        </p>
        <h3>Cambios en la Política de Privacidad</h3>
        <p>
          Fundación Alicia Alonso se reserva el derecho a modificar la presente
          Política de Privacidad para adaptarla a novedades legislativas o
          jurisprudenciales, así como a prácticas de la industria.
        </p>
        <p>
          Estas políticas estarán vigentes hasta que sean modificadas por otras
          debidamente publicadas.
        </p>
      </div>
      <Footer />
    </Layout>
  );
};

export default IndexPage;
