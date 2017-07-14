class Card {
  constructor(url,company,ticker,description){
    this.url = url;
    this.company = company;
    this.ticker = ticker;
    this.description = description;
  }

  render(){
    return `<div class="card">
      <div class="content">
        <img class="right floated mini ui image" src=${this.url}>
        <div class="header">
          ${this.company}
        </div>
        <div class="meta">
          Ticker: ${this.ticker}
        </div>
        <div class="description">
          ${this.description}
        </div>
      </div>
      <div class="extra content">
        <div class="ui toggle checkbox">
          <input type="checkbox" name="public" id="portfolio" value="${this.company}">
          <label>Invest?</label>
        </div>
      </div>
    </div>
      `
  }
}
