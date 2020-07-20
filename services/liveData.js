import {of, fromEvent} from 'rxjs'
import {map, switchMap, timeoutWith, retry} from 'rxjs/operators'
import io from 'socket.io-client'

const naData = {
    temperature: 'N/A',
    airPressure: 'N/A',
    humidity: 'N/A'
};
const eventName = 'live-data'
const maxTimeout = 1000
const socket = io(':3001')
const liveData$ = of(socket)
    .pipe(
        switchMap(socket =>
            fromEvent(socket, eventName)
                .pipe(
                    map((data) => data),
                    timeoutWith(maxTimeout, of(naData)),
                    retry()
                )
        )
    )
export {socket, liveData$}
