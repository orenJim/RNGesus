const logicController = {};

logicController.coinFlip = (req, res, next) => {
  // intitalize the object to return to the front end
  const returnObj = {
    message: 'Your coin flip result was',
  };
  // get 0 or 1
  const result = Math.floor(Math.random() * 2);
  // return heads or tails based on 0 or 1
  if (result === 0) {
    returnObj.result = 'Tails';
    res.status(200).json(returnObj);
  }
  if (result === 1) {
    returnObj.result = 'Heads';
    res.status(200).json(returnObj);
  }
};

logicController.diceRoll = (req, res, next) => {
  // grab the numer of sides of the dice
  const { sides } = req.body;
  // set the message based on sides given by customer
  const diceMessage = `Your D${sides} rolled a`;
  // get the dice roll
  const result = Math.floor(Math.random() * sides) + 1;
  // intitalize the object to return to the front end
  const returnObj = {};
  // set the object and return
  returnObj.message = diceMessage;
  returnObj.result = result;
  res.status(200).json(returnObj);
};

logicController.pickANumber = (req, res, next) => {
  // grab the number needed for first and last
  const { startNum, lastNum } = req.body;
  // set custom message based on req body
  const numMessage = `The number picked between ${startNum} and ${lastNum} was`;
  const result = (Math.floor(Math.random() * (lastNum - startNum + 1)) + startNum);
  // intitalize the object to return to the front end
  const returnObj = {};
  // set it and send it back to client
  returnObj.message = numMessage;
  returnObj.result = result;
  res.status(200).json(returnObj);
};

logicController.lottery = (req, res, next) => {
  const { regMax, megaMax } = req.body;
  // intitalize the object to return to the front end
  const result = {};
  // the message for the object
  const lottoMessage = 'Your lotto numbers are';
  // the array of winning numbers
  const lottoNums = [];
  // first adding in the 5 numbers between 1 and the regMax
  while (lottoNums.length < 5) {
    // generate the random number
    const randNum = Math.floor(Math.random() * (regMax - 1 + 1) + 1);
    // if the lottoNums array already has the number included, "restart" the process
    if (lottoNums.includes(randNum)) {
      continue;
    } else {
      // if it isnt, add it to the lottoNums array
      lottoNums.push(randNum);
    }
  }
  // sort it from smallest to largest to make it easier to write down
  lottoNums.sort((a, b) => a - b);
  // finally, add in the mega number, as a string, to differeniate from the other numbers
  lottoNums.push(Math.floor(Math.random() * (megaMax - 1 + 1) + 1).toString());
  result.message = lottoMessage;
  result.result = lottoNums;
  res.status(200).json(result);
};

module.exports = logicController;
