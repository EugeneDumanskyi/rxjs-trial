import React from 'react'
import styles from './AirData.module.css'

export default class AirData extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const blockT = `${styles.block} ${styles.block__t}`
        const blockA = `${styles.block} ${styles.block__a}`
        const blockH = `${styles.block} ${styles.block__h}`
        const liveData = this.props.liveData || {
            temperature: 'N/A',
            airPressure: 'N/A',
            humidity: 'N/A'
        }
        return (
            <div className={styles.grid}>
                <div className={blockT}>
                    <div className={styles.block_title}>Temperature</div>
                    <div className={styles.block_body}>{liveData.temperature} ℃</div>
                </div>
                <div className={blockA}>
                    <div className={styles.block_title}>Air Pressure</div>
                    <div className={styles.block_body}>{liveData.airPressure} hPa</div>
                </div>
                <div className={blockH}>
                    <div className={styles.block_title}>Humidity</div>
                    <div className={styles.block_body}>{liveData.humidity}%</div>
                </div>
            </div>
        )
    }
}
