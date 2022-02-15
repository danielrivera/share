/*
  Design a theatre system, which will be initialized with 2 variables:
    - LAST_SEAT_NUMBER: total number of seats numbered from 1 to LAST_SEAT_NUMBER.
    - MIN_DISTANCE: minimum distance between 2 seats.

  Implement API: buyTicket() such that everytime it is called, it should return a ticket number which 
  is having maximum possible distance with any of the previously allocated seats but minimum distance MIN_DISTANCE.
  e.g. if you allocate seat 9 and total seats are 20, next seat to allocate would be 20.
*/

const FIRST_SEAT_NUMBER = 1;
const LAST_SEAT_NUMBER = 20;
const MIN_DISTANCE = 2;

const sold = []; // Sorted array of seat numbers we sold so far
function buyTicket() {
  let i; // Control var
  let soldSeat; // The seat # we are going to sell in this pass, can be left `undefined` if no more seats available

  if (sold.length === 0) {
    // No seats sold yet, give the first
    soldSeat = FIRST_SEAT_NUMBER;
  } else if (sold.length === 1) {
    // Only one seat sold, the most distant one is necessarily the last one (assuming it is farther than MIN_DISTANCE)
    if (LAST_SEAT_NUMBER - FIRST_SEAT_NUMBER >= MIN_DISTANCE) {
      soldSeat = LAST_SEAT_NUMBER;
    }
  } else {
    // Ok we have at least 2 seats sold now so let's look for the greatest distance available between sold seats
    const bestDeltaFound = {
      where: undefined,
      delta: 0,
    };
    for (i = 0; i < sold.length - 1; i++) {
      const t2 = sold[i+1];
      const t1 = sold[i];

      if (t2 - t1 > bestDeltaFound.delta && t2 - t1 >= MIN_DISTANCE * 2) { // * 2 here to ensure we can squeeze in someone and still respect MAX_DISTANCE on both sides
        bestDeltaFound.where = i;
        bestDeltaFound.delta = t2 - t1;
      }
    }

    // It's possible we found none that matched the criteria in which case we return `undefined`
    if (bestDeltaFound.where !== undefined) {
      soldSeat = sold[bestDeltaFound.where] + Math.floor(bestDeltaFound.delta / 2);
    }
  }

  if (soldSeat !== undefined) {
    // Insert the sold seat in the sold seats array at the right position to keep it sorted
    for (i = 0; i < sold.length; i++) {
      if (soldSeat <= sold[i]) {
        break;
      }
    }
    sold.splice(i, 0, soldSeat);
  }

  return soldSeat;
}

const bought = [];
// Buy tickets until none are available anymore
let ticket = buyTicket();
while (ticket !== undefined) {
  bought.push(ticket);
  ticket = buyTicket();
}

console.log('The tickets were sold in this order:', bought.join(', '));
console.log('The tickets sold are the following:', bought.sort((a, b) => a - b).join(', '));
