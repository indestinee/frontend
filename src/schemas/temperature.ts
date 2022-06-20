import {randomIntArray} from '../utils/random';

export interface TemperatureResponse {
  temperatures: number[],
};

export const exampleTemperatureResponse: TemperatureResponse = {
  temperatures: [10, 20, 55, 60, 65, 66, 73],
};

export const getRandomTemperatureResponse = () => ({
  temperatures: randomIntArray(10, 100),
});
