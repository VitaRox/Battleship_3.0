export default ({ body, title }) => {
  return (
    `<!DOCTYPE html>
    <html>
      <head>
        <body>

        <h1>Battleship Game</h1>

        <table id="part1">{Board}
          <!--            <tbody>-->

          <!--            </tbody>-->
        </table>
        <!--    This part will get updated to list the sunken Ships;-->
        <ul id="ship-list"></ul>
        <p id="part2"></p>
        <p id="part3"></p>

        <p id="part4"><button id="guess" type="button" onclick="setLink()">GUESS</button></p>

        <p id="part5">Status</p>
        <p id="part6"></p>
        <p id="part7"></p>
        </body>
      </head>
    </html>
    `)};
