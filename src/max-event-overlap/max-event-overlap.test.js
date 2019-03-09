/*
Given a list of events, each with a start time and an end time, and a set of N reporters who are
available to be assigned to those events, determine whether it's possible to cover all of the
events. Covering an event means a reporter is there for the full duration of the event.
Assume that all the events are close enough that we can neglect travel time between events, i.e.
if one event ends at 4pm and another begins at 4pm then the same reporter can cover both events.
*/

// Logic to be tested
const {findMaxConcurrency, canCoverWith} = require("./max-event-overlap");

const NEEDS_ONE = [
  [1, 5],
];

// End of first event matches start of next event.
const CAN_BE_DONE_WITH_ONE = [
  [4, 7],
  [7, 9],
  [9, 10],
  [10, 16],
];

// Busiest time period is 5 - 5:30pm with 7 events happening concurrently.
const NEEDS_SEVEN = [
  [1, 6],   // 5 - 5:30pm
  [11, 15],
  [2, 7],   // 5 - 5:30pm
  [4.5, 6], // 5 - 5:30pm
  [5, 7],   // 5 - 5:30pm
  [9, 11],
  [4, 9],   // 5 - 5:30pm
  [10, 12],
  [8, 12],
  [3, 6.5], // 5 - 5:30pm
  [3, 5.5]  // 5 - 5:30pm
];

test("Basic functionality", () => {

  expect(findMaxConcurrency([])).toEqual(0);

  expect(findMaxConcurrency(NEEDS_ONE)).toEqual(1);

  expect(findMaxConcurrency(CAN_BE_DONE_WITH_ONE)).toEqual(1);

  expect(findMaxConcurrency(NEEDS_SEVEN)).toEqual(7);

  expect(canCoverWith(NEEDS_SEVEN, 6)).toEqual(false);
  expect(canCoverWith(NEEDS_SEVEN, 7)).toEqual(true);
  expect(canCoverWith(NEEDS_SEVEN, 8)).toEqual(true);

});
