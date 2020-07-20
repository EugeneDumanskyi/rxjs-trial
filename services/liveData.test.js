import {liveData$} from './liveData';


const socketDataTest = (testCb, done) => {
    const s = liveData$.subscribe((data) => {
        testCb(data);
        s.unsubscribe();
        done();
    });
}

describe('data format', () => {
    it("should be an object", (done) => {
        socketDataTest(
            (data) => expect(data).toBeInstanceOf(Object),
            done);
    });

    it("should have all mandatory properties", (done) => {
        socketDataTest(
            (data) => {
                expect(data).toHaveProperty('airPressure');
                expect(data).toHaveProperty('humidity');
                expect(data).toHaveProperty('temperature');
            },
            done);
    });

    it("should receive a message", (done) => {
        socketDataTest(
            (data) => expect(data).toEqual({"airPressure": "N/A", "humidity": "N/A", "temperature": "N/A"}),
            done);
    });
});

