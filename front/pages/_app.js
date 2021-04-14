import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Head from 'next/head';

const App = ({ Component }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>데이스코어</title>
            </Head>
            <Component />
        </>
    );
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
}

export default App;
