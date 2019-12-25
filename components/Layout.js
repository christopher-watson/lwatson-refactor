import Head from 'next/head';
import { MyProvider } from '../utils/Context';

const Layout = props => (
  <div>
    <Head>
      <title>Lindsay Watson | Portfolio</title>
      <link rel='icon' href='/favicon.ico' />
      <link
        rel='stylesheet'
        href='https://use.fontawesome.com/releases/v5.5.0/css/all.css'
      />
      <link
        rel='stylesheet'
        href='https://fonts.googleapis.com/css?family=Raleway|Raleway+Dots|Montserrat'
      />
      <script
        src='https://widget.cloudinary.com/v2.0/global/all.js'
        type='text/javascript'></script>
    </Head>
    <MyProvider>
      <div className='container'>{props.children}</div>
    </MyProvider>
  </div>
);

export default Layout;
