class MyForm {
  constructor() {
    this.cards =[];
  }

  addCard(card){
    this.cards.push(card)
  }

  renderCard(){
    this.cards.map((card)=>{
      $('#bruh').append(card.render())
    })
  }
  render() {
    return (
    `<form class="ui form">
      <div class="ui center aligned segment">
        <audio id="gunit" src="./sounds/50_5.mp3" type="audio/mp3"></audio>
        <audio id="sweedish" src="./sounds/dontworry.mp3" type="audio/mp3"></audio>
        <button class="ui inverted green button" id="buttn" type="submit" data-create="create">Invest</button>
        <button class="ui inverted grey button" id="buttn" type="submit" data-clear="clear">Clear</button>
      </div>
      <div id='bruh' class="ui centered cards">
      </div>
    </form>`)

  }
}
