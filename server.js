const http = require('http')
const {parse} = require('url')
const next = require('next')
const io = require('socket.io')(3001)
const rxjs = require('rxjs')
const operators = require('rxjs/operators')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

const throttleTime = 100;
const intervals =  {min: 100, max: 2000};
const eventName = 'live-data';

const liveData = {
    temperature: 'N/A',
    airPressure: 'N/A',
    humidity: 'N/A'
};

const subj = new rxjs.BehaviorSubject(liveData);
subj
    .pipe(
        operators.throttleTime(throttleTime)
    )
    .subscribe(data => io.sockets.emit(eventName, data));

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateData(key, min, max) {
    liveData[key] = getRandomInt(min, max);
    subj.next(liveData);
    const nextInt = getRandomInt(intervals.min, intervals.max);
    setTimeout(() => generateData(key, min, max), nextInt);
}

io.sockets.on('connection', (socket) => {
    console.log('a user connected');
    generateData('temperature', 10, 40);
    generateData('airPressure', 970, 1030);
    generateData('humidity', 30, 100);
});

app.prepare().then(() => {
    http.createServer((req, res) => {
        const parsedUrl = parse(req.url, true)
        const {pathname, query} = parsedUrl

        if (pathname === '/') {
            app.render(req, res, '/', query)
        } else {
            handle(req, res, parsedUrl)
        }
    }).listen(3000, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
    })
})

