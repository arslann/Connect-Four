const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ']]

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('t', 'test command (remove)', ConnectFour.testCommand);

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  // Remove this
  static testCommand() {
    console.log("TEST COMMAND");
  }

  static checkWin(grid) {

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended
    let emptyCheck = this.isEmpty(grid)
    let wincheck = this.chkWinner(grid);
    let spaces = this.countSpaces(grid);

    if (emptyCheck) return false;
    if (wincheck) return wincheck;

    if (spaces > 0) return false;
    else return "T";

  }
  static countSpaces(grid) {
    let flat = grid.flat();

    return flat.filter(el => el === " ").length;
  }

  static chkLine(a, b, c, d) {
    // Check first cell non-zero and all cells match
    return ((a != 0) && (a == b) && (a == c) && (a == d));
  }

  static chkWinner(bd) {
    // Check down
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 7; c++)
        if (this.chkLine(bd[r][c], bd[r + 1][c], bd[r + 2][c], bd[r + 3][c]))
          return bd[r][c];

    // Check right
    for (let r = 0; r < 6; r++)
      for (let c = 0; c < 4; c++)
        if (this.chkLine(bd[r][c], bd[r][c + 1], bd[r][c + 2], bd[r][c + 3]))
          return bd[r][c];

    // Check down-right
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 4; c++)
        if (this.chkLine(bd[r][c], bd[r + 1][c + 1], bd[r + 2][c + 2], bd[r + 3][c + 3]))
          return bd[r][c];

    // Check down-left
    for (let r = 3; r < 6; r++)
      for (let c = 0; c < 4; c++)
        if (this.chkLine(bd[r][c], bd[r - 1][c + 1], bd[r - 2][c + 2], bd[r - 3][c + 3]))
          return bd[r][c];

    return false;
  }

  static isEmpty(grid) {

    for (let i = 0; i < grid.length; i++) {

      let sub = grid[i];
      for (let j = 0; j < sub.length; j++) {
        let el = sub[j];
        if (el !== " ") return false;
      }
    }
    return true;

  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = ConnectFour;
