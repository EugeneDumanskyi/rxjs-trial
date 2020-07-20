import React from 'react'
import Head from 'next/head'
import AirData from '../components/AirData';
import {liveData$} from '../services/liveData';


export default class Home extends React.Component {
    subs = null;
    constructor(props) {
        super(props);
        this.state = {liveData: {}};
    }

    componentDidMount() {
        this.subs = liveData$.subscribe((data) => this.setState({liveData: data}));
    }

    componentWillUnmount() {
        if (this.subs) {
            this.subs.unsubscribe();
        }
    }

    render() {
        return (
            <div className="container">
                <Head>
                    <title>Dashboard</title>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>

                <main>
                    <h1 className="title">Dashboard</h1>
                    <AirData liveData={this.state.liveData}/>
                </main>

                <style jsx>{`
                    .container {
                      min-height: 100vh;
                      padding: 0 0.5rem;
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                    }
                
                    main {
                      padding: 5rem 0;
                      flex: 1;
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                    }
                  `}
                </style>

                <style jsx global>{`
                    html,
                    body {
                      padding: 0;
                      margin: 0;
                      background-color: #fafafa;
                      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                        Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                        sans-serif;
                    }
                
                    * {
                      box-sizing: border-box;
                    }
                  `}
                </style>
            </div>
        )
    }
}
