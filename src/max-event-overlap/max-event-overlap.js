/*
Given a list of events, each with a start time and an end time, we want to send reporters to cover
those events. How do we determine how many reporters we need if we want to cover all the events?

Covering an event means a reporter is there for the full duration of the event. We only need one
reporter per event.

Also, for the purpose of this problem we ignore location and transportation; if one event ends at
4pm and another starts at 4pm, we assume the same reporter can cover both events (there's no need to
budget breaks or travel time).

NOTE: This is really a question about finding concurrency among scheduled things with known
durations.
*/

const {MinHeap} = require("../heap/heap");

/**
 * @param {Number[][]} events
 *   List of events, each with [0] = start time and [1] = end time
 * @returns {Number}
 *   Number of reporters needed, i.e. max concurrency
 */
function findMaxConcurrency(events) {
  // Validate input.
  if (!Array.isArray(events) || events.some((event) => {
    return (
      !Array.isArray(event) ||
      event.length !== 2 ||
      typeof event[0] !== "number" ||
      typeof event[1] !== "number" ||
      event[0] >= event[1]
    );
  })) {
    throw "Invalid input";
  }

  let maxConcurrency = 0;

  // Sort events in ascending order by start time, using end time as tiebreaker.
  events.sort((e1, e2) => {
    // This is a clever way of calculating what to return from the comparator. If start times are
    // equal, first value will be 0 which is falsy; second value (difference of end times) will be
    // returned.
    return (e1[0] - e2[0]) || (e1[1] - e2[1]);
  });

  let concurrencyNow = 0;

  let futureEndTimes = new MinHeap();

  for (let i = 0; i < events.length; i++) {
    // Get the next event.
    let [start, end] = events[i];

    // Check prior events' end times to see if any of those events have ended by now. If one
    // of them is ending exactly now (at same time as this next event starts) make sure we
    // process it now, before starting the next event, so that we can free up a reporter.
    while (futureEndTimes.hasMore() && futureEndTimes.peek() <= start) {
      futureEndTimes.extract();
      concurrencyNow--;
    }

    // Process next event's start time.
    concurrencyNow++;
    if (concurrencyNow > maxConcurrency) {
      maxConcurrency = concurrencyNow;
    }

    // Stash this event's end time for later processing.
    futureEndTimes.insert(end);
  }

  return maxConcurrency;
}

function canCoverWith(events, numReporters) {
  return (findMaxConcurrency(events) <= numReporters);
}

module.exports = {
  findMaxConcurrency,
  canCoverWith
};
